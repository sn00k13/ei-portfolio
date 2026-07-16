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
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_schema = 'public' AND table_name = 'certifications' AND column_name = 'group_name') THEN
    ALTER TABLE certifications RENAME COLUMN group_name TO "group";
  END IF;
END $$;
ALTER TABLE certifications ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0;
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

-- Add status column to speaking_cards (upcoming / past)
ALTER TABLE speaking_cards ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'past';

-- Seed existing speaking cards from the site into DB (if starting fresh)
-- Run this AFTER the main setup SQL
INSERT INTO speaking_cards (title, type, date_period, location, organisation, my_role, short_description, status, display_order) VALUES
('Omniverse Research Exchange 2026', 'Conference — Research Presentation', 'Jun 2026', 'Lagos, Nigeria', 'Omniverse Africa Summit 3.0', 'Researcher & Presenter', 'Presenting 4FG-Monitor at the Omniverse Research Exchange 2026 — a GSM-enabled LPG cylinder monitoring IoT device (4First Technologies). Fully funded presenter slot.', 'past', 1),
('Cybersecurity Bootcamps — Nigeria', 'Bootcamp — Lead Instructor', '2023 – Present', 'Owerri, Nigeria', 'StreetHub Academy', 'Cybersecurity & Linux Instructor', '20+ cybersecurity training sessions covering penetration testing, SOC operations, digital forensics, Linux security, and risk analysis for 200+ professionals across Nigeria.', 'past', 2),
('Cybersecurity Instruction — United Kingdom', 'Training — International', '2024–2025', 'United Kingdom', 'UK Partners', 'Cybersecurity Instructor', 'Training sessions focused on practical threat analysis and SOC operations for IT and security teams. Curriculum aligned with UK NCSC guidance and GDPR compliance context.', 'past', 3),
('Umunzu Youth Organization Convention 2025', 'Convention — Speaker', '29 Nov 2025', 'Njaba LGA, Imo State', 'Umunzu Youth Organization', 'Speaker', 'Spoke on The Digital Youth: Leveraging Technology for Global Relevance — AI, digital skills, and tech-driven opportunities for Nigerian youth.', 'past', 4),
('Trailblazer in Innovation Award', 'Award — Recognition', '2025', 'Owerri, Nigeria', 'Umunzu Youth Organization', 'Awardee', 'Honoured with the Trailblazer in Innovation Award for contributions to advancing digital growth and empowering youths through technology. Unannounced recognition.', 'past', 5),
('Olu-Aka Institute — Graduation & Certificate Presentation', 'Mentorship — Certificate Presenter', '2024', 'Owerri, Imo State', 'Olu-Aka Institute of Technology', 'Certificate Presenter & Talent Scout', 'Returned to Olu-Aka to present certificates to new developers after their project defence. Shared his journey from student to industry professional and scouted new talents for StreetHub Academy.', 'past', 6),
('MMEPE Africa — Choosing a Career in Cybersecurity', 'Panel — Cybersecurity Career', '5 May 2024', 'Online', 'MMEPE Africa Community', 'Speaker & Panelist', 'Joined MMEPE Africa for a panel discussion on cybersecurity career paths, specialisations, and how to break into the industry.', 'past', 7),
('StreetHub Academy Twitter Space — Love & Tech', 'Twitter Space — Panel Discussion', '14 Feb 2024', 'Online', 'StreetHub Academy', 'Speaker', 'Live Twitter Space on balancing love and tech, career growth, and opportunities for tech enthusiasts. Open mic format.', 'past', 8),
('Founder Dojo Imo — Global Innovation Bootcamp', 'Bootcamp — Founder Participant', '2024', 'Owerri, Imo State', 'Imo Digital City Ltd / UC Berkeley SCET / USMAC', 'Founder Participant', 'Completed Founder Dojo Imo — a Silicon Valley-led founder development bootcamp with UC Berkeley SCET and USMAC. Awarded certificate of completion.', 'past', 9),
('TECHCRUSH Bootcamp Mentorship — Breaking into Tech', 'Mentorship — Twitter Space', '16 Dec 2025', 'Online', 'TechCrush HQ', 'Mentor & Speaker', 'Mentorship session for beginners on breaking into tech — career pathways, practical guidance, and real direction. Delivered via Twitter Space.', 'past', 10)
ON CONFLICT DO NOTHING;


-- ═══ 2/4: migration-live-db.sql ═══

-- ═══════════════════════════════════════════════════════════════════
-- MIGRATION for LIVE database (July 2026 client update)
-- Run this in the Supabase SQL Editor — do NOT rerun the full setup.
-- Afterwards, also run: blog_posts.sql and seed_data.sql
-- ═══════════════════════════════════════════════════════════════════

-- Add status column to speaking_cards (upcoming / past)
ALTER TABLE speaking_cards ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'past';

-- Unique indexes on natural keys. Without these, the seed files' bare
-- "ON CONFLICT DO NOTHING" clauses never fire and re-running a seed
-- duplicates rows in the live tables.
-- NOTE: if any of these fail with "could not create unique index", the live
-- table already contains duplicate rows — clean those up first, then rerun.
CREATE UNIQUE INDEX IF NOT EXISTS ux_speaking_cards_title ON speaking_cards (title);
CREATE UNIQUE INDEX IF NOT EXISTS ux_blog_posts_title     ON blog_posts (title);
CREATE UNIQUE INDEX IF NOT EXISTS ux_testimonials_name    ON testimonials (name);
CREATE UNIQUE INDEX IF NOT EXISTS ux_certifications_name  ON certifications (name);
CREATE UNIQUE INDEX IF NOT EXISTS ux_qa_products_name     ON qa_products (name);
CREATE UNIQUE INDEX IF NOT EXISTS ux_pm_projects_name     ON pm_projects (name);

