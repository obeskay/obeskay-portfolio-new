import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  
  // Disable image optimization cache completely for Docker
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: "/email",
        destination: "mailto:fer.esc1509@gmail.com",
        permanent: false,
      },
      {
        source: "/instagram",
        destination: "https://www.instagram.com/fernanda.esr/",
        permanent: false,
      },
      {
        source: "/threads",
        destination: "https://www.threads.com/@fernanda.esr",
        permanent: false,
      },
      {
        source: "/whatsapp",
        destination: "https://wa.me/525523191080",
        permanent: false,
      },
    ];
  },
  
  // Headers for SEO and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
        ],
      },
    ];
  },
  
  // Optimize for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
