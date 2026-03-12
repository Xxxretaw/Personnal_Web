/**
 * 静态资源路径 - 在 GitHub Pages 等子路径部署时添加 basePath
 */
const basePath = (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_BASE_PATH) || "";

export function assetUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${p}`;
}
