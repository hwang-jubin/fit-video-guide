import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "openapi.kspo.or.kr" }],
  },
};

export default nextConfig;
