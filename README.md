# Precisi Tile Solutions — Website

Custom Next.js website for [precisitile.com](https://precisitile.com). Built to replace WordPress with a modern, form-first site ready for AWS hosting.

**How the project is built (folders, languages, quotes, deploy):** see **[ARCHITECTURE.md](./ARCHITECTURE.md)**.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Purpose |
|--------|---------|
| `/` | Home — brand hero, services, reviews, gallery preview |
| `/quote` | Request a quote form |
| `/book` | Consultation scheduler (Calendly/Cal.com placeholder) |
| `/gallery` | Project gallery |
| `/about` | About Juan & the company |
| `/contact` | Direct contact info |
| `/admin` | Private quote dashboard (password) |

## Quote requests + admin dashboard

Submissions are saved and viewable at **`/admin`** (password protected).

Local default password: `precisi-local` (set `ADMIN_PASSWORD` in `.env.local`).

- Locally, quotes/photos store under `.data/`
- On Amplify, set `QUOTES_TABLE` + `QUOTES_BUCKET` so data lives in DynamoDB + S3 (required for a durable live dashboard)

Bot protection: hidden honeypot fields + minimum form fill time.

## Quote form email (optional)

Create `.env.local`:

```
RESEND_API_KEY=re_xxx
QUOTE_TO_EMAIL=hello@precisitile.com
QUOTE_FROM_EMAIL=quotes@precisitile.com
ADMIN_PASSWORD=your-strong-password
ADMIN_SECRET=long-random-string
```

Without Resend keys, submissions still save to the dashboard.

## Update business details

Edit `src/lib/content.ts` for phone, email, reviews, gallery images, and service area.

## Deploy to AWS (next step)

Recommended: **AWS Amplify Hosting** connected to this Git repo + custom domain `precisitile.com`.

1. Push this repo to GitHub
2. Amplify → New app → Host web app → connect repo
3. Build settings: Next.js (Amplify detects automatically)
4. Add domain `precisitile.com` / `www`
5. Add env vars for Resend when ready
