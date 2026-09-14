import { NextResponse } from "next/server"
import { verifyRazorpaySignature } from "@/lib/razorpay"
import { fulfillPaidDonation } from "@/lib/fulfillDonation"

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing required payment details" }, { status: 400 })
    }

    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    )

    if (!isValid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 })
    }

    // Signature is valid. Fulfill the donation.
    const result = await fulfillPaidDonation(razorpay_order_id)

    if (!result.ok) {
      return NextResponse.json(result, { status: result.status })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Verify payment error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
