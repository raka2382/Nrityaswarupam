# Tier 2 — Architecture & Setup (Supabase)

The site is an **Astro** app with a **Supabase** backend providing the database,
admin login, and image storage. Public pages read from the database (with a safe
fallback to seed content), and an admin dashboard lets staff manage everything.

## Decisions

- **Enquiries only** (no online booking / capacity).
- **Payments: later.**
- **Astro** frontend + **Supabase** backend (free tier).
- **Magic-link** admin login.

## What runs where

| Concern | Implementation |
| --- | --- |
| Home / Join (marketing) | Static HTML (prerendered) |
| Schedule / Gallery / About | Server-rendered, read from Supabase (fallback to seed) |
| Admin dashboard (`/admin`) | Server-rendered, protected by Supabase Auth |
| Login | Magic link (`/admin/login`) |
| Enquiries | `/api/enquiry` → stored in Supabase **and** emailed via Resend |
| Image uploads | Supabase Storage (`media` bucket) |

Until Supabase keys are set, the public site still works using seed data
(`src/lib/seed.ts`), and the admin area shows a "connect Supabase" notice.

## One-time setup

### 1. Create the Supabase project
1. Sign up at https://supabase.com → **New project** (free tier).
2. In **SQL Editor**, run `supabase/schema.sql` (creates tables, security rules,
   and the `media` storage bucket).
3. Optionally run `supabase/seed.sql` to load the current starter content.

### 2. Connect the app
From **Settings → API**, copy the **Project URL** and **anon public** key into
`.env` (copy from `.env.example`):

```
PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

Restart `npm run dev`.

### 3. Restrict admin access (important)
By default Supabase lets any email self-register, so lock it down:
1. **Supabase → Authentication → Providers → Email → turn OFF "Allow new users to
   sign up".** Now only pre-created users can ever sign in.
2. **Add your admins:** Authentication → Users → **Add user** (one per staff email).
3. The login form already uses `shouldCreateUser: false`, so it can never create
   an account — unknown emails simply get no link.
4. *(Optional extra layer)* set `ADMIN_EMAILS="you@x.com,staff@y.com"` in the
   environment — only those emails can enter `/admin`, even if a stray account
   exists.

> Magic-link emails: Supabase sends them automatically. For production volume,
> configure a custom SMTP sender in Supabase Auth settings.

### 4. Enquiry emails (optional)
Add a Resend key so enquiries are emailed (they're stored in the DB regardless):
```
RESEND_API_KEY=...
ENQUIRY_TO_EMAIL=hello@nrityaswarupam.com
ENQUIRY_FROM_EMAIL=Nrityaswarupam <onboarding@resend.dev>
```

## The admin dashboard (`/admin`)

- **Classes** — full add/edit/delete; drives the Schedule page + its filters.
- **Gallery** — add/edit/delete photos with **file upload** to Supabase Storage.
- **Instructors** — add/edit/delete with **photo upload**.
- **Enquiries** — read and delete submissions.

## Free-tier "pause" + keep-alive

Supabase pauses a free project after ~7 days with **zero** requests. A daily
keep-alive ping avoids this. A ready-made GitHub Action is included at
`.github/workflows/keepalive.yml` — add two repository secrets
(`SUPABASE_URL`, `SUPABASE_ANON_KEY`) and it pings the database once a day.
(Or upgrade to Supabase Pro to remove auto-pause entirely.)

## Deployment

Currently uses the **Node adapter**. To deploy:
- **Netlify:** `npm i @astrojs/netlify`, set adapter to `netlify()`.
- **Vercel:** `npm i @astrojs/vercel`, set adapter to `vercel()`.
Set the same env vars in the host dashboard. Static pages serve from the CDN;
the schedule/gallery/about/admin/api routes run as serverless functions.

## Future (Tier 3)

- **Bookings** with capacity + confirmation emails → add a `bookings` table +
  an enquiry-style flow that decrements seats.
- **Payments** → Razorpay/Stripe via a serverless webhook that writes a
  `payments` row.
- **Student accounts** → Supabase Auth (separate role from admins).
