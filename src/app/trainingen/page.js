import TrainingenHero from '../components/TrainingenHero';
import TrainingenOverview from '../components/TrainingenOverview';
import CTASection from '../components/CTASection';
import LogoSlider from '../components/LogoSlider';
import { getHomepageSettings } from '../lib/wordpress';

const SITE_URL = 'https://www.onlinelabs.nl';

export const revalidate = 86400; // 24 hours ISR

export const metadata = {
  title: 'Trainingen AI, WordPress & Ads | Door experts',
  description: 'Praktische trainingen in AI, WordPress, SEO en Online Advertising. Door onze eigen specialisten. Amsterdam of online • Max 6 deelnemers.',
  alternates: {
    canonical: '/trainingen',
  },
  openGraph: {
    title: 'Trainingen AI, WordPress & Ads | OnlineLabs',
    description: 'Praktische trainingen in AI, WordPress, SEO en Online Advertising. Leer van onze experts.',
    url: '/trainingen',
    type: 'website',
    locale: 'nl_NL',
    siteName: 'OnlineLabs',
  },
};

// CollectionPage + BreadcrumbList + ItemList Schema
const trainingenSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/trainingen/#collectionpage`,
      "url": `${SITE_URL}/trainingen`,
      "name": "Trainingen AI, WordPress & Ads – Leer van onze experts",
      "description": "Praktische trainingen in AI, WordPress, SEO en Online Advertising door de specialisten van OnlineLabs.",
      "isPartOf": {
        "@id": `${SITE_URL}/#website`
      },
      "about": {
        "@id": `${SITE_URL}/#organization`
      },
      "mainEntity": {
        "@id": `${SITE_URL}/trainingen/#traininglist`
      },
      "inLanguage": "nl-NL"
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/trainingen/#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": SITE_URL
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Trainingen",
          "item": `${SITE_URL}/trainingen`
        }
      ]
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/trainingen/#traininglist`,
      "name": "OnlineLabs trainingen",
      "description": "Praktische trainingen door onze specialisten",
      "numberOfItems": 3,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "AI Visibility & Website Optimalisatie",
          "description": "Leer AI-tools slim inzetten voor je online zichtbaarheid",
          "url": `${SITE_URL}/trainingen/ai-visibility-website-optimalisatie`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "WordPress & AI: Sneller en slimmer werken",
          "description": "Leer je WordPress website beheren én AI slim inzetten",
          "url": `${SITE_URL}/trainingen/wordpress-ai-training`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Online Ads & Analytics",
          "description": "Van campagne setup tot live dashboard",
          "url": `${SITE_URL}/trainingen/online-ads-analytics`
        }
      ]
    }
  ]
};

export default async function TrainingenPage() {
  // Fetch Logo Slider data from WordPress
  const homepageSettings = await getHomepageSettings();

  const logoSliderData = homepageSettings?.logoSlider && homepageSettings.logoSlider.sliderEnabled ? {
    title: homepageSettings.logoSlider.sliderTitle || 'Vertrouwd door toonaangevende bedrijven',
    speed: homepageSettings.logoSlider.sliderSpeed || 'normal',
    grayscale: homepageSettings.logoSlider.sliderGrayscale !== false,
    logos: homepageSettings.logoSlider.logos?.map(logo => ({
      name: logo.companyName,
      imageUrl: logo.logoImage?.node?.sourceUrl,
      altText: logo.logoAlt || `${logo.companyName} logo`,
      url: logo.websiteUrl || null
    })) || []
  } : null;

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(trainingenSchema) }}
      />

      <main>
        {/* Hero Section */}
        <TrainingenHero />
        
        {/* Trainingen Overview */}
        <TrainingenOverview />
        
        {/* Logo Slider */}
        {logoSliderData && logoSliderData.logos.length > 0 && (
          <LogoSlider 
            title={logoSliderData.title}
            logos={logoSliderData.logos}
            speed={logoSliderData.speed}
            grayscale={logoSliderData.grayscale}
          />
        )}
        
        {/* CTA Section */}
        <CTASection 
          title="Niet zeker welke training past?"
          description="Plan een vrijblijvend gesprek en we adviseren je welke training het beste aansluit bij jouw situatie."
          primaryButton={{ text: "Neem contact op", url: "/contact" }}
          secondaryButton={{ text: "Bekijk ons werk", url: "/ons-werk" }}
          variant="primary"
        />
      </main>
    </>
  );
}