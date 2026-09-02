"use client"

import { usePageTracking } from "@/hooks/usePageTracking"

/**
 * PageTracker
 * ───────────
 * Drop this anywhere inside a Client Component boundary (e.g., root layout body).
 * It silently tracks every route change and sends it to /api/track-visit.
 */
export function PageTracker() {
  usePageTracking()
  return null
}
