import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sanborn-fire-maps.myshopify.com',
        pathname: '/cdn/shop/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-23faac8a63b74289910a34142d5d1899.r2.dev',
        pathname: '/**',
      },
    ],
  },
};
export default nextConfig;
