"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Info, Cake, Heart } from "lucide-react"
import { GiCow } from "react-icons/gi"

interface BottomLink {
  name: string
  href: string
  icon: "home" | "programs" | "cow" | "birthday" | "donate"
  highlight?: boolean
}

const bottomLinks: BottomLink[] = [
  { name: "Home", href: "/", icon: "home" },
  { name: "Donate", href: "/donate", icon: "donate" },
  { name: "Cow Donate", href: "/cow-donation", icon: "cow", highlight: true },
  { name: "Programs", href: "/programs", icon: "programs" },
  { name: "Birthday", href: "/birthday", icon: "birthday" },
]

function NavIcon({ type, className }: { type: BottomLink["icon"]; className?: string }) {
  if (type === "home") return <Home className={className} />
  if (type === "programs") return <Info className={className} />
  if (type === "birthday") return <Cake className={className} />
  if (type === "donate") return <Heart className={className} />
  if (type === "cow") return <GiCow className={className} />
  return null
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
                link.highlight || isActive
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
