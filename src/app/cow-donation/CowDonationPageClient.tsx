"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Heart,
  HandCoins,
  Shield,
  CheckCircle2,
  ArrowRight,
  Star,
  Phone,
  ChevronDown,
  Leaf,
  Users,
  Droplets,
  Stethoscope,
  Home,
  Siren,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DonorDetailsModal } from "@/components/donate/DonorDetailsModal";
import { useCashfreeCheckout } from "@/hooks/useCashfreeCheckout";
import type { DonorDetails } from "@/lib/donorSchema";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

function AnimatedCounter({
  to,
  label,
  suffix = "+",
}: {
  to: number;
  label: string;
  suffix?: string;
}) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / 60;
    const interval = setInterval(() => {
      start += step;
      if (start >= to) {
        setCount(to);
        clearInterval(interval);
      } else setCount(Math.floor(start));
    }, 25);
    return () => clearInterval(interval);
  }, [inView, to]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl lg:text-4xl font-black text-green-800">
        {count.toLocaleString("en-IN")}
        {suffix}
      </p>
      <p className="text-green-900 font-semibold mt-1.5 text-xs sm:text-sm">
        {label}
      </p>
    </div>
  );
}

/* ─── Hero — image-first storytelling ─── */
const heroSlides = [
  {
    src: "/gallery/program-4.webp",
    alt: "Volunteers and a child placing fresh green fodder into a trough for cows under a thatched rural shelter at golden hour",
    caption: "Daily Accident occur in Road due to heavy Vechile",
    badge: "Gau Seva in Action",
    title: "Feed Them.",
    highlight: "Protect Them.",
    desc: "At golden hour, our volunteers and families carry fresh green fodder to cows resting under thatched shelters. This is the daily Gau Seva your donation keeps alive.",
  },
  {
    src: "/images/live/7.jpg.jpeg",
    alt: "Two abandoned cows lying collapsed on a dusty village roadside with no food or water nearby",
    caption: "Why rescue cannot wait",
    badge: "The Reality on Our Roads",
    title: "Too Many Cows",
    highlight: "Are Left Behind",
    desc: "Abandoned cows collapse on roads without food or water. Our rescue team answers these calls — lifting them to shelter, then starting emergency care the same day.",
  },
  {
    src: "/images/live/8.jpg.jpeg",
    alt: "Shri Shyam Foundation volunteer in a branded white T-shirt hand-feeding fresh red tomatoes to a white cow outdoors",
    caption: "Hands-on feeding, every day",
    badge: "Your Donation, Made Visible",
    title: "Your Kindness",
    highlight: "Reaches Their Mouth",
    desc: "This is what a cow donation looks like on the ground — a volunteer in an SSF shirt offering fresh produce, one animal at a time.",
  },
  {
    src: "/gallery/program-7.webp",
    alt: "A volunteer crouching beside a resting brown-and-white calf under roadside trees, gently stroking its back",
    caption: "Quiet care for a young calf",
    badge: "Compassion Up Close",
    title: "Every Calf Deserves",
    highlight: "A Gentle Hand",
    desc: "Sometimes care is simply staying close — a volunteer sitting with a resting calf while traffic moves past. Dignity starts with presence.",
  },
];

