# Precisi Tile — how this project works

Read this before asking how the site is structured. It covers languages, folders, pages, quotes/admin, and deploy.

## What you’re looking at

| Piece | Tech |
|--------|------|
| Framework | **Next.js 16** (App Router) |
| UI library | **React 19** |
| Language | **TypeScript** (`.ts` / `.tsx`) — JavaScript with types |
| Styling | **Tailwind CSS v4** + `globals.css` |
| Hosting | **AWS Amplify** → https://precisitile.com |
| Code hosting | **GitHub** `Marceee-precisi/precisitile` |
| Quotes (local) | Files in `.data/` |
| Quotes (live) | **DynamoDB** + **S3** (Ohio `us-east-2`) when env vars are set |

Mental model:

```text
You edit files on Mac
    → git push to GitHub
    → Amplify builds (amplify.yml)
    → live site updates
```

Local preview: `npm run dev` → http://localhost:3000

---

## Top-level folders / files

| Path | Meaning |
|------|---------|
| `src/` | **All app source code** — almost everything you edit lives here |
| `public/` | Static files served as-is (logo, SVGs). URL = `/logo.png` |
| `node_modules/` | Installed packages (never edit; created by `npm install`) |
| `.next/` | Build output (auto-generated; ignore) |
| `.data/` | **Local-only** quote storage + photo uploads (gitignored) |
| `.env.local` | Secrets for local dev (gitignored — never commit) |
| `.env.example` | Template of env var names (safe to commit) |
| `package.json` | Project name, scripts, dependencies |
| `package-lock.json` | Exact dependency versions |
| `next.config.ts` | Next.js settings (images, redirects `/book`→`/quote`) |
| `amplify.yml` | Amplify build steps + writing env vars into `.env.production` |
| `tsconfig.json` | TypeScript config (`@/` = `src/`) |
| `README.md` | Human quick start |
| `AGENTS.md` | Notes for AI coding agents |

---

## Inside `src/`

### `src/app/` — pages & APIs (file-based routing)

Next.js: **folder name = URL**.

| File / folder | URL / role |
|---------------|------------|
| `layout.tsx` | Shell for every page: header, footer, font, metadata |
| `page.tsx` | Home → `/` |
| `globals.css` | Global CSS + design tokens |
| `about/page.tsx` | `/about` |
| `gallery/page.tsx` | `/gallery` |
| `quote/page.tsx` | `/quote` (page chrome + copy) |
| `admin/page.tsx` | `/admin` login |
| `admin/quotes/page.tsx` | `/admin/quotes` dashboard |
| `api/quote/route.ts` | `POST /api/quote` — receives form, saves quote |
| `api/admin/...` | Login, logout, list quotes, serve photos |

`page.tsx` = UI page.  
`route.ts` = backend endpoint (runs on the server).

### `src/components/` — reusable UI pieces

| File | Role |
|------|------|
| `Header.tsx` / `Footer.tsx` | Site chrome |
| `QuoteForm.tsx` | Quote form fields + submit |
| `QuotesDashboard.tsx` | Admin list of quotes |
| `AdminLoginForm.tsx` | Admin password form |
| `ButtonLink.tsx` / `LogoMark.tsx` | Small shared UI |

Pages import components; components should not own routing.

### `src/lib/` — data & business logic (not UI)

| File | Role |
|------|------|
| `content.ts` | **Business copy**: phone, email, nav, services, reviews, gallery, room types |
| `quotes/types.ts` | Shape of a quote record |
| `quotes/store.ts` | Chooses AWS vs local storage |
| `quotes/local-store.ts` | Reads/writes `.data/quotes.json` + uploads |
| `quotes/aws-store.ts` | DynamoDB + S3 |
| `quotes/auth.ts` | Admin cookie / password check |

**First place to change phone/email/reviews:** `src/lib/content.ts`.

---

## How a page request works

1. Visitor opens `/quote`.
2. Next.js runs `src/app/quote/page.tsx` (server).
3. That page renders `<QuoteForm />` (client component — `"use client"`).
4. Layout wraps it with Header/Footer from `layout.tsx`.
5. Browser shows HTML/CSS/JS.

### How a quote submit works

```text
QuoteForm (browser)
  → POST /api/quote  (FormData: fields + optional photo)
  → api/quote/route.ts
       · honeypot + min fill time (bots)
       · validate fields
       · if QUOTES_TABLE + QUOTES_BUCKET set → DynamoDB + S3
       · else → .data/ on disk
       · optional Resend email
  → JSON { ok, id, store }
  → thank-you UI
```

Admin:

```text
/admin → password → cookie
/admin/quotes → list from store
photos via /api/admin/photos/[id]
```

---

## Languages & file extensions

| Extension | What it is |
|-----------|------------|
| `.tsx` | TypeScript + React UI (JSX) |
| `.ts` | TypeScript logic / API (no JSX) |
| `.css` | Styles |
| `.json` | Config / data |
| `.yml` | Amplify build config |
| `.mjs` | JS config modules (eslint, postcss) |

You do **not** write plain HTML files for pages — React components compile to HTML.

---

## Env vars (local vs live)

| Variable | Purpose |
|----------|---------|
| `ADMIN_PASSWORD` | `/admin` login |
| `ADMIN_SECRET` | Signs admin session cookie |
| `QUOTES_TABLE` | DynamoDB table name |
| `QUOTES_BUCKET` | S3 bucket for photos |
| `AWS_REGION` | Should be `us-east-2` (Ohio) |
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | IAM user keys so Amplify SSR can call DynamoDB/S3 (compute role often has no SDK credentials) |
| `RESEND_API_KEY` / `QUOTE_*` | Optional email on submit |

- **Local:** `.env.local`
- **Live:** Amplify Console → Environment variables  
  Plus `amplify.yml` copies them into `.env.production` so Next.js API routes can read them.

Without `QUOTES_TABLE` + `QUOTES_BUCKET`, app uses `.data/` (fine on Mac; **not durable** on Amplify).

---

## Git workflow (you run these)

```bash
cd ~/Projects/precisitile
git status
git add <files>
git commit -m "why you changed it"
git push origin main
```

Amplify auto-builds `main` → updates precisitile.com.

---

## Where to edit what

| Goal | Edit |
|------|------|
| Phone, email, services, reviews | `src/lib/content.ts` |
| Home page sections | `src/app/page.tsx` |
| Quote page headline/sidebar | `src/app/quote/page.tsx` |
| Form fields | `src/components/QuoteForm.tsx` |
| Quote save / bots / email | `src/app/api/quote/route.ts` |
| Colors / global look | `src/app/globals.css` |
| Logo image | `public/logo.png` |
| Redirects | `next.config.ts` |

---

## Current AWS quote setup (Ohio)

- Table: `precisitile-quotes` (`id` string key)
- Bucket: `precisitile-quotes-photos` (private)
- Amplify SSR **compute IAM role** needs Put/Get/Scan/Update on the table and Put/Get on `bucket/*`
- If submit fails after env wiring, it’s usually IAM on the **SSR compute role**, not the table region

---

## Commands cheat sheet

```bash
npm install          # install dependencies
npm run dev          # local site
npm run build        # production build (what Amplify runs)
npm run lint         # eslint
```
