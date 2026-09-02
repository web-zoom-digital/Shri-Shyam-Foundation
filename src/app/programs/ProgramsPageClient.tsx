"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Utensils, Heart, HandCoins, BookOpen, Shirt, Users, AlertTriangle, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { SectionHeader } from "@/components/ui/SectionHeader"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }),
}

const programs = [
  {
    id: "food",
    icon: Utensils,
    color: "from-orange-500 to-amber-400",
    bgLight: "bg-orange-50",
    textColor: "text-orange-600",
    title: "Free Food Distribution",
    tagline: "Serving Hot Meals with Dignity",
    desc: "We believe nobody should go to bed hungry. Every single day, our dedicated volunteers prepare and serve fresh, warm, and nutritious meals to daily wage earners, elderly individuals, and families struggling to make ends meet. It's more than just food—it's a plate of hope.",
    impact: "5M+ plates of hope served",
    image: "/gallery/program-1.webp",
    who: ["Families below poverty line", "Daily wage labourers", "Migrant workers", "Homeless individuals", "Elderly persons living alone"],
    highlights: ["Hot meals twice daily", "Nutritionally balanced menus", "FSSAI compliant kitchen", "Free home delivery for bedridden patients"],
  },
  {
    id: "medical",
    icon: Heart,
    color: "from-rose-500 to-pink-400",
    bgLight: "bg-rose-50",
    textColor: "text-rose-600",
    title: "Free Medical Support",
    tagline: "Healthcare Access for Those Left Out",
    desc: "We raise funds and organise support so underserved families can reach doctors, medicines and basic check-ups. Until we publish new medical-camp photos, our community sessions and team visits represent this ongoing healthcare mission.",
    impact: "25,000+ lives touched",
    image: "/gallery/program-2.webp",
    who: ["Rural communities", "Urban slum dwellers", "Senior citizens", "Pregnant women", "Children under 5"],
    highlights: ["Community health awareness sessions", "Support for medicines and check-ups", "Specialist referral guidance", "Partnerships with local doctors"],
  },
  {
    id: "education",
    icon: BookOpen,
    color: "from-slate-600 to-slate-400",
    bgLight: "bg-slate-50",
    textColor: "text-slate-600",
    title: "Education Support",
    tagline: "Books, Bags, and a Brighter Future",
    desc: "Every child deserves to walk into a classroom ready to learn. We distribute school stationery kits, textbooks, uniforms and bags directly to children from families that cannot afford them. We also run awareness sessions at government schools to keep children engaged and motivated.",
    impact: "3,200+ futures brightened",
    image: "/images/live/Untitled-design-31.jpg",
    who: ["Children from BPL families", "First-generation learners", "Girl children in rural areas", "Children of daily wage earners"],
    highlights: ["Free stationery and book kits", "Free school uniforms and bags", "Annual scholarship programme", "School awareness and motivation sessions"],
  },
  {
    id: "clothing",
    icon: Shirt,
    color: "from-purple-600 to-violet-400",
    bgLight: "bg-purple-50",
    textColor: "text-purple-600",
    title: "Clothing Donation Drive",
    tagline: "Warmth Wrapped in Love",
    desc: "A warm jacket or a clean shirt can bring a priceless smile. Through our regular donation drives, we collect, wash, and respectfully distribute gently used clothing to homeless individuals and vulnerable families, ensuring they face harsh weather with dignity.",
    impact: "1,50,000+ smiles delivered",
    image: "/images/live/medical_support.jpg",
    who: ["Homeless individuals", "Disaster-affected families", "Children in orphanages", "Elderly in old-age homes"],
    highlights: ["Winter clothing drives in November", "All clothing hygienically washed", "Distribution in 12 districts", "Special winter kits for children"],
  },
  {
    id: "outreach",
    icon: Users,
    color: "from-slate-600 to-slate-400",
    bgLight: "bg-slate-50",
    textColor: "text-slate-600",
    title: "Community Outreach",
    tagline: "Celebrations, Visits & Neighbourhood Drives",
    desc: "From ashram celebrations with children to neighbourhood gatherings under our banner, outreach is how we stay close to the communities we serve — listening, celebrating and showing up together.",
    impact: "200+ communities reached",
    image: "/gallery/program-6.webp",
    who: ["Children at ashrams and schools", "Local volunteers", "Neighbourhood families", "Community leaders"],
    highlights: ["Ashram and school celebration visits", "Neighbourhood food and gift drives", "Volunteer meet-ups", "Guest welcomes and community gatherings"],
  },
  {
    id: "emergency",
    icon: AlertTriangle,
    color: "from-red-600 to-orange-500",
    bgLight: "bg-red-50",
    textColor: "text-red-600",
    title: "Emergency Meal Relief",
    tagline: "Food First When Hardship Hits",
    desc: "When families suddenly lose income or are left without a meal, our teams mobilise community kitchen support. We serve hot food indoors and outdoors — emergency meal kits and mass feeding when people need it most.",
    impact: "15,000+ families comforted",
    image: "/gallery/program-3.webp",
    who: ["Families facing sudden hardship", "Displaced persons", "Daily wage workers without work", "Elderly without support"],
    highlights: ["Rapid community meal service", "Emergency food packet distribution", "Indoor and outdoor feeding drives", "Transparent emergency meal fund usage"],
  },
]

