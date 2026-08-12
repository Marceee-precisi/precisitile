import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import {
  quotePhotoPublicUrl,
  sendQuoteConfirmationEmails,
} from "@/lib/email";
import { sendQuoteAlertSms } from "@/lib/sms";
import { saveQuote, saveQuotePhoto, usingAwsStore } from "@/lib/quotes/store";
import type { QuoteRecord } from "@/lib/quotes/types";

export const runtime = "nodejs";

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);

export async function POST(request: Request) {
  try {
    let form: FormData;

    try {
      form = await request.formData();
    } catch {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    // Honeypots — bots fill hidden fields; real users never see them
    const company = String(form.get("company") ?? "");
    const website = String(form.get("website") ?? "");
    if (company || website) {
      return NextResponse.json({ ok: true });
    }

    // Reject forms submitted impossibly fast (typical bot behavior)
    const startedAt = Number(form.get("formStartedAt") ?? 0);
    if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2500) {
      return NextResponse.json({ ok: true });
    }

    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const zip = String(form.get("zip") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const roomType = String(form.get("roomType") ?? "").trim();
    const squareFootage = String(form.get("squareFootage") ?? "").trim();

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

    const id = randomUUID();
    let photoKey: string | undefined;
    let photoContentType: string | undefined;
    const preferAws = usingAwsStore();

    const photo = form.get("photo");
    if (photo instanceof File && photo.size > 0) {
      if (photo.size > MAX_PHOTO_BYTES) {
        return NextResponse.json(
          { error: "Photo must be 5MB or smaller." },
          { status: 400 },
        );
      }
      if (!ALLOWED_TYPES.has(photo.type)) {
        return NextResponse.json(
          { error: "Photo must be JPG, PNG, WEBP, or HEIC." },
          { status: 400 },
        );
      }

      const bytes = Buffer.from(await photo.arrayBuffer());
      try {
        photoKey = await saveQuotePhoto(id, bytes, photo.type, photo.name);
        photoContentType = photo.type;
      } catch (err) {
        console.error("[quote-photo-failed]", err);
        return NextResponse.json(
          {
            error:
              "Could not upload photo. Check S3 bucket name, region (Ohio), and Amplify SSR IAM role.",
            detail: err instanceof Error ? err.message : String(err),
            store: preferAws ? "aws" : "local",
          },
          { status: 500 },
        );
      }
    }

    const quote: QuoteRecord = {
      id,
      name,
      email,
      phone,
      zip,
      roomType,
      squareFootage,
      message,
      photoKey,
      photoContentType,
      receivedAt: new Date().toISOString(),
      status: "new",
    };

    try {
      await saveQuote(quote);
    } catch (err) {
      console.error("[quote-save-failed]", err);
      return NextResponse.json(
        {
          error:
            "Could not save quote. Check DynamoDB table, region (Ohio), and Amplify SSR IAM role.",
          detail: err instanceof Error ? err.message : String(err),
          store: preferAws ? "aws" : "local",
        },
        { status: 500 },
      );
    }

    const store = preferAws ? "aws" : "local";
    console.info("[quote-request]", {
      id: quote.id,
      name: quote.name,
      email: quote.email,
      hasPhoto: Boolean(photoKey),
      store,
    });

    const details = [
      `ZIP: ${quote.zip}`,
      `Project: ${quote.roomType || "—"}`,
      `Sq ft: ${quote.squareFootage || "—"}`,
      "",
      quote.message,
    ].join("\n");

    const photoUrls = photoKey
      ? ([quotePhotoPublicUrl(photoKey)].filter(Boolean) as string[])
      : [];

    try {
      await sendQuoteConfirmationEmails({
        name,
        email,
        phone,
        details,
        photoUrls,
      });
    } catch (emailError) {
      console.error("AWS SES Email dispatch failed:", emailError);
      // Keep non-blocking so quote submission succeeds even if email fails
    }

    try {
      await sendQuoteAlertSms(name);
    } catch (smsError) {
      console.error("AWS SNS SMS dispatch failed:", smsError);
    }

    return NextResponse.json({ ok: true, id, store });
  } catch (err) {
    console.error("[quote-unhandled]", err);
    return NextResponse.json(
      {
        error: "Unexpected server error.",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }
}
