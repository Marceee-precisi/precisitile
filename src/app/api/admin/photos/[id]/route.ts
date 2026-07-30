import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/quotes/auth";
import { getQuote, getQuotePhoto } from "@/lib/quotes/store";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const quote = await getQuote(id);
  if (!quote?.photoKey) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const photo = await getQuotePhoto(quote.photoKey);
  return new NextResponse(new Uint8Array(photo.bytes), {
    headers: {
      "Content-Type": photo.contentType,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
