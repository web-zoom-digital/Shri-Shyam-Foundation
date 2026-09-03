"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Heart, HandCoins, CheckCircle2, Phone } from "lucide-react"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Button } from "@/components/ui/Button"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

const steps = [
  {
    num: "01",
    emoji: "❤️",
    title: "Collect Donations",
    desc: "Generous supporters like you contribute funds to help communities in need — every rupee counts.",
    gradient: "from-rose-500 to-pink-500",
    softBg: "bg-rose-50",
    border: "border-rose-200",
    glow: "shadow-rose-200",
    image: "/images/live/Untitled-design-31.jpg",
    alt: "Volunteers and supporters at Shri Shyam Foundation",
  },
  {
    num: "02",
    emoji: "📋",
    title: "Planning & Verification",
    desc: "Our team carefully plans distribution based on verified needs, priority areas, and field reports.",
    gradient: "from-slate-600 to-slate-400",
    softBg: "bg-slate-50",
    border: "border-slate-200",
    glow: "shadow-slate-200",
    image: "/images/live/Untitled-design-32.jpg",
    alt: "SSF team planning and verifying community support programs",
  },
  {
    num: "03",
    emoji: "🛒",
    title: "Purchase Essentials",
    desc: "Food, medicines, educational materials, clothing, or relief supplies are sourced from trusted local vendors.",
    gradient: "from-orange-500 to-amber-400",
    softBg: "bg-orange-50",
    border: "border-orange-200",
    glow: "shadow-orange-200",
    image: "/images/live/Untitled-design-33.jpg",
    alt: "SSF volunteers preparing meal packages and essential supplies",
  },
  {
    num: "04",
    emoji: "🚚",
    title: "Distribution",
    desc: "Volunteers and field teams deliver assistance directly to beneficiaries with dignity, care, and no middlemen.",
    gradient: "from-slate-600 to-slate-400",
    softBg: "bg-slate-50",
    border: "border-slate-200",
    glow: "shadow-slate-200",
    image: "/images/live/download-2.jpg",
    alt: "SSF volunteers distributing food and essentials to community members",
  },
  {
    num: "05",
    emoji: "📈",
    title: "Impact & Transparency",
    desc: "Activities are documented, photographed, and shared publicly to maintain complete accountability and donor confidence.",
    gradient: "from-purple-600 to-purple-400",
    softBg: "bg-purple-50",
    border: "border-purple-200",
    glow: "shadow-purple-200",
    image: "/images/live/9.jpg.jpeg",
    alt: "SSF impact documentation and transparency reporting",
  },
]

const trustItems = [
  "Transparent Process",
  "Verified NGO",
  "Secure Donation",
  "Community Driven",
  "Impact Focused",
  "Full Accountability",
]

/* ── Animated connector line (Mobile Only Now) ── */
function MobileConnectorLine({ index, total }: { index: number; total: number }) {
  if (index >= total - 1) return null
  return (
    <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-slate-200 rounded-full z-0" />
  )
}

