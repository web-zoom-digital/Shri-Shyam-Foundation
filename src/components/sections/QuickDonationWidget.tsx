"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, CheckCircle2, Shield, Star, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { DonorDetailsModal } from "@/components/donate/DonorDetailsModal"
import { useRazorpayCheckout } from "@/hooks/useRazorpayCheckout"
import type { DonorDetails } from "@/lib/donorSchema"
import {
  GENERAL_DONATION_OPTIONS,
  estimateMeals,
  formatInr,
  getDonationOption,
} from "@/data/donationPricing"

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

export function QuickDonationWidget() {
  const [selected, setSelected] = React.useState(501)
  const [customAmount, setCustomAmount] = React.useState("")
  const [isCustom, setIsCustom] = React.useState(false)
  const [ripple, setRipple] = React.useState<{ x: number; y: number } | null>(null)
  const [donorFormOpen, setDonorFormOpen] = React.useState(false)
  const {
    isProcessing,
    paymentError,
    paymentSuccess,
    clearPaymentError,
    clearPaymentSuccess,
    startCheckout,
  } = useRazorpayCheckout()

  const displayAmount = isCustom ? parseInt(customAmount) || 0 : selected
  const selectedOption = getDonationOption(displayAmount)
  const mealCount = estimateMeals(displayAmount)
  const impactLine =
    selectedOption?.impact ??
    (displayAmount > 0
      ? `Supports about ${mealCount} ${mealCount === 1 ? "meal" : "meals"} for people in need`
      : "")

  const handleChip = (amount: number) => {
    setSelected(amount)
    setIsCustom(false)
    setCustomAmount("")
  }

  const handleCustom = (val: string) => {
    setCustomAmount(val.replace(/\D/g, ""))
    setIsCustom(true)
    setSelected(0)
  }

  const handleDonate = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (displayAmount < 1 || isProcessing) return
    const rect = e.currentTarget.getBoundingClientRect()
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    clearPaymentError()
    clearPaymentSuccess()
    setDonorFormOpen(true)
  }

  const handleDonorSubmit = async (donor: DonorDetails) => {
    const result = await startCheckout({
      amount: displayAmount,
      returnPath: "/",
      orderNote: "General Donation",
      donor,
    })
    if (result.ok) setDonorFormOpen(false)
  }

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-orange-50/60" />
      <motion.div
        className="absolute top-0 left-0 w-[220px] sm:w-[360px] h-[220px] sm:h-[360px] rounded-full bg-slate-200/30 blur-[100px] -translate-x-1/3 -translate-y-1/4"
        animate={{ scale: [1, 1.08, 1], x: [0, 10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] rounded-full bg-orange-200/35 blur-[90px] translate-x-1/3 translate-y-1/4"
        animate={{ scale: [1, 1.1, 1], x: [0, -8, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-orange-200 shadow-sm mb-7"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span className="text-sm font-bold text-orange-700">Make an Impact Today</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.1] mb-4 sm:mb-5 tracking-tight">
              Feed Hope.
              <br />
              <span className="bg-gradient-to-r from-slate-600 to-slate-400 bg-clip-text text-transparent">
                Change Lives.
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-md">
              Choose an amount below. Every rupee supports hot meals, medical care or education — and you will see the same impact numbers on our Donate and Impact pages.
            </p>

            <div className="space-y-3">
              {[
                { icon: Shield, text: "100% Secure Donation", color: "text-slate-600" },
                { icon: CheckCircle2, text: "Verified & Transparent NGO", color: "text-slate-600" },
                { icon: Star, text: "80G Tax Receipt by Email", color: "text-orange-500" },
              ].map((b, i) => (
                <motion.div
                  key={b.text}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  custom={i * 0.15 + 0.3}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                    <b.icon className={`w-4 h-4 ${b.color}`} />
                  </div>
                  <span className="text-slate-700 font-semibold text-sm">{b.text}</span>
                </motion.div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {displayAmount > 0 && (
                <motion.div
                  key={displayAmount}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 inline-flex items-start gap-3 bg-slate-600 text-white px-5 py-3 rounded-2xl shadow-lg shadow-slate-600/25 max-w-md"
                >
                  <Sparkles className="w-5 h-5 fill-white shrink-0 mt-0.5" />
                  <span className="font-bold text-sm leading-snug">
                    ₹{formatInr(displayAmount)} — {impactLine}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative bg-white/80 backdrop-blur-xl rounded-[22px] sm:rounded-[28px] p-5 sm:p-8 shadow-[0_24px_60px_-12px_rgba(48,80,138,0.18),0_8px_24px_-6px_rgba(0,0,0,0.06)] border border-white/80">
              <div className="absolute top-0 left-8 right-8 h-[3px] rounded-full bg-gradient-to-r from-slate-400 via-orange-400 to-slate-400" />

              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Donate Securely</p>
                  <p className="text-xl font-extrabold text-slate-900">Choose Your Contribution</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center shadow-lg shadow-slate-500/30">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
              </div>

              <div className="relative mb-6">
                <div className="flex items-center bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 focus-within:border-slate-400 focus-within:bg-white transition-all">
                  <span className="text-2xl font-black text-slate-600 mr-3">₹</span>
                  <input
                    type="text"
                    value={isCustom ? customAmount : formatInr(displayAmount)}
                    onChange={(e) => handleCustom(e.target.value)}
                    onFocus={() => setIsCustom(true)}
                    aria-label="Donation amount in rupees"
                    className="flex-1 text-2xl sm:text-3xl font-black text-slate-900 bg-transparent outline-none w-full min-w-0"
                    placeholder="501"
                  />
                  <span className="text-slate-400 text-sm font-semibold ml-2">INR</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {GENERAL_DONATION_OPTIONS.map((chip) => {
                  const isActive = !isCustom && selected === chip.amount
                  return (
                    <motion.button
                      key={chip.amount}
                      type="button"
                      onClick={() => handleChip(chip.amount)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative flex flex-col items-center justify-center p-3 rounded-2xl border-2 text-center cursor-pointer transition-all duration-200 overflow-hidden
                        ${
                          isActive
                            ? "border-slate-500 bg-slate-50 shadow-md shadow-slate-500/20"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50 hover:shadow-sm"
                        }`}
                      aria-pressed={isActive}
                    >
                      {isActive && (
                        <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-slate-500 flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </span>
                      )}
                      <span className={`text-lg font-black ${isActive ? "text-slate-700" : "text-slate-900"}`}>
                        ₹{formatInr(chip.amount)}
                      </span>
                      <span className={`text-xs font-semibold mt-0.5 ${isActive ? "text-slate-600" : "text-slate-500"}`}>
                        {chip.label}
                      </span>
                    </motion.button>
                  )
                })}
              </div>

              {isCustom && customAmount && (
                <p className="text-slate-700 text-xs font-semibold mb-4 text-center">
                  Custom amount: ₹{formatInr(parseInt(customAmount) || 0)} — thank you for giving.
                </p>
              )}

              {paymentError && (
                <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 mb-4">
                  <p className="text-amber-900 font-bold text-sm mb-1">Payment notice</p>
                  <p className="text-amber-800 text-sm leading-relaxed mb-3">{paymentError}</p>
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
                      onClick={clearPaymentError}
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              )}

              {paymentSuccess && (
                <div className="bg-slate-50 border border-slate-300 rounded-2xl p-4 mb-4">
                  <p className="text-slate-900 font-bold text-sm mb-1">Thank you</p>
                  <p className="text-slate-800 text-sm leading-relaxed">{paymentSuccess}</p>
                </div>
              )}

              <motion.button
                type="button"
                onClick={handleDonate}
                disabled={isProcessing || displayAmount < 1}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full h-14 rounded-2xl bg-gradient-to-r from-slate-600 to-slate-500 text-white font-extrabold text-base overflow-hidden shadow-xl shadow-slate-600/35 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-all"
              >
                {ripple && (
                  <motion.span
                    initial={{ width: 0, height: 0, opacity: 0.6 }}
                    animate={{ width: 400, height: 400, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ left: ripple.x - 200, top: ripple.y - 200 }}
                    className="absolute rounded-full bg-white/40 pointer-events-none"
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5 fill-white" />
                      Donate ₹{formatInr(displayAmount)} Securely
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </span>
              </motion.button>

              <p className="text-center text-slate-500 text-xs mt-4 leading-relaxed px-2">
                Same amounts as on our Donate & Impact pages. 80G receipt by email after payment.
              </p>

              <div className="flex justify-center gap-3 mt-4">
                {["UPI", "NEFT", "IMPS", "Card", "Net Banking"].map((m) => (
                  <span key={m} className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-md">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <DonorDetailsModal
        open={donorFormOpen}
        amount={displayAmount}
        causeLabel="General Donation"
        isSubmitting={isProcessing}
        onClose={() => {
          if (!isProcessing) setDonorFormOpen(false)
        }}
        onSubmit={handleDonorSubmit}
      />
    </section>
  )
}
