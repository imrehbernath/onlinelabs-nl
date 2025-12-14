import CasesGrid from '../components/CasesGrid';
import WebsitesGallery from '../components/WebsitesGallery';
import CTASection from '../components/CTASection';

const SITE_URL = 'https://www.onlinelabs.nl';

export const revalidate = 86400; // 24 hours ISR

export const metadata = {
  title: 'Ons werk – SEO cases & webdesign portfolio',
  description: 'Bekijk onze SEO cases en webdesign projecten. Van +180% organisch verkeer tot complete website migraties. Resultaten voor lokale ondernemers tot landelijke merken.',
  openGraph: {
    title: 'Ons werk – SEO cases & webdesign portfolio | OnlineLabs',
    description: 'Bekijk onze SEO cases en webdesign projecten. Van +180% organisch verkeer tot complete website migraties.',
    url: '/ons-werk',
    type: 'website',
    locale: 'nl_NL',
    siteName: 'OnlineLabs',
    images: [{
      url: '/og-image-ons-werk.jpg',
      width: 1200,
      height: 630,
      alt: 'OnlineLabs portfolio - SEO cases en webdesign projecten',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ons werk – SEO cases & webdesign portfolio | OnlineLabs',
    description: 'Bekijk onze SEO cases en webdesign projecten. Van +180% organisch verkeer tot complete website migraties.',
    images: ['/og-image-ons-werk.jpg'],
  },
  alternates: {
    canonical: '/ons-werk',
  },
};

// CollectionPage + BreadcrumbList Schema
const onsWerkSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/ons-werk/#collectionpage`,
      "url": `${SITE_URL}/ons-werk`,
      "name": "Ons werk – SEO cases & webdesign portfolio",
      "description": "Bekijk onze SEO cases en webdesign projecten. Van +180% organisch verkeer tot complete website migraties. Resultaten voor lokale ondernemers tot landelijke merken.",
      "isPartOf": {
        "@id": `${SITE_URL}/#website`
      },
      "about": {
        "@id": `${SITE_URL}/#organization`
      },
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Evert Groot",
            "url": `${SITE_URL}/ons-werk/evert-groot`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Forteiland Pampus",
            "url": `${SITE_URL}/ons-werk/forteiland-pampus`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "HvanA",
            "url": `${SITE_URL}/ons-werk/hvana`
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "De Smaak van Italië",
            "url": `${SITE_URL}/ons-werk/de-smaak-van-italie`
          }
        ]
      },
      "inLanguage": "nl-NL"
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/ons-werk/#breadcrumb`,
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
          "name": "Ons werk",
          "item": `${SITE_URL}/ons-werk`
        }
      ]
    }
  ]
};

async function getOnsWerkData() {
  const query = `
    query GetOnsWerk {
      page(id: "cG9zdDo1OTc=", idType: ID) {
        onsWerk {
          heroSection {
            title
            subtitle
            description
          }
          casesSection {
            title
            subtitle
          }
          websitesSection {
            title
            subtitle
            items {
              title
              clientName
              image {
                node {
                  sourceUrl
                  altText
                }
              }
              websiteUrl
            }
          }
        }
      }
      cases(first: 50, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          title
          slug
          caseDetails {
            clientName
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            servicesUsed
            metrics
            excerpt
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
    console.error('Error fetching ons werk data:', error);
    return null;
  }
}

export default async function OnsWerkPage() {
  const data = await getOnsWerkData();
  
  const pageData = data?.page?.onsWerk || {};
  const heroSection = pageData.heroSection || {};
  const casesSection = pageData.casesSection || {};
  const websitesSection = pageData.websitesSection || {};
  
  const cases = data?.cases?.nodes || [];

  // Transform cases data from CPT - using actual ACF field names
  const transformedCases = cases.map(caseItem => ({
    id: caseItem.id,
    title: caseItem.title,
    slug: caseItem.slug,
    featuredImage: caseItem.caseDetails?.featuredImage?.node || null,
    clientName: caseItem.caseDetails?.clientName || '',
    services: caseItem.caseDetails?.servicesUsed || [],
    resultHighlight: caseItem.caseDetails?.metrics || '',
  }));

  // Transform websites data from page repeater
  const websiteItems = websitesSection.items || [];
  const transformedWebsites = websiteItems.map((website, index) => ({
    id: index + 1,
    title: website.title || '',
    clientName: website.clientName || '',
    featuredImage: website.image?.node || null,
    websiteUrl: website.websiteUrl || '',
  }));

  return (
    <>
      {/* CollectionPage + Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(onsWerkSchema) }}
      />

      <main>
        {/* Hero Section - White background */}
        <section className="relative bg-gradient-to-b from-gray-50 to-white pt-24 sm:pt-28 pb-12 sm:pb-16 lg:pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[#376eb5] font-semibold text-sm tracking-widest uppercase mb-8 lg:mb-6"
              style={{ backgroundColor: 'rgba(55, 110, 181, 0.1)' }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
              {heroSection.subtitle || 'Portfolio'}
            </div>
            
            {/* Title */}
            <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
              {heroSection.title || 'Ons werk: Online resultaten die spreken'}
            </h1>
            
            {/* Description */}
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-10">
              {heroSection.description || 'Bij OnlineLabs geloven we in resultaat. Van lokale ondernemers tot landelijke merken - we helpen bedrijven groeien met SEO, webdesign en online marketing die écht werkt.'}
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a 
                href="#cases"
                className="inline-flex items-center justify-center px-8 py-4 text-lg text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 bg-[#376eb5] hover:bg-[#2d5a94]"
              >
                Bekijk onze cases
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
              
              <a 
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg border-2 border-[#376eb5] text-[#376eb5] bg-white transition-all duration-300 hover:border-[#2d5a94] hover:text-[#2d5a94]"
              >
                Start een project
              </a>
            </div>

            {/* Trust Indicators - Same as AboutHero */}
            <div className="text-sm tracking-wider uppercase text-gray-600 mb-8">
              <span>Amsterdam • Sinds 2008 • Google Partner • </span>
              <a 
                href="https://www.google.com/maps/place/?q=place_id:ChIJEVS-szIKxkcRng6UB0W50u0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition-colors underline decoration-1 underline-offset-2"
              >
                5★ Google Reviews
              </a>
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center">
              <div className="animate-bounce">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Cases Grid Section - White background */}
        <CasesGrid 
          cases={transformedCases}
          title={casesSection.title || 'Impactvolle oplossingen: Webdesign, SEO en optimalisatie'}
          subtitle={casesSection.subtitle || 'Cases'}
          id="cases"
        />

        {/* Websites Gallery Section - Gray background #F9FAFB */}
        <WebsitesGallery 
          websites={transformedWebsites}
          title={websitesSection.title || 'Onze creaties: Websites die werken én inspireren'}
          subtitle={websitesSection.subtitle || 'Portfolio'}
        />

        {/* CTA Section */}
        <CTASection 
          title="Wat kan OnlineLabs voor je betekenen?"
          subtitle="Laten we praten."
          buttonText="Neem contact op"
          buttonUrl="/contact"
        />
      </main>
    </>
  );
}