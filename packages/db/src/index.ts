import { PrismaClient } from "../generated/client";

/**
 * Server-only Prisma client singleton. Must never be imported from a "use
 * client" component — this is the sole path to Postgres for both apps,
 * replacing every direct browser Supabase REST call from the old site.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export * from "../generated/client";
