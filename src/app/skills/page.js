import SkillsHero from '../components/SkillsHero';
import SkillsOverview from '../components/SkillsOverview';
import CTASection from '../components/CTASection';
import LogoSlider from '../components/LogoSlider';
import { getAllServices, getHomepageSettings } from '../lib/wordpress';

const SITE_URL = 'https://www.onlinelabs.nl';

export const revalidate = 86400; // 24 hours ISR

export const metadata = {
  title: 'Skills & diensten – Online groei & AI visibility',
  description: 'Van SEO en AI-zichtbaarheid tot webdesign en conversie. Strategieën die resultaat opleveren. 25 jaar ervaring, Amsterdam.',
  alternates: {
    canonical: '/skills',
  },
  openGraph: {
    title: 'Skills & diensten | OnlineLabs',
    description: 'Van SEO en AI-zichtbaarheid tot webdesign en conversie. Strategieën die resultaat opleveren.',
    url: '/skills',
    type: 'website',
    locale: 'nl_NL',
    siteName: 'OnlineLabs',
  },
};

// CollectionPage + BreadcrumbList + ItemList Schema
const skillsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/skills/#collectionpage`,
      "url": `${SITE_URL}/skills`,
      "name": "Skills & diensten – Full-service online marketing bureau",
      "description": "SEO, GEO-optimalisatie, webdesign, online adverteren en conversie-optimalisatie. 25 jaar ervaring, Amsterdam.",
      "isPartOf": {
        "@id": `${SITE_URL}/#website`
      },
      "about": {
        "@id": `${SITE_URL}/#organization`
      },
      "mainEntity": {
        "@id": `${SITE_URL}/skills/#servicelist`
      },
      "inLanguage": "nl-NL"
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/skills/#breadcrumb`,
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
          "name": "Skills",
          "item": `${SITE_URL}/skills`
        }
      ]
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/skills/#servicelist`,
      "name": "OnlineLabs diensten",
      "description": "Full-service online marketing diensten",
      "numberOfItems": 6,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "SEO specialist",
          "description": "Organisch zoekverkeer voor duurzame groei",
          "url": `${SITE_URL}/skills/seo-specialist`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "GEO optimalisatie",
          "description": "Zichtbaar in AI-antwoorden van ChatGPT & meer",
          "url": `${SITE_URL}/skills/geo-optimalisatie`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Online adverteren",
          "description": "Google Ads & Social Media campagnes",
          "url": `${SITE_URL}/skills/online-adverteren`
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Website laten maken",
          "description": "Unieke websites die inspireren en converteren",
          "url": `${SITE_URL}/skills/website-laten-maken`
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Website snelheid optimalisatie",
          "description": "Core Web Vitals & Performance",
          "url": `${SITE_URL}/skills/website-snelheid-optimalisatie`
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "Conversie optimalisatie",
          "description": "Meer resultaat uit elke bezoeker",
          "url": `${SITE_URL}/skills/conversie-optimalisatie-specialist`
        }
      ]
    }
  ]
};

export default async function SkillsPage() {
  // Fetch data from WordPress
  const [services, homepageSettings] = await Promise.all([
    getAllServices(),
    getHomepageSettings(),
  ]);

  // Extract Logo Slider data (same pattern as homepage)
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(skillsSchema) }}
      />

      <main>
        {/* Hero Section */}
        <SkillsHero />
        
        {/* Skills Overview - Services + Sidebar */}
        <SkillsOverview services={services} />
        
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
          title="Klaar om te groeien?"
          description="Ontdek hoe wij jouw online zichtbaarheid kunnen verbeteren met een strategie op maat."
          primaryButton={{ text: "Neem contact op", url: "/contact" }}
          secondaryButton={{ text: "Bekijk ons werk", url: "/ons-werk" }}
          variant="primary"
        />
      </main>
    </>
  );
}