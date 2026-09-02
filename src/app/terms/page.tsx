import type { Metadata } from "next"
import Link from "next/link"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.shrishyamfoundation.org"

export const metadata: Metadata = {
  title: "Terms of Service — Shri Shyam Foundation",
  description: "Read the Terms of Service for Shri Shyam Foundation's website, donation platform and volunteer programmes.",
  alternates: { canonical: `${SITE_URL}/terms` },
  robots: { index: true, follow: true },
}

const sections = [
  {
    title: "Acceptance of Terms",
    content: "By accessing or using the Shri Shyam Foundation website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website."
  },
  {
    title: "Use of Website",
    content: "You may use our website for lawful purposes only. You agree not to engage in any activity that disrupts the website's operation, attempts to gain unauthorised access, or violates applicable laws. We reserve the right to terminate access for users who violate these terms."
  },
  {
    title: "Donations",
    content: "All donations made through our website are voluntary. Refunds and cancellations are handled as described in our Refund & Cancellation Policy at /refund-policy. By donating, you confirm that the funds are legally acquired. We issue 80G certificates for eligible donations as required by Indian tax law."
  },
  {
    title: "Accuracy of Information",
    content: "While we strive to maintain accurate and current information on our website, we do not warrant that all content is complete or error-free. Impact statistics are updated annually based on verified programme data. We reserve the right to correct inaccuracies at any time."
  },
  {
    title: "Intellectual Property",
    content: "All content on this website — including text, images, logos, graphics and video — is the intellectual property of Shri Shyam Foundation unless otherwise stated. You may not reproduce or distribute our content without prior written permission."
  },
  {
    title: "Volunteer Terms",
    content: "Volunteers agree to follow SSF's code of conduct, maintain confidentiality of beneficiary information, and act in the best interest of the communities we serve. SSF reserves the right to remove volunteers who do not comply with our standards."
  },
  {
    title: "Limitation of Liability",
    content: "Shri Shyam Foundation shall not be liable for any indirect, incidental or consequential damages arising from your use of this website or reliance on its content. Our total liability, if any, shall not exceed the amount of your most recent donation."
  },
  {
    title: "Governing Law",
    content: "These Terms of Service are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Delhi, Delhi, India."
  },
  {
    title: "Changes to Terms",
    content: "We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with an updated date. Continued use of the website after changes constitutes acceptance of the revised terms."
  },
  {
    title: "Contact",
    content: "For questions about these terms, please contact us at shrishyamfoundation1@gmail.com."
  },
]

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gradient-to-br from-slate-900 to-slate-700 pt-28 sm:pt-36 lg:pt-56 pb-20">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-semibold">Terms of Service</span>
          </nav>
          <h1 className="text-5xl font-extrabold text-white mb-4">Terms of Service</h1>
          <p className="text-slate-400 text-lg">Last updated: July 2025</p>
        </div>
      </div>

      <div className="container-custom py-20 max-w-3xl">
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 text-lg leading-relaxed mb-12 p-6 bg-slate-50 rounded-2xl border border-slate-200">
            Please read these Terms of Service carefully before using the Shri Shyam Foundation website or making a donation. These terms govern your relationship with us.
          </p>

          <div className="space-y-10">
            {sections.map((s, i) => (
              <div key={i}>
                <h2 className="text-xl font-extrabold text-slate-900 mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-slate-800 text-white text-sm font-black flex items-center justify-center shrink-0">{i + 1}</span>
                  {s.title}
                </h2>
                <p className="text-slate-600 leading-relaxed pl-11">{s.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-slate-50 rounded-2xl text-center">
            <p className="text-slate-600 mb-4">Have questions about our terms?</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-slate-800 text-white font-bold px-8 py-3 rounded-full hover:bg-slate-900 transition-colors">
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
