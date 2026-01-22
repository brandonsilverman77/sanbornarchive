import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sanborn-fire-maps.myshopify.com',
        pathname: '/cdn/shop/**',
      },
    ],
  },
};

export default nextConfig;
