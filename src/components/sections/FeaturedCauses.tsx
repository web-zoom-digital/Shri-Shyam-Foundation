"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { HandCoins } from "lucide-react"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Button } from "@/components/ui/Button"

const causes = [
  {
    title: "Daily Meal Seva",
    desc: "Fund hot meals for families waiting in community food queues across Delhi NCR and Delhi.",
    focus: "Food distribution",
    image: "/gallery/program-1.webp",
    href: "/donate?amount=501",
  },
  {
    title: "Education Support Kits",
    desc: "Help children stay in school with bags, notebooks and stationery through our education drives.",
    focus: "Education",
    image: "/gallery/program-2.webp",
    href: "/donate?amount=2501",
  },
  {
    title: "Gau Seva & Shelter",
    desc: "Support fodder, medicine and shelter for rescued and abandoned cows at our gaushala.",
    focus: "Cow welfare",
    image: "/gallery/program-4.webp",
    href: "/cow-donation",
  },
]

export function FeaturedCauses() {
  return (
    <section className="section-spacing bg-white">
      <div className="container-custom">
        <SectionHeader
          align="center"
          badge="Priority Needs"
          title="Where Your Donation Goes First"
          subtitle="Three active programme areas you can support today — no fake fundraising bars, just clear ways to help."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {causes.map((cause, idx) => (
            <motion.div
              key={cause.title}
              className="premium-card overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <Image
                  src={cause.image}
                  alt={cause.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className=" transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-slate-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  {cause.focus}
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{cause.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">{cause.desc}</p>

                <Button variant="primary" className="w-full" asChild>
                  <Link href={cause.href}>
                    Donate Now <HandCoins className="w-4 h-4 ml-2 inline-block" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
