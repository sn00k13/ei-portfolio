import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/client";

/**
 * Server-only Prisma client singleton. Must never be imported from a "use
 * client" component — this is the sole path to Postgres for both apps,
 * replacing every direct browser Supabase REST call from the old site.
 *
 * Uses a driver adapter (plain `pg` over the Postgres wire protocol) instead
 * of Prisma's native query-engine binary — see schema.prisma's
 * `engineType = "client"`. This was a deliberate fix, not a style choice:
 * the native binary kept getting silently dropped from Netlify's deployed
 * function bundles (every serverless bundler does its own static-import
 * analysis, and the binary is loaded via a computed runtime path that none
 * of them can see), crashing every request in production. A JS/WASM driver
 * has nothing like that to lose.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export * from "../generated/client";
