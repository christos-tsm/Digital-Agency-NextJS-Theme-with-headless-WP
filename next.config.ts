import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: false,
    formats: ['image/webp'],
    qualities: [100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.WP_IMAGES_DOMAIN || '',
        port: '', // leave empty if no specific port
        pathname: '/wp-content/uploads/**',
      },
    ]
  }
};

export default nextConfig;
