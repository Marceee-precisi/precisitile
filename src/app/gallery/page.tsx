import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Selected tile installations by Precisi Tile Solutions — bathrooms, kitchens, floors, and custom stone.",
};

const galleryPhotos = [
  {
    src: "/photos/big2.jpg",
    alt: "Bathroom tile installation with freestanding tub",
    label: "Bathroom",
  },
  {
    src: "/photos/big3.jpg",
    alt: "Flooring tile installation in progress",
    label: "Flooring",
  },
  {
    src: "/photos/big1.jpg",
    alt: "Kitchen tile backsplash installation",
    label: "Backsplash",
  },
];

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
        <div className="grid gap-4 sm:grid-cols-3 sm:gap-3">
          {galleryPhotos.map((item) => (
            <figure key={item.src}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                  priority
                />
              </div>
              <figcaption className="mt-3 text-base font-bold tracking-tight text-ink">
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
