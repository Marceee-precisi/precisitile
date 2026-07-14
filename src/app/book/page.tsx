import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Schedule a consultation with Precisi Tile Solutions for your kitchen, bath, or floor project.",
};

export default function BookPage() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="mx-auto max-w-6xl px-5 pb-8 md:px-8">
        <p className="text-[0.7rem] font-medium tracking-[0.22em] text-lake uppercase">
          Scheduling
        </p>
        <h1 className="mt-3 font-display text-4xl text-ink md:text-6xl">
          Book a consultation.
        </h1>
        <p className="mt-4 max-w-2xl text-ink-muted leading-relaxed">
          Pick a time that works for a short call or on-site visit. We’ll use it
          to understand materials, timeline, and whether we’re the right fit.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 md:grid-cols-2 md:px-8 md:pb-28">
        <div className="flex min-h-[28rem] flex-col items-center justify-center border border-dashed border-stone-300 bg-marble px-6 py-12 text-center">
          <p className="font-display text-3xl text-ink">Calendar coming soon</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">
            We’ll embed Calendly or Cal.com here. Until then, request a quote or
            email us and we’ll schedule manually.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/quote">Request a Quote</ButtonLink>
            <a
              href={`mailto:${site.email}?subject=Book%20a%20consultation`}
              className="inline-flex items-center justify-center border border-ink/20 px-6 py-3.5 text-[0.75rem] font-medium tracking-[0.16em] text-ink uppercase transition-all hover:border-ink hover:bg-ink hover:text-white"
            >
              Email to schedule
            </a>
          </div>
          <p className="mt-6 text-xs text-ink-muted">
            Tip: When you have a Calendly link, drop it in as an embed — no
            redesign required.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-ink">What to expect</h2>
          <ul className="mt-6 space-y-6">
            {[
              {
                title: "Phone consultation",
                body: "15–20 minutes to talk scope, timeline, and ballpark fit before anyone comes out.",
              },
              {
                title: "On-site estimate",
                body: "We measure, look at substrate and access, and talk materials in the actual space.",
              },
              {
                title: "Subcontract partners",
                body: "General contractors and builders — we can align with your job schedule and walkthroughs.",
              },
            ].map((item) => (
              <li key={item.title} className="border-t border-stone-200 pt-5">
                <h3 className="text-[0.75rem] font-medium tracking-[0.14em] text-lake uppercase">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
