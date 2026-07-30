"use client";

import { useRouter } from "next/navigation";
import type { QuoteRecord } from "@/lib/quotes/types";

export function QuotesDashboard({ quotes }: { quotes: QuoteRecord[] }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  async function markRead(id: string) {
    await fetch("/api/admin/quotes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-5xl px-5 pb-20 pt-24 md:px-8 md:pt-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[0.7rem] font-medium tracking-[0.22em] text-cyan uppercase">
            Admin
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-5xl">
            Quote requests
          </h1>
          <p className="mt-2 text-ink-muted">
            {quotes.length} total · private to you
          </p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="text-[0.72rem] font-semibold tracking-[0.14em] text-ink-muted uppercase underline-offset-4 hover:underline"
        >
          Log out
        </button>
      </div>

      {quotes.length === 0 ? (
        <p className="mt-12 border border-stone-200 bg-marble p-8 text-ink-muted">
          No quote requests yet. Submit one from{" "}
          <a href="/quote" className="text-cyan underline-offset-2 hover:underline">
            /quote
          </a>{" "}
          to test.
        </p>
      ) : (
        <ul className="mt-10 space-y-4">
          {quotes.map((quote) => (
            <li
              key={quote.id}
              className="border border-stone-200 bg-white p-5 md:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-ink">
                    {quote.name}
                    {quote.status === "new" && (
                      <span className="ml-3 align-middle text-[0.65rem] tracking-[0.16em] text-cyan uppercase">
                        New
                      </span>
                    )}
                  </p>
                  <p className="mt-1 text-sm text-ink-muted">
                    {new Date(quote.receivedAt).toLocaleString()} ·{" "}
                    {quote.roomType || "Project"} · ZIP {quote.zip}
                  </p>
                </div>
                {quote.status === "new" && (
                  <button
                    type="button"
                    onClick={() => markRead(quote.id)}
                    className="text-[0.68rem] font-semibold tracking-[0.14em] text-cyan uppercase underline-offset-4 hover:underline"
                  >
                    Mark read
                  </button>
                )}
              </div>

              <div className="mt-4 grid gap-2 text-sm text-ink-muted md:grid-cols-2">
                <p>
                  <span className="text-ink">Email:</span>{" "}
                  <a href={`mailto:${quote.email}`} className="hover:underline">
                    {quote.email}
                  </a>
                </p>
                <p>
                  <span className="text-ink">Phone:</span>{" "}
                  <a href={`tel:${quote.phone}`} className="hover:underline">
                    {quote.phone}
                  </a>
                </p>
                {quote.squareFootage && (
                  <p>
                    <span className="text-ink">Sq ft:</span>{" "}
                    {quote.squareFootage}
                  </p>
                )}
              </div>

              <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-ink">
                {quote.message}
              </p>

              {quote.photoKey && (
                <div className="mt-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/api/admin/photos/${quote.id}`}
                    alt={`Photo from ${quote.name}`}
                    className="max-h-80 w-full max-w-md object-cover"
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
