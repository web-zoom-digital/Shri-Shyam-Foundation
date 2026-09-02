"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { ArrowRight } from "lucide-react"

const stories = [
  {
    title: "Hot meals on the street, every day we can",
    summary:
      "Volunteers cook and serve foil-packed meals to people waiting in line — not a staged shoot, just the work we do across Delhi NCR and UP.",
    category: "Food Seva",
    image: "/gallery/program-1.webp",
    href: "/programs",
    cta: "See food programmes",
  },
  {
    title: "School kits for children who need a fair start",
    summary:
      "Bags, notebooks and stationery reach government-school children through our education support drives — so learning is not paused for want of basic supplies.",
    category: "Education",
    image: "/gallery/program-2.webp",
    href: "/impact",
    cta: "View education impact",
  },
  {
    title: "Rescue, fodder and shelter for abandoned cows",
    summary:
      "Injured or abandoned cows are brought in for treatment, daily feeding and safe shelter at our gaushala — supported by Gau Seva donations.",
    category: "Cow Welfare",
    image: "/gallery/program-4.webp",
    href: "/cow-donation",
    cta: "Support Gau Seva",
  },
]

export function LatestBlogs() {
  return (
    <section className="section-spacing bg-slate-50" aria-labelledby="ground-stories-heading">
      <div className="container-custom">
        <SectionHeader
          align="center"
          badge="From the Ground"
          title="Real Stories from Our Work"
          subtitle="Short updates drawn from programmes we run today — food, education and cow welfare — with links to full pages."
        />
        <h2 id="ground-stories-heading" className="sr-only">
          Real stories from Shri Shyam Foundation programmes
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {stories.map((story, idx) => (
            <motion.article
              key={story.title}
              className="premium-card overflow-hidden group flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link href={story.href} className="relative h-56 overflow-hidden block">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-600">
                  {story.category}
                </div>
              </Link>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-600 transition-colors">
                  {story.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-5 flex-1">{story.summary}</p>
                <Link
                  href={story.href}
                  className="inline-flex items-center text-sm font-bold text-slate-700 hover:text-slate-800 transition-colors"
                >
                  {story.cta}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
