# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static personal portfolio/blog site for Eric Uzoukwu, deployed on Netlify, backed by Supabase (Postgres + REST + Auth via RLS policies). There is no JS framework, no bundler, and no `package.json` — the "app" is a small number of very large, self-contained HTML files with inline `<script>`/`<style>` blocks that talk directly to the Supabase REST API via `fetch`.

## Commands

- **Local build (injects Supabase credentials into HTML placeholders):**
  ```
  node build.js
  ```
  Reads `SUPABASE_URL` / `SUPABASE_ANON_KEY` from the environment (see `.env.example`) and rewrites the `var SUPABASE_URL = '...'` / `var SUPABASE_KEY = '...'` placeholders in `eric-uzoukwu-FINAL.html` and `dashboard.html` in place. Netlify runs this same command (`node build.js`) as its build step (see `netlify.toml`).
- **No test suite, linter, or package manager exists in this repo.** There is nothing to `npm install`, `npm test`, or `npm run build` — don't assume Node tooling beyond what `build.js` needs (fs/path only, no deps).
- **Local preview:** just open `eric-uzoukwu-FINAL.html` (or `dashboard.html`) directly in a browser after running `build.js`, or serve the directory with any static file server.
- **Database setup:** run `supabase-setup-safe.sql` in the Supabase SQL Editor to (re)create all tables/RLS policies — it's idempotent (`IF NOT EXISTS` / `DROP POLICY IF EXISTS`). `COMBINED-first-time-setup.sql` is the full first-run script; `migration-live-db.sql` and `blog_posts.sql`/`seed_data.sql` are one-off migration/seed scripts, not part of routine dev workflow.

## Architecture

### Static pages, routed via Netlify

`netlify.toml` and `_redirects` both define the routing (kept in sync manually — check both when changing routes):
- `/` → `eric-uzoukwu-FINAL.html` — the public portfolio/blog site
- `/dashboard` → `dashboard.html` — the admin CMS for managing site content
- everything else → `404.html`
- `maintenance.html` exists as an opt-in kill switch (commented out in `_redirects`)

Both main HTML files are single-file monoliths (600KB+ / 750KB+) containing all markup, CSS, and JS inline — there is no component system or module split. When editing, search within the file for the relevant `<script>` section (e.g. by function name) rather than expecting separate source files.

### Supabase as the entire backend

Both `eric-uzoukwu-FINAL.html` and `dashboard.html` embed `SUPABASE_URL`/`SUPABASE_KEY` (anon key) directly and define a local `sb(method, path, body)` helper that calls the PostgREST endpoint (`{SUPABASE_URL}/rest/v1/{path}`) directly with `fetch` — there is no Supabase JS client library loaded, and no server-side API layer. All data access, including from the admin dashboard, goes through this REST interface protected by Postgres Row Level Security policies defined in `supabase-setup-safe.sql`.

Key tables (see `supabase-setup-safe.sql` for full schema): `blog_posts`, `blog_categories`, `events`, `analytics_events`, `contact_submissions`, `site_content`, `cv_files`, `newsletter_subscribers`, `speaking_cards`, `testimonials`, `products`, `ventures`, `content_history`, `case_studies`, `certifications`, `pm_projects`, `qa_products`, `assessments`, `cybertools`, `admin_activity_log`, `admin_users`.

`admin_users` deliberately has **no direct SELECT policy** — it holds `password_hash`. All reads/writes go through a safe view and RPC functions instead, so the hash is never exposed to the browser. Preserve this pattern if touching admin auth — don't add a SELECT policy that exposes the raw table.

### Client-side auth in the dashboard

`dashboard.html` implements its own login (`ADMIN_USERNAME` constant + Supabase-backed check), 2FA PIN, and session state largely via `localStorage` (`admin_2fa_pin`, `admin_draft`, `admin_resend_key`, `admin_sub_alerts`, `admin_notepad`, etc.) rather than Supabase Auth sessions. A hardcoded fallback login (`ericadmin`) is documented in `DEPLOYMENT_GUIDE.md` as an emergency-only credential — treat it as sensitive, not as a real auth system to build on.

### Scheduled publishing

`publish-scheduled.ts` is a Deno-based Supabase Edge Function that publishes any `blog_posts` row with `status = 'scheduled'` whose `published_at` has passed. `publish-scheduled.yml` is a GitHub Actions workflow that triggers this edge function hourly via `curl` (using repo secrets `SUPABASE_URL`/`SUPABASE_ANON_KEY`). This function is deployed to Supabase separately — it is not part of the Netlify build.

### Environment variables

Only two: `SUPABASE_URL` and `SUPABASE_ANON_KEY` (see `.env.example`). Set locally in `.env` for `build.js`, and in Netlify's site environment variables for production builds; GitHub Actions gets its own copy as repo secrets for the scheduled-publish workflow.
