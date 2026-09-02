import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader, SiteFooter, MainWrapper } from "@/components/shared/SiteChrome";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { PageTracker } from "@/components/analytics/PageTracker";
import { orgEntity } from "@/data/orgEntity";

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.shrishyamfoundation.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shri Shyam Foundation | Food, Education & Cow Welfare — Delhi NCR & UP",
    template: "%s | Shri Shyam Foundation",
  },
  description: "Shri Shyam Foundation serves free hot meals daily, distributes school stationery to underprivileged children, cares for rescued cows, and organises free medical camps across Delhi NCR and Delhi. Registered NGO with 80G tax exemption.",
  keywords: ["NGO India", "Free Food Distribution Delhi", "Cow Donation", "Cow Welfare NGO", "Education Support NGO", "Free Medical Camp UP", "Shri Shyam Foundation", "Food For Life", "Donate Online India", "GauSeva"],
  authors: [{ name: "Shri Shyam Foundation" }],
  creator: "Shri Shyam Foundation",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    title: "Shri Shyam Foundation — Food For Life | Cow Welfare | Education Support",
    description: "We serve free meals every day, hand out books to children who cannot afford them, and rescue stray cows. See what your donation actually does — on the ground, in real communities.",
    siteName: "Shri Shyam Foundation",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Shri Shyam Foundation volunteers serving hot food to beneficiaries during a community food drive in Delhi NCR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shri Shyam Foundation — Food For Life | Cow Welfare | Education Support",
    description: "We feed families, distribute books to children, and care for rescued cows — every day, on the ground in Delhi NCR and UP.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ||
      "fvkWb_FgdcdffHgqcHP7prm4D8o3Pl1zNcfacPJ5msE",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-clip" suppressHydrationWarning>
      <body className={`${fontSans.variable} antialiased overflow-x-clip w-full max-w-full`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              ...orgEntity,
            }),
          }}
        />
        {/* SiteHeader: Header, ScrollProgress etc. */}
        <SiteHeader />
        {/* MainWrapper: adjusts <main> padding — no padding on admin */}
        <MainWrapper>{children}</MainWrapper>
        {/* SiteFooter: Footer, BottomNav etc. */}
        <SiteFooter />
        <MetaPixel />
        <GoogleAnalytics />
        <PageTracker />
      </body>
    </html>
  );
}
