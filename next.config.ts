import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // the root layout lives under app/[lang], so unmatched URLs need their own 404
    globalNotFound: true,
  },
};

export default nextConfig;
