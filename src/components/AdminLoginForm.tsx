"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Login failed.");
      router.push("/admin/quotes");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md space-y-5">
      <label className="block text-[0.7rem] tracking-[0.14em] text-ink-muted uppercase">
        Admin password
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full border border-stone-200 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-lake"
          autoComplete="current-password"
        />
      </label>
      {error && (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="bg-cyan px-6 py-3 text-[0.72rem] font-semibold tracking-[0.16em] text-ink uppercase disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Open dashboard"}
      </button>
    </form>
  );
}
