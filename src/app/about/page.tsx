import type { Metadata } from "next"
import { AboutPageClient } from "./AboutPageClient"
import { orgEntity, orgPlainSummary, SITE_URL } from "@/data/orgEntity"

export const metadata: Metadata = {
  title: "About Us — Our Story, Mission & Vision",
  description:
    "Shri Shyam Foundation is a registered NGO in Delhi, UP, founded in 2015. Learn our mission for free food, education support, cow welfare and medical outreach across Delhi NCR and Delhi.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About Shri Shyam Foundation",
    description:
      "Founded in 2015 in Delhi, UP — food seva, education kits, Gau Seva and medical outreach across Delhi NCR and Delhi.",
    url: `${SITE_URL}/about`,
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Shri Shyam Foundation",
    description:
      "Founded in 2015 in Delhi, UP — food seva, education kits, Gau Seva and medical outreach across Delhi NCR and Delhi.",
  },
}

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}/about#webpage`,
        name: "About Shri Shyam Foundation",
        url: `${SITE_URL}/about`,
        description: orgPlainSummary.what,
        about: { "@id": orgEntity["@id"] },
        mainEntity: { "@id": orgEntity["@id"] },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "About Us", item: `${SITE_URL}/about` },
          ],
        },
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
      <AboutPageClient />
    </>
  )
}
