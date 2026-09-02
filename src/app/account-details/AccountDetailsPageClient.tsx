"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle2, Copy, Phone, Mail, MapPin, ArrowRight, Heart, HandCoins, Shield, Star, Building2, CreditCard, Smartphone, Globe, ChevronDown, Clock } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { SectionHeader } from "@/components/ui/SectionHeader"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

/* ── Bank details (replace placeholders with real data) ── */
const bankDetails = [
  { label: "Account Name", value: "Shrishyaam Welfare Foundation", icon: Building2 },
  { label: "Bank Name", value: "Yes Bank", icon: Building2 },
  { label: "Account Number", value: "001488700001325", icon: CreditCard },
  { label: "IFSC Code", value: "YESB0000014", icon: CreditCard },
  { label: "Branch", value: "Yes Bank, Noida Sector 63", icon: MapPin },
  { label: "Account Type", value: "Current Account", icon: CreditCard },
]

const paymentMethods = [
  {
    icon: Building2, title: "Bank Transfer", color: "text-slate-600 bg-slate-50 border-slate-100",
    how: "Log into your net banking or mobile banking app, add SSF as a beneficiary using the account number and IFSC code, and transfer any amount.",
    processing: "Credited within same day (IMPS) or 1 working day (NEFT/RTGS).",
    note: "Ideal for larger donations and corporate contributions.",
  },
  {
    icon: Smartphone, title: "UPI / QR Code", color: "text-slate-600 bg-slate-50 border-slate-100",
    how: "Open any UPI app (PhonePe, Google Pay, Paytm, BHIM), enter our UPI ID or scan the QR code, and complete payment in seconds.",
    processing: "Instant credit. Available 24/7.",
    note: "Simplest and fastest donation method.",
  },
  {
    icon: CreditCard, title: "NEFT", color: "text-orange-500 bg-orange-50 border-orange-100",
    how: "National Electronic Funds Transfer. Transfer funds from any bank branch or internet banking using our IFSC code and account number.",
    processing: "Processed in batches. Typically credited within 2 hours on working days.",
    note: "Available Monday–Saturday, 8 AM to 7 PM.",
  },
  {
    icon: Globe, title: "RTGS", color: "text-purple-600 bg-purple-50 border-purple-100",
    how: "Real Time Gross Settlement is ideal for high-value donations above ₹2 lakhs. Available through any RTGS-enabled bank.",
    processing: "Real-time. Credited within 30 minutes.",
    note: "Minimum transfer: ₹2,00,000.",
  },
  {
    icon: Smartphone, title: "IMPS", color: "text-rose-500 bg-rose-50 border-rose-100",
    how: "Immediate Payment Service works 24/7, 365 days. Transfer funds instantly using our account number and IFSC code.",
    processing: "Instant. Available even on bank holidays.",
    note: "Best for urgent or late-night donations.",
  },
]

const afterSteps = [
  { num: "01", icon: "💸", title: "Complete Donation", desc: "Transfer the amount via your preferred method — bank transfer, UPI, NEFT, RTGS, or IMPS." },
  { num: "02", icon: "📸", title: "Take a Screenshot", desc: "Capture a screenshot of your successful transaction or note down the transaction reference ID." },
  { num: "03", icon: "📲", title: "Share Transaction ID", desc: "Send us your name, transaction ID, amount, and contact details via WhatsApp or email." },
  { num: "04", icon: "✅", title: "Verification", desc: "Our accounts team verifies your transfer, usually within 2–4 working hours on business days." },
  { num: "05", icon: "📧", title: "Acknowledgement", desc: "You receive an official acknowledgement letter and your 80G tax certificate via email." },
  { num: "06", icon: "🙏", title: "Thank You", desc: "We send you a personalized thank-you message along with an update on the impact of your donation." },
]

