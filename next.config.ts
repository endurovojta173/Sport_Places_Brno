import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "export",
  basePath: "/Sport_Places_Brno",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
