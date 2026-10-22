import type { Metadata } from "next";
import { QuotePageClient } from "./QuotePageClient";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a tile installation quote from Precisi Tile Solutions — bathrooms, kitchens, floors, and custom stone across Lake Norman.",
};

export default function QuotePage() {
  return <QuotePageClient />;
}