-- Seed existing speaking cards from the site into DB (if starting fresh)
-- Run this AFTER the main setup SQL
INSERT INTO speaking_cards (title, type, date_period, location, organisation, my_role, short_description, status, display_order) VALUES
('Omniverse Research Exchange 2026', 'Conference — Research Presentation', 'Jun 2026', 'Lagos, Nigeria', 'Omniverse Africa Summit 3.0', 'Researcher & Presenter', 'Presenting 4FG-Monitor at the Omniverse Research Exchange 2026 — a GSM-enabled LPG cylinder monitoring IoT device (4First Technologies). Fully funded presenter slot.', 'past', 1),
('Cybersecurity Bootcamps — Nigeria', 'Bootcamp — Lead Instructor', '2023 – Present', 'Owerri, Nigeria', 'StreetHub Academy', 'Cybersecurity & Linux Instructor', '20+ cybersecurity training sessions covering penetration testing, SOC operations, digital forensics, Linux security, and risk analysis for 200+ professionals across Nigeria.', 'past', 2),
('Cybersecurity Instruction — United Kingdom', 'Training — International', '2024–2025', 'United Kingdom', 'UK Partners', 'Cybersecurity Instructor', 'Training sessions focused on practical threat analysis and SOC operations for IT and security teams. Curriculum aligned with UK NCSC guidance and GDPR compliance context.', 'past', 3),
('Umunzu Youth Organization Convention 2025', 'Convention — Speaker', '29 Nov 2025', 'Njaba LGA, Imo State', 'Umunzu Youth Organization', 'Speaker', 'Spoke on The Digital Youth: Leveraging Technology for Global Relevance — AI, digital skills, and tech-driven opportunities for Nigerian youth.', 'past', 4),
('Trailblazer in Innovation Award', 'Award — Recognition', '2025', 'Owerri, Nigeria', 'Umunzu Youth Organization', 'Awardee', 'Honoured with the Trailblazer in Innovation Award for contributions to advancing digital growth and empowering youths through technology. Unannounced recognition.', 'past', 5),
('Olu-Aka Institute — Graduation & Certificate Presentation', 'Mentorship — Certificate Presenter', '2024', 'Owerri, Imo State', 'Olu-Aka Institute of Technology', 'Certificate Presenter & Talent Scout', 'Returned to Olu-Aka to present certificates to new developers after their project defence. Shared his journey from student to industry professional and scouted new talents for StreetHub Academy.', 'past', 6),
('MMEPE Africa — Choosing a Career in Cybersecurity', 'Panel — Cybersecurity Career', '5 May 2024', 'Online', 'MMEPE Africa Community', 'Speaker & Panelist', 'Joined MMEPE Africa for a panel discussion on cybersecurity career paths, specialisations, and how to break into the industry.', 'past', 7),
('StreetHub Academy Twitter Space — Love & Tech', 'Twitter Space — Panel Discussion', '14 Feb 2024', 'Online', 'StreetHub Academy', 'Speaker', 'Live Twitter Space on balancing love and tech, career growth, and opportunities for tech enthusiasts. Open mic format.', 'past', 8),
('Founder Dojo Imo — Global Innovation Bootcamp', 'Bootcamp — Founder Participant', '2024', 'Owerri, Imo State', 'Imo Digital City Ltd / UC Berkeley SCET / USMAC', 'Founder Participant', 'Completed Founder Dojo Imo — a Silicon Valley-led founder development bootcamp with UC Berkeley SCET and USMAC. Awarded certificate of completion.', 'past', 9),
('TECHCRUSH Bootcamp Mentorship — Breaking into Tech', 'Mentorship — Twitter Space', '16 Dec 2025', 'Online', 'TechCrush HQ', 'Mentor & Speaker', 'Mentorship session for beginners on breaking into tech — career pathways, practical guidance, and real direction. Delivered via Twitter Space.', 'past', 10)
ON CONFLICT DO NOTHING;


-- ═══ 3/4: blog_posts.sql ═══

-- ═══════════════════════════════════════════════════════════════════════════
-- BLOG POSTS — Uzoukwu Eric Ikenna
-- Run in Supabase SQL Editor after the main setup SQL has been executed
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO blog_posts (title, category, excerpt, seo_description, tags, content, status, published_at, is_featured) VALUES

-- ── 1. NO_PUBKEY ERROR ────────────────────────────────────────────────────────
(
  'How to Fix the "NO_PUBKEY" Error in Kali Linux',
  'Linux',
  'Running sudo apt update and getting a NO_PUBKEY error? Here is exactly what it means, why it happens, and the fastest way to resolve it and keep your Kali system secure.',
  'Step-by-step guide to fixing the NO_PUBKEY GPG error in Kali Linux. Learn why GPG keys matter and how to restore secure package updates in minutes.',
  ARRAY['Cybersecurity','Linux','Kali Linux','GPG','Package Management'],
  $POST1$<p>When running <code>sudo apt update</code> on Kali Linux, you may encounter this error:</p>

<pre><code>Err:2 http://kali.download/kali kali-rolling InRelease
  The following signatures couldn''t be verified because the public key
  is not available: NO_PUBKEY ED65462EC8D5E4C5</code></pre>

<p>This means Kali's <code>apt</code> package manager cannot verify the repository's authenticity due to a missing or outdated GPG key.</p>

<h2>Why Are GPG Keys Important?</h2>
<p>GPG keys validate that the software you are downloading is officially maintained by Kali Linux and untampered. If the system cannot verify the key, it will refuse to install or update packages from that repository.</p>

<h2>Why Did This Happen?</h2>
<ul>
  <li>Outdated signing keys — Kali rotates them occasionally</li>
  <li>Misconfigured repository URLs</li>
  <li>Expired keys not refreshed by your system</li>
</ul>

<h2>Step 1: Add the Missing GPG Key</h2>
<p>Run this command to fetch the missing key from a trusted keyserver:</p>
<pre><code>sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys ED65462EC8D5E4C5</code></pre>
<ul>
  <li><code>apt-key adv</code> — manages keys</li>
  <li><code>--keyserver</code> — specifies the trusted keyserver (keyserver.ubuntu.com)</li>
  <li><code>--recv-keys</code> — downloads the key with ID ED65462EC8D5E4C5</li>
</ul>

<h2>Step 2: Update Your Package Lists</h2>
<pre><code>sudo apt update</code></pre>

<h2>Step 3: Verify Your Repository Settings</h2>
<p>Check that your sources list contains the official Kali repository:</p>
<pre><code>sudo nano /etc/apt/sources.list</code></pre>
<p>It should include:</p>
<pre><code>deb http://http.kali.org/kali kali-rolling main non-free non-free-firmware contrib</code></pre>
<p>Save (<kbd>Ctrl + O</kbd>) and exit (<kbd>Ctrl + X</kbd>), then refresh again:</p>
<pre><code>sudo apt update</code></pre>

<h2>Step 4: Clean Up Old Keys (Optional but Recommended)</h2>
<p><strong>Note:</strong> <code>apt-key</code> is deprecated. Modern systems should manage keys in <code>/etc/apt/trusted.gpg.d/</code>.</p>
<pre><code>sudo apt-key list</code></pre>
<p>Remove unused keys or migrate them to <code>/etc/apt/trusted.gpg.d/</code>.</p>

<h2>Step 5: Upgrade Your System</h2>
<pre><code>sudo apt upgrade -y
sudo apt full-upgrade -y
sudo apt autoremove -y</code></pre>

<h2>Conclusion</h2>
<p>The NO_PUBKEY error occurs when Kali Linux cannot verify repository authenticity. By adding the missing key, checking your sources list, and updating your system, you restore secure package updates. Always keep your keys and repositories up to date to protect your system.</p>

<p><strong>Additional Resource:</strong> <a href="https://www.kali.org/docs/general-use/kali-linux-sources-list-repositories/" target="_blank">Kali Network Repositories Documentation</a></p>$POST1$,
  'published',
  '2025-07-10 09:00:00+00',
  false
),

-- ── 2. PACKAGE UPDATES AND CLEANUP ────────────────────────────────────────────
(
  'Managing Package Updates and System Cleanup on Linux',
  'Linux',
  'Keeping your Linux system up to date is essential for security, stability, and performance. Here is a practical step-by-step guide to updating and cleaning your system with apt.',
  'Learn how to properly update, upgrade, and clean a Linux system using apt. Covers apt update, apt upgrade, full-upgrade, and autoremove with clear explanations.',
  ARRAY['Linux','Kali Linux','Linux Tutorial','Package Management','System Administration'],
  $POST2$<p>Keeping your Linux system up to date is essential for security, stability, and performance. Here is a step-by-step guide to updating your system and cleaning up unnecessary packages using <code>apt</code>.</p>

<h2>1. Refresh Package Lists</h2>
<p>Before upgrading any packages, refresh the package list to ensure your system knows about the latest available versions:</p>
<pre><code>sudo apt update</code></pre>
<p><code>apt update</code> downloads the latest package lists from the repositories so your system can see which packages need upgrading.</p>

<h2>2. Upgrade Installed Packages</h2>
<pre><code>sudo apt upgrade -y</code></pre>
<p><code>apt upgrade</code> upgrades installed packages without removing or installing new packages. If any package requires additional dependencies or the removal of older packages, it will be held back and not upgraded.</p>

<h2>3. Handle Packages Held Back (Full Upgrade)</h2>
<p>Sometimes not all packages are upgraded using <code>apt upgrade</code>. This happens when some packages require dependency changes. To upgrade all packages including those requiring more complex changes:</p>
<pre><code>sudo apt full-upgrade -y</code></pre>
<p><code>apt full-upgrade</code> handles dependency changes by adding or removing required packages, ensuring your system is fully upgraded.</p>

<h2>4. Clean Up Unused Packages</h2>
<p>After upgrading, there may be packages installed as dependencies that are no longer needed. Remove them with:</p>
<pre><code>sudo apt autoremove -y</code></pre>
<p>This removes unnecessary packages, frees up disk space, and keeps your system clean.</p>

<h2>Quick Summary</h2>
<pre><code>sudo apt update
sudo apt upgrade -y
sudo apt full-upgrade -y
sudo apt autoremove -y</code></pre>
<p>Running these four commands regularly keeps your Linux system secure, stable, and lean.</p>$POST2$,
  'published',
  '2024-10-19 09:00:00+00',
  false
),

