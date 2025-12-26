import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/6666",
  assetPrefix: "/6666/",
  images: {
    unoptimized: true,
  },
}

export default nextConfig
