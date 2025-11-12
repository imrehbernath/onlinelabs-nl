import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import LogoSlider from './components/LogoSlider';
import CasesSection from './components/CasesSection';
import BlogSection from './components/BlogSection';
import { getHomepageSettings, getAllServices, getTestimonials, getBlogPosts, getCases } from './lib/wordpress';

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
  const [homepageSettings, services, testimonials, blogPosts, cases] = await Promise.all([
    getHomepageSettings(),  // Hero + About sections
    getAllServices(),
    getTestimonials(100),   // Max 100 testimonials
    getBlogPosts(3),        // Latest 3 blog posts
    getCases(3),            // Latest 3 cases
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

  // Extract and transform Logo Slider data
  const logoSliderData = homepageSettings?.logoSlider && homepageSettings.logoSlider.sliderEnabled ? {
    title: homepageSettings.logoSlider.sliderTitle || 'Vertrouwd door toonaangevende bedrijven',
    speed: homepageSettings.logoSlider.sliderSpeed || 'normal',
    grayscale: homepageSettings.logoSlider.sliderGrayscale !== false,
    logos: homepageSettings.logoSlider.logos?.map(logo => ({
      name: logo.companyName,
      imageUrl: logo.logoImage?.node?.sourceUrl,
      altText: logo.logoAlt || `${logo.companyName} logo`, // Custom alt or auto-generate
      url: logo.websiteUrl || null
    })) || []
  } : null;

  return (
    <main>
      {/* Hero Section - WordPress bewerkbaar */}
      <Hero data={heroData} />

      {/* Services Section - "Onze LABS" met colored bars */}
      <ServicesSection services={services} />

      {/* CTA Section 1 - Call to action na Services (DARK) */}
      <CTASection 
        title="Klaar om jouw online zichtbaarheid te verbeteren?"
        description="Ontdek hoe OnlineLabs jouw bedrijf helpt groeien met strategische SEO, GEO en webdesign."
        primaryButton={{ text: "Neem contact op", url: "/contact" }}
        secondaryButton={{ text: "Bekijk onze skills", url: "/skills" }}
        variant="primary"
      />

      {/* About Section - "Meer dan een Online Marketing Bureau" */}
      {aboutData && <AboutSection aboutData={aboutData} />}

      {/* Logo Slider - Partners/Clients showcase (WordPress editable) */}
      {logoSliderData && logoSliderData.logos.length > 0 && (
        <LogoSlider 
          title={logoSliderData.title}
          logos={logoSliderData.logos}
          speed={logoSliderData.speed}
          grayscale={logoSliderData.grayscale}
        />
      )}

      {/* Cases Section - Featured Projects */}
      {cases && cases.length > 0 && (
        <CasesSection 
          cases={cases}
          title="Projecten waar we trots op zijn"
          subtitle="Cases"
        />
      )}

      {/* CTA Section 2 - Light variant tussen Cases en Blog (NIEUW!) */}
      <CTASection 
        title="Benieuwd wat we voor jouw bedrijf kunnen betekenen?"
        description="Plan een vrijblijvend gesprek en ontdek de mogelijkheden voor jouw online groei."
        primaryButton={{ text: "Plan een gesprek", url: "/contact" }}
        secondaryButton={{ text: "Bekijk alle cases", url: "/ons-werk" }}
        variant="light"
      />

      {/* Blog Section - Latest 3 blog posts with featured layout */}
      {blogPosts && blogPosts.length > 0 && (
        <BlogSection 
          posts={blogPosts}
          title="Laatste Inzichten"
        />
      )}

      {/* Testimonials Section - 3-column slider met auto-rotate */}
      <TestimonialsSection testimonials={testimonials} />

      {/* Footer volgt direct na Testimonials - geen extra CTA meer */}
    </main>
  );
}