-- ── 3. GITHUB PASSWORD AUTH REMOVED ──────────────────────────────────────────
(
  'How to Fix "Support for Password Authentication Was Removed" on GitHub',
  'Cybersecurity',
  'Trying to clone a GitHub repository and getting the password authentication error? GitHub removed password auth in 2021. Here is exactly how to fix it using a Personal Access Token.',
  'Fix the GitHub password authentication error on Kali Linux and other systems. Step-by-step guide to generating a Personal Access Token (PAT) and using it to authenticate.',
  ARRAY['GitHub','Cybersecurity','Linux','Authentication','Developer Tools'],
  $POST3$<p>GitHub no longer supports password authentication. If you try to clone a repository using an HTTPS URL and authenticate with a password, you will receive this error:</p>

<blockquote><em>"Support for password authentication was removed on August 13, 2021."</em></blockquote>

<p>GitHub removed password authentication primarily to enhance security — encouraging Two-Factor Authentication (2FA), aligning with OAuth standards, and improving overall security posture.</p>

<p>The fix is to switch to a <strong>Personal Access Token (PAT)</strong>.</p>

<h2>Step 1: Go to GitHub Settings</h2>
<p>Click on your profile picture in the top right corner of GitHub, then click <strong>Settings</strong>.</p>

<h2>Step 2: Open Developer Settings</h2>
<p>Scroll all the way down in the left sidebar and click <strong>Developer settings</strong>.</p>

<h2>Step 3: Navigate to Personal Access Tokens</h2>
<p>Click on <strong>Personal access tokens</strong> in the left menu. GitHub offers two types:</p>
<ul>
  <li><strong>Fine-grained tokens (Beta)</strong> — more granular control over repository access</li>
  <li><strong>Tokens (classic)</strong> — the standard option, suitable for most use cases</li>
</ul>
<p>Click <strong>Tokens (classic)</strong> for general use.</p>

<h2>Step 4: Generate a New Token</h2>
<p>Click <strong>Generate new token → Generate new token (classic)</strong>.</p>
<ul>
  <li><strong>Note:</strong> Give the token a descriptive name (e.g. "Kali Linux clone token")</li>
  <li><strong>Expiration:</strong> Set an expiry for security — 90 days is a good balance</li>
  <li><strong>Scopes:</strong> Select <code>repo</code> for full repository access</li>
</ul>
<p>Click <strong>Generate token</strong> at the bottom.</p>

<h2>Step 5: Save Your Token</h2>
<p><strong>Important:</strong> Copy and store the generated token securely — you will not be able to see it again after leaving the page. Use a password manager or a secure notes app.</p>

<h2>Step 6: Use the Token to Clone</h2>
<p>When prompted for a password during <code>git clone</code>, paste your Personal Access Token instead of your GitHub password:</p>
<pre><code>git clone https://github.com/username/repository.git
# Username: your GitHub username
# Password: paste your Personal Access Token here</code></pre>

<h2>Conclusion</h2>
<p>Personal Access Tokens are GitHub's secure replacement for password authentication. They give you fine-grained control over permissions, support expiration dates for added security, and work across all Git operations. Always store your tokens securely and rotate them periodically.</p>$POST3$,
  'published',
  '2024-04-23 09:00:00+00',
  false
),

-- ── 4. DEVFEST OWERRI 2024 REVIEW ────────────────────────────────────────────
(
  'My Review of DevFest Owerri 2024: A Mixed Experience',
  'Community',
  'DevFest Owerri 2024 had great speakers and real energy — but it missed the mark on what developers actually need. Here is my honest take and what I believe future editions must deliver.',
  'An honest review of DevFest Owerri 2024. Great speakers, but the event fell short on practical developer empowerment. Here is what needs to change.',
  ARRAY['DevFest','Community','Tech Community','Imo State','Developer Events'],
  $POST4$<p>The DevFest Owerri event was overall a good experience, and I truly commend the effort and hard work of the organizers. The speakers were clearly knowledgeable and passionate, sharing their personal journeys, achievements, and professional milestones. It was inspiring to hear about their successes and challenges, which no doubt could serve as motivation for many newcomers.</p>

<p>However, I must admit that the event fell short of my expectations in several ways. While the focus on professionals and their accomplishments was uplifting, it felt like the core mission of a developer-focused event was somewhat overlooked. Instead of primarily highlighting personal success stories, I believe DevFest could have been a more impactful platform to provide tangible opportunities for beginners and up-and-coming developers.</p>

<h2>What the Event Should Have Included</h2>
<p>In my view, the event should have included elements that directly empower and support aspiring developers and startups:</p>

<ul>
  <li><strong>Hands-on Workshops:</strong> Practical sessions where participants can learn new skills, tools, and frameworks directly from industry experts.</li>
  <li><strong>Resource Support:</strong> Assistance for developers struggling with essential resources like laptops, internet access, and development tools, which are critical for their growth.</li>
  <li><strong>Startup Support Programs:</strong> Guidance, mentorship, and even funding opportunities for startups to help turn innovative ideas into successful ventures.</li>
  <li><strong>Networking and Collaboration:</strong> Facilitating connections between established professionals and budding developers to foster mentorship and collaborations that can accelerate career growth.</li>
  <li><strong>Community Building:</strong> Creating frameworks for excellence and sustainability in the local tech ecosystem, with a focus on long-term impact.</li>
</ul>

<h2>Acknowledging the Effort</h2>
<p>That said, I must acknowledge the effort put into organizing this event and appreciate the dedication of the speakers who took the time to share their stories. It is evident that a lot of passion went into making DevFest Owerri happen, and for that, kudos to everyone involved.</p>

<p>I hope future editions will take a more hands-on approach in empowering the next generation of developers, turning inspiration into actionable support to truly uplift the tech community in our region.</p>$POST4$,
  'published',
  '2024-11-15 09:00:00+00',
  false
),

