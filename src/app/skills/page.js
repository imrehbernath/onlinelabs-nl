import SkillsHero from '../components/SkillsHero';
import SkillsOverview from '../components/SkillsOverview';
import CTASection from '../components/CTASection';
import LogoSlider from '../components/LogoSlider';
import { getAllServices, getHomepageSettings } from '../lib/wordpress';

export const revalidate = 86400; // 24 hours ISR

export const metadata = {
  title: 'Onze Skills & Diensten | OnlineLabs - Full-Service Online Marketing',
  description: 'Ontdek onze expertise in SEO, GEO-optimalisatie, webdesign, conversie-optimalisatie en online adverteren. 25+ jaar ervaring in online marketing vanuit Amsterdam.',
  openGraph: {
    title: 'Onze Skills & Diensten | OnlineLabs',
    description: 'Full-service online marketing bureau met 25+ jaar ervaring. SEO, AI-zichtbaarheid, webdesign en meer.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.onlinelabs.nl/skills',
  },
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
  );
}