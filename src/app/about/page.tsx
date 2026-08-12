import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { site, stats } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Juan Vasquez and Precisi Tile Solutions — master tile craftsmanship for Lake Norman and Charlotte.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 md:grid-cols-2 md:items-center md:px-8 md:pb-24">
        <div>
          <p className="text-[0.7rem] font-medium tracking-[0.22em] text-cyan uppercase">
            About
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-6xl">
            Craft you can see up close.
          </h1>
          <p className="mt-6 text-ink-muted leading-relaxed">
          Tile is the one trade where every single detail is exposed. it's the defining finish of your home.
           From razor sharp cuts to complete waterproof integrity, we treat your home like canvas.
          we build to make a statement and stand the test of time.
          </p>
          <p className="mt-4 text-ink-muted leading-relaxed">
           
            Built to serve Lake Norman’s finest homes. We’ve invested in top tier machinery and crew to ensure a smooth and efficient jobsite.
             From Mooresville down through Charlotte, we deliver the horsepower and craftsmanship required to get the job done right.
          </p>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src="/public/photos/crew.jpg"
            alt="Crews working on a project"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </section>

      <section className="bg-ink py-16 text-white md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:gap-16">
            <div>
              <p className="text-[0.7rem] tracking-[0.22em] text-cyan uppercase">
                Owner
              </p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight">Juan Vasquez</h2>
              <p className="mt-2 text-sm text-white/60">
                Owner, {site.name}
              </p>
            </div>
            <p className="text-lg leading-relaxed text-white/80 md:text-xl">
              Juan leads every project with integrity, clear communication, and
              a standard that shows in the finished tile — whether it’s a single
              shower niche or a multi room remodel 
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-6 border-t border-white/15 pt-10 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-cyan">
                  {stat.value}
                </p>
                <p className="mt-1 text-[0.65rem] tracking-[0.16em] text-white/55 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-20 md:flex-row md:items-center md:justify-between md:px-8 md:py-24">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Let’s talk about your next install.
          </h2>
          <p className="mt-3 max-w-lg text-ink-muted">
            Serving {site.serviceArea}. Subcontract work welcome.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/quote">Request a Quote</ButtonLink>
        </div>
      </section>
    </div>
  );
}
