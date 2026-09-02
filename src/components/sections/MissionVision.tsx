"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Target, Eye } from "lucide-react"

export function MissionVision() {
  return (
    <section className="section-spacing bg-slate-50 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 rounded-l-[100px] pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Mission */}
          <motion.div
            className="glass-card p-10 lg:p-14 rounded-[2.5rem] relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100 rounded-bl-[100px] -z-10 transition-transform duration-500 hover:scale-110" />
            <div className="w-16 h-16 rounded-2xl bg-slate-600 flex items-center justify-center mb-8 shadow-lg shadow-slate-600/20">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              To eradicate hunger, provide essential medical support, and ensure quality education reaches every underprivileged child. We act with compassion, speed, and transparency to uplift lives daily.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            className="glass-card p-10 lg:p-14 rounded-[2.5rem] relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-bl-[100px] -z-10 transition-transform duration-500 hover:scale-110" />
            <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center mb-8 shadow-lg shadow-orange-500/20">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Our Vision</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              A world where no one is denied their fundamental rights to food, health, and education. We envision self-sustaining, empowered communities built on the foundation of shared humanity.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
