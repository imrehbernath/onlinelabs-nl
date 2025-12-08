import ServiceHero from '@/app/components/ServiceHero';
import TextImageSection from '@/app/components/TextImageSection';
import ProcessSection from '@/app/components/ProcessSection';
import ServicesListSection from '@/app/components/ServicesListSection';
import LogoSlider from '@/app/components/LogoSlider';
import CTASection from '@/app/components/CTASection';
import FAQSection from '@/app/components/FAQSection';
import GEOToolSection from '@/app/components/GEOToolSection';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getHomepageSettings, getAllServices } from '@/app/lib/wordpress';

// Dummy data (BEHOUDEN als fallback)
const dummyServiceData = {
  'seo-specialist': {
    title: 'SEO specialist – Hoger in Google én zichtbaar in AI',
    subtitle: 'Sinds 2008',
    description: `Steeds meer zoekgedrag verschuift naar ChatGPT, Perplexity en Google AI. Is jouw bedrijf daar al zichtbaar?

Als SEO specialist in Amsterdam helpen wij bedrijven groeien met datagedreven SEO die werkt in traditionele zoekmachines én AI-antwoorden – zonder afhankelijk te worden van dure advertenties.

Vanuit ons kantoor aan de Herengracht in Amsterdam combineren we techniek, content en structuur voor maximale zichtbaarheid – in Google, Perplexity en Claude.`,
    heroSection: {
      title: 'SEO specialist – Hoger in Google én zichtbaar in AI',
      subtitle: 'Sinds 2008',
      description: `Steeds meer zoekgedrag verschuift naar ChatGPT, Perplexity en Google AI. Is jouw bedrijf daar al zichtbaar?

Als SEO specialist in Amsterdam helpen wij bedrijven groeien met datagedreven SEO die werkt in traditionele zoekmachines én AI-antwoorden – zonder afhankelijk te worden van dure advertenties.

Vanuit ons kantoor aan de Herengracht in Amsterdam combineren we techniek, content en structuur voor maximale zichtbaarheid – in Google, Perplexity en Claude.`,
      ctaText: 'Neem contact op',
      ctaUrl: '/contact',
      secondaryCtaText: 'Bekijk ons werk',
      secondaryCtaUrl: '/ons-werk',
      serviceColor: 'green'
    },
    pageSections: [
      {
        type: 'text_image',
        layout: 'image-right',
        title: 'Waarom jouw bedrijf een SEO specialist nodig heeft',
        content: `
          <p class="mb-4"><strong>Google voert jaarlijks 4.000+ updates uit.</strong> AI-platformen zoals ChatGPT veranderen hoe mensen zoeken. En jouw concurrenten investeren al in vindbaarheid – in beide kanalen.</p>
          
          <p class="mb-4">Zonder strategische SEO-expertise verlies je marktaandeel aan bedrijven die wél investeren in structurele zichtbaarheid. Niet alleen in Google, maar ook in de AI-antwoorden waar steeds meer beslissingen worden genomen.</p>
          
          <p class="mb-6">Bij OnlineLabs combineren we sinds 2008 technische SEO, contentstrategie en GEO-optimalisatie (Generative Engine Optimization). Zo blijf jij zichtbaar, ongeacht hoe het zoeklandschap verandert – van traditionele zoekresultaten tot AI-gegenereerde antwoorden.</p>
          
          <h3 class="text-xl font-bold text-gray-900 mb-4">Onze SEO-aanpak: slim, snel en toekomstgericht</h3>
          
          <ul class="space-y-3">
            <li><strong>Sinds 2008 bewezen SEO-expertise</strong><br/>15+ jaar resultaat in uiteenlopende sectoren</li>
            <li><strong>Data-gedreven zonder black box</strong><br/>Transparante strategieën met meetbare groei</li>
            <li><strong>Techniek + content + structuur</strong><br/>Alles sluit naadloos op elkaar aan – zonder standaard templates</li>
            <li><strong>AI-proof & toekomstgericht</strong><br/>Structured data, semantische HTML en GEO voor AI-antwoorden</li>
            <li><strong>Groei, geen quick wins</strong><br/>SEO voor duurzame leads, omzet en zichtbaarheid</li>
            <li><strong>Inzichtelijk & toegankelijk</strong><br/>Maandelijkse updates afgestemd op jouw doelen</li>
          </ul>
        `,
        video: {
          webm: 'https://cdn.onlinelabs.nl/wp-content/uploads/2025/01/18075451/organisch-zoekverkeer-seo-video.webm',
          mp4: 'https://cdn.onlinelabs.nl/wp-content/uploads/2025/01/18075451/organisch-zoekverkeer-seo-video.mp4'
        },
        serviceColor: 'green',
        background: 'white'
      },
      {
        type: 'text_image',
        layout: 'image-left',
        title: 'Traditionele SEO + AI-Zichtbaarheid',
        content: `
          <p class="mb-6">Sinds 2008 help ik bedrijven groeien met <strong>SEO die werkt – in zoekmachines én AI-platformen.</strong> Waar anderen kiezen tussen traditionele SEO of AI-optimalisatie, combineer ik beide. Want zonder sterke SEO-fundamenten, geen AI-zichtbaarheid.</p>
          
          <h3 class="text-xl font-bold text-gray-900 mb-4">Traditionele SEO vormt de basis</h3>
          
          <p class="mb-4">Technische optimalisatie, hoogwaardige content en gezonde autoriteit – dat zijn de pijlers. Google moet je eerst vinden en waarderen. Zonder deze fundamenten heeft AI-optimalisatie geen effect.</p>
          
          <h3 class="text-xl font-bold text-gray-900 mb-4 mt-8">AI-Visibility als nieuwe laag</h3>
          
          <p class="mb-6">Daarbovenop bouw ik <strong>GEO-optimalisatie</strong> (Generative Engine Optimization): structured data, semantische HTML en content die AI-modellen begrijpen en citeren. Zo verschijn je in ChatGPT, Perplexity en Google AI.</p>
          
          <div class="bg-gray-50 border-l-4 p-6 rounded-r-lg" style="border-color: #376eb5;">
            <p class="text-base font-semibold text-gray-900 mb-2">Gericht op groei en blijvende vindbaarheid</p>
            <p class="text-gray-700">Traditionele zoekmachines blijven bestaan. AI-platformen groeien explosief. Jij hebt een strategie nodig die in beide werelden werkt – voor nu én de toekomst.</p>
          </div>
        `,
        image: {
          sourceUrl: 'https://cdn.onlinelabs.nl/wp-content/uploads/2025/04/11093106/Imre-Bernath-eigenaar-OnlineLabs.webp',
          altText: 'Imre Bernáth - SEO & AI visibility specialist bij OnlineLabs Amsterdam'
        },
        imageCaption: 'Imre Bernáth – SEO & AI visibility specialist, <span style="color: #376eb5; font-weight: 600;">OnlineLabs</span>',
        imageCaptionLink: '/over-ons/imre-bernath',
        serviceColor: 'green',
        background: 'beige'
      },
      {
        type: 'text_image',
        layout: 'image-right',
        title: 'Voor wie is SEO geschikt?',
        content: `
          <p class="mb-4">SEO is niet voor iedereen – maar als je bedrijf online groei ambieert, klanten zoekt via Google, of concurrentie ervaart in je markt, dan is SEO essentieel voor structurele zichtbaarheid.</p>
          
          <p class="mb-6">Bij OnlineLabs werken we met bedrijven die <strong>klaar zijn voor de volgende stap</strong>: van lokale dienstverleners tot landelijke webshops, van B2B-specialisten tot ambitieuze startups.</p>
          
          <h3 class="text-xl font-bold text-gray-900 mb-4">SEO is geschikt voor jouw bedrijf als:</h3>
          
          <ul class="space-y-3">
            <li><strong>Je wilt groeien zonder advertentiebudget</strong><br/>Structurele vindbaarheid in plaats van betaalde clicks</li>
            <li><strong>Jouw concurrenten scoren hoger in Google</strong><br/>En jij wilt de voorsprong terugwinnen met slimme SEO</li>
            <li><strong>Je diensten of producten online worden gezocht</strong><br/>Maar jouw website haalt niet de zichtbaarheid die het verdient</li>
            <li><strong>Je investeert in content, maar ziet geen resultaat</strong><br/>Technische SEO en structuur ontbreken om impact te maken</li>
            <li><strong>Je wilt future-proof zijn voor AI-zoekmachines</strong><br/>ChatGPT, Perplexity en Google AI worden steeds belangrijker</li>
            <li><strong>Je zoekt een partner, geen zwarte doos</strong><br/>Transparante strategie, meetbare groei, geen loze beloftes</li>
          </ul>

          <p class="mt-6"><strong>Niet geschikt?</strong> Als je alleen quick wins zoekt of binnen een maand resultaat verwacht, dan is SEO waarschijnlijk niet de juiste investering. SEO vraagt commitment – maar levert structurele groei.</p>
        `,
        image: {
          sourceUrl: 'https://cdn.onlinelabs.nl/wp-content/uploads/2025/04/09155129/Online-marketeer-bij-OnlineLabs.webp',
          altText: 'SEO specialist aan het werk bij OnlineLabs Amsterdam'
        },
        serviceColor: 'green',
        background: 'gray'
      }
    ]
  },
  'geo-optimalisatie': {
    title: 'GEO Optimalisatie – Zichtbaar in AI Zoekmachines',
    subtitle: 'AI Visibility',
    description: 'Bereid je voor op de toekomst van zoeken. GEO (Generative Engine Optimization) zorgt ervoor dat jouw bedrijf vindbaar is in ChatGPT, Perplexity, en andere AI-assistenten.',
    heroSection: {
      title: 'GEO Optimalisatie – Zichtbaar in AI Zoekmachines',
      subtitle: 'AI Visibility',
      description: 'Bereid je voor op de toekomst van zoeken. GEO (Generative Engine Optimization) zorgt ervoor dat jouw bedrijf vindbaar is in ChatGPT, Perplexity, en andere AI-assistenten.',
      ctaText: 'Test je AI visibility',
      ctaUrl: 'https://teun.ai',
      secondaryCtaText: 'Bekijk ons werk',
      secondaryCtaUrl: '/ons-werk',
      serviceColor: 'blue'
    },
    pageSections: []
  }
};

