import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Precisi Tile Solutions for tile installation quotes and consultations in Lake Norman and Charlotte, NC.",
};

export default function ContactPage() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="mx-auto max-w-6xl px-5 pb-8 md:px-8">
        <p className="text-[0.7rem] font-medium tracking-[0.22em] text-cyan uppercase">
          Contact
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-6xl">
          Let’s start the conversation.
        </h1>
        <p className="mt-4 max-w-2xl text-ink-muted leading-relaxed">
          Reach out directly, or use the quote form if you already know the
          scope. We respond as quickly as the jobsite allows — usually within a
          business day.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 md:grid-cols-3 md:px-8 md:pb-28">
        {[
          {
            label: "Email",
            value: site.email,
            href: `mailto:${site.email}`,
          },
          {
            label: "Phone",
            value: site.phone,
            href: `tel:${site.phone.replace(/[^\d+]/g, "")}`,
          },
          {
            label: "Service area",
            value: site.serviceArea,
            href: null,
          },
        ].map((item) => (
          <div key={item.label} className="border-t border-stone-200 pt-6">
            <p className="text-[0.65rem] tracking-[0.18em] text-cyan uppercase">
              {item.label}
            </p>
            {item.href ? (
              <a
                href={item.href}
                className="mt-3 block text-2xl font-semibold text-ink transition-colors hover:text-cyan"
              >
                {item.value}
              </a>
            ) : (
              <p className="mt-3 text-2xl font-semibold text-ink">{item.value}</p>
            )}
          </div>
        ))}

        <div className="md:col-span-3 mt-4 flex flex-wrap gap-3">
          <ButtonLink href="/quote">Request a Quote</ButtonLink>
          <ButtonLink href="/book" variant="ghost">
            Book Consultation
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
