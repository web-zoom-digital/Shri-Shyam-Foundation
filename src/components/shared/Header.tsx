"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  HandCoins,
  Search,
  Phone,
  ChevronRight,
  Home,
  Users,
  Sparkles,
  Images,
  TrendingUp,
  Mail,
  Landmark,
} from "lucide-react"
import { GiCow } from "react-icons/gi"
import { Button } from "@/components/ui/Button"

const exploreLinks = [
  { name: "Home", href: "/", icon: Home, hint: "Welcome & latest seva" },
  { name: "About", href: "/about", icon: Users, hint: "Our story & mission" },
  { name: "Programs", href: "/programs", icon: Sparkles, hint: "Food, education & care" },
  { name: "Gallery", href: "/gallery", icon: Images, hint: "Moments from the field" },
  { name: "Impact", href: "/impact", icon: TrendingUp, hint: "Lives we touch" },
  { name: "Contact", href: "/contact", icon: Mail, hint: "Reach our team" },
]

const supportLinks = [
  { name: "Cow Donation", href: "/cow-donation", icon: GiCow, hint: "Gau seva & shelter" },
  { name: "Account Details", href: "/account-details", icon: Landmark, hint: "UPI & bank transfer" },
]

const desktopNavLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Programs", href: "/programs" },
  { name: "Cow Donation", href: "/cow-donation" },
  { name: "Account Details", href: "/account-details" },
  { name: "Gallery", href: "/gallery" },
  { name: "Impact", href: "/impact" },
  { name: "Contact", href: "/contact" },
]

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  React.useEffect(() => {
    if (!mobileMenuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileMenuOpen])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 w-full bg-white/95 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-slate-200/60"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transform: "translateZ(0)", willChange: "transform" }}
        onAnimationComplete={() => {
          const el = document.querySelector("header")
          if (el) {
            el.style.transform = "translateZ(0)"
            void el.offsetHeight // force reflow
          }
        }}
      >
        {/* Top Bar (Hidden on Mobile) */}
        <div
          className={`hidden md:flex w-full transition-all duration-500 ${
            isScrolled
              ? "h-0 opacity-0 py-0 overflow-hidden border-b-0"
              : "bg-[#dc2626] text-white h-auto py-2 opacity-100"
          }`}
        >
          <div className="w-full px-6 md:px-10 lg:px-12 xl:px-16 max-w-[1920px] mx-auto flex items-center justify-between text-[13px] font-medium tracking-wide">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" />
              <span>Confidential Helpline — Available to guide you</span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="tel:+919990145555"
                className="flex items-center gap-1.5 hover:text-slate-200 transition-colors font-bold"
              >
                <Phone className="w-3.5 h-3.5 fill-current" />
                <span>Call Now</span>
              </a>
              <a
                href="https://wa.me/919990145555"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:opacity-80 transition-opacity font-bold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-[#25D366]"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                <span className="text-[#25D366]">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div
          className={`w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 max-w-[1920px] mx-auto flex items-center justify-between transition-all duration-500 ${
            isScrolled ? "py-2 sm:py-2.5" : "py-2.5 sm:py-3"
          }`}
        >
          <Link href="/" className="flex items-center z-50 group shrink-0">
            <div className="h-10 sm:h-12 md:h-14 lg:h-[3.75rem] w-auto max-w-[200px] lg:max-w-[220px] relative flex items-center justify-start group-hover:scale-105 transition-transform duration-300">
              <img
                src="/images/live/shri-shyam-final-logo-1-1.gif"
                alt="Shri Shyam Foundation Logo"
                className="h-full w-auto max-w-full object-contain shrink-0"
              />
            </div>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden lg:flex flex-1 items-center justify-center gap-3 xl:gap-5 2xl:gap-7 mx-3 xl:mx-5"
            style={{ transform: "translateZ(0)" }}
          >
            {desktopNavLinks.map((link) => {
              const active = isActivePath(pathname, link.href)
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative shrink-0 text-[14px] xl:text-[15px] 2xl:text-base font-bold transition-colors py-2 group whitespace-nowrap ${
                    active ? "text-[#dc2626]" : "text-slate-900 hover:text-[#dc2626]"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute left-0 bottom-0 h-0.5 bg-[#dc2626] transition-all duration-300 rounded-full ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              )
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4 xl:gap-5 shrink-0">
            {/* <button
              type="button"
              aria-label="Search"
              className="w-11 h-11 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-600 hover:bg-white hover:shadow-md hover:border-slate-100 transition-all duration-300"
            >
              <Search className="w-4 h-4" />
            </button> */}
            <Link href="/donate">
              <Button
                variant="primary"
                className="rounded-full shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-0.5 transition-all duration-300 px-6 xl:px-8 py-5 xl:py-6 h-11 text-sm font-bold"
              >
                Donate Now
              </Button>
            </Link>
          </div>

          {/* Premium mobile toggle */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden relative z-[110] h-11 w-11 rounded-2xl bg-slate-50/90 border border-slate-200/70 text-slate-800 shadow-[0_8px_20px_-12px_rgba(58,100,170,0.55)] flex items-center justify-center active:scale-95 transition-all duration-300 hover:bg-slate-100 hover:border-slate-300"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span className="sr-only">{mobileMenuOpen ? "Close" : "Menu"}</span>
            <span className="relative block h-3.5 w-[18px]">
              <motion.span
                className="absolute left-0 top-0 h-[2px] w-full rounded-full bg-current origin-center"
                animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                className="absolute left-0 top-[6px] h-[2px] w-full rounded-full bg-current"
                animate={mobileMenuOpen ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute left-0 top-[12px] h-[2px] w-full rounded-full bg-current origin-center"
                animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] lg:hidden"
          >
            <button
              type="button"
              aria-label="Close menu backdrop"
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 18, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-0 bottom-0 flex flex-col overflow-hidden bg-[linear-gradient(180deg,#F7FAFF_0%,#FFFFFF_38%,#F3F8F5_100%)] pt-[calc(4.5rem+env(safe-area-inset-top))]"
            >
              {/* Soft brand atmosphere */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 right-[-20%] h-56 w-56 rounded-full bg-slate-400/15 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-24 left-[-15%] h-48 w-48 rounded-full bg-slate-400/15 blur-3xl"
              />

              <div className="relative flex-1 overflow-y-auto px-5 sm:px-6 pb-4">
                <div className="mb-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600/80">
                    Shri Shyam Foundation
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Seva that feeds, educates and protects.
                  </p>
                </div>

                <section className="mb-6">
                  <p className="mb-2 px-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    Explore
                  </p>
                  <nav className="space-y-1.5">
                    {exploreLinks.map((link, i) => {
                      const Icon = link.icon
                      const active = isActivePath(pathname, link.href)
                      return (
                        <motion.div
                          key={link.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.04 * i, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <Link
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`group flex items-center gap-3 rounded-2xl px-3 py-3 transition-all duration-300 ${
                              active
                                ? "bg-white shadow-[0_10px_28px_-16px_rgba(48,80,138,0.45)] ring-1 ring-slate-100"
                                : "hover:bg-white/80"
                            }`}
                          >
                            <span
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                                active
                                  ? "bg-[#dc2626] text-white shadow-md shadow-red-500/25"
                                  : "bg-slate-50 text-slate-700 group-hover:bg-slate-100"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span
                                className={`block text-[15px] font-bold leading-tight ${
                                  active ? "text-slate-800" : "text-slate-800"
                                }`}
                              >
                                {link.name}
                              </span>
                              <span className="block truncate text-xs text-slate-500">{link.hint}</span>
                            </span>
                            <ChevronRight
                              className={`h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 ${
                                active ? "text-slate-500" : "text-slate-300"
                              }`}
                            />
                          </Link>
                        </motion.div>
                      )
                    })}
                  </nav>
                </section>

                <section className="mb-4">
                  <p className="mb-2 px-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    Give & Support
                  </p>
                  <nav className="space-y-1.5">
                    {supportLinks.map((link, i) => {
                      const Icon = link.icon
                      const active = isActivePath(pathname, link.href)
                      const isCow = link.href === "/cow-donation"
                      return (
                        <motion.div
                          key={link.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.04 * (exploreLinks.length + i),
                            duration: 0.3,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <Link
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`group flex items-center gap-3 rounded-2xl px-3 py-3 transition-all duration-300 ${
                              active
                                ? isCow
                                  ? "bg-white shadow-[0_10px_28px_-16px_rgba(43,114,86,0.45)] ring-1 ring-slate-100"
                                  : "bg-white shadow-[0_10px_28px_-16px_rgba(48,80,138,0.45)] ring-1 ring-slate-100"
                                : "hover:bg-white/80"
                            }`}
                          >
                            <span
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                                active
                                  ? isCow
                                    ? "bg-[#dc2626] text-white shadow-md shadow-red-500/25"
                                    : "bg-[#dc2626] text-white shadow-md shadow-red-500/25"
                                  : isCow
                                    ? "bg-slate-50 text-slate-700 group-hover:bg-slate-100"
                                    : "bg-slate-50 text-slate-700 group-hover:bg-slate-100"
                              }`}
                            >
                              <Icon className={`h-4 w-4 ${isCow ? "h-[18px] w-[18px]" : ""}`} />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span
                                className={`block text-[15px] font-bold leading-tight ${
                                  active
                                    ? isCow
                                      ? "text-slate-800"
                                      : "text-slate-800"
                                    : "text-slate-800"
                                }`}
                              >
                                {link.name}
                              </span>
                              <span className="block truncate text-xs text-slate-500">{link.hint}</span>
                            </span>
                            <ChevronRight
                              className={`h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 ${
                                active
                                  ? isCow
                                    ? "text-slate-500"
                                    : "text-slate-500"
                                  : "text-slate-300"
                              }`}
                            />
                          </Link>
                        </motion.div>
                      )
                    })}
                  </nav>
                </section>
              </div>

              {/* Sticky bottom actions */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative shrink-0 border-t border-slate-100/70 bg-white/85 px-5 sm:px-6 pt-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))] backdrop-blur-xl"
              >
                <div className="grid grid-cols-2 gap-2.5">
                  <Link href="/cow-donation" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      size="lg"
                      className="w-full rounded-2xl border-0 bg-[#b91c1c] text-white h-12 text-sm font-bold shadow-lg shadow-red-500/25 hover:bg-[#991b1b]"
                    >
                      <GiCow className="mr-1.5 h-[18px] w-[18px]" />
                      Cow Seva
                    </Button>
                  </Link>
                  <Link href="/donate" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full rounded-2xl border-0 bg-gradient-to-r from-[#dc2626] to-[#ef4444] text-white h-12 text-sm font-bold shadow-lg shadow-red-500/25"
                    >
                      Donate
                      <HandCoins className="ml-1.5 h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="mt-3.5 flex items-center justify-between gap-3">
                  <a
                    href="tel:+919990145555"
                    className="flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-[#dc2626] transition-colors hover:border-slate-300 hover:bg-white hover:text-[#b91c1c]"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    Call Helpline
                  </a>
                  <a
                    href="https://wa.me/919990145555"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 transition-colors hover:bg-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5 fill-current"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
