import BlogOverviewClient from './BlogOverviewClient';
import CTASection from '../components/CTASection';

export const revalidate = 86400; // 24 hours ISR

async function getPosts() {
  const query = `
    query GetPosts {
      posts(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
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
      categories(where: { hideEmpty: true }) {
        nodes {
          name
          slug
          count
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
    
    // Keep WordPress URLs for now (CDN not yet configured)
    const posts = json.data?.posts?.nodes || [];

    return {
      posts,
      categories: json.data?.categories?.nodes || []
    };
  } catch (error) {
    console.error('Fetch Error:', error);
    return { posts: [], categories: [] };
  }
}

export const metadata = {
  title: 'Online Marketing Blog – SEO, Webdesign & Tips | OnlineLabs',
  description: 'Lees onze blogs over SEO, webdesign, AI visibility en online marketing. Praktische inzichten, tips en trends voor betere online resultaten.',
  alternates: {
    canonical: 'https://www.onlinelabs.nl/blog',
  },
  openGraph: {
    title: 'Online Marketing Blog – SEO, Webdesign & Tips | OnlineLabs',
    description: 'Lees onze blogs over SEO, webdesign, AI visibility en online marketing. Praktische inzichten, tips en trends voor betere online resultaten.',
    url: 'https://www.onlinelabs.nl/blog',
    siteName: 'OnlineLabs',
    locale: 'nl_NL',
    images: [
      {
        url: 'https://cdn.onlinelabs.nl/wp-content/uploads/2024/12/blog-og-image.webp',
        width: 1200,
        height: 675,
        alt: 'OnlineLabs Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Marketing Blog – SEO, Webdesign & Tips | OnlineLabs',
    description: 'Lees onze blogs over SEO, webdesign, AI visibility en online marketing. Praktische inzichten, tips en trends voor betere online resultaten.',
    images: ['https://cdn.onlinelabs.nl/wp-content/uploads/2024/12/blog-og-image.webp'],
  },
};

export default async function BlogOverview() {
  const { posts, categories } = await getPosts();

  return (
    <main>
      {/* Hero Section - Matching ServiceHero style */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white pt-24 sm:pt-28 pb-12 sm:pb-16 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[#376eb5] font-semibold text-sm tracking-widest uppercase mb-8 lg:mb-6"
            style={{ backgroundColor: 'rgba(55, 110, 181, 0.1)' }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
              <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
            </svg>
            Blog
          </div>
          
          {/* Title */}
          <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
            Insights & Artikelen
          </h1>
          
          {/* Description */}
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
            Praktische inzichten over SEO, webdesign, AI visibility en online marketing. Tips en trends voor betere online resultaten.
          </p>
        </div>
      </section>

      {/* Client Component with Filtering */}
      <BlogOverviewClient posts={posts} categories={categories} />

      {/* CTA Section - using standard component */}
      <CTASection 
        title="Blijf op de hoogte van onze insights"
        subtitle="Schrijf je in voor onze nieuwsbrief"
        buttonText="Naar contact"
        buttonUrl="/contact"
      />
    </main>
  );
}