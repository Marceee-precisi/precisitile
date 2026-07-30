# Precisi Tile — project guide + AI starter prompt- MARCELLO

Business: **Precisi Tile Solutions** (small NC LLC, Lake Norman / Charlotte tile contractor).  
Live site: **[https://precisitile.com](https://precisitile.com)**  
Repo: **[https://github.com/Marceee-precisi/precisitile](https://github.com/Marceee-precisi/precisitile)**  
Local path: `~/Projects/precisitile`

---

## COPY-PASTE PROMPT FOR NEW AI CHATS

Paste this at the **start** of every new chat (especially cheap / free models). Then ask your real question.

```text
You are helping me with Precisi Tile Solutions — a small construction/tile LLC website.

READ THIS CONTEXT FIRST. Do not re-ask for basics I already covered.

BUSINESS
- Company: Precisi Tile Solutions (Precisi), local LLC, Lake Norman / Charlotte NC
- Owner working on Mac; GitHub account: Marceee-precisi
- Live domain: precisitile.com (custom domain on AWS Amplify)
- Email is already configured on AWS; do not redo domain/email setup unless asked

STACK
- Next.js 16 App Router + React 19 + TypeScript + Tailwind CSS v4
- Code: ~/Projects/precisitile (clone of github.com/Marceee-precisi/precisitile)
- Hosting: AWS Amplify (region Ohio us-east-2) auto-deploys from GitHub branch main
- Quotes live storage: DynamoDB table precisitile-quotes + S3 bucket precisitile-quotes-photos
- Quotes local storage: .data/quotes.json + .data/uploads/ (dev only)
- Admin dashboard: /admin (password via ADMIN_PASSWORD)
- Amplify blocks env vars named AWS_* — we use ACCESS_KEY_ID and SECRET_ACCESS_KEY instead
- amplify.yml writes env vars into .env.production so Next.js API routes can read them at runtime

HOW CHANGES GO LIVE
Mac edit → git add/commit/push origin main → Amplify build → precisitile.com updates
Local preview: npm run dev → localhost:3000

IMPORTANT FILES
- Business copy (phone, email, reviews): src/lib/content.ts
- Home: src/app/page.tsx | Quote page: src/app/quote/page.tsx | Form: src/components/QuoteForm.tsx
- Quote API: src/app/api/quote/route.ts | Storage: src/lib/quotes/*
- Admin UI: src/app/admin/* | Auth: src/lib/quotes/auth.ts
- Full guide in repo: ARCHITECTURE.md — follow it; don’t invent a different architecture

RULES FOR YOU
- Prefer small, targeted edits; match existing style
- Never commit .env.local, secrets, or .data/
- Don’t enable paid Amplify Firewall/WAF unless I explicitly ask (I’m not paying for that yet)
- Bot protection is already in code (honeypots + min form time)
- Photo upload on quote form is optional (max 5MB)
- Timeline field was removed from the quote form on purpose
- If something fails on live Amplify, check: env vars → amplify.yml .env.production → IAM keys → Ohio region
- Ask before git commit/push unless I explicitly ask you to commit/push
- Keep answers short and practical; I already have ARCHITECTURE.md for deep structure

My request:
[PASTE WHAT YOU NEED HELP WITH HERE]
```

---



## Big picture (simple)

Three places, one website:


| Place           | What it is                      | Job                                               |
| --------------- | ------------------------------- | ------------------------------------------------- |
| **Your Mac**    | Folder `~/Projects/precisitile` | Edit code, run `npm run dev`, test                |
| **GitHub**      | `Marceee-precisi/precisitile`   | Saves every version of the code                   |
| **AWS Amplify** | Hosts the site                  | Builds from GitHub and serves **precisitile.com** |


```text
  [You edit on Mac]
         │
         │  git push
         ▼
  [GitHub repo]
         │
         │  Amplify watches main
         ▼
  [AWS Amplify build]
         │
         ▼
  [precisitile.com  +  DynamoDB quotes  +  S3 photos]
```

You are **not** editing the live site in a WordPress dashboard.  
You edit **files** → push → Amplify publishes.

---



## What language / tech is this?


| Name                            | Plain English                                        |
| ------------------------------- | ---------------------------------------------------- |
| **TypeScript** (`.ts` / `.tsx`) | JavaScript with types (catches mistakes earlier)     |
| **React**                       | UI building blocks (components)                      |
| **Next.js**                     | Framework that turns folders into pages + API routes |
| **Tailwind**                    | Utility CSS classes in the markup                    |
| **Node / npm**                  | Runs the app and installs packages                   |


You do **not** maintain separate `.html` files for each page.  
A file like `src/app/quote/page.tsx` **becomes** the `/quote` page.

---



## Folder map

```text
precisitile/
├── ARCHITECTURE.md      ← this guide + AI prompt
├── AGENTS.md            ← short notes for coding agents
├── README.md            ← quick start
├── amplify.yml          ← Amplify build + env injection
├── package.json         ← scripts & dependencies
├── next.config.ts       ← Next settings / redirects
├── public/              ← static files (/logo.png, etc.)
├── .env.example         ← list of env var NAMES (safe)
├── .env.local           ← your local secrets (NEVER commit)
├── .data/               ← local quotes/photos only (NEVER commit)
└── src/                 ← almost all real work
    ├── app/             ← pages + APIs (URLs)
    ├── components/      ← reusable UI pieces
    └── lib/             ← content + quote logic
```



### `src/app/` = URLs


| Path                            | URL                                 |
| ------------------------------- | ----------------------------------- |
| `src/app/page.tsx`              | `/` home                            |
| `src/app/about/page.tsx`        | `/about`                            |
| `src/app/gallery/page.tsx`      | `/gallery`                          |
| `src/app/quote/page.tsx`        | `/quote`                            |
| `src/app/admin/page.tsx`        | `/admin` login                      |
| `src/app/admin/quotes/page.tsx` | `/admin/quotes`                     |
| `src/app/api/quote/route.ts`    | `POST /api/quote`                   |
| `src/app/api/admin/...`         | admin APIs                          |
| `src/app/layout.tsx`            | header/footer wrapper for all pages |
| `src/app/globals.css`           | global look / colors                |


`page.tsx` = webpage.  
`route.ts` = server API (backend).

### `src/components/` = reusable UI


| File                              | Job                       |
| --------------------------------- | ------------------------- |
| `Header.tsx` / `Footer.tsx`       | Top/bottom of site        |
| `QuoteForm.tsx`                   | Quote form + photo upload |
| `QuotesDashboard.tsx`             | Admin list of requests    |
| `AdminLoginForm.tsx`              | Admin password form       |
| `ButtonLink.tsx` / `LogoMark.tsx` | Small shared pieces       |




### `src/lib/` = data & rules (not pretty UI)


| File                    | Job                                                                               |
| ----------------------- | --------------------------------------------------------------------------------- |
| `content.ts`            | **Phone, email, services, reviews, gallery text** — edit business info here first |
| `quotes/types.ts`       | Shape of a saved quote                                                            |
| `quotes/store.ts`       | Picks AWS storage vs local files                                                  |
| `quotes/local-store.ts` | `.data/` on your Mac                                                              |
| `quotes/aws-store.ts`   | DynamoDB + S3 on AWS                                                              |
| `quotes/auth.ts`        | Admin login cookie / password                                                     |


---



## How AWS connects (clearly)



### Services you use


| AWS service           | What it does for Precisi                                                    |
| --------------------- | --------------------------------------------------------------------------- |
| **Amplify Hosting**   | Builds the Next.js app and serves precisitile.com                           |
| **Route 53 / domain** | Domain already set up (precisitile.com)                                     |
| **SES / email**       | Business email already configured — leave alone unless asked                |
| **DynamoDB**          | Database table of quote requests                                            |
| **S3**                | Private photo files from quote form                                         |
| **IAM**               | Permission “badge” (user + access keys) so Amplify can write to DynamoDB/S3 |


Region for quotes: **US East (Ohio) =** `us-east-2`  
AWS account id used in ARNs: `946445280418`

### Live quote path

```text
Customer fills /quote on precisitile.com
        │
        ▼
Next.js API  POST /api/quote   (runs inside Amplify)
        │
        ├─► DynamoDB  table: precisitile-quotes   (text fields)
        └─► S3        bucket: precisitile-quotes-photos  (optional photo)
        │
        ▼
You open /admin  → see requests (password protected)
```



### Why access keys exist

Amplify’s server (SSR) often **cannot** auto-login to AWS SDK (“no credentials”).  
So we created an IAM user with a small policy and put keys in Amplify env vars:


| Amplify env var                 | Meaning                                              |
| ------------------------------- | ---------------------------------------------------- |
| `QUOTES_TABLE`                  | `precisitile-quotes`                                 |
| `QUOTES_BUCKET`                 | `precisitile-quotes-photos`                          |
| `ACCESS_KEY_ID`                 | IAM access key (Amplify forbids `AWS_ACCESS_KEY_ID`) |
| `SECRET_ACCESS_KEY`             | IAM secret (Amplify forbids `AWS_SECRET_ACCESS_KEY`) |
| `ADMIN_PASSWORD`                | Login for `/admin`                                   |
| `ADMIN_SECRET`                  | Signs the admin cookie                               |
| optional `RESEND_*` / `QUOTE_*` | Email notifications (optional)                       |


**Critical Amplify quirk:** console env vars are **not** automatically visible to Next.js API routes.  
`amplify.yml` copies them into `.env.production` during build so the live API can read them.

### Local vs live storage


| Where you run                       | Storage                |
| ----------------------------------- | ---------------------- |
| Mac (`npm run dev`) without AWS env | `.data/` files on disk |
| Live Amplify with table+bucket+keys | DynamoDB + S3          |


Photo limit: **5MB**, types JPG/PNG/WEBP/HEIC.  
Bot protection: hidden honeypot fields + form must not submit in under ~2.5 seconds.

---



## Quote + admin flow (detail)

1. Visitor opens `/quote` → `quote/page.tsx` + `QuoteForm`.
2. Submit → browser `POST /api/quote` with FormData (fields + optional photo).
3. API checks honeypots / timing / required fields.
4. Saves via `src/lib/quotes/store.ts` → AWS or local.
5. Returns `{ ok, id, store: "aws" | "local" }`.
6. You review at `/admin` → `/admin/quotes`.

`/book` and `/contact` redirect to `/quote` (`next.config.ts`).

---



## Git commands (you can run these yourself)

```bash
cd ~/Projects/precisitile

git status                 # what changed
git diff                   # exact changes
git add path/to/file       # stage
git commit -m "why"        # save snapshot
git push origin main       # send to GitHub → Amplify deploys

git pull origin main       # get latest
```

Never commit: `.env.local`, real secrets, `.data/`.

---



## Where to edit what


| Goal                            | File                           |
| ------------------------------- | ------------------------------ |
| Phone, email, reviews, services | `src/lib/content.ts`           |
| Home page                       | `src/app/page.tsx`             |
| Quote page words / sidebar      | `src/app/quote/page.tsx`       |
| Form fields / photo UI          | `src/components/QuoteForm.tsx` |
| Save logic / bots / email       | `src/app/api/quote/route.ts`   |
| Look & colors                   | `src/app/globals.css`          |
| Logo                            | `public/logo.png`              |


---



## Commands

```bash
npm install       # install packages
npm run dev       # local website
npm run build     # production build (Amplify does this)
npm run lint      # check code style
```

---



## Decisions already made (don’t reopen unless asked)

- No paid Amplify Firewall/WAF for now — security in code (honeypot + timing).
- Quote form has optional photo; no “preferred timeline” field.
- Dashboard is on the same site at `/admin` (hosted by Amplify = “on AWS”).
- Durable live quotes = DynamoDB + S3 in **Ohio**, with Amplify-safe `ACCESS_KEY_ID` / `SECRET_ACCESS_KEY`.

---



## If something breaks (checklist)

1. Did Amplify build finish green after your push?
2. Env vars present in Amplify (including `ACCESS_KEY_ID` / `SECRET_ACCESS_KEY`)?
3. Did a **new** deploy happen after changing env vars? (needed so `amplify.yml` rewrites `.env.production`)
4. DynamoDB table + S3 bucket in **us-east-2**?
5. Submit response: look for `"store":"aws"` on success, or `detail` error message on failure.
6. IAM user still allowed Put/Get/Scan/Update on the table and Put/Get on the bucket?

