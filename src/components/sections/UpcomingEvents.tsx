"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { HandHeart, Leaf, Utensils, Phone } from "lucide-react"
import { Button } from "@/components/ui/Button"

const ways = [
  {
    title: "Join a food distribution drive",
    desc: "Help pack and serve meals during community food drives in Delhi NCR and nearby towns. Timings change by drive — we confirm details on WhatsApp.",
    icon: Utensils,
    href: "/contact",
    cta: "Ask about next food drive",
  },
  {
    title: "Support Gau Seva at the gaushala",
    desc: "Contribute fodder, treatment or monthly adoption for rescued cows. Visit the Cow Donation page to choose a seva amount.",
    icon: Leaf,
    href: "/cow-donation",
    cta: "Open cow donation",
  },
  {
    title: "Volunteer a few hours a week",
    desc: "Education support, packing, and field assistance all need reliable hands. Tell us your city and availability — we will guide you.",
    icon: HandHeart,
    href: "/contact",
    cta: "Register interest",
  },
]

export function UpcomingEvents() {
  return (
    <section className="section-spacing bg-white" aria-labelledby="join-seva-heading">
      <div className="container-custom">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <SectionHeader
              badge="Get Involved"
              title="Ways to Join Our Seva"
              subtitle="Instead of placeholder event dates, here are clear ways to help right now — we confirm live drive details when you reach out."
            />
            <h2 id="join-seva-heading" className="sr-only">
              Ways to join Shri Shyam Foundation seva
            </h2>
            <Button variant="outline" className="w-full sm:w-auto" asChild>
              <a href="https://wa.me/919990145555" target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4 mr-2" />
                WhatsApp the team
              </a>
            </Button>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6 cursor-pointer">
            {ways.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  className="premium-card p-6 sm:p-8 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start group"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className="w-16 h-16 shrink-0 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-slate-600 group-hover:text-white transition-colors">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-5">{item.desc}</p>
                    <Button
                      variant="ghost"
                      className="text-slate-600 font-bold p-0 h-auto hover:bg-transparent hover:text-slate-800"
                      asChild
                    >
                      <Link href={item.href}>{item.cta} →</Link>
                    </Button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
