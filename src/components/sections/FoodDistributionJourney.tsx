"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { ChefHat, Truck, Smile } from "lucide-react"

const steps = [
  {
    icon: ChefHat,
    title: "Sourcing & Preparation",
    desc: "Fresh, high-quality ingredients are sourced locally and cooked daily in our industrial-scale hygienic kitchens.",
    color: "text-amber-500",
    bg: "bg-amber-100",
    border: "border-amber-200"
  },
  {
    icon: Truck,
    title: "Rapid Distribution",
    desc: "Our fleet of dedicated food delivery vans transport the hot meals in insulated containers to target areas.",
    color: "text-slate-500",
    bg: "bg-slate-100",
    border: "border-slate-200"
  },
  {
    icon: Smile,
    title: "Serving with Dignity",
    desc: "Volunteers serve the meals directly to the people in need, ensuring everyone is treated with respect.",
    color: "text-slate-500",
    bg: "bg-slate-100",
    border: "border-slate-200"
  }
]

export function FoodDistributionJourney() {
  return (
    <section className="section-spacing bg-white">
      <div className="container-custom">
        <SectionHeader 
          align="center"
          badge="How We Work"
          title="The Journey of a Meal"
          subtitle="From our kitchen to their hands, every step is optimized for hygiene, speed, and scale."
        />

        <div className="relative mt-16 lg:mt-24">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-[60px] left-0 right-0 h-1 bg-slate-100 rounded-full" />
          
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  className="flex flex-col items-center text-center relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                >
                  <div className={`w-32 h-32 rounded-full ${step.bg} border-8 border-white shadow-xl flex items-center justify-center mb-6 relative z-10 hover:scale-110 transition-transform duration-500`}>
                    <Icon className={`w-12 h-12 ${step.color}`} />
                    
                    {/* Step Number Badge */}
                    <div className={`absolute top-0 right-0 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-sm font-bold text-slate-700`}>
                      {idx + 1}
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
                    {step.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