export function DonationImpactTimeline() {
  return (
    <section className="section-spacing bg-white relative overflow-hidden">
      {/* Subtle background circles */}
      <div className="absolute top-0 right-0 w-[260px] sm:w-[420px] h-[260px] sm:h-[420px] bg-slate-50/60 rounded-full -translate-y-1/3 translate-x-1/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[220px] sm:w-[340px] h-[220px] sm:h-[340px] bg-slate-50/60 rounded-full translate-y-1/3 -translate-x-1/3 blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeader
          badge="✨ Transparent Donation Process"
          title="How Your Donation Creates Real Impact"
          subtitle="Every contribution follows a transparent and accountable process to ensure help reaches those who need it most."
          align="center"
          className="mb-16 text-center"
        />

        {/* ── DESKTOP: Horizontal timeline ── */}
        <div className="hidden lg:flex relative mb-20 w-full px-2">
          {/* Continuous line behind the cards */}
          <div className="absolute top-[48px] left-[10%] right-[10%] h-[3px] bg-slate-100 z-0 rounded-full overflow-hidden">
             <motion.div 
               className="absolute inset-y-0 left-0 bg-gradient-to-r from-rose-400 via-orange-400 to-purple-400"
               initial={{ width: "0%" }}
               whileInView={{ width: "100%" }}
               viewport={{ once: true }}
               transition={{ duration: 2.5, ease: "easeInOut" }}
             />
          </div>

          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              custom={i * 0.15}
              viewport={{ once: true }}
              className="flex-1 flex flex-col items-center relative z-10 px-2 lg:px-3 h-full group"
            >
              {/* Card */}
              <div className={`w-full bg-white rounded-[32px] border-2 ${step.border} p-6 lg:p-8 text-center relative overflow-hidden shadow-lg shadow-slate-100 hover:shadow-2xl hover:shadow-${step.border.split('-')[1]}-100 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center h-full`}>
                
                {/* Number Watermark */}
                <span className="absolute -top-2 right-4 text-7xl font-black text-slate-50 group-hover:text-slate-100 transition-colors z-0 select-none pointer-events-none">
                  {step.num}
                </span>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-3xl shadow-lg ${step.glow} mb-6 relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                  {step.emoji}
                </div>

                {/* Text */}
                <h3 className="font-extrabold text-slate-900 text-base lg:text-lg mb-3 relative z-10 leading-snug">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-xs lg:text-sm leading-relaxed relative z-10">
                  {step.desc}
                </p>
                
                {/* Subtle bottom gradient accent inside card */}
                <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </div>

              {/* Floating Dot Below Card */}
              <div className="h-6 flex items-center justify-center mt-6">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${step.gradient} shadow-sm group-hover:scale-150 transition-transform duration-300`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── MOBILE: Vertical timeline ── */}
        <div className="lg:hidden relative pl-10 space-y-8 mb-12">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200 rounded-full" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              custom={i * 0.1}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Dot on vertical line */}
              <div className={`absolute -left-6 top-6 w-4 h-4 rounded-full bg-gradient-to-br ${step.gradient} shadow-md border-2 border-white`} />

              {/* Card */}
              <div className={`bg-white rounded-3xl border ${step.border} shadow-md p-6 overflow-hidden relative`}>
                <span className="absolute top-3 right-4 text-4xl font-black text-slate-100 select-none">{step.num}</span>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-2xl mb-4 shadow-md`}>
                  {step.emoji}
                </div>
                <h3 className="font-extrabold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── TRUST BAR ── */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" custom={0.5} viewport={{ once: true }}
          className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-12">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {trustItems.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── BOTTOM EMOTIONAL CTA BANNER ── */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" custom={0.6} viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-700 p-12 text-white text-center shadow-2xl shadow-slate-900/25">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-400/15 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex mb-5">
              <Heart className="w-10 h-10 text-orange-400 fill-orange-400" />
            </motion.div>
            <h3 className="text-3xl text-white lg:text-4xl font-extrabold mb-4 leading-tight">
              Your Kindness Becomes<br className="hidden sm:block" /> Someone&apos;s Hope
            </h3>
            <p className="text-slate-200 text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Every step of this process — from collecting your donation to delivering food, medicines, and care — is carried out with integrity, love, and full accountability.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/donate">
                <Button className="bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-full px-10 h-13 text-base shadow-xl border-0 transition-all hover:-translate-y-1">
                  Donate Now <HandCoins className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a href="tel:+919990145555">
                <Button className="bg-white/10 text-white hover:bg-white/20 font-bold rounded-full px-8 h-13 text-base border border-white/30 transition-all hover:-translate-y-1">
                  <Phone className="w-4 h-4 mr-2" /> Call Us
                </Button>
              </a>
              <a href="https://wa.me/919990145555" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#25D366]/20 text-white hover:bg-[#25D366]/30 font-bold rounded-full px-8 h-13 text-base border border-white/30 transition-all hover:-translate-y-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-[#25D366]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  WhatsApp
                </Button>
              </a>
              <Link href="/contact">
                <Button className="bg-white/10 text-white hover:bg-white/20 font-bold rounded-full px-8 h-13 text-base border border-white/30 transition-all hover:-translate-y-1">
                  🤝 Become Volunteer
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
