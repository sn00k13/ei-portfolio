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
