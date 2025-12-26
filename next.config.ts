import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/6666',
  assetPrefix: '/6666/',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

export default nextConfig;                
