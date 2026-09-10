"use client"

import * as React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Heart, Shield, CheckCircle2, ArrowRight, Star, Gift } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { DonationCausesSection } from "@/components/sections/DonationCausesSection"
import { DonorDetailsModal } from "@/components/donate/DonorDetailsModal"
import { useRazorpayCheckout } from "@/hooks/useRazorpayCheckout"
import type { DonorDetails } from "@/lib/donorSchema"
import {
  GENERAL_PRESET_AMOUNTS,
  GENERAL_IMPACT_MAP,
  formatInr,
} from "@/data/donationPricing"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }),
}

const generalPresets = GENERAL_PRESET_AMOUNTS
const cowPresets = [51, 101, 251, 501, 1101, 2101, 5101, 11001]

const generalImpactMap = GENERAL_IMPACT_MAP

const cowImpactMap: Record<number, string> = {
  51: "First Roti Seva — one simple meal for a cow",
  101: "Green fodder for one feeding",
  251: "Full-day fodder, water and basic care for one cow",
  501: "Treatment Seva — wound care and basic medicines",
  1101: "One month of nutrition for one cow",
  2101: "One month of milk and care for a rescued calf",
  5101: "Adopt a cow for one month — food, shelter and medical cover",
  11001: "Emergency rescue — transport, first aid and early recovery",
}

const sevaLabels: Record<string, string> = {
  roti: "First Roti Seva",
  fodder: "Green Fodder Seva",
  day: "Feed a Cow for a Day",
  medical: "Treatment Seva",
  monthly: "Monthly Nutrition",
  calf: "Sponsor a Calf",
  adopt: "Adopt a Cow (1 Month)",
  rescue: "Emergency Rescue",
}

const trustBadges = [
  { icon: Shield, label: "Government Certified NGO", sub: "Ministry of Social Justice" },
  { icon: CheckCircle2, label: "80G Tax Exempt", sub: "Save up to 50% on taxes" },
  { icon: Star, label: "100% Transparent", sub: "Annual public audits" },
  { icon: Gift, label: "Direct Impact", sub: "Zero middlemen" },
]

