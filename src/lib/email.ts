import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

/** Amplify blocks env vars named AWS_*. Use ACCESS_KEY_ID / SECRET_ACCESS_KEY there. */
function sesClient() {
  const region =
    process.env.AWS_REGION || process.env.QUOTES_AWS_REGION || "us-east-2";
  const accessKeyId =
    process.env.ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey =
    process.env.SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;
  const sessionToken =
    process.env.SESSION_TOKEN || process.env.AWS_SESSION_TOKEN;

  if (accessKeyId && secretAccessKey) {
    return new SESClient({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
        ...(sessionToken ? { sessionToken } : {}),
      },
    });
  }

  return new SESClient({ region });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseEmailList(value: string | undefined, fallback: string[]) {
  const parsed = (value ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
  return parsed.length > 0 ? parsed : fallback;
}

interface SendQuoteEmailsInput {
  name: string;
  email: string;
  phone: string;
  details: string;
  photoUrls?: string[];
}

export async function sendQuoteConfirmationEmails({
  name,
  email,
  phone,
  details,
  photoUrls = [],
}: SendQuoteEmailsInput) {
  const fromEmail =
    process.env.QUOTE_FROM_EMAIL?.trim() || "admin@precisitile.com";
  const toEmails = parseEmailList(process.env.QUOTE_TO_EMAIL, [
    "admin@precisitile.com",
  ]);

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeDetails = escapeHtml(details);

  const photosHtml =
    photoUrls.length > 0
      ? `<p style="margin-top: 15px;"><strong>Uploaded Photos (${photoUrls.length}):</strong></p>
         <ul>${photoUrls
           .map(
             (url) =>
               `<li><a href="${escapeHtml(url)}" target="_blank">View Photo in S3</a></li>`,
           )
           .join("")}</ul>`
      : `<p style="margin-top: 15px; color: #6b7280;">No photos uploaded.</p>`;

  const ownerAlertCommand = new SendEmailCommand({
    Source: fromEmail,
    Destination: { ToAddresses: toEmails },
    Message: {
      Subject: { Data: `NEW LEAD: ${name} - Precisi Quote Request` },
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #059669; margin-top: 0;">New Quote Request Received!</h2>
              <p><strong>Customer Name:</strong> ${safeName}</p>
              <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${safePhone}">${safePhone}</a></p>
              <p><strong>Project Details:</strong></p>
              <div style="background: #f3f4f6; padding: 12px; border-radius: 6px; white-space: pre-wrap;">${safeDetails}</div>
              ${photosHtml}
              <p style="margin-top: 20px;"><a href="https://precisitile.com/admin/quotes">Open quotes dashboard</a></p>
            </div>
          `,
        },
      },
    },
  });

  await sesClient().send(ownerAlertCommand);
}

/** Build an S3 object URL for email links (bucket may still require IAM to open). */
export function quotePhotoPublicUrl(photoKey: string) {
  const bucket = process.env.QUOTES_BUCKET || "";
  const region =
    process.env.AWS_REGION || process.env.QUOTES_AWS_REGION || "us-east-2";
  if (!bucket) return null;
  return `https://${bucket}.s3.${region}.amazonaws.com/${photoKey}`;
}
