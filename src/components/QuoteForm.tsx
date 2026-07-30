"use client";

import { FormEvent, useEffect, useState } from "react";
import { roomTypes } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

const initial = {
  name: "",
  email: "",
  phone: "",
  zip: "",
  roomType: roomTypes[0],
  squareFootage: "",
  message: "",
  company: "", // honeypot
  website: "", // honeypot
};

export function QuoteForm() {
  const [form, setForm] = useState(initial);
  const [photo, setPhoto] = useState<File | null>(null);
  const [formStartedAt, setFormStartedAt] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    setFormStartedAt(Date.now());
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const body = new FormData();
      Object.entries(form).forEach(([key, value]) => body.append(key, value));
      body.append("formStartedAt", String(formStartedAt));
      if (photo) body.append("photo", photo);

      const res = await fetch("/api/quote", {
        method: "POST",
        body,
      });
      const raw = await res.text();
      let data: { error?: string; detail?: string } = {};
      if (raw) {
        try {
          data = JSON.parse(raw) as { error?: string; detail?: string };
        } catch {
          throw new Error(
            `Server error (${res.status}). Please try again in a minute.`,
          );
        }
      }

      if (!res.ok) {
        throw new Error(
          data.error ||
            data.detail ||
            `Something went wrong (${res.status}).`,
        );
      }

      setStatus("success");
      setForm(initial);
      setPhoto(null);
      setFormStartedAt(Date.now());
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
        <p className="text-3xl font-bold tracking-tight text-ink">Thank you.</p>
        <p className="mt-3 max-w-md text-ink-muted leading-relaxed">
          We received your quote request and will follow up shortly — usually
          within one business day.
        </p>
        <button
          type="button"
          className="mt-8 text-[0.75rem] font-medium tracking-[0.16em] text-cyan uppercase underline-offset-4 hover:underline"
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
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(e) => update("website", e.target.value)}
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

      <label className="block text-[0.7rem] tracking-[0.14em] text-ink-muted uppercase">
        Project photo (optional)
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.jpg,.jpeg,.png,.webp,.heic"
          className={`${field} file:mr-4 file:border-0 file:bg-transparent file:text-sm file:font-medium`}
          onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
        />
        <span className="mt-2 block normal-case tracking-normal text-ink-muted/80">
          JPG, PNG, WEBP, or HEIC — up to 5MB. A picture of the space helps a
          lot.
        </span>
      </label>

      {status === "error" && (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-cyan px-6 py-4 text-[0.72rem] font-semibold tracking-[0.16em] text-ink uppercase transition-colors hover:bg-cyan-soft disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send quote request"}
      </button>
    </form>
  );
}
