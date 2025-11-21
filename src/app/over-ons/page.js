import AboutHero from '../components/AboutHero';
import StatsSection from '../components/StatsSection';
import ValuesSection from '../components/ValuesSection';
import TeamSection from '../components/TeamSection';
import TimelineSection from '../components/TimelineSection';
import LogoSlider from '../components/LogoSlider';
import CTASection from '../components/CTASection';
import { getHomepageSettings } from '../lib/wordpress';

export const revalidate = 86400; // 24 hours ISR

export const metadata = {
  title: 'Over OnlineLabs | Online Marketing Bureau Amsterdam sinds 2008',
  description: 'OnlineLabs is een online marketing bureau in Amsterdam. Sinds 2008 helpen we bedrijven groeien met SEO, GEO, webdesign en online marketing.',
  openGraph: {
    title: 'Over OnlineLabs | Online Marketing Bureau Amsterdam sinds 2008',
    description: 'OnlineLabs is een online marketing bureau in Amsterdam. Sinds 2008 helpen we bedrijven groeien met SEO, GEO, webdesign en online marketing.',
    type: 'website',
  },
};

async function getOverOnsData() {
  const query = `
    query GetOverOns {
      page(id: "cG9zdDo2Njg=", idType: ID) {
        overOns {
          heroSection {
            title
            subtitle
            description
          }
          valuesSection {
            title
            subtitle
            values {
              icon
              title
              description
            }
          }
          teamSection {
            title
            subtitle
            description
            members {
              name
              role
              description
              linkedinUrl
              detailUrl
              photo {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
          timelineSection {
            title
            subtitle
            items {
              year
              title
              description
              videoUrl
              image {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(
      `https://wordpress-988065-5984089.cloudwaysapps.com/graphql`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
        next: { revalidate: 86400 },
      }
    );

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching over ons data:', error);
    return null;
  }
}

export default async function OverOnsPage() {
  const data = await getOverOnsData();
  
  // Fetch homepage settings for logo slider
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
  
  const pageData = data?.page?.overOns || {};
  const heroSection = pageData.heroSection || {};
  const valuesSection = pageData.valuesSection || {};
  const teamSection = pageData.teamSection || {};
  const timelineSection = pageData.timelineSection || {};

  return (
    <main>
      {/* Hero Section */}
      <AboutHero 
        title={heroSection.title || 'Over OnlineLabs: Innovatie, betrouwbaarheid en maatwerk'}
        subtitle={heroSection.subtitle || 'Over ons'}
        description={heroSection.description || 'Bij OnlineLabs draaien we al sinds 2008 mee in de wereld van online marketing. We combineren jarenlange ervaring met de nieuwste technologieën om bedrijven te helpen groeien in de digitale wereld.'}
      />

      {/* Stats Section */}
      <StatsSection 
        stats={[
          { number: 25, label: 'Jaar online ervaring' },
          { number: 750, label: 'Succesvolle projecten' },
          { number: 150, label: 'Klanten' }
        ]}
      />

      {/* Values Section */}
      <ValuesSection 
        title={valuesSection.title || 'Onze kernwaarden'}
        subtitle={valuesSection.subtitle || 'Wat ons drijft'}
        values={valuesSection.values || [
          {
            icon: 'innovation',
            title: 'Innovatie voorop',
            description: 'We blijven vooroplopen met de nieuwste ontwikkelingen in SEO, GEO en online marketing.'
          },
          {
            icon: 'trust',
            title: 'Betrouwbaarheid',
            description: 'Transparantie en eerlijkheid staan bij ons centraal. Geen loze beloftes, maar concrete resultaten.'
          },
          {
            icon: 'heart',
            title: 'Passie voor resultaat',
            description: 'Jouw succes is ons succes. We gaan voor meetbare groei en tastbare resultaten.'
          },
          {
            icon: 'rocket',
            title: 'Groei als doel',
            description: 'Van kleine ondernemers tot grote merken - we helpen iedereen hun online potentieel te bereiken.'
          }
        ]}
      />

      {/* Team Section */}
      <TeamSection 
        title={teamSection.title || 'Wie zijn OnlineLabs'}
        subtitle={teamSection.subtitle || 'Ons team'}
        description={teamSection.description || 'Een gedreven team van specialisten met passie voor online marketing.'}
        teamMembers={teamSection.members || []}
      />

      {/* Timeline Section */}
      <TimelineSection 
        title={timelineSection.title || 'Onze Reis'}
        subtitle={timelineSection.subtitle || 'Geschiedenis'}
        items={timelineSection.items || []}
      />

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
        title="Klaar om samen te werken?"
        subtitle="Laten we kennismaken."
        buttonText="Neem contact op"
        buttonUrl="/contact"
      />
    </main>
  );
}