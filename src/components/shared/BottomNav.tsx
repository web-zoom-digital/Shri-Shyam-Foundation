"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Phone, Info } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

const bottomLinks = [
  { name: "Home", href: "/", icon: "home" as const },
  { name: "Programs", href: "/programs", icon: "programs" as const },
  { name: "Cow Donate", href: "/cow-donation", icon: "cow" as const, highlight: true },
  { name: "WhatsApp", href: "https://wa.me/919990145555", icon: "whatsapp" as const, color: "text-[#25D366]" },
  { name: "Call", href: "tel:+919990145555", icon: "call" as const },
]

function NavIcon({ type, className }: { type: (typeof bottomLinks)[number]["icon"]; className?: string }) {
  if (type === "home") return <Home className={className} />
  if (type === "programs") return <Info className={className} />
  if (type === "whatsapp") return <FaWhatsapp className={className} />
  if (type === "call") return <Phone className={className} />
  // cow — clear emoji so mobile always shows cow donation, not a generic donate icon
  return (
    <span className="leading-none select-none text-[20px]" aria-hidden>
      🐄
    </span>
  )
}

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Mobile quick navigation"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 pb-[env(safe-area-inset-bottom)] lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
    >
      <div className="flex items-center justify-around h-[4.25rem] px-1 max-w-lg mx-auto">
        {bottomLinks.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname === link.href || pathname.startsWith(`${link.href}/`)
          const isHttp = link.href.startsWith("http")

          return (
            <Link
              key={link.name}
              href={link.href}
              target={isHttp ? "_blank" : undefined}
              rel={isHttp ? "noopener noreferrer" : undefined}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors min-w-0 px-0.5 ${
                link.color
                  ? link.color
                  : link.highlight || isActive
                    ? "text-slate-900"
                    : "text-slate-500"
              }`}
            >
              <span
                className={`flex items-center justify-center rounded-full transition-all ${
                  link.highlight
                    ? "w-11 h-11 -mt-4 bg-[#dc2626] text-white shadow-lg shadow-red-500/35 ring-4 ring-white"
                    : "w-6 h-6"
                }`}
              >
                <NavIcon
                  type={link.icon}
                  className={link.highlight ? "w-6 h-6 text-white" : "w-5 h-5"}
                />
              </span>
              <span className={`text-[10px] font-bold truncate max-w-full ${link.highlight ? "text-slate-800" : ""}`}>
                {link.name}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
