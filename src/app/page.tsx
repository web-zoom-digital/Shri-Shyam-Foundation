import type { Metadata } from "next"
import { HeroSection } from "@/components/sections/HeroSection"
import { QuickDonationWidget } from "@/components/sections/QuickDonationWidget"
import { ImpactCounters } from "@/components/sections/ImpactCounters"
import { AboutFoundation } from "@/components/sections/AboutFoundation"
import { MissionVision } from "@/components/sections/MissionVision"
import { CoreValues } from "@/components/sections/CoreValues"
import { WhyChooseSSF } from "@/components/sections/WhyChooseSSF"
import { OurPrograms } from "@/components/sections/OurPrograms"
import { FeaturedCauses } from "@/components/sections/FeaturedCauses"
import { DonationCausesSection } from "@/components/sections/DonationCausesSection"
import { DonationImpactTimeline } from "@/components/sections/DonationImpactTimeline"

import { Transparency } from "@/components/sections/Transparency"
import { SuccessStories } from "@/components/sections/SuccessStories"
import { Testimonials } from "@/components/sections/Testimonials"
import { GalleryPreview } from "@/components/sections/GalleryPreview"
import { LatestBlogs } from "@/components/sections/LatestBlogs"
import { UpcomingEvents } from "@/components/sections/UpcomingEvents"

import { FAQ } from "@/components/sections/FAQ"
import { DonationBanner } from "@/components/sections/DonationBanner"
import { NewsletterContact } from "@/components/sections/NewsletterContact"
import { FinalEmotionalCTA } from "@/components/sections/FinalEmotionalCTA"
import { EntityAnswerBox } from "@/components/sections/EntityAnswerBox"
import { homeFaqs } from "@/data/homeFaqs"
import { orgEntity, SITE_URL } from "@/data/orgEntity"

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
  openGraph: {
    url: SITE_URL,
    title: "Shri Shyam Foundation — Food For Life | Cow Welfare | Education Support",
    description:
      "We serve free meals every day, support underprivileged children with school supplies, and rescue stray cows across Delhi NCR and Delhi.",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
}

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Shri Shyam Foundation",
        url: SITE_URL,
        description:
          "Registered NGO providing free food distribution, education support, medical outreach, and cow welfare across Delhi NCR and Delhi.",
        publisher: { "@id": orgEntity["@id"] },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "Shri Shyam Foundation | Food, Education & Cow Welfare",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": orgEntity["@id"] },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}/og-image.jpg`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: homeFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
      orgEntity,
    ],
  }

  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <EntityAnswerBox />
      <QuickDonationWidget />
      <ImpactCounters />
      <AboutFoundation />
      <MissionVision />
      <CoreValues />
      <WhyChooseSSF />
      <OurPrograms />
      <FeaturedCauses />
      <DonationCausesSection />
      <DonationImpactTimeline />
      <Transparency />
      <SuccessStories />
      <Testimonials />
      <GalleryPreview />
      <LatestBlogs />
      <UpcomingEvents />
      <FAQ />
      <DonationBanner />
      <NewsletterContact />
      <FinalEmotionalCTA />
    </div>
  )
}
