"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Cake,
  Heart,
  HandCoins,
  Gift,
  Star,
  Users,
  Utensils,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Quote,
  Award,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  User,
  Calendar,
  ImagePlus,
  UploadCloud,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { SectionHeader } from "@/components/ui/SectionHeader"

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
}

/* ─── Data ─── */
const donationTiers = [
  {
    amount: "₹500",
    label: "Jyot Seva",
    icon: Utensils,
    color: "from-orange-400 to-amber-300",
    bgLight: "bg-orange-50",
    border: "border-orange-200",
    textColor: "text-orange-600",
    impact: "5 bacchon ko ek din ka poshan",
    items: [
      "5 kids ko nutritious meal",
      "Birthday ka naam Seva Register mein",
      "Digital Seva Certificate",
      "WhatsApp Thank You message",
    ],
    popular: false,
  },
  {
    amount: "₹1,100",
    label: "Prem Seva",
    icon: Heart,
    color: "from-rose-500 to-pink-400",
    bgLight: "bg-rose-50",
    border: "border-rose-300",
    textColor: "text-rose-600",
    impact: "12 zarooratmand kids tak khana",
    items: [
      "12 kids ko nutritious meal",
      "Ek child ka school kit support",
      "Personalized Birthday Seva Certificate",
      "Impact photo update on WhatsApp",
    ],
    popular: true,
  },
  {
    amount: "₹2,100",
    label: "Shubh Seva",
    icon: Gift,
    color: "from-brand-600 to-brand-400",
    bgLight: "bg-brand-50",
    border: "border-brand-200",
    textColor: "text-brand-600",
    impact: "25 kids + 2 bacchon ki education support",
    items: [
      "25 kids ko nutritious meal",
      "2 bacchon ka stationery kit",
      "Premium Birthday Seva Certificate",
      "Handwritten Thank You Card",
      "Social media shoutout (if desired)",
    ],
    popular: false,
  },
  {
    amount: "₹5,100",
    label: "Maha Seva",
    icon: Star,
    color: "from-slate-700 to-slate-500",
    bgLight: "bg-slate-50",
    border: "border-slate-300",
    textColor: "text-slate-700",
    impact: "60+ kids + cow care + bacchon ki education",
    items: [
      "60+ kids ko nutritious meal",
      "Gaushala mein 1 din ki cow care",
      "5 bacchon ka education kit",
      "Premium Framed Birthday Certificate",
      "Personal call from SSF team",
      "Social media birthday celebration post",
    ],
    popular: false,
  },
]

const steps = [
  {
    step: "01",
    icon: Gift,
    title: "Apna Birthday Choose Karo",
    desc: "Select karo apna birthday date aur jo cause tumhare dil ke kareeb hai — food, education, ya cow welfare.",
    color: "from-orange-500 to-amber-400",
  },
  {
    step: "02",
    icon: HandCoins,
    title: "Donate Karo",
    desc: "Apni marzi ke amount par donate karo. ₹500 se shuru karke ₹5,100+ tak — har rupya ek family tak pahunchta hai.",
    color: "from-rose-500 to-pink-400",
  },
  {
    step: "03",
    icon: Award,
    title: "Certificate Pao",
    desc: "Turant ek beautiful Birthday Seva Certificate paoge — naam, date, aur cause ke saath — share karo apno ke saath.",
    color: "from-brand-600 to-brand-400",
  },
]

const impactStats = [
  { number: "1,200+", label: "Birthdays Celebrated with Seva", icon: Cake },
  { number: "18,000+", label: "Meals Donated on Birthdays", icon: Utensils },
  { number: "3,400+", label: "Children Supported via Birthday Gifts", icon: BookOpen },
  { number: "100%", label: "Transparent & Verified Impact", icon: CheckCircle2 },
]