-- ── 5. DEVFEST OWERRI 2025 ────────────────────────────────────────────────────
(
  'DevFest Owerri 2025: A Turning Point for the Imo Tech Community',
  'Community',
  'Last year I reviewed DevFest Owerri 2024 and called for change. This year I got involved instead of watching from the sidelines — and the difference was remarkable. Here is what shifted.',
  'DevFest Owerri 2025 marked a turning point for the Imo tech ecosystem. StreetHub Technologies showed up, hired new talent on the spot, and made a public commitment to building the future of tech in Imo State.',
  ARRAY['DevFest','Community','StreetHub Technologies','Imo State','Tech Ecosystem'],
  $POST5$<p>Last year, I attended DevFest Owerri 2024 and went home deeply disappointed. I documented my experience in a review, calling for more meaningful impact, more opportunities for developers, and a stronger commitment to building the tech ecosystem in Imo State.</p>

<p>This year, I chose a different path. Instead of standing at a distance and hoping for change, I decided to get closer, get involved, and contribute to the growth we have all been hoping to see. I want to sincerely appreciate <strong>Gospel Chinyereugo</strong> and <strong>Claret Nnamocha</strong>, who not only listened but also helped drive the vision that many of us have been holding onto for years.</p>

<h2>StreetHub Technologies's Commitment to Community</h2>
<p>At StreetHub Technologies, community is not a buzzword — it is our identity. We have always stayed open to every tech enthusiast in Imo State. Our Hub offers:</p>
<ul>
  <li>24/7 electricity</li>
  <li>A thriving community of great minds</li>
  <li>A team of seasoned professionals ready to support your growth</li>
  <li>A space where building, collaboration, and innovation are encouraged daily</li>
</ul>

<p>For years, one painful reality has remained: Imo State has no major homegrown tech product, despite being full of brilliant developers and tech talents. We train people who eventually leave Owerri in search of opportunities elsewhere — not because they want to, but because we lacked the platforms to retain them and the drive to truly build scalable startups here.</p>

<h2>A Message That Mattered</h2>
<p>One of the highlights was hearing <strong>Innocent Unachukwu</strong> of StreetHub speak on: <em>"Startups as the Engine Driving Innovation and Community Development in Advanced Countries and How We Can Replicate the Same Here."</em></p>

<p>For the first time, people heard a message that directly benefits developers — opportunities to build, collaborate, and grow, with a promise of support for every builder who is ready to work. This is exactly what DevFest should be about.</p>

<p><strong>Godwin Kachi</strong> of StreetHub also delivered powerful strategic advocacy, urging creators to start ideating now, validate ideas early, build MVPs, and focus on execution and market reality. He challenged the community to make the next DevFest Owerri the first ever held in an open space, filled with startups showcasing real products built in Imo State. That challenge has been accepted.</p>

<h2>Real Impact: StreetHub Hired New Talent at DevFest</h2>
<p>We did not just speak. We acted. StreetHub hired new talents right at the event. You do not have to be a professional — just be passionate. We will train you, mentor you, and make you part of our family. That is how you build communities: by giving people real opportunities, not empty motivation.</p>

<h2>My Call Going Forward</h2>
<p>Events like DevFest must bring in people who live in Owerri, build in Owerri, understand our challenges, and are committed to solving them. Work with us. Involve us. Collaborate with us and watch the transformation unfold.</p>

<p>2025 was a turning point. 2026 will be the explosion. Next one will be the best one.</p>

<p><em>Ndewonu Ndị Imo, ya gaziere anyị.</em></p>

<p>— Uzoukwu Eric Ikenna, Manager at StreetHub Technologies and Academy. I am particular about impact. <strong>StreetHub! Impact!!!</strong></p>$POST5$,
  'published',
  '2025-12-01 09:00:00+00',
  false
),

-- ── 6. LINKEDIN ACCOUNT SECURITY ─────────────────────────────────────────────
(
  'How to Secure Your LinkedIn Account Against Phishing and Hacks',
  'Cybersecurity',
  'I recently encountered a phishing attempt on my own LinkedIn account. It was a reminder that no one is immune. Here is a practical guide to locking down your LinkedIn — on both desktop and mobile.',
  'Step-by-step guide to securing your LinkedIn account. Covers password updates, two-step verification, app lock on mobile, and tips to stay safe from phishing attempts.',
  ARRAY['LinkedIn','Cybersecurity','Account Security','Phishing','Social Media Security'],
  $POST6$<p>Recently, I had an encounter with a phishing and hacking attempt on my LinkedIn account. It serves as a reminder that everyone is susceptible to these threats. As someone deeply involved in cybersecurity, I take the security of my accounts very seriously. Let us look at some effective measures to fortify your LinkedIn account.</p>

<h2>On Desktop</h2>
<ol>
  <li>Click on the <strong>Me</strong> icon at the top (your profile picture — not "View Profile")</li>
  <li>Navigate to <strong>Settings and Privacy</strong></li>
  <li>Select <strong>Sign in and security</strong></li>
  <li>Click <strong>Change Password</strong> to update your password</li>
  <li>Click <strong>Two-step verification</strong> to add an authentication method for an extra layer of security</li>
</ol>

<h2>On Mobile</h2>
<ol>
  <li>Open your LinkedIn app and click your picture in the upper left corner</li>
  <li>Go to <strong>Settings</strong></li>
  <li>Find <strong>Sign in and security</strong></li>
  <li>Tap <strong>Change Password</strong></li>
  <li>Tap <strong>Two-step verification</strong></li>
  <li>Tap <strong>App Lock</strong> — enable fingerprint authentication for accessing the app, adding an extra layer of protection against unauthorized access</li>
</ol>

<h2>Additional Security Tips</h2>

<ul>
  <li><strong>Review Connected Apps:</strong> Periodically check and remove access for third-party applications you no longer use or trust.</li>
  <li><strong>Stay Alert to Phishing:</strong> Always be cautious of suspicious emails or messages requesting your login credentials. Verify authenticity before responding or clicking any links.</li>
  <li><strong>Keep Software Updated:</strong> Ensure your device OS, browser, and apps are up to date — outdated software creates security risks.</li>
  <li><strong>Monitor Account Activity:</strong> Regularly check for unusual activity or notifications and report suspicious behavior to LinkedIn immediately.</li>
  <li><strong>Use Strong, Unique Passwords:</strong> Create complex passwords that are not easily guessable and avoid reusing passwords across multiple platforms.</li>
</ul>

<p>Safeguarding your LinkedIn account is crucial for protecting your professional identity and personal information. Stay vigilant and prioritize cybersecurity at all times.</p>$POST6$,
  'published',
  '2024-03-10 09:00:00+00',
  false
),

