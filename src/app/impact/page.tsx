import type { Metadata } from "next"
import { ImpactPageClient } from "./ImpactPageClient"
import { orgEntity, SITE_URL } from "@/data/orgEntity"

export const metadata: Metadata = {
  title: "Our Impact — Meals, Education, Medical Outreach & Cow Care",
  description:
    "Programme impact of Shri Shyam Foundation since 2015: food distribution, education support, medical outreach and cow welfare across Delhi NCR and Delhi, with methodology notes.",
  alternates: { canonical: `${SITE_URL}/impact` },
  openGraph: {
    title: "SSF Impact — Programme Estimates Since 2015",
    description:
      "Cumulative programme estimates for meals, families supported, education and medical outreach — with methodology notes.",
    url: `${SITE_URL}/impact`,
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
}

export default function ImpactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/impact#webpage`,
        name: "Shri Shyam Foundation Impact",
        url: `${SITE_URL}/impact`,
        description:
          "Cumulative programme estimates and field stories from Shri Shyam Foundation since 2015.",
        about: { "@id": orgEntity["@id"] },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Impact", item: `${SITE_URL}/impact` },
          ],
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What impact has Shri Shyam Foundation created?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Since 2015, SSF has run food distribution, education support, medical outreach and cow welfare programmes across Delhi NCR and Delhi. Published figures on this site are cumulative programme estimates from internal logs, not a substitute for a formal audited annual report.",
            },
          },
          {
            "@type": "Question",
            name: "How should impact numbers on this website be read?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Treat totals as directional scale indicators across meals, families reached, education kits, medical beneficiaries and outreach locations. Contact the foundation for a year-wise or programme-wise breakdown.",
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
      <ImpactPageClient />
    </>
  )
}
