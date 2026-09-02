import { NextResponse } from "next/server"
import { getAdminStats } from "@/lib/adminStore"

function checkAdminAuth(request: Request): boolean {
  const authHeader = request.headers.get("authorization")
  if (!authHeader) return false
  const [scheme, token] = authHeader.split(" ")
  if (scheme !== "Bearer") return false
  const adminPassword = process.env.ADMIN_PASSWORD || "ncf-admin-2024"
  return token === adminPassword
}

/** GET /api/admin/stats — dashboard summary stats */
export async function GET(request: Request) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const stats = await getAdminStats()
  return NextResponse.json(stats)
}
