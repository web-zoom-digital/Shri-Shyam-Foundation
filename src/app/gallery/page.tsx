import { Metadata } from "next"
import { GalleryPageClient } from "./GalleryPageClient"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.shrishyamfoundation.org"

export const metadata: Metadata = {
  title: "Impact Gallery | Shri Shyam Foundation",
  description:
    "Explore the real impact of Shri Shyam Foundation through our gallery. View moments of compassion, community service, food distribution, and cow welfare.",
  openGraph: {
    title: "Impact Gallery | Shri Shyam Foundation",
    description:
      "Explore the real impact of Shri Shyam Foundation through our gallery. View moments of compassion, community service, food distribution, and cow welfare.",
    url: `${SITE_URL}/gallery`,
    siteName: "Shri Shyam Foundation",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Shri Shyam Foundation Impact Gallery",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Impact Gallery | Shri Shyam Foundation",
    description:
      "Explore the real impact of Shri Shyam Foundation through our gallery. View moments of compassion, community service, food distribution, and cow welfare.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  alternates: {
    canonical: `${SITE_URL}/gallery`,
  },
}

export default function GalleryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Shri Shyam Foundation Impact Gallery",
        description:
          "A collection of photographs highlighting the humanitarian efforts, food distribution, and cow welfare activities of Shri Shyam Foundation.",
        url: `${SITE_URL}/gallery`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Gallery",
            item: `${SITE_URL}/gallery`,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GalleryPageClient />
    </>
  )
}