const faqs = [
  { q: "How can I donate via bank transfer?", a: "Use our account number and IFSC code to initiate a transfer from your bank. After completing the transfer, share your transaction ID via WhatsApp or email. We will send an acknowledgement and 80G receipt within 24 hours." },
  { q: "Is my donation secure?", a: "Absolutely. Our bank is a regulated, nationalized institution. All transfers are fully secure. We never request your OTP, bank password, or any sensitive information." },
  { q: "Can I donate through UPI?", a: "Yes. Use our UPI ID or scan the QR code with any UPI-enabled app such as PhonePe, Google Pay, Paytm, or BHIM. Payments are instant and available 24/7." },
  { q: "How do I share payment proof?", a: "Simply WhatsApp or email us your full name, transaction reference ID, amount donated, and date of transfer. Our team will process your acknowledgement promptly." },
  { q: "Will I receive a tax receipt?", a: "Yes. Shri Shyam Foundation holds 80G tax exemption status. You will receive an official 80G certificate via email after your donation is verified." },
  { q: "Can I set up recurring monthly donations?", a: "Yes. You can set a standing instruction with your bank for monthly or quarterly transfers. Contact us on WhatsApp and we will guide you through the process." },
]

export function AccountDetailsPageClient() {
  const [copied, setCopied] = React.useState<string | null>(null)
  const [openFaq, setOpenFaq] = React.useState<number | null>(null)

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(label)
      setTimeout(() => setCopied(null), 2500)
    })
  }

  return (
    <div className="bg-white w-full max-w-full overflow-x-clip">

      {/* ── HERO ── */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center pt-24 sm:pt-36 lg:pt-56 pb-12 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/live/6.jpg.jpeg" alt="Shri Shyam Foundation team" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        </div>
        {/* Decorative blobs */}
        <motion.div className="absolute bottom-0 left-0 w-[280px] sm:w-[480px] h-[180px] sm:h-[300px] bg-orange-400/15 rounded-full blur-[120px] -translate-x-1/4"
          animate={{ x: [0, 16, 0] }} transition={{ duration: 12, repeat: Infinity }} />

        <div className="container-custom relative z-10 max-w-2xl">
          <motion.nav className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-300 mb-5 sm:mb-8 flex-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/donate" className="hover:text-white transition-colors">Donate</Link>
            <span>/</span>
            <span className="text-white font-semibold">Account Details</span>
          </motion.nav>

          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 border border-white/20 mb-4 sm:mb-6 max-w-full">
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-white leading-snug">100% Secure · 80G Tax Exempt · Verified NGO</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-4 sm:mb-6 tracking-tight">
              Donate Securely,<br />
              <span className="text-orange-400">Transform Lives</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 mb-7 sm:mb-10 max-w-xl leading-relaxed">
              Your contribution directly supports food distribution, medical assistance, education, and humanitarian programs. Every donation brings hope to someone in need.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link href="/donate">
                <Button variant="primary" size="lg" className="w-full sm:w-auto rounded-full h-12 sm:h-13 px-6 sm:px-8 font-bold shadow-2xl shadow-slate-600/40">
                  Donate Now <HandCoins className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a href="https://wa.me/919990145555" target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg" className="w-full sm:w-auto rounded-full h-12 sm:h-13 px-6 sm:px-8 font-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  WhatsApp Us
                </Button>
              </a>
              <a href="tel:+919990145555">
                <Button size="lg" className="w-full sm:w-auto rounded-full h-12 sm:h-13 px-6 sm:px-8 font-bold bg-white/10 border border-white/30 text-white hover:bg-white/20">
                  <Phone className="w-4 h-4 mr-2" /> Call Us
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TRUST BADGES ── */}
      <section className="bg-white py-10 border-b border-slate-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { icon: Shield, label: "Secure Donations", sub: "256-bit SSL encrypted", color: "text-slate-600 bg-slate-50 border-slate-100" },
              { icon: CheckCircle2, label: "Verified NGO", sub: "Ministry of Social Justice", color: "text-slate-600 bg-slate-50 border-slate-100" },
              { icon: Star, label: "80G Tax Exempt", sub: "Save up to 50% on taxes", color: "text-orange-500 bg-orange-50 border-orange-100" },
              { icon: Globe, label: "100% Transparent", sub: "Annual public audits", color: "text-purple-600 bg-purple-50 border-purple-100" },
            ].map((b, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.1} viewport={{ once: true }}
                className={`${b.color} border rounded-2xl p-3 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4`}>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl ${b.color} flex items-center justify-center shrink-0`}>
                  <b.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-xs sm:text-sm">{b.label}</p>
                  <p className="text-slate-500 text-[10px] sm:text-xs">{b.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BANK ACCOUNT DETAILS + QR ── */}
      <section className="section-spacing bg-gradient-to-br from-slate-50 to-slate-50/40 overflow-x-hidden">
        <div className="container-custom max-w-full">
          <SectionHeader badge="Bank Account Details" title="Transfer Directly to Our Account" subtitle="Use the details below to donate via NEFT, RTGS, IMPS, or direct bank transfer. All fields are copy-friendly." className="mb-12 text-center" align="center" />

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 items-start min-w-0">

            {/* Account Details Card */}
            <div className="lg:col-span-2 min-w-0 w-full">
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="premium-card rounded-2xl sm:rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-r from-slate-600 to-slate-700 p-5 sm:p-6 flex items-center gap-3 sm:gap-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-extrabold text-base sm:text-lg truncate">Shri Shyam Foundation</p>
                    <p className="text-slate-200 text-xs sm:text-sm">Official Bank Account — Verified NGO</p>
                  </div>
                </div>
                <div className="p-4 sm:p-8 space-y-3 sm:space-y-4">
                  {bankDetails.map((field, i) => (
                    <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.06} viewport={{ once: true }}
                      className="flex items-start justify-between gap-2 p-3 sm:p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-slate-200 hover:bg-slate-50/50 transition-all">
                      <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                          <field.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide">{field.label}</p>
                          <p className="font-bold text-slate-900 text-xs sm:text-sm break-all leading-snug mt-0.5">{field.value}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopy(field.value, field.label)}
                        aria-label={`Copy ${field.label}`}
                        className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm">
                        {copied === field.label
                          ? <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
                          : <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                      </button>
                    </motion.div>
                  ))}
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 sm:p-4 mt-4">
                    <p className="text-amber-800 text-xs font-semibold flex items-start gap-2">
                      <Shield className="w-3.5 h-3.5 shrink-0 mt-0.5 fill-amber-500 text-amber-500" />
                      These are the official bank details. Contact us on WhatsApp for immediate assistance.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* QR Code + UPI */}
            <div className="space-y-5 sm:space-y-6 min-w-0 w-full">
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" custom={0.2} viewport={{ once: true }}
                className="premium-card rounded-2xl sm:rounded-3xl p-5 sm:p-7 text-center w-full min-w-0 overflow-hidden">
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-600 mb-4">
                  Scan &amp; Pay via UPI
                </p>
                <div className="mx-auto mb-5 w-full max-w-[220px] sm:max-w-[240px] rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm overflow-hidden">
                  <img
                    src="/images/upi-qr.png"
                    alt="Shri Shyam Foundation UPI QR Code — shrishyamfoundation2506@aubank"
                    width={317}
                    height={368}
                    className="block w-full h-auto max-w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=shrishyamfoundation2506@aubank%26pn=Shri%20Shyam%20Foundation%26cu=INR"
                    }}
                  />
                </div>
                <p className="font-bold text-slate-900 text-sm mb-1">Scan with any UPI app</p>
                <p className="text-slate-500 text-xs mb-1 break-all px-1">
                  UPI ID: shrishyamfoundation2506@aubank
                </p>
                <p className="text-slate-400 text-[11px] sm:text-xs">PhonePe · Google Pay · Paytm · BHIM</p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {["PhonePe", "GPay", "Paytm", "BHIM"].map((app) => (
                    <span
                      key={app}
                      className="bg-slate-100 text-slate-600 text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-full"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Share after payment */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" custom={0.3} viewport={{ once: true }}
                className="premium-card rounded-2xl sm:rounded-3xl p-5 sm:p-7 bg-gradient-to-br from-slate-600 to-slate-700 text-white overflow-hidden">
                <p className="font-extrabold text-lg mb-2">After Donating?</p>
                <p className="text-slate-100 text-sm mb-5 leading-relaxed">Share your transaction ID with us and receive your 80G receipt within 24 hours.</p>
                <a href="https://wa.me/919990145555?text=Hi%2C%20I%20just%20donated%20to%20Shri%20Shyam%20Foundation.%20My%20transaction%20ID%20is%3A%20" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-white text-slate-700 hover:bg-slate-50 font-bold rounded-full h-11 text-sm border-0 shadow-lg">
                    Share via WhatsApp
                  </Button>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PAYMENT METHODS ── */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <SectionHeader badge="Payment Methods" title="Multiple Ways to Donate" subtitle="Choose the method that works best for you. Every channel is equally secure and fully verified." className="mb-16 text-center" align="center" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paymentMethods.map((m, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.1} viewport={{ once: true }}
                className="premium-card rounded-2xl p-7 group">
                <div className={`w-12 h-12 rounded-2xl ${m.color} border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <m.icon className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg mb-3">{m.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{m.how}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{m.processing}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{m.note}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AFTER DONATION STEPS ── */}
      <section className="section-spacing bg-gradient-to-br from-slate-50 to-orange-50">
        <div className="container-custom">
          <SectionHeader badge="After You Donate" title="What Happens Next?" subtitle="A simple 6-step process ensures your donation is verified, acknowledged, and put to work immediately." className="mb-16 text-center" align="center" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {afterSteps.map((step, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.1} viewport={{ once: true }}
                className="premium-card rounded-2xl p-7 relative group">
                <span className="absolute top-5 right-5 text-4xl font-black text-slate-100">{step.num}</span>
                <div className="text-3xl mb-4">{step.icon}</div>
                <h3 className="font-extrabold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" custom={0.5} viewport={{ once: true }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919990145555" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="rounded-full px-10 h-13 font-bold text-base shadow-lg shadow-slate-500/25">
                Share Transaction ID on WhatsApp
              </Button>
            </a>
            <a href="mailto:info@shrishyamfoundation.org">
              <Button variant="outline" className="rounded-full px-10 h-13 font-bold text-base">
                Email Your Receipt <Mail className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-spacing bg-white">
        <div className="container-custom max-w-3xl">
          <SectionHeader badge="FAQs" title="Frequently Asked Questions" subtitle="Everything you need to know about donating via bank transfer to Shri Shyam Foundation." className="mb-12 text-center" align="center" />
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.08} viewport={{ once: true }}
                className="premium-card rounded-2xl overflow-hidden">
                <button className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-slate-600 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${openFaq === i ? "rotate-180 text-slate-600" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">{faq.a}</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 p-8 sm:p-14 text-white shadow-2xl shadow-slate-900/30 text-center">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-400/15 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 border border-white/20 mb-5 sm:mb-6">
                <Heart className="w-4 h-4 fill-orange-400 text-orange-400" />
                <span className="text-xs sm:text-sm font-semibold">Creating Hope Together</span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 leading-tight">Every Contribution Creates Hope</h2>
              <p className="text-slate-200 text-sm sm:text-lg max-w-2xl mx-auto mb-7 sm:mb-10 leading-relaxed">
                Whether it is ₹100 or ₹1,00,000 — your generosity feeds families, educates children, heals patients, and protects animals. Thank you for your kindness.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                <Link href="/donate">
                  <Button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-full px-8 sm:px-10 h-12 sm:h-14 text-sm sm:text-base shadow-xl border-0">
                    Donate Now <HandCoins className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <a href="tel:+919990145555">
                  <Button className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20 font-bold rounded-full px-8 sm:px-10 h-12 sm:h-14 text-sm sm:text-base border border-white/30">
                    <Phone className="w-4 h-4 mr-2" /> Call Now
                  </Button>
                </a>
                <a href="https://wa.me/919990145555" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full sm:w-auto bg-[#25D366]/20 text-white hover:bg-[#25D366]/30 font-bold rounded-full px-8 sm:px-10 h-12 sm:h-14 text-sm sm:text-base border border-white/30">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-[#25D366]">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                    WhatsApp
                  </Button>
                </a>
                <Link href="/contact">
                  <Button className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20 font-bold rounded-full px-8 sm:px-10 h-12 sm:h-14 text-sm sm:text-base border border-white/30">
                    Become Volunteer <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TOAST NOTIFICATION ── */}
      {copied && (
        <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 text-sm font-bold">
          <CheckCircle2 className="w-4 h-4 text-slate-400" />
          {copied} — Copied Successfully!
        </motion.div>
      )}
    </div>
  )
}
