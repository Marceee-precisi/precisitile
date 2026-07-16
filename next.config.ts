import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/book", destination: "/quote", permanent: true },
      { source: "/contact", destination: "/quote", permanent: true },
    ];
  },
};

export default nextConfig;
