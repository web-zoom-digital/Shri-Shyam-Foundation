import type { Metadata } from "next"
import { Suspense } from "react"
import { DonatePageClient } from "./DonatePageClient"
import { orgEntity, SITE_URL } from "@/data/orgEntity"

export const metadata: Metadata = {
  title: "Donate — Support Shri Shyam Foundation",
  description:
    "Donate to Shri Shyam Foundation for food seva, education support, medical outreach and cow welfare. Online checkout plus UPI/bank options. 80G acknowledgement as applicable.",
  alternates: { canonical: `${SITE_URL}/donate` },
  openGraph: {
    title: "Donate to Shri Shyam Foundation",
    description:
      "Support food, education, medical outreach and Gau Seva. Online payment or UPI/bank transfer. 80G acknowledgement as applicable.",
    url: `${SITE_URL}/donate`,
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
}

export default function DonatePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DonateAction",
        name: "Donate to Shri Shyam Foundation",
        target: `${SITE_URL}/donate`,
        recipient: { "@id": orgEntity["@id"] },
        description:
          "Make a one-time or monthly donation to support SSF food distribution, education kits, medical outreach and cow welfare.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How do I donate to Shri Shyam Foundation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Use the online donate page for Cashfree checkout, or pay via UPI/bank transfer using details on the Account Details page. After payment, share your transaction ID for acknowledgement and 80G receipt as applicable.",
            },
          },
          {
            "@type": "Question",
            name: "Are donations tax deductible?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Eligible donations may qualify for deduction under Section 80G of the Income Tax Act, as applicable. SSF issues acknowledgements / 80G receipts after verification.",
            },
          },
        ],
      },
      orgEntity,
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
        <DonatePageClient />
      </Suspense>
    </>
  )
}
