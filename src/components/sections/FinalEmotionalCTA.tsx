"use client"

import * as React from "react"
import { motion } from "framer-motion"

export function FinalEmotionalCTA() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="container-custom">
        <motion.div 
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-8">
            "We make a living by what we get, but we make a <span className="text-gradient-warm">life</span> by what we <span className="text-gradient-primary">give</span>."
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            — Winston Churchill
          </p>
        </motion.div>
      </div>
    </section>
  )
}
