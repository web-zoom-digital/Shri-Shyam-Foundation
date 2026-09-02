import { NextResponse } from "next/server"
import { recordPageVisit } from "@/lib/adminStore"

/** POST /api/track-visit — lightweight page visit tracking */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    const page =
      body && typeof body.page === "string"
        ? body.page.trim().slice(0, 200)
        : "/"

    // Sanitize — only allow paths (no full URLs)
    const cleanPage = page.startsWith("/") ? page : "/" + page

    await recordPageVisit(cleanPage)
    return NextResponse.json({ ok: true })
  } catch {
    // Never fail the user experience for tracking
    return NextResponse.json({ ok: true })
  }
}
