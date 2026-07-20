import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // In the default (non-standalone) build, .nft.json trace manifests are
  // just JSON — Next never copies the files they list anywhere; that's
  // left to whatever deploys the app. Netlify's Next.js Runtime plugin
  // evidently doesn't read them for Prisma's WASM query compiler (loaded
  // via a computed runtime path, invisible to static tracing regardless).
  // "standalone" makes Next's own build step perform that copy itself —
  // respecting outputFileTracingIncludes below — into .next/standalone,
  // which Netlify's runtime detects and deploys directly.
  output: "standalone",
  // Pin the workspace root — a stray lockfile up the directory tree
  // (outside this repo) otherwise makes Next.js infer the wrong root and
  // mis-resolve internal build assets.
  outputFileTracingRoot: path.join(__dirname, "..", ".."),
  outputFileTracingIncludes: {
    "/**/*": ["../../packages/db/generated/client/*.wasm"],
  },
  transpilePackages: ["@eui/shared", "@eui/db"],
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
