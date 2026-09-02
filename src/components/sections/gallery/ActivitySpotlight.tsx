"use client"

import { motion } from "framer-motion"
import { ArrowRight, Image as ImageIcon } from "lucide-react"
import { galleryImages } from "@/data/galleryData"

export function ActivitySpotlight() {
  const spotlightImages = galleryImages.filter(img => img.spotlight).slice(0, 6)

  if (spotlightImages.length < 6) return null

  // Helper to determine span based on index for a bento grid look
  const getSpanClasses = (index: number) => {
    switch(index) {
      case 0: return "md:col-span-2 md:row-span-2"
      case 1: return "md:col-span-2 md:row-span-1"
      case 2: return "md:col-span-1 md:row-span-1"
      case 3: return "md:col-span-1 md:row-span-1"
      case 4: return "md:col-span-2 md:row-span-1"
      case 5: return "md:col-span-2 md:row-span-1"
      default: return "md:col-span-1 md:row-span-1"
    }
  }

  return (
    <section className="py-24 bg-slate-50 relative">
      <div className="container-custom">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Activity <span className="text-slate-600">Spotlight</span>
            </h2>
            <p className="text-slate-600 text-lg">
              A curated selection of our most impactful and emotionally resonant moments from recent activities.
            </p>
          </div>
          <a href="#gallery" className="inline-flex items-center gap-2 font-bold text-slate-600 hover:text-slate-700 transition-colors">
            View Full Gallery <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4 md:gap-6">
          {spotlightImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer ${getSpanClasses(index)}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                loading="lazy"
              />
              
              {/* Grandient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white tracking-wider uppercase mb-3 border border-white/20">
                    {image.categories[1] || image.categories[0]}
                  </span>
                  <h3 className={`font-bold text-white mb-2 leading-tight ${index === 0 ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                    {image.title}
                  </h3>
                  <p className={`text-slate-200 line-clamp-2 ${index === 0 ? 'text-base md:text-lg mb-4' : 'text-sm mb-0'}`}>
                    {image.description}
                  </p>
                  
                  {index === 0 && (
                    <button className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 rounded-full text-sm font-bold hover:bg-slate-50 transition-colors mt-2">
                      <ImageIcon className="w-4 h-4" /> Open Gallery
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
