"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroImages = [
  {
    src: "/images/hero/cow-banner.png",
    alt: "एक रोटी गौ माता के नाम - Help Now",
  },
  {
    src: "/images/hero/clothes-banner.png",
    alt: "कपड़े दान करें मुस्कान बांटे - Donate Now",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  const goPrev = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length,
    );
  };

  const goNext = React.useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  }, []);

  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goNext, 4000);
    return () => clearInterval(timer);
  }, [goNext, isPaused]);

  const slide = heroImages[currentSlide];

  return (
    <section
      className="relative w-full bg-slate-950 overflow-hidden mt-[4.25rem] sm:mt-[5rem] md:mt-[7.25rem]"
      aria-label="Shri Shyam Foundation hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setTimeout(() => setIsPaused(false), 2500)}
    >
      <h1 className="sr-only">
        Shri Shyam Foundation — free food, education support, and cow welfare
        across Delhi NCR and Delhi
      </h1>
      <div className="relative w-full">
        <img
          src={heroImages[currentSlide].src}
          alt={heroImages[currentSlide].alt}
          className="w-full h-auto block max-h-[78vh] object-cover bg-slate-950 mx-auto"
          draggable={false}
        />

        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous image"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/60 border border-white/30 flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next image"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/60 border border-white/30 flex items-center justify-center"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>

        <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-2">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setCurrentSlide(idx)}
              className={`rounded-full transition-all ${
                idx === currentSlide
                  ? "w-6 h-2 bg-white"
                  : "w-2 h-2 bg-white/55"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
