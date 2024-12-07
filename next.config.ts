import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "openapi.kspo.or.kr" }],
  },
  timeout: 10000,
};

export default nextConfig;
