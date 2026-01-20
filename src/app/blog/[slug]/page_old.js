import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import he from 'he';
import styles from './blog-post.module.css';
import TableOfContents from './TableOfContents';
import FAQAccordion from './FAQAccordion';
import ReadingProgressBar from './ReadingProgressBar';
import ReadingTime from './ReadingTime';
import SocialShareButtons from './SocialShareButtons';
import AuthorBio from './AuthorBio';
import CTASection from '../../components/CTASection';

const WP_URL = 'https://cdn.onlinelabs.nl';
const SITE_URL = 'https://www.onlinelabs.nl';

async function getPost(slug) {
  const query = `
    query GetPost($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        title
        content
        excerpt
        date
        modified
        uri
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
        seo {
          title
          description
          canonicalUrl
          openGraph {
            title
            description
            image {
              url
            }
          }
          jsonLd {
            raw
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(
      `${WP_URL}/graphql`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { slug } }),
        next: { revalidate: 3600 }
      }
    );

    const json = await res.json();
    
    if (json.errors) {
      console.error('GraphQL Errors:', json.errors);
      return null;
    }
    
    return json.data?.post || null;
  } catch (error) {
    console.error('Fetch Error:', error);
    return null;
  }
}

// Helper: Replace WordPress URLs with production URLs in schema
// IMPORTANT: Keep image URLs on CDN, only replace schema/website URLs
function replaceWpUrls(str) {
  if (!str) return str;
  
  return str
    // Replace old Cloudways URL
    .replace(/https:\/\/wordpress-988065-5984089\.cloudwaysapps\.com/g, SITE_URL)
    // Replace cdn.onlinelabs.nl with www EXCEPT for /wp-content/ paths (images)
    .replace(/https:\/\/cdn\.onlinelabs\.nl(?!\/wp-content\/)/g, SITE_URL)
    // Replace bare cdn.onlinelabs.nl in name/organization fields
    .replace(/"cdn\.onlinelabs\.nl"/g, '"www.onlinelabs.nl"');
}

// Helper: Extract FAQs from JSON-LD
function extractFaqsFromJsonLd(jsonLdRaw) {
  if (!jsonLdRaw) return [];
  
  try {
    // Remove script tags if present
    const jsonContent = jsonLdRaw
      .replace(/<script[^>]*>/gi, '')
      .replace(/<\/script>/gi, '')
      .trim();
    
    const schema = JSON.parse(jsonContent);
    
    if (schema['@graph']) {
      for (const item of schema['@graph']) {
        if (item['@type'] === 'FAQPage' && item.mainEntity) {
          return item.mainEntity.map(q => ({
            question: q.name,
            answer: q.acceptedAnswer?.text || ''
          }));
        }
        
        if (item.subjectOf) {
          for (const subject of item.subjectOf) {
            if (subject['@type'] === 'FAQPage' && subject.mainEntity) {
              return subject.mainEntity.map(q => ({
                question: q.name,
                answer: q.acceptedAnswer?.text || ''
              }));
            }
          }
        }
      }
    } else if (schema['@type'] === 'FAQPage' && schema.mainEntity) {
      return schema.mainEntity.map(q => ({
        question: q.name,
        answer: q.acceptedAnswer?.text || ''
      }));
    }
  } catch (e) {
    console.error('FAQ extraction error:', e.message);
  }
  
  return [];
}

// Helper: Clean JSON-LD - remove canonical to avoid duplicate signals
function cleanJsonLd(jsonLdRaw) {
  if (!jsonLdRaw) return null;
  
  try {
    const jsonContent = jsonLdRaw
      .replace(/<script[^>]*>/gi, '')
      .replace(/<\/script>/gi, '')
      .trim();
    
    const schema = JSON.parse(jsonContent);
    
    // Remove canonical URLs from JSON-LD to avoid SF detecting as "outside head"
    if (schema['@graph']) {
      schema['@graph'] = schema['@graph'].map(item => {
        // Remove url/mainEntityOfPage that duplicates canonical
        if (item['@type'] === 'WebPage') {
          delete item.url;
        }
        return item;
      });
    }
    
    return JSON.stringify(schema);
  } catch (e) {
    console.error('JSON-LD clean error:', e.message);
    return jsonLdRaw;
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);
  
  if (!post) return { title: 'Post niet gevonden' };

  // Use SEO data from Rank Math, fallback to post data
  const title = post.seo?.title || post.title;
  const description = post.seo?.description || post.excerpt?.replace(/<[^>]*>/g, '').substring(0, 160) || '';
  const ogImage = post.seo?.openGraph?.image?.url || post.featuredImage?.node?.sourceUrl;

  return {
    title: {
      absolute: title
    },
    description,
    alternates: {
      canonical: `/blog/${resolvedParams.slug}`,
    },
    openGraph: {
      title: post.seo?.openGraph?.title || title,
      description: post.seo?.openGraph?.description || description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function BlogPost({ params }) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const headings = [];
  
  // Extract FAQs from Rank Math JSON-LD
  const faqs = extractFaqsFromJsonLd(post.seo?.jsonLd?.raw);
  
  // Process content for TOC - only H2 headings
  const contentWithIds = post.content.replace(
    /<h([23])[^>]*>(.*?)<\/h\1>/gi,
    (match, level, text) => {
      const cleanText = text.replace(/<[^>]*>/g, '').trim();
      const id = cleanText
        .toLowerCase()
        .replace(/[^a-z0-9\u00C0-\u017F]+/g, '-')
        .replace(/^-|-$/g, '');
      
      if (parseInt(level) === 2 && cleanText.length > 0) {
        headings.push({ level: parseInt(level), text: cleanText, id });
      }
      
      return `<h${level} id="${id}">${text}</h${level}>`;
    }
  );

  const cleanExcerpt = he.decode(post.excerpt?.replace(/<[^>]*>/g, '') || '');
  const currentUrl = `${SITE_URL}/blog/${resolvedParams.slug}`;

  // Author slug and avatar mapping
  const getAuthorSlug = (name) => {
    const map = {
      'Imre Bernáth': 'imre-bernath',
      'Imre Bernath': 'imre-bernath',
      'Sanne Verschoor': 'sanne-verschoor',
      'Colin Dijkstra': 'colin-dijkstra',
      'Adrian Enders': 'adrian-enders',
    };
    return map[name] || null;
  };

  const getAuthorAvatar = (name) => {
    const avatars = {
      'Colin Dijkstra': `${WP_URL}/wp-content/uploads/2025/11/Colin-Dijkstra-online-marketeer.webp`,
      'Adrian Enders': `${WP_URL}/wp-content/uploads/2025/11/Adrian-Enders-Online-marketeer.webp`,
      'Sanne Verschoor': `${WP_URL}/wp-content/uploads/2025/11/Sanne-Verschoor-Webdesigner.webp`,
      'Imre Bernáth': 'https://gravatar.com/avatar/35c26275319f1c247e76cd36518ee34a?size=128',
      'Imre Bernath': 'https://gravatar.com/avatar/35c26275319f1c247e76cd36518ee34a?size=128',
      'Zara Fung': `${WP_URL}/wp-content/uploads/2025/11/Zara-Fung.webp`,
      'Elsa Heijnen': `${WP_URL}/wp-content/uploads/2025/11/Elsa-Heijnen.webp`,
      'Nikky de Ridder': `${WP_URL}/wp-content/uploads/2025/11/Nikky-de-Ridder.webp`,
    };
    
    return avatars[name] || 'https://gravatar.com/avatar/35c26275319f1c247e76cd36518ee34a?size=128';
  };

  const authorSlug = getAuthorSlug(post.author?.node?.name);
  const authorAvatar = getAuthorAvatar(post.author?.node?.name);

  // Process JSON-LD: replace WordPress URLs and clean canonical references
  const processedJsonLd = post.seo?.jsonLd?.raw 
    ? cleanJsonLd(replaceWpUrls(post.seo.jsonLd.raw))
    : null;

  // Use fragment <> instead of <main> - layout.js already provides <main>
  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Hero Section - OnlineLabs Style */}
      <section className="bg-white pt-24 sm:pt-28 pb-12 lg:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-[#376eb5] transition-colors">Home</Link>
              </li>
              <li>•</li>
              <li>
                <Link href="/blog" className="hover:text-[#376eb5] transition-colors">Blog</Link>
              </li>
              <li>•</li>
              <li className="text-gray-900 font-medium truncate max-w-[200px]">{post.title}</li>
            </ol>
          </nav>

          {/* Title */}
          <h1 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>
          
          {/* Excerpt */}
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-8">
            {cleanExcerpt}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
            {post.author?.node && (
              authorSlug ? (
                <Link 
                  href={`/auteur/${authorSlug}`}
                  className="flex items-center gap-2 hover:text-[#376eb5] transition-colors"
                >
                  <Image
                    src={authorAvatar}
                    alt={`Foto van ${post.author.node.name}`}
                    width={32}
                    height={32}
                    className="rounded-full"
                    loading="lazy"
                  />
                  <span className="font-medium">{post.author.node.name}</span>
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Image
                    src={authorAvatar}
                    alt={`Foto van ${post.author.node.name}`}
                    width={32}
                    height={32}
                    className="rounded-full"
                    loading="lazy"
                  />
                  <span className="font-medium">{post.author.node.name}</span>
                </div>
              )
            )}
                          
            <span className="text-gray-300">•</span>
            
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('nl-NL', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </time>

            {post.modified && new Date(post.modified).getTime() !== new Date(post.date).getTime() && (
              <>
                <span className="text-gray-300">•</span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                  Bijgewerkt {new Date(post.modified).toLocaleDateString('nl-NL', {
                    day: 'numeric',
                    month: 'short'
                  })}
                </span>
              </>
            )}

            <span className="text-gray-300">•</span>
            <ReadingTime content={post.content} />
          </div>

          {/* Social Share */}
          <div className="pb-8 border-b border-gray-200">
            <SocialShareButtons 
              title={post.title}
              url={currentUrl}
            />
          </div>
        </div>
      </section>

      {/* Featured Image - Gray background */}
      {post.featuredImage?.node?.sourceUrl && (
        <section className="py-8" style={{ backgroundColor: '#F9FAFB' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText || post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          </div>
        </section>
      )}

      {/* Main Content - Beige background */}
      <article className="py-12 lg:py-16" style={{ backgroundColor: '#FAFAF8' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-12 gap-8 lg:gap-12">

            {/* Sidebar - TOC */}
            {headings.length > 0 && (
              <aside className="col-span-12 lg:col-span-4">
                <div className="lg:sticky lg:top-24">
                  <TableOfContents headings={headings} />
                </div>
              </aside>
            )}

            {/* Content */}
            <div className={headings.length > 0 ? 'col-span-12 lg:col-span-8' : 'col-span-12 max-w-3xl mx-auto'}>
              
              <div className="bg-white rounded-xl p-6 lg:p-10 shadow-lg">
                <div 
                  className={styles.blogContent}
                  dangerouslySetInnerHTML={{ __html: contentWithIds }}
                />
              </div>

              {/* FAQ Section */}
              {faqs.length > 0 && (
                <div className="mt-8">
                  <FAQAccordion faqs={faqs} />
                </div>
              )}

              {/* Author Bio */}
              <div className="mt-8">
                <AuthorBio authorName={post.author?.node?.name} />
              </div>

              {/* Share buttons bottom */}
              <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-gray-600 font-medium">Vond je dit artikel nuttig?</p>
                  <SocialShareButtons 
                    title={post.title}
                    url={currentUrl}
                  />
                </div>
              </div>

              {/* Back to blog */}
              <div className="mt-8 text-center">
                <Link 
                  href="/blog"
                  className="inline-flex items-center gap-2 text-[#376eb5] hover:text-[#2d5a94] font-semibold text-lg group"
                >
                  <span className="group-hover:-translate-x-1 transition-transform">←</span>
                  Terug naar blogoverzicht
                </Link>
              </div>

            </div>

          </div>
        </div>
      </article>

      {/* CTA Section */}
      <CTASection 
        title="Hulp nodig met je online marketing?"
        subtitle="Neem contact op"
        buttonText="Start een gesprek"
        buttonUrl="/contact"
      />

      {/* Schema.org structured data from Rank Math */}
      {processedJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: processedJsonLd }}
        />
      )}
    </>
  );
}

export const revalidate = 86400;