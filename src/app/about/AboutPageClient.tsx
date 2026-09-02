"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, HandCoins, Target, Eye, Shield, Users, Star, ArrowRight, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { SectionHeader } from "@/components/ui/SectionHeader"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }),
}

const values = [
  { icon: Heart, title: "Compassion First", desc: "We plan programmes around real people in need — meals, school kits, medical help and cow care — not vanity metrics.", color: "text-rose-500 bg-rose-50" },
  { icon: Shield, title: "Clear Accountability", desc: "We share bank/UPI channels publicly, issue donation acknowledgements, and respond to donor questions about where money was used.", color: "text-slate-600 bg-slate-50" },
  { icon: Target, title: "Direct Field Work", desc: "Volunteers cook, pack, serve, rescue and distribute on the ground across Delhi NCR and Delhi.", color: "text-slate-600 bg-slate-50" },
  { icon: Users, title: "Community Partnership", desc: "Local volunteers and community trust help us reach the right people at the right time.", color: "text-orange-500 bg-orange-50" },
  { icon: Star, title: "Careful Delivery", desc: "We prioritise safe food handling, respectful distribution, and practical education/medical support.", color: "text-purple-600 bg-purple-50" },
  { icon: Eye, title: "Long-Term Seva", desc: "Beyond one-day drives, we sustain gaushala care, recurring food seva and education support where communities need continuity.", color: "text-slate-600 bg-slate-50" },
]

const timeline = [
  { year: "2015", title: "The Spark", desc: "Founder Shri Shyam witnessed families starving just five kilometres from luxury restaurants. That night changed everything. The foundation was born." },
  { year: "2016", title: "First Kitchen", desc: "A rented kitchen, 12 volunteers, and 200 meals per day. Small beginnings. Enormous determination. Communities noticed. Word spread." },
  { year: "2018", title: "Government Recognition", desc: "The Ministry of Social Justice officially recognised SSF. 80G tax exemption granted. International donors began trusting our model." },
  { year: "2020", title: "COVID-19 Response", desc: "During the pandemic's darkest hours, we scaled from 500 to 15,000 meals per day within 72 hours. Zero funds went unaccounted." },
  { year: "2022", title: "Medical Expansion", desc: "Launched free medical camps in 7 districts. Over 25,000 patients received free consultations, medicines and diagnostic tests." },
  { year: "2024", title: "5 Million Meals", desc: "We crossed 5 million nutritious meals served. Our education programme now supports 3,200 children. The mission continues." },
]

const faqs = [
  { q: "Is Shri Shyam Foundation a registered NGO?", a: "Yes. Shri Shyam Foundation is a registered non-profit organisation. Eligible donations may qualify for deduction under Section 80G as applicable. For registration details, contact our team." },
  { q: "How does my donation reach beneficiaries?", a: "Donations support active programmes — food distribution, education kits, medical outreach and cow welfare. After payment, share your transaction ID so we can acknowledge your contribution and issue an 80G receipt where applicable." },
  { q: "Can I visit your operations?", a: "Yes, with prior coordination. Write to us or WhatsApp so we can arrange a suitable time for a kitchen, drive or gaushala visit." },
  { q: "How can I volunteer with SSF?", a: "Use the Contact page or WhatsApp us with your city and availability. We match volunteers to food drives, packing, education support and gaushala care." },
]

const heroImages = [
  { src: "/images/live/abot-syam.png", alt: "Shri Shyam Foundation volunteers in SSF T-shirts standing in front of the Food For Life programme banner" },
  { src: "/images/live/abot-syam.png", alt: "SSF founder serving hot dal from a large pot to beneficiaries at an outdoor community food distribution drive" },
  { src: "/images/live/abot-syam.png", alt: "SSF team and a guest posing with packaged food containers and a bouquet ahead of a community meal distribution event" },
  { src: "/images/live/abot-syam.png", alt: "Children and young monks seated in rows on a carpet eating traditional meals at a Shri Shyam Foundation celebration at a temple" },
]

