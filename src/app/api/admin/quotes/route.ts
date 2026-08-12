import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/quotes/auth";
import { deleteQuote, getQuote, listQuotes, markQuoteRead } from "@/lib/quotes/store";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const quotes = await listQuotes();
  return NextResponse.json({ quotes });
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: { id?: string };
  try {
    body = (await request.json()) as { id?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body.id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }

  const existing = await getQuote(body.id);
  if (!existing) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const updated = await markQuoteRead(body.id);
  return NextResponse.json({ quote: updated });
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: { id?: string };
  try {
    body = (await request.json()) as { id?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body.id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }

  const deleted = await deleteQuote(body.id);
  if (!deleted) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
