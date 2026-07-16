import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";
import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-stone-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8 md:py-16">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark size={48} className="h-12 w-12" />
            <div>
              <p className="text-sm font-bold tracking-[0.14em] text-white uppercase">
                {site.name}
              </p>
              <p className="mt-1 text-[0.65rem] font-medium tracking-[0.18em] text-tile-gray uppercase">
                {site.tagline}
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-stone-400">
            {site.description}
          </p>
        </div>

        <div>
          <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-cyan uppercase">
            Visit
          </p>
          <ul className="mt-4 space-y-2 text-sm text-stone-400">
            <li>
              <Link href="/quote" className="transition-colors hover:text-white">
                Request a quote
              </Link>
            </li>
            <li>
              <Link
                href="/gallery"
                className="transition-colors hover:text-white"
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition-colors hover:text-white">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-cyan uppercase">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm text-stone-400">
            <li>{site.serviceArea}</li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-white"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                className="transition-colors hover:text-white"
              >
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={site.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-stone-500 md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Licensed & insured · Lake Norman, NC</p>
        </div>
      </div>
    </footer>
  );
}
