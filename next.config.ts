import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Статический экспорт — на выходе папка out/ (HTML/CSS/JS) для хостинга рег.ру
  output: "export",
  // Без серверного оптимизатора картинок (статика)
  images: { unoptimized: true },
  // Ссылки вида /page/ + отдача page/index.html — удобно для статического хостинга
  trailingSlash: true,
};

export default nextConfig;
