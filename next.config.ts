import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  output: "standalone",
  // Пока на сайте один плагин. Временный (307): корень потом станет страницей Secret Sauce.
  async redirects() {
    return [{ source: "/", destination: "/gentra-fx", permanent: false }];
  },
};

export default nextConfig;
