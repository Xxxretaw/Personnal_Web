import type { NextConfig } from "next";

// configure-pages 在 CI 中会自动注入 basePath；本地/其他平台需手动设置
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";
const basePath = repoName ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
