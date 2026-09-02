"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Regular Donor",
    text: "The transparency of SSF is unmatched. I get regular updates on exactly where my money is being used. It feels amazing to be part of this community.",
  },
  {
    name: "Dr. Anil Kumar",
    role: "Medical Volunteer",
    text: "Volunteering at their health camps has been the most fulfilling experience of my medical career. The scale at which they operate is truly impressive.",
  },
  {
    name: "Sunita Devi",
    role: "Corporate Partner",
    text: "We chose SSF for our CSR initiatives because of their absolute professionalism and deep reach into grassroots communities. Highly recommended.",
  }
]

export function Testimonials() {
  return (
    <section className="section-spacing bg-[#fef2f2] text-slate-900 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
      
      <div className="container-custom relative z-10">
        <SectionHeader 
          align="center"
          badge="What People Say"
          title="Community Voices"
          subtitle="Don't just take our word for it. Hear from our donors, volunteers, and partners."
        />

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              className="bg-white border border-red-100 shadow-xl shadow-red-500/5 p-8 rounded-[2rem] hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed mb-8 text-sm">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#dc2626] to-[#ef4444] flex items-center justify-center font-bold text-white shadow-inner">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-sm">{t.name}</h5>
                  <p className="text-xs text-[#dc2626]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
