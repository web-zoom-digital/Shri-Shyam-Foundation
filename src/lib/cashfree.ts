export type CashfreeMode = "production" | "sandbox"

export function getCashfreeAuth() {
  const appId =
    process.env.CASHFREE_APP_ID ||
    process.env.CASHFREE_CLIENT_ID ||
    process.env.NEXT_PUBLIC_CASHFREE_APP_ID
  const secretKey =
    process.env.CASHFREE_SECRET_KEY ||
    process.env.CASHFREE_CLIENT_SECRET ||
    process.env.CASHFREE_API_SECRET
  const paymentMode = (process.env.CASHFREE_MODE || "production").toLowerCase() as CashfreeMode
  return { appId, secretKey, paymentMode }
}

export function getCashfreeApiBase(mode: CashfreeMode) {
  return mode === "sandbox"
    ? "https://sandbox.cashfree.com/pg"
    : "https://api.cashfree.com/pg"
}

export function isPaidStatus(status: unknown) {
  if (typeof status !== "string") return false
  return ["PAID", "SUCCESS", "COMPLETED"].includes(status.toUpperCase())
}

export async function fetchCashfreeOrder(orderId: string) {
  const { appId, secretKey, paymentMode } = getCashfreeAuth()
  if (!appId || !secretKey) return null

  const res = await fetch(
    `${getCashfreeApiBase(paymentMode)}/orders/${encodeURIComponent(orderId)}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": appId,
        "x-client-secret": secretKey,
      },
      cache: "no-store",
    }
  )

  if (!res.ok) {
    const body = await res.text().catch(() => "")
    console.error("Cashfree order fetch failed:", res.status, body)
    return null
  }

  return res.json()
}

export type DonorOrderTags = {
  want80G: boolean
  pan: string
  address: string
  orderNote: string
}

export function encodeDonorOrderTags(input: {
  want80G: boolean
  pan: string
  address: string
  orderNote: string
}): Record<string, string> {
  const raw: Record<string, string> = {
    want80g: input.want80G ? "1" : "0",
    note: (input.orderNote || "Donation").slice(0, 80),
  }

  // Only include PAN and address when 80G is requested — Cashfree rejects empty-string tag values.
  if (input.want80G && input.pan) {
    raw.pan = input.pan.slice(0, 10)
  }
  if (input.want80G && input.address) {
    raw.addr = input.address.slice(0, 240)
  }

  // Strip any remaining empty-string values to avoid Cashfree 400 errors.
  return Object.fromEntries(Object.entries(raw).filter(([, v]) => v !== ""))
}

export function decodeDonorOrderTags(tags: unknown): DonorOrderTags {
  const map =
    tags && typeof tags === "object" && !Array.isArray(tags)
      ? (tags as Record<string, unknown>)
      : {}

  const want80G = String(map.want80g || "") === "1"
  return {
    want80G,
    pan: want80G && typeof map.pan === "string" ? map.pan.trim().toUpperCase() : "",
    address: want80G && typeof map.addr === "string" ? map.addr.trim() : "",
    orderNote: typeof map.note === "string" ? map.note.trim() : "Donation",
  }
}

function normalizeSiteUrl(raw: string): string {
  const trimmed = raw.trim().replace(/\/$/, "")
  if (!trimmed) return ""

  // Keep localhost on http for local sandbox; force https everywhere else.
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(trimmed)) {
    return trimmed
  }

  return trimmed.replace(/^http:\/\//i, "https://")
}

function isLocalHost(value: string) {
  return /localhost|127\.0\.0\.1/i.test(value)
}

export function resolveSiteUrl(request: Request): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim() || ""
  if (configured) return normalizeSiteUrl(configured)

  // Prefer browser Origin / Host so custom domains work even if env is missing on Vercel.
  const originHeader = request.headers.get("origin")?.trim() || ""
  if (originHeader && !isLocalHost(originHeader)) {
    return normalizeSiteUrl(originHeader)
  }

  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() || ""
  const host = forwardedHost || request.headers.get("host")?.trim() || ""
  const proto =
    request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() || "https"
  if (host && !isLocalHost(host)) {
    return normalizeSiteUrl(`${proto}://${host}`)
  }

  if (process.env.VERCEL_URL) {
    return normalizeSiteUrl(`https://${process.env.VERCEL_URL}`)
  }

  const requestUrl = new URL(request.url)
  return normalizeSiteUrl(`${requestUrl.protocol}//${requestUrl.host}`)
}
