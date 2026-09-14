import { decodeDonorOrderTags, fetchRazorpayOrder, isPaidStatus } from "@/lib/razorpay"
import { sendDonorAndAdminDonationEmails } from "@/lib/mailer"
import {
  getPendingDonation,
  markDonationEmailed,
  savePendingDonation,
  type PendingDonation,
} from "@/lib/pendingDonations"
import { markLeadAsPaid, savePaymentRecord } from "@/lib/adminStore"

export type DonorFallback = {
  amount?: number
  name?: string
  email?: string
  phone?: string
  want80G?: boolean
  pan?: string
  address?: string
  orderNote?: string
}

function mergePending(
  orderId: string,
  order: Record<string, unknown> | null,
  fallback?: DonorFallback
): PendingDonation | null {
  const existing = getPendingDonation(orderId)
  const tags = decodeDonorOrderTags(order?.notes)

  const amount = Number(
    existing?.amount ??
      fallback?.amount ??
      (typeof order?.amount === "number" ? order.amount / 100 : undefined) ??
      0
  )
  const name = String(
    existing?.name ||
      fallback?.name ||
      tags.name ||
      ""
  ).trim()
  const email = String(
    existing?.email ||
      fallback?.email ||
      tags.email ||
      ""
  ).trim()
  const phone = String(
    existing?.phone ||
      fallback?.phone ||
      tags.phone ||
      ""
  ).replace(/\D/g, "")

  const want80G = existing?.want80G ?? fallback?.want80G ?? tags.want80G
  const pan = existing?.pan || fallback?.pan || tags.pan
  const address = existing?.address || fallback?.address || tags.address
  const orderNote =
    existing?.orderNote || fallback?.orderNote || tags.orderNote || "Donation"

  if (!name || !email || !phone || !Number.isFinite(amount) || amount <= 0) {
    return null
  }

  const pending: PendingDonation = {
    orderId,
    amount: Math.round(amount * 100) / 100,
    name,
    email,
    phone,
    orderNote,
    want80G: Boolean(want80G),
    pan: want80G ? String(pan || "").toUpperCase() : "",
    address: want80G ? String(address || "").trim() : "",
    createdAt: existing?.createdAt || Date.now(),
    emailed: existing?.emailed,
  }

  savePendingDonation(pending)
  return pending
}

/**
 * Verify payment and send donor + admin emails.
 */
export async function fulfillPaidDonation(orderId: string, fallback?: DonorFallback) {
  const order = (await fetchRazorpayOrder(orderId)) as Record<string, unknown> | null
  const paymentStatus =
    typeof order?.status === "string" ? order.status : "UNKNOWN"

  if (!order || !isPaidStatus(paymentStatus)) {
    return {
      ok: false as const,
      status: 402,
      paymentStatus,
      error: "Payment is not completed yet.",
    }
  }

  const pending = mergePending(orderId, order, fallback)
  if (!pending) {
    return {
      ok: false as const,
      status: 404,
      paymentStatus,
      error: "Donation details not found for this order.",
    }
  }

  if (pending.emailed) {
    return {
      ok: true as const,
      alreadySent: true,
      orderId,
      paymentStatus,
      message: "Confirmation emails were already sent.",
    }
  }

  const emails = await sendDonorAndAdminDonationEmails({
    orderId: pending.orderId,
    amount: pending.amount,
    name: pending.name,
    email: pending.email,
    phone: pending.phone,
    orderNote: pending.orderNote,
    want80G: pending.want80G,
    pan: pending.pan,
    address: pending.address,
    paymentStatus,
  })

  if (emails.donorOk || emails.adminOk) {
    markDonationEmailed(orderId)
  }

  // ── Admin tracking: mark lead as PAID ──
  try {
    const updated = await markLeadAsPaid(orderId, paymentStatus)
    if (!updated) {
      // No prior lead found (e.g. webhook fired before checkout saved it) — create one
      await savePaymentRecord({
        orderId,
        name: pending.name,
        email: pending.email,
        phone: pending.phone,
        amount: pending.amount,
        want80G: pending.want80G,
        pan: pending.pan,
        address: pending.address,
        orderNote: pending.orderNote,
        paymentStatus,
      })
    }
  } catch (trackErr) {
    console.warn("Admin payment tracking failed (non-critical):", trackErr)
  }
  // ── End admin tracking ──

  return {
    ok: true as const,
    alreadySent: false,
    orderId,
    paymentStatus,
    emails,
    message: "Thank you. Confirmation emails are on the way.",
  }
}
