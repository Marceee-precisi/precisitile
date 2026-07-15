"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/LogoMark";
import { navLinks, site } from "@/lib/content";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const onHero = pathname === "/";
  const solid = scrolled || !onHero || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-stone-50/92 shadow-[0_1px_0_rgba(11,11,11,0.06)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark size={36} className="h-9 w-9 md:h-10 md:w-10" priority />
          <span className="flex flex-col leading-none">
            <span
              className={`text-[0.8rem] font-bold tracking-[0.12em] uppercase md:text-[0.9rem] ${
                solid ? "text-ink" : "text-white"
              }`}
            >
              {site.shortName} Tile
            </span>
            <span
              className={`mt-1 text-[0.58rem] font-medium tracking-[0.18em] uppercase ${
                solid ? "text-tile-gray" : "text-white/70"
              }`}
            >
              Solutions
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[0.72rem] font-semibold tracking-[0.16em] uppercase transition-colors ${
                  solid
                    ? active
                      ? "text-cyan"
                      : "text-ink/70 hover:text-ink"
                    : active
                      ? "text-cyan"
                      : "text-white/75 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={`relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden ${
            solid || open ? "text-ink" : "text-white"
          }`}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-px w-5 bg-current transition-transform ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-current transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-current transition-transform ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="border-t border-stone-200 bg-stone-50 px-5 py-6">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-2xl font-semibold tracking-wide text-ink uppercase"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
