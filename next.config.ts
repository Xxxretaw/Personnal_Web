import type { NextConfig } from "next";

// GitHub Pages 部署到 username.github.io/repo-name/，需要 basePath 才能正确加载图片等静态资源
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";
const basePath = repoName ? `/${repoName}` : "";
const assetPrefix = basePath ? `${basePath}/` : undefined;

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
