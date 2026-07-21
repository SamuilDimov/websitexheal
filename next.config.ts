import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: "export",
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
