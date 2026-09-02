import { NextResponse } from "next/server"
import { fulfillPaidDonation } from "@/lib/fulfillDonation"

/**
 * Cashfree payment notify URL.
 * Set automatically via order_meta.notify_url during checkout.
 * Dashboard backup: merchant.cashfree.com → Developers → Webhooks
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }

    const data = body as Record<string, unknown>
    const nested =
      data.data && typeof data.data === "object"
        ? (data.data as Record<string, unknown>)
        : data
    const order =
      nested.order && typeof nested.order === "object"
        ? (nested.order as Record<string, unknown>)
        : nested

    const orderId = String(
      order.order_id ||
        nested.order_id ||
        data.order_id ||
        ""
    ).trim()

    if (!orderId) {
      return NextResponse.json({ error: "order_id missing" }, { status: 400 })
    }

    const result = await fulfillPaidDonation(orderId)

    // Always 200 to Cashfree once we processed the payload, so they stop retrying
    // on non-paid intermediate events (we return ok:false for unpaid).
    if (!result.ok && result.status === 402) {
      return NextResponse.json({ received: true, pending: true, orderId })
    }

    if (!result.ok) {
      console.error("Cashfree webhook fulfill failed:", result)
      return NextResponse.json({ received: true, fulfilled: false, orderId })
    }

    return NextResponse.json({
      received: true,
      fulfilled: true,
      orderId,
      alreadySent: result.alreadySent || false,
    })
  } catch (error) {
    console.error("Cashfree webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
