import Link from 'next/link';
import Image from 'next/image';

async function getAuthorPosts() {
  const query = `
    query GetAuthorPosts {
      posts(first: 100, where: { author: 3, orderby: { field: DATE, order: DESC } }) {
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
      'https://wordpress-988065-5984089.cloudwaysapps.com/graphql',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
        next: { revalidate: 3600 }
      }
    );

    const json = await res.json();
    return json.data?.posts?.nodes || [];
  } catch (error) {
    console.error('Fetch Error:', error);
    return [];
  }
}

export const metadata = {
  title: 'Adrian Enders - Online Marketeer | OnlineLabs',
  description: 'Adrian Enders is online marketeer bij OnlineLabs, gespecialiseerd in SEO, Google Ads en social media marketing. Van strategie tot uitvoering.',
  alternates: {
    canonical: 'https://www.onlinelabs.nl/auteur/adrian-enders',
  },
  openGraph: {
    title: 'Adrian Enders - Online Marketeer | OnlineLabs',
    description: 'Adrian Enders is online marketeer bij OnlineLabs, gespecialiseerd in SEO, Google Ads en social media marketing.',
    url: 'https://www.onlinelabs.nl/auteur/adrian-enders',
    siteName: 'OnlineLabs',
    locale: 'nl_NL',
    images: [
      {
        url: 'https://wordpress-988065-5984089.cloudwaysapps.com/wp-content/uploads/2025/11/Adrian-Enders-Online-marketeer.webp',
        width: 200,
        height: 200,
        alt: 'Adrian Enders',
      },
    ],
  },
};

export default async function AdrianAuthorPage() {
  const posts = await getAuthorPosts();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": "https://www.onlinelabs.nl/auteur/adrian-enders#profilepage",
        "url": "https://www.onlinelabs.nl/auteur/adrian-enders",
        "name": "Profiel van Adrian Enders",
        "mainEntity": { "@id": "https://www.onlinelabs.nl/auteur/adrian-enders#person" },
        "inLanguage": "nl-NL"
      },
      {
        "@type": "Person",
        "@id": "https://www.onlinelabs.nl/auteur/adrian-enders#person",
        "name": "Adrian Enders",
        "url": "https://www.onlinelabs.nl/auteur/adrian-enders",
        "description": "Adrian Enders is online marketeer bij OnlineLabs, gespecialiseerd in SEO, Google Ads en social media marketing.",
        "image": {
          "@type": "ImageObject",
          "url": "https://wordpress-988065-5984089.cloudwaysapps.com/wp-content/uploads/2025/11/Adrian-Enders-Online-marketeer.webp",
          "caption": "Adrian Enders"
        },
        "jobTitle": "Allround Online Marketeer",
        "sameAs": ["https://www.linkedin.com/in/adrian-fa-enders"],
        "worksFor": {
          "@type": "Organization",
          "name": "OnlineLabs",
          "url": "https://www.onlinelabs.nl/"
        },
        "knowsAbout": [
          "SEO",
          "Google Ads",
          "Social media marketing",
          "Google Analytics",
          "LinkedIn Advertising",
          "Marketing strategie"
        ]
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
                src="https://wordpress-988065-5984089.cloudwaysapps.com/wp-content/uploads/2025/11/Adrian-Enders.webp"
                alt="Adrian Enders"
                width={200}
                height={300}
                className="rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] object-cover"
                priority
              />
            </div>

            {/* Author Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Adrian Enders
              </h1>
              <p className="text-xl text-[#376eb5] font-medium mb-6">
                Allround Online Marketeer bij OnlineLabs
              </p>
              
              <div className="text-lg text-gray-600 leading-relaxed space-y-4">
                <p>
                  Mijn avontuur van Groningen naar het bruisende Amsterdam heeft een nieuwe wending genomen met een sprankelende carrièreswitch. Met volle moed en grenzeloze passie voor online marketing heb ik de stap gezet naar een nieuwe toekomst als Allround Online Marketeer bij OnlineLabs.
                </p>
                
                <p>
                  Van SEO tot social media advertising, van Google Ads tot marketing strategie — ik help bedrijven groeien door de juiste mensen op het juiste moment te bereiken. Bij OnlineLabs combineer ik creativiteit met data om campagnes te bouwen die echt resultaat opleveren.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-6 justify-center md:justify-start">
                <a 
                  href="https://www.linkedin.com/in/adrian-fa-enders" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#376eb5] hover:bg-[#2d5a94] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Volg Adrian op LinkedIn
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
            {/* SEO & Analytics */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">SEO & Analytics</h3>
              
              <ul className="space-y-3">
                {[
                  'Search Engine Optimization (SEO)',
                  'Google Analytics',
                  'Marketing strategie',
                  'Web design',
                  'Content optimalisatie'
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

            {/* Advertising & Social */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">Advertising & Social</h3>
              
              <ul className="space-y-3">
                {[
                  'Google Ads',
                  'LinkedIn Advertising',
                  'Facebook & Instagram Marketing',
                  'Social media marketing',
                  'Search advertising (SEA)'
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
              Geschreven door Adrian
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