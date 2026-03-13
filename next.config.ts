import type { NextConfig } from "next";

// NEXT_PUBLIC_BASE_PATH 由 CI 构建时作为真实系统环境变量注入（见 .github/workflows/nextjs.yml）
// 本地开发时为空字符串，GitHub Pages 部署时为 "/Personnal_Web"
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  basePath: basePath || undefined,
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
