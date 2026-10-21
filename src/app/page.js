import HomeView from './components/v2027/HomeView';
import { getHomepageSettings, getTestimonials } from './lib/wordpress';

const SITE_URL = 'https://www.onlinelabs.nl';
const CDN_URL = 'https://cdn.onlinelabs.nl';

// Helper: Replace WordPress URLs with production URLs (for canonical, JSON-LD)
function replaceWpUrls(str) {
  if (!str || typeof str !== 'string') return str;
  return str.replace(
    /https:\/\/wordpress-988065-5984089\.cloudwaysapps\.com/g,
    SITE_URL
  );
}

// Helper: Replace WordPress URLs with CDN URLs (for images/media - better Core Web Vitals)
function replaceWpUrlsToCdn(str) {
  if (!str || typeof str !== 'string') return str;
  return str.replace(
    /https:\/\/wordpress-988065-5984089\.cloudwaysapps\.com/g,
    CDN_URL
  );
}

// SEO Metadata - wordt overschreven door Rank Math data indien beschikbaar
export async function generateMetadata() {
  const homepageSettings = await getHomepageSettings();
  
  // Gebruik Rank Math SEO data indien beschikbaar
  if (homepageSettings?.seo) {
    return {
      title: {
        absolute: homepageSettings.seo.title || 'OnlineLabs | Zichtbaar in Google, ChatGPT én Perplexity sinds 2008'
      },
      description: homepageSettings.seo.description || 'Online marketing bureau Amsterdam met eigen AI-platform Teun.ai. SEO, GEO optimalisatie, webdesign en conversie. 17 jaar ervaring, 150+ klanten.',
      alternates: {
        canonical: '/',
      },
      openGraph: {
        title: homepageSettings.seo.openGraph?.title || homepageSettings.seo.title,
        description: homepageSettings.seo.openGraph?.description || homepageSettings.seo.description,
        url: '/',
        images: homepageSettings.seo.openGraph?.image?.url 
          ? [replaceWpUrlsToCdn(homepageSettings.seo.openGraph.image.url)] 
          : ['/og-image-homepage.jpg'],
        type: 'website',
        locale: 'nl_NL',
        siteName: 'OnlineLabs',
      },
      twitter: {
        card: 'summary_large_image',
        title: homepageSettings.seo.openGraph?.title || homepageSettings.seo.title,
        description: homepageSettings.seo.openGraph?.description || homepageSettings.seo.description,
        images: homepageSettings.seo.openGraph?.image?.url 
          ? [replaceWpUrlsToCdn(homepageSettings.seo.openGraph.image.url)] 
          : ['/og-image-homepage.jpg'],
      },
    };
  }

  // Fallback metadata
  return {
    title: 'OnlineLabs | Zichtbaar in Google, ChatGPT én Perplexity sinds 2008',
    description: 'Online marketing bureau Amsterdam met eigen AI-platform Teun.ai. SEO, GEO optimalisatie, webdesign en conversie. 17 jaar ervaring, 150+ klanten.',
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: 'OnlineLabs | Zichtbaar in Google, ChatGPT én Perplexity sinds 2008',
      description: 'Online marketing bureau Amsterdam met eigen AI-platform Teun.ai. SEO, GEO optimalisatie, webdesign en conversie. 17 jaar ervaring, 150+ klanten.',
      url: '/',
      images: ['/og-image-homepage.jpg'],
      type: 'website',
      locale: 'nl_NL',
      siteName: 'OnlineLabs',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'OnlineLabs | Zichtbaar in Google, ChatGPT én Perplexity sinds 2008',
      description: 'Online marketing bureau Amsterdam met eigen AI-platform Teun.ai. SEO, GEO optimalisatie, webdesign en conversie. 17 jaar ervaring, 150+ klanten.',
      images: ['/og-image-homepage.jpg'],
    },
  };
}

// 🚀 CRITICAL voor Performance: ISR met 24 uur cache
export const revalidate = 86400;

export default async function Home() {
  // Fetch data from WordPress (server-side, cached 24u)
  const [homepageSettings, testimonials] = await Promise.all([
    getHomepageSettings(),  // SEO + Logo Slider
    getTestimonials(100),   // Max 100 testimonials
  ]);

  // Reviews uit WordPress (geen gedachtestreepjes in de weergave)
  const cleanDash = (str) => (str || '').replace(/\s+[—–]\s+/g, ', ').trim();
  const reviews = (testimonials || [])
    .map((t) => {
      const d = t?.testimonialDetails || {};
      const q = cleanDash(d.shortQuote || d.fullReview);
      const role = [d.reviewerRole, d.reviewerCompany].filter(Boolean).join(', ');
      return { q, n: d.reviewerName || t?.title || '', r: role };
    })
    .filter((r) => r.q);

  // Logo's uit de Logo Slider in WordPress, verdeeld over twee rijen
  const allLogos = (homepageSettings?.logoSlider?.logos || [])
    .map((logo) => ({
      n: logo.companyName || '',
      src: replaceWpUrlsToCdn(logo.logoImage?.node?.sourceUrl),
      href: logo.websiteUrl || '#',
    }))
    .filter((l) => l.src);
  const half = Math.ceil(allLogos.length / 2);
  const mkRow = (row) => {
    const base = row.map((l) => ({ ...l, dup: 'false', tab: '0' }));
    return base.concat(base.map((l) => ({ ...l, dup: 'true', tab: '-1' })));
  };
  const logosTop = mkRow(allLogos.slice(0, half));
  const logosBottom = mkRow(allLogos.slice(half));

  // Process JSON-LD from Rank Math: replace WordPress URLs with production URLs (NOT CDN for SEO)
  const processedJsonLd = homepageSettings?.seo?.jsonLd?.raw 
    ? replaceWpUrls(homepageSettings.seo.jsonLd.raw)
        .replace(/<script[^>]*>/gi, '')
        .replace(/<\/script>/gi, '')
        .trim()
    : null;

  return (
    <>
      {/* Rank Math Structured Data (Organization, WebSite, VideoObject, WebPage) */}
      {processedJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: processedJsonLd }}
        />
      )}

      {/* Homepage 2027 */}
      <HomeView reviews={reviews} logosTop={logosTop} logosBottom={logosBottom} />
    </>
  );
}
