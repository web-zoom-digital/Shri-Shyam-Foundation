/**
 * adminStore.ts
 * ─────────────
 * Persistent Supabase storage for admin panel data.
 */

import { supabase } from "./supabase"

// ─── Types ────────────────────────────────────────────────────────────────────

export type LeadStatus = "FORM_FILLED" | "PENDING_PAYMENT" | "PAID" | "FAILED"

export type FormLead = {
  id: string
  orderId?: string
  name: string
  email: string
  phone: string
  amount: number
  want80G: boolean
  pan?: string
  address?: string
  orderNote?: string
  sourcePage: string
  status: LeadStatus
  formFilledAt: number
  paidAt?: number
  paymentStatus?: string
  createdAt: number
}

export type PageVisit = {
  page: string
  visits: number
  lastVisited: number
}

// ─── Form Leads ───────────────────────────────────────────────────────────────

export async function saveFormLead(lead: Omit<FormLead, "id" | "createdAt">): Promise<FormLead> {
  const newLead: FormLead = {
    ...lead,
    id: `LEAD_${Date.now()}_${Math.floor(Math.random() * 9999)}`,
    createdAt: Date.now(),
  }

  const { error } = await supabase.from("leads").insert(newLead)
  if (error) console.error("Error saving lead:", error)
  return newLead
}

export async function updateLeadOrderId(leadId: string, orderId: string): Promise<void> {
  const { error } = await supabase
    .from("leads")
    .update({ orderId, status: "PENDING_PAYMENT" })
    .eq("id", leadId)
  
  if (error) console.error("Error updating lead orderId:", error)
}

export async function markLeadAsPaid(orderId: string, paymentStatus: string): Promise<FormLead | null> {
  const { data, error } = await supabase
    .from("leads")
    .update({ status: "PAID", paidAt: Date.now(), paymentStatus })
    .eq("orderId", orderId)
    .select()
    .single()

  if (error || !data) {
    console.error("Error marking lead as paid:", error)
    return null
  }
  return data as FormLead
}

export async function savePaymentRecord(data: {
  orderId: string
  name: string
  email: string
  phone: string
  amount: number
  want80G: boolean
  pan?: string
  address?: string
  orderNote?: string
  sourcePage?: string
  paymentStatus: string
}): Promise<FormLead> {
  // Check if exists
  const { data: existing } = await supabase
    .from("leads")
    .select("*")
    .eq("orderId", data.orderId)
    .single()

  if (existing) {
    const { data: updated } = await supabase
      .from("leads")
      .update({ status: "PAID", paidAt: Date.now(), paymentStatus: data.paymentStatus })
      .eq("orderId", data.orderId)
      .select()
      .single()
    return updated as FormLead
  }

  // Create new
  const newLead: FormLead = {
    id: `LEAD_${Date.now()}_${Math.floor(Math.random() * 9999)}`,
    orderId: data.orderId,
    name: data.name,
    email: data.email,
    phone: data.phone,
    amount: data.amount,
    want80G: data.want80G,
    pan: data.pan,
    address: data.address,
    orderNote: data.orderNote,
    sourcePage: data.sourcePage || "/donate",
    status: "PAID",
    formFilledAt: Date.now(),
    paidAt: Date.now(),
    paymentStatus: data.paymentStatus,
    createdAt: Date.now(),
  }

  await supabase.from("leads").insert(newLead)
  return newLead
}

export async function getAllLeads(): Promise<FormLead[]> {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("createdat", { ascending: false })

  if (error) {
    console.error("Error fetching leads:", error)
    return []
  }
  return data as FormLead[]
}

export async function getLeadByOrderId(orderId: string): Promise<FormLead | null> {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("orderId", orderId)
    .single()

  if (error || !data) return null
  return data as FormLead
}

// ─── Page Visits ──────────────────────────────────────────────────────────────

export async function recordPageVisit(page: string): Promise<void> {
  // Upsert the page visit
  // Supabase needs a unique constraint on 'page' for upsert to work correctly,
  // which we defined in SQL (PRIMARY KEY).
  
  // First try to fetch
  const { data: existing } = await supabase
    .from("page_visits")
    .select("*")
    .eq("page", page)
    .single()

  if (existing) {
    await supabase
      .from("page_visits")
      .update({ visits: existing.visits + 1, lastVisited: Date.now() })
      .eq("page", page)
  } else {
    await supabase
      .from("page_visits")
      .insert({ page, visits: 1, lastVisited: Date.now() })
  }
}

export async function getAllPageVisits(): Promise<PageVisit[]> {
  const { data, error } = await supabase
    .from("page_visits")
    .select("*")
    .order("visits", { ascending: false })

  if (error) {
    console.error("Error fetching page visits:", error)
    return []
  }
  return data as PageVisit[]
}

// ─── Admin Stats ──────────────────────────────────────────────────────────────

export async function getAdminStats() {
  const [leadsRes, visitsRes] = await Promise.all([
    supabase.from("leads").select("*").order("createdat", { ascending: false }),
    supabase.from("page_visits").select("*").order("visits", { ascending: false })
  ])

  const leads = (leadsRes.data || []) as FormLead[]
  const visits = (visitsRes.data || []) as PageVisit[]

  const paid = leads.filter((l) => l.status === "PAID")
  const pending = leads.filter((l) => l.status === "PENDING_PAYMENT" || l.status === "FORM_FILLED")
  const totalRevenue = paid.reduce((sum, l) => sum + Number(l.amount), 0)
  const conversionRate = leads.length > 0 ? Math.round((paid.length / leads.length) * 100) : 0
  const totalVisits = visits.reduce((sum, v) => sum + Number(v.visits), 0)

  // Revenue by day (last 7 days)
  const now = Date.now()
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000
  const recentPaid = paid.filter((l) => (l.paidAt || l.createdAt) >= sevenDaysAgo)

  // Group by date string
  const dailyMap: Record<string, number> = {}
  recentPaid.forEach((l) => {
    const d = new Date(l.paidAt || l.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })
    dailyMap[d] = (dailyMap[d] || 0) + Number(l.amount)
  })

  return {
    totalDonors: paid.length,
    totalRevenue,
    pendingLeads: pending.length,
    conversionRate,
    totalPageVisits: totalVisits,
    topPages: visits.slice(0, 5),
    recentPayments: paid.slice(0, 5),
    dailyRevenue: Object.entries(dailyMap).map(([date, amount]) => ({ date, amount })),
  }
}
