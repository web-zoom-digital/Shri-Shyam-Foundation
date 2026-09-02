import type { Metadata } from "next"
import { AccountDetailsPageClient } from "./AccountDetailsPageClient"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.shrishyamfoundation.org"

export const metadata: Metadata = {
  title: "Donate via Bank Transfer | Account Details | Shri Shyam Foundation",
  description:
    "Support Shri Shyam Foundation by donating securely through bank transfer, UPI, NEFT, RTGS, or IMPS. Every contribution helps provide food, healthcare, education, and hope to those in need.",
  keywords: ["bank transfer donation", "UPI donation NGO", "NEFT donation", "Shri Shyam Foundation account details", "donate bank account", "NGO IFSC code"],
  alternates: { canonical: `${BASE_URL}/account-details` },
  openGraph: {
    title: "Donate via Bank Transfer | Account Details | Shri Shyam Foundation",
    description: "Donate securely through bank transfer, UPI, NEFT, RTGS, or IMPS. 100% transparent, 80G tax exempt.",
    url: `${BASE_URL}/account-details`,
    siteName: "Shri Shyam Foundation",
    images: [{ url: `${BASE_URL}/images/live/Untitled-design-32.jpg`, width: 1200, height: 630, alt: "Shri Shyam Foundation team" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Account Details — Donate via Bank Transfer, NEFT, RTGS & UPI | Shri Shyam Foundation",
    description: "Secure and verified bank details for Shri Shyam Foundation. Choose from multiple methods like Bank Transfer, NEFT, RTGS, IMPS, and UPI to make your contribution.",
    images: [`${BASE_URL}/images/live/Untitled-design-32.jpg`],
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/account-details`,
      url: `${BASE_URL}/account-details`,
      name: "Donate via Bank Transfer | Account Details | Shri Shyam Foundation",
      description: "Donate securely through bank transfer, UPI, NEFT, RTGS, or IMPS.",
      inLanguage: "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Donate", item: `${BASE_URL}/donate` },
        { "@type": "ListItem", position: 3, name: "Account Details", item: `${BASE_URL}/account-details` },
      ],
    },
    {
      "@type": "Organization",
      name: "Shri Shyam Foundation",
      url: BASE_URL,
      contactPoint: { "@type": "ContactPoint", telephone: "+91 9990145555", contactType: "donations" },
    },
    {
      "@type": "DonateAction",
      name: "Donate via Bank Transfer",
      description: "Donate securely to Shri Shyam Foundation through bank transfer, UPI, NEFT, RTGS, or IMPS",
      url: `${BASE_URL}/account-details`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How can I donate via bank transfer?", acceptedAnswer: { "@type": "Answer", text: "Use our account details displayed on this page to transfer funds via NEFT, RTGS, or IMPS. After transfer, share your transaction ID on WhatsApp or email for acknowledgement." } },
        { "@type": "Question", name: "Is online donation secure?", acceptedAnswer: { "@type": "Answer", text: "Yes. Our bank is a nationalized, RBI-regulated institution. All transfers are end-to-end secure. We never ask for your OTP or bank password." } },
        { "@type": "Question", name: "Can I donate through UPI?", acceptedAnswer: { "@type": "Answer", text: "Yes. Use our UPI ID displayed on this page or scan our QR code with any UPI app like PhonePe, Google Pay, Paytm, or BHIM." } },
        { "@type": "Question", name: "Will I receive a confirmation?", acceptedAnswer: { "@type": "Answer", text: "Yes. After sharing your transaction ID on WhatsApp or email, we send an official acknowledgement with your 80G tax certificate within 24 working hours." } },
        { "@type": "Question", name: "Can I make recurring donations?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. You can set up a standing instruction with your bank for recurring monthly or quarterly transfers. Contact us for details." } },
      ],
    },
  ],
}

export default function AccountDetailsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AccountDetailsPageClient />
    </>
  )
}