export function DonatePageClient() {
  const searchParams = useSearchParams()
  const cause = searchParams.get("cause") === "cow" ? "cow" : "general"
  const seva = searchParams.get("seva") || ""
  const presetAmounts = cause === "cow" ? cowPresets : generalPresets
  const impactMap = cause === "cow" ? cowImpactMap : generalImpactMap

  const paramAmount = React.useMemo(() => {
    const raw = searchParams.get("amount")
    if (!raw) return null
    const n = parseInt(raw, 10)
    return Number.isFinite(n) && n > 0 ? n : null
  }, [searchParams])

  const paramFrequency = searchParams.get("frequency") === "monthly" ? "monthly" : "one-time"

  const [selected, setSelected] = React.useState<number>(paramAmount && presetAmounts.includes(paramAmount) ? paramAmount : cause === "cow" ? 251 : 501)
  const [custom, setCustom] = React.useState(paramAmount && !presetAmounts.includes(paramAmount) ? String(paramAmount) : "")
  const [frequency, setFrequency] = React.useState<"one-time" | "monthly">(paramFrequency)
  const [donorFormOpen, setDonorFormOpen] = React.useState(false)
  const finalAmount = custom ? parseInt(custom) || 0 : selected
  const {
    isProcessing,
    paymentError,
    paymentSuccess,
    clearPaymentError,
    clearPaymentSuccess,
    startCheckout,
  } = useRazorpayCheckout()

  React.useEffect(() => {
    if (paramAmount) {
      if (presetAmounts.includes(paramAmount)) {
        setSelected(paramAmount)
        setCustom("")
      } else {
        setCustom(String(paramAmount))
        setSelected(0)
      }
    }
    setFrequency(paramFrequency)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync once when URL query changes
  }, [paramAmount, paramFrequency, cause])

  const donationNote =
    cause === "cow"
      ? `Cow Care Donation${seva ? ` · ${sevaLabels[seva] || seva}` : ""}`
      : "General Donation"

  const openDonorForm = () => {
    if (finalAmount <= 0 || isProcessing) return
    clearPaymentError()
    clearPaymentSuccess()
    setDonorFormOpen(true)
  }

  const handleDonorSubmit = async (donor: DonorDetails) => {
    const result = await startCheckout({
      amount: finalAmount,
      returnPath: "/donate",
      orderNote: donationNote,
      donor,
    })
    if (result.ok) setDonorFormOpen(false)
  }

  return (
    <div className="bg-white w-full max-w-full overflow-x-clip">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center pt-28 sm:pt-36 lg:pt-56 pb-20 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
        <motion.div className="absolute top-10 right-0 w-[260px] sm:w-[500px] h-[260px] sm:h-[500px] bg-orange-400/20 rounded-full blur-[100px] translate-x-1/3"
          animate={{ x: [0, 16, 0] }} transition={{ duration: 10, repeat: Infinity }} />
        <div className="container-custom relative z-10">
          <nav className="flex items-center gap-2 text-sm text-slate-300 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-semibold">Donate</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
              <Heart className="w-4 h-4 text-orange-400 fill-orange-400" />
              <span className="text-sm font-semibold text-white">
                {cause === "cow"
                  ? sevaLabels[seva] || "Gau Seva · Cow Care Donation"
                  : "Your Donation Creates Real Change"}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.1] mb-4 sm:mb-6 tracking-tight">
              {cause === "cow" ? (
                <>
                  Complete Your<br />
                  <span className="text-slate-300">Cow Care Donation</span>
                </>
              ) : (
                <>
                  Give Once.<br />
                  Change a Life <span className="text-orange-400">Forever.</span>
                </>
              )}
            </h1>
            <p className="text-base sm:text-xl text-slate-200 leading-relaxed max-w-2xl">
              {cause === "cow"
                ? "Your amount is ready below. Confirm and pay securely — it goes toward fodder, treatment, calf care or emergency rescue at our gaushala."
                : "Every rupee you donate goes directly to feeding a hungry family, healing a patient, or educating a child. Transparent. 80G eligible. Secure checkout."}
            </p>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-10 border-b border-slate-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((b, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.1} viewport={{ once: true }}
                className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                  <b.icon className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{b.label}</p>
                  <p className="text-slate-500 text-xs">{b.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Widget + Impact */}
      <section className="section-spacing bg-slate-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Donation Widget */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="premium-card rounded-2xl sm:rounded-3xl p-5 sm:p-10">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
                {cause === "cow" ? "Confirm Your Gau Seva Amount" : "Choose Your Donation Amount"}
              </h2>
              <p className="text-slate-500 text-sm mb-8">
                {cause === "cow"
                  ? "Amounts follow common Indian gaushala seva options. You can still enter any custom amount."
                  : "All donations are secure, encrypted and 80G tax deductible."}
              </p>

              {/* Frequency Toggle */}
              <div className="flex gap-3 mb-8">
                {(["one-time", "monthly"] as const).map(f => (
                  <button key={f} onClick={() => setFrequency(f)}
                    className={`flex-1 py-3 rounded-full font-bold text-sm transition-all ${frequency === f ? "bg-slate-600 text-white shadow-lg shadow-slate-500/25" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                    {f === "one-time" ? "One-Time" : "Monthly"}
                  </button>
                ))}
              </div>

              {/* Preset Amounts */}
              <div className={`grid gap-3 mb-6 ${cause === "cow" ? "grid-cols-4" : "grid-cols-3"}`}>
                {presetAmounts.map((amount) => {
                  const isActive = selected === amount && !custom
                  return (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => {
                        setSelected(amount)
                        setCustom("")
                      }}
                      className={`py-4 rounded-2xl font-black text-sm sm:text-base transition-all border-2 ${
                        isActive
                          ? "bg-slate-600 border-slate-600 shadow-lg shadow-slate-500/25 scale-105"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                      style={{ color: isActive ? "#ffffff" : "#0f172a" }}
                    >
                      ₹{amount.toLocaleString("en-IN")}
                    </button>
                  )
                })}
              </div>

              {/* Custom Amount */}
              <div className="relative mb-8">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-lg">₹</span>
                <input type="number" placeholder="Enter custom amount" value={custom}
                  onChange={e => { setCustom(e.target.value); setSelected(0) }}
                  className="w-full pl-10 pr-4 py-4 rounded-2xl border-2 border-slate-200 bg-white text-slate-900 font-bold text-base focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all" />
              </div>

              {/* Impact preview */}
              {finalAmount > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
                  <p className="text-slate-700 font-bold text-sm">
                    Your ₹{formatInr(finalAmount)}
                    {frequency === "monthly" ? " / month" : ""} will:
                  </p>
                  <p className="text-slate-600 text-sm mt-1">
                    {impactMap[finalAmount] ??
                      (cause === "cow"
                        ? "Support fodder, medicine or shelter needs at our gaushala"
                        : "Help with food, medicine and education programmes")}
                  </p>
                </div>
              )}

              {paymentError && (
                <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 mb-6">
                  <p className="text-amber-900 font-bold text-sm mb-1">Payment notice</p>
                  <p className="text-amber-800 text-sm leading-relaxed mb-4">{paymentError}</p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link href="/account-details" className="flex-1">
                      <Button className="w-full rounded-full font-bold bg-amber-600 hover:bg-amber-500 border-0 text-white h-11">
                        Donate via UPI / Bank
                      </Button>
                    </Link>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 rounded-full font-bold h-11"
                      onClick={() => clearPaymentError()}
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              )}

              {paymentSuccess && (
                <div className="bg-slate-50 border border-slate-300 rounded-2xl p-5 mb-6">
                  <p className="text-slate-900 font-bold text-sm mb-1">Thank you</p>
                  <p className="text-slate-800 text-sm leading-relaxed">{paymentSuccess}</p>
                </div>
              )}

              <Button 
                variant="primary" 
                className="w-full rounded-full h-14 font-black text-lg shadow-xl shadow-slate-500/25 mb-4"
                onClick={openDonorForm}
                disabled={isProcessing || finalAmount <= 0}
              >
                {isProcessing ? "Processing..." : `Donate ₹${finalAmount > 0 ? formatInr(finalAmount) : "..."} Now`} 
                {!isProcessing && <Heart className="w-5 h-5 ml-2 fill-white" />}
              </Button>
              <p className="text-center text-slate-400 text-xs">🔒 Secure payment · 80G receipt emailed instantly</p>
              <p className="text-center text-slate-400 text-xs mt-2">
                Prefer manual transfer?{" "}
                <Link href="/account-details" className="text-slate-600 font-semibold hover:underline">
                  View UPI & bank details
                </Link>
              </p>
            </motion.div>

            {/* Impact & How It Works */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" custom={0.2} viewport={{ once: true }} className="space-y-8">
              <div>
                <SectionHeader badge="Where Your Money Goes" title="100% Goes to Those Who Need It" subtitle="We are one of the very few NGOs where operational costs are separately funded, meaning your entire donation is programme money." />
              </div>

              <div className="space-y-4">
                {[
                  { pct: "60%", label: "Food Distribution", color: "bg-orange-500" },
                  { pct: "20%", label: "Medical Support", color: "bg-rose-500" },
                  { pct: "15%", label: "Education Support", color: "bg-slate-600" },
                  { pct: "5%", label: "Emergency Relief", color: "bg-slate-600" },
                ].map((b, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm font-bold text-slate-700 mb-1.5">
                      <span>{b.label}</span><span>{b.pct}</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div className={`h-full rounded-full ${b.color}`} initial={{ width: 0 }} whileInView={{ width: b.pct }} transition={{ duration: 1, delay: i * 0.15 }} viewport={{ once: true }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="premium-card rounded-2xl p-7">
                <h3 className="font-extrabold text-slate-900 mb-5">Why Donate to SSF?</h3>
                <ul className="space-y-3">
                  {[
                    "80G tax certificate issued instantly via email",
                    "Monthly impact reports sent to all donors",
                    "Visit our operations anytime — no appointment needed",
                    "Real-time beneficiary tracking dashboard",
                    "CSR partnership options available for companies",
                    "International donations accepted via wire transfer",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4">
                <Link href="/impact" className="flex-1">
                  <Button variant="outline" className="w-full rounded-full font-bold">
                    See Our Impact <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/contact" className="flex-1">
                  <Button variant="outline" className="w-full rounded-full font-bold">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-white">
        <div className="container-custom text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Not Ready to Donate?</h2>
            <p className="text-slate-500 text-lg mb-8">You can still make a difference by volunteering your time or spreading the word about our mission.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="outline" className="rounded-full px-10 h-14 font-bold text-base">
                  Become a Volunteer
                </Button>
              </Link>
              <Link href="/programs">
                <Button variant="primary" className="rounded-full px-10 h-14 font-bold text-base shadow-lg shadow-slate-500/20">
                  See Our Programs <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CHOOSE A CAUSE ── */}
      <DonationCausesSection />

      <DonorDetailsModal
        open={donorFormOpen}
        amount={finalAmount}
        causeLabel={donationNote}
        isSubmitting={isProcessing}
        onClose={() => {
          if (!isProcessing) setDonorFormOpen(false)
        }}
        onSubmit={handleDonorSubmit}
      />
    </div>
  )
}
