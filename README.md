# Nrityaswarupam Dance Academy — Website

A multi-page site for a classical Indian dance academy, built with **Astro** +
**Tailwind CSS** and a **Supabase** backend, using the *Heritage Grace* design
system (dark editorial "stage" aesthetic, crimson + temple-gold accents, Libre
Caslon Text + Manrope).

## Tech stack

- **Astro 5** — static marketing pages + on-demand server routes
- **Tailwind CSS 3** (compiled via PostCSS)
- **Supabase** — Postgres database, magic-link auth, and image storage
- **Admin dashboard** at `/admin` — staff manage classes, gallery, instructors, enquiries
- **Resend** — emails enquiry submissions (also stored in the DB)
- **Node adapter** — runs server routes locally; swap for Netlify/Vercel to deploy

## Project structure

```
src/
  components/    Nav, Footer
  layouts/       BaseLayout (public), AdminLayout (dashboard)
  pages/
    index, schedule, gallery, about, join   ← public site
    api/enquiry.ts                          ← enquiry endpoint
    admin/                                  ← protected dashboard (CRUD + uploads)
  lib/           supabase.ts, data.ts (+ fallback), seed.ts, storage.ts
  middleware.ts  protects /admin
  styles/global.css
supabase/        schema.sql, seed.sql       ← run these in Supabase
public/images/   logo.png
legacy/          original hand-written static HTML (reference)
```

## Develop

```bash
npm install
npm run dev      # http://localhost:4321  (admin at /admin)
npm run build    # production build → dist/
```

The site works **without** Supabase configured (it renders seed content). To
enable the database, admin login, and uploads, follow `TIER2_PLAN.md`.

## Setup (short version)

1. Create a free Supabase project; run `supabase/schema.sql` (and optional
   `supabase/seed.sql`) in its SQL Editor.
2. Copy `.env.example` → `.env`, set `PUBLIC_SUPABASE_URL` +
   `PUBLIC_SUPABASE_ANON_KEY` (and Resend keys for enquiry emails).
3. Visit `/admin`, sign in with a magic link, and manage content.

Full details, deployment, and the free keep-alive ping: **`TIER2_PLAN.md`**.
Non-technical editor guide: **`EDITING_GUIDE.md`**.
