"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Maximize2, Share2 } from "lucide-react"
import { galleryImages, galleryCategories, GalleryCategory, GalleryImage } from "@/data/galleryData"

export function MasonryGallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All")
  const nonSpotlightImages = galleryImages.filter(img => !img.spotlight)
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>(nonSpotlightImages)
  
  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredImages(nonSpotlightImages)
    } else {
      setFilteredImages(nonSpotlightImages.filter(img => img.categories.includes(activeCategory)))
    }
  }, [activeCategory])

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  
  const nextImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! + 1) % filteredImages.length)
    }
  }, [lightboxIndex, filteredImages.length])

  const prevImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! - 1 + filteredImages.length) % filteredImages.length)
    }
  }, [lightboxIndex, filteredImages.length])

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
      if (e.key === "Escape") closeLightbox()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxIndex, nextImage, prevImage])

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
    return () => { document.body.style.overflow = 'auto' }
  }, [lightboxIndex])

  return (
    <section id="gallery" className="py-24 bg-white relative">
      <div className="container-custom">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Our <span className="text-slate-600">Impact</span> Gallery
          </h2>
          <p className="text-slate-600 text-lg">
            Explore moments of change, community service, and our ongoing mission to make the world a better place.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {galleryCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-slate-600 text-white shadow-lg shadow-slate-500/30 scale-105"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Layout */}
        <motion.div layout className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                layout
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-2xl overflow-hidden group cursor-pointer break-inside-avoid shadow-sm hover:shadow-2xl transition-all duration-500"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  loading="lazy"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Hover Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 transform transition-all">
                    <h4 className="text-white font-bold text-lg leading-tight mb-1">{image.title}</h4>
                    <p className="text-slate-200 text-sm line-clamp-2">{image.description}</p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
                      <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">{image.categories[1] || image.categories[0]}</span>
                      <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-600 transition-colors" title="View Full">
                          <Maximize2 className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-600 transition-colors" title="Share" onClick={(e) => { e.stopPropagation(); /* share logic */ }}>
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No images found for this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 text-white absolute top-0 left-0 right-0 z-10">
              <div className="text-sm font-semibold tracking-widest uppercase text-slate-400">
                {lightboxIndex + 1} / {filteredImages.length}
              </div>
              <button
                onClick={closeLightbox}
                aria-label="Close gallery lightbox"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Image */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-12 relative">
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].alt}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
              
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                aria-label="Previous image"
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-110"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                aria-label="Next image"
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-110"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            {/* Caption */}
            <motion.div
              key={`caption-${lightboxIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 md:p-8 bg-gradient-to-t from-slate-950 to-transparent absolute bottom-0 left-0 right-0 text-center"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{filteredImages[lightboxIndex].title}</h3>
              <p className="text-slate-300 max-w-3xl mx-auto text-sm md:text-base">
                {filteredImages[lightboxIndex].description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
