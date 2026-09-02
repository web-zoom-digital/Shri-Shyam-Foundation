"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Button } from "@/components/ui/Button"
import { UserPlus, CalendarCheck, Megaphone } from "lucide-react"

const steps = [
  { icon: UserPlus, title: "Register Online", desc: "Fill out a simple form telling us about your skills and availability." },
  { icon: CalendarCheck, title: "Attend Orientation", desc: "Join a short onboarding session to understand our safety and operation protocols." },
  { icon: Megaphone, title: "Start Impacting", desc: "Choose a campaign and start actively contributing to society." },
]

export function VolunteerProcess() {
  return (
    <section className="section-spacing bg-slate-50 relative overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader 
              badge="Join Us"
              title="Become a Catalyst for Change"
              subtitle="Volunteering with Shri Shyam Foundation is more than just giving time; it's about building a better tomorrow."
            />
            
            <div className="flex flex-col gap-8 mb-10">
              {steps.map((step, idx) => {
                const Icon = step.icon
                return (
                  <div key={step.title} className="flex gap-4 group">
                    <div className="shrink-0 flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border-4 border-white shadow-sm group-hover:bg-slate-600 transition-colors duration-300">
                        <Icon className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      {idx !== steps.length - 1 && (
                        <div className="w-0.5 h-full bg-slate-200 mt-2" />
                      )}
                    </div>
                    <div className="pb-8">
                      <h4 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            
            <Button size="lg" variant="primary">
              Register as Volunteer
            </Button>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=600&auto=format&fit=crop" 
                className="w-full h-[300px] object-cover rounded-3xl rounded-tr-none shadow-lg"
                alt="Volunteers"
              />
              <img 
                src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=600&auto=format&fit=crop" 
                className="w-full h-[300px] object-cover rounded-3xl rounded-bl-none shadow-lg mt-8"
                alt="Volunteers smiling"
              />
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-2xl">
              <div className="w-24 h-24 rounded-full border-4 border-dashed border-slate-200 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-slate-600">15k+</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Volunteers</span>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
