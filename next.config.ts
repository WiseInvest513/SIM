import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 允许从外部 URL 加载图片
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  // 实验性功能
  experimental: {
    // 启用 Server Actions
  },
};

export default nextConfig;
