import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PrismaClient } from "../generated/client";

const prisma = new PrismaClient();

/**
 * Runs the existing hand-written seed SQL files as-is (they already use
 * `ON CONFLICT DO NOTHING` against the unique indexes from
 * migration-live-db.sql, so this is idempotent and safe to re-run). This
 * ports ~95 existing rows (blog posts, testimonials, certifications,
 * QA products, PM projects, speaking cards, site_content defaults) without
 * re-transcribing large HTML content blocks by hand.
 *
 * TODO (rewrite plan, execution step 4): seed rows for content that today
 * only exists as hardcoded JS on the public page — ASSESSMENTS and
 * CASE_STUDIES objects, the static Web/App product cards, Ventures cards,
 * and "Tools Built" cards — into the `assessments`, `case_studies`,
 * `products`, `ventures`, and `cybertools` tables respectively. That
 * content is transcribed while apps/web is built section-by-section (so it
 * can be verified against the rendered page directly), not here.
 */
async function runSqlFile(relativePath: string) {
  const fullPath = join(__dirname, "..", "..", "..", relativePath);
  const sql = readFileSync(fullPath, "utf8");
  // Split on statement-terminating semicolons that end a line; the seed
  // files don't use semicolons inside string literals other than within
  // dollar-quoted ($POST1$...$POST1$) blocks, so we execute the whole file
  // as one batch via a single query when possible, falling back to
  // Prisma's $executeRawUnsafe per statement isn't safe for dollar-quoted
  // content — instead we shell out to psql-style execution via a single
  // multi-statement query, which pg supports through Prisma's underlying
  // driver adapter. If this fails for a given file, run it manually via the
  // Supabase SQL editor instead (same one-off process used historically).
  await prisma.$executeRawUnsafe(sql);
  console.log(`Seeded from ${relativePath}`);
}

async function main() {
  await runSqlFile("supabase-setup-safe.sql");
  await runSqlFile("migration-live-db.sql");
  await runSqlFile("blog_posts.sql");
  await runSqlFile("seed_data.sql");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
