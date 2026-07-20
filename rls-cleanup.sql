-- ═══════════════════════════════════════════════════════════════════════
-- RLS cleanup — rewrite step 7
--
-- Both apps/web and apps/admin now talk to Postgres exclusively through
-- Prisma over a trusted server-side connection string (DATABASE_URL). No
-- code anywhere calls the Supabase REST API with the anon key anymore, so
-- the anon/authenticated Postgres roles no longer need any access to these
-- tables — the previous "FOR ALL USING (true)" policies (and, on several
-- tables, matching "Public read" SELECT-true policies) existed only to
-- support the old client-side `sb()` fetch helper, which is gone.
--
-- This script:
--   1. Drops every anon-facing RLS policy on the 20 app tables (admin_users
--      already has zero policies with RLS enabled — deny-by-default — and
--      is intentionally left untouched).
--   2. Revokes the blanket anon/authenticated table privileges underneath
--      those policies, so even a future policy mistake can't reopen access.
--   3. Revokes EXECUTE on the three admin-auth RPCs (verify_admin_login,
--      create_admin_user, admin_reset_password) that were callable by
--      anon/authenticated — auth now goes through NextAuth + Prisma +
--      bcrypt in apps/admin, never these RPCs.
--   4. Drops the admin_users_safe view, which was anon-SELECT-able and
--      exposed every admin's username/email/role — dead code, nothing in
--      the codebase references it.
--
-- Idempotent: every statement uses IF EXISTS, safe to re-run.
-- ═══════════════════════════════════════════════════════════════════════

begin;

-- 1. Drop anon-facing RLS policies (FOR ALL and the redundant SELECT-true
--    "Public read" policies — nothing reads via the anon key anymore).
drop policy if exists "Anon all activity" on public.admin_activity_log;
drop policy if exists "Anon all analytics" on public.analytics_events;
drop policy if exists "Anon all assessments" on public.assessments;
drop policy if exists "Anon all categories" on public.blog_categories;
drop policy if exists "Public read categories" on public.blog_categories;
drop policy if exists "Anon all posts" on public.blog_posts;
drop policy if exists "Public read posts" on public.blog_posts;
drop policy if exists "Anon all case_studies" on public.case_studies;
drop policy if exists "Anon all certs" on public.certifications;
drop policy if exists "Anon all submissions" on public.contact_submissions;
drop policy if exists "Anon all history" on public.content_history;
drop policy if exists "Anon all cv_files" on public.cv_files;
drop policy if exists "Anon all cybertools" on public.cybertools;
drop policy if exists "Anon all events" on public.events;
drop policy if exists "Public read events" on public.events;
drop policy if exists "Anon all newsletter" on public.newsletter_subscribers;
drop policy if exists "Anon all pm_projects" on public.pm_projects;
drop policy if exists "Anon all products" on public.products;
drop policy if exists "Anon all qa_products" on public.qa_products;
drop policy if exists "Anon all content" on public.site_content;
drop policy if exists "Public read content" on public.site_content;
drop policy if exists "Anon all speaking" on public.speaking_cards;
drop policy if exists "Anon all testimonials" on public.testimonials;
drop policy if exists "Anon all ventures" on public.ventures;

-- 2. Revoke the underlying table grants for anon/authenticated on every
--    app table (admin_users excluded — already locked down, left as-is).
revoke all on table public.admin_activity_log from anon, authenticated;
revoke all on table public.analytics_events from anon, authenticated;
revoke all on table public.assessments from anon, authenticated;
revoke all on table public.blog_categories from anon, authenticated;
revoke all on table public.blog_posts from anon, authenticated;
revoke all on table public.case_studies from anon, authenticated;
revoke all on table public.certifications from anon, authenticated;
revoke all on table public.contact_submissions from anon, authenticated;
revoke all on table public.content_history from anon, authenticated;
revoke all on table public.cv_files from anon, authenticated;
revoke all on table public.cybertools from anon, authenticated;
revoke all on table public.events from anon, authenticated;
revoke all on table public.newsletter_subscribers from anon, authenticated;
revoke all on table public.pm_projects from anon, authenticated;
revoke all on table public.products from anon, authenticated;
revoke all on table public.qa_products from anon, authenticated;
revoke all on table public.site_content from anon, authenticated;
revoke all on table public.speaking_cards from anon, authenticated;
revoke all on table public.testimonials from anon, authenticated;
revoke all on table public.ventures from anon, authenticated;

-- 3. Revoke EXECUTE on the old admin-auth RPCs. Functions are left in
--    place (not dropped) — inert without the grant, reversible if ever
--    needed, and this repo's application code never calls them.
--    Postgres grants EXECUTE to the PUBLIC pseudo-role by default when a
--    function is created — every role (including anon/authenticated)
--    implicitly inherits PUBLIC's privileges, so revoking from anon and
--    authenticated alone does nothing unless PUBLIC's grant is revoked too.
revoke execute on function public.verify_admin_login from public, anon, authenticated;
revoke execute on function public.create_admin_user from public, anon, authenticated;
revoke execute on function public.admin_reset_password from public, anon, authenticated;

-- 4. Drop the dead admin_users_safe view (anon-SELECT-able, leaked admin
--    username/email/role/permissions; unreferenced anywhere in the app).
drop view if exists public.admin_users_safe;

commit;
