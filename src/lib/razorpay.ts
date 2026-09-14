import crypto from "crypto"

export function getRazorpayAuth() {
  const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  return { keyId, keySecret }
}

export function isPaidStatus(status: unknown) {
  if (typeof status !== "string") return false
  return ["paid", "captured", "authorized", "SUCCESS"].includes(status.toLowerCase())
}

export type DonorOrderTags = {
  want80G: boolean
  pan: string
  address: string
  orderNote: string
  name?: string
  email?: string
  phone?: string
}

export function encodeDonorOrderTags(input: {
  want80G: boolean
  pan: string
  address: string
  orderNote: string
}): Record<string, string> {
  const raw: Record<string, string> = {
    want80g: input.want80G ? "1" : "0",
    note: (input.orderNote || "Donation").slice(0, 40),
  }

  if (input.want80G && input.pan) {
    raw.pan = input.pan.slice(0, 10)
  }
  if (input.want80G && input.address) {
    raw.addr = input.address.slice(0, 240)
  }

  return Object.fromEntries(Object.entries(raw).filter(([, v]) => v !== ""))
}

export async function fetchRazorpayOrder(orderId: string) {
  const { keyId, keySecret } = getRazorpayAuth()
  if (!keyId || !keySecret) return null

  const authHeader = `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`
  const res = await fetch(`https://api.razorpay.com/v1/orders/${encodeURIComponent(orderId)}`, {
    headers: {
      "Authorization": authHeader,
    },
    cache: "no-store",
  })
  if (!res.ok) return null
  return res.json()
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
    name: typeof map.name === "string" ? map.name.trim() : undefined,
    email: typeof map.email === "string" ? map.email.trim() : undefined,
    phone: typeof map.phone === "string" ? map.phone.trim() : undefined,
  }
}

export function verifyRazorpaySignature(orderId: string, paymentId: string, signature: string) {
  const { keySecret } = getRazorpayAuth()
  if (!keySecret) return false

  const body = orderId + "|" + paymentId
  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(body.toString())
    .digest("hex")

  return expectedSignature === signature
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