-- ── 7. CHRISTMAS CYBERSECURITY STORY ─────────────────────────────────────────
(
  'Santa''s Gone Crazy: A Christmas Tale of Cybersecurity',
  'Cybersecurity',
  'A festive cybersecurity story about ByteBandit, a Christmas party gone wrong, and CyberKnight who saved the day. Plus: real cybersecurity advice every company needs during the festive season.',
  'A creative Christmas cybersecurity story about a toy company hacked during their Christmas party — and the ethical hacker who saved everything. Includes real cybersecurity tips for the festive season.',
  ARRAY['Cybersecurity','Storytelling','Festive Season','Ethical Hacking','Security Awareness'],
  $POST7$<p><em>A story of cybersecurity, festive deception, and the heroes who protect us in the digital world.</em></p>

<p>The invitation glinted with festive delight under the twinkle of shiny Christmas lights: <em>"To Santa Claus, Join Toyxury's magical children's Christmas party!"</em> The sender, Mr. Chuks Jingle Jiggy, CEO of Toyxury — the world's biggest toy conglomerate — had painted a picture of merriment. Santa accepted without much thought.</p>

<p>Toyxury took immense pride in its security protocols. However, Jingle Jiggy, consumed by profits and market dominance, prioritized flashy promotions over robust cybersecurity. This year, a mishap occurred. The invitation intended for Santa Claus mistakenly landed in the hands of <strong>ByteBandit</strong>, a tech whiz with criminal intent.</p>

<p>ByteBandit used the invitation as cover to gain unauthorized access to Toyxury's sensitive data rooms. He installed a custom-built virus named <strong>DataDoomer</strong> — which burrowed deep into the servers, pilfering confidential blueprints, market strategies, and the coveted AI teddy bear code, then unleashed a digital snowstorm of fake orders and system crashes.</p>

<h2>Enter CyberKnight</h2>
<p><strong>Chika</strong>, known in cyberspace as CyberKnight, had always admired Toyxury. He had been monitoring their network when he noticed a sudden spike in traffic and a flurry of alerts. He had seen that Toyxury was under attack and needed help.</p>

<p>Chika contacted the company's security team, identified ByteBandit's location within the building, and guided the IT department through isolating the infected servers, blocking the hacker's access, and deploying a counter-virus. ByteBandit was caught red-handed. The stolen data was recovered. Toyxury survived.</p>

<p>In the aftermath, Jingle Jiggy pledged to prioritize cybersecurity and invest heavily in safeguarding the company's digital infrastructure. Chika was offered the position of Chief Cybersecurity Officer — and received the world's first self-learning AI teddy bear as a gift from Santa himself.</p>

<h2>Cybersecurity Advice for Companies During the Festive Season</h2>
<ul>
  <li><strong>Employee Training:</strong> Conduct regular cybersecurity training, especially before festive events where distractions are high.</li>
  <li><strong>Robust Access Controls:</strong> Implement multi-factor authentication. Limit access to critical systems to authorized personnel only.</li>
  <li><strong>Regular Security Audits:</strong> Identify vulnerabilities and ensure software and security patches are regularly updated.</li>
  <li><strong>Encrypt Sensitive Data:</strong> Protect confidential information both in transit and at rest.</li>
  <li><strong>Real-time Monitoring:</strong> Deploy tools to detect suspicious activity promptly and have an incident response plan ready.</li>
  <li><strong>Phishing Awareness:</strong> Train staff to recognize phishing emails that exploit the holiday spirit to extract sensitive information.</li>
  <li><strong>Temporary Restrictions:</strong> During events, restrict access to critical systems and monitor external devices.</li>
  <li><strong>Post-Event Review:</strong> After the festive season, review all incidents and fortify measures for future events.</li>
</ul>

<p>The holiday season is a time of joy — but it is also a prime time for cyberattacks. Stay vigilant, stay protected, and keep the magic of Christmas untainted by the shadows of the digital world.</p>$POST7$,
  'published',
  '2023-12-20 09:00:00+00',
  false
),

-- ── 8. WHATSAPP CALLING SECURITY ──────────────────────────────────────────────
(
  'Enhancing Security in WhatsApp Calling: Silence Unknown Callers & Protect IP Address',
  'Cybersecurity',
  'WhatsApp introduced two optional security features for calls — Silence Unknown Callers and Protect IP Address in Calls. Here is what they do, how to enable them, and what the trade-offs are.',
  'Detailed breakdown of WhatsApp''s two new calling security features: Silence Unknown Callers and Protect IP Address in Calls. Advantages, disadvantages, and how to enable both.',
  ARRAY['WhatsApp','Cybersecurity','Privacy','Mobile Security','Social Media Security'],
  $POST8$<p>WhatsApp recently introduced two optional features designed to bolster security in its calling functionality: <strong>Silence Unknown Callers</strong> and <strong>Protect IP Address in Calls</strong>. Here is what they do, how to enable them, and what trade-offs to consider.</p>

<h2>Silence Unknown Callers</h2>
<p>This feature allows you to mute and block incoming calls from unknown numbers on WhatsApp. Calls from people not in your contacts are automatically rejected and the caller is added to your blocked list.</p>

<p><strong>To enable:</strong> Settings → Privacy → Silence Unknown Callers → toggle on.</p>

<h3>Advantages</h3>
<ul>
  <li>Eliminates disruptive and potentially fraudulent calls from unsaved contacts</li>
  <li>Protects against cyber attacks that use voice calls to exploit app vulnerabilities (e.g. the 2019 WhatsApp spyware that could infect a phone simply by calling it)</li>
  <li>Thwarts call flooding techniques used to overwhelm devices</li>
</ul>

<h3>Disadvantages</h3>
<ul>
  <li>May block legitimate calls from new contacts — delivery personnel, business partners, emergency services</li>
  <li>Does not stop unknown callers from sending messages</li>
  <li>Requires regularly checking your blocked list to avoid missing important calls</li>
</ul>

<h2>Protect IP Address in Calls</h2>
<p>This feature hides your IP address when making or receiving calls on WhatsApp. Your IP is masked via a proxy server that relays call data between you and the other party, preventing location tracking.</p>

<p><strong>To enable:</strong> Settings → Privacy → Advanced → Protect IP address in calls → toggle on.</p>

<h3>Advantages</h3>
<ul>
  <li>Prevents other parties from tracking your location based on your IP address</li>
  <li>Protects against denial-of-service (DoS) attacks and identity theft targeting your IP</li>
  <li>Especially valuable on public or unsecured Wi-Fi networks</li>
</ul>

<h3>Disadvantages</h3>
<ul>
  <li>The proxy server may introduce latency, affecting audio and video call quality</li>
  <li>Does not encrypt call data — you may still be vulnerable to interception by third parties with proxy access</li>
  <li>May limit the ability of emergency services to identify your location accurately</li>
  <li>Only applies to WhatsApp calls — does not provide comprehensive location privacy across all internet activity</li>
</ul>

<h2>A Note on Responsible Use</h2>
<p>While designed for privacy protection, these features could be misused by individuals seeking to avoid accountability. Use them responsibly and ethically. With the right understanding of their strengths and limitations, both features are valuable additions to your mobile security toolkit.</p>$POST8$,
  'published',
  '2024-01-15 09:00:00+00',
  false
),

-- ── 9. CYBER APOCALYPSE STORY ─────────────────────────────────────────────────
(
  'Digital Reckoning: A Story of Cyber Apocalypse, Hope, and Resilience',
  'Cybersecurity',
  'In a world entirely dependent on technology, a group of hackers brought civilization to its knees. This is the story of those who fought back — and what it teaches us about cybersecurity today.',
  'A cybersecurity fiction story about the Ogbunigwe Fancy Wolves, a group of hackers who triggered a digital apocalypse, and the Uwa Messiahs who risked everything to restore order.',
  ARRAY['Cybersecurity','Storytelling','Ethical Hacking','Cyber Warfare','Fiction'],
  $POST9$<p><em>In the not-so-distant future, the world had become entirely dependent on advanced computer systems. Everything from transportation to national security was controlled by interconnected networks. The convenience was unparalleled — but with great power came great vulnerability.</em></p>

<h2>The Ogbunigwe Fancy Wolves</h2>
<p>Deep within the dark corners of the digital world, a group of hackers emerged as a formidable force. Led by <strong>Emeka Chike, Haruna Aminu</strong>, and <strong>Boluwatife Michael</strong>, the Ogbunigwe Fancy Wolves were prodigies in cyber warfare. They sought power, wealth, and chaos — targeting governments, financial institutions, and large corporations. They stole classified information, disrupted vital services, and manipulated financial markets.</p>

<h2>The Uwa Messiahs</h2>
<p>To counteract this threat, a group of ethical hackers rose in response. Led by <strong>Onyeka Ibe, Chika Obi</strong>, and <strong>Ayo</strong>, the Uwa Messiahs were experts in cybersecurity. They dedicated their efforts to identifying vulnerabilities in critical systems, working with governments and organizations to fortify their defenses.</p>

<h2>The Digital Apocalypse</h2>
<p>The conflict escalated to apocalyptic proportions. Transportation systems were thrown into chaos. Hospitals fell victim to ransomware attacks, leaving patients without medical services. The stock market crashed repeatedly. Governments were paralyzed. Society began to crumble as power grids were sabotaged, water treatment plants compromised, and food distribution networks faltered.</p>

<h2>The Counter-Strike</h2>
<p>Desperate for a solution, world leaders turned to the Uwa Messiahs. Onyeka Ibe devised a daring plan to infiltrate the Ogbunigwe Fancy Wolves'' stronghold. Coordinating with intelligence agencies, military units, and law enforcement globally, they stormed the hideout in a climactic confrontation — both in the digital realm and the physical world.</p>

<p>Emeka Chike and his key associates were apprehended. The damage to the world''s infrastructure was already done, but recovery had begun.</p>

<h2>Rebuilding and the Lesson</h2>
<p>With the threat neutralized, the Uwa Messiahs turned their attention to rebuilding — restoring critical systems, fortifying cybersecurity measures, and ensuring the digital infrastructure could withstand future threats.</p>

<p>The scars of the digital apocalypse would forever serve as a reminder: with great technological advancement comes the responsibility to protect and secure the digital world. The Ogbunigwe Fancy Wolves showed the devastating consequences of unchecked malice in the digital age. The Uwa Messiahs demonstrated the vital importance of ethical hacking and cybersecurity.</p>

<p>The world emerged from the brink — forever changed, forever vigilant. But the threat of cyberattacks remains. New threats emerge all the time. The Uwa Messiahs are still working tirelessly. The future of the world depends on their success.</p>$POST9$,
  'published',
  '2023-12-01 09:00:00+00',
  false
),

