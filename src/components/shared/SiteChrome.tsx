"use client"

import { usePathname } from "next/navigation"
import { Header } from "@/components/shared/Header"
import { Footer } from "@/components/shared/Footer"
import { BottomNav } from "@/components/shared/BottomNav"
import { ScrollProgress } from "@/components/shared/ScrollProgress"
import { FloatingCTAs } from "@/components/shared/FloatingCTAs"

/**
 * SiteChrome
 * ──────────
 * Renders site-wide Header, Footer, BottomNav etc.
 * Automatically hidden on /admin routes so the admin panel
 * gets a clean full-screen layout with no site navigation.
 */
export function SiteHeader() {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin")

  if (isAdmin) return null

  return (
    <>
      <ScrollProgress />
      <Header />
    </>
  )
}

export function SiteFooter() {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin")

  if (isAdmin) return null

  return (
    <>
      <Footer />
      <BottomNav />
      <FloatingCTAs />
    </>
  )
}

/**
 * MainWrapper
 * ───────────
 * Applies the correct padding/classes to <main> based on route.
 * Admin: full-screen, no bottom padding
 * Site: standard site padding with bottom nav space
 */
export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin")

  return (
    <main
      className={
        isAdmin
          ? "min-h-screen w-full max-w-full"
          : "min-h-screen pb-[5.5rem] lg:pb-0 overflow-x-clip w-full max-w-full"
      }
    >
      {children}
    </main>
  )
}
