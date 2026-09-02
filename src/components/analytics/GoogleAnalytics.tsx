"use client"

import * as React from "react"
import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-B0C72PZ8C1"

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function GoogleAnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  React.useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window.gtag !== "function") return
    const query = searchParams?.toString()
    const pagePath = query ? `${pathname}?${query}` : pathname
    window.gtag("config", GA_MEASUREMENT_ID, { page_path: pagePath })
  }, [pathname, searchParams])

  return null
}

/** Google Analytics 4 (gtag.js) */
export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
        `.trim()}
      </Script>
      <React.Suspense fallback={null}>
        <GoogleAnalyticsTracker />
      </React.Suspense>
    </>
  )
}
