import { NextResponse } from "next/server"
import {
  getRazorpayAuth,
  resolveSiteUrl,
  encodeDonorOrderTags,
} from "@/lib/razorpay"
import { savePendingDonation } from "@/lib/pendingDonations"
import { saveFormLead, updateLeadOrderId } from "@/lib/adminStore"

const MAX_AMOUNT = 500000 // ₹5,00,000 per order
const MIN_AMOUNT = 1
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin")
  const siteUrl = resolveSiteUrl(request)
  if (!origin) return true
  try {
    const allowed = new URL(siteUrl).origin
    const requestHost = new URL(request.url).origin
    return origin === allowed || origin === requestHost
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 })
    }

    const body = await request.json().catch(() => null)
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const amount = Number((body as { amount?: unknown }).amount)
    const name =
      typeof (body as { name?: unknown }).name === "string"
        ? (body as { name: string }).name.trim().slice(0, 120)
        : ""
    const email =
      typeof (body as { email?: unknown }).email === "string"
        ? (body as { email: string }).email.trim().slice(0, 160)
        : ""
    const phone =
      typeof (body as { phone?: unknown }).phone === "string"
        ? (() => {
            const digits = (body as { phone: string }).phone.replace(/\D/g, "").slice(0, 15)
            if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2)
            if (digits.length === 13 && digits.startsWith("0091")) return digits.slice(4)
            return digits
          })()
        : ""
    const want80G = (body as { want80G?: unknown }).want80G === true
    const pan =
      typeof (body as { pan?: unknown }).pan === "string"
        ? (body as { pan: string }).pan.trim().toUpperCase().slice(0, 10)
        : ""
    const address =
      typeof (body as { address?: unknown }).address === "string"
        ? (body as { address: string }).address.trim().slice(0, 300)
        : ""
    const rawReturnPath =
      typeof (body as { returnPath?: unknown }).returnPath === "string"
        ? (body as { returnPath: string }).returnPath.trim()
        : "/donate"
    const returnPath =
      rawReturnPath.startsWith("/") && !rawReturnPath.startsWith("//")
        ? rawReturnPath.split("?")[0] || "/donate"
        : "/donate"
    const orderNote =
      typeof (body as { orderNote?: unknown }).orderNote === "string"
        ? (body as { orderNote: string }).orderNote.trim().slice(0, 120)
        : ""

    if (!Number.isFinite(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
      return NextResponse.json(
        {
          error: `Donation amount must be between ₹${MIN_AMOUNT} and ₹${MAX_AMOUNT.toLocaleString("en-IN")}`,
          fallbackTo: "/account-details",
        },
        { status: 400 }
      )
    }

    if (name.length < 2 || !email.includes("@") || !/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { error: "Please provide a valid name, email and mobile number before payment." },
        { status: 400 }
      )
    }

    if (want80G) {
      if (!panRegex.test(pan)) {
        return NextResponse.json({ error: "Please enter a valid PAN number for 80G." }, { status: 400 })
      }
      if (address.length < 8) {
        return NextResponse.json(
          { error: "Please enter your full address for the 80G certificate." },
          { status: 400 }
        )
      }
    }

    const { keyId, keySecret } = getRazorpayAuth()
    const siteUrl = resolveSiteUrl(request)

    if (!keyId || !keySecret) {
      console.warn("Razorpay credentials missing. Falling back to manual donation instructions.")
      return NextResponse.json(
        {
          manualPayment: true,
          redirectTo: "/account-details",
          message:
            "Online payment is temporarily unavailable. Please use bank transfer or UPI instead.",
        },
        { status: 200 }
      )
    }

    const receiptId = `RCPT_${Date.now()}_${Math.floor(Math.random() * 1000)}`
    const orderAmountInPaise = Math.round(amount * 100)

    const payload = {
      amount: orderAmountInPaise,
      currency: "INR",
      receipt: receiptId,
      notes: {
        name: name.slice(0, 50),
        email: email.slice(0, 50),
        phone: phone.slice(0, 50),
        ...encodeDonorOrderTags({ want80G, pan, address, orderNote: orderNote || "Donation" })
      }
    }

    const authHeader = `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`

    const response = await fetch(`https://api.razorpay.com/v1/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error(
        "Razorpay Order Error",
        JSON.stringify({
          status: response.status,
          message: data?.error?.description || data?.error?.message,
          payload: JSON.stringify(payload),
        })
      )
      const rzpMsg = data?.error?.description || data?.error?.message || `HTTP ${response.status}`
      return NextResponse.json(
        {
          error: `Payment order failed: ${rzpMsg}. Please try UPI or bank transfer.`,
          fallbackTo: "/account-details",
          _debug: { rzpStatus: response.status, rzpMessage: rzpMsg },
        },
        { status: response.status >= 400 && response.status < 600 ? response.status : 502 }
      )
    }

    const finalOrderId = typeof data.id === "string" ? data.id : receiptId

    savePendingDonation({
      orderId: finalOrderId,
      amount: Math.round(amount * 100) / 100,
      name,
      email,
      phone,
      orderNote: orderNote || "Donation",
      want80G,
      pan: want80G ? pan : "",
      address: want80G ? address : "",
      createdAt: Date.now(),
    })

    try {
      const sourcePage = returnPath || "/donate"
      const lead = await saveFormLead({
        orderId: finalOrderId,
        name,
        email,
        phone,
        amount: Math.round(amount * 100) / 100,
        want80G,
        pan: want80G ? pan : "",
        address: want80G ? address : "",
        orderNote: orderNote || "Donation",
        sourcePage,
        status: "PENDING_PAYMENT",
        formFilledAt: Date.now(),
      })
      await updateLeadOrderId(lead.id, finalOrderId)
    } catch (trackErr) {
      console.warn("Admin lead tracking failed (non-critical):", trackErr)
    }

    return NextResponse.json({
      razorpay_order_id: finalOrderId,
      key_id: keyId,
      amount: orderAmountInPaise,
      currency: "INR",
      name: "Shri Shyam Foundation",
      description: orderNote || "Donation",
      prefill: {
        name,
        email,
        contact: phone
      },
      site_url: siteUrl,
    })
  } catch (error) {
    console.error("Checkout API Error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        fallbackTo: "/account-details",
      },
      { status: 500 }
    )
  }
}
