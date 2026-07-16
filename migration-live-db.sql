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
