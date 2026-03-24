import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 允许从外部 URL 加载图片
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  experimental: {},
};

export default nextConfig;
