import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
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
