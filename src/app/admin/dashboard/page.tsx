"use client"

import React, { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Users, IndianRupee, TrendingUp, Eye, Download, LogOut,
  RefreshCw, CheckCircle, Clock, AlertCircle, BarChart3, X
} from "lucide-react"
import type { FormLead, PageVisit } from "@/lib/adminStore"

// ─── Types ────────────────────────────────────────────────────────────────────

type DailyRevenue = { date: string; amount: number }

type Stats = {
  totalDonors: number
  totalRevenue: number
  pendingLeads: number
  conversionRate: number
  totalPageVisits: number
  topPages: PageVisit[]
  recentPayments: FormLead[]
  dailyRevenue: DailyRevenue[]
}

type Tab = "payments" | "leads" | "pages"

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 })
}

function formatDate(ts?: number) {
  if (!ts) return "—"
  return new Date(ts).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  })
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
    PAID: { label: "Paid", cls: "bg-slate-500/15 text-slate-400 border-slate-500/30", icon: <CheckCircle className="w-3 h-3" /> },
    PENDING_PAYMENT: { label: "Pending Payment", cls: "bg-amber-500/15 text-amber-400 border-amber-500/30", icon: <Clock className="w-3 h-3" /> },
    FORM_FILLED: { label: "Form Filled", cls: "bg-slate-500/15 text-slate-400 border-slate-500/30", icon: <AlertCircle className="w-3 h-3" /> },
    FAILED: { label: "Failed", cls: "bg-rose-500/15 text-rose-400 border-rose-500/30", icon: <X className="w-3 h-3" /> },
  }
  const s = map[status] || { label: status, cls: "bg-slate-700 text-slate-300 border-slate-600", icon: null }
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${s.cls}`}>
      {s.icon}{s.label}
    </span>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, sub, color }: {
  icon: React.ElementType; label: string; value: string; sub?: string; color: string
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-start gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">{label}</p>
        <p className="text-2xl font-extrabold text-white">{value}</p>
        {sub && <p className="text-slate-500 text-xs mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)
  const [stats, setStats] = useState<Stats | null>(null)
  const [leads, setLeads] = useState<FormLead[]>([])
  const [activeTab, setActiveTab] = useState<Tab>("payments")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Read token from cookie (set by login page)
  useEffect(() => {
    // We stored password in cookie — retrieve it via document.cookie won't work (httpOnly)
    // Instead, ask user to re-enter or store in sessionStorage from login flow
    const stored = sessionStorage.getItem("ncf_admin_token")
    if (!stored) {
      router.replace("/admin")
      return
    }
    setToken(stored)
  }, [router])

  const fetchData = useCallback(async (t: string) => {
    setLoading(true)
    setError("")
    try {
      const headers = { Authorization: `Bearer ${t}` }
      const [statsRes, leadsRes] = await Promise.all([
        fetch("/api/admin/stats", { headers }),
        fetch("/api/admin/leads", { headers }),
      ])

      if (statsRes.status === 401 || leadsRes.status === 401) {
        sessionStorage.removeItem("ncf_admin_token")
        router.replace("/admin")
        return
      }

      const statsData = await statsRes.json()
      const leadsData = await leadsRes.json()
      setStats(statsData)
      setLeads(leadsData.leads || [])
    } catch {
      setError("Data load karne mein problem aayi. Refresh karo.")
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    if (token) fetchData(token)
  }, [token, fetchData])

  async function handleLogout() {
    sessionStorage.removeItem("ncf_admin_token")
    await fetch("/api/admin/auth", { method: "DELETE" })
    router.replace("/admin")
  }

  function handleExport(type: "all" | "paid" | "pending") {
    if (!token) return
    const url = `/api/admin/export?type=${type}`
    const a = document.createElement("a")
    a.href = url
    // Pass token via URL param for file download (can't set headers on anchor)
    a.href = `/api/admin/export?type=${type}&t=${encodeURIComponent(token)}`
    a.download = ""
    a.click()
  }

  // Filter leads based on active tab
  const filteredLeads = leads.filter((l) => {
    if (activeTab === "payments") return l.status === "PAID"
    if (activeTab === "leads") {
      if (statusFilter === "all") return l.status !== "PAID"
      return l.status === statusFilter
    }
    return true
  })

  if (!token) return null

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top Nav */}
      <nav className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Image
            src="/images/live/shri-shyam-final-logo-1-1.gif"
            alt="Shri Shyam Foundation"
            width={160}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
          <span className="text-slate-500 text-xs hidden sm:inline border-l border-slate-700 pl-3">Admin Panel</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            id="refresh-btn"
            onClick={() => token && fetchData(token)}
            disabled={loading}
            className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-800"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            id="logout-btn"
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-400 hover:text-rose-400 transition-colors text-sm font-medium px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Error */}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl px-4 py-3 text-rose-400 text-sm mb-6">
            {error}
          </div>
        )}

        {/* Stats Grid */}
        {loading && !stats ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 h-24 animate-pulse" />
            ))}
          </div>
        ) : stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard icon={IndianRupee} label="Total Revenue" value={formatINR(stats.totalRevenue)}
              sub={`${stats.totalDonors} donors`} color="bg-slate-600" />
            <StatCard icon={Users} label="Pending Leads" value={String(stats.pendingLeads)}
              sub="Form filled, not paid" color="bg-amber-600" />
            <StatCard icon={TrendingUp} label="Conversion Rate" value={`${stats.conversionRate}%`}
              sub="Form → Payment" color="bg-slate-600" />
            <StatCard icon={Eye} label="Page Visits" value={stats.totalPageVisits.toLocaleString("en-IN")}
              sub="Total tracked visits" color="bg-violet-600" />
          </div>
        )}

        {/* Daily Revenue Chart */}
        {stats && (
          <DailyRevenueChart data={stats.dailyRevenue} loading={loading} />
        )}
        {loading && !stats && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 h-52 animate-pulse" />
        )}

        {/* Tabs + Export */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1">
            {([
              { id: "payments" as Tab, label: "✅ Payments", count: leads.filter(l => l.status === "PAID").length },
              { id: "leads" as Tab, label: "📋 Form Leads", count: leads.filter(l => l.status !== "PAID").length },
              { id: "pages" as Tab, label: "📊 Page Stats", count: null },
            ]).map(({ id, label, count }) => (
              <button
                key={id}
                id={`tab-${id}`}
                onClick={() => setActiveTab(id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === id
                  ? "bg-slate-600 text-white shadow-lg shadow-slate-900/40"
                  : "text-slate-400 hover:text-white"
                }`}
              >
                {label}{count !== null ? ` (${count})` : ""}
              </button>
            ))}
          </div>

          {/* Export Buttons */}
          <div className="flex gap-2 flex-wrap">
            {[
              { type: "all" as const, label: "Export All" },
              { type: "paid" as const, label: "Paid Only" },
              { type: "pending" as const, label: "Pending Only" },
            ].map(({ type, label }) => (
              <button
                key={type}
                id={`export-${type}`}
                onClick={() => handleExport(type)}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition-all"
              >
                <Download className="w-3.5 h-3.5" /> {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "payments" && (
          <PaymentsTable leads={filteredLeads} loading={loading} />
        )}

        {activeTab === "leads" && (
          <LeadsTable
            leads={filteredLeads}
            loading={loading}
            statusFilter={statusFilter}
            onFilterChange={setStatusFilter}
          />
        )}

        {activeTab === "pages" && (
          <PageStatsTable pages={stats?.topPages || []} loading={loading} />
        )}
      </div>
    </div>
  )
}

// ─── Payments Table ───────────────────────────────────────────────────────────

function PaymentsTable({ leads, loading }: { leads: FormLead[]; loading: boolean }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-slate-400" />
        <h2 className="font-bold text-white">Successful Payments</h2>
        <span className="ml-auto text-slate-500 text-sm">{leads.length} records</span>
      </div>
      {loading ? (
        <div className="p-8 text-center text-slate-500">Loading...</div>
      ) : leads.length === 0 ? (
        <div className="p-8 text-center text-slate-500">
          <IndianRupee className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>Koi payment record nahi hai abhi.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800/50">
                {["Donor Name", "Email", "Phone", "Amount", "Order ID", "Source", "80G", "Paid At"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-slate-400 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {leads.map((l) => (
                <tr key={l.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-semibold text-white whitespace-nowrap">{l.name}</td>
                  <td className="px-4 py-3 text-slate-300 text-xs">{l.email}</td>
                  <td className="px-4 py-3 text-slate-300">{l.phone}</td>
                  <td className="px-4 py-3 font-bold text-slate-400 whitespace-nowrap">{formatINR(l.amount)}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs font-mono">{l.orderId || "—"}</td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{l.sourcePage}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${l.want80G ? "text-slate-400" : "text-slate-500"}`}>
                      {l.want80G ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">{formatDate(l.paidAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ─── Leads Table ──────────────────────────────────────────────────────────────

function LeadsTable({ leads, loading, statusFilter, onFilterChange }: {
  leads: FormLead[]; loading: boolean; statusFilter: string; onFilterChange: (s: string) => void
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800 flex flex-wrap items-center gap-3">
        <Clock className="w-4 h-4 text-amber-400" />
        <h2 className="font-bold text-white">Form Leads (Not Paid)</h2>
        <div className="ml-auto flex gap-2 flex-wrap">
          {["all", "FORM_FILLED", "PENDING_PAYMENT"].map((s) => (
            <button
              key={s}
              onClick={() => onFilterChange(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${statusFilter === s
                ? "bg-slate-600 text-white"
                : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {s === "all" ? "All" : s === "FORM_FILLED" ? "Form Filled" : "Pending Payment"}
            </button>
          ))}
        </div>
        <span className="text-slate-500 text-sm">{leads.length} records</span>
      </div>
      {loading ? (
        <div className="p-8 text-center text-slate-500">Loading...</div>
      ) : leads.length === 0 ? (
        <div className="p-8 text-center text-slate-500">
          <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>Is category mein koi lead nahi hai.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800/50">
                {["Name", "Email", "Phone", "Amount", "Status", "Source", "80G", "Form Filled At"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-slate-400 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {leads.map((l) => (
                <tr key={l.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-semibold text-white whitespace-nowrap">{l.name}</td>
                  <td className="px-4 py-3 text-slate-300 text-xs">{l.email}</td>
                  <td className="px-4 py-3 text-slate-300">{l.phone}</td>
                  <td className="px-4 py-3 font-bold text-amber-400 whitespace-nowrap">{formatINR(l.amount)}</td>
                  <td className="px-4 py-3"><StatusBadge status={l.status} /></td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{l.sourcePage}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${l.want80G ? "text-slate-400" : "text-slate-500"}`}>
                      {l.want80G ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">{formatDate(l.formFilledAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ─── Page Stats Table ─────────────────────────────────────────────────────────

function PageStatsTable({ pages, loading }: { pages: PageVisit[]; loading: boolean }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-2">
        <BarChart3 className="w-4 h-4 text-violet-400" />
        <h2 className="font-bold text-white">Page Visitor Analytics</h2>
        <span className="ml-auto text-slate-500 text-sm">{pages.length} pages tracked</span>
      </div>
      {loading ? (
        <div className="p-8 text-center text-slate-500">Loading...</div>
      ) : pages.length === 0 ? (
        <div className="p-8 text-center text-slate-500">
          <Eye className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>Abhi koi page visit data nahi hai.</p>
        </div>
      ) : (
        <div className="p-6 space-y-3">
          {pages.map((p, i) => {
            const maxVisits = pages[0]?.visits || 1
            const pct = Math.round((p.visits / maxVisits) * 100)
            return (
              <div key={p.page}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-xs w-5 text-right">{i + 1}.</span>
                    <span className="text-white font-medium text-sm">{p.page}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-xs">{formatDate(p.lastVisited)}</span>
                    <span className="text-violet-400 font-bold text-sm w-16 text-right">
                      {p.visits.toLocaleString("en-IN")} visits
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-600 to-slate-600 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── Daily Revenue Chart ───────────────────────────────────────────────────────

function DailyRevenueChart({ data, loading }: { data: DailyRevenue[]; loading: boolean }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const maxAmount = data.length > 0 ? Math.max(...data.map((d) => d.amount), 1) : 1
  const totalWeekRevenue = data.reduce((s, d) => s + d.amount, 0)

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center shadow-lg shadow-slate-900/40">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-white text-sm">Daily Revenue</h2>
            <p className="text-slate-500 text-xs">Last 7 days</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-0.5">Week Total</p>
          <p className="text-lg font-extrabold text-slate-400">{formatINR(totalWeekRevenue)}</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-end gap-3 h-36">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="flex-1 bg-slate-800 rounded-t-lg animate-pulse" style={{ height: `${30 + Math.random() * 60}%` }} />
          ))}
        </div>
      ) : data.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-36 text-slate-600">
          <TrendingUp className="w-10 h-10 mb-2 opacity-30" />
          <p className="text-sm">Abhi tak koi payment nahi aayi.</p>
        </div>
      ) : (
        <div className="relative">
          {/* Y-axis grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none" style={{ bottom: 28 }}>
            {[100, 75, 50, 25, 0].map((pct) => (
              <div key={pct} className="flex items-center gap-2">
                <span className="text-slate-700 text-xs w-14 text-right shrink-0 font-mono">
                  {pct > 0 ? formatINR(Math.round((maxAmount * pct) / 100)) : "₹0"}
                </span>
                <div className="flex-1 border-t border-slate-800/60" />
              </div>
            ))}
          </div>

          {/* Bars */}
          <div className="flex items-end gap-2 sm:gap-3 h-52 pl-16 pb-7 relative">
            {data.map((d, i) => {
              const heightPct = maxAmount > 0 ? (d.amount / maxAmount) * 100 : 0
              const isHovered = hoveredIdx === i

              return (
                <div
                  key={d.date}
                  className="flex-1 flex flex-col items-center gap-1 h-full justify-end relative group cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Tooltip */}
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-full mb-2 z-10 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 shadow-xl text-center whitespace-nowrap"
                    >
                      <p className="text-slate-400 font-extrabold text-sm">{formatINR(d.amount)}</p>
                      <p className="text-slate-400 text-xs">{d.date}</p>
                    </motion.div>
                  )}

                  {/* Bar */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
                    style={{
                      height: `${Math.max(heightPct, 4)}%`,
                      transformOrigin: "bottom",
                    }}
                    className={`w-full rounded-t-lg transition-all duration-200 ${
                      isHovered
                        ? "bg-gradient-to-t from-slate-600 to-slate-400 shadow-lg shadow-slate-900/50"
                        : "bg-gradient-to-t from-slate-700 to-slate-500"
                    }`}
                  />

                  {/* Date label */}
                  <span className="text-slate-500 text-xs font-medium mt-1 whitespace-nowrap absolute -bottom-0.5">
                    {d.date}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
