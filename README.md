# Precisi Tile Solutions — Website

Custom Next.js website for [precisitile.com](https://precisitile.com). Built to replace WordPress with a modern, form-first site ready for AWS hosting.

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

## Quote form email (optional)

Create `.env.local`:

```
RESEND_API_KEY=re_xxx
QUOTE_TO_EMAIL=hello@precisitile.com
QUOTE_FROM_EMAIL=quotes@precisitile.com
```

Without these, submissions still succeed and are logged in the terminal so you can test the flow.

## Update business details

Edit `src/lib/content.ts` for phone, email, reviews, gallery images, and service area.

## Deploy to AWS (next step)

Recommended: **AWS Amplify Hosting** connected to this Git repo + custom domain `precisitile.com`.

1. Push this repo to GitHub
2. Amplify → New app → Host web app → connect repo
3. Build settings: Next.js (Amplify detects automatically)
4. Add domain `precisitile.com` / `www`
5. Add env vars for Resend when ready
