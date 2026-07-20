import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root — a stray lockfile up the directory tree
  // (outside this repo) otherwise makes Next.js infer the wrong root and
  // mis-resolve internal build assets.
  outputFileTracingRoot: path.join(__dirname, "..", ".."),
  transpilePackages: ["@eui/shared", "@eui/db"],
  // Next's file tracer follows static imports to decide what ships in the
  // serverless bundle. Prisma's native query-engine binary is loaded via a
  // computed runtime path, not a static require, so the tracer misses it —
  // the deployed function crashes with "could not locate the Query Engine"
  // even though the file exists in packages/db/generated/client at build
  // time. Force-include it explicitly.
  outputFileTracingIncludes: {
    "/**/*": ["../../packages/db/generated/client/**/*"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