-- ── 10. WHATSAPP CHANNELS ─────────────────────────────────────────────────────
(
  'WhatsApp Channels: A Revolution in Communication — And Its Security Risks',
  'Cybersecurity',
  'WhatsApp Channels is a powerful new broadcast feature that lets you follow celebrities, organizations, and news handles. But it comes with real security risks you need to know about.',
  'A complete breakdown of WhatsApp Channels — what it is, how it works, its advantages for businesses and users, and the security risks including spam, phishing, malware, and misinformation.',
  ARRAY['WhatsApp','Cybersecurity','Privacy','Social Media Security','Mobile Security'],
  $POST10$<p>WhatsApp has introduced <strong>WhatsApp Channels</strong> — a one-way broadcast tool that allows users to follow celebrities, news organizations, and other handles of interest. Similar to Telegram channels, administrators can share updates while followers can only read and react without the need for a mutual contact. Sounds useful — but it comes with real security considerations.</p>

<h2>What WhatsApp Channels Offers</h2>
<p>With over 2 billion active users worldwide and 100 billion messages sent daily, WhatsApp Channels gives businesses, organizations, and public figures a powerful way to reach a large engaged audience. Key features include:</p>
<ul>
  <li><strong>Broadcasts:</strong> Share news, announcements, product updates, or support information with all followers at once</li>
  <li><strong>Analytics:</strong> Track views and reactions to understand what content resonates</li>
  <li><strong>Targeted messages:</strong> Reach specific groups based on interests or demographics</li>
  <li><strong>Content categories:</strong> Educational content, entertainment, sports updates, technology news, and more</li>
</ul>

<h2>Security Risks to Be Aware Of</h2>

<h3>Spam and Misinformation</h3>
<p>Without proper moderation, channels can be used to spread spam, fake news, or misinformation. WhatsApp must implement robust reporting mechanisms to combat this issue.</p>

<h3>Phishing and Scams</h3>
<p>Malicious actors may exploit the popularity of WhatsApp Channels to send phishing links or fraudulent content disguised as legitimate organizations — banks, government agencies, or well-known brands.</p>

<h3>Malware Distribution</h3>
<p>Channels can be used to send messages with attachments containing malware. Never download files from channels you do not fully trust.</p>

<h3>Disinformation and Propaganda</h3>
<p>At scale, WhatsApp Channels could be used to spread disinformation — especially concerning in the context of elections and political processes.</p>

<h3>Privacy Concerns</h3>
<p>Ensure you understand how your data is managed when you subscribe to channels. Be cautious before subscribing to channels requesting personal information.</p>

<h2>How to Stay Safe on WhatsApp Channels</h2>
<ul>
  <li><strong>Be selective about who you follow.</strong> Only follow channels from reputable sources you trust.</li>
  <li><strong>Never click links from strangers.</strong> Open websites directly in a browser rather than clicking embedded links.</li>
  <li><strong>Keep WhatsApp updated.</strong> Regular updates include critical security patches.</li>
  <li><strong>Report suspicious content.</strong> Tap the three dots on a message → Report. Do it immediately when you see anything suspicious.</li>
  <li><strong>Be wary of phishing.</strong> Legitimate organizations will never ask for your password, credit card number, or OTP via WhatsApp.</li>
</ul>

<p>WhatsApp Channels has the potential to transform how we stay connected and informed. With the right precautions and responsible usage, it can be a powerful tool for information, entertainment, and connection. But vigilance is key — stay cautious, verify sources, and interact only with trusted channels.</p>$POST10$,
  'published',
  '2023-10-05 09:00:00+00',
  false
);

-- ── 11. OMNIVERSE AFRICA SUMMIT 3.0 REFLECTION ──────────────────────────────
INSERT INTO blog_posts (title, category, excerpt, seo_description, tags, content, status, published_at, is_featured) VALUES
(
  'Africa Is Building: Reflections from Omniverse Africa Summit 3.0',
  'Community',
  'Four days at the National Theatre in Lagos. Researchers, founders, innovators, policymakers, and ecosystem builders from across the continent asking one stubborn question — what will it actually take to build globally competitive African economies?',
  'Reflections from Omniverse Africa Summit 3.0, Lagos. On infrastructure, cybersecurity, collaboration, and what it really takes to build and scale across Africa.',
  ARRAY['Omniverse Africa','Summit','Innovation','Cybersecurity','Entrepreneurship','Community','Africa Tech'],
  $POST11$<p><em>National Theatre, Lagos &middot; 2nd&ndash;5th June, 2026</em></p>

<p>Some events give you information. A few give you clarity. Omniverse Africa Summit 3.0 gave me both, and then something I hadn't expected: conviction.</p>

<p>For four days at the National Theatre in Lagos, researchers, founders, innovators, policymakers, and ecosystem builders from across the continent gathered in one place to ask a single, stubborn question &mdash; what will it actually take to build globally competitive African economies? Not in theory. In practice. The conversations were rich, the panels were sharp, and the insights were worth the trip on their own. But if I'm honest, my biggest takeaway wasn't any single session.</p>

<p>It was the people.</p>

<h2>The real infrastructure is human</h2>

<p>Everywhere I turned, I met people who were already building. Not waiting for permission, not waiting for perfect conditions &mdash; building. And it reminded me of something we don't say often enough: Africa has no shortage of talent, ambition, or ideas. What we've been missing isn't skill. It's the platforms, access, and visibility that let our innovators scale and solve real problems at the level they're capable of.</p>

<p>Every conversation I had opened a new perspective, a new opportunity, or a new possibility for collaboration. Those connections turned out to be the most valuable thing I carried home. You can read a report about a market; you cannot download the trust that forms when two builders realise they're solving adjacent problems and decide to solve them together.</p>

<h2>Day by day, the story sharpened</h2>

<p>The summit had a rhythm to it, and each day moved the conversation one step closer to the ground.</p>

<p>The opening set the tone. Behind all the welcome remarks and keynote conversations was one consistent message: Africa doesn't lack talent &mdash; we need the systems that let that talent scale. It wasn't just talk. It was clarity about what truly matters. Platforms. Access. Visibility. Funding.</p>

<p>The second day turned that clarity into a thesis. Leaders across government, technology, academia, security, and enterprise laid out a chain of dependencies that has stayed with me ever since:</p>

<blockquote>
  <p>Innovation cannot scale without infrastructure.<br/>
  Infrastructure cannot thrive without security.<br/>
  And neither can succeed without collaboration.</p>
</blockquote>

<p>As someone who works in cybersecurity every day, that middle line landed hard. We spend a great deal of energy celebrating innovation, and rightly so &mdash; but innovation sitting on fragile, unsecured infrastructure is a house built on sand. The builders are already here. The real question is whether the infrastructure will rise to meet them.</p>

<p>The third day was about turning conversations into partnerships. Digital transformation, climate innovation, the energy transition, the creator economy, intellectual property, the green economy &mdash; different rooms, different sectors, one recurring truth: Africa&rsquo;s next phase of growth will be built through collaboration. This is where alignment happens. This is where deals begin. This is where a continent moves from potential to performance.</p>

<p>And the final day asked the question every builder eventually has to face. How do ideas, partnerships, and systems actually translate into revenue, growth, and impact? The discussions moved past innovation and into sustainability &mdash; investment readiness, ownership, entrepreneurship, global partnerships. The closing message was one I&rsquo;ve been repeating to myself ever since:</p>

<blockquote>
  <p>Building is important. Scaling is essential. Monetisation is what makes impact sustainable.</p>
</blockquote>

<h2>Beyond the conference halls</h2>

<p>Not all of it happened on stage. Between sessions we stepped into spaces where culture, creativity, education, and enterprise intersect &mdash; and it was a useful reminder that Africa&rsquo;s future won&rsquo;t be engineered by technologists alone. It will be built at the meeting point of art and infrastructure, of storytelling and systems, of creativity and capital.</p>

<h2>What I&rsquo;m carrying forward</h2>

<p>I left Lagos with new insights, valuable connections, and a stronger belief than I arrived with. The summit may have ended, but the mission continues &mdash; and the mission is bigger than any one event.</p>

<p>Africa is not waiting. Africa is executing. And increasingly, Africa is owning its future.</p>

<p>The future of this continent will be built by those bold enough to create it, collaborate to grow it, and stay committed long after the panels end. I intend to be one of them.</p>

<p>Let&rsquo;s keep connecting. Let&rsquo;s keep collaborating. Let&rsquo;s keep building.</p>$POST11$,
  'published',
  '2026-06-10 09:00:00+00',
  true
);