// SEO Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  // Try WordPress first
  const service = await getServiceBySlug(slug);
  
  // Fallback to dummy data
  const fallbackService = dummyServiceData[slug];
  
  const serviceData = service || fallbackService;

  if (!serviceData) {
    return {
      title: 'Service niet gevonden - OnlineLabs',
    };
  }

  const title = service?.serviceDetails?.heroSection?.title || service?.title || fallbackService?.title || '';
  const description = service?.serviceDetails?.heroSection?.description || service?.serviceDetails?.description || fallbackService?.description || '';

  return {
    title: `${title} - OnlineLabs`,
    description: description,
    openGraph: {
      title: `${title} - OnlineLabs`,
      description: description,
    },
  };
}

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

// Generate static paths
export async function generateStaticParams() {
  try {
    const services = await getAllServices();
    
    if (services && services.length > 0) {
      return services.map((service) => ({
        slug: service.slug,
      }));
    }
  } catch (error) {
    console.error('Failed to generate static params:', error);
  }
  
  // Fallback to known services
  return [
    { slug: 'seo-specialist' },
    { slug: 'geo-optimalisatie' },
    { slug: 'wordpress-specialist' },
    { slug: 'webdesign' },
    { slug: 'website-snelheid' },
  ];
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  
  // Try WordPress first, fallback to dummy data
  let service = null;
  let useWordPress = false;
  
  try {
    service = await getServiceBySlug(slug);
    if (service && service.serviceDetails) {
      useWordPress = true;
      console.log('✅ Using WordPress data for:', slug);
    }
  } catch (error) {
    console.error('❌ WordPress fetch failed, using dummy data');
  }
  
  // Fallback to dummy data
  if (!useWordPress) {
    service = dummyServiceData[slug];
    console.log('📝 Using dummy data for:', slug);
  }

  if (!service) {
    notFound();
  }

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

  // Extract hero data (WordPress or dummy)
  let heroData;
  let pageSections = [];
  
  if (useWordPress) {
    // WordPress data
    const heroSection = service.serviceDetails.heroSection || {};
    heroData = {
      title: heroSection.title || service.title,
      subtitle: heroSection.subtitle || '',
      description: heroSection.description || '',
      ctaText: heroSection.ctaText || 'Neem contact op',
      ctaUrl: heroSection.ctaUrl || '/contact',
      secondaryCtaText: heroSection.secondaryCtaText || 'Bekijk ons werk',
      secondaryCtaUrl: heroSection.secondaryCtaUrl || '/ons-werk',
      serviceColor: 'green'
    };
    pageSections = service.serviceDetails.pageSections || [];
  } else {
    // Dummy data
    heroData = service.heroSection;
    pageSections = service.pageSections || [];
  }

  return (
    <main>
      {/* Hero Section */}
      <ServiceHero 
        title={heroData.title}
        subtitle={heroData.subtitle}
        description={heroData.description}
        ctaText={heroData.ctaText}
        ctaUrl={heroData.ctaUrl}
        secondaryCtaText={heroData.secondaryCtaText || "Bekijk ons werk"}
        secondaryCtaUrl={heroData.secondaryCtaUrl || "/ons-werk"}
        serviceColor={heroData.serviceColor || "green"}
      />

      {/* Flexible Content - Page Sections */}
      {pageSections && pageSections.length > 0 ? (
        pageSections.map((section, index) => {
          // WordPress: Check __typename
          // Dummy: Check type
          const sectionType = section.__typename || section.type;

          // Text + Image Section
          if (sectionType === 'ServiceDetailsPageSectionsTextImageLayout' || sectionType === 'text_image') {
            return (
              <TextImageSection
                key={index}
                layout={section.layout || 'image-left'}
                variant={section.variant || section.mediaVariant || 'photo'}
                title={section.title}
                content={section.content}
                image={section.image?.node ? {
                  sourceUrl: section.image.node.sourceUrl,
                  altText: section.image.node.altText
                } : section.image}
                video={section.videoWebm?.node || section.videoMp4?.node ? {
                  webm: section.videoWebm?.node?.mediaItemUrl || section.video?.webm,
                  mp4: section.videoMp4?.node?.mediaItemUrl || section.video?.mp4
                } : section.video}
                serviceColor="green"
                background={section.background || 'white'}
                imageCaption={section.imageCaption}
                imageCaptionLink={section.imageCaptionLink}
              />
            );
          }

          // GEO Tool Section
          if (sectionType === 'ServiceDetailsPageSectionsGeoToolLayout' || sectionType === 'geo_tool') {
            return (
              <GEOToolSection
                key={index}
                background={section.geoToolBackground || section.background || 'beige'}
              />
            );
          }

          // Process Section
          if (sectionType === 'ServiceDetailsPageSectionsProcessSectionLayout' || sectionType === 'process') {
            return (
              <ProcessSection
                key={index}
                background={section.background || 'white'}
                serviceSlug={slug}
              />
            );
          }

          // Services List Section
          if (sectionType === 'ServiceDetailsPageSectionsServicesListLayout' || sectionType === 'services_list') {
            return (
              <ServicesListSection
                key={index}
                background={section.background || 'beige'}
              />
            );
          }

          // FAQ Section
          if (sectionType === 'ServiceDetailsPageSectionsFaqLayout' || sectionType === 'faq') {
            return (
              <FAQSection
                key={index}
                title={section.title || 'Veelgestelde vragen'}
                subtitle={section.subtitle || 'FAQ'}
                faqs={section.faqItems || section.faqs || []}
                background={section.background || 'white'}
              />
            );
          }

          // CTA Section
          if (sectionType === 'ServiceDetailsPageSectionsCtaLayout' || sectionType === 'cta') {
            return (
              <CTASection
                key={index}
                title={section.title}
                description={section.description}
                primaryButton={{ 
                  text: section.buttonText || 'Neem contact op', 
                  url: section.buttonUrl || '/contact' 
                }}
                variant={section.variant || 'primary'}
              />
            );
          }

          return null;
        })
      ) : (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-600 text-lg">
              📝 Geen page sections ingesteld voor deze service
            </p>
          </div>
        </section>
      )}

      {/* Logo Slider */}
      {logoSliderData && logoSliderData.logos.length > 0 && (
        <LogoSlider 
          title={logoSliderData.title}
          logos={logoSliderData.logos}
          speed={logoSliderData.speed}
          grayscale={logoSliderData.grayscale}
        />
      )}
    </main>
  );
}