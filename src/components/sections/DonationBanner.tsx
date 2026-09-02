"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Heart, HandCoins } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function DonationBanner() {
  return (
    <section className="py-20 relative overflow-hidden bg-slate-600">
      {/* Decorative background graphics */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-700 rounded-l-full blur-3xl opacity-50 mix-blend-multiply" />
      <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-slate-500 rounded-full blur-3xl opacity-50 mix-blend-screen -translate-x-1/3 translate-y-1/4" />
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 border border-white/20">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Your Kindness Has the <br className="hidden md:block" /> Power to Change Lives.
          </h2>
          
          <p className="text-lg md:text-xl text-slate-100 mb-10 max-w-2xl leading-relaxed">
            Every contribution, no matter the size, helps us feed a hungry child, provide medical care, or educate a future leader.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="h-14 px-10 bg-white text-slate-600 hover:bg-slate-50 text-base font-bold">
              Donate Now <HandCoins className="w-4 h-4 ml-2 inline-block" />
            </Button>
            <Button size="lg" className="h-14 px-10 bg-slate-700 text-white hover:bg-slate-800 text-base font-bold border-0">
              Become a Monthly Sponsor
            </Button>
          </div>
          
          <p className="text-slate-200 text-sm mt-6 font-medium">
            100% Secure • 80G Tax Exemption
          </p>
        </motion.div>
      </div>
    </section>
  )
}
