import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

/** Amplify blocks env vars named AWS_*. Use ACCESS_KEY_ID / SECRET_ACCESS_KEY there. */
function snsClient() {
  const region =
    process.env.AWS_REGION || process.env.QUOTES_AWS_REGION || "us-east-2";
  const accessKeyId =
    process.env.ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey =
    process.env.SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;
  const sessionToken =
    process.env.SESSION_TOKEN || process.env.AWS_SESSION_TOKEN;

  if (accessKeyId && secretAccessKey) {
    return new SNSClient({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
        ...(sessionToken ? { sessionToken } : {}),
      },
    });
  }

  return new SNSClient({ region });
}

export async function sendQuoteAlertSms(name: string) {
  const phone = process.env.QUOTE_ALERT_PHONE?.trim();
  if (!phone) return;

  await snsClient().send(
    new PublishCommand({
      PhoneNumber: phone,
      Message: `New Precisi quote from ${name}. Check cisitile.com or precisitile.com/admin/quotes`,
    }),
  );
}
