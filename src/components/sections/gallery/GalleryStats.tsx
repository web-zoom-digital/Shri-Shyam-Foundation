"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

const stats = [
  { label: "Images Shared", value: 15, suffix: "+", color: "text-slate-600" },
  { label: "Volunteers", value: 450, suffix: "+", color: "text-slate-600" },
  { label: "Communities Served", value: 24, suffix: "", color: "text-orange-500" },
  { label: "Programs Conducted", value: 120, suffix: "+", color: "text-rose-500" },
]

function AnimatedCounter({ value, duration = 2 }: { value: number, duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const increment = value / (duration * 60)
      const timer = setInterval(() => {
        start += increment
        if (start >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.ceil(start))
        }
      }, 1000 / 60)
      return () => clearInterval(timer)
    }
  }, [value, duration, isInView])

  return <span ref={ref}>{count}</span>
}

export function GalleryStats() {
  return (
    <section className="py-16 bg-white border-b border-slate-100 relative z-20 -mt-8 rounded-t-[2.5rem]">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-slate-100">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center px-4"
            >
              <div className={`text-4xl md:text-5xl font-black mb-2 tracking-tight ${stat.color}`}>
                <AnimatedCounter value={stat.value} />
                {stat.suffix}
              </div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
