import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { QuotesDashboard } from "@/components/QuotesDashboard";
import { isAdminAuthenticated } from "@/lib/quotes/auth";
import { listQuotes } from "@/lib/quotes/store";

export const metadata: Metadata = {
  title: "Quote requests",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminQuotesPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin");
  }

  const quotes = await listQuotes();
  return <QuotesDashboard quotes={quotes} />;
}