-- ═══════════════════════════════════════════════════════════════════════════
-- TESTIMONIALS
-- ═══════════════════════════════════════════════════════════════════════════
INSERT INTO testimonials (name, role, quote, status, display_order) VALUES
('Dr. Tevin Moodley', 'Supervisor · University of Johannesburg', 'Eric demonstrates a rare combination of deep technical expertise and the ability to communicate complex cybersecurity concepts with clarity. His work in Ethical Hacking and Digital Forensics showed both rigour and genuine curiosity. A standout student.', 'active', 1),
('Onyedikachi Ofooha', 'Client · Certified Cybersecurity Professional', 'I''ve had the pleasure of knowing Eric as a passionate and highly skilled cybersecurity professional. His dedication to ethical hacking, SOC analysis, and cyber operations is truly impressive. Ranked among the top 2% of cyber defenders on TryHackMe, Eric consistently demonstrates deep technical expertise and a commitment to continuous learning. His professionalism, drive, and leadership make him an asset to any team.', 'active', 2),
('Godwin Eze (Godwin Kachi)', 'Mentor · Frontend Developer · StreetHub Technologies', 'With a blend of exposure in web programming and computer logic, Eric found transitioning into cybersecurity a breeze. Now with proficiency across penetration testing to cyber defence, I am happy to recommend that Eric handling your projects is worth the experience you will be happy to pay for. I''ve had the privilege of sitting in his class, and I can''t say less about his mentoring prowess in handing these skills to anyone interested.', 'active', 3),
('Charles Asonye', 'Colleague · Cybersecurity Specialist & AI Automation Engineer', 'I highly recommend Uzoukwu Eric Ikenna, a talented and focused cybersecurity analyst. I''ve seen firsthand how he handles security challenges with skill and precision. He''s smart, dependable, and always looking for ways to improve. Any team would be lucky to have him.', 'active', 4),
('Onyinyechi Nduka', 'Peer · QA Expert & Frontend Developer', 'I''ve known Uzoukwu Eric since his early days as a talented frontend developer. Witnessing his growth into a distinguished cybersecurity expert has been impressive. Our website development collaborations showcased his attention to detail and dedication to secure solutions. He excels in cybersecurity expertise, proactive security measures, and effective communication. I highly recommend him for cybersecurity consulting, web development, and secure coding guidance.', 'active', 5)
ON CONFLICT DO NOTHING;


-- ═══ 4/4: seed_data.sql ═══

-- ═══════════════════════════════════════════════════════════════════════════
-- SEED DATA — Certifications, QA Products, PM Projects
-- Run AFTER supabase-setup-safe.sql
-- ═══════════════════════════════════════════════════════════════════════════

-- ── CERTIFICATIONS ──────────────────────────────────────────────────────────
INSERT INTO certifications (name, issuer, date_earned, "group", display_order) VALUES

-- Cisco
('CyberOps Associate',                                  'Cisco',                              'Dec 2023', 'Cisco Certifications', 1),
('Ethical Hacker — 34 hands-on labs, Kali Linux',      'Cisco',                              'Jul 2025', 'Cisco Certifications', 2),
('Junior Cybersecurity Analyst Career Path',            'Cisco',                              'Jan 2023', 'Cisco Certifications', 3),
('Cyber Threat Management',                             'Cisco',                              'Oct 2023', 'Cisco Certifications', 4),
('Network Defense',                                     'Cisco',                              'Jul 2025', 'Cisco Certifications', 5),
('Endpoint Security',                                   'Cisco',                              'Jul 2025', 'Cisco Certifications', 6),
('Networking Basics & Initial Configuration',           'Cisco',                              'Jul 2025', 'Cisco Certifications', 7),
('Introduction to Cybersecurity',                       'Cisco',                              'Aug 2023', 'Cisco Certifications', 8),
('NDG Linux Essentials',                                'Cisco Networking Academy',           NULL,       'Cisco Certifications', 9),

-- Microsoft & LinkedIn
('Career Essentials in Cybersecurity',                  'Microsoft & LinkedIn',               'Jan 2024', 'Microsoft & LinkedIn', 10),
('Student SOC Program Foundations Training',            'Microsoft',                          'May 2025', 'Microsoft & LinkedIn', 11),
('Career Essentials in Generative AI',                  'Microsoft & LinkedIn',               'Jul 2025', 'Microsoft & LinkedIn', 12),
('Streamlining Your Work with Microsoft Copilot',       'Microsoft / LinkedIn',               'Jun 2025', 'Microsoft & LinkedIn', 13),
('Ethics in the Age of Generative AI',                  'LinkedIn',                           'Jun 2025', 'Microsoft & LinkedIn', 14),

-- Forage
('ANZ Australia — Cyber Security Management',           'Forage',                             'Feb 2024', 'Forage Virtual Experience Programs', 15),
('PwC Switzerland — Cybersecurity Simulation',          'Forage',                             'Dec 2023', 'Forage Virtual Experience Programs', 16),
('Telstra — Cybersecurity Simulation',                  'Forage',                             'Dec 2023', 'Forage Virtual Experience Programs', 17),
('Mastercard — Security Awareness Simulation',          'Forage',                             'Dec 2023', 'Forage Virtual Experience Programs', 18),