export function AboutPageClient() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null)

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
      <section className="relative min-h-[60vh] flex items-center pt-28 sm:pt-36 lg:pt-56 pb-20 overflow-hidden gradient-hero">
        <motion.div className="absolute top-20 right-0 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-orange-100 rounded-full blur-3xl opacity-40 translate-x-1/3" animate={{ x: [0, 20, 0], scale: [1, 1.05, 1] }} transition={{ duration: 10, repeat: Infinity }} />
        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-600 font-semibold">About Us</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div variants={fadeUp} initial="hidden" animate="show" className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 mb-6">
                <Heart className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span className="text-sm font-semibold text-slate-800">Our Story</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
                Born From <span className="text-gradient-warm">Compassion</span>,<br />
                Built For <span className="text-gradient-primary">Seva</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-4 max-w-2xl">
                <strong>Shri Shyam Foundation (SSF)</strong> is a registered NGO founded in 2015 and based in Delhi, Delhi, Delhi. We run free food distribution, education support, cow rescue / Gau Seva, and medical outreach across Delhi NCR and Delhi.
              </p>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                The work began with a simple question: <em>&quot;Why should anyone go to sleep hungry in a world of abundance?&quot;</em> That question still guides our seva today.
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
              <div className="aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-white/50 relative">
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
                    className="absolute inset-0 w-full h-full object-cover"
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
                        ? "w-6 h-2.5 bg-orange-500"
                        : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-slate-700 py-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { number: "5M+", label: "Meals Served" },
              { number: "1.2L+", label: "Families Helped" },
              { number: "25K+", label: "Medical Patients" },
              { number: "3,200+", label: "Children Educated" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" custom={i} viewport={{ once: true }}>
                <p className="text-3xl font-black">{stat.number}</p>
                <p className="text-slate-200 text-sm font-medium mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Foundation Story */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <SectionHeader badge="Our Foundation Story" title="It Started With One Hungry Family" subtitle="" />
              <div className="space-y-5 text-slate-600 leading-relaxed text-[1.05rem]">
                <p>In 2015, our founder Shri Shyam was driving home through the streets of Guwahati when he saw a family — a mother and three small children — scavenging through garbage for food. He stopped his car, bought them a proper meal from a nearby dhaba, and sat with them to understand their story.</p>
                <p>That family had been displaced by floods. The father had died of an illness they could not afford to treat. The eldest child had dropped out of school to work. In that one family's story, Shri Shyam saw the interconnected web of hunger, health and education that traps millions in a cycle of poverty.</p>
                <p>He went home, called twelve friends, and within a week they had rented a small kitchen. Within a month, 200 families were receiving hot meals every day. Within a year, the government took notice. Within a decade, over five million meals had been served.</p>
                <p className="font-semibold text-slate-800">This is not a story about one man. It is a story about what ordinary people can do when they refuse to look away.</p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" custom={0.2} viewport={{ once: true }} className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10 border-8 border-white">
                <img src="/images/live/5.jpg-1.jpeg" alt="Shri Shyam Foundation volunteers" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-slate-600 text-white p-6 rounded-2xl shadow-xl max-w-[200px]">
                <p className="text-4xl font-black"> 9+ </p>
                <p className="text-slate-200 text-sm font-medium">Years of Uninterrupted Service</p>
              </div>
            </motion.div>
            
          </div>

        </div>





















        

      </section>

      {/* Mission & Vision */}
      <section className="section-spacing bg-slate-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Target, color: "from-slate-600 to-slate-400", badge: "Our Mission",
                title: "Eradicate Hunger. Heal Communities. Educate the Future.",
                desc: "Our mission is to ensure that no family in India goes to bed hungry, no patient goes untreated due to poverty, and no child is denied the chance to learn. We accomplish this through direct, community-embedded programs that create lasting change rather than temporary relief."
              },
              {
                icon: Eye, color: "from-orange-500 to-amber-400", badge: "Our Vision",
                title: "An India Where No One Is Left Behind",
                desc: "We envision an India where every citizen — regardless of caste, religion, gender or economic status — has access to nutritious food, basic healthcare and quality education. We will not stop until our services become redundant because the problem is solved."
              }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.15} viewport={{ once: true }}
                className="premium-card p-10 rounded-3xl">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs font-bold tracking-widest uppercase text-slate-600 mb-3 block">{item.badge}</span>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-4 leading-snug">{item.title}</h2>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>















      

      {/* Core Values */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <SectionHeader badge="Our Values" title="What We Stand For" subtitle="These are not aspirational words on a wall. These are the principles that govern every decision, every programme and every rupee we spend." align="center" className="mb-16" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.1} viewport={{ once: true }}
                className="premium-card p-8 rounded-2xl group">
                <div className={`w-12 h-12 rounded-2xl ${v.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <v.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-3">{v.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-spacing bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-slate-600/15 rounded-full blur-[100px]" />
        <div className="container-custom relative z-10">
          <SectionHeader badge="Our Journey" title="A Decade of Determined Service" subtitle="Every milestone is a story of lives changed, hope restored and communities empowered." className="mb-16 text-center" lightText />
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-700/60 md:-translate-x-px" />
            <div className="flex flex-col gap-12">
              {timeline.map((item, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.1} viewport={{ once: true }}
                  className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-orange-500 border-4 border-slate-900 -translate-x-1.5 md:-translate-x-2 mt-1.5 shadow-lg shadow-orange-500/40" />
                  <div className={`ml-12 md:ml-0 md:w-[45%] ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <span className="text-orange-400 font-black text-2xl">{item.year}</span>
                    <h3 className="text-xl font-bold text-white mt-1 mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Promise */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <SectionHeader badge="Our Promise" title="Why Thousands Trust Us" subtitle="Trust is earned through actions, not words. Here is what we promise every donor, volunteer and beneficiary." />
              <ul className="space-y-4">
                {[
                  "100% of donations reach beneficiaries — no exceptions",
                  "Annual independent financial audits published publicly",
                  "Government certified and 80G tax exempt",
                  "Open-door policy: visit us unannounced anytime",
                  "Real-time impact reports sent to all donors",
                  "Zero salary for board members — all volunteer-led governance",
                ].map((item, i) => (
                  <motion.li key={i} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.08} viewport={{ once: true }}
                    className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" custom={0.2} viewport={{ once: true }}>
              <div className="bg-gradient-to-br from-slate-600 to-slate-800 rounded-3xl p-10 text-white shadow-2xl shadow-slate-900/25">
                <h3 className="text-2xl font-extrabold mb-2">Join Our Mission</h3>
                <p className="text-slate-200 mb-8 leading-relaxed">Every act of generosity — however small — creates a ripple of change. Donate, volunteer, or simply share our work. Together, we can end hunger in our lifetime.</p>
                <div className="flex flex-col gap-3">
                  <Link href="/donate">
                    <Button className="w-full bg-white text-slate-700 hover:bg-slate-50 font-bold rounded-full h-12 shadow-lg border-0">
                      Donate Now <HandCoins className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button className="w-full bg-slate-500/20 text-white hover:bg-slate-500/30 font-bold rounded-full h-12 border border-white/20">
                      Become a Volunteer <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-spacing bg-slate-50">
        <div className="container-custom max-w-3xl">
          <SectionHeader badge="FAQs" title="Frequently Asked Questions" subtitle="Answers to the questions we hear most often from donors, partners and well-wishers." className="mb-12 text-center" />
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.1} viewport={{ once: true }}
                className="premium-card rounded-2xl overflow-hidden">
                <button className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-slate-600 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && <div className="px-6 pb-6 text-slate-600 leading-relaxed">{faq.a}</div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="section-spacing bg-white">
        <div className="container-custom text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="bg-gradient-to-r from-orange-500 to-amber-400 rounded-3xl p-14 text-white shadow-2xl shadow-orange-500/25">
            <h2 className="text-4xl font-extrabold mb-4">Ready to Make a Difference?</h2>
            <p className="text-orange-100 text-lg max-w-2xl mx-auto mb-8">Whether you donate ₹100 or ₹1,00,000 — your contribution goes directly to a family in need. Start your impact journey today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/donate">
                <Button className="bg-white text-orange-600 hover:bg-orange-50 font-bold rounded-full px-10 h-14 text-base shadow-xl border-0">
                  Donate Now <HandCoins className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-orange-600/20 text-white hover:bg-orange-600/30 font-bold rounded-full px-10 h-14 text-base border border-white/30">
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
