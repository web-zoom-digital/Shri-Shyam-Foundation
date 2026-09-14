"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function WhyChooseSSF() {
  return (
    <section className="section-spacing bg-slate-50 text-slate-900 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-slate-200/50 rounded-full blur-[100px] -translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-[240px] sm:w-[400px] h-[240px] sm:h-[400px] bg-slate-200/50 rounded-full blur-[100px] translate-x-1/3 translate-y-1/4" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight text-slate-900">
              Why Trust <br />
              <span className="text-gradient-primary">Shri Shyam</span> <br />
              Foundation?
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
              We understand that trust is earned. As an internationally recognized, government-certified NGO, we ensure your contribution creates maximum, measurable impact.
            </p>
            
            <div className="flex flex-col gap-4 mb-10">
              {[
                "Government Registered & Certified",
                "80G Tax Exemption Eligible",
                "Direct Implementation (No middlemen)",
                "Annual Financial Audits Published Online"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white border border-slate-200 shadow-sm p-4 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-slate-600 shrink-0" />
                  <span className="font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
            
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              View Financial Reports
            </Button>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="aspect-square sm:aspect-auto sm:h-[600px] rounded-[3rem] overflow-hidden border border-slate-200 shadow-xl">
              <img 
                src="/images/live/Untitled-design-31.jpg" 
                alt="Volunteers showing transparency"
                className="w-full h-full object-fit"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent opacity-90" />
            </div>
            
            {/* Absolute Trust Badge */}
            {/* <div className="absolute bottom-8 right-8 glass-card bg-white/90 backdrop-blur-xl border border-slate-200 shadow-lg p-6 rounded-2xl max-w-xs">
              <p className="text-sm text-slate-700 font-medium italic">
                "SSF is one of the most transparent organizations we have worked with. Their direct impact model is highly effective."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-300" />
                <div>
                  <p className="text-sm font-bold text-slate-900">Dr. A. Sharma</p>
                  <p className="text-xs text-slate-500">CSR Partner</p>
                </div>
              </div>
            </div> */}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