-- Specialist & Community
('Certified Cybersecurity Educator Professional (CCEP)','Red Team Leaders',                   'Apr 2026', 'Specialist & Community', 19),
('Certified Project Officer (CPO)',                     'Center for Project Innovation, AU',  NULL,       'Specialist & Community', 20),
('SOC Analyst Internship Certificate',                  'CFSS Cyber & Forensics Security Solutions', 'Mar 2024', 'Specialist & Community', 21),
('Advent of Cyber 2023',                                'TryHackMe',                          'Dec 2023', 'Specialist & Community', 22),
('Introduction to Cyber Security',                      'TryHackMe',                          NULL,       'Specialist & Community', 23),
('Phishing Analyzer',                                   'LetsDefend',                         'Nov 2023', 'Specialist & Community', 24),
('ISC2 Candidate',                                      'ISC2',                               'Oct 2023', 'Specialist & Community', 25),
('Frontend Web Development',                            'Oluaka Institute of Technology',     'Jul 2023', 'Specialist & Community', 26),
('Diploma in Cybersecurity',                            'University of Johannesburg',         '2025',     'Specialist & Community', 27)

ON CONFLICT DO NOTHING;


-- ── QA PRODUCTS ─────────────────────────────────────────────────────────────
INSERT INTO qa_products (name, sector, description, display_order) VALUES
('Terbana',             'Social Commerce',    'Escrow flows, vendor onboarding, pickup verification, dispute resolution and trust-native transaction integrity.',                              1),
('Fuel Alert',          'PropTech / EnergyTech', 'Geolocation, reservation workflows, real-time pricing, station visibility and GPS-based fuel tracking.',                                2),
('KANTEER',             'RetailTech',         'POS transactions, inventory management, multi-branch reporting, staff RBAC and real-time sales analytics.',                                  3),
('CusMap',              'CRM / Analytics',    'Analytics workflows, multi-channel communication pipelines, customer lifecycle tracking and CRM integrity.',                                 4),
('DIGIFY',              'Digital Asset Management', 'Approval workflows, OCR document search, audit logging, role-based document access and version control.',                             5),
('StreetHub Ecosystem', 'EdTech / Community', 'QR certificate verification, digital ID management, internship tracking and community platform quality.',                                   6),
('Schooleer',           'EduTech',            'Academic workflows, staff and finance modules, multi-branch management and branded school deployments.',                                     7),
('GoBuyMe',             'Logistics / Delivery','Order fulfillment, live tracking, rider management, payment integration and on-demand delivery workflows.',                                8),
('All Skills',          'Service Marketplace','OTP verification, GPS-powered service discovery, booking flows, referral system and provider onboarding.',                                  9),
('My Oga Landlord',     'PropTech',           'Digital tenancy agreements, escrow payments, tenant onboarding, property verification and landlord workflows.',                             10),
('MedicSync',           'HealthTech',         'Healthcare interoperability, patient medical identity, multi-facility access control and FHIR-aligned workflows.',                         11),
('My Root Chain',       'Heritage / Identity','Privacy controls, family consent workflows, diaspora governance systems and lineage verification.',                                         12),
('Parcel Tracker',      'Logistics',          'Shipment visibility, delivery workflow validation, status tracking and last-mile delivery confirmation.',                                   13),
('Symbodied',           'AgriTech / Social',  'Social marketplace flows, farmer shop management, community features and blog systems for agricultural commerce.',                         14),
('The Odu Project',     'EdTech / AgriTech',  'E-learning workflows, content management, farmer training modules and community feature quality.',                                         15),
('4FG Monitor',         'IoT / EnergyTech',   'IoT device-to-app communication, real-time LPG monitoring dashboard, alert workflows and hardware-software integration.',                  16),
('Verix / TrustLayer',  'Cybersecurity / Fintech', 'Identity verification API flows, fintech integration testing, trust-scoring decision overlay and security validation.',              17),
('StreetHub Academy',   'EdTech',             'LMS workflows, cohort management, certification systems, instructor dashboards and learning milestone tracking.',                          18)

ON CONFLICT DO NOTHING;


-- ── PM PROJECTS ──────────────────────────────────────────────────────────────
INSERT INTO pm_projects (name, role, description, display_order) VALUES
('DIGIFY',          'Project Manager & QA Lead · StreetHub Technologies',          'Led planning and sprint execution for a full-scale Digital Asset Management platform. Managed design, development and QA teams end-to-end.',                                                              1),
('Schooleer',       'Project Manager & QA Lead · StreetHub Technologies',          'Supervised full-stack development for class management, staff systems, payment modules and academic operations across school branches.',                                                                 2),
('Fuel Alert',      'Project Manager & QA Lead · StreetHub Technologies',          'Developed MVP roadmap and coordinated GPS alerts, station status, fuel reservation and real-time pricing integration.',                                                                                  3),
('Symbodied',       'Project Manager & QA Lead · 2025',                            'Managed stakeholder engagement, UX development and full platform launch for an AgriTech social marketplace for farmers.',                                                                               4),
('The Odu Project', 'Project Manager & QA Lead · 2024',                            'Directed platform development, content strategy and user testing for a farmer-focused training and e-learning platform.',                                                                              5),
('Red Earth Projects','Project Manager & QA Lead · 2024–2025',                     'Oversaw internal automation tools for logistics and e-commerce operations. Coordinated development cycles aligned to business workflows.',                                                              6),
('StreetHub Training','PM, QA Lead & Cybersecurity Instructor · StreetHub Academy','Managed cybersecurity and Linux education cohorts while delivering training. Led instructors, milestones and stakeholder reporting.',                                                                   7),
('Terbana',         'Project Manager & QA Lead · Terbana Ltd',                     'Led product development for Nigeria''s trust-native social commerce platform — escrow flows, vendor onboarding and pickup verification.',                                                               8),
('KANTEER',         'Project Manager & QA Lead · StreetHub Technologies',          'Managed POS and inventory management platform development for retailers and multi-branch businesses across Nigeria.',                                                                                   9),
('GoBuyMe',         'Project Manager & QA Lead · StreetHub Technologies',          'Oversaw multi-service on-demand delivery platform — order fulfillment, live tracking, rider management and payment integration.',                                                                      10),
('MedicSync',       'Project Manager & QA Lead · StreetHub Technologies',          'Led patient-driven interoperable medical records platform — healthcare identity, access control and multi-facility integration.',                                                                      11),
('My Oga Landlord', 'Project Manager & QA Lead · StreetHub Technologies',          'Managed PropTech platform covering digital agreements, escrow payments, tenant onboarding and property verification workflows.',                                                                       12),
('CusMap',          'Project Manager & QA Lead · StreetHub Technologies',          'Led AI-driven CRM platform — analytics pipeline, multi-channel communication systems and customer lifecycle tracking.',                                                                                13),
('All Skills',      'Project Manager & QA Lead · StreetHub Technologies',          'Managed GPS-powered service marketplace — OTP verification, booking flows, provider onboarding and referral systems.',                                                                                14),
('4FG Monitor',     'Project Manager & QA Lead · 4First Technologies',             'Led IoT device and app development — hardware-software integration, firmware development, mobile app connectivity and investor pitch preparation.',                                                   15),
('Verix / TrustLayer','Project Manager & QA Lead · E World Fortress LTD',          'Managed Verix Verify (identity API) and Verix Decide (transaction trust-scoring) — API design, fintech integration and security testing.',                                                           16),
('My Root Chain',   'Project Manager & QA Lead · eWorld Technologies',             'Led AI-powered family lineage platform — privacy controls, consent workflows, diaspora features and governance system development.',                                                                  17)

ON CONFLICT DO NOTHING;
