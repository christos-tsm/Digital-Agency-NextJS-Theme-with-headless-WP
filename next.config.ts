import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'mediamind.test',
        port: '', // leave empty if no specific port
        pathname: '/wp-content/uploads/**',
      },
    ]
  }
};

export default nextConfig;
