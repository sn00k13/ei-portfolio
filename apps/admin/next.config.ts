import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root — a stray lockfile up the directory tree
  // (outside this repo) otherwise makes Next.js infer the wrong root and
  // mis-resolve internal build assets.
  outputFileTracingRoot: path.join(__dirname, "..", ".."),
  transpilePackages: ["@eui/shared"],
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
