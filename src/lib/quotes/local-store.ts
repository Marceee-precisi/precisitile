import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { QuoteRecord } from "./types";

const DATA_DIR = path.join(process.cwd(), ".data");
const QUOTES_FILE = path.join(DATA_DIR, "quotes.json");
const UPLOADS_DIR = path.join(DATA_DIR, "uploads");

async function ensureStore() {
  await mkdir(UPLOADS_DIR, { recursive: true });
  try {
    await readFile(QUOTES_FILE, "utf8");
  } catch {
    await writeFile(QUOTES_FILE, "[]", "utf8");
  }
}

async function readAll(): Promise<QuoteRecord[]> {
  await ensureStore();
  const raw = await readFile(QUOTES_FILE, "utf8");
  return JSON.parse(raw) as QuoteRecord[];
}

async function writeAll(quotes: QuoteRecord[]) {
  await ensureStore();
  await writeFile(QUOTES_FILE, JSON.stringify(quotes, null, 2), "utf8");
}

export async function localListQuotes() {
  const quotes = await readAll();
  return quotes.sort((a, b) => b.receivedAt.localeCompare(a.receivedAt));
}

export async function localGetQuote(id: string) {
  const quotes = await readAll();
  return quotes.find((q) => q.id === id) ?? null;
}

export async function localSaveQuote(quote: QuoteRecord) {
  const quotes = await readAll();
  quotes.unshift(quote);
  await writeAll(quotes);
  return quote;
}

export async function localMarkRead(id: string) {
  const quotes = await readAll();
  const idx = quotes.findIndex((q) => q.id === id);
  if (idx === -1) return null;
  quotes[idx] = { ...quotes[idx], status: "read" };
  await writeAll(quotes);
  return quotes[idx];
}

export async function localSavePhoto(
  id: string,
  bytes: Buffer,
  contentType: string,
  originalName: string,
) {
  await ensureStore();
  const ext =
    path.extname(originalName).toLowerCase() ||
    (contentType === "image/png"
      ? ".png"
      : contentType === "image/webp"
        ? ".webp"
        : ".jpg");
  const key = `${id}${ext}`;
  await writeFile(path.join(UPLOADS_DIR, key), bytes);
  return key;
}

export function localPhotoPath(key: string) {
  return path.join(UPLOADS_DIR, key);
}
