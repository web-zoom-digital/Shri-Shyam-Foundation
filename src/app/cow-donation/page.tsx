import type { Metadata } from "next"
import { CowDonationPageClient } from "./CowDonationPageClient"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.shrishyamfoundation.org"

export const metadata: Metadata = {
  title: "Cow Donation | Gau Seva, Fodder & Rescue | Shri Shyam Foundation",
  description:
    "Donate for Gau Seva at Shri Shyam Foundation. Support daily fodder, veterinary treatment, calf care and emergency roadside rescue. Choose from ₹51 to ₹11,001 — 80G receipt provided.",
  keywords: [
    "cow donation",
    "gaushala donation",
    "gau seva",
    "cow welfare NGO",
    "donate for cows India",
    "abandoned cow rescue",
    "cow protection",
    "Shri Shyam Foundation cow care",
    "cow shelter donation",
    "animal welfare NGO India",
  ],
  alternates: {
    canonical: `${BASE_URL}/cow-donation`,
  },
  openGraph: {
    title: "Cow Donation | Gau Seva & Rescue | Shri Shyam Foundation",
    description:
      "From first roti seva to emergency highway rescue — fund fodder, treatment and shelter for cows in our care. Transparent. 80G eligible.",
    url: `${BASE_URL}/cow-donation`,
    siteName: "Shri Shyam Foundation",
    images: [
      {
        url: `${BASE_URL}/images/live/8.jpg.jpeg`,
        width: 1200,
        height: 630,
        alt: "Cow Rescue and Gaushala Support - Shri Shyam Foundation",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Support Cow Rescue & Gaushala Care | Shri Shyam Foundation",
    description:
      "Join our Gau Seva initiative. Support the rescue, medical treatment, and daily feeding of abandoned and injured cows at our gaushalas across Delhi NCR and Delhi.",
    images: [`${BASE_URL}/images/live/8.jpg.jpeg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/cow-donation`,
      url: `${BASE_URL}/cow-donation`,
      name: "Cow Donation | Support Gaushala & Protect Sacred Cows | Shri Shyam Foundation",
      description:
        "Support cow welfare by donating to Shri Shyam Foundation.",
      inLanguage: "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${BASE_URL}/cow-donation#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Cow Donation", item: `${BASE_URL}/cow-donation` },
      ],
    },
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Shri Shyam Foundation",
      url: BASE_URL,
    },
    {
      "@type": "DonateAction",
      name: "Donate for Cow Care",
      description: "Support rescued and abandoned cows with food, shelter, and medical care",
      recipient: { "@id": `${BASE_URL}/#organization` },
      url: `${BASE_URL}/cow-donation`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Why should I donate for cow welfare?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Thousands of cows in India are abandoned on roads without food, water, or medical care. Your donation directly funds nutritious fodder, clean water, veterinary treatment, and safe shelter for these vulnerable animals.",
          },
        },
        {
          "@type": "Question",
          name: "How is my cow donation used?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your donation is used for daily fodder and green grass, fresh water supply, veterinary medicines and treatments, gaushala infrastructure, and rescue operations for injured or abandoned cows.",
          },
        },
        {
          "@type": "Question",
          name: "Is my cow donation tax-exempt?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Shri Shyam Foundation holds 80G tax exemption status. You will receive an official 80G tax certificate via email immediately after your donation.",
          },
        },
        {
          "@type": "Question",
          name: "Can I volunteer for cow care?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! We run regular volunteer programmes every weekend. Contact us through our website or WhatsApp and we will guide you on how to participate.",
          },
        },
      ],
    },
  ],
}

export default function CowDonationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CowDonationPageClient />
    </>
  )
}