/* ─── Modern NGO-style seva packages (auspicious amounts) ─── */
const sevaPackages = [
  {
    id: "roti",
    title: "First Roti Seva",
    amount: 101,
    impact: "One simple meal for a cow in our care",
    detail: "A small beginning — fresh roti or produce offered with devotion.",
    img: "/gallery/program-8.webp",
    imgAlt: "SSF volunteer hand-feeding tomatoes to a white cow",
    imgFocus: "object-[center_20%]",
    icon: "🫓",
  },
  {
    id: "fodder",
    title: "Green Fodder Seva",
    amount: 151,
    impact: "Fresh green fodder for one feeding",
    detail: "Helps fill the trough with grass and greens that cows need daily.",
    img: "/images/live/10.jpg.jpeg",
    imgAlt: "Volunteers placing green fodder into a feeding trough for cows",
    imgFocus: "object-[center_30%]",
    icon: "🌿",
  },
  {
    id: "day",
    title: "Feed a Cow for a Day",
    amount: 251,
    impact: "Full-day fodder, water & basic care",
    detail: "Covers one rescued cow’s nutrition and care for a complete day.",
    img: "/gallery/program-7.webp",
    imgAlt: "SSF volunteer offering a tomato to a black cow in an open field",
    imgFocus: "object-[center_22%]",
    icon: "🐄",
    popular: true,
  },
  {
    id: "medical",
    title: "Treatment Seva",
    amount: 501,
    impact: "Wound care, antiseptic & basic medicines",
    detail: "Supports veterinary dressing, pain relief and on-site treatment.",
    img: "/gallery/treatment_Seva.webp",
    imgAlt:
      "Veterinarian in blue scrubs treating a wound on a white cow inside the shelter",
    imgFocus: "object-[center_28%]",
    icon: "💊",
  },
  {
    id: "monthly",
    title: "Monthly Nutrition",
    amount: 1101,
    impact: "One month of fodder for one cow",
    detail: "Green fodder, dry grass and clean water across an entire month.",
    img: "/gallery/program-9.webp",
    imgAlt: "Volunteer gently feeding a brown cow while a calf rests nearby",
    imgFocus: "object-[center_18%]",
    icon: "🌾",
  },
  {
    id: "calf",
    title: "Sponsor a Calf",
    amount: 2101,
    impact: "One month of milk, warmth & care for a calf",
    detail:
      "Bottle-feeding, nutrition and close monitoring for a rescued calf.",
    img: "/gallery/program-10.webp",
    imgAlt: "Caregiver bottle-feeding a young white calf lying on dry ground",
    imgFocus: "object-[center_35%]",
    icon: "🐮",
  },
  {
    id: "adopt",
    title: "Adopt a Cow (1 Month)",
    amount: 5101,
    impact: "Full month: food, shelter & medical cover",
    detail:
      "The most complete package — nutrition, shelter upkeep and treatment.",
    img: "/gallery/adopt_cow.webp",
    imgAlt: "Large ventilated gaushala housing a herd of indigenous cows",
    imgFocus: "object-center",
    icon: "🏠",
  },
  {
    id: "rescue",
    title: "Emergency Rescue",
    amount: 11001,
    impact: "Transport, emergency treatment & first-week care",
    detail: "Funds roadside or highway rescue, first aid and early recovery.",
    img: "/gallery/emergency_rescue.webp",
    imgAlt:
      "Severely injured white cow lying on a road with a bleeding bandaged leg",
    imgFocus: "object-[center_40%]",
    icon: "🚨",
  },
];

const quickAmounts = [101, 151, 251, 501, 1101, 2101, 5101, 11001];

const whyCards = [
  {
    icon: Heart,
    color: "text-rose-500 bg-rose-50",
    title: "They Cannot Ask for Help",
    desc: "Cows abandoned on roads cannot walk to a shelter. Someone has to notice, lift them, and stay. That someone is often our volunteer team.",
  },
  {
    icon: Stethoscope,
    color: "text-slate-600 bg-slate-50",
    title: "Injuries Need Real Treatment",
    desc: "Road accidents leave open wounds and broken limbs. We bring veterinarians, antiseptics and dressings to the animal — not just a temporary bandage.",
  },
  {
    icon: Leaf,
    color: "text-slate-600 bg-slate-50",
    title: "Hunger Is Daily Work",
    desc: "A gaushala runs on fodder, not slogans. Fresh greens, dry grass and clean water must arrive every morning — rain or shine.",
  },
  {
    icon: Siren,
    color: "text-orange-600 bg-orange-50",
    title: "Accidents Happen on Highways",
    desc: "Overturned cattle trucks leave animals stunned on asphalt. Emergency rescue means rope, transport, and immediate medical attention.",
  },
  {
    icon: Users,
    color: "text-cyan-600 bg-cyan-50",
    title: "Care Is Hands-On",
    desc: "From bottle-feeding a weak calf to stroking a resting one under roadside trees — our work is personal, quiet and continuous.",
  },
  {
    icon: Home,
    color: "text-green-700 bg-green-50",
    title: "Shelter Gives Them Safety",
    desc: "A ventilated shed with ear tags and health rounds is where recovery begins. Donation money keeps that roof standing and the floor clean.",
  },
];

const careTimeline = [
  {
    step: "01",
    title: "Rescue Call",
    desc: "We respond when someone reports an injured or abandoned cow on a road, highway or public space — and move the animal to safety.",
    img: "/images/hero/cow-banner.png",
  },
  {
    step: "02",
    title: "First Medical Care",
    desc: "Wounds are cleaned, bandaged and assessed. Critical cases get veterinarian attention before anything else.",
    img: "/gallery/treatment_Seva.webp",
  },
  {
    step: "03",
    title: "Daily Feeding",
    desc: "Green fodder, produce and clean water are provided by hand. Volunteers show up — they do not outsource care.",
    img: "/gallery/program-3.webp",
  },
  {
    step: "04",
    title: "Safe Shelter",
    desc: "Recovering cows rest under a large ventilated shed with the herd, tagged and monitored.",
    img: "/gallery/adopt_cow.webp",
  },
  {
    step: "05",
    title: "Ongoing Check-ups",
    desc: "Vets listen with a stethoscope, track recovery and adjust treatment until the animal is stable.",
    img: "/gallery/program-11.webp",
  },
  {
    step: "06",
    title: "Long-Term Protection",
    desc: "Cows that cannot return to the roads stay under our care — fed, treated and watched for as long as they need us.",
    img: "/gallery/program-10.webp",
  },
];

