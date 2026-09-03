"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Heart, HandCoins, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

export function GalleryHero() {
  return (
    <section className="relative min-h-[75vh] flex items-center pt-28 sm:pt-36 lg:pt-56 pb-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/gallery/program-2.webp"
          alt="Shri Shyam Foundation Gallery"
          className="w-full h-full "
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container-custom relative z-10 max-w-3xl">
        <motion.nav className="flex items-center gap-2 text-sm text-slate-300 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white font-semibold">Impact Gallery</span>
        </motion.nav>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-md">
            <Heart className="w-4 h-4 text-rose-400" />
            <span className="text-sm font-semibold text-white tracking-wide">100% Real Impact · Transparency First</span>
          </div>
        </motion.div>

        <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
          Moments of <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-400">Compassion</span>,<br />
          Stories of Hope
        </motion.h1>

        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="text-lg  sm:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
          Every image reflects real lives touched, real volunteers serving, and real moments of kindness made possible through the support of our community.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap items-center gap-4">
          <Link href="/donate">
            <Button variant="primary" size="lg" className="rounded-full cursor-pointer h-14 px-8 font-bold text-base shadow-2xl shadow-slate-500/25 hover:shadow-slate-500/40 hover:-translate-y-1 transition-all">
              Donate Now <HandCoins className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" className="rounded-full cursor-pointer h-14 px-8 font-bold text-base bg-white/10 border border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transition-all">
              Become Volunteer
            </Button>
          </Link>
          <a href="#gallery" className="hidden sm:flex items-center gap-2 text-white font-semibold hover:text-slate-400 transition-colors ml-4">
            View Impact <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
