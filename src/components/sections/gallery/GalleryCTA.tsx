"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Heart, HandCoins, Camera } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function GalleryCTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/gallery/program-1.webp"
          alt="Background"
          className="w-full h-full object-fit"
        />
      </div>

      <div className="container-custom relative z-10 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-md mb-8"
        >
          <Camera className="w-8 h-8" />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-white"
        >
          Every Picture Represents a <br className="hidden md:block" />
          <span className="text-orange-400">Life Touched</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Behind every photograph in our gallery is a story of compassion, hope, and community. Join us in creating many more such moments.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/donate">
            <Button variant="default" size="lg" className="rounded-full h-14 px-8 font-bold text-base bg-white text-slate-600 hover:bg-slate-50 hover:shadow-xl hover:-translate-y-1 transition-all">
              Donate Now <HandCoins className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" className="rounded-full h-14 px-8 font-bold text-base bg-white/10 border-white/20 text-white hover:bg-white/20 hover:-translate-y-1 transition-all backdrop-blur-md">
              Become a Volunteer
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
