import { NextResponse } from "next/server";
import {
  adminCookieOptions,
  checkAdminPassword,
  createAdminSessionToken,
} from "@/lib/quotes/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { password?: string };

  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!checkAdminPassword(body.password ?? "")) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const token = createAdminSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieOptions(token));
  return response;
}
