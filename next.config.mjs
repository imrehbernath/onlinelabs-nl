/** @type {import('next').NextConfig} */
const nextConfig = {
  // ESLint - skip during builds to prevent deployment failures
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.onlinelabs.nl', // Primary CDN (Cloudways via CNAME)
      },
      {
        protocol: 'https',
        hostname: 'wordpress-988065-5984089.cloudwaysapps.com', // Development/fallback
      },
      {
        protocol: 'https',
        hostname: 'gravatar.com',
      },
      {
        protocol: 'https',
        hostname: '*.gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'onlinelabs.nl',
      },
      {
        protocol: 'https',
        hostname: 'www.onlinelabs.nl',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    qualities: [75, 90, 100],
  },

  // Modern JavaScript output
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Redirect www to non-www
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.onlinelabs.nl',
          },
        ],
        destination: 'https://onlinelabs.nl/:path*',
        permanent: true,
      },
    ];
  },

  // Headers voor security & performance
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
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400'
          }
        ],
      },
      {
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/:all*.(jpg|jpeg|gif|png|svg|ico|webp|webm|mp4)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },

  // Compression
  compress: true,

  // Production optimizations
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;