const galleryImages = [
  {
    src: "/gallery/roadside_injury.png",
    alt: "Severely injured white cow on a paved road with a blood-soaked yellow bandage on its mangled rear leg",
    caption: "Roadside Injury — Waiting for Rescue",
    story:
      "This is the call we answer: an open wound on asphalt, and a life that cannot walk away.",
  },
  {
    src: "/gallery/highway_truck_rescue.png",
    alt: "Overturned yellow cattle truck on a highway with injured white cows lying on the road while responders hold rope",
    caption: "Highway Truck Accident Rescue",
    story:
      "When a cattle truck overturns, every minute matters. Rescue begins with rope, calm hands and urgent transport.",
  },
  {
    src: "/gallery/head_injury.png",
    alt: "Brown cow inside a brick-floored shelter with a yellow head bandage stained with fresh blood",
    caption: "Head Injury — Under Shelter Care",
    story:
      "After rescue comes recovery. Bandaged, resting, and watched inside the gaushala.",
  },
  {
    src: "/images/live/7.jpg.jpeg",
    alt: "Veterinarian in blue scrubs and mask cleaning a large wound on a white cow with medical supplies nearby",
    caption: "Veterinary Wound Treatment",
    story:
      "Antiseptic, gauze and a steady hand — this is how donated medicines are used.",
  },
  {
    src: "/gallery/treatment_Seva.webp",
    alt: "Animal healthcare worker wearing gloves using an orange stethoscope to examine a black-and-white cow",
    caption: "Health Check Inside the Shed",
    story:
      "Not every visit is an emergency. Regular check-ups keep the herd stable.",
  },
  {
    src: "/gallery/program-9.webp",
    alt: "Wide view of a large steel-roofed gaushala filled with indigenous cows, many wearing yellow ear tags",
    caption: "Our Gaushala — Safe Haven",
    story:
      "Hundreds of cows under one ventilated roof. This is where donated shelter support goes.",
  },
  {
    src: "/gallery/program-11.webp",
    alt: "Hands bottle-feeding milk to a young white calf with a brown eye patch lying on dry earth",
    caption: "Bottle-Feeding a Rescued Calf",
    story:
      "Weak calves cannot stand for long. Milk, warmth and patience bring them back.",
  },
  {
    src: "/gallery/program-3.webp",
    alt: "Young woman in a white T-shirt gently feeding a brown cow while a calf rests on sandy ground nearby",
    caption: "Volunteer Feeding Time",
    story:
      "A quiet moment of trust — food offered by hand, accepted without fear.",
  },
];

const faqs = [
  {
    q: "Where does my cow donation actually go?",
    a: "Into fodder and greens, clean water, veterinary medicines, rescue transport, and shelter upkeep. When you choose a seva package, we align your gift to that need first — feeding, treatment, calf care, or emergency rescue.",
  },
  {
    q: "Why do amounts end with 1 (₹51, ₹501, ₹1,101)?",
    a: "These are traditional Indian seva amounts many donors prefer for Gau Seva. They are easy to remember, feel intentional, and match how most gaushala programmes list support options. You can still enter any custom amount.",
  },
  {
    q: "Is my donation tax-exempt?",
    a: "Yes. Shri Shyam Foundation provides 80G receipts. After a successful donation you receive an official receipt by email for your tax records.",
  },
  {
    q: "Can I donate monthly?",
    a: "Yes. Choose Monthly in the donation widget. Recurring support helps us plan fodder purchases and keep medical stock ready for rescue days.",
  },
  {
    q: "Can I visit the gaushala?",
    a: "You are welcome to visit. Message us on WhatsApp or call ahead so we can guide you to the shelter and introduce you to the care team.",
  },
  {
    q: "Can I volunteer for cow care?",
    a: "Yes. Weekend volunteers help with feeding, cleaning and gentle handling. Reach out via WhatsApp or the contact page and we will share the next available slot.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Pick a Seva",
    desc: "Select a package or type any amount that feels right for you.",
  },
  {
    num: "02",
    title: "Pay Securely",
    desc: "Complete payment through our encrypted checkout — UPI, cards or net banking.",
  },
  {
    num: "03",
    title: "Get Your Receipt",
    desc: "Receive confirmation and your 80G receipt on email.",
  },
  {
    num: "04",
    title: "Impact Begins",
    desc: "Your gift funds fodder, medicine or rescue for cows already in our care.",
  },
];

export function CowDonationPageClient() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const [lightbox, setLightbox] = React.useState<
    (typeof galleryImages)[0] | null
  >(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [selectedSeva, setSelectedSeva] = React.useState(sevaPackages[2]); // ₹251 popular
  const [customAmount, setCustomAmount] = React.useState("");
  const [frequency, setFrequency] = React.useState<"one-time" | "monthly">(
    "one-time",
  );
  const [showSticky, setShowSticky] = React.useState(false);
  const [donorFormOpen, setDonorFormOpen] = React.useState(false);
  const {
    isProcessing,
    paymentError,
    paymentSuccess,
    clearPaymentError,
    clearPaymentSuccess,
    startCheckout,
  } = useCashfreeCheckout();

  const finalAmount = customAmount
    ? parseInt(customAmount, 10) || 0
    : selectedSeva.amount;
  const activeImpact =
    customAmount && !quickAmounts.includes(finalAmount)
      ? "Supports fodder, medicine or shelter needs at our gaushala"
      : selectedSeva.impact;
  const donationNote = `Cow Care Donation · ${selectedSeva.title}${frequency === "monthly" ? " (Monthly)" : ""}`;

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const selectAmount = (amount: number) => {
    const match = sevaPackages.find((s) => s.amount === amount);
    if (match) setSelectedSeva(match);
    else
      setSelectedSeva({
        ...sevaPackages[2],
        amount,
        title: "Custom Seva",
        impact: "Supports cow care at our gaushala",
        detail: "",
        id: "custom",
        img: sevaPackages[2].img,
        imgAlt: sevaPackages[2].imgAlt,
        icon: "🙏",
      });
    setCustomAmount("");
  };

  const goDonate = () => {
    if (finalAmount <= 0 || isProcessing) return;
    clearPaymentError();
    clearPaymentSuccess();
    setDonorFormOpen(true);
  };

  const donateSevaDirect = (item: (typeof sevaPackages)[number]) => {
    if (isProcessing) return
    setSelectedSeva(item)
    setCustomAmount("")
    clearPaymentError()
    clearPaymentSuccess()
    setDonorFormOpen(true)
  }

  const handleDonorSubmit = async (donor: DonorDetails) => {
    const result = await startCheckout({
      amount: finalAmount,
      returnPath: "/cow-donation",
      orderNote: donationNote,
      donor,
    });
    if (result.ok) setDonorFormOpen(false);
  };

  const slide = heroSlides[currentSlide];

  return (
    <div className="bg-white w-full max-w-full overflow-x-clip">
      {/* ── HERO ── */}
      <section className="min-h-0 lg:min-h-[88vh] flex items-center bg-[#fef2f2] pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-10 overflow-hidden">
        <div className="container-custom w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left z-10 order-2 lg:order-1">
              <nav className="flex items-center justify-center lg:justify-start gap-2 text-sm text-slate-500 mb-4 sm:mb-6">
                <Link href="/" className="hover:text-[#dc2626] transition-colors">
                  Home
                </Link>
                <span>/</span>
                <span className="text-slate-900 font-semibold">Cow Donation</span>
              </nav>

              <div className="w-full min-h-0 sm:min-h-[200px] flex flex-col items-center lg:items-start">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white border border-red-200 shadow-sm mb-4 sm:mb-5">
                  <span className="text-base">🐄</span>
                  <span className="text-xs sm:text-sm font-semibold text-[#dc2626]">
                    {slide.badge}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold text-slate-900 leading-[1.12] mb-4 sm:mb-5 tracking-tight">
                  {slide.title}
                  <br />
                  <span className="text-[#dc2626]">{slide.highlight}</span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0">
                  {slide.desc}
                </p>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 mb-8">
                {["80G Tax Receipt", "Secure Payment", "Direct Cow Care"].map(
                  (badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1.5 bg-white border border-red-100 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#dc2626]" />
                      {badge}
                    </span>
                  ),
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 w-full sm:w-auto">
                <a href="#donate-widget" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto rounded-full h-14 px-8 text-base font-bold bg-[#dc2626] hover:bg-[#b91c1c] border-0 shadow-2xl shadow-red-500/40 text-white"
                  >
                    Support Cow Care <HandCoins className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <a
                  href="https://wa.me/919990145555"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="whatsapp"
                    size="lg"
                    className="w-full sm:w-auto rounded-full h-14 px-8 text-base font-bold"
                  >
                    WhatsApp Us
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative flex flex-col items-center order-1 lg:order-2">
              <div className="relative w-full aspect-[4/3] sm:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border-2 sm:border-4 border-slate-700/50 bg-slate-950">
                <AnimatePresence mode="sync">
                  <motion.img
                    key={currentSlide}
                    src={slide.src}
                    alt={slide.alt}
                    className="absolute inset-0 w-full h-full object-fit"
                    initial={{ opacity: 0.4, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                </AnimatePresence>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent p-5">
                  <p className="text-white font-bold text-sm">
                    {slide.caption}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Previous slide"
                  onClick={() =>
                    setCurrentSlide(
                      (p) => (p - 1 + heroSlides.length) % heroSlides.length,
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/60"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next slide"
                  onClick={() =>
                    setCurrentSlide((p) => (p + 1) % heroSlides.length)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/60"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex gap-2 mt-4">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={() => setCurrentSlide(idx)}
                    className={`transition-all duration-300 rounded-full ${
                      idx === currentSlide
                        ? "w-8 h-2.5 bg-slate-400"
                        : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE DONATION WIDGET ── */}
      <section id="donate-widget" className="relative z-10 py-8 sm:py-10">
        <div className="container-custom">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-green-900/10 border-2 border-green-100 overflow-hidden"
          >
            <div className="grid lg:grid-cols-5">
              {/* Left: original photo + Selected Seva below (no green overlay) */}
              <div className="lg:col-span-2 flex flex-col bg-slate-50 border-b lg:border-b-0 lg:border-r border-green-100">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200">
                  <img
                    src={selectedSeva.img}
                    alt={selectedSeva.imgAlt}
                    className="absolute inset-0 w-full h-full object-fit"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-slate-700 text-xs font-bold uppercase tracking-wider mb-1">
                    Selected Seva
                  </p>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-green-950 mb-1">
                    {selectedSeva.icon} {selectedSeva.title}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {selectedSeva.detail || selectedSeva.impact}
                  </p>
                </div>
              </div>

              {/* Right: controls */}
              <div className="lg:col-span-3 p-4 sm:p-8 lg:p-10">
                <div className="flex items-start justify-between gap-4 mb-5 sm:mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      Choose Your Gau Seva
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1">
                      Pick a package below, or enter any amount. Most donors
                      choose ₹251 or ₹501.
                    </p>
                  </div>
                </div>

                {/* Frequency */}
                <div className="flex gap-2 p-1 bg-slate-100 rounded-full mb-6 max-w-xs">
                  {(["one-time", "monthly"] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFrequency(f)}
                      className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all ${
                        frequency === f
                          ? "bg-[#dc2626] text-white shadow-md shadow-red-500/20"
                          : "text-slate-700 hover:text-[#dc2626]"
                      }`}
                    >
                      {f === "one-time" ? "One-Time" : "Monthly"}
                    </button>
                  ))}
                </div>

                {/* Quick amount chips */}
                <div className="grid grid-cols-4 gap-1.5 sm:gap-3 mb-5 pt-3">
                  {quickAmounts.map((amount) => {
                    const pkg = sevaPackages.find((s) => s.amount === amount);
                    const active =
                      !customAmount && selectedSeva.amount === amount;
                    return (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => selectAmount(amount)}
                        className={`relative py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-base transition-all border-2 ${
                          active
                            ? "bg-[#dc2626] text-white border-[#dc2626] shadow-lg shadow-red-500/25 scale-[1.02]"
                            : "bg-white text-slate-800 border-slate-200 hover:border-red-400"
                        }`}
                        style={!active ? { color: "black" } : {}}
                      >
                        ₹{amount.toLocaleString("en-IN")}
                        {pkg?.popular && (
                          <span className="absolute -top-2.5 inset-x-0 mx-auto w-fit text-[8px] sm:text-[9px] font-bold bg-orange-500 text-white px-1 sm:px-1.5 py-0.5 rounded-full whitespace-nowrap">
                            Popular
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Custom + stepper */}
                <div className="flex gap-3 mb-5">
                  <div className="flex items-center gap-1 bg-slate-50 border-2 border-slate-200 rounded-2xl px-2">
                    <button
                      type="button"
                      aria-label="Decrease amount"
                      className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-[#dc2626]"
                      onClick={() => {
                        const next = Math.max(51, finalAmount - 50);
                        selectAmount(next);
                      }}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Increase amount"
                      className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-[#dc2626]"
                      onClick={() => selectAmount(finalAmount + 50)}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">
                      ₹
                    </span>
                    <input
                      type="number"
                      min={1}
                      placeholder="Other amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        const n = parseInt(e.target.value, 10);
                        if (n > 0) {
                          const match = sevaPackages.find(
                            (s) => s.amount === n,
                          );
                          if (match) setSelectedSeva(match);
                        }
                      }}
                      className="w-full pl-9 pr-4 py-3 rounded-2xl border-2 border-slate-200 bg-white text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:border-[#dc2626]"
                    />
                  </div>
                </div>

                {/* Impact preview */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6 flex gap-3 items-start">
                  <div className="text-2xl shrink-0">{selectedSeva.icon}</div>
                  <div>
                    <p className="text-slate-900 font-bold text-sm">
                      Your ₹
                      {finalAmount > 0
                        ? finalAmount.toLocaleString("en-IN")
                        : "—"}
                      {frequency === "monthly" ? " / month" : ""} will help:
                    </p>
                    <p className="text-slate-700 text-sm mt-0.5">
                      {activeImpact}
                    </p>
                  </div>
                </div>

                {paymentError && (
                  <div className="relative rounded-2xl overflow-hidden mb-4 shadow-lg">
                    {/* Warm saffron gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-red-50" />
                    <div className="absolute inset-0 border-2 border-orange-200 rounded-2xl" />

                    <div className="relative p-5 sm:p-6">
                      {/* Icon + Title row */}
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center shrink-0 shadow-md">
                          <span className="text-xl">💔</span>
                        </div>
                        <div>
                          <p className="text-orange-900 font-extrabold text-base leading-tight">
                            Your Donation Was Not Completed
                          </p>
                          <p className="text-orange-600 text-xs mt-0.5 font-medium">
                            Payment failed or cancelled
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={clearPaymentError}
                          className="ml-auto text-orange-400 hover:text-orange-600 text-lg leading-none shrink-0"
                          aria-label="Dismiss"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Hindi emotional message */}
                      <div className="bg-white/70 rounded-xl p-4 mb-4 border border-orange-100">
                        <p className="text-orange-800 text-sm font-medium leading-relaxed mb-2">
                          आप Donation पेज तक आए, ये आपके{" "}
                          <span className="font-extrabold text-orange-600">दयालु दिल</span> को दर्शाता है।
                        </p>
                        <p className="text-slate-700 text-sm leading-relaxed mb-3">
                          शायद दान पूरा नहीं हो पाया, लेकिन देर नहीं हुई है। तो आइए,{" "}
                          <span className="font-bold text-green-700">इस बार बिना रुके</span> मदद का हाथ बढ़ाइए।
                        </p>
                        <p className="text-orange-900 font-extrabold text-sm border-t border-orange-100 pt-3">
                          🙏 इस बार रुकिए मत —{" "}
                          <span className="text-green-700">आपका छोटा सा योगदान भी महत्वपूर्ण है।</span>
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-col sm:flex-row gap-2.5">
                        <Button
                          type="button"
                          onClick={() => { clearPaymentError(); goDonate() }}
                          disabled={finalAmount <= 0}
                          className="flex-1 rounded-full h-12 font-bold bg-gradient-to-r from-green-600 to-slate-600 hover:from-green-700 hover:to-slate-700 border-0 text-white shadow-md shadow-green-600/25"
                        >
                          🐄 दान करें — ₹{finalAmount > 0 ? finalAmount.toLocaleString("en-IN") : "—"}
                        </Button>
                        <Link href="/account-details" className="flex-1">
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full rounded-full h-12 font-bold border-2 border-orange-300 text-orange-700 hover:bg-orange-50"
                          >
                            UPI / Bank Transfer
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}


                {paymentSuccess && (
                  <div className="bg-slate-50 border border-slate-300 rounded-2xl p-4 mb-4">
                    <p className="text-slate-900 font-bold text-sm mb-1">
                      Thank you
                    </p>
                    <p className="text-slate-800 text-sm leading-relaxed">
                      {paymentSuccess}
                    </p>
                  </div>
                )}

                <Button
                  type="button"
                  disabled={finalAmount <= 0 || isProcessing}
                  onClick={goDonate}
                  className="w-full rounded-full h-14 font-black text-base bg-[#dc2626] hover:bg-[#b91c1c] border-0 shadow-xl shadow-red-500/25 text-white"
                >
                  {isProcessing
                    ? "Processing..."
                    : `Donate ₹${finalAmount > 0 ? finalAmount.toLocaleString("en-IN") : "..."} for Cow Care`}
                  {!isProcessing && (
                    <Heart className="w-5 h-5 ml-2 fill-white" />
                  )}
                </Button>
                <p className="text-center text-slate-400 text-xs mt-3">
                  🔒 Secure checkout · 80G receipt by email · UPI, cards & net
                  banking
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── IMPACT ── */}
      <section className="bg-[#f0f7f0] py-14 border-y border-green-100 mt-8">
        <div className="container-custom">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-green-800 mb-8">
            Our cow care milestones
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { to: 1200, label: "Cows Sheltered", suffix: "+" },
              { to: 85000, label: "Fodder Servings", suffix: "+" },
              { to: 4200, label: "Treatments Given", suffix: "+" },
              { to: 340, label: "Care Volunteers", suffix: "+" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                custom={i * 0.08}
                viewport={{ once: true }}
                className="bg-white border-2 border-green-200 rounded-2xl p-5 text-center"
              >
                <AnimatedCounter to={s.to} label={s.label} suffix={s.suffix} />
              </motion.div>
            ))}
          </div>
          <p className="text-center text-green-700 text-xs mt-6">
            Figures are programme milestones, updated periodically.
          </p>
        </div>
      </section>

      {/* ── SEVA CARDS GRID ── */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <SectionHeader
            badge="Gaushala Seva Packages"
            title="See Exactly What Your Gift Does"
            subtitle="Each package is tied to a real photo from our work — feeding, treatment, calf care or emergency rescue."
            className="mb-12 text-center"
            align="center"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {sevaPackages.map((item, i) => {
              const active = !customAmount && selectedSeva.id === item.id;
              return (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  custom={i * 0.06}
                  viewport={{ once: true }}
                  className={`group rounded-2xl overflow-hidden border-2 transition-all duration-300 bg-white ${
                    active
                      ? "border-green-600 shadow-xl shadow-green-600/15 ring-2 ring-green-600/20"
                      : "border-green-100 hover:border-green-400 hover:-translate-y-1 hover:shadow-lg"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSeva(item);
                      setCustomAmount("");
                      document.getElementById("donate-widget")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                    className="w-full text-center"
                    aria-label={`Select ${item.title}`}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-green-50">
                      <img
                        src={item.img}
                        alt={item.imgAlt}
                        className={`absolute inset-0 h-full w-full object-fit ${item.imgFocus || "object-center"} group-hover:scale-[1.03] transition-transform duration-500`}
                      />
                      {item.popular && (
                        <span className="absolute top-3 left-3 z-10 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                          Most Chosen
                        </span>
                      )}
                      <span className="absolute top-3 right-3 z-10 bg-white/95 text-green-900 text-sm font-black px-2.5 py-1 rounded-full shadow">
                        ₹{item.amount.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="p-4 pb-2">
                      <h3 className="font-extrabold text-slate-900 text-sm mb-1">
                        {item.icon} {item.title}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        {item.impact}
                      </p>
                    </div>
                  </button>
                  <div className="px-4 pb-4">
                    <Button
                      type="button"
                      onClick={() => donateSevaDirect(item)}
                      disabled={isProcessing}
                      className="w-full rounded-xl h-11 font-bold bg-[#dc2626] hover:bg-[#b91c1c] text-white border-0 shadow-md shadow-red-500/20"
                    >
                      {isProcessing && selectedSeva.id === item.id
                        ? "Processing..."
                        : `Donate ₹${item.amount.toLocaleString("en-IN")}`}
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY IT MATTERS ── */}
      <section className="section-spacing bg-[#f0f7f0]">
        <div className="container-custom">
          <SectionHeader
            badge="Why Cow Care Matters"
            title="What We See on the Ground"
            subtitle="These are not abstract causes. They are the scenes our volunteers walk into every week."
            className="mb-12 text-center"
            align="center"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyCards.map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                custom={i * 0.08}
                viewport={{ once: true }}
                className="bg-white border-2 border-green-100 rounded-2xl p-7 hover:border-green-300 transition-colors"
              >
                <div
                  className={`w-11 h-11 rounded-xl ${card.color} flex items-center justify-center mb-4`}
                >
                  <card.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <SectionHeader
            badge="From Our Camera Roll"
            title="Real Moments from Cow Care"
            subtitle="Every photo below was taken during rescue, treatment or daily feeding — not from a stock library."
            className="mb-12 text-center"
            align="center"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {galleryImages.map((img, i) => (
              <motion.button
                key={img.src}
                type="button"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                custom={i * 0.05}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-2xl cursor-pointer shadow-md border border-green-100 text-left"
                onClick={() => setLightbox(img)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-50 sm:h-52 object-fit group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <p className="text-white text-xs sm:text-sm font-bold leading-snug">
                    {img.caption}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.caption}
        >
          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-full max-h-[70vh] object-contain rounded-2xl"
            />
            <div className="mt-4 text-center text-white px-2">
              <p className="font-bold text-lg">{lightbox.caption}</p>
              <p className="text-white/75 text-sm mt-1 max-w-2xl mx-auto">
                {lightbox.story}
              </p>
              <button
                type="button"
                className="mt-4 text-sm font-semibold text-slate-300 hover:text-white"
                onClick={() => setLightbox(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── CARE JOURNEY ── */}
      <section className="section-spacing bg-[#f0f7f0]">
        <div className="container-custom">
          <SectionHeader
            badge="Our Care Journey"
            title="From the Roadside to Lifelong Shelter"
            subtitle="Every cow follows a clear path — rescue, treatment, feeding, and long-term protection."
            className="mb-12 text-center"
            align="center"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {careTimeline.map((step, i) => (
              <motion.div
                key={step.step}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                custom={i * 0.08}
                viewport={{ once: true }}
                className="bg-white border-2 border-green-100 rounded-2xl overflow-hidden hover:border-green-300 transition-colors"
              >
                <div className="relative h-42">
                  <img src={step.img} alt="" className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-green-700 text-white font-black text-sm flex items-center justify-center shadow-lg">
                    {step.step}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-extrabold text-green-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <SectionHeader
                badge="Why Donate Through SSF"
                title="Transparent Cow Care You Can Verify"
                subtitle="Ask us hard questions. Visit when you can. We would rather show you the shed than sell you a slogan."
              />
              <ul className="mt-8 space-y-3.5">
                {[
                  {
                    icon: Shield,
                    text: "Registered NGO with 80G tax benefits",
                  },
                  {
                    icon: CheckCircle2,
                    text: "Donations directed to cow fodder, medicine & rescue",
                  },
                  {
                    icon: Star,
                    text: "Photo updates from feeding and treatment days",
                  },
                  { icon: Users, text: "Volunteers welcome on care days" },
                  { icon: Droplets, text: "Site visits arranged on request" },
                  {
                    icon: Heart,
                    text: "Long-term shelter for cows that cannot return to roads",
                  },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-green-700" />
                    </div>
                    <span className="text-slate-700 font-medium text-sm">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              custom={0.15}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden shadow-2xl h-[420px]"
            >
              <img
                src="/images/live/7.jpg.jpeg"
                alt="Volunteer gently feeding a brown cow outdoors while a calf rests nearby"
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5">
                  <p className="text-green-900 font-extrabold text-lg">
                    Fed by hand. Watched with care.
                  </p>
                  <p className="text-slate-600 text-sm mt-1">
                    A volunteer offers food while a calf rests nearby — the
                    everyday rhythm of our gaushala work.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HOW TO DONATE ── */}
      <section className="section-spacing bg-[#f0f7f0]">
        <div className="container-custom">
          <SectionHeader
            badge="How to Donate"
            title="Four Simple Steps"
            subtitle="No confusion. Choose an amount, pay securely, and receive your receipt."
            className="mb-12 text-center"
            align="center"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                custom={i * 0.08}
                viewport={{ once: true }}
                className="bg-white border-2 border-green-100 rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-green-700 text-white font-black flex items-center justify-center mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-extrabold text-green-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQS ── */}
      <section className="section-spacing bg-white">
        <div className="container-custom max-w-3xl">
          <SectionHeader
            badge="FAQs"
            title="Questions Donors Ask Us"
            subtitle="Straight answers about cow donation, receipts and visiting the shelter."
            className="mb-10 text-center"
            align="center"
          />
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={faq.q}
                className="bg-[#f0f7f0] border-2 border-green-100 rounded-2xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-green-900 text-sm"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-green-700 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-slate-600 leading-relaxed text-sm border-t border-green-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="section-spacing bg-white pt-0">
        <div className="container-custom">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 p-10 sm:p-14 text-white text-center shadow-2xl shadow-slate-900/30">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-400/15 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="text-5xl mb-4">🐄</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white leading-tight">
                A Cow Is Waiting for Today&apos;s Meal
              </h2>
              <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                Start with ₹51 for a first roti, or choose ₹251 for a full day of
                care. Whatever you give reaches the animals you see in these
                photographs.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="#donate-widget">
                  <Button className="bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-full px-8 h-12 border-0 shadow-lg shadow-orange-500/20">
                    Choose a Seva Amount <HandCoins className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <a href="tel:+919990145555">
                  <Button className="bg-white/10 text-white hover:bg-white/20 font-bold rounded-full px-8 h-12 border border-white/30">
                    <Phone className="w-4 h-4 mr-2" /> Call Us
                  </Button>
                </a>
                <Link href="/contact">
                  <Button className="bg-white/10 text-white hover:bg-white/20 font-bold rounded-full px-8 h-12 border border-white/30">
                    Volunteer With Us <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT STRIP ── */}
      <section className="pb-20 bg-white">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Call Us",
                sub: "+91 9990145555",
                href: "tel:+919990145555",
              },
              {
                title: "WhatsApp",
                sub: "Chat with the care team",
                href: "https://wa.me/919990145555",
              },
              {
                title: "Email",
                sub: "info@shrishyamfoundation.org",
                href: "mailto:info@shrishyamfoundation.org",
              },
              { title: "Visit", sub: "Gaushala · Delhi NCR", href: "/contact" },
            ].map((item) => (
              <a
                key={item.title}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="border-2 border-green-100 rounded-2xl p-5 hover:border-green-400 hover:bg-green-50/50 transition-all"
              >
                <p className="font-extrabold text-green-900 text-sm">
                  {item.title}
                </p>
                <p className="text-slate-500 text-xs mt-1">{item.sub}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-[5.25rem] lg:bottom-6 left-0 right-0 z-[90] px-3 sm:px-4 pointer-events-none"
          >
            <div className="max-w-lg mx-auto pointer-events-auto bg-green-900 text-white rounded-2xl shadow-2xl p-3 flex items-center gap-3 border border-green-700">
              <div className="flex-1 min-w-0 pl-2">
                <p className="text-xs text-green-200 font-semibold truncate">
                  {selectedSeva.title}
                </p>
                <p className="font-black text-lg leading-tight">
                  ₹{finalAmount > 0 ? finalAmount.toLocaleString("en-IN") : "—"}
                  {frequency === "monthly" ? "/mo" : ""}
                </p>
              </div>
              <Button
                onClick={goDonate}
                disabled={finalAmount <= 0 || isProcessing}
                className="rounded-xl h-11 px-5 font-bold bg-slate-500 hover:bg-slate-400 text-white border-0 shrink-0"
              >
                {isProcessing ? "Processing..." : "Donate Now"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <DonorDetailsModal
        open={donorFormOpen}
        amount={finalAmount}
        causeLabel={donationNote}
        isSubmitting={isProcessing}
        onClose={() => {
          if (!isProcessing) setDonorFormOpen(false);
        }}
        onSubmit={handleDonorSubmit}
      />
    </div>
  );
}
