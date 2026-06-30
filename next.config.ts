import type { NextConfig } from "next";
import { fileURLToPath } from "url";
import { dirname } from "path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Pin the Turbopack workspace root to this project. Stray lockfiles in parent
  // directories otherwise make Next infer the wrong root and fail to resolve
  // dependencies (e.g. next-intl).
  turbopack: {
    root: dirname(fileURLToPath(import.meta.url)),
  },
  experimental: {
    optimizePackageImports: ["next-intl"],
  },
  images: {
    loaderFile: "./lib/cdn-loader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-a5ba791005394d34bbaf230dcf95cff9.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
