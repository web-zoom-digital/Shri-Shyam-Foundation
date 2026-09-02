import { NextResponse } from "next/server"
import { getAllLeads, saveFormLead } from "@/lib/adminStore"

function checkAdminAuth(request: Request): boolean {
  const authHeader = request.headers.get("authorization")
  if (!authHeader) return false
  const [scheme, token] = authHeader.split(" ")
  if (scheme !== "Bearer") return false
  const adminPassword = process.env.ADMIN_PASSWORD || "ncf-admin-2024"
  return token === adminPassword
}

/** GET /api/admin/leads — return all form leads */
export async function GET(request: Request) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status") // filter: PAID | PENDING_PAYMENT | FORM_FILLED
  const limit = parseInt(searchParams.get("limit") || "200", 10)

  let leads = await getAllLeads()
  if (status) leads = leads.filter((l) => l.status === status)
  leads = leads.slice(0, limit)

  return NextResponse.json({ leads, total: leads.length })
}

/** POST /api/admin/leads — save a new form lead */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 })
    }

    const b = body as Record<string, unknown>
    if (!b.name || !b.email || !b.phone || !b.amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const lead = await saveFormLead({
      name: String(b.name).trim(),
      email: String(b.email).trim(),
      phone: String(b.phone).replace(/\D/g, ""),
      amount: Number(b.amount),
      want80G: Boolean(b.want80G),
      pan: typeof b.pan === "string" ? b.pan : undefined,
      address: typeof b.address === "string" ? b.address : undefined,
      orderNote: typeof b.orderNote === "string" ? b.orderNote : undefined,
      sourcePage: typeof b.sourcePage === "string" ? b.sourcePage : "/donate",
      status: "FORM_FILLED",
      formFilledAt: Date.now(),
    })

    return NextResponse.json({ ok: true, leadId: lead.id })
  } catch (error) {
    console.error("Save lead error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
