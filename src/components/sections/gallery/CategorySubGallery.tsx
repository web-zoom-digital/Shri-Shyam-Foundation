"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { galleryImages, GalleryCategory } from "@/data/galleryData"

interface CategorySubGalleryProps {
  category: GalleryCategory
  title: string
  description: string
  bgColor?: string
  limit?: number
}

export function CategorySubGallery({
  category,
  title,
  description,
  bgColor = "bg-white",
  limit = 4,
}: CategorySubGalleryProps) {
  // Get unique images for this category, skipping those that are spotlight (so we don't repeat the hero ones if we don't want to, but the prompt says: "Do not reuse spotlight images as separate cards in the Featured Gallery section. Reference the same image asset instead of creating duplicate visual entries." Actually, to be safe and show enough images, we can show spotlight images if they fit, but let's filter them out for variety).
  const categoryImages = galleryImages
    .filter(img => img.categories.includes(category) && !img.spotlight)
    .slice(0, limit)

  if (categoryImages.length === 0) {
    // Fallback: If no non-spotlight images exist for this category, just use any from this category
    const fallbackImages = galleryImages.filter(img => img.categories.includes(category)).slice(0, limit)
    if (fallbackImages.length === 0) return null
    categoryImages.push(...fallbackImages)
  }

  return (
    <section className={`py-20 ${bgColor} border-b border-slate-100`}>
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              {title}
            </h2>
            <p className="text-slate-600 text-lg">
              {description}
            </p>
          </div>
          <button className="inline-flex items-center gap-2 font-semibold text-slate-600 hover:text-slate-700 transition-colors whitespace-nowrap">
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative rounded-2xl overflow-hidden aspect-square shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full  transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <h4 className="text-white font-bold text-lg leading-tight mb-2">{image.title}</h4>
                <p className="text-slate-200 text-sm line-clamp-2">{image.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
