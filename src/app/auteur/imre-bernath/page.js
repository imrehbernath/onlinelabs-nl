import Link from 'next/link';
import Image from 'next/image';

const SITE_URL = 'https://www.onlinelabs.nl';
const WP_URL = 'https://cdn.onlinelabs.nl';

async function getAuthorPosts() {
  const query = `
    query GetAuthorPosts {
      posts(first: 100, where: { author: 1, orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(
      'https://cdn.onlinelabs.nl/graphql',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
        next: { revalidate: 3600 }
      }
    );

    const json = await res.json();
    
    // Transform WordPress URLs to CDN
    const posts = json.data?.posts?.nodes?.map(post => ({
      ...post,
      featuredImage: post.featuredImage?.node ? {
        node: {
          ...post.featuredImage.node,
          sourceUrl: post.featuredImage.node.sourceUrl.replace(
            'https://cdn.onlinelabs.nl',
            WP_URL
          )
        }
      } : null
    })) || [];

    return posts;
  } catch (error) {
    console.error('Fetch Error:', error);
    return [];
  }
}

export const metadata = {
  title: 'Imre Bernáth – SEO & AI visibility specialist',
  description: 'Imre Bernáth helpt bedrijven groeien met SEO en AI visibility. 25 jaar online ervaring, oprichter OnlineLabs en Teun.ai. Amsterdam.',
  alternates: {
    canonical: '/auteur/imre-bernath',
  },
  openGraph: {
    title: 'Imre Bernáth – SEO & AI visibility specialist | OnlineLabs',
    description: 'Imre Bernáth helpt bedrijven groeien met SEO en AI visibility. 25 jaar online ervaring, oprichter OnlineLabs en Teun.ai.',
    url: '/auteur/imre-bernath',
    siteName: 'OnlineLabs',
    locale: 'nl_NL',
    type: 'profile',
    images: [
      {
        url: `${WP_URL}/wp-content/uploads/2025/11/Imre-Bernath.webp`,
        width: 400,
        height: 600,
        alt: 'Imre Bernáth',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Imre Bernáth – SEO & AI visibility specialist | OnlineLabs',
    description: 'Imre Bernáth helpt bedrijven groeien met SEO en AI visibility. 25 jaar online ervaring, oprichter OnlineLabs en Teun.ai.',
    images: [`${WP_URL}/wp-content/uploads/2025/11/Imre-Bernath.webp`],
  },
};

export default async function AuthorPage() {
  const posts = await getAuthorPosts();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/auteur/imre-bernath#profilepage`,
        "url": `${SITE_URL}/auteur/imre-bernath`,
        "name": "Profiel van Imre Bernáth",
        "mainEntity": { "@id": `${SITE_URL}/auteur/imre-bernath#person` },
        "primaryImageOfPage": { "@id": `${SITE_URL}/auteur/imre-bernath#primaryimage` },
        "breadcrumb": { "@id": `${SITE_URL}/auteur/imre-bernath#breadcrumb` },
        "isPartOf": { "@id": `${SITE_URL}/#website` },
        "inLanguage": "nl-NL",
        "potentialAction": [{
          "@type": "ReadAction",
          "target": [`${SITE_URL}/auteur/imre-bernath`]
        }]
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/auteur/imre-bernath#breadcrumb`,
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
            "name": "Over ons",
            "item": `${SITE_URL}/over-ons`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Imre Bernáth",
            "item": `${SITE_URL}/auteur/imre-bernath`
          }
        ]
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/auteur/imre-bernath#person`,
        "name": "Imre Bernáth",
        "url": `${SITE_URL}/auteur/imre-bernath`,
        "description": "Imre Bernáth is SEO & AI Visibility Specialist en oprichter van OnlineLabs. Sinds 2000 actief in de online wereld en richtte in 2008 SEOlab op – een van de eerste gespecialiseerde SEO-bureaus in Nederland. Met meer dan 15 jaar ervaring helpt hij bedrijven groeien via strategische campagnes voor vindbaarheid, content en digitale innovatie.",
        "image": {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/auteur/imre-bernath#primaryimage`,
          "url": `${WP_URL}/wp-content/uploads/2025/11/Imre-Bernath.webp`,
          "caption": "Imre Bernáth"
        },
        "jobTitle": "SEO & AI visibility specialist",
        "sameAs": [
          "https://gravatar.com/imrebernath",
          "https://nl.linkedin.com/in/imrebernath",
          "https://github.com/imrehbernath",
          "https://teun.ai/auteur/imre",
          "https://www.seolab.nl"
        ],
        "worksFor": {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          "name": "OnlineLabs",
          "url": SITE_URL
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Herengracht 221",
          "addressLocality": "Amsterdam",
          "postalCode": "1016 BG",
          "addressCountry": "NL"
        },
        "email": "imre@onlinelabs.nl",
        "telephone": "+31-20-820-20-22",
        "knowsAbout": [
          "SEO",
          "Technische SEO",
          "AI visibility",
          "GEO optimalisatie",
          "Contentstrategie",
          "Structured data",
          "ChatGPT optimalisatie",
          "Claude AI",
          "SGE (Search Generative Experience)",
          "Google Search Console",
          "On-page SEO",
          "Linkbuilding",
          "WordPress Development",
          "Next.js"
        ],
        "mainEntityOfPage": { "@id": `${SITE_URL}/auteur/imre-bernath#profilepage` }
      }
    ]
  };

  return (
    <main>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section - White background */}
      <section className="relative pt-24 sm:pt-28 pb-16 lg:pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Author Image - 2:3 aspect ratio */}
            <div className="flex-shrink-0">
              <Image
                src={`${WP_URL}/wp-content/uploads/2025/11/Imre-Bernath.webp`}
                alt="Imre Bernáth"
                width={200}
                height={300}
                className="rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] object-cover"
                priority
              />
            </div>

            {/* Author Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Imre Bernáth
              </h1>
              <p className="text-xl text-[#376eb5] font-medium mb-6">
                SEO & AI visibility specialist | Oprichter OnlineLabs
              </p>
              
              <div className="text-lg text-gray-600 leading-relaxed space-y-4">
                <p>
                  Imre Bernáth is SEO & AI visibility specialist en oprichter van OnlineLabs. Sinds 2000 is hij actief in de online wereld en richtte in 2008 SEOlab op – een van de eerste gespecialiseerde SEO-bureaus in Nederland. Met meer dan 15 jaar ervaring helpt hij bedrijven groeien via strategische campagnes voor vindbaarheid, content en digitale innovatie. Imre combineert zijn SEO-expertise met een scherpe visie op de rol van AI in moderne marketing.
                </p>
                
                <p>
                  Als eigenaar van <a href="https://www.onlinelabs.nl/" className="text-[#376eb5] hover:text-[#2d5a94] font-medium hover:underline">OnlineLabs</a> (voorheen SEOlab) en initiatiefnemer van <a href="https://teun.ai/" target="_blank" rel="noopener noreferrer" className="text-[#376eb5] hover:text-[#2d5a94] font-medium hover:underline">Teun.ai</a> – het eerste Nederlandse platform voor GEO-audits – ontwikkelt hij strategieën waarmee merken zichtbaar worden in zowel zoekmachines als AI-gegenereerde antwoorden.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-6 justify-center md:justify-start">
                <a 
                  href="https://nl.linkedin.com/in/imrebernath" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#376eb5] hover:bg-[#2d5a94] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section - Gray background #F9FAFB */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          
          {/* Section Header */}
          <div className="mb-10 lg:mb-12">
            <p className="text-sm font-medium tracking-wider text-[#376eb5] uppercase mb-3">
              Over mij
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
              Expertise & kennis
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Ervaring Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">Ervaring</h3>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#376eb5] mt-1.5 flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">GEO-optimalisatie</span>
                    <span className="block text-gray-600 text-sm mt-0.5">
                      (Generative Engine Optimization)
                    </span>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <span className="text-[#376eb5] mt-1.5 flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Technische SEO</span>
                    <span className="block text-gray-600 text-sm mt-0.5">
                      & site audits
                    </span>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <span className="text-[#376eb5] mt-1.5 flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">AI visibility</span>
                    <span className="block text-gray-600 text-sm mt-0.5">
                      in ChatGPT, Claude, Gemini & Perplexity
                    </span>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <span className="text-[#376eb5] mt-1.5 flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Contentstrategie</span>
                    <span className="block text-gray-600 text-sm mt-0.5">
                      & E-E-A-T
                    </span>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <span className="text-[#376eb5] mt-1.5 flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Structured data</span>
                    <span className="block text-gray-600 text-sm mt-0.5">
                      & Schema.org
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Projecten Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">Projecten</h3>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#1abc9c] mt-1.5 flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Teun.ai</span>
                    <span className="block text-gray-600 text-sm mt-0.5">
                      Platform voor GEO-audits
                    </span>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <span className="text-[#1abc9c] mt-1.5 flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">OnlineLabs</span>
                    <span className="block text-gray-600 text-sm mt-0.5">
                      SEO & AI-visibility bureau
                    </span>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <span className="text-[#1abc9c] mt-1.5 flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">150+ organisaties</span>
                    <span className="block text-gray-600 text-sm mt-0.5">
                      geholpen met digitale autoriteit
                    </span>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <span className="text-[#1abc9c] mt-1.5 flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">WordPress expertise</span>
                    <span className="block text-gray-600 text-sm mt-0.5">
                      structured data en AI-overviews
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Top vaardigheden */}
          <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-6">Top vaardigheden</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                'GEO-optimalisatie',
                'Technische SEO',
                'AI visibility',
                'Structured data',
                'Google Search Console',
                'ChatGPT / Claude',
                'Google Tag Manager',
                'SEO-audits',
                'WordPress',
                'Google Analytics',
                'Schema.org',
                'E-E-A-T',
                'Core Web Vitals',
                'Content strategie',
                'SEMrush',
                'Next.js'
              ].map((skill, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm"
                >
                  <span className="text-[#376eb5]">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section - Beige background #FAFAF8 */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#FAFAF8' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="mb-10 lg:mb-12">
            <p className="text-sm font-medium tracking-wider text-[#376eb5] uppercase mb-3">
              Artikelen
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
              Geschreven door Imre
            </h2>
          </div>
          
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Binnenkort verschijnen hier artikelen.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <article className="h-full">
                    {/* Image */}
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-5 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      {post.featuredImage?.node?.sourceUrl ? (
                        <Image
                          src={post.featuredImage.node.sourceUrl}
                          alt={post.featuredImage.node.altText || post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-sm">Geen afbeelding</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      {/* Title */}
                      <h3 className="font-serif text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-[#376eb5] transition-colors duration-300 leading-tight">
                        {post.title}
                      </h3>
                      
                      {/* Category */}
                      {post.categories?.nodes?.[0] && (
                        <p className="text-gray-500 text-sm">
                          {post.categories.nodes[0].name}
                        </p>
                      )}

                      {/* Date */}
                      <p className="text-[#376eb5] font-medium text-sm">
                        {new Date(post.date).toLocaleDateString('nl-NL', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export const revalidate = 3600;