"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  Download,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

const carouselImages = [
  "/gallery/program-5.webp",
  "/gallery/program-9.webp",
  "/gallery/program-1.webp",
  "/gallery/program-6.webp",
];

export function Transparency() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1,
    );
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1,
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-spacing bg-slate-50 relative overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              badge="100% Accountability"
              title="Where Your Money Goes"
              subtitle="We believe in absolute transparency. Every rupee you donate is accounted for and used efficiently to maximize impact."
            />

            <div className="flex flex-col gap-6 mb-8">
              <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-slate-500" />
                  <span className="font-bold text-slate-700">
                    Program Implementation
                  </span>
                </div>
                <span className="font-black text-xl text-slate-900">82%</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-slate-500" />
                  <span className="font-bold text-slate-700">
                    Fundraising & Awareness
                  </span>
                </div>
                <span className="font-black text-xl text-slate-900">10%</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="font-bold text-slate-700">
                    Admin & Operations
                  </span>
                </div>
                <span className="font-black text-xl text-slate-900">8%</span>
              </div>
            </div>

            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Download Annual Audit Report 2025
            </Button>
          </motion.div>

          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full max-w-md aspect-square rounded-[3rem] bg-slate-100 flex items-center justify-center border-8 border-white shadow-2xl overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={carouselImages[currentIndex]}
                    alt={`Impact Image ${currentIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Overlay Gradient for readability if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-slate-800 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-slate-800 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-sm ${
                      index === currentIndex
                        ? "bg-white w-6"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Badge */}
              <div className="absolute top-6 right-6 z-20">
                <div className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm shadow-lg flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-slate-500" />
                  <span className="text-sm font-bold text-slate-800">
                    Verified Impact
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
