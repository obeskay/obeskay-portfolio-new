import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Disable problematic features for Docker
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Disable image optimization cache for Docker compatibility
  images: {
    unoptimized: false,
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
        source: '/github',
        destination: 'https://github.com/obeskay',
        permanent: false,
      },
      {
        source: '/linkedin',
        destination: 'https://linkedin.com/in/obeskay',
        permanent: false,
      },
      {
        source: '/email',
        destination: 'mailto:obeskay.mail@gmail.com',
        permanent: false,
      },
      {
        source: '/chateala',
        destination: 'https://chatea.la',
        permanent: false,
      },
      {
        source: '/qrapidito',
        destination: 'https://qrapidito.com',
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
