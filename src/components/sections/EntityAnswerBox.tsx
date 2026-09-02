import Link from "next/link"
import { orgPlainSummary } from "@/data/orgEntity"

/** Answer-first entity block for AI search citation (GEO) */
export function EntityAnswerBox() {
  return (
    <section
      className="py-10 sm:py-12 bg-slate-50 border-y border-slate-200/80"
      aria-labelledby="what-is-ncf"
    >
      <div className="container-custom max-w-4xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600 mb-3">
          Quick facts
        </p>
        <h2 id="what-is-ncf" className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
          What is Shri Shyam Foundation?
        </h2>
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-4">
            <strong>{orgPlainSummary.name}</strong> is {orgPlainSummary.what.replace(/^A /, "a ")} It
            was founded in <strong>{orgPlainSummary.founded}</strong> and operates from{" "}
            <strong>{orgPlainSummary.location}</strong>.
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            <strong>How to help:</strong> {orgPlainSummary.howToHelp} {orgPlainSummary.taxNote}
          </p>
          <ul className="text-sm text-slate-600 space-y-1.5 mb-5 list-disc pl-5">
            <li>
              Phone:{" "}
              <a className="text-slate-700 font-semibold hover:underline" href="tel:+919990145555">
                {orgPlainSummary.phone}
              </a>
            </li>
            <li>
              Email:{" "}
              <a
                className="text-slate-700 font-semibold hover:underline"
                href={`mailto:${orgPlainSummary.email}`}
              >
                {orgPlainSummary.email}
              </a>
            </li>
            <li>
              WhatsApp:{" "}
              <a
                className="text-slate-700 font-semibold hover:underline"
                href="https://wa.me/919990145555"
                target="_blank"
                rel="noopener noreferrer"
              >
                +91 9990145555
              </a>
            </li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/about"
              className="inline-flex items-center rounded-full bg-slate-600 text-white text-sm font-bold px-5 py-2.5 hover:bg-slate-700 transition-colors"
            >
              Read our story
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center rounded-full border border-slate-200 bg-white text-slate-800 text-sm font-bold px-5 py-2.5 hover:bg-slate-50 transition-colors"
            >
              Donate securely
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
