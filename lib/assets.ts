/**
 * 静态资源路径 - 在 GitHub Pages 等子路径部署时添加 basePath
 */
const basePath = (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_BASE_PATH) || "";

export function assetUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  const full = `${basePath}${p}`;
  // 对含空格、中文等特殊字符的路径进行编码，避免 GitHub Pages 500
  return encodeURI(full);
}