const testimonials = [
  {
    name: "Priya Sharma",
    age: 28,
    city: "Delhi",
    amount: "₹2,100",
    quote:
      "Maine apne 28ve birthday par pehli baar socha ki gift lene ke bajaye dena zyada accha lagega. SSF ke birthday seva programme ne mujhe ekdum sahi platform diya. Mere naam ka certificate mere parents ne frame karke ghar mein lagaya — isse better birthday gift mujhe nahi mila!",
    cause: "Food + Education",
    initials: "PS",
    color: "from-rose-400 to-pink-300",
  },
  {
    name: "Rahul Mehta",
    age: 35,
    city: "Noida",
    amount: "₹5,100",
    quote:
      "Maha Seva pack liya — 60 families ko khana, 5 bacchon ko school kit. SSF team ne mujhe WhatsApp pe photos bheje. Birthday pe aisa sukoon mila jo kisi party mein nahi milta. Har saal ab yahi karunga.",
    cause: "Food + Education + Cow Welfare",
    initials: "RM",
    color: "from-slate-500 to-slate-400",
  },
  {
    name: "Sunita Gupta",
    age: 50,
    city: "Ghaziabad",
    amount: "₹1,100",
    quote:
      "50ve birthday pe bete ne meri taraf se SSF mein donate kiya. Jab maine un families ki photo dekhi jinhone khana khaya — aankhon mein aansu aa gaye. Yeh ek ऐसा birthday tha jo zindagi bhar yaad rahega.",
    cause: "Food Distribution",
    initials: "SG",
    color: "from-orange-400 to-amber-300",
  },
]

const causes = [
  {
    icon: Utensils,
    title: "Free Food Distribution",
    desc: "Apne birthday par zarooratmand families ko hot nutritious meals khilao",
    color: "from-orange-500 to-amber-400",
  },
  {
    icon: BookOpen,
    title: "Education Support",
    desc: "Kisi child ko school kit, books aur stationery gift karo",
    color: "from-slate-600 to-slate-400",
  },
  {
    icon: Heart,
    title: "Cow Welfare / Gau Seva",
    desc: "Rescued cows ki care aur Gaushala maintenance support karo",
    color: "from-rose-500 to-pink-400",
  },
  {
    icon: Users,
    title: "Medical Outreach",
    desc: "Free medical camp support — medicines, consultations, diagnostics",
    color: "from-brand-600 to-brand-400",
  },
]

