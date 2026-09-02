import { NextResponse } from "next/server"
import { cookies } from "next/headers"

/** POST /api/admin/auth — login with password */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    const password = body?.password
    const adminPassword = process.env.ADMIN_PASSWORD || "ncf-admin-2024"

    if (!password || password !== adminPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    // Set httpOnly cookie valid for 7 days
    const cookieStore = await cookies()
    cookieStore.set("admin_token", adminPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

/** DELETE /api/admin/auth — logout */
export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_token")
  return NextResponse.json({ ok: true })
}
