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
        hostname: 'cdn.onlinelabs.nl',
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
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    qualities: [75, 85, 90, 100],
  },

  // Modern JavaScript output
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // 301 Redirects - Comprehensive migration from old to new URLs
  async redirects() {
    return [
      // ============================================
      // non-WWW to WWW (canonical)
      // ============================================
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'onlinelabs.nl' }],
        destination: 'https://www.onlinelabs.nl/:path*',
        permanent: true,
      },

      // ============================================
      // SKILLS - Service page redirects
      // ============================================
      {
        source: '/skills/website-optimalisatie',
        destination: '/skills/website-snelheid-optimalisatie',
        permanent: true,
      },
      {
        source: '/skills/ai-zichtbaarheid-aeo',
        destination: '/skills/geo-optimalisatie',
        permanent: true,
      },
      {
        source: '/skills/ai-zichtbaarheid',
        destination: '/skills/geo-optimalisatie',
        permanent: true,
      },
      {
        source: '/skills/google-analytics-4-instellen',
        destination: '/skills/conversie-optimalisatie-specialist',
        permanent: true,
      },

      // ============================================
      // BLOG - URL changes (slug updates)
      // ============================================
      {
        source: '/blog/jouw-pagina-boosten-met-on-page-seo-factoren',
        destination: '/blog/on-page-seo-factoren',
        permanent: true,
      },
      {
        source: '/blog/kunstmatige-intelligentie-voor-seo-gebruiken-hier-moet-je-op-letten',
        destination: '/blog/kunstmatige-intelligentie-voor-seo',
        permanent: true,
      },
      {
        source: '/blog/10-neuromarketing-hacks-die-jouw-marketing-menselijker-en-effectiever-maken',
        destination: '/blog/10-neuromarketing-hacks',
        permanent: true,
      },
      {
        source: '/blog/het-tabblad-pagina-indexering-de-sleutel-tot-vindbaarheid',
        destination: '/blog/het-tabblad-pagina-indexering',
        permanent: true,
      },
      {
        source: '/blog/10-signalen-dat-je-wellicht-een-nieuwe-website-nodig-hebt',
        destination: '/blog/10-signalen-dat-je-nieuwe-website-nodig-hebt',
        permanent: true,
      },
      {
        source: '/blog/conversies-verhogen-op-mobiele-en-desktop-apparaten',
        destination: '/blog/conversies-verhogen-op-mobiel-en-desktop-tips',
        permanent: true,
      },
      {
        source: '/blog/zichtbaar-worden-in-chatgpt-nieuwe-rankingfactoren-voor-ai-antwoorden',
        destination: '/blog/zichtbaar-worden-in-chatgpt',
        permanent: true,
      },
      {
        source: '/blog/waarom-is-videomarketing-goed-voor-seo',
        destination: '/blog/videomarketing-zo-zet-je-video-in-voor-seo-en-conversies',
        permanent: true,
      },

      // ============================================
      // BLOG - Year updates (2025 → 2026)
      // ============================================
      {
        source: '/blog/seo-trends-2025',
        destination: '/blog/seo-trends-2026',
        permanent: true,
      },
      {
        source: '/blog/mijn-top-4-seo-trends-van-2025-tips',
        destination: '/blog/mijn-top-4-seo-trends-van-2026-tips',
        permanent: true,
      },
      {
        source: '/blog/webdesign-trends-2025',
        destination: '/blog/de-belangrijkste-webdesign-trends-van-2026-tips',
        permanent: true,
      },
      {
        source: '/blog/webdesign-trends-2025-waardevolle-dos-en-donts',
        destination: '/blog/de-belangrijkste-webdesign-trends-van-2026-tips',
        permanent: true,
      },

      // ============================================
      // BLOG - Consolidation (merged into pillar pages)
      // ============================================
      {
        source: '/blog/7-manieren-om-jouw-wordpress-site-te-versnellen',
        destination: '/blog/core-web-vitals',
        permanent: true,
      },
      {
        source: '/blog/wordpress-website-sneller-maken',
        destination: '/blog/core-web-vitals',
        permanent: true,
      },
      {
        source: '/blog/4-seo-tips-om-rekening-mee-te-houden',
        destination: '/blog/10-manieren-om-jouw-seo-te-verbeteren',
        permanent: true,
      },
      {
        source: '/blog/5-seo-stappen-voor-snel-resultaat',
        destination: '/blog/10-manieren-om-jouw-seo-te-verbeteren',
        permanent: true,
      },
      {
        source: '/blog/8-seo-issues-die-je-zeker-goed-moet-hebben',
        destination: '/blog/10-manieren-om-jouw-seo-te-verbeteren',
        permanent: true,
      },
      {
        source: '/blog/wat-zijn-de-voordelen-van-het-ontvangen-van-backlinks-van-blogs-met-een-hoge-autoriteit',
        destination: '/blog/linkbuilding-zorgt-voor-seo-succes',
        permanent: true,
      },
      {
        source: '/blog/5-user-experience-fouten-die-je-webwinkel-conversies-kosten',
        destination: '/blog/15-manieren-om-conversies-te-verhogen',
        permanent: true,
      },
      {
        source: '/blog/wordpress-website-bouwen',
        destination: '/blog/wordpress-website-laten-maken',
        permanent: true,
      },
      {
        source: '/blog/14-webdesign-trucs-die-je-moet-kennen',
        destination: '/blog/wat-kost-een-website-laten-bouwen',
        permanent: true,
      },
      {
        source: '/blog/5-digitale-marketingtips-voor-lokale-en-kleine-bedrijven',
        destination: '/blog/lokale-online-marketing-tips',
        permanent: true,
      },
      {
        source: '/blog/analyseer-je-website-met-screaming-frog-seo',
        destination: '/blog/de-meest-effectieve-seo-tools',
        permanent: true,
      },
      {
        source: '/blog/chatgpt-vs-semrush-zoekwoorden-en-metas-in-de-wereld-van-seo',
        destination: '/blog/kunstmatige-intelligentie-voor-seo',
        permanent: true,
      },
      {
        source: '/blog/heb-jij-een-goede-404-pagina-en-is-dit-wel-nodig',
        destination: '/blog/het-tabblad-pagina-indexering',
        permanent: true,
      },
      {
        source: '/blog/eenvoudige-manieren-om-feedback-van-klanten-te-verzamelen',
        destination: '/blog/hoe-krijg-je-online-reviews-en-hoe-ga-je-ermee-om',
        permanent: true,
      },
      {
        source: '/blog/wat-is-het-belang-van-klantreviews',
        destination: '/blog/hoe-krijg-je-online-reviews-en-hoe-ga-je-ermee-om',
        permanent: true,
      },
      {
        source: '/blog/3-tips-online-reputatie-verbeteren',
        destination: '/blog/hoe-krijg-je-online-reviews-en-hoe-ga-je-ermee-om',
        permanent: true,
      },
      {
        source: '/blog/website-redesign-en-de-gevolgen-voor-seo',
        destination: '/blog/website-migratie-checklist',
        permanent: true,
      },
      {
        source: '/blog/user-experience-is-een-google-ranking-factor',
        destination: '/blog/15-manieren-om-conversies-te-verhogen',
        permanent: true,
      },
      {
        source: '/blog/de-gebruikerservaring-van-je-website-verbeteren-stel-jezelf-deze-vier-vragen',
        destination: '/blog/15-manieren-om-conversies-te-verhogen',
        permanent: true,
      },
      {
        source: '/blog/basis-content-optimalisatie-tips-om-jouw-seo-te-versterken',
        destination: '/blog/on-page-seo-factoren',
        permanent: true,
      },

      // ============================================
      // BLOG - Removed articles (redirect to relevant content)
      // ============================================
      {
        source: '/blog/voice-search-hey-google-ik-wil-een-pizza-bestellen',
        destination: '/blog/zichtbaar-worden-in-chatgpt',
        permanent: true,
      },
      {
        source: '/blog/31-donts-die-je-website-verpesten',
        destination: '/blog/10-manieren-om-jouw-seo-te-verbeteren',
        permanent: true,
      },
      {
        source: '/blog/website-analyse-tele2-door-een-specialist',
        destination: '/blog/de-meest-effectieve-seo-tools',
        permanent: true,
      },
      {
        source: '/blog/de-kracht-van-google-discover-voor-jouw-seo-strategie',
        destination: '/blog/seo-trends-2026',
        permanent: true,
      },
      {
        source: '/blog/4-redenen-waarom-mobiele-optimalisatie-belangrijk-is-voor-je-website',
        destination: '/blog/core-web-vitals',
        permanent: true,
      },
      {
        source: '/blog/blijf-voorop-met-deze-marketing-trends-voor-2025',
        destination: '/blog/seo-trends-2026',
        permanent: true,
      },
      {
        source: '/blog/waarom-is-het-essentieel-om-de-beste-webhosting-voor-jouw-website-te-kiezen',
        destination: '/blog/core-web-vitals',
        permanent: true,
      },
      {
        source: '/blog/5-voordelen-van-online-marketing',
        destination: '/blog/10-manieren-om-jouw-seo-te-verbeteren',
        permanent: true,
      },
      {
        source: '/blog/kan-een-seo-bedrijf-pagina-een-garanderen',
        destination: '/blog/seo-uitbesteden-waar-moet-ik-op-letten',
        permanent: true,
      },
      {
        source: '/blog/wat-is-goede-content',
        destination: '/blog/on-page-seo-factoren',
        permanent: true,
      },
      {
        source: '/blog/slechte-online-marketing-strategie-4-voorbeelden',
        destination: '/blog/10-manieren-om-jouw-seo-te-verbeteren',
        permanent: true,
      },
      {
        source: '/blog/de-verschillen-tussen-google-analytics-ga4-en-universal-analytics',
        destination: '/skills/conversie-optimalisatie-specialist',
        permanent: true,
      },
      {
        source: '/ai-tools',
        destination: '/skills/geo-optimalisatie',
        permanent: true,
      },
      {
        source: '/author/colin-dijkstra',
        destination: '/auteur/colin-dijkstra',
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
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' },
        ],
      },
      {
        source: '/_next/image/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:all*.(jpg|jpeg|gif|png|svg|ico|webp|webm|mp4)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },

  // Compression
  compress: true,

  // Production optimizations
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;