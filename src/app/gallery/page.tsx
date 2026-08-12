import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { galleryItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Selected tile installations by Precisi Tile Solutions — bathrooms, kitchens, floors, and custom stone.",
};

export default function GalleryPage() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="mx-auto max-w-6xl px-5 pb-10 md:px-8">
        <p className="text-[0.7rem] font-medium tracking-[0.22em] text-cyan uppercase">
          Gallery
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-6xl">
          Work worth showing.
        </h1>
        <p className="mt-4 max-w-2xl text-ink-muted leading-relaxed">
          Some of our favorite projects. Any color, any style, any size.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-8 md:pb-28">
        <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
          {galleryItems.map((item) => (
            <figure key={item.src} className="mb-3 break-inside-avoid">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <figcaption className="mt-2 text-[0.7rem] tracking-[0.16em] text-ink-muted uppercase">
                {item.label}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start gap-6 border-t border-stone-200 pt-12 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-3xl font-bold tracking-tight text-ink">
            Have a project in mind?
          </p>
          <ButtonLink href="/quote">Request a Quote</ButtonLink>
        </div>
      </section>
    </div>
  );
}
