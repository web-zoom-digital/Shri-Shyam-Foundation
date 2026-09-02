"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Quote } from "lucide-react"

export function SuccessStories() {
  return (
    <section className="section-spacing bg-white">
      <div className="container-custom">
        <SectionHeader 
          align="center"
          badge="Real Impact"
          title="Lives We've Changed"
          subtitle="Behind every statistic is a human story. See how your support translates into real-world change."
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-10">
          
          <motion.div 
            className="premium-card flex flex-col md:flex-row overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
              <img 
                src="/images/live/education.webp" 
                alt="SSF volunteer handing a stationery kit to a school boy outside a government school while other uniformed children watch"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-center bg-slate-50/50">
              <Quote className="w-8 h-8 text-slate-200 mb-4" />
              <p className="text-slate-700 italic mb-4">
                &ldquo;The day the foundation gave me my first set of books and a bag, I ran home to show my mother. I still have that bag. I use it every day to school.&rdquo;
              </p>
              <div>
                <p className="font-bold text-slate-900">Rahul, 11</p>
                <p className="text-xs text-slate-500 font-medium">Education Beneficiary &mdash; Government School, Delhi</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="premium-card flex flex-col md:flex-row overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
              <img 
                src="/images/live/medical_support.jpg" 
                alt="SSF volunteer handing folded clothing to a girl student outside a school as part of the clothing donation drive"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-center bg-orange-50/50">
              <Quote className="w-8 h-8 text-orange-200 mb-4" />
              <p className="text-slate-700 italic mb-4">
                &ldquo;My daughter was embarrassed to come to school because her uniform was torn. After the foundation gave her a new set, she hasn&apos;t missed a single day.&rdquo;
              </p>
              <div>
                <p className="font-bold text-slate-900">Sunita, Parent</p>
                <p className="text-xs text-slate-500 font-medium">Clothing Drive Beneficiary &mdash; Delhi, Delhi</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
