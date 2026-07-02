-- ═══════════════════════════════════════════════════
-- ERIC UZOUKWU PORTFOLIO — SUPABASE SAFE SETUP
-- Run this in your Supabase SQL Editor.
-- Safe to run multiple times — uses IF NOT EXISTS
-- and DROP POLICY IF EXISTS to avoid conflicts.
-- ═══════════════════════════════════════════════════

-- ── TABLES ───────────────────────────────────────────

CREATE TABLE IF NOT EXISTS blog_posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  cover_image TEXT,
  excerpt TEXT,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS events (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'upcoming',
  date_start DATE NOT NULL,
  date_end DATE,
  location TEXT NOT NULL,
  organisation TEXT,
  my_role TEXT,
  cover_image TEXT,
  event_link TEXT,
  short_description TEXT,
  full_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS analytics_events (
  id BIGSERIAL PRIMARY KEY,
  event_type TEXT NOT NULL,
  page_section TEXT,
  cv_type TEXT,
  country TEXT,
  referrer TEXT,
  user_agent TEXT,
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  subject TEXT,
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_content (
  id BIGSERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cv_files (
  id BIGSERIAL PRIMARY KEY,
  cv_type TEXT NOT NULL,
  filename TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── ROW LEVEL SECURITY ───────────────────────────────

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_files ENABLE ROW LEVEL SECURITY;

-- ── POLICIES (drop first to avoid conflicts) ─────────

-- blog_posts
DROP POLICY IF EXISTS "Public read posts" ON blog_posts;
DROP POLICY IF EXISTS "Anon all posts" ON blog_posts;
DROP POLICY IF EXISTS "Anon insert posts" ON blog_posts;
DROP POLICY IF EXISTS "Anon update posts" ON blog_posts;
DROP POLICY IF EXISTS "Anon delete posts" ON blog_posts;
CREATE POLICY "Public read posts" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Anon all posts" ON blog_posts FOR ALL USING (true) WITH CHECK (true);

-- blog_categories
DROP POLICY IF EXISTS "Public read categories" ON blog_categories;
DROP POLICY IF EXISTS "Anon all categories" ON blog_categories;
DROP POLICY IF EXISTS "Anon insert categories" ON blog_categories;
DROP POLICY IF EXISTS "Anon delete categories" ON blog_categories;
CREATE POLICY "Public read categories" ON blog_categories FOR SELECT USING (true);
CREATE POLICY "Anon all categories" ON blog_categories FOR ALL USING (true) WITH CHECK (true);

-- events
DROP POLICY IF EXISTS "Public read events" ON events;
DROP POLICY IF EXISTS "Anon all events" ON events;
CREATE POLICY "Public read events" ON events FOR SELECT USING (true);
CREATE POLICY "Anon all events" ON events FOR ALL USING (true) WITH CHECK (true);

-- analytics_events
DROP POLICY IF EXISTS "Anon all analytics" ON analytics_events;
CREATE POLICY "Anon all analytics" ON analytics_events FOR ALL USING (true) WITH CHECK (true);

-- contact_submissions
DROP POLICY IF EXISTS "Anon all submissions" ON contact_submissions;
CREATE POLICY "Anon all submissions" ON contact_submissions FOR ALL USING (true) WITH CHECK (true);

-- site_content
DROP POLICY IF EXISTS "Public read content" ON site_content;
DROP POLICY IF EXISTS "Anon all content" ON site_content;
CREATE POLICY "Public read content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Anon all content" ON site_content FOR ALL USING (true) WITH CHECK (true);

-- cv_files
DROP POLICY IF EXISTS "Anon all cv_files" ON cv_files;
CREATE POLICY "Anon all cv_files" ON cv_files FOR ALL USING (true) WITH CHECK (true);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anon all newsletter" ON newsletter_subscribers;
CREATE POLICY "Anon all newsletter" ON newsletter_subscribers FOR ALL USING (true) WITH CHECK (true);

-- Speaking cards (managed from admin)
CREATE TABLE IF NOT EXISTS speaking_cards (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  date_period TEXT,
  location TEXT,
  organisation TEXT,
  my_role TEXT,
  short_description TEXT,
  full_description TEXT,
  cover_image TEXT,
  status TEXT DEFAULT 'active',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE speaking_cards ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anon all speaking" ON speaking_cards;
CREATE POLICY "Anon all speaking" ON speaking_cards FOR ALL USING (true) WITH CHECK (true);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id BIGSERIAL PRIMARY KEY,
  quote TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT,
  avatar TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anon all testimonials" ON testimonials;
CREATE POLICY "Anon all testimonials" ON testimonials FOR ALL USING (true) WITH CHECK (true);

-- Products manager
CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  sector TEXT,
  status TEXT DEFAULT 'progress',
  description TEXT,
  tech_stack TEXT[],
  logo_url TEXT,
  website_url TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anon all products" ON products;
CREATE POLICY "Anon all products" ON products FOR ALL USING (true) WITH CHECK (true);

-- Ventures manager
CREATE TABLE IF NOT EXISTS ventures (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT,
  role TEXT,
  status TEXT,
  description TEXT,
  logo_url TEXT,
  accent_color TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE ventures ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anon all ventures" ON ventures;
CREATE POLICY "Anon all ventures" ON ventures FOR ALL USING (true) WITH CHECK (true);

-- Content version history
CREATE TABLE IF NOT EXISTS content_history (
  id BIGSERIAL PRIMARY KEY,
  content_key TEXT NOT NULL,
  value TEXT,
  saved_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE content_history ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anon all history" ON content_history;
CREATE POLICY "Anon all history" ON content_history FOR ALL USING (true) WITH CHECK (true);

-- Case Studies
CREATE TABLE IF NOT EXISTS case_studies (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  tag TEXT,
  label TEXT,
  challenge TEXT,
  results TEXT[],
  tech_stack TEXT[],
  full_details TEXT,
  outcomes JSONB,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anon all case_studies" ON case_studies;
CREATE POLICY "Anon all case_studies" ON case_studies FOR ALL USING (true) WITH CHECK (true);

-- Certifications
CREATE TABLE IF NOT EXISTS certifications (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date_earned TEXT,
  group_name TEXT,
  credential_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE certifications RENAME COLUMN group_name TO "group";
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anon all certs" ON certifications;
CREATE POLICY "Anon all certs" ON certifications FOR ALL USING (true) WITH CHECK (true);

-- PM Projects
CREATE TABLE IF NOT EXISTS pm_projects (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  description TEXT,
  status TEXT DEFAULT 'active',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE pm_projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anon all pm_projects" ON pm_projects;
CREATE POLICY "Anon all pm_projects" ON pm_projects FOR ALL USING (true) WITH CHECK (true);

-- QA Products
CREATE TABLE IF NOT EXISTS qa_products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  sector TEXT,
  description TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE qa_products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anon all qa_products" ON qa_products;
CREATE POLICY "Anon all qa_products" ON qa_products FOR ALL USING (true) WITH CHECK (true);

-- Add tags + seo columns to blog_posts if not exists
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS og_image TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;

-- Assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL, tag TEXT, label TEXT, overview TEXT,
  findings TEXT[], outcome TEXT, tools_used TEXT[],
  metrics JSONB DEFAULT '{}', display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anon all assessments" ON assessments;
CREATE POLICY "Anon all assessments" ON assessments FOR ALL USING (true) WITH CHECK (true);

-- Cybersecurity tools table
CREATE TABLE IF NOT EXISTS cybertools (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL, category TEXT, description TEXT,
  tech_stack TEXT[], github_url TEXT, display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE cybertools ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anon all cybertools" ON cybertools;
CREATE POLICY "Anon all cybertools" ON cybertools FOR ALL USING (true) WITH CHECK (true);

-- Admin activity log (persisted)
CREATE TABLE IF NOT EXISTS admin_activity_log (
  id BIGSERIAL PRIMARY KEY,
  icon TEXT, action TEXT NOT NULL, detail TEXT,
  session_id TEXT, logged_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE admin_activity_log ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anon all activity" ON admin_activity_log;
CREATE POLICY "Anon all activity" ON admin_activity_log FOR ALL USING (true) WITH CHECK (true);

-- Add website_url to ventures
ALTER TABLE ventures ADD COLUMN IF NOT EXISTS website_url TEXT;

-- Seed site_content with defaults
INSERT INTO site_content (key, value) VALUES
  ('speaking_sessions','20+'),('speaking_trained','500+'),
  ('pillar_product','IoT · Web · Mobile · QA · PM'),
  ('pillar_education','NG · UK · Community'),
  ('pillar_reach','Owerri · NG · Africa · Global'),
  ('pillar_focus','Africa-first Tech'),
  ('hero_tags','Cybersecurity, Founder, Builder, Educator, Instructor')
ON CONFLICT (key) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════════
-- ADMIN USERS & ROLE-BASED ACCESS CONTROL
-- ═══════════════════════════════════════════════════════════════════════════

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS admin_users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  display_name TEXT,
  email TEXT,
  role TEXT DEFAULT 'editor',           -- super_admin | admin | editor | custom
  permissions JSONB DEFAULT '[]',       -- array of section ids this user can access
  status TEXT DEFAULT 'active',         -- active | disabled
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
-- IMPORTANT: no direct SELECT policy on admin_users — this table holds
-- password_hash. All access goes through the safe view and RPC functions below
-- so the password hash is never exposed to the browser.

-- Safe view: every column EXCEPT password_hash. The admin panel reads/writes
-- through this view, never the base table directly.
DROP VIEW IF EXISTS admin_users_safe;
CREATE VIEW admin_users_safe AS
SELECT id, username, display_name, email, role, permissions, status, created_at, last_login
FROM admin_users;

GRANT SELECT, UPDATE, DELETE ON admin_users_safe TO anon;

-- Login verification — runs entirely in Postgres, password never leaves
-- the database in plaintext comparison and the hash is never returned.
CREATE OR REPLACE FUNCTION verify_admin_login(p_username TEXT, p_password TEXT)
RETURNS TABLE(id BIGINT, username TEXT, display_name TEXT, role TEXT, permissions JSONB, status TEXT)
LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN QUERY
  SELECT a.id, a.username, a.display_name, a.role, a.permissions, a.status
  FROM admin_users a
  WHERE a.username = p_username
    AND a.password_hash = crypt(p_password, a.password_hash)
    AND a.status = 'active';

  IF FOUND THEN
    UPDATE admin_users SET last_login = NOW() WHERE admin_users.username = p_username;
  END IF;
END;
$$;
GRANT EXECUTE ON FUNCTION verify_admin_login TO anon;

-- Create a new admin user (called by Super Admin from the Admin Users panel)
CREATE OR REPLACE FUNCTION create_admin_user(
  p_username TEXT, p_password TEXT, p_display_name TEXT,
  p_email TEXT, p_role TEXT, p_permissions JSONB
) RETURNS BIGINT
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE new_id BIGINT;
BEGIN
  INSERT INTO admin_users (username, password_hash, display_name, email, role, permissions)
  VALUES (p_username, crypt(p_password, gen_salt('bf')), p_display_name, p_email, p_role, p_permissions)
  RETURNING id INTO new_id;
  RETURN new_id;
END;
$$;
GRANT EXECUTE ON FUNCTION create_admin_user TO anon;

-- Reset / change a user's password
CREATE OR REPLACE FUNCTION admin_reset_password(p_user_id BIGINT, p_new_password TEXT)
RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE admin_users SET password_hash = crypt(p_new_password, gen_salt('bf')) WHERE id = p_user_id;
END;
$$;
GRANT EXECUTE ON FUNCTION admin_reset_password TO anon;

-- Seed nothing here — your existing hardcoded login (in dashboard.html)
-- remains your permanent bootstrap Super Admin and always works even if
-- this table is empty, so you can never be locked out.
