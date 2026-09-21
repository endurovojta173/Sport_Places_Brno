import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "export",
  basePath: "/waf_frontend_brno",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
