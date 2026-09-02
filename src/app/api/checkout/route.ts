import { NextResponse } from "next/server"
import {
  getCashfreeApiBase,
  getCashfreeAuth,
  resolveSiteUrl,
} from "@/lib/cashfree"
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

    const { appId, secretKey, paymentMode } = getCashfreeAuth()
    // Prefer configured site URL; otherwise use request/Vercel host (live deploy safe).
    const siteUrl = resolveSiteUrl(request)
    const returnUrl = `${siteUrl}${returnPath}?order_id={order_id}`
    const notifyUrl = `${siteUrl}/api/webhooks/cashfree`

    // Only block production mode when the resolved return URL is still localhost.
    if (paymentMode === "production" && /localhost|127\.0\.0\.1/i.test(siteUrl)) {
      console.error(
        "Production checkout blocked on localhost. Open the live site, or set NEXT_PUBLIC_SITE_URL."
      )
      return NextResponse.json(
        {
          error:
            "Production payments must run on the live website domain. Please donate from the live site.",
          fallbackTo: "/account-details",
        },
        { status: 400 }
      )
    }

    if (!appId || !secretKey) {
      console.warn("Cashfree credentials missing. Falling back to manual donation instructions.")
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

    const orderId = `ORDER_${Date.now()}_${Math.floor(Math.random() * 1000)}`
    const noteParts = [
      orderNote || "Donation",
      `Donor:${name}`,
      want80G ? `80G:Yes PAN:${pan}` : "80G:No",
    ]
    const composedNote = noteParts.join(" | ").slice(0, 200)

    const payload = {
      order_id: orderId,
      order_amount: Math.round(amount * 100) / 100,
      order_currency: "INR",
      order_note: composedNote,
      customer_details: {
        customer_id: `CUST_${Date.now()}`,
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
      },
      order_meta: {
        return_url: returnUrl,
        notify_url: notifyUrl,
      },
    }

    const response = await fetch(`${getCashfreeApiBase(paymentMode)}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": appId,
        "x-client-secret": secretKey,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      // Log full Cashfree error detail for debugging in Vercel logs
      console.error(
        "Cashfree Order Error",
        JSON.stringify({
          status: response.status,
          message: data?.message,
          type: data?.type,
          code: data?.code,
          payload: JSON.stringify(payload),
        })
      )
      const cashfreeMsg = data?.message || data?.code || `HTTP ${response.status}`
      return NextResponse.json(
        {
          error: `Payment order failed: ${cashfreeMsg}. Please try UPI or bank transfer.`,
          fallbackTo: "/account-details",
          _debug: { cashfreeStatus: response.status, cashfreeMessage: cashfreeMsg },
        },
        { status: response.status >= 400 && response.status < 600 ? response.status : 502 }
      )
    }

    const finalOrderId = typeof data.order_id === "string" ? data.order_id : orderId

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

    // ── Admin tracking: save form lead as PENDING_PAYMENT ──
    try {
      // Extract referrer page from returnPath
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
      // Link leadId immediately
      await updateLeadOrderId(lead.id, finalOrderId)
    } catch (trackErr) {
      console.warn("Admin lead tracking failed (non-critical):", trackErr)
    }
    // ── End admin tracking ──

    return NextResponse.json({
      payment_session_id: data.payment_session_id,
      order_id: finalOrderId,
      mode: paymentMode,
      return_url: returnUrl,
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
