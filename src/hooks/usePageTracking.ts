"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * usePageTracking
 * ───────────────
 * Tracks page visits by firing a lightweight POST to /api/track-visit.
 * Must be used in a Client Component inside the app layout.
 */
export function usePageTracking() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return
    // Fire and forget — never block the UI
    fetch("/api/track-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: pathname }),
    }).catch(() => {
      // Silent fail — tracking should never break the site
    })
  }, [pathname])
}
