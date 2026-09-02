"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Button } from "@/components/ui/Button"
import { ArrowRight } from "lucide-react"

const images = [
  { src: "/gallery/program-1.webp", alt: "Volunteers serving hundreds of individuals from large community pots during an SSF mega food drive" },
  { src: "/gallery/program-2.webp", alt: "SSF volunteer handing a foil-packaged hot meal to a beneficiary on the street" },
  { src: "/gallery/program-3.webp", alt: "Man distributing colourful toys to young boys lined up during an SSF children's outreach event" },
  { src: "/gallery/program-4.webp", alt: "Woman gently petting and comforting a resting calf as part of SSF's cow welfare programme" },
  { src: "/gallery/program-5.webp", alt: "SSF volunteer carefully bottle-feeding a weak white calf lying on the ground" },
]

export function GalleryPreview() {
  return (
    <section className="section-spacing bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            badge="Moments in Time"
            title="Glimpses of Hope"
            subtitle="Real photographs from our food drives, education outreach and cow welfare work."
            className="mb-0"
          />
          <Button variant="outline" className="hidden md:flex" asChild>
            <Link href="/gallery">
              View Full Gallery
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[400px] md:h-[500px]">
          <motion.div
            className="relative col-span-2 row-span-2 rounded-3xl overflow-hidden group"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={images[0].src}
              alt={images[0].alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className=" group-hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

          {images.slice(1).map((img, idx) => (
            <motion.div
              key={img.src}
              className="relative rounded-3xl overflow-hidden group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (idx + 1) * 0.1 }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className=" group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 md:hidden flex justify-center">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/gallery">View Full Gallery</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
