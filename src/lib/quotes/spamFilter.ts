import OpenAI from "openai";

export type Classification =
  | "GENUINE_LARGE"
  | "GENUINE_SMALL"
  | "SPAM";

export async function classifyQuote(params: {
  name: string;
  email: string;
  roomType: string;
  squareFootage: string;
  message: string;
}): Promise<Classification> {
  if (!process.env.OPENAI_API_KEY) return "GENUINE_LARGE";

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `You are a classifier for a tile installation company's quote form.
A customer has submitted the following information. Classify it as one of:

- GENUINE_LARGE: A real homeowner or contractor requesting a quote for a 
  project that sounds like at least $1,000 in labor (e.g. full bathroom 
  remodel, kitchen floor, whole-room tile, large backsplash, epoxy garage 
  floor, etc.).
- GENUINE_SMALL: A real homeowner requesting a quote, but the project 
  sounds like it's under $1,000 in labor (e.g. single tile repair, regrout, 
  small patch, tiny backsplash under 15 sq ft).
- SPAM: Someone pitching their own services (SEO, marketing, web design, 
  lead generation, etc.) rather than requesting tile work.

Respond with ONLY one word: GENUINE_LARGE, GENUINE_SMALL, or SPAM.

Submission details:
- Name: ${params.name}
- Email: ${params.email}
- Project type: ${params.roomType}
- Square footage: ${params.squareFootage || "not provided"}
- Message: ${params.message}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 10,
    temperature: 0,
  });

  const result = response.choices[0]?.message?.content?.trim();
  if (
    result === "GENUINE_LARGE" ||
    result === "GENUINE_SMALL" ||
    result === "SPAM"
  ) {
    return result;
  }

  return "GENUINE_LARGE";
}
