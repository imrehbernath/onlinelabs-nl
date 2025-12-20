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
      // TECHNICAL REDIRECTS
      // ============================================
      {
        source: '/sitemap_index.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },

      // ============================================
      // VACATURE REDIRECTS
      // ============================================
      {
        source: '/allround-online-marketeer-vacature',
        destination: '/contact',
        permanent: true,
      },

      // ============================================
      // AUTEUR / TEAM REDIRECTS
      // ============================================
      {
        source: '/over-ons/imre-bernath',
        destination: '/auteur/imre-bernath',
        permanent: true,
      },
      {
        source: '/over-ons/sanne-verschoor',
        destination: '/auteur/sanne-verschoor',
        permanent: true,
      },
      {
        source: '/over-ons/adrian-enders',
        destination: '/auteur/adrian-enders',
        permanent: true,
      },
      {
        source: '/over-ons/elsa-heijnen',
        destination: '/over-ons',
        permanent: true,
      },
      {
        source: '/team/imre-bernath',
        destination: '/auteur/imre-bernath',
        permanent: true,
      },
      {
        source: '/auteur/elsa-heijnen',
        destination: '/over-ons',
        permanent: true,
      },
      {
        source: '/author/colin-dijkstra',
        destination: '/auteur/colin-dijkstra',
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
        source: '/skills/ai-zichtbaarheid-chatgpt-seo',
        destination: '/skills/geo-optimalisatie',
        permanent: true,
      },
      {
        source: '/skills/google-analytics-4-instellen',
        destination: '/skills/conversie-optimalisatie-specialist',
        permanent: true,
      },
      {
        source: '/website-optimalisatie',
        destination: '/skills/website-snelheid-optimalisatie',
        permanent: true,
      },

      // ============================================
      // MISC REDIRECTS
      // ============================================
      {
        source: '/ai-tools',
        destination: '/skills/geo-optimalisatie',
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

      // ============================================
      // ENGLISH URLS - Specific redirects
      // ============================================
      {
        source: '/en',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/about-us',
        destination: '/over-ons',
        permanent: true,
      },
      {
        source: '/en/contact',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/en/blog',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/skills',
        destination: '/skills',
        permanent: true,
      },
      {
        source: '/en/our-work',
        destination: '/ons-werk',
        permanent: true,
      },
      {
        source: '/en/sitemap',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/en/privacy-statement',
        destination: '/privacyverklaring',
        permanent: true,
      },
      {
        source: '/en/general-conditions',
        destination: '/algemene-voorwaarden',
        permanent: true,
      },
      {
        source: '/en/vacancy-online-marketer',
        destination: '/contact',
        permanent: true,
      },

      // English skills pages
      {
        source: '/en/skills/seo-specialist',
        destination: '/skills/seo-specialist',
        permanent: true,
      },
      {
        source: '/en/skills/seo-specialist-2',
        destination: '/skills/seo-specialist',
        permanent: true,
      },
      {
        source: '/en/skills/get-a-website-made',
        destination: '/skills/website-laten-maken',
        permanent: true,
      },
      {
        source: '/en/skills/ai-visibility-aeo-specialist',
        destination: '/skills/geo-optimalisatie',
        permanent: true,
      },
      {
        source: '/en/skills/ai-visibility-aeo',
        destination: '/skills/geo-optimalisatie',
        permanent: true,
      },
      {
        source: '/en/skills/website-speed-optimization',
        destination: '/skills/website-snelheid-optimalisatie',
        permanent: true,
      },
      {
        source: '/en/skills/online-advertising',
        destination: '/skills/online-adverteren',
        permanent: true,
      },
      {
        source: '/en/skills/website-optimization',
        destination: '/skills/website-snelheid-optimalisatie',
        permanent: true,
      },
      {
        source: '/en/skills/setting-up-google-analytics-4',
        destination: '/skills/conversie-optimalisatie-specialist',
        permanent: true,
      },
      {
        source: '/en/skills/conversion-optimization-specialist',
        destination: '/skills/conversie-optimalisatie-specialist',
        permanent: true,
      },

      // English our-work pages
      {
        source: '/en/our-work/contactcare',
        destination: '/ons-werk',
        permanent: true,
      },
      {
        source: '/en/our-work/fort-island-pampus',
        destination: '/ons-werk/forteiland-pampus',
        permanent: true,
      },
      {
        source: '/en/our-work/hvana',
        destination: '/ons-werk/hvana',
        permanent: true,
      },
      {
        source: '/en/our-work/tubble',
        destination: '/ons-werk',
        permanent: true,
      },
      {
        source: '/en/our-work/asn-auto-damage',
        destination: '/ons-werk/asn-autoschade',
        permanent: true,
      },
      {
        source: '/en/our-work/sec-employment-lawyers',
        destination: '/ons-werk/sec-arbeidsrecht-advocaten',
        permanent: true,
      },
      {
        source: '/en/our-work/evert-groot',
        destination: '/ons-werk/evert-groot',
        permanent: true,
      },
      {
        source: '/en/our-work/the-taste-of-italy',
        destination: '/ons-werk/de-smaak-van-italie',
        permanent: true,
      },
      {
        source: '/en/our-work/signhost',
        destination: '/ons-werk/signhost-entrust',
        permanent: true,
      },
      {
        source: '/ons-werk/signhost',
        destination: '/ons-werk/signhost-entrust',
        permanent: true,
      },
      {
        source: '/en/our-work/galliano',
        destination: '/ons-werk',
        permanent: true,
      },

      // English auteur pages
      {
        source: '/en/auteur/imre-bernath',
        destination: '/auteur/imre-bernath',
        permanent: true,
      },
      {
        source: '/en/auteur/elsa-heijnen',
        destination: '/over-ons',
        permanent: true,
      },
      {
        source: '/en/auteur/adrian-enders',
        destination: '/auteur/adrian-enders',
        permanent: true,
      },
      {
        source: '/en/auteur/sanne-verschoor',
        destination: '/auteur/sanne-verschoor',
        permanent: true,
      },
      {
        source: '/en/about-us/imre-bernath',
        destination: '/auteur/imre-bernath',
        permanent: true,
      },
      {
        source: '/en/about-us/elsa-heijnen',
        destination: '/over-ons',
        permanent: true,
      },
      {
        source: '/en/about-us/adrian-enders',
        destination: '/auteur/adrian-enders',
        permanent: true,
      },
      {
        source: '/en/about-us/sanne-verschoor',
        destination: '/auteur/sanne-verschoor',
        permanent: true,
      },

      // English blog pages - redirect to Dutch equivalents
      {
        source: '/en/blog-en/getting-visible-in-chatgpt-new-ranking-factors-for-ai-replies',
        destination: '/blog/zichtbaar-worden-in-chatgpt',
        permanent: true,
      },
      {
        source: '/en/blog-en/local-seo-for-businesses-10-essential-strategies',
        destination: '/blog/lokale-seo-voor-bedrijven-10-essentiele-strategieen',
        permanent: true,
      },
      {
        source: '/en/blog-en/5-best-wordpress-seo-plugins-of-2025',
        destination: '/blog/5-beste-wordpress-seo-plugins',
        permanent: true,
      },
      {
        source: '/en/blog-en/website-migration-checklist',
        destination: '/blog/website-migratie-checklist',
        permanent: true,
      },
      {
        source: '/en/blog-en/how-to-improve-your-seo-10-practical-tips-and-strategies-for-2025',
        destination: '/blog/10-manieren-om-jouw-seo-te-verbeteren',
        permanent: true,
      },
      {
        source: '/en/blog-en/stay-ahead-with-these-marketing-trends-for-2025',
        destination: '/blog/seo-trends-2026',
        permanent: true,
      },
      {
        source: '/en/blog-en/the-key-web-design-trends-of-2025-innovation-and-inspiration',
        destination: '/blog/de-belangrijkste-webdesign-trends-van-2026-tips',
        permanent: true,
      },
      {
        source: '/en/blog-en/what-does-it-cost-to-build-a-website-price-examples-and-tips',
        destination: '/blog/wat-kost-een-website-laten-bouwen',
        permanent: true,
      },
      {
        source: '/en/blog-en/complete-roadmap-for-putting-your-website-live-in-2025',
        destination: '/blog/stappenplan-voor-het-live-zetten-van-een-website',
        permanent: true,
      },
      {
        source: '/en/blog-en/web-design-trends-2025-valuable-dos-and-donts',
        destination: '/blog/de-belangrijkste-webdesign-trends-van-2026-tips',
        permanent: true,
      },
      {
        source: '/en/blog-en/my-top-4-seo-trends-of-2025-tips',
        destination: '/blog/mijn-top-4-seo-trends-van-2026-tips',
        permanent: true,
      },
      {
        source: '/en/blog-en/using-artificial-intelligence-for-seo-heres-what-to-look-out-for',
        destination: '/blog/kunstmatige-intelligentie-voor-seo',
        permanent: true,
      },
      {
        source: '/en/blog-en/5-digital-marketing-tips-for-local-and-small-businesses',
        destination: '/blog/lokale-online-marketing-tips',
        permanent: true,
      },
      {
        source: '/en/blog-en/seo-trends-2025-revolutionary-strategies-for-online-success',
        destination: '/blog/seo-trends-2026',
        permanent: true,
      },
      {
        source: '/en/blog-en/link-building-ensures-seo-success',
        destination: '/blog/linkbuilding-zorgt-voor-seo-succes',
        permanent: true,
      },
      {
        source: '/en/blog-en/10-signs-you-may-need-a-new-website',
        destination: '/blog/10-signalen-dat-je-nieuwe-website-nodig-hebt',
        permanent: true,
      },
      {
        source: '/en/blog-en/can-an-seo-company-guarantee-page-one',
        destination: '/blog/seo-uitbesteden-waar-moet-ik-op-letten',
        permanent: true,
      },
      {
        source: '/en/blog-en/the-best-seo-tools-for-2025-optimize-your-online-success',
        destination: '/blog/de-meest-effectieve-seo-tools',
        permanent: true,
      },
      {
        source: '/en/blog-en/10-neuromarketing-hacks-for-more-effective-marketing',
        destination: '/blog/10-neuromarketing-hacks',
        permanent: true,
      },
      {
        source: '/en/blog-en/making-wordpress-website-faster',
        destination: '/blog/core-web-vitals',
        permanent: true,
      },
      {
        source: '/en/blog-en/seo-outsourcing-your-guide-to-successful-online-findability',
        destination: '/blog/seo-uitbesteden-waar-moet-ik-op-letten',
        permanent: true,
      },
      {
        source: '/en/blog-en/4-reasons-why-mobile-optimization-is-important-for-your-website',
        destination: '/blog/core-web-vitals',
        permanent: true,
      },
      {
        source: '/en/blog-en/how-do-you-get-and-deal-with-online-reviews',
        destination: '/blog/hoe-krijg-je-online-reviews-en-hoe-ga-je-ermee-om',
        permanent: true,
      },
      {
        source: '/en/blog-en/seo-vs-sea-which-is-the-best-investment-for-your-online-success',
        destination: '/blog/investeren-in-seo-of-in-sea',
        permanent: true,
      },
      {
        source: '/en/blog-en/31-donts-that-ruin-your-website',
        destination: '/blog/10-manieren-om-jouw-seo-te-verbeteren',
        permanent: true,
      },
      {
        source: '/en/blog-en/boost-your-page-with-key-on-page-seo-factors',
        destination: '/blog/on-page-seo-factoren',
        permanent: true,
      },
      {
        source: '/en/blog-en/the-differences-between-google-analytics-ga4-and-universal-analytics',
        destination: '/skills/conversie-optimalisatie-specialist',
        permanent: true,
      },
      {
        source: '/en/blog-en/analyze-with-screaming-frog',
        destination: '/blog/de-meest-effectieve-seo-tools',
        permanent: true,
      },
      {
        source: '/en/blog-en/chatgpt-vs-semrush-keywords-and-metas-in-the-world-of-seo',
        destination: '/blog/kunstmatige-intelligentie-voor-seo',
        permanent: true,
      },
      {
        source: '/en/blog-en/how-do-you-do-good-keyword-research',
        destination: '/blog/hoe-doe-je-een-goed-zoekwoorden-onderzoek',
        permanent: true,
      },
      {
        source: '/en/blog-en/simple-ways-to-collect-customer-feedback',
        destination: '/blog/hoe-krijg-je-online-reviews-en-hoe-ga-je-ermee-om',
        permanent: true,
      },
      {
        source: '/en/blog-en/the-5-most-common-ux-mistakes-that-cost-online-stores-conversions',
        destination: '/blog/15-manieren-om-conversies-te-verhogen',
        permanent: true,
      },
      {
        source: '/en/blog-en/the-page-indexing-tab-the-key-to-findability',
        destination: '/blog/het-tabblad-pagina-indexering',
        permanent: true,
      },
      {
        source: '/en/blog-en/ultimate-seo-guide-for-bloggers-proven-tips-for-increased-traffic-and-growth',
        destination: '/blog/ultieme-seo-gids-voor-bloggers',
        permanent: true,
      },
      {
        source: '/en/blog-en/video-marketing-and-seo-how-video-strengthens-your-online-strategy',
        destination: '/blog/videomarketing-zo-zet-je-video-in-voor-seo-en-conversies',
        permanent: true,
      },
      {
        source: '/en/blog-en/why-a-good-404-page-is-essential-for-user-experience',
        destination: '/blog/het-tabblad-pagina-indexering',
        permanent: true,
      },
      {
        source: '/en/blog-en/4-seo-tips-to-consider',
        destination: '/blog/10-manieren-om-jouw-seo-te-verbeteren',
        permanent: true,
      },
      {
        source: '/en/blog-en/basic-content-optimization-tips-to-boost-your-seo',
        destination: '/blog/on-page-seo-factoren',
        permanent: true,
      },
      {
        source: '/en/blog-en/can-my-website-become-findable',
        destination: '/blog/kan-mijn-website-vindbaar-worden',
        permanent: true,
      },
      {
        source: '/en/blog-en/bad-online-marketing-strategy-4-examples',
        destination: '/blog/10-manieren-om-jouw-seo-te-verbeteren',
        permanent: true,
      },
      {
        source: '/en/blog-en/benefits-of-backlinks-from-high-authority-blogs',
        destination: '/blog/linkbuilding-zorgt-voor-seo-succes',
        permanent: true,
      },
      {
        source: '/en/blog-en/how-do-you-create-a-successful-converting-website',
        destination: '/blog/hoe-maak-je-een-succesvolle-converterende-website',
        permanent: true,
      },
      {
        source: '/en/blog-en/improve-your-websites-user-experience-with-these-4-essential-tips',
        destination: '/blog/15-manieren-om-conversies-te-verhogen',
        permanent: true,
      },
      {
        source: '/en/blog-en/website-analysis-tele2-by-a-specialist',
        destination: '/blog/de-meest-effectieve-seo-tools',
        permanent: true,
      },
      {
        source: '/en/blog-en/15-ways-to-increase-conversions-on-your-website',
        destination: '/blog/15-manieren-om-conversies-te-verhogen',
        permanent: true,
      },
      {
        source: '/en/blog-en/5-seo-steps-for-quick-results',
        destination: '/blog/10-manieren-om-jouw-seo-te-verbeteren',
        permanent: true,
      },
      {
        source: '/en/blog-en/increase-conversions-on-mobile-and-desktop-devices',
        destination: '/blog/conversies-verhogen-op-mobiel-en-desktop-tips',
        permanent: true,
      },
      {
        source: '/en/blog-en/the-power-of-google-discover-for-your-seo-strategy',
        destination: '/blog/seo-trends-2026',
        permanent: true,
      },
      {
        source: '/en/blog-en/what-is-the-importance-of-customer-reviews',
        destination: '/blog/hoe-krijg-je-online-reviews-en-hoe-ga-je-ermee-om',
        permanent: true,
      },
      {
        source: '/en/blog-en/3-tips-to-improve-your-online-reputation',
        destination: '/blog/hoe-krijg-je-online-reviews-en-hoe-ga-je-ermee-om',
        permanent: true,
      },
      {
        source: '/en/blog-en/7-reasons-to-choose-wordpress',
        destination: '/blog/wordpress-website-laten-maken',
        permanent: true,
      },
      {
        source: '/en/blog-en/8-key-technical-seo-mistakes-to-avoid',
        destination: '/blog/10-manieren-om-jouw-seo-te-verbeteren',
        permanent: true,
      },
      {
        source: '/en/blog-en/how-an-optimal-user-experience-improves-your-google-rankings',
        destination: '/blog/15-manieren-om-conversies-te-verhogen',
        permanent: true,
      },
      {
        source: '/en/blog-en/improve-your-findability-with-good-website-maintenance-checklist',
        destination: '/blog/verbeter-je-vindbaarheid-met-goed-website-onderhoud-checklist',
        permanent: true,
      },
      {
        source: '/en/blog-en/search-traffic-drops-after-launching-new-website-website-redesign-seo-guide',
        destination: '/blog/website-migratie-checklist',
        permanent: true,
      },
      {
        source: '/en/blog-en/what-makes-content-good-tips-for-valuable-and-findable-content',
        destination: '/blog/on-page-seo-factoren',
        permanent: true,
      },
      {
        source: '/en/blog-en/14-web-design-tricks-you-need-to-know',
        destination: '/blog/wat-kost-een-website-laten-bouwen',
        permanent: true,
      },
      {
        source: '/en/blog-en/5-benefits-of-online-marketing',
        destination: '/blog/10-manieren-om-jouw-seo-te-verbeteren',
        permanent: true,
      },
      {
        source: '/en/blog-en/7-ways-to-speed-up-your-wordpress-site',
        destination: '/blog/core-web-vitals',
        permanent: true,
      },
      {
        source: '/en/blog-en/voice-search-hey-google-i-want-to-order-a-pizza',
        destination: '/blog/zichtbaar-worden-in-chatgpt',
        permanent: true,
      },
      {
        source: '/en/blog-en/why-good-web-hosting-is-important-for-your-online-success',
        destination: '/blog/core-web-vitals',
        permanent: true,
      },
      {
        source: '/en/blog-en/secure-your-wordpress-website-essential-tips-against-hackers',
        destination: '/blog/wordpress-website-beveiligen',
        permanent: true,
      },

      // ============================================
      // ENGLISH CATCH-ALL (must be LAST)
      // ============================================
      {
        source: '/en/:path*',
        destination: '/',
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