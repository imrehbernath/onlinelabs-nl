import Link from 'next/link';
import Image from 'next/image';

const SITE_URL = 'https://www.onlinelabs.nl';
const WP_URL = 'https://cdn.onlinelabs.nl';

async function getAuthorPosts() {
  const query = `
    query GetAuthorPosts {
      posts(first: 100, where: { author: 7, orderby: { field: DATE, order: DESC } }) {
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
  title: 'Sanne Verschoor – WordPress developer & webdesigner',
  description: 'Sanne Verschoor bouwt WordPress websites en WooCommerce webshops bij OnlineLabs. Van custom themes tot responsive design. Amsterdam.',
  alternates: {
    canonical: '/auteur/sanne-verschoor',
  },
  openGraph: {
    title: 'Sanne Verschoor – WordPress developer & webdesigner | OnlineLabs',
    description: 'Sanne Verschoor bouwt WordPress websites en WooCommerce webshops bij OnlineLabs. Van custom themes tot responsive design.',
    url: '/auteur/sanne-verschoor',
    siteName: 'OnlineLabs',
    locale: 'nl_NL',
    type: 'profile',
    images: [
      {
        url: `${WP_URL}/wp-content/uploads/2025/11/Sanne-Verschoor-Webdesigner.webp`,
        width: 400,
        height: 600,
        alt: 'Sanne Verschoor',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Sanne Verschoor – WordPress developer & webdesigner | OnlineLabs',
    description: 'Sanne Verschoor bouwt WordPress websites en WooCommerce webshops bij OnlineLabs.',
    images: [`${WP_URL}/wp-content/uploads/2025/11/Sanne-Verschoor-Webdesigner.webp`],
  },
};

export default async function SanneAuthorPage() {
  const posts = await getAuthorPosts();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/auteur/sanne-verschoor#profilepage`,
        "url": `${SITE_URL}/auteur/sanne-verschoor`,
        "name": "Profiel van Sanne Verschoor",
        "mainEntity": { "@id": `${SITE_URL}/auteur/sanne-verschoor#person` },
        "primaryImageOfPage": { "@id": `${SITE_URL}/auteur/sanne-verschoor#primaryimage` },
        "breadcrumb": { "@id": `${SITE_URL}/auteur/sanne-verschoor#breadcrumb` },
        "isPartOf": { "@id": `${SITE_URL}/#website` },
        "inLanguage": "nl-NL"
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/auteur/sanne-verschoor#breadcrumb`,
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
            "name": "Sanne Verschoor",
            "item": `${SITE_URL}/auteur/sanne-verschoor`
          }
        ]
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/auteur/sanne-verschoor#person`,
        "name": "Sanne Verschoor",
        "url": `${SITE_URL}/auteur/sanne-verschoor`,
        "description": "Sanne Verschoor is WordPress developer en webdesigner bij OnlineLabs. Met passie en energie bouwt zij websites en webshops waar klanten trots op kunnen zijn.",
        "image": {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/auteur/sanne-verschoor#primaryimage`,
          "url": `${WP_URL}/wp-content/uploads/2025/11/Sanne-Verschoor-Webdesigner.webp`,
          "caption": "Sanne Verschoor"
        },
        "jobTitle": "WordPress developer & webdesigner",
        "sameAs": [
          "https://www.linkedin.com/in/sanne-verschoor-380bab267"
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
        "knowsAbout": [
          "WordPress",
          "Webdesign",
          "WooCommerce",
          "PHP",
          "CSS",
          "Responsive design",
          "UX/UI",
          "WCAG toegankelijkheid",
          "Custom themes",
          "Performance optimalisatie"
        ],
        "mainEntityOfPage": { "@id": `${SITE_URL}/auteur/sanne-verschoor#profilepage` }
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
            {/* Author Image */}
            <div className="flex-shrink-0">
              <Image
                src={`${WP_URL}/wp-content/uploads/2025/11/Sanne-Verschoor.webp`}
                alt="Sanne Verschoor"
                width={200}
                height={300}
                className="rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] object-cover"
                priority
              />
            </div>

            {/* Author Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Sanne Verschoor
              </h1>
              <p className="text-xl text-[#376eb5] font-medium mb-6">
                WordPress developer & webdesigner bij OnlineLabs
              </p>
              
              <div className="text-lg text-gray-600 leading-relaxed space-y-4">
                <p>
                  Ik ben Sanne Verschoor, en ik ben ontzettend enthousiast over mijn rol als WordPress developer. Na een succesvolle carrièreswitch heb ik mijn ware passie gevonden.
                </p>
                
                <p>
                  Met veel plezier en energie werk ik aan de websites van mijn klanten, zodat zij een digitale aanwezigheid hebben waar ze trots op kunnen zijn. Van custom themes tot WooCommerce webshops — ik bouw websites die niet alleen mooi zijn, maar ook technisch solide.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-6 justify-center md:justify-start">
                <a 
                  href="https://www.linkedin.com/in/sanne-verschoor-380bab267" 
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

      {/* Expertise Section - Gray background */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          
          {/* Section Header */}
          <div className="mb-10 lg:mb-12">
            <p className="text-sm font-medium tracking-wider text-[#376eb5] uppercase mb-3">
              Specialisaties
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
              Waar ik me mee bezig houd
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* WordPress Development */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">WordPress development</h3>
              
              <ul className="space-y-3">
                {[
                  'Custom WordPress themes',
                  'WooCommerce webshops',
                  'Plugin development',
                  'Performance optimalisatie',
                  'WordPress onderhoud'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-[#376eb5] mt-1.5 flex-shrink-0">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Design & UX */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">Design & UX</h3>
              
              <ul className="space-y-3">
                {[
                  'Responsive webdesign',
                  'UX/UI optimalisatie',
                  'Conversiegericht ontwerp',
                  'Toegankelijkheid (WCAG)',
                  'Mobile-first design'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-[#1abc9c] mt-1.5 flex-shrink-0">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section - Beige background */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#FAFAF8' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="mb-10 lg:mb-12">
            <p className="text-sm font-medium tracking-wider text-[#376eb5] uppercase mb-3">
              Artikelen
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
              Geschreven door Sanne
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