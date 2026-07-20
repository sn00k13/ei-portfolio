import { Pool } from "pg";

/**
 * Plain `pg` data layer for apps/web — deliberately NOT using @eui/db's
 * Prisma client here (apps/admin keeps Prisma; it works there).
 *
 * Netlify's Next.js Runtime repackages every route into its own function
 * using its own logic, ignoring Next's build output entirely — four
 * separate, individually-correct fixes for getting Prisma's query engine
 * (native binary, then WASM compiler) into that deployed bundle all failed
 * identically. Plain `pg` has no engine of any kind to lose: nothing is
 * loaded from a computed runtime path, so there is nothing for any
 * bundler's packaging step to miss.
 */
const globalForPool = globalThis as unknown as { pgPool?: Pool };

export const pool =
  globalForPool.pgPool ?? new Pool({ connectionString: process.env.DATABASE_URL });

if (process.env.NODE_ENV !== "production") {
  globalForPool.pgPool = pool;
}

export interface SiteContentRow {
  key: string;
  value: string | null;
}

export async function getSiteContent(): Promise<SiteContentRow[]> {
  const { rows } = await pool.query(`select key, value from site_content`);
  return rows;
}

export interface AssessmentRow {
  id: string;
  title: string;
  tag: string | null;
  label: string | null;
  overview: string | null;
  findings: string[];
  outcome: string | null;
  toolsUsed: string[];
  metrics: { outcomes?: { val: string; label: string }[] } | null;
}

export async function getAssessments(): Promise<AssessmentRow[]> {
  const { rows } = await pool.query(`
    select id, title, tag, label, overview,
      coalesce(findings, '{}') as findings,
      outcome,
      coalesce(tools_used, '{}') as "toolsUsed",
      metrics
    from assessments
    order by display_order asc nulls last, id asc
  `);
  return rows;
}

export interface CyberToolRow {
  id: string;
  name: string;
  category: string | null;
  description: string | null;
  techStack: string[];
  githubUrl: string | null;
}

export async function getCyberTools(): Promise<CyberToolRow[]> {
  const { rows } = await pool.query(`
    select id, name, category, description,
      coalesce(tech_stack, '{}') as "techStack",
      github_url as "githubUrl"
    from cybertools
    order by display_order asc nulls last, id asc
  `);
  return rows;
}

export interface ProductRow {
  id: string;
  name: string;
  sector: string | null;
  status: string | null;
  description: string | null;
  techStack: string[];
  logoUrl: string | null;
  websiteUrl: string | null;
}

export async function getProducts(): Promise<ProductRow[]> {
  const { rows } = await pool.query(`
    select id, name, sector, status, description,
      coalesce(tech_stack, '{}') as "techStack",
      logo_url as "logoUrl",
      website_url as "websiteUrl"
    from products
    order by display_order asc nulls last, id asc
  `);
  return rows;
}

export interface QaProductRow {
  id: string;
  name: string;
  sector: string | null;
  description: string | null;
}

export async function getQaProducts(): Promise<QaProductRow[]> {
  const { rows } = await pool.query(`
    select id, name, sector, description
    from qa_products
    order by display_order asc nulls last, id asc
  `);
  return rows;
}

export interface PmProjectRow {
  id: string;
  name: string;
  role: string | null;
  description: string | null;
}

export async function getPmProjects(): Promise<PmProjectRow[]> {
  const { rows } = await pool.query(`
    select id, name, role, description
    from pm_projects
    order by display_order asc nulls last, id asc
  `);
  return rows;
}

export interface VentureRow {
  id: string;
  name: string;
  type: string | null;
  role: string | null;
  status: string | null;
  description: string | null;
  logoUrl: string | null;
  accentColor: string | null;
  websiteUrl: string | null;
}

export async function getVentures(): Promise<VentureRow[]> {
  const { rows } = await pool.query(`
    select id, name, type, role, status, description,
      logo_url as "logoUrl",
      accent_color as "accentColor",
      website_url as "websiteUrl"
    from ventures
    order by display_order asc nulls last, id asc
  `);
  return rows;
}

export interface CertificationRow {
  id: string;
  name: string;
  issuer: string;
  dateEarned: string | null;
  group: string | null;
}

export async function getCertifications(): Promise<CertificationRow[]> {
  const { rows } = await pool.query(`
    select id, name, issuer,
      date_earned as "dateEarned",
      "group"
    from certifications
    order by display_order asc nulls last, id asc
  `);
  return rows;
}

