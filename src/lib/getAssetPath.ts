const repo = "Portfolio-next";

export function getAssetPath(path: string) {
  const basePath = process.env.NODE_ENV === "production" ? `/${repo}` : "";
  return `${basePath}${path}`;
}