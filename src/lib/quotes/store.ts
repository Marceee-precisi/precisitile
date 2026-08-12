import { readFile } from "fs/promises";
import {
  awsConfigured,
  awsDeleteQuote,
  awsGetPhoto,
  awsGetQuote,
  awsListQuotes,
  awsMarkRead,
  awsSavePhoto,
  awsSaveQuote,
} from "./aws-store";
import {
  localDeleteQuote,
  localGetQuote,
  localListQuotes,
  localMarkRead,
  localPhotoPath,
  localSavePhoto,
  localSaveQuote,
} from "./local-store";
import type { QuoteRecord } from "./types";

export function usingAwsStore() {
  return awsConfigured();
}

export async function listQuotes() {
  return usingAwsStore() ? awsListQuotes() : localListQuotes();
}

export async function getQuote(id: string) {
  return usingAwsStore() ? awsGetQuote(id) : localGetQuote(id);
}

export async function saveQuote(quote: QuoteRecord) {
  return usingAwsStore() ? awsSaveQuote(quote) : localSaveQuote(quote);
}

export async function markQuoteRead(id: string) {
  return usingAwsStore() ? awsMarkRead(id) : localMarkRead(id);
}

export async function deleteQuote(id: string) {
  return usingAwsStore() ? awsDeleteQuote(id) : localDeleteQuote(id);
}

export async function saveQuotePhoto(
  id: string,
  bytes: Buffer,
  contentType: string,
  originalName: string,
) {
  return usingAwsStore()
    ? awsSavePhoto(id, bytes, contentType, originalName)
    : localSavePhoto(id, bytes, contentType, originalName);
}

export async function getQuotePhoto(key: string) {
  if (usingAwsStore()) {
    return awsGetPhoto(key);
  }
  const bytes = await readFile(localPhotoPath(key));
  const contentType = key.endsWith(".png")
    ? "image/png"
    : key.endsWith(".webp")
      ? "image/webp"
      : "image/jpeg";
  return { bytes, contentType };
}
