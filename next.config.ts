import type { NextConfig } from "next";

// configure-pages 在 CI 中会自动注入 basePath；本地/其他平台需手动设置
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";
const basePath = repoName ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  // configure-pages 无法注入 .ts 文件，此处显式设置；CI 中 GITHUB_REPOSITORY 会提供值
  basePath: basePath || undefined,
  output: "export",
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
