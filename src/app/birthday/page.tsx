import type { Metadata } from "next"
import { BirthdayPageClient } from "./BirthdayPageClient"
import { SITE_URL } from "@/data/orgEntity"

export const metadata: Metadata = {
  title: "Celebrate Your Birthday with Seva | Shri Shyam Foundation",
  description:
    "Make your birthday truly meaningful. Donate to Shri Shyam Foundation on your birthday and feed hungry families, educate children, and care for rescued cows. Get a special Birthday Seva Certificate.",
  keywords: [
    "Birthday Donation India",
    "Celebrate Birthday with NGO",
    "Birthday Charity India",
    "Donate on Birthday Delhi",
    "Birthday Seva",
    "NGO Birthday Celebration",
    "Shri Shyam Foundation Birthday",
    "Birthday with Purpose",
    "Feed Poor on Birthday",
  ],
  alternates: {
    canonical: `${SITE_URL}/birthday`,
  },
  openGraph: {
    url: `${SITE_URL}/birthday`,
    title: "Celebrate Your Birthday with Seva — Shri Shyam Foundation",
    description:
      "Instead of receiving gifts, give the gift of a meal. Celebrate your birthday by feeding hungry families across Delhi NCR with Shri Shyam Foundation.",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Celebrate Your Birthday with Seva — Shri Shyam Foundation",
    description:
      "Turn your birthday into a day of giving. Feed families, educate children, and care for cows. Get your Birthday Seva Certificate.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
}

export default function BirthdayPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/birthday#webpage`,
    url: `${SITE_URL}/birthday`,
    name: "Celebrate Your Birthday with Seva | Shri Shyam Foundation",
    description:
      "Celebrate your birthday by donating to Shri Shyam Foundation. Feed hungry families, support education and cow welfare in Delhi NCR.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Birthday Seva",
          item: `${SITE_URL}/birthday`,
        },
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BirthdayPageClient />
    </>
  )
}
