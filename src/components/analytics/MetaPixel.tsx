"use client"

import * as React from "react"
import Script from "next/script"
import { usePathname } from "next/navigation"

export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "2096954090904593"

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue?: unknown[] }
    _fbq?: unknown
  }
}

export function trackMetaEvent(
  event: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return
  if (params) window.fbq("track", event, params)
  else window.fbq("track", event)
}

/** Meta Pixel base code — fires PageView on load and on client route changes. */
export function MetaPixel() {
  const pathname = usePathname()
  const [ready, setReady] = React.useState(false)
  const isFirstLoad = React.useRef(true)

  React.useEffect(() => {
    if (!ready || typeof window.fbq !== "function") return
    // Base snippet already fires PageView on first load.
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }
    window.fbq("track", "PageView")
  }, [pathname, ready])

  if (!META_PIXEL_ID) return null

  return (
    <>
      <Script
        id="meta-pixel-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
          `.trim(),
        }}
        onReady={() => setReady(true)}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}
