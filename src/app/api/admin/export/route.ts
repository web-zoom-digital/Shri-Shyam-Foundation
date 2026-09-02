import { NextResponse } from "next/server"
import { getAllLeads } from "@/lib/adminStore"

function checkAdminAuth(request: Request): boolean {
  // Check Authorization header
  const authHeader = request.headers.get("authorization")
  const adminPassword = process.env.ADMIN_PASSWORD || "ncf-admin-2024"

  if (authHeader) {
    const [scheme, token] = authHeader.split(" ")
    if (scheme === "Bearer" && token === adminPassword) return true
  }

  // Also allow ?t= query param for file download links
  const { searchParams } = new URL(request.url)
  const queryToken = searchParams.get("t")
  if (queryToken === adminPassword) return true

  return false
}

/** GET /api/admin/export — download all leads as CSV */
export async function GET(request: Request) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type") || "all" // all | paid | pending

  let leads = await getAllLeads()
  if (type === "paid") leads = leads.filter((l) => l.status === "PAID")
  if (type === "pending") leads = leads.filter((l) => l.status !== "PAID")

  const header = [
    "ID",
    "Order ID",
    "Name",
    "Email",
    "Phone",
    "Amount (₹)",
    "Status",
    "Source Page",
    "80G",
    "PAN",
    "Address",
    "Note",
    "Form Filled At",
    "Paid At",
    "Payment Status",
  ].join(",")

  const rows = leads.map((l) => {
    const fmt = (val?: string | number | boolean | null) =>
      `"${String(val ?? "").replace(/"/g, '""')}"`
    return [
      fmt(l.id),
      fmt(l.orderId),
      fmt(l.name),
      fmt(l.email),
      fmt(l.phone),
      l.amount,
      fmt(l.status),
      fmt(l.sourcePage),
      l.want80G ? "Yes" : "No",
      fmt(l.pan),
      fmt(l.address),
      fmt(l.orderNote),
      fmt(l.formFilledAt ? new Date(l.formFilledAt).toLocaleString("en-IN") : ""),
      fmt(l.paidAt ? new Date(l.paidAt).toLocaleString("en-IN") : ""),
      fmt(l.paymentStatus),
    ].join(",")
  })

  const csv = [header, ...rows].join("\n")
  const filename = `ncf-${type}-records-${new Date().toISOString().split("T")[0]}.csv`

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  })
}
