import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { ButtonLink } from "@/components/ButtonLink";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a tile installation quote from Precisi Tile Solutions — bathrooms, kitchens, floors, and custom stone across Lake Norman.",
};

export default function QuotePage() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="mx-auto max-w-6xl px-5 pb-8 md:px-8">
        <p className="text-[0.7rem] font-medium tracking-[0.22em] text-lake uppercase">
          Quote request
        </p>
        <h1 className="mt-3 font-display text-4xl text-ink md:text-6xl">
          Tell us about the space.
        </h1>
        <p className="mt-4 max-w-2xl text-ink-muted leading-relaxed">
          Share a few details and we’ll follow up with next steps — usually
          within one business day. Prefer to talk first?{" "}
          <Link href="/book" className="text-lake underline-offset-2 hover:underline">
            Book a consultation
          </Link>
          .
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 md:grid-cols-[1.35fr_0.85fr] md:px-8 md:pb-28">
        <QuoteForm />

        <aside className="h-fit border border-stone-200 bg-marble p-6 md:p-8">
          <h2 className="font-display text-2xl text-ink">What happens next</h2>
          <ol className="mt-6 space-y-5 text-sm leading-relaxed text-ink-muted">
            <li>
              <span className="block text-[0.65rem] tracking-[0.18em] text-lake uppercase">
                01
              </span>
              We review your details and reach out to clarify scope.
            </li>
            <li>
              <span className="block text-[0.65rem] tracking-[0.18em] text-lake uppercase">
                02
              </span>
              If needed, we schedule an on-site look for a precise estimate.
            </li>
            <li>
              <span className="block text-[0.65rem] tracking-[0.18em] text-lake uppercase">
                03
              </span>
              You get a clear quote — materials, labor, and timeline.
            </li>
          </ol>
          <div className="mt-8">
            <ButtonLink href="/book" variant="ghost">
              Or book a call
            </ButtonLink>
          </div>
        </aside>
      </section>
    </div>
  );
}
