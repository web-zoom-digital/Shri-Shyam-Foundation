"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { HeartHandshake, ShieldCheck, Zap, Globe } from "lucide-react"

const values = [
  { title: "Compassion First", desc: "Every action is rooted in deep empathy and respect for the dignity of every individual we serve.", icon: HeartHandshake, color: "text-rose-500", bg: "bg-rose-50" },
  { title: "Absolute Transparency", desc: "We maintain 100% open books. You will always know exactly how and where your donation is spent.", icon: ShieldCheck, color: "text-slate-500", bg: "bg-slate-50" },
  { title: "Rapid Action", desc: "In emergencies, hours matter. Our agile volunteer network ensures help arrives quickly.", icon: Zap, color: "text-amber-500", bg: "bg-amber-50" },
  { title: "Inclusive Reach", desc: "We serve unconditionally, irrespective of religion, caste, or background. Humanity is our only filter.", icon: Globe, color: "text-slate-500", bg: "bg-slate-50" }
]

export function CoreValues() {
  return (
    <section className="section-spacing bg-white">
      <div className="container-custom">
        <SectionHeader 
          align="center"
          badge="Our Principles"
          title="The Core Values That Drive Us"
          subtitle="We don't just distribute food and aid. We distribute hope, built on an unshakable foundation of these core principles."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, index) => {
            const Icon = val.icon
            return (
              <motion.div
                key={val.title}
                className="premium-card p-8 group cursor-default"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`w-14 h-14 rounded-2xl ${val.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${val.color}`} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{val.title}</h4>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {val.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
