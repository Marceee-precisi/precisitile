import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a tile installation quote from Precisi Tile Solutions — bathrooms, kitchens, floors, and custom stone across Lake Norman.",
};

export default function QuotePage() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="mx-auto max-w-6xl px-5 pb-8 md:px-8">
        <p className="text-[0.7rem] font-medium tracking-[0.22em] text-cyan uppercase">
          Quote request
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-6xl">
          Tell us about the space.
        </h1>
        <p className="mt-4 max-w-2xl text-ink-muted leading-relaxed">
          Share a few details and we’ll follow up with next steps — usually
          within one business day. Prefer to call?{" "}
          <a
            href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
            className="text-cyan underline-offset-2 hover:underline"
          >
            {site.phone}
          </a>
          .
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 md:grid-cols-[1.35fr_0.85fr] md:px-8 md:pb-28">
        <QuoteForm />

        <aside className="h-fit border border-stone-200 bg-marble p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-ink">What happens next</h2>
          <ol className="mt-6 space-y-5 text-sm leading-relaxed text-ink-muted">
            <li>
              <span className="block text-[0.65rem] tracking-[0.18em] text-cyan uppercase">
                01
              </span>
              We review your details and reach out to clarify scope.
            </li>
            <li>
              <span className="block text-[0.65rem] tracking-[0.18em] text-cyan uppercase">
                02
              </span>
              If needed, we schedule an on-site look for a precise estimate.
            </li>
            <li>
              <span className="block text-[0.65rem] tracking-[0.18em] text-cyan uppercase">
                03
              </span>
              You get a clear quote — materials, labor, and timeline.
            </li>
          </ol>
        </aside>
      </section>
    </div>
  );
}