const heroImages = [
  { src: "/gallery/program-1.webp", alt: "Volunteer serving hot meals from large pots to people waiting in an outdoor queue" },
  { src: "/gallery/program-2.webp", alt: "Volunteers serving a large indoor community meal to families seated on the floor" },
  { src: "/gallery/program-3.webp", alt: "Foundation representatives speaking with schoolchildren seated on the floor during a classroom session" },
  { src: "/gallery/program-4.webp", alt: "Volunteer handing folded garments to a schoolgirl during a clothing donation visit" },
  { src: "/gallery/program-5.webp", alt: "Children and volunteers celebrating together at a Vidyapeeth community outreach event" },
]

export function ProgramsPageClient() {
  const [activeProgram, setActiveProgram] = React.useState(programs[0].id)
  const active = programs.find(p => p.id === activeProgram) || programs[0]

  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [direction, setDirection] = React.useState(1)
  const [isPaused, setIsPaused] = React.useState(false)

  const goTo = React.useCallback((index: number, dir: number) => {
    setDirection(dir)
    setCurrentSlide(index)
  }, [])

  const goPrev = () => {
    const prev = (currentSlide - 1 + heroImages.length) % heroImages.length
    goTo(prev, -1)
  }

  const goNext = React.useCallback(() => {
    const next = (currentSlide + 1) % heroImages.length
    goTo(next, 1)
  }, [currentSlide, goTo])

  React.useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => { goNext() }, 3000)
    return () => clearInterval(timer)
  }, [goNext, isPaused])

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60, scale: 0.97 }),
    center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60, scale: 0.97, transition: { duration: 0.4 } }),
  }

  return (
    <div className="bg-white w-full max-w-full overflow-x-clip">
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center pt-28 sm:pt-36 lg:pt-56 pb-20 overflow-hidden gradient-hero">
        <motion.div className="absolute top-20 right-0 w-[260px] sm:w-[500px] h-[260px] sm:h-[500px] bg-slate-100 rounded-full blur-3xl opacity-40 translate-x-1/3"
          animate={{ x: [0, 16, 0], scale: [1, 1.05, 1] }} transition={{ duration: 10, repeat: Infinity }} />
        <div className="container-custom relative z-10">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-600 font-semibold">Our Programs</span>
          </nav>
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div variants={fadeUp} initial="hidden" animate="show" className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 mb-6">
                <Utensils className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-semibold text-slate-800">6 Life-Changing Programs</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
                Programs That <span className="text-gradient-warm">Transform</span><br />
                Lives Every Single Day
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl mb-4">
                <strong>Shri Shyam Foundation programmes</strong> cover free food distribution, education support, cow welfare / Gau Seva, medical outreach, clothing drives and emergency meal support across Delhi NCR and Delhi.
              </p>
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                From serving hot, nutritious meals to setting up mobile medical camps — our programs are designed with a single goal: to address the deepest needs of our most vulnerable communities with love, efficiency, and full transparency.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Carousel Container */}
              <div className="aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-white relative">
                <AnimatePresence custom={direction} mode="popLayout">
                  <motion.img
                    key={currentSlide}
                    src={heroImages[currentSlide].src}
                    alt={heroImages[currentSlide].alt}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute w-full h-full "
                  />
                </AnimatePresence>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none rounded-3xl" />

                {/* Prev / Next Arrows */}
                <button
                  onClick={goPrev}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-700" />
                </button>
                <button
                  onClick={goNext}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <ChevronRight className="w-5 h-5 text-slate-700" />
                </button>

                {/* Slide counter badge */}
                <div className="absolute top-3 right-3 z-20 bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  {currentSlide + 1} / {heroImages.length}
                </div>
              </div>

              {/* Dot Indicators */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {heroImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > currentSlide ? 1 : -1)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`transition-all duration-300 rounded-full ${
                      i === currentSlide
                        ? "w-6 h-2.5 bg-slate-500"
                        : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Tabs */}
      <section className="section-spacing bg-slate-50">
        <div className="container-custom">
          {/* Tab Nav */}
          <div className="flex flex-wrap gap-3 mb-14 justify-center">
            {programs.map((p) => {
              const Icon = p.icon
              const isActive = activeProgram === p.id
              return (
                <button key={p.id} onClick={() => setActiveProgram(p.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all duration-300 ${isActive ? `bg-gradient-to-r ${p.color} text-white shadow-lg scale-105` : "bg-white text-slate-600 border border-slate-200 hover:border-slate-200 hover:text-slate-600"}`}>
                  <Icon className="w-4 h-4" />
                  {p.title.split(" ")[0]} {p.title.split(" ")[1]}
                </button>
              )
            })}
          </div>

          {/* Active Program Detail */}
          <motion.div key={activeProgram} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full ${active.bgLight} ${active.textColor} font-bold text-sm mb-6`}>
                <active.icon className="w-5 h-5" />
                {active.title}
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-3 leading-tight">{active.tagline}</h2>
              <div className={`w-16 h-1.5 rounded-full bg-gradient-to-r ${active.color} mb-6`} />
              <p className="text-slate-600 leading-relaxed text-[1.05rem] mb-8">{active.desc}</p>

              <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 mb-8">
                <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">Cumulative Impact</p>
                <p className="text-2xl font-black text-orange-400">{active.impact}</p>
              </div>

              <h3 className="font-bold text-slate-900 mb-4">Key Highlights</h3>
              <ul className="space-y-3 mb-8">
                {active.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${active.textColor}`} />
                    <span className="text-slate-700 font-medium">{h}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/donate">
                  <Button className={`bg-gradient-to-r ${active.color} text-white border-0 rounded-full px-8 h-12 font-bold shadow-lg`}>
                    Support This Program <HandCoins className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="rounded-full px-8 h-12 font-bold">
                    Volunteer <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div>
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10 mb-6 border-4 border-white">
                <img src={active.image} alt={active.title} className="w-full h-full object-fit transform hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="premium-card rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-4">Who We Serve</h3>
                <ul className="space-y-2.5">
                  {active.who.map((w, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${active.color} shrink-0`} />
                      <span className="text-slate-600 text-sm font-medium">{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Programs Grid */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <SectionHeader badge="All Programs" title="Six Pillars of Our Mission" subtitle="Each programme is designed to address a critical gap and create a cascading positive impact across the community." className="mb-14 text-center" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((p, i) => (
              <motion.div key={p.id} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.1} viewport={{ once: true }}
                className="premium-card rounded-2xl group cursor-pointer overflow-hidden flex flex-col" onClick={() => { setActiveProgram(p.id); window.scrollTo({ top: 0, behavior: "smooth" }) }}>
                <div className="aspect-[16/10] w-full overflow-hidden relative border-b border-slate-100">
                  <img src={p.image} alt={p.title} className="w-full h-full object-fit  group-hover:scale-105 " />
                  <div className="absolute top-4 left-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center shadow-lg`}>
                      <p.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">{p.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">{p.desc}</p>
                  <span className={`text-xs font-bold ${p.textColor} flex items-center gap-1 mt-auto`}>
                    {p.impact} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-slate-50">
        <div className="container-custom text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-3xl p-14 text-white shadow-2xl shadow-slate-900/25">
            <h2 className="text-4xl font-extrabold mb-4">Your Support Keeps These Programs Running</h2>
            <p className="text-slate-200 text-lg max-w-2xl mx-auto mb-8">Behind every hot meal, every medical consultation and every scholarship is a donor who chose to care. Be that person today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/donate">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full px-10 h-14 text-base shadow-xl border-0">
                  Donate Now <HandCoins className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-white/10 text-white hover:bg-white/20 font-bold rounded-full px-10 h-14 text-base border border-white/20">
                  Volunteer With Us <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
