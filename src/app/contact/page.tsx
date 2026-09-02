import type { Metadata } from "next"
import { ContactPageClient } from "./ContactPageClient"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.shrishyamfoundation.org"

export const metadata: Metadata = {
  title: "Contact Us — Reach Shri Shyam Foundation",
  description: "Get in touch with Shri Shyam Foundation. Find our address, phone number, WhatsApp, email, and working hours. Send us a message or fill out a volunteer interest form.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact Shri Shyam Foundation",
    description: "We'd love to hear from you. Reach us by phone, WhatsApp, email or visit us in person.",
    url: `${SITE_URL}/contact`,
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact SSF",
            "url": `${SITE_URL}/contact`,
            "mainEntity": {
              "@type": "NGO",
              "name": "Shri Shyam Foundation",
              "telephone": "+91 9990145555",
              "email": "shrishyamfoundation1@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "House Number - J88 Gali No. 9/4 Pusta",
                "addressLocality": "Delhi",
                "addressRegion": "Delhi",
                "postalCode": "110053",
                "addressCountry": "IN"
              }
            }
          })
        }}
      />
      <ContactPageClient />
    </>
  )
}