/* ─── Floating Particle Component ─── */
function FloatingParticle({ delay, x, size, color }: { delay: number; x: string; size: number; color: string }) {
  return (
    <motion.div
      className={`absolute rounded-full opacity-60 pointer-events-none ${color}`}
      style={{ width: size, height: size, left: x, bottom: "-10px" }}
      animate={{
        y: [0, -700],
        x: [0, Math.random() > 0.5 ? 40 : -40],
        opacity: [0, 0.7, 0],
        scale: [0.5, 1, 0.3],
      }}
      transition={{
        duration: 5 + Math.random() * 3,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  )
}

/* ─── Candle SVG ─── */
function CandleIcon() {
  return (
    <svg viewBox="0 0 24 40" className="w-6 h-8" fill="none">
      <rect x="8" y="16" width="8" height="24" rx="2" fill="#dc2626" />
      <rect x="10" y="20" width="4" height="16" rx="1" fill="#b91c1c" opacity="0.5" />
      <ellipse cx="12" cy="10" rx="4" ry="6" fill="#fbbf24" opacity="0.9" />
      <ellipse cx="12" cy="13" rx="2" ry="3" fill="#f59e0b" />
      <motion.ellipse
        cx="12"
        cy="8"
        rx="2.5"
        ry="3.5"
        fill="#fde68a"
        animate={{ scaleX: [1, 1.3, 0.8, 1.2, 1], scaleY: [1, 0.9, 1.2, 0.85, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  )
}

/* ─── Main Component ─── */
export function BirthdayPageClient() {
  const [activeTestimonial, setActiveTestimonial] = React.useState(0)
  const [direction, setDirection] = React.useState(1)

  // Form State
  const [donorName, setDonorName] = React.useState("")
  const [birthdayDate, setBirthdayDate] = React.useState("")
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(null)

  const goToTestimonial = (index: number, dir: number) => {
    setDirection(dir)
    setActiveTestimonial(index)
  }

  const prevTestimonial = () => {
    const prev = (activeTestimonial - 1 + testimonials.length) % testimonials.length
    goToTestimonial(prev, -1)
  }

  const nextTestimonial = () => {
    const next = (activeTestimonial + 1) % testimonials.length
    goToTestimonial(next, 1)
  }

  React.useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000)
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTestimonial])

  const testimonialVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60, transition: { duration: 0.35 } }),
  }

  const particles = React.useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        delay: i * 0.35,
        x: `${(i * 5.8) % 100}%`,
        size: 8 + (i % 4) * 5,
        color: [
          "bg-red-400", "bg-orange-400", "bg-amber-300", "bg-rose-400",
          "bg-pink-400", "bg-yellow-300", "bg-red-300", "bg-orange-300",
        ][i % 8],
      })),
    []
  )

  return (
    <div className="bg-white w-full max-w-full overflow-x-clip">

      {/* ═══════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center pt-28 sm:pt-36 lg:pt-48 pb-24 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#fff0f0] via-white to-[#fff8f0]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(168,0,0,0.07)_0%,_transparent_60%)]" />

        {/* Floating Blobs */}
        <motion.div
          className="absolute top-16 right-0 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-red-100 rounded-full blur-3xl opacity-30 translate-x-1/3"
          animate={{ x: [0, 20, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-orange-100 rounded-full blur-3xl opacity-40 -translate-x-1/3"
          animate={{ y: [0, -20, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <FloatingParticle key={p.id} delay={p.delay} x={p.x} size={p.size} color={p.color} />
          ))}
        </div>

        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-slate-700 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-700 font-semibold">Birthday Seva</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Text */}
            <motion.div variants={fadeUp} initial="hidden" animate="show" className="max-w-2xl lg:order-last">
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-red-100 shadow-sm mb-8"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-bold text-slate-800">Celebrate With Purpose</span>
                <Sparkles className="w-4 h-4 text-orange-500" />
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.05] mb-6 tracking-tight">
                Apna Birthday{" "}
                <span className="text-gradient-warm">Seva</span> Ke{" "}
                <br className="hidden sm:block" />
                Saath Celebrate{" "}
                <span className="text-gradient-primary">Karo</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-4 max-w-xl">
                Gift lene ki jagah — <strong>gift do.</strong> Apne birthday par Shri Shyam Foundation ke saath donate karo aur zarooratmand families, bacchon aur cows ki zindagi mein khushi lao.
              </p>
              <p className="text-base text-slate-500 leading-relaxed mb-10 max-w-xl">
                Ek special <strong>Birthday Seva Certificate</strong> bhi milega — apna naam, date aur cause ke saath — jo zindagibhar yaad rahega.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/donate">
                  <Button
                    id="birthday-hero-donate-btn"
                    className="bg-gradient-to-r from-[#a80000] to-[#dc2626] text-white border-0 rounded-full px-10 h-14 text-base font-bold shadow-xl shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Abhi Donate Karo <HandCoins className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button
                    variant="outline"
                    id="birthday-hero-learn-btn"
                    className="rounded-full px-10 h-14 text-base font-bold border-slate-200 hover:border-red-200 hover:text-[#a80000]"
                  >
                    Kaise Kaam Karta Hai <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* Right — Birthday Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center"
            >
              {/* Main Card */}
              <div className="relative w-full max-w-sm mx-auto">
                {/* Decorative ring */}
                <div className="absolute -inset-4 bg-gradient-to-br from-red-100 via-orange-50 to-amber-100 rounded-[3rem] blur-xl opacity-70" />

                <div className="relative bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-900/10 border border-slate-100">
                  {/* Cake Visual */}
                  <div className="text-center mb-6">
                    {/* Candles Row */}
                    <div className="flex justify-center gap-2 mb-3">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.4, delay: 0.5 + i * 0.15 }}
                        >
                          <CandleIcon />
                        </motion.div>
                      ))}
                    </div>

                    {/* Cake Layers */}
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="w-36 h-10 bg-gradient-to-b from-[#dc2626] to-[#a80000] rounded-t-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold tracking-wider">SHRI SHYAM SEVA</span>
                      </div>
                      <div className="w-44 h-10 bg-gradient-to-b from-orange-400 to-orange-500 flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">Happy Birthday Seva 🎂</span>
                      </div>
                      <div className="w-52 h-12 bg-gradient-to-b from-amber-300 to-yellow-400 rounded-b-2xl flex items-center justify-center">
                        <span className="text-amber-900 text-xs font-bold">Feed. Educate. Care. 🙏</span>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Preview */}
                  <div className="bg-gradient-to-br from-[#fff0f0] to-[#fffaf0] border border-red-100 rounded-2xl p-4 text-center">
                    <div className="flex justify-center mb-2">
                      <Award className="w-6 h-6 text-[#a80000]" />
                    </div>
                    <p className="text-xs font-bold text-[#a80000] uppercase tracking-widest mb-1">Birthday Seva Certificate</p>
                    <p className="text-sm font-bold text-slate-800">Aapka Naam Yahan</p>
                    <p className="text-xs text-slate-500 mt-0.5">ne aaj 25 families ko khana khilaya</p>
                    <div className="mt-3 flex justify-center">
                      <span className="text-xs bg-white border border-red-100 text-[#a80000] font-semibold px-3 py-1 rounded-full">
                        🏅 Shri Shyam Foundation
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Badges */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                  animate={{ y: [0, -6, 0], rotate: [-3, 3, -3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🎉 1,200+ Celebrated!
                </motion.div>

                <motion.div
                  className="absolute -bottom-3 -left-4 bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> 80G Tax Exempt
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          BIRTHDAY DETAILS FORM
      ═══════════════════════════════════ */}
      <section className="section-spacing bg-slate-50 border-b border-slate-200">
        <div className="container-custom max-w-2xl">
          <SectionHeader
            badge="Donate Karne Se Pehle"
            title="Apni Birthday Details Bharein"
            subtitle="Taaki hum aapka personalized Birthday Seva Certificate aur update aapko bhej sakein."
            align="center"
            className="mb-10"
          />

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Aapka Naam</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="E.g., Rahul Kumar"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#a80000]/20 focus:border-[#a80000] transition-all"
                  />
                </div>
              </div>

              {/* Birthday Date Field */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Birthday Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Calendar className="w-5 h-5 text-slate-400" />
                  </div>
                  <input
                    type="date"
                    value={birthdayDate}
                    onChange={(e) => setBirthdayDate(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#a80000]/20 focus:border-[#a80000] transition-all"
                  />
                </div>
              </div>

              {/* Photo Upload Field */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Apni Photo Upload Karein (Optional)</label>
                <p className="text-xs text-slate-500 mb-3">Yeh photo aapke premium certificate aur social media shoutout ke liye use hogi.</p>
                <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all ${photoPreview ? "border-[#a80000]/50 bg-red-50/50" : "border-slate-300 bg-slate-50 hover:bg-slate-100"}`}>
                  <div className="flex flex-col items-center justify-center h-full w-full relative overflow-hidden rounded-xl">
                    {photoPreview ? (
                      <>
                        <img src={photoPreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
                        <div className="relative z-10 flex flex-col items-center">
                          <CheckCircle2 className="w-8 h-8 text-[#a80000] mb-2" />
                          <p className="text-sm font-semibold text-[#a80000]">Photo Attached! Click to change.</p>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImagePlus className="w-8 h-8 text-slate-400 mb-2" />
                        <p className="text-sm font-medium text-slate-600">Click to upload photo</p>
                        <p className="text-xs text-slate-500 mt-1">SVG, PNG, JPG (MAX. 5MB)</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setPhotoPreview(URL.createObjectURL(e.target.files[0]))
                      }
                    }}
                  />
                </label>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <a href="#donation-tiers">
                  <Button className="w-full h-14 bg-gradient-to-r from-[#a80000] to-[#dc2626] hover:from-[#8a0000] hover:to-[#b91c1c] text-white font-bold text-base rounded-xl border-0 shadow-lg shadow-red-500/20">
                    Save Details & Proceed to Donate <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Your information is secure and private
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          IMPACT COUNTER STRIP
      ═══════════════════════════════════ */}
      <section className="bg-gradient-to-r from-[#a80000] to-[#dc2626] py-10">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {impactStats.map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                custom={i}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-1">
                  <stat.icon className="w-5 h-5" />
                </div>
                <p className="text-3xl sm:text-4xl font-black">{stat.number}</p>
                <p className="text-red-100 text-sm font-medium leading-snug max-w-[140px]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════ */}
      <section id="how-it-works" className="section-spacing bg-white">
        <div className="container-custom">
          <SectionHeader
            badge="Simple 3 Steps"
            title="Birthday Seva Kaise Karte Hain?"
            subtitle="Sirf 3 aasaan steps mein apne birthday ko ek meaningful seva mein badlo. Kuch minutes lagenge, impact lifelong rahega."
            align="center"
            className="mb-16"
          />

          <div className="grid sm:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden sm:block absolute top-14 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-orange-200 via-rose-200 to-red-200" />

            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                initial="hidden"
                whileInView="show"
                custom={i}
                viewport={{ once: true }}
                className="relative text-center flex flex-col items-center"
              >
                {/* Step Number + Icon */}
                <div className="relative mb-6">
                  <div
                    className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl mx-auto`}
                  >
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center text-sm font-black text-slate-700 shadow-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed max-w-xs">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          DONATION TIERS
      ═══════════════════════════════════ */}
      <section id="donation-tiers" className="section-spacing bg-slate-50">
        <div className="container-custom">
          <SectionHeader
            badge="Birthday Donation Options"
            title="Apna Birthday Seva Package Chuno"
            subtitle="Har package ek zarooratmand family tak seedha pahunchta hai. ₹500 se shuru karke — sab kuch transparent aur verified."
            align="center"
            className="mb-14"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {donationTiers.map((tier, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                custom={i * 0.1}
                viewport={{ once: true }}
                className={`relative bg-white rounded-3xl overflow-hidden border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  tier.popular ? "border-rose-400 shadow-xl shadow-rose-100" : `${tier.border} shadow-md`
                }`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-rose-500 to-pink-400 text-white text-xs font-bold text-center py-1.5 tracking-wider">
                    ⭐ SABSE POPULAR
                  </div>
                )}

                <div className={`p-6 ${tier.popular ? "pt-9" : "pt-6"}`}>
                  {/* Icon + Label */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4 shadow-md`}>
                    <tier.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className={`text-xs font-bold uppercase tracking-widest ${tier.textColor} mb-1`}>{tier.label}</p>
                  <p className="text-4xl font-black text-slate-900 mb-1">{tier.amount}</p>
                  <p className="text-xs text-slate-500 mb-5 leading-snug">{tier.impact}</p>

                  {/* Divider */}
                  <div className={`h-0.5 w-full bg-gradient-to-r ${tier.color} opacity-30 rounded mb-5`} />

                  {/* Items */}
                  <ul className="space-y-2.5 mb-6">
                    {tier.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${tier.textColor}`} />
                        <span className="text-slate-600 text-xs leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/donate">
                    <Button
                      id={`birthday-tier-${i}-btn`}
                      className={`w-full rounded-xl h-11 font-bold text-sm ${
                        tier.popular
                          ? "bg-gradient-to-r from-rose-500 to-pink-400 text-white border-0 shadow-lg"
                          : `bg-gradient-to-r ${tier.color} text-white border-0`
                      }`}
                    >
                      {tier.amount} Donate Karo
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-center text-sm text-slate-500 mt-8 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            Custom amount ke liye directly{" "}
            <Link href="/donate" className="text-[#a80000] font-semibold hover:underline">
              Donate page
            </Link>{" "}
            pe jao — ₹100 se shuru kar sakte ho
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════
          CHOOSE YOUR CAUSE
      ═══════════════════════════════════ */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <SectionHeader
            badge="Apna Cause Chuno"
            title="Kaunsi Seva Tumhare Dil Ke Kareeb Hai?"
            subtitle="Birthday seva ka matlab sirf khana nahi — tum education, cow welfare ya medical support bhi choose kar sakte ho."
            align="center"
            className="mb-14"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {causes.map((cause, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                initial="hidden"
                whileInView="show"
                custom={i * 0.1}
                viewport={{ once: true }}
                className="premium-card p-7 rounded-2xl text-center group cursor-pointer"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cause.color} flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <cause.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-2">{cause.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{cause.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* ═══════════════════════════════════
          CERTIFICATE SECTION
      ═══════════════════════════════════ */}
      <section className="section-spacing bg-[#fef2f2] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-orange-200/30 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <SectionHeader
                badge="Birthday Seva Certificate"
                title="Ek Yaadgar Certificate — Zindagi Bhar Ke Liye"
                subtitle=""
              />
              <div className="space-y-5 text-slate-600 leading-relaxed">
                <p>
                  Donate karne ke baad tumhe ek <strong>beautiful Birthday Seva Certificate</strong> milega — tumhare naam ke saath, date ke saath, aur wo cause jiske liye tumne donate kiya.
                </p>
                <p>
                  Yeh certificate digital format mein WhatsApp aur email pe bheja jayega. Premium packages mein <strong>framed physical copy</strong> bhi milti hai.
                </p>
                <p className="font-semibold text-slate-800">
                  Share karo apne social media pe, apne parents ko dikhao — birthday gift se bhi zyada khaas hai yeh certificate. 🏅
                </p>
              </div>

              <ul className="space-y-3 mt-8">
                {[
                  "Tumhara naam aur birthday date mention hoga",
                  "Cause aur impact clearly likha hoga",
                  "Shri Shyam Foundation ki official seal",
                  "80G tax exemption ke liye valid donation receipt bhi",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    custom={i * 0.08}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#a80000] shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8">
                <Link href="/donate">
                  <Button
                    id="birthday-certificate-cta-btn"
                    className="bg-gradient-to-r from-[#a80000] to-[#dc2626] text-white border-0 rounded-full px-10 h-13 font-bold shadow-xl shadow-red-500/20"
                  >
                    Certificate Paane Ke Liye Donate Karo <Award className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Certificate Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center"
            >
              <div className="relative max-w-sm w-full">
                {/* Glow */}
                <div className="absolute -inset-6 bg-gradient-to-br from-red-200/40 to-orange-200/40 rounded-[3rem] blur-2xl" />

                {/* Certificate Card */}
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-[#a80000]/10">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-[#a80000] to-[#dc2626] p-5 text-center">
                    <div className="flex justify-center mb-2">
                      <img
                        src="/images/live/shri-shyam-final-logo-1-1.gif"
                        alt="Shri Shyam Foundation"
                        className="h-10 w-auto object-contain brightness-0 invert"
                      />
                    </div>
                    <p className="text-white text-xs font-bold tracking-widest uppercase opacity-90">Shri Shyam Foundation</p>
                  </div>

                  {/* Body */}
                  <div className="p-6 text-center bg-gradient-to-b from-[#fffaf5] to-white">
                    <div className="mb-4">
                      <Award className="w-12 h-12 text-[#a80000] mx-auto mb-2" />
                      <p className="text-xs font-bold text-[#a80000] uppercase tracking-[0.2em] mb-3">Birthday Seva Certificate</p>
                    </div>

                    <p className="text-xs text-slate-500 mb-1">Yeh Certificate Praman Karta Hai Ki</p>
                    <p className="text-2xl font-black text-slate-900 mb-1">Aapka Naam</p>
                    <div className="w-24 h-0.5 bg-gradient-to-r from-[#a80000] to-orange-400 mx-auto mb-3" />
                    <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                      Ne apne birthday par Shri Shyam Foundation ke through{" "}
                      <strong>25 zarooratmand families</strong> ko nutritious meals donate kiye.
                    </p>

                    {/* Seal */}
                    <div className="flex justify-center gap-4 text-xs text-slate-500">
                      <div className="text-center">
                        <div className="w-10 h-10 rounded-full border-2 border-[#a80000] flex items-center justify-center mx-auto mb-1">
                          <Star className="w-4 h-4 text-[#a80000] fill-current" />
                        </div>
                        <span>Verified</span>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 rounded-full border-2 border-orange-400 flex items-center justify-center mx-auto mb-1">
                          <Heart className="w-4 h-4 text-orange-500 fill-current" />
                        </div>
                        <span>80G Valid</span>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 rounded-full border-2 border-slate-400 flex items-center justify-center mx-auto mb-1">
                          <CheckCircle2 className="w-4 h-4 text-slate-500" />
                        </div>
                        <span>Official</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <p className="text-[10px] text-slate-400 font-medium">Date: {new Date().toLocaleDateString("hi-IN")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════ */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <SectionHeader
            badge="Birthday Seva Stories"
            title="Unke Baare Mein Jinhone Celebrate Kiya"
            subtitle="Real donors, real impact — jo logon ne apna birthday seva ke saath celebrate kiya aur zindagi badal di."
            align="center"
            className="mb-14"
          />

          <div className="max-w-3xl mx-auto relative">
            <div className="overflow-hidden rounded-3xl">
              <AnimatePresence custom={direction} mode="popLayout">
                <motion.div
                  key={activeTestimonial}
                  custom={direction}
                  variants={testimonialVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-3xl p-8 sm:p-12 shadow-lg"
                >
                  {/* Quote Icon */}
                  <Quote className="w-10 h-10 text-red-100 mb-6" />

                  <p className="text-slate-700 text-lg leading-relaxed mb-8 font-medium italic">
                    "{testimonials[activeTestimonial].quote}"
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div
                        className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonials[activeTestimonial].color} flex items-center justify-center text-white font-black text-lg shadow-md`}
                      >
                        {testimonials[activeTestimonial].initials}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{testimonials[activeTestimonial].name}</p>
                        <p className="text-sm text-slate-500">
                          {testimonials[activeTestimonial].age} years • {testimonials[activeTestimonial].city}
                        </p>
                        <p className="text-xs text-[#a80000] font-semibold mt-0.5">
                          Donated: {testimonials[activeTestimonial].amount} • {testimonials[activeTestimonial].cause}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 text-amber-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-red-200 shadow-sm flex items-center justify-center transition-all hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToTestimonial(i, i > activeTestimonial ? 1 : -1)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeTestimonial ? "w-6 h-2.5 bg-[#a80000]" : "w-2.5 h-2.5 bg-slate-200 hover:bg-slate-300"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-red-200 shadow-sm flex items-center justify-center transition-all hover:scale-110"
              >
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FAQ STRIP
      ═══════════════════════════════════ */}
      <section className="section-spacing bg-slate-50">
        <div className="container-custom max-w-3xl">
          <SectionHeader
            badge="FAQs"
            title="Birthday Seva — Common Sawaal"
            subtitle=""
            align="center"
            className="mb-12"
          />
          <div className="space-y-4">
            {[
              {
                q: "Kya birthday ke alawa bhi kisi ke liye donate kar sakte hain?",
                a: "Bilkul! Kisi bhi occasion pe — anniversary, graduation, tribute — aap donate kar sakte hain. Birthday Seva certificate mein occasion ka naam mention ho sakta hai.",
              },
              {
                q: "Certificate kab milega?",
                a: "Donation ke 24-48 ghante ke andar digital certificate WhatsApp aur email pe bheja jayega. Premium packages mein physical framed copy 7-10 working days mein courier hogi.",
              },
              {
                q: "80G tax exemption milega?",
                a: "Haan! Shri Shyam Foundation 80G certified hai. Donation receipt automatically generate hoti hai jisme 80G number clearly mention hota hai.",
              },
              {
                q: "Apni marzi se koi bhi amount donate kar sakte hain?",
                a: "Haan, minimum ₹100 se shuru kar sakte hain. Donate page pe custom amount option available hai. Jitna dil kare utna dena meaningful hai.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                custom={i * 0.08}
                viewport={{ once: true }}
                className="premium-card rounded-2xl p-6"
              >
                <h3 className="font-bold text-slate-900 mb-2 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-50 text-[#a80000] text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {faq.q}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed pl-9">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════ */}
      <section className="section-spacing bg-white">
        <div className="container-custom text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-[#a80000] to-[#dc2626] rounded-3xl p-12 sm:p-16 text-white shadow-2xl shadow-red-800/25 overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3" />

            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
                    >
                      <Cake className="w-8 h-8 text-orange-300" />
                    </motion.div>
                  ))}
                </div>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
                Is Birthday Ko Yaadgar Banao! 🎂
              </h2>
              <p className="text-red-100 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                Ek plate khana, ek bachche ka school kit, ya ek gaye ki ek din ki care — tumhare birthday gift ne kisi ki zindagi badal di.{" "}
                <strong className="text-white">Abhi shuru karo.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/donate">
                  <Button
                    id="birthday-final-donate-btn"
                    className="bg-white text-[#a80000] hover:bg-red-50 font-bold rounded-full px-12 h-14 text-base shadow-xl border-0 transition-all hover:-translate-y-0.5"
                  >
                    Birthday Seva Donate Karo <HandCoins className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    id="birthday-final-contact-btn"
                    className="bg-white/10 text-white hover:bg-white/20 font-bold rounded-full px-12 h-14 text-base border border-white/20"
                  >
                    Hume Batao — Customize Karo <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              <p className="text-red-200 text-sm mt-6">
                80G Tax Exempt • 100% Transparent • Verified NGO Since 2015
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
