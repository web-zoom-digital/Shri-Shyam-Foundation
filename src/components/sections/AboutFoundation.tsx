"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Button } from "@/components/ui/Button"

const carouselImages = [
  "/images/live/abot-syam.png",
  "/images/live/IMG20260714115736-6XDWu.jpg",
  "/images/live/IMG20260714115739-bOYlA.jpg",
  "/images/live/8.jpg.jpeg",
  "/images/live/6.jpg.jpeg",
]

export function AboutFoundation() {
  const [currentImage, setCurrentImage] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="section-spacing bg-white overflow-hidden relative">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side with Carousel */}
          <motion.div 
            className="relative overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative z-10 aspect-[4/3] sm:aspect-[4/5] max-w-lg mx-auto lg:mx-0 w-full h-[450px] lg:h-[550px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-900/15 border-8 border-white">
              <AnimatePresence mode="popLayout">
                <motion.img 
                  key={currentImage}
                  src={carouselImages[currentImage]}
                  alt="Shri Shyam Foundation Work" 
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent pointer-events-none" />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-100 rounded-full z-0 blur-2xl" />
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-slate-100 rounded-full z-0 blur-3xl" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <SectionHeader 
              badge="About Us"
              title="Dedicated to Making a Real Difference"
              subtitle="Since our inception, Shri Shyam Foundation has been on a relentless mission to eradicate hunger and provide essential support to vulnerable communities."
            />

            <ul className="flex flex-col gap-5 mb-10">
              {[
                "Providing nutritious hot meals daily",
                "Supporting medical emergencies and treatments",
                "Empowering children through quality education",
                "100% transparent and accountable operations"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-slate-600" />
                  </div>
                  <span className="text-slate-700 font-semibold leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <Button variant="primary" size="lg" className="group rounded-full shadow-lg shadow-slate-500/20 px-8" asChild>
              <Link href="/about">
              Read Our Full Story
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
