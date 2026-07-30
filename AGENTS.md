<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Precisi Tile agent notes

- Project guide for humans + agents: **[ARCHITECTURE.md](./ARCHITECTURE.md)** — read it before re-explaining structure.
- Business copy (phone, email, reviews, room types): `src/lib/content.ts`
- Quote pipeline: `src/components/QuoteForm.tsx` → `src/app/api/quote/route.ts` → `src/lib/quotes/*`
- Live quotes need Amplify env + `amplify.yml` `.env.production` injection + SSR compute IAM (Ohio `us-east-2`)
- Do not commit `.env.local` or `.data/`
