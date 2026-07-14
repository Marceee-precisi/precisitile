"use client";

import { FormEvent, useState } from "react";
import { roomTypes } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

const initial = {
  name: "",
  email: "",
  phone: "",
  zip: "",
  roomType: roomTypes[0],
  squareFootage: "",
  timeline: "",
  message: "",
  company: "", // honeypot
};

export function QuoteForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setForm(initial);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  function update(field: keyof typeof initial, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  if (status === "success") {
    return (
      <div className="border border-stone-200 bg-marble px-6 py-10 md:px-10">
        <p className="font-display text-3xl text-ink">Thank you.</p>
        <p className="mt-3 max-w-md text-ink-muted leading-relaxed">
          We received your quote request and will follow up shortly — usually
          within one business day.
        </p>
        <button
          type="button"
          className="mt-8 text-[0.75rem] font-medium tracking-[0.16em] text-lake uppercase underline-offset-4 hover:underline"
          onClick={() => setStatus("idle")}
        >
          Submit another request
        </button>
      </div>
    );
  }

  const field =
    "mt-2 w-full border border-stone-200 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted/50 focus:border-lake";

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <input
        type="text"
        name="company"
        value={form.company}
        onChange={(e) => update("company", e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <label className="block text-[0.7rem] tracking-[0.14em] text-ink-muted uppercase">
          Full name *
          <input
            required
            className={field}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            autoComplete="name"
          />
        </label>
        <label className="block text-[0.7rem] tracking-[0.14em] text-ink-muted uppercase">
          Email *
          <input
            required
            type="email"
            className={field}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            autoComplete="email"
          />
        </label>
        <label className="block text-[0.7rem] tracking-[0.14em] text-ink-muted uppercase">
          Phone *
          <input
            required
            type="tel"
            className={field}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            autoComplete="tel"
          />
        </label>
        <label className="block text-[0.7rem] tracking-[0.14em] text-ink-muted uppercase">
          ZIP code *
          <input
            required
            className={field}
            value={form.zip}
            onChange={(e) => update("zip", e.target.value)}
            autoComplete="postal-code"
          />
        </label>
        <label className="block text-[0.7rem] tracking-[0.14em] text-ink-muted uppercase">
          Project type *
          <select
            className={field}
            value={form.roomType}
            onChange={(e) => update("roomType", e.target.value)}
          >
            {roomTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-[0.7rem] tracking-[0.14em] text-ink-muted uppercase">
          Approx. square footage
          <input
            className={field}
            value={form.squareFootage}
            onChange={(e) => update("squareFootage", e.target.value)}
            placeholder="e.g. 80"
          />
        </label>
      </div>

      <label className="block text-[0.7rem] tracking-[0.14em] text-ink-muted uppercase">
        Preferred timeline
        <input
          className={field}
          value={form.timeline}
          onChange={(e) => update("timeline", e.target.value)}
          placeholder="e.g. Within 4–6 weeks"
        />
      </label>

      <label className="block text-[0.7rem] tracking-[0.14em] text-ink-muted uppercase">
        Tell us about the project *
        <textarea
          required
          rows={5}
          className={`${field} resize-y`}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Materials in mind, existing conditions, design goals…"
        />
      </label>

      {status === "error" && (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-lake px-6 py-4 text-[0.75rem] font-medium tracking-[0.16em] text-white uppercase transition-colors hover:bg-lake-deep disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send quote request"}
      </button>
    </form>
  );
}
