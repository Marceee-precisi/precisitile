import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import {
  galleryItems,
  reviews,
  services,
  site,
  stats,
} from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden noise-overlay">
        <Image
          src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=2400&q=80"
          alt="Premium tiled shower installation"
          fill
          priority
          className="object-cover animate-hero-ken"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/45 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/30" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:justify-center md:px-8 md:pb-24 md:pt-32">
          <p className="animate-fade-up font-display text-4xl tracking-[0.08em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {site.shortName.toUpperCase()}
          </p>
          <p className="animate-fade-up delay-1 mt-2 text-[0.7rem] font-medium tracking-[0.32em] text-white/70 uppercase md:text-[0.75rem]">
            Tile Solutions · {site.serviceArea}
          </p>
          <h1 className="animate-fade-up delay-2 mt-8 max-w-xl font-display text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
            Premium tiles.
            <br />
            Human craft.
          </h1>
          <p className="animate-fade-up delay-3 mt-5 max-w-md text-base leading-relaxed text-white/80 md:text-lg">
            Master tile installation for baths, kitchens, and living spaces —
            measured, clean, and built to last.
          </p>
          <div className="animate-fade-up delay-4 mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/quote">Request a Quote</ButtonLink>
            <ButtonLink href="/book" variant="secondary">
              Book Consultation
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-marble">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-stone-200 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-marble px-5 py-8 text-center md:py-10"
            >
              <p className="font-display text-3xl text-lake md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-[0.7rem] tracking-[0.16em] text-ink-muted uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <p className="text-[0.7rem] font-medium tracking-[0.22em] text-lake uppercase">
          What we do
        </p>
        <h2 className="mt-3 max-w-xl font-display text-4xl text-ink md:text-5xl">
          Tile work that respects the home.
        </h2>
        <p className="mt-4 max-w-2xl text-ink-muted leading-relaxed">
          Whether you need a spa shower or a kitchen that finally feels finished,
          we bring two decades of hands-on craft — and we treat every joint like
          it matters.
        </p>

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          {services.map((service, i) => (
            <article
              key={service.title}
              className="border-t border-stone-200 pt-6"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <h3 className="font-display text-2xl text-ink">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-lake-deep py-20 text-white md:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-30 marble-veil" />
        <div className="relative mx-auto max-w-6xl px-5 md:px-8">
          <p className="text-[0.7rem] font-medium tracking-[0.22em] text-highlight uppercase">
            From our clients
          </p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            Loved by the community.
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {reviews.map((review) => (
              <blockquote
                key={review.name}
                className="border-l border-white/25 pl-6"
              >
                <p className="text-base leading-relaxed text-white/85 md:text-lg">
                  “{review.text}”
                </p>
                <footer className="mt-4 text-[0.75rem] tracking-[0.14em] text-highlight uppercase">
                  {review.name}
                </footer>
              </blockquote>
            ))}
          </div>

          <Link
            href={site.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block text-[0.75rem] font-medium tracking-[0.16em] text-white/80 uppercase underline-offset-4 hover:text-white hover:underline"
          >
            View all reviews on Google
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[0.7rem] font-medium tracking-[0.22em] text-lake uppercase">
              Selected work
            </p>
            <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
              See the finish.
            </h2>
          </div>
          <ButtonLink href="/gallery" variant="ghost">
            Full gallery
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.slice(0, 3).map((item, i) => (
            <Link
              key={item.src}
              href="/gallery"
              className={`group relative overflow-hidden ${
                i === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <div
                className={`relative ${i === 0 ? "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[28rem]" : "aspect-[4/3]"}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                <p className="absolute bottom-4 left-4 text-[0.7rem] tracking-[0.18em] text-white uppercase">
                  {item.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-stone-200 marble-veil">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 py-20 md:flex-row md:items-center md:justify-between md:px-8 md:py-24">
          <div>
            <h2 className="font-display text-4xl text-ink md:text-5xl">
              Ready when you are.
            </h2>
            <p className="mt-4 max-w-lg text-ink-muted leading-relaxed">
              Tell us about the space — or book a short consultation. We’ll
              respond with clear next steps and a thoughtful estimate.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/quote">Request a Quote</ButtonLink>
            <ButtonLink href="/book" variant="ghost">
              Book Consultation
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
