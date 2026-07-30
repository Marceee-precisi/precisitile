import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import type { QuoteRecord } from "./types";

function tableName() {
  return process.env.QUOTES_TABLE || "";
}

function bucketName() {
  return process.env.QUOTES_BUCKET || "";
}

function region() {
  return process.env.AWS_REGION || process.env.QUOTES_AWS_REGION || "us-east-2";
}

/** Amplify SSR often has no instance-role credentials unless a compute role is wired.
 *  Prefer IAM user keys via env when present (Amplify env → .env.production). */
function awsClientOptions() {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  if (accessKeyId && secretAccessKey) {
    return {
      region: region(),
      credentials: {
        accessKeyId,
        secretAccessKey,
        ...(process.env.AWS_SESSION_TOKEN
          ? { sessionToken: process.env.AWS_SESSION_TOKEN }
          : {}),
      },
    };
  }
  return { region: region() };
}

function ddb() {
  return DynamoDBDocumentClient.from(new DynamoDBClient(awsClientOptions()));
}

function s3() {
  return new S3Client(awsClientOptions());
}

export function awsConfigured() {
  return Boolean(tableName() && bucketName());
}

export async function awsListQuotes() {
  const result = await ddb().send(
    new ScanCommand({
      TableName: tableName(),
    }),
  );
  const quotes = (result.Items ?? []) as QuoteRecord[];
  return quotes.sort((a, b) => b.receivedAt.localeCompare(a.receivedAt));
}

export async function awsGetQuote(id: string) {
  const result = await ddb().send(
    new GetCommand({
      TableName: tableName(),
      Key: { id },
    }),
  );
  return (result.Item as QuoteRecord | undefined) ?? null;
}

export async function awsSaveQuote(quote: QuoteRecord) {
  await ddb().send(
    new PutCommand({
      TableName: tableName(),
      Item: quote,
    }),
  );
  return quote;
}

export async function awsMarkRead(id: string) {
  const result = await ddb().send(
    new UpdateCommand({
      TableName: tableName(),
      Key: { id },
      UpdateExpression: "SET #status = :status",
      ExpressionAttributeNames: { "#status": "status" },
      ExpressionAttributeValues: { ":status": "read" },
      ReturnValues: "ALL_NEW",
    }),
  );
  return (result.Attributes as QuoteRecord | undefined) ?? null;
}

export async function awsSavePhoto(
  id: string,
  bytes: Buffer,
  contentType: string,
  originalName: string,
) {
  const ext = originalName.includes(".")
    ? originalName.slice(originalName.lastIndexOf(".")).toLowerCase()
    : contentType === "image/png"
      ? ".png"
      : contentType === "image/webp"
        ? ".webp"
        : ".jpg";
  const key = `quotes/${id}${ext}`;
  await s3().send(
    new PutObjectCommand({
      Bucket: bucketName(),
      Key: key,
      Body: bytes,
      ContentType: contentType,
    }),
  );
  return key;
}

export async function awsGetPhoto(key: string) {
  const result = await s3().send(
    new GetObjectCommand({
      Bucket: bucketName(),
      Key: key,
    }),
  );
  const bytes = Buffer.from(await result.Body!.transformToByteArray());
  return {
    bytes,
    contentType: result.ContentType || "application/octet-stream",
  };
}
