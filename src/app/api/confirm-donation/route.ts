import { NextResponse } from "next/server"
import { fulfillPaidDonation } from "@/lib/fulfillDonation"

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const orderId =
      typeof (body as { orderId?: unknown }).orderId === "string"
        ? (body as { orderId: string }).orderId.trim()
        : ""

    if (!orderId) {
      return NextResponse.json({ error: "orderId is required" }, { status: 400 })
    }

    const amount = Number((body as { amount?: unknown }).amount)
    const name =
      typeof (body as { name?: unknown }).name === "string"
        ? (body as { name: string }).name.trim()
        : undefined
    const email =
      typeof (body as { email?: unknown }).email === "string"
        ? (body as { email: string }).email.trim()
        : undefined
    const phone =
      typeof (body as { phone?: unknown }).phone === "string"
        ? (body as { phone: string }).phone.replace(/\D/g, "")
        : undefined
    const want80G =
      typeof (body as { want80G?: unknown }).want80G === "boolean"
        ? (body as { want80G: boolean }).want80G
        : undefined
    const pan =
      typeof (body as { pan?: unknown }).pan === "string"
        ? (body as { pan: string }).pan.trim().toUpperCase()
        : undefined
    const address =
      typeof (body as { address?: unknown }).address === "string"
        ? (body as { address: string }).address.trim()
        : undefined
    const orderNote =
      typeof (body as { orderNote?: unknown }).orderNote === "string"
        ? (body as { orderNote: string }).orderNote.trim()
        : undefined

    const result = await fulfillPaidDonation(orderId, {
      amount: Number.isFinite(amount) && amount > 0 ? amount : undefined,
      name,
      email,
      phone,
      want80G,
      pan,
      address,
      orderNote,
    })

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error, paymentStatus: result.paymentStatus },
        { status: result.status }
      )
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Confirm donation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
