import { NextResponse } from "next/server";

type QuoteBody = {
  name?: string;
  email?: string;
  phone?: string;
  zip?: string;
  roomType?: string;
  squareFootage?: string;
  timeline?: string;
  message?: string;
  company?: string;
};

export async function POST(request: Request) {
  let body: QuoteBody;

  try {
    body = (await request.json()) as QuoteBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — bots fill this; humans never see it
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const zip = body.zip?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !phone || !zip || !message) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const payload = {
    name,
    email,
    phone,
    zip,
    roomType: body.roomType?.trim() ?? "",
    squareFootage: body.squareFootage?.trim() ?? "",
    timeline: body.timeline?.trim() ?? "",
    message,
    receivedAt: new Date().toISOString(),
  };

  // Wire RESEND_API_KEY + QUOTE_TO_EMAIL later for real inbox delivery.
  // For now, log so you can verify submissions while building.
  console.info("[quote-request]", payload);

  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.QUOTE_TO_EMAIL;

  if (resendKey && toEmail) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.QUOTE_FROM_EMAIL || "quotes@precisitile.com",
          to: [toEmail],
          subject: `New quote request — ${name}`,
          text: [
            `Name: ${payload.name}`,
            `Email: ${payload.email}`,
            `Phone: ${payload.phone}`,
            `ZIP: ${payload.zip}`,
            `Project: ${payload.roomType}`,
            `Sq ft: ${payload.squareFootage || "—"}`,
            `Timeline: ${payload.timeline || "—"}`,
            "",
            payload.message,
          ].join("\n"),
        }),
      });

      if (!res.ok) {
        console.error("[quote-email-failed]", await res.text());
      }
    } catch (err) {
      console.error("[quote-email-error]", err);
    }
  }

  return NextResponse.json({ ok: true });
}
