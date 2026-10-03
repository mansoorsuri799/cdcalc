/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  // Dev-only: allow HMR when the page is opened as 127.0.0.1 instead of localhost
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  
  // Target modern browsers - no legacy polyfills
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Optimize images
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 80, 90, 100],
  },

  async redirects() {
    return [
      {
        source: '/about',
        destination: '/about-us',
        permanent: true,
      },
      // Legacy Roth IRA routes → CD Calculator equivalents
      {
        source: '/roth-ira-contribution-limits',
        destination: '/how-cds-work',
        permanent: true,
      },
      {
        source: '/roth-ira-eligibility',
        destination: '/how-cds-work',
        permanent: true,
      },
      {
        source: '/roth-vs-traditional-ira',
        destination: '/cd-vs-savings-account',
        permanent: true,
      },
      {
        source: '/blog/backdoor-roth-ira-explained',
        destination: '/blog/brokered-cds-explained',
        permanent: true,
      },
      {
        source: '/blog/roth-ira-5-year-rule',
        destination: '/blog/cd-early-withdrawal-penalty',
        permanent: true,
      },
      {
        source: '/blog/how-to-open-a-roth-ira',
        destination: '/how-cds-work',
        permanent: true,
      },
      {
        source: '/blog/roth-ira-vs-401k',
        destination: '/cd-vs-savings-account',
        permanent: true,
      },
      // Legacy asset paths
      {
        source: '/og-image.webp',
        destination: '/feature/og-image-1200x630.webp',
        permanent: true,
      },
      {
        source: '/og-image.png',
        destination: '/feature/og-image-1200x630.webp',
        permanent: true,
      },
      {
        source: '/og-image-square.webp',
        destination: '/feature/og-square-1200x1200.webp',
        permanent: true,
      },
      {
        source: '/twitter-card.webp',
        destination: '/feature/twitter-card-1200x675.webp',
        permanent: true,
      },
      {
        source: '/twitter-card.png',
        destination: '/feature/twitter-card-1200x675.webp',
        permanent: true,
      },
      {
        source: '/feature/og-image.png',
        destination: '/feature/og-image-1200x630.webp',
        permanent: true,
      },
      {
        source: '/feature/og-image-square.png',
        destination: '/feature/og-square-1200x1200.webp',
        permanent: true,
      },
      {
        source: '/feature/twitter-card.png',
        destination: '/feature/twitter-card-1200x675.webp',
        permanent: true,
      },
      {
        source: '/roth-ira-tax-free-growth.webp',
        destination: '/hero-cd-calculator.webp',
        permanent: true,
      },
      {
        source: '/roth-ira-compound-growth.webp',
        destination: '/cd-compound-growth.webp',
        permanent: true,
      },
      {
        source: '/roth-ira-calculator-how-it-works.webp',
        destination: '/how-cds-work.webp',
        permanent: true,
      },
      {
        source: '/roth-vs-traditional-ira.webp',
        destination: '/cd-compounding-frequency.webp',
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/.well-known/:path*',
        destination: '/public/.well-known/:path*',
      },
    ];
  },

  // Skip Next.js legacy polyfills. Target browsers already ship Array.at,
  // Object.hasOwn, etc. (Lighthouse: Legacy JavaScript ~14KB).
  turbopack: {
    resolveAlias: {
      '../build/polyfills/polyfill-module': './src/lib/empty-polyfill.js',
      'next/dist/build/polyfills/polyfill-module': './src/lib/empty-polyfill.js',
      'next/dist/esm/build/polyfills/polyfill-module': './src/lib/empty-polyfill.js',
    },
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '../build/polyfills/polyfill-module': false,
        'next/dist/build/polyfills/polyfill-module': false,
        'next/dist/esm/build/polyfills/polyfill-module': false,
      };
    }
    return config;
  },

  // Optimize headers
  async headers() {
    return [
      // HTML pages: always revalidate so Googlebot gets fresh content.
      // Exclude /_next/static so Next.js can manage hashed-asset caching
      // (custom Cache-Control there breaks HMR in development).
      {
        source: '/((?!_next/static|_next/image).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
      // Public images: long cache but allow revalidation
      {
        source: '/:path*.webp',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/css/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'text/css',
          },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Enable experimental features
  experimental: {
    optimizeCss: true, // Critters inlines critical CSS
    inlineCss: true, // Inline CSS in HTML to eliminate render-blocking (improves FCP/LCP)
    scrollRestoration: true,
    optimizePackageImports: ['react-icons'],
  },
  
  // Modern module/nomodule pattern
  modularizeImports: {
    'react-icons': {
      transform: 'react-icons/{{member}}',
    },
  },
}

module.exports = nextConfig
