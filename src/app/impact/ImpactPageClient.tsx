"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Heart, HandCoins, Users, BookOpen, Stethoscope, MapPin, Star, ArrowRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { GENERAL_DONATION_OPTIONS, formatInr } from "@/data/donationPricing"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }),
}

// Animated counter component
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = React.useState(0)
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true })

  React.useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = 16
    const increment = target / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, step)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count.toLocaleString("en-IN")}{suffix}</span>
}

const stats = [
  { icon: Heart, number: 5000000, suffix: "+", label: "Meals Served", sublabel: "Hot meals since 2015 (programme estimate)", color: "from-orange-500 to-amber-400", bg: "bg-orange-50", text: "text-orange-600" },
  { icon: Users, number: 120000, suffix: "+", label: "Families Supported", sublabel: "Across districts we serve in NCR & UP", color: "from-slate-600 to-slate-400", bg: "bg-slate-50", text: "text-slate-600" },
  { icon: BookOpen, number: 3200, suffix: "+", label: "Children Supported", sublabel: "School kits and education drives", color: "from-slate-600 to-slate-400", bg: "bg-slate-50", text: "text-slate-600" },
  { icon: Stethoscope, number: 25000, suffix: "+", label: "Medical Beneficiaries", sublabel: "Camps, consultations and medicines", color: "from-rose-500 to-pink-400", bg: "bg-rose-50", text: "text-rose-600" },
  { icon: MapPin, number: 200, suffix: "+", label: "Communities Reached", sublabel: "Urban and rural outreach points", color: "from-purple-600 to-violet-400", bg: "bg-purple-50", text: "text-purple-600" },
  { icon: Star, number: 500, suffix: "+", label: "Active Volunteers", sublabel: "People who show up for seva", color: "from-yellow-500 to-orange-400", bg: "bg-yellow-50", text: "text-yellow-600" },
]

const stories = [
  {
    name: "Kavitha Devi",
    location: "Kamrup, Assam",
    story: "My husband was in the hospital for three months. I couldn't work. SSF gave us two hot meals every day for those three months. My children never went to sleep hungry. Today my husband is back and working. I will never forget what they did for my family.",
    program: "Food Distribution",
    color: "from-orange-500 to-amber-400",
  },
  {
    name: "Rajan, 8 years old",
    location: "Nalbari, Assam",
    story: "I used to sell newspapers in the morning before school. I was always tired in class. SSF's education centre started a scholarship for children like me. Now I don't need to work. I want to become a doctor one day.",
    program: "Education Support",
    color: "from-slate-600 to-slate-400",
  },
  {
    name: "Mamoni Bora",
    location: "Barpeta, Assam",
    story: "My blood pressure was 200/110 and I had no money for tests. The SSF medical camp came to our village. The doctor was shocked I was still alive. They arranged my tests, medicines and a hospital appointment. I am alive because of them.",
    program: "Medical Support",
    color: "from-rose-500 to-pink-400",
  },
]

const donationImpact = GENERAL_DONATION_OPTIONS.map((o) => ({
  amount: `₹${formatInr(o.amount)}`,
  desc: o.impact,
  href: `/donate?amount=${o.amount}`,
}))

const testimonials = [
  { name: "Dr. Priya Mehta", role: "CSR Director, TechCorp India", text: "We have partnered with many NGOs. SSF stands apart in one way — every single rupee is accounted for, and the impact reports arrive monthly without our asking. This is what a model NGO looks like." },
  { name: "Rajesh Kumar Singh", role: "FCRA Auditor", text: "In 15 years of NGO auditing, SSF is among a handful of organisations with genuinely zero financial irregularities. Their commitment to transparency is not performative — it is cultural." },
  { name: "Anita Sharma", role: "Volunteer, 4 years", text: "I started volunteering on a whim, to fill a Sunday. Now I cannot imagine a Sunday without SSF. The people we serve — they change you. You realize how much you have and how little others need to be happy." },
]

