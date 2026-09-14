import { NextResponse } from "next/server"
import { fulfillPaidDonation } from "@/lib/fulfillDonation"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const rawBody = await request.text().catch(() => "")
    let body: any
    try {
      body = JSON.parse(rawBody)
    } catch {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }
    
    // Optional: Webhook signature verification if secret is provided in env
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET
    if (webhookSecret) {
      const signature = request.headers.get("x-razorpay-signature")
      if (!signature) {
        return NextResponse.json({ error: "Missing signature" }, { status: 400 })
      }
      
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex")
        
      if (expectedSignature !== signature) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
      }
    }

    // Extract order_id
    let orderId = ""
    
    if (body.payload?.payment?.entity?.order_id) {
      orderId = body.payload.payment.entity.order_id
    } else if (body.payload?.order?.entity?.id) {
      orderId = body.payload.order.entity.id
    }

    if (!orderId) {
      // Ignore events without orderId
      return NextResponse.json({ received: true, ignored: true })
    }

    const result = await fulfillPaidDonation(orderId)

    if (!result.ok && result.status === 402) {
      return NextResponse.json({ received: true, pending: true, orderId })
    }

    if (!result.ok) {
      console.error("Razorpay webhook fulfill failed:", result)
      return NextResponse.json({ received: true, fulfilled: false, orderId })
    }

    return NextResponse.json({
      received: true,
      fulfilled: true,
      orderId,
      alreadySent: result.alreadySent || false,
    })
  } catch (error) {
    console.error("Razorpay webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
