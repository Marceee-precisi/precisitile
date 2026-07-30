<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Precisi Tile agent notes

- Full context + **copy-paste AI starter prompt**: [ARCHITECTURE.md](./ARCHITECTURE.md) (top section).
- Business copy: `src/lib/content.ts`
- Quotes: `QuoteForm` → `api/quote` → `src/lib/quotes/*` (DynamoDB/S3 live; `.data/` local)
- Amplify env: `ACCESS_KEY_ID` / `SECRET_ACCESS_KEY` (not `AWS_*`); `amplify.yml` → `.env.production`
- Do not commit `.env.local` or `.data/`