export function ImpactPageClient() {
  return (
    <div className="bg-white w-full max-w-full overflow-x-clip">
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center pt-28 sm:pt-36 lg:pt-56 pb-20 overflow-hidden gradient-hero">
        <motion.div className="absolute top-10 right-0 w-[260px] sm:w-[500px] h-[260px] sm:h-[500px] bg-slate-100 rounded-full blur-3xl opacity-40 translate-x-1/3"
          animate={{ x: [0, 30, 0], scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity }} />
        <div className="container-custom relative z-10">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-600 font-semibold">Our Impact</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div variants={fadeUp} initial="hidden" animate="show" className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 mb-6">
                <Star className="w-4 h-4 text-slate-600 fill-slate-600" />
                <span className="text-sm font-semibold text-slate-800">9 Years of Measurable Impact</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
                Real Numbers.<br />
                Real <span className="text-gradient-warm">Lives Changed.</span><br />
                Real <span className="text-gradient-primary">Accountability.</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                We track meals, school support, medical outreach and cow welfare across the communities we serve.
                Below are cumulative programme estimates since 2015 — with notes on how to read them.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-white/50">
                <img 
                  src="/images/live/IMG20260714115736-6XDWu.jpg" 
                  alt="Children receiving school support materials during an SSF education drive"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full transform hover:scale-105 transition-transform duration-700" 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-spacing bg-slate-50">
        <div className="container-custom">
          <SectionHeader badge="Impact Numbers" title="The Numbers Behind Our Mission" subtitle="Cumulative programme estimates maintained by our team since 2015. Contact us if you need a detailed breakdown for a specific year or programme." align="center" className="mb-14" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((s, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.1} viewport={{ once: true }}
                className="premium-card p-8 rounded-2xl group text-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                  <s.icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-4xl font-black text-slate-900 mb-1">
                  <AnimatedCounter target={s.number} suffix={s.suffix} />
                </p>
                <p className="font-bold text-slate-800 mb-1">{s.label}</p>
                <p className="text-slate-500 text-sm">{s.sublabel}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Methodology note: totals combine food drives, education kits, medical camps, volunteer engagement and outreach locations recorded in our programme logs. They are directional scale indicators, not a substitute for a formal audited annual report.
          </p>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <SectionHeader badge="Real Stories" title="Behind Every Number Is a Human Life" subtitle="Statistics describe scale. Stories reveal truth. These are three of over a million stories from our work." align="center" className="mb-14" />
          <div className="grid md:grid-cols-3 gap-8">
            {stories.map((s, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.15} viewport={{ once: true }}
                className="premium-card rounded-2xl overflow-hidden group">
                <div className={`h-2 bg-gradient-to-r ${s.color}`} />
                <div className="p-8">
                  <Quote className="w-8 h-8 text-slate-200 mb-4" />
                  <p className="text-slate-600 leading-relaxed italic mb-6 text-sm">"{s.story}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center text-white font-bold text-lg`}>
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{s.name}</p>
                      <p className="text-slate-500 text-xs">{s.location} · {s.program}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Impact Calculator */}
      <section className="section-spacing bg-[#fef2f2] text-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#dc2626]/10 rounded-full blur-[100px]" />
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <span className="text-[#dc2626] text-sm font-bold tracking-widest uppercase block mb-3">Donation Impact</span>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">Your Money Does<br />Extraordinary Things</h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                Every gift below uses the same amounts you see on Home and Donate — so the impact story never changes from page to page.
              </p>
              <Link href="/donate">
                <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold rounded-full px-10 h-14 text-base border-0 shadow-xl">
                  Donate Now <HandCoins className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
            <div className="space-y-3">
              {donationImpact.map((d, i) => (
                <motion.div key={d.amount} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.08} viewport={{ once: true }}
                  className="flex items-center gap-4 bg-white border border-red-100 p-5 rounded-2xl hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/10 shadow-sm transition-all group">
                  <div className="w-20 shrink-0 text-center">
                    <span className="text-lg font-black text-[#dc2626]">{d.amount}</span>
                  </div>
                  <div className="w-px h-10 bg-red-100" />
                  <div className="flex-1 flex items-center justify-between gap-3">
                    <p className="text-slate-700 text-sm font-medium group-hover:text-slate-900 transition-colors">{d.desc}</p>
                    <Link
                      href={d.href}
                      className="shrink-0 text-[#dc2626] text-xs font-bold hover:text-[#b91c1c] whitespace-nowrap"
                    >
                      Donate →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-spacing bg-slate-50">
        <div className="container-custom">
          <SectionHeader badge="What People Say" title="Trusted by Donors, Auditors & Volunteers" subtitle="Our credibility is not self-declared. It is earned through consistent action and verified by independent voices." align="center" className="mb-14" />
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.15} viewport={{ once: true }}
                className="premium-card p-8 rounded-2xl">
                <div className="flex gap-1 mb-5">
                  {Array(5).fill(0).map((_, j) => <Star key={j} className="w-4 h-4 text-orange-400 fill-orange-400" />)}
                </div>
                <p className="text-slate-600 leading-relaxed italic text-sm mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-white">
        <div className="container-custom text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="bg-gradient-to-r from-orange-500 to-amber-400 rounded-3xl p-14 text-white shadow-2xl shadow-orange-500/25">
            <h2 className="text-4xl font-extrabold mb-4">Add Your Impact to This Story</h2>
            <p className="text-orange-100 text-lg max-w-2xl mx-auto mb-8">The numbers above grew because thousands of ordinary people made an extraordinary choice — to give. Your turn.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/donate">
                <Button className="bg-white text-orange-600 hover:bg-orange-50 font-bold rounded-full px-10 h-14 text-base shadow-xl border-0">
                  Donate Now <HandCoins className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-orange-600/20 text-white hover:bg-orange-600/30 font-bold rounded-full px-10 h-14 text-base border border-white/30">
                  Become a Volunteer <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
