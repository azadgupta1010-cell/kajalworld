# Kajalworld — Kajal Gupta & Daya Sagar Wedding

Premium cinematic Indian wedding website + digital memory platform.
**Next.js 15 (App Router) · TypeScript · Tailwind · Framer Motion · Supabase.**

Wedding: **4 December 2026** · Timezone **Asia/Kolkata** · Domain: **kajalworld.in**

---

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in values (see below)
npm run dev                  # http://localhost:3000
npm run build                # production build
npm run start                # serve the production build
npm run typecheck            # types only
npm run test                 # vitest
```

The **entire public experience runs with no backend** (intro, invitation,
events, countdown, story, gallery preview, travel). Backend-powered features
(RSVP submit, uploads, guestbook, admin) detect whether Supabase is configured
and show a friendly "coming soon / enable soon" state instead of faking success.

---

## Project status (phased build)

- **Phase 1 — DONE & verified:** design system, cinematic envelope intro +
  replay + reduced-motion + static fallback, invitation reveal, homepage,
  live countdown, event schedule, event detail pages, travel/directions,
  gallery + lightbox, site nav, RSVP/guestbook/upload UIs (gated), admin gate.
  `npm run build` (24 routes) and `npm run test` (9 tests) pass.
- **Phase 2 — scaffolded, needs your Supabase project:** DB schema + RLS +
  event seed migrations are written (`supabase/migrations`). Admin auth gate is
  live server-side. RSVP/guestbook API routes validate input and are ready to
  wire to the DB.
- **Phases 3–5 — planned:** storage/QR uploads/moderation/quotas, guestbook +
  Live Wedding Wall + memory archive, security/perf/a11y hardening + deploy.

See the in-repo plan and each phase report for details.

---

## Environment variables

Copy `.env.example` to `.env.local`. **Never commit `.env.local`.**

| Var | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | public | Anon key (RLS-protected) |
| `SUPABASE_SERVICE_ROLE_KEY` | **server only** | Privileged ops (moderation, quotas). Never prefix with `NEXT_PUBLIC`. |
| `NEXT_PUBLIC_SITE_URL` | public | Absolute site URL for links/QRs |
| `ADMIN_ALLOWED_EMAILS` | server only | Comma-separated admin allowlist |

---

## Edit wedding details

All personal content lives in `src/config/weddingConfig.ts` (selectable HTML,
nothing baked into images). Items marked **"To be confirmed"** / `draft: true`
render a visible note instead of invented data.

**Still needs confirmation from the couple/family:**
- Tilak venue & time
- Mehndi / Haldi exact venues (dates/times are set)
- Grandparents' and parents' names for the invitation
- Exact Ganesh Vandana / opening shloka text
- The couple's story text
- RSVP contact number(s)

**Confirmed and in use:** couple names, wedding date/time, Sangeet (Apar Hotel
Narnaul, 4 PM, dinner 7 PM), Wedding (Manorma Resort Kaudiya Gorakhpur, dinner
7 PM, baraat 9 PM), Mehndi 2 Dec 6 PM & Haldi 3 Dec 11 AM (Gorakhpur), all map
links.

---

## Supabase setup (Phase 2 onward)

1. Create a project at supabase.com. Copy the URL + anon key + service-role key
   into `.env.local`.
2. Run the migrations (SQL editor or CLI):
   ```
   supabase/migrations/0001_init.sql        # tables + enums + indexes
   supabase/migrations/0002_rls.sql         # Row Level Security policies
   supabase/migrations/0003_seed_events.sql # confirmed event schedule
   ```
3. Create a Storage bucket (e.g. `wedding-media`), private. Upload/download go
   through authorized server routes with signed URLs (Phase 3).
4. In Supabase Auth, create the admin user(s) and add their emails to
   `ADMIN_ALLOWED_EMAILS`. `/admin` is gated **server-side** (`src/lib/auth.ts`)
   — a guessable URL is never sufficient.

Security model: the public `anon` role can only READ public content. All
sensitive writes (approve/hide/delete, guest list, tokens, quotas) run through
the service role in authorized server code — never trusted to the client.

---

## Deployment (Vercel + kajalworld.in)

1. Push to a Git repo, import into Vercel.
2. Add all env vars in Vercel Project Settings (mark service-role as server-only
   / not exposed to the browser).
3. Add `kajalworld.in` as a custom domain; set the DNS records Vercel shows;
   wait for HTTPS to provision.
4. Point `NEXT_PUBLIC_SITE_URL` to `https://kajalworld.in` and redeploy.

> The site is NOT "live" until deployment + domain + HTTPS actually verify.
> Nothing here claims otherwise.

---

## Security note on dependencies

Runtime deps are clean. `npm audit` reports a `postcss` advisory that lives
**inside Next.js's own bundled build tooling** (`next/node_modules/postcss`),
not in our runtime path; npm's only "fix" is a major Next upgrade. Our direct
`postcss` devDependency is on a patched version. Revisit on the next major Next
bump.

---

## Structure

```
src/
  app/
    page.tsx                 # home (intro experience, no nav)
    (site)/                  # route group w/ SiteNav: story, events, gallery,
                             #   travel, rsvp, guestbook, upload
    events/[eventSlug]/      # SSG event detail
    upload/[eventCode]/      # SSG upload landing
    admin/                   # server-gated dashboard
    api/rsvp, api/guestbook  # server-validated route handlers (stubs → DB)
  components/                # intro, sections, gallery, forms, decor, ui, nav
  config/weddingConfig.ts    # <-- edit wedding details here
  lib/                       # env, datetime (Asia/Kolkata), supabase, auth
  motion/variants.ts         # reusable Framer Motion variants
  hooks/                     # countdown, reduced-motion, session flag
supabase/migrations/         # schema, RLS, seed
```
