import Hero from './components/Hero';
import ShiftSection from './components/ShiftSection';
import TeunSpotlight from './components/TeunSpotlight';
import SEOBasisSection from './components/SEOBasisSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import LogoSlider from './components/LogoSlider';
import CasesSection from './components/CasesSection';
import BlogSection from './components/BlogSection';
import { getHomepageSettings, getTestimonials, getBlogPosts, getCases } from './lib/wordpress';
// getAllServices niet meer nodig op homepage (ServicesSection is hardcoded)

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
  const [homepageSettings, testimonials, blogPosts, cases] = await Promise.all([
    getHomepageSettings(),  // About section + SEO + Logo Slider
    getTestimonials(100),   // Max 100 testimonials
    getBlogPosts(3),        // Latest 3 blog posts
    getCases(3),            // Latest 3 cases
  ]);

  // ─── WordPress heroData (bewaard als reference voor toekomstige projecten) ───
  // const heroData = homepageSettings?.heroSection ? {
  //   ...homepageSettings.heroSection,
  //   heroImage: homepageSettings.heroSection.heroImage?.node ? {
  //     sourceUrl: replaceWpUrlsToCdn(homepageSettings.heroSection.heroImage.node.sourceUrl),
  //     altText: homepageSettings.heroSection.heroImage.node.altText
  //   } : null,
  //   heroImage2: homepageSettings.heroSection.heroImage2?.node ? {
  //     sourceUrl: replaceWpUrlsToCdn(homepageSettings.heroSection.heroImage2.node.sourceUrl),
  //     altText: homepageSettings.heroSection.heroImage2.node.altText
  //   } : null,
  //   heroVideoWebm: homepageSettings.heroSection.heroVideoWebm?.mediaItemUrl ? {
  //     mediaItemUrl: replaceWpUrlsToCdn(homepageSettings.heroSection.heroVideoWebm.mediaItemUrl)
  //   } : null,
  //   heroVideoMp4: homepageSettings.heroSection.heroVideoMp4?.mediaItemUrl ? {
  //     mediaItemUrl: replaceWpUrlsToCdn(homepageSettings.heroSection.heroVideoMp4.mediaItemUrl)
  //   } : null,
  // } : null;

  // ─── WordPress aboutData (bewaard als reference voor toekomstige projecten) ───
  // const aboutData = homepageSettings?.aboutSection ? {
  //   title: homepageSettings.aboutSection.aboutTitle,
  //   subtitle: homepageSettings.aboutSection.aboutSubtitle,
  //   paragraph1: homepageSettings.aboutSection.aboutParagraph1,
  //   paragraph2: homepageSettings.aboutSection.aboutParagraph2,
  //   targetAudienceTitle: homepageSettings.aboutSection.aboutTargetTitle,
  //   targetAudienceItems: homepageSettings.aboutSection.aboutTargetItems?.map(item => item.item) || [],
  //   image: {
  //     sourceUrl: replaceWpUrlsToCdn(homepageSettings.aboutSection.aboutImage?.node?.sourceUrl) || '/images/workspace-onlinelabs.jpg',
  //     altText: homepageSettings.aboutSection.aboutImage?.node?.altText || 'OnlineLabs workspace in Amsterdam'
  //   },
  //   ctaText: homepageSettings.aboutSection.aboutCtaText || 'over ons',
  //   ctaUrl: homepageSettings.aboutSection.aboutCtaUrl || '/over-ons'
  // } : null;

  // Extract and transform Logo Slider data with CDN URLs
  const logoSliderData = homepageSettings?.logoSlider && homepageSettings.logoSlider.sliderEnabled ? {
    title: homepageSettings.logoSlider.sliderTitle || 'Vertrouwd door toonaangevende bedrijven',
    speed: homepageSettings.logoSlider.sliderSpeed || 'normal',
    grayscale: homepageSettings.logoSlider.sliderGrayscale !== false,
    logos: homepageSettings.logoSlider.logos?.map(logo => ({
      name: logo.companyName,
      imageUrl: replaceWpUrlsToCdn(logo.logoImage?.node?.sourceUrl),
      altText: logo.logoAlt || `${logo.companyName} logo`,
      url: logo.websiteUrl || null
    })) || []
  } : null;

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

      <main>
        {/* Hero Section - Hardcoded nieuwe positionering */}
        <Hero />

        {/* Shift Section - "Het zoeken verandert" */}
        <ShiftSection />

        {/* Teun.ai Spotlight - Eigen platform showcase */}
        <TeunSpotlight />

        {/* SEO Basis - SEO als fundament voor AI-zichtbaarheid */}
        <SEOBasisSection />

        {/* Services Section - Hardcoded diensten */}
        <ServicesSection />

        {/* CTA Section - Call to action na Services */}
        <CTASection 
          title="Klaar om jouw online zichtbaarheid te verbeteren?"
          description="Ontdek hoe OnlineLabs jouw bedrijf helpt groeien met strategische SEO, GEO en webdesign."
          primaryButton={{ text: "Neem contact op", url: "/contact" }}
          secondaryButton={{ text: "Bekijk onze skills", url: "/skills" }}
          variant="primary"
        />

        {/* About Section - Hardcoded, relevante content */}
        <AboutSection 
          aboutData={{
            title: '17 jaar ervaring. Eén missie: jouw groei online.',
            subtitle: 'Meer dan een bureau',
            paragraph1: 'OnlineLabs is geen bureau dat AI als buzzword gebruikt. Wij werken er dagelijks mee. Van ons eigen platform Teun.ai tot de strategieën die we voor klanten inzetten. Ons team combineert jarenlange SEO-kennis met echte technische AI-expertise.',
            paragraph2: '',
            targetAudienceTitle: 'Waarom OnlineLabs?',
            targetAudienceItems: [
              'Eigen AI-visibility platform (Teun.ai)',
              '17+ jaar SEO en online marketing ervaring',
              'Klein team, directe lijnen, geen account managers',
              'Resultaatgericht, transparant en eerlijk advies',
              'Gevestigd aan de Herengracht in Amsterdam',
            ],
            image: {
              sourceUrl: 'https://cdn.onlinelabs.nl/wp-content/uploads/2025/11/Sanne-webdeveloper-bij-OnlineLabs.webp',
              altText: 'Sanne Verschoor, webdeveloper bij OnlineLabs Amsterdam'
            },
            ctaText: 'Over ons',
            ctaUrl: '/over-ons'
          }}
          imageCaption='Sanne Verschoor — Webdesigner & developer, <span style="color: #376eb5; font-weight: 600;">OnlineLabs</span>'
          imageCaptionLink="/auteur/sanne-verschoor"
          background="beige"
        />

        {/* Logo Slider - Partners/Clients showcase (WordPress editable) */}
        {logoSliderData && logoSliderData.logos.length > 0 && (
          <LogoSlider 
            title={logoSliderData.title}
            logos={logoSliderData.logos}
            speed={logoSliderData.speed}
            grayscale={logoSliderData.grayscale}
            background="gray"
          />
        )}

        {/* Cases Section - Featured Projects */}
        {cases && cases.length > 0 && (
          <CasesSection 
            cases={cases}
            title="Uitgelichte cases"
            subtitle="Cases"
          />
        )}

        {/* Blog Section - Latest 3 blog posts with featured layout */}
        {blogPosts && blogPosts.length > 0 && (
          <BlogSection 
            posts={blogPosts}
            title="Laatste Inzichten"
          />
        )}

        {/* Testimonials Section - 3-column slider met auto-rotate */}
        <TestimonialsSection 
          testimonials={testimonials} 
          background="beige"
        />

        {/* Footer volgt direct na Testimonials - geen extra CTA meer */}
      </main>
    </>
  );
}
