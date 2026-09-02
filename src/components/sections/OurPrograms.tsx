"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { ArrowRight, Utensils, BookOpen, Stethoscope, Home } from "lucide-react"
import { Button } from "@/components/ui/Button"

const programs = [
  {
    id: "food",
    title: "Food For Life Drive",
    desc: "Every day, our volunteers prepare and serve fresh hot meals from large community pots to daily wage workers, migrant labourers, and families struggling to make ends meet.",
    icon: Utensils,
    color: "text-orange-500",
    bg: "bg-orange-100",
    image: "/images/live/image-80.jpg",
    alt: "SSF founder serving hot food from a large cooking pot to a queue of beneficiaries during a community food drive"
  },
  {
    id: "medical",
    title: "Free Medical Support",
    desc: "We help underserved families reach doctors, medicines and basic check-ups. Community sessions and team visits keep this healthcare mission moving until new medical-camp photos are published.",
    icon: Stethoscope,
    color: "text-slate-500",
    bg: "bg-slate-100",
    image: "/images/live/medical_support.jpg",
    alt: "Foundation representatives speaking with children during a community session supporting our healthcare mission"
  },
  {
    id: "education",
    title: "Education Support",
    desc: "We visit government schools to distribute stationery kits, books, and uniforms directly to children from families that cannot afford them.",
    icon: BookOpen,
    color: "text-slate-500",
    bg: "bg-slate-100",
    image: "/images/live/education.webp",
    alt: "SSF volunteer handing a school supply kit to a boy while uniformed classmates wait outside a school building"
  },
  {
    id: "community",
    title: "Community Outreach",
    desc: "From celebrating children at ashram events to organising neighbourhood drives, our outreach brings people together and builds lasting community bonds.",
    icon: Home,
    color: "text-amber-500",
    bg: "bg-amber-100",
    image: "/images/live/community.webp",
    alt: "SSF volunteers and children gathered at an ashram celebration event — community outreach and social welfare programme"
  }
]

export function OurPrograms() {
  return (
    <section className="section-spacing bg-slate-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader 
            badge="What We Do"
            title="Our Flagship Programs"
            subtitle="Targeted initiatives designed to address the most critical needs of our society."
            className="mb-0"
          />
          <Button variant="outline" className="hidden md:flex">
            View All Programs
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {programs.map((prog, idx) => {
            const Icon = prog.icon
            return (
              <motion.div
                key={prog.id}
                className="premium-card overflow-hidden group flex flex-col sm:flex-row"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* Image */}
                <div className="w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto relative overflow-hidden">
                  <img 
                    src={prog.image} 
                    alt={prog.alt || prog.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center">
                  <div className={`w-12 h-12 rounded-xl ${prog.bg} flex items-center justify-center mb-5`}>
                    <Icon className={`w-6 h-6 ${prog.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{prog.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                    {prog.desc}
                  </p>
                  <a href={`/programs/${prog.id}`} className="inline-flex items-center text-sm font-bold text-slate-600 hover:text-slate-700 group/link">
                    Explore Program
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-10 md:hidden flex justify-center">
          <Button variant="outline" className="w-full">
            View All Programs
          </Button>
        </div>
      </div>
    </section>
  )
}
