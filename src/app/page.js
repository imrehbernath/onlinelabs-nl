import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import TestimonialsSection from './components/TestimonialsSection';
import { getHomepageSettings, getAllServices, getTestimonials } from './lib/wordpress';

// SEO Metadata
export const metadata = {
  title: "OnlineLabs – Online marketing bureau uit Amsterdam sinds '08",
  description: 'OnlineLabs helpt bedrijven groeien met SEO, webdesign, Ads en AI-zichtbaarheid. Strategisch online marketing bureau uit Amsterdam – actief in heel Nederland.',
  keywords: ['Online marketing Amsterdam', 'SEO bureau', 'GEO optimalisatie', 'WordPress specialist', 'AI zichtbaarheid', 'Online marketing', 'Google Ads', 'Webdesign'],
  alternates: {
    canonical: 'https://www.onlinelabs.nl',
  },
  openGraph: {
    title: "OnlineLabs – Online marketing bureau uit Amsterdam sinds '08",
    description: 'OnlineLabs helpt bedrijven groeien met SEO, webdesign, Ads en AI-zichtbaarheid. Strategisch online marketing bureau uit Amsterdam – actief in heel Nederland.',
    url: 'https://www.onlinelabs.nl',
    images: [{
      url: 'https://www.onlinelabs.nl/og-image-onlinelabs.jpg',
      width: 1200,
      height: 630,
      alt: 'OnlineLabs - Online Marketing Bureau Amsterdam',
    }],
    type: 'website',
    locale: 'nl_NL',
    siteName: 'OnlineLabs',
  },
  twitter: {
    card: 'summary_large_image',
    title: "OnlineLabs – Online marketing bureau uit Amsterdam sinds '08",
    description: 'OnlineLabs helpt bedrijven groeien met SEO, webdesign, Ads en AI-zichtbaarheid. Strategisch online marketing bureau uit Amsterdam – actief in heel Nederland.',
    images: ['https://www.onlinelabs.nl/og-image-onlinelabs.jpg'],
  },
};

// 🚀 CRITICAL voor Performance: ISR met 24 uur cache
export const revalidate = 86400;

export default async function Home() {
  // Fetch data from WordPress (server-side, cached 24u)
  const [homepageSettings, services, testimonials] = await Promise.all([
    getHomepageSettings(),  // Hero + About sections
    getAllServices(),
    getTestimonials(100),   // Max 100 testimonials
  ]);

  // Extract Hero data
  const heroData = homepageSettings?.heroSection;

  // Extract and transform About section data
  const aboutData = homepageSettings?.aboutSection ? {
    title: homepageSettings.aboutSection.aboutTitle,
    subtitle: homepageSettings.aboutSection.aboutSubtitle,
    paragraph1: homepageSettings.aboutSection.aboutParagraph1,
    paragraph2: homepageSettings.aboutSection.aboutParagraph2,
    targetAudienceTitle: homepageSettings.aboutSection.aboutTargetTitle,
    targetAudienceItems: homepageSettings.aboutSection.aboutTargetItems?.map(item => item.item) || [],
    image: {
      sourceUrl: homepageSettings.aboutSection.aboutImage?.node?.sourceUrl || '/images/workspace-onlinelabs.jpg',
      altText: homepageSettings.aboutSection.aboutImage?.node?.altText || 'OnlineLabs workspace in Amsterdam'
    },
    ctaText: homepageSettings.aboutSection.aboutCtaText || 'over ons',
    ctaUrl: homepageSettings.aboutSection.aboutCtaUrl || '/over-ons'
  } : null;

  return (
    <main>
      {/* Hero Section - WordPress bewerkbaar */}
      <Hero data={heroData} />

      {/* Services Section - "Onze LABS" met colored bars */}
      <ServicesSection services={services} />

      {/* About Section - "Meer dan een Online Marketing Bureau" */}
      {aboutData && <AboutSection aboutData={aboutData} />}

      {/* Testimonials Section - 3-column slider met auto-rotate */}
      <TestimonialsSection testimonials={testimonials} />
      
      {/* Toekomstige secties komen hier */}
      {/* <PortfolioSection /> */}
      {/* <CTASection /> */}
    </main>
  );
}