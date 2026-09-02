import type { Metadata } from "next"
import Link from "next/link"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.shrishyamfoundation.org"

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "Refund and cancellation policy for donations to Shri Shyam Foundation via Cashfree, UPI, or bank transfer.",
  alternates: { canonical: `${SITE_URL}/refund-policy` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Refund & Cancellation Policy | Shri Shyam Foundation",
    description: "How refunds and cancellations work for online and offline donations.",
    url: `${SITE_URL}/refund-policy`,
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
}

const sections = [
  {
    title: "Overview",
    content:
      "Shri Shyam Foundation (SSF) is a registered non-profit organisation. Donations support food distribution, education, medical outreach, and cow welfare programmes. This policy explains when a refund or cancellation may apply for donations made through our website (Cashfree checkout), UPI, or bank transfer.",
  },
  {
    title: "Voluntary Donations",
    content:
      "All donations are voluntary gifts to support our charitable work. Once a donation is successfully processed and confirmed, it is generally non-refundable because funds are allocated promptly to programme activities.",
  },
  {
    title: "When Refunds May Be Considered",
    content:
      "We may consider a refund request in limited cases, such as: (1) duplicate payment for the same donation, (2) a clear technical error resulting in an incorrect amount charged, (3) unauthorised payment reported promptly with supporting evidence, or (4) cancellation requested before the payment is successfully captured by the payment gateway. Each request is reviewed individually.",
  },
  {
    title: "How to Request a Refund",
    content:
      "Email shrishyamfoundation1@gmail.com or WhatsApp +91 9990145555 within 7 days of the transaction. Include your full name, phone number, donation amount, date, order / transaction ID (Cashfree order ID, UPI reference, or bank UTR), and reason for the request. Incomplete requests may delay review.",
  },
  {
    title: "Processing Time",
    content:
      "Eligible refunds are typically processed within 7–14 working days after approval. The amount is returned to the original payment method where possible. Bank or UPI settlement timelines may add additional days depending on your bank.",
  },
  {
    title: "Failed or Pending Payments",
    content:
      "If a payment fails or remains pending, no donation is recorded and no refund is required. If your account was debited but you did not receive confirmation, contact us with the transaction reference so we can verify with Cashfree or your bank.",
  },
  {
    title: "80G Tax Receipts",
    content:
      "If a refund is issued for a donation that already received an 80G acknowledgement, the receipt is cancelled or revised. Please do not claim tax deduction for refunded amounts.",
  },
  {
    title: "Cancellations Before Payment",
    content:
      "You may abandon the Cashfree checkout or close the payment modal at any time before completing payment. No charge is applied until payment succeeds.",
  },
  {
    title: "Contact",
    content:
      "For refund or cancellation queries: shrishyamfoundation1@gmail.com | +91 9990145555 | House Number - J88 Gali No. 9/4 Pusta, Delhi, Delhi, 110053, India.",
  },
]

export default function RefundPolicyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gradient-to-br from-slate-900 to-slate-700 pt-28 sm:pt-36 lg:pt-56 pb-20">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">Refund Policy</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-slate-400 text-lg">Last updated: August 2026</p>
        </div>
      </div>

      <div className="container-custom py-20 max-w-3xl">
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 text-lg leading-relaxed mb-12 p-6 bg-slate-50 rounded-2xl border border-slate-200">
            This policy applies to donations made via our website payment gateway (Cashfree), UPI QR /
            UPI ID, and bank transfer to Shri Shyam Foundation.
          </p>

          <div className="space-y-10">
            {sections.map((s, i) => (
              <div key={s.title}>
                <h2 className="text-xl font-extrabold text-slate-900 mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-slate-800 text-white text-sm font-black flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  {s.title}
                </h2>
                <p className="text-slate-600 leading-relaxed pl-11">{s.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-slate-50 rounded-2xl text-center">
            <p className="text-slate-600 mb-4">Need help with a donation transaction?</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-slate-800 text-white font-bold px-8 py-3 rounded-full hover:bg-slate-900 transition-colors"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