export interface SpeakingCardRow {
  id: string;
  title: string;
  type: string;
  datePeriod: string | null;
  location: string | null;
  organisation: string | null;
  myRole: string | null;
  shortDescription: string | null;
  fullDescription: string | null;
  status: string | null;
}

export async function getSpeakingCards(): Promise<SpeakingCardRow[]> {
  const { rows } = await pool.query(`
    select id, title, type,
      date_period as "datePeriod",
      location, organisation,
      my_role as "myRole",
      short_description as "shortDescription",
      full_description as "fullDescription",
      status
    from speaking_cards
    where status is distinct from 'hidden'
    order by display_order asc nulls last, id asc
  `);
  return rows;
}

export interface EventRow {
  id: string;
  name: string;
  type: string;
  status: string | null;
  dateStart: Date;
  dateEnd: Date | null;
  location: string;
  organisation: string | null;
  myRole: string | null;
  eventLink: string | null;
  shortDescription: string | null;
  fullDescription: string | null;
}

export async function getEvents(): Promise<EventRow[]> {
  const { rows } = await pool.query(`
    select id, name, type, status,
      date_start as "dateStart",
      date_end as "dateEnd",
      location, organisation,
      my_role as "myRole",
      event_link as "eventLink",
      short_description as "shortDescription",
      full_description as "fullDescription"
    from events
    order by date_start desc, id desc
  `);
  return rows;
}

export interface TestimonialRow {
  id: string;
  quote: string;
  name: string;
  role: string | null;
  avatar: string | null;
}

export async function getTestimonials(): Promise<TestimonialRow[]> {
  const { rows } = await pool.query(`
    select id, quote, name, role, avatar
    from testimonials
    where status = 'active'
    order by display_order asc nulls last, id asc
  `);
  return rows;
}

export interface CaseStudyRow {
  id: string;
  title: string;
  tag: string | null;
  label: string | null;
  challenge: string | null;
  results: string[];
  techStack: string[];
  fullDetails: string | null;
  outcomes: { val: string; label: string }[] | null;
}

export async function getCaseStudies(): Promise<CaseStudyRow[]> {
  const { rows } = await pool.query(`
    select id, title, tag, label, challenge,
      coalesce(results, '{}') as results,
      coalesce(tech_stack, '{}') as "techStack",
      full_details as "fullDetails",
      outcomes
    from case_studies
    order by display_order asc nulls last, id asc
  `);
  return rows;
}

export interface BlogPostRow {
  id: string;
  slug: string | null;
  title: string;
  category: string;
  coverImage: string | null;
  excerpt: string | null;
  content: string;
  publishedAt: Date | null;
  seoDescription: string | null;
  ogImage: string | null;
  tags: string[];
}

export async function getPublishedBlogPosts(): Promise<BlogPostRow[]> {
  const { rows } = await pool.query(`
    select id, slug, title, category,
      cover_image as "coverImage",
      excerpt, content,
      published_at as "publishedAt",
      seo_description as "seoDescription",
      og_image as "ogImage",
      coalesce(tags, '{}') as tags
    from blog_posts
    where status = 'published'
    order by published_at desc nulls last, id desc
  `);
  return rows;
}

export async function getPublishedBlogPostBySlug(slug: string): Promise<BlogPostRow | null> {
  const { rows } = await pool.query(
    `
    select id, slug, title, category,
      cover_image as "coverImage",
      excerpt, content,
      published_at as "publishedAt",
      seo_description as "seoDescription",
      og_image as "ogImage",
      coalesce(tags, '{}') as tags
    from blog_posts
    where slug = $1 and status = 'published'
    limit 1
  `,
    [slug]
  );
  return rows[0] ?? null;
}

export async function createContactSubmission(data: {
  name: string;
  email: string;
  subject: string | null;
  message: string;
}): Promise<void> {
  await pool.query(
    `insert into contact_submissions (name, email, subject, message) values ($1, $2, $3, $4)`,
    [data.name, data.email, data.subject, data.message]
  );
}

export async function upsertNewsletterSubscriber(email: string): Promise<void> {
  await pool.query(
    `insert into newsletter_subscribers (email) values ($1) on conflict (email) do nothing`,
    [email]
  );
}
