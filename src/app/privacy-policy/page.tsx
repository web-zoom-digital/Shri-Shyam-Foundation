import type { Metadata } from "next"
import Link from "next/link"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.shrishyamfoundation.org"

export const metadata: Metadata = {
  title: "Privacy Policy — Shri Shyam Foundation",
  description: "Read the Privacy Policy of Shri Shyam Foundation. Learn how we collect, use and protect your personal information.",
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
  robots: { index: true, follow: true },
}

const sections = [
  {
    title: "Information We Collect",
    content: "When you donate, volunteer, subscribe to our newsletter or contact us, we may collect your name, email address, phone number, postal address, and payment information. We also collect non-personal data such as browser type, IP address and pages visited to improve our website experience."
  },
  {
    title: "How We Use Your Information",
    content: "We use your information to process donations, send receipts and 80G certificates, communicate programme updates, respond to enquiries, improve our services, and comply with legal obligations. We do not use your information for commercial advertising."
  },
  {
    title: "Sharing of Information",
    content: "Shri Shyam Foundation does not sell, trade or rent your personal information to third parties. We may share information with trusted service providers (such as payment processors) strictly for operational purposes, bound by confidentiality agreements."
  },
  {
    title: "Data Security",
    content: "We implement industry-standard security measures including SSL encryption, secure servers and access controls to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security."
  },
  {
    title: "Cookies",
    content: "Our website uses cookies to enhance your browsing experience, analyse traffic and remember your preferences. You may disable cookies through your browser settings, though some website features may not function correctly as a result."
  },
  {
    title: "Your Rights",
    content: "You have the right to access, correct or delete your personal information held by us. To exercise these rights, please contact us at shrishyamfoundation1@gmail.com. We will respond within 30 days."
  },
  {
    title: "Third-Party Links",
    content: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these sites and encourage you to review their privacy policies."
  },
  {
    title: "Changes to This Policy",
    content: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of our website after changes constitutes acceptance of the updated policy."
  },
  {
    title: "Contact Us",
    content: "For any questions about this Privacy Policy, please contact us at: shrishyamfoundation1@gmail.com or write to us at House Number - J88 Gali No. 9/4 Pusta, Delhi, Delhi, 110053, India."
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gradient-to-br from-slate-900 to-slate-700 pt-28 sm:pt-36 lg:pt-56 pb-20">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm text-slate-300 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-semibold">Privacy Policy</span>
          </nav>
          <h1 className="text-5xl font-extrabold text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-200 text-lg">Last updated: July 2025</p>
        </div>
      </div>

      <div className="container-custom py-20 max-w-3xl">
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 text-lg leading-relaxed mb-12 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            Shri Shyam Foundation is committed to protecting your privacy. This Privacy Policy explains how we collect, use and safeguard your personal information when you interact with our website, donate to our cause or participate in our programmes.
          </p>

          <div className="space-y-10">
            {sections.map((s, i) => (
              <div key={i}>
                <h2 className="text-xl font-extrabold text-slate-900 mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-slate-600 text-white text-sm font-black flex items-center justify-center shrink-0">{i + 1}</span>
                  {s.title}
                </h2>
                <p className="text-slate-600 leading-relaxed pl-11">{s.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-slate-50 rounded-2xl text-center">
            <p className="text-slate-600 mb-4">Have questions about how we protect your data?</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-slate-600 text-white font-bold px-8 py-3 rounded-full hover:bg-slate-700 transition-colors">
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
