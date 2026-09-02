export type PendingDonation = {
  orderId: string
  amount: number
  name: string
  email: string
  phone: string
  orderNote: string
  want80G: boolean
  pan: string
  address: string
  createdAt: number
  emailed?: boolean
}

const store = new Map<string, PendingDonation>()
const TTL_MS = 1000 * 60 * 60 * 24 // 24 hours

function prune() {
  const now = Date.now()
  for (const [key, value] of store) {
    if (now - value.createdAt > TTL_MS) store.delete(key)
  }
}

export function savePendingDonation(donation: PendingDonation) {
  prune()
  store.set(donation.orderId, donation)
}

export function getPendingDonation(orderId: string) {
  prune()
  return store.get(orderId) || null
}

export function markDonationEmailed(orderId: string) {
  const existing = store.get(orderId)
  if (!existing) return
  store.set(orderId, { ...existing, emailed: true })
}
