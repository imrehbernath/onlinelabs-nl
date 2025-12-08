// WordPress GraphQL API Client
// Fetches data from headless WordPress with ISR caching

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://wordpress-988065-5984089.cloudwaysapps.com/graphql';

async function fetchAPI(query, { variables = {} } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  // Optional: Add auth for preview mode
  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers.Authorization = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  // Build request body
  const body = JSON.stringify({
    query: query,
    variables: variables,
  });

  console.log('📤 Sending GraphQL request...');
  console.log('🔗 URL:', WORDPRESS_API_URL);

  try {
    const res = await fetch(WORDPRESS_API_URL, {
      method: 'POST',
      headers: headers,
      body: body,
      next: { revalidate: 86400 }, // 24 uur cache - CRITICAL voor CWV!
      cache: 'force-cache', // Extra cache hint voor Next.js 15
    });

    console.log('📥 Response status:', res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error('❌ HTTP Error response:', errorText);
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();
    console.log('✅ Response received:', json.data ? 'Has data' : 'No data');

    if (json.errors) {
      console.error('❌ GraphQL Errors:', JSON.stringify(json.errors, null, 2));
      throw new Error('Failed to fetch API');
    }

    return json.data;
  } catch (error) {
    console.error('❌ WordPress API Error:', error);
    throw error;
  }
}

// ==========================================
// HOMEPAGE DATA
// ==========================================

// Fetch homepage settings (Hero + About sections)
export async function getHomepageSettings() {
  console.log('🏠 Fetching homepage data from WordPress...');
  
  try {
    const data = await fetchAPI(`
      query GetHomepage {
        page(id: "homepage", idType: URI) {
          id
          title
          homepageHero {
            heroSection {
              heroTitle
              heroSubtitle
              heroDescription
              heroImage {
                node {
                  sourceUrl(size: LARGE)
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
              }
              heroVideoWebm {
                node {
                  mediaItemUrl
                }
              }
              heroVideoMp4 {
                node {
                  mediaItemUrl
                }
              }
              heroCtaText
              heroCtaUrl
            }
          }
          homepageAbout {
            aboutSection {
              aboutTitle
              aboutSubtitle
              aboutParagraph1
              aboutParagraph2
              aboutTargetTitle
              aboutTargetItems {
                item
              }
              aboutImage {
                node {
                  sourceUrl(size: LARGE)
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
              }
              aboutCtaText
              aboutCtaUrl
            }
          }
          homepageLogos {
            logoSlider {
              sliderTitle
              sliderEnabled
              sliderSpeed
              sliderGrayscale
              logos {
                logoImage {
                  node {
                    sourceUrl
                    altText
                    mediaDetails {
                      width
                      height
                    }
                  }
                }
                companyName
                logoAlt
                websiteUrl
              }
            }
          }
        }
      }
    `);

    console.log('✅ Homepage data fetched');
    console.log('📦 Hero title:', data?.page?.homepageHero?.heroSection?.heroTitle || 'Not found');
    console.log('📦 About title:', data?.page?.homepageAbout?.aboutSection?.aboutTitle || 'Not found');
    console.log('📦 Logo slider enabled:', data?.page?.homepageLogos?.logoSlider?.sliderEnabled ? 'Yes' : 'No');

    // Transform to expected structure for components
    return {
      heroSection: data?.page?.homepageHero?.heroSection || null,
      aboutSection: data?.page?.homepageAbout?.aboutSection || null,
      logoSlider: data?.page?.homepageLogos?.logoSlider || null
    };
  } catch (error) {
    console.error('❌ Failed to fetch homepage data:', error.message);
    return null; // Return null als fallback
  }
}

// ==========================================
// SERVICES
// ==========================================

// Fetch alle services voor mega menu
export async function getAllServices() {
  console.log('🔍 Fetching services from WordPress...');
  
  try {
    const data = await fetchAPI(`
      query GetServices {
        services(first: 10, where: {orderby: {field: DATE, order: ASC}}) {
          nodes {
            id
            title
            slug
            uri
            serviceDetails {
              subtitle
              description
              featured
            }
          }
        }
      }
    `);

    console.log('✅ Services fetched:', data?.services?.nodes?.length || 0);

    return data?.services?.nodes || [];
  } catch (error) {
    console.error('❌ Failed to fetch services:', error.message);
    return []; // Return empty array als fallback
  }
}

// Fetch single service with FULL flexible content (MATCHED TO ACF 2025)
// NOTE: Using aliases for background fields to avoid GraphQL type conflicts
export async function getServiceBySlug(slug) {
  console.log(`🔍 Fetching service: ${slug}`);
  
  try {
    const data = await fetchAPI(
      `
      query GetServiceBySlug($slug: ID!) {
        service(id: $slug, idType: SLUG) {
          id
          title
          slug
          uri
          serviceDetails {
            subtitle
            description
            showInMenu
            featured
            heroSection {
              title
              subtitle
              description
              image {
                node {
                  sourceUrl(size: LARGE)
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
              }
              ctaText
              ctaUrl
              secondaryCtaText
              secondaryCtaUrl
            }
            pageSections {
              __typename
              ... on ServiceDetailsPageSectionsTextImageLayout {
                layout
                title
                content
                mediaType
                image {
                  node {
                    sourceUrl(size: LARGE)
                    altText
                    mediaDetails {
                      width
                      height
                    }
                  }
                }
                videoWebm {
                  node {
                    mediaItemUrl
                  }
                }
                videoMp4 {
                  node {
                    mediaItemUrl
                  }
                }
                imageCaption
                imageCaptionLink
                background
              }
              ... on ServiceDetailsPageSectionsGeoToolLayout {
                geoToolBackground: background
              }
              ... on ServiceDetailsPageSectionsProcessSectionLayout {
                processBackground: background
              }
              ... on ServiceDetailsPageSectionsServicesListLayout {
                servicesListBackground: background
              }
              ... on ServiceDetailsPageSectionsFaqLayout {
                title
                subtitle
                faqItems {
                  question
                  answer
                }
                faqBackground: background
              }
              ... on ServiceDetailsPageSectionsCtaLayout {
                title
                description
                buttonText
                buttonUrl
                variant
              }
              ... on ServiceDetailsPageSectionsPricingLayout {
                title
                subtitle
                description
                pricingBackground: background
                packages {
                  name
                  price
                  priceNote
                  description
                  highlighted
                  badge
                  features
                  cta
                  ctaUrl
                  icon
                }
              }
              ... on ServiceDetailsPageSectionsTechStackLayout {
                badge
                title
                description
                techStackBackground: background
                ctaText
                ctaUrl
                features {
                  icon
                  title
                  description
                }
              }
              ... on ServiceDetailsPageSectionsWebsitesGalleryLayout {
                title
                subtitle
                websites {
                  title
                  clientName
                  websiteUrl
                  image {
                    node {
                      sourceUrl
                      altText
                    }
                  }
                }
              }
              ... on ServiceDetailsPageSectionsLogoSliderLayout {
                title
                logoSliderBackground: background
              }
              ... on ServiceDetailsPageSectionsTestimonialsLayout {
                title
                subtitle
                limit
                testimonialsBackground: background
              }
            }
          }
        }
      }
    `,
      {
        variables: { slug },
      }
    );

    console.log('✅ Service fetched:', data?.service?.title || 'Not found');
    return data?.service || null;
  } catch (error) {
    console.error('❌ Failed to fetch service:', error.message);
    return null;
  }
}

// ==========================================
// TESTIMONIALS
// ==========================================

// Fetch testimonials voor homepage slider
export async function getTestimonials(limit = 100) {
  console.log(`⭐ Fetching testimonials from WordPress (limit: ${limit})...`);
  
  try {
    const data = await fetchAPI(`
      query GetTestimonials {
        testimonials(first: ${limit}, where: {orderby: {field: DATE, order: ASC}}) {
          nodes {
            id
            title
            testimonialDetails {
              rating
              shortQuote
              fullReview
              reviewerName
              reviewerRole
              reviewerCompany
              reviewerPhoto {
                node {
                  sourceUrl
                  altText
                }
              }
              googleReviewUrl
              verified
            }
          }
        }
      }
    `);

    console.log('✅ Testimonials fetched:', data?.testimonials?.nodes?.length || 0);

    return data?.testimonials?.nodes || [];
  } catch (error) {
    console.error('❌ Failed to fetch testimonials:', error.message);
    return []; // Return empty array als fallback
  }
}

// Fetch single testimonial (voor detail pages - optional)
export async function getTestimonialById(id) {
  console.log(`🔍 Fetching testimonial: ${id}`);
  
  try {
    const data = await fetchAPI(
      `
      query GetTestimonialById($id: ID!) {
        testimonial(id: $id, idType: DATABASE_ID) {
          id
          title
          testimonialDetails {
            rating
            shortQuote
            fullReview
            reviewerName
            reviewerRole
            reviewerCompany
            reviewerPhoto {
              node {
                sourceUrl
                altText
              }
            }
            googleReviewUrl
            verified
          }
        }
      }
    `,
      {
        variables: { id },
      }
    );

    console.log('✅ Testimonial fetched:', data?.testimonial?.testimonialDetails?.reviewerName || 'Not found');
    return data?.testimonial;
  } catch (error) {
    console.error('❌ Failed to fetch testimonial:', error.message);
    return null;
  }
}

// ==========================================
// BLOG POSTS
// ==========================================

/**
 * Get Blog Posts
 * Fetches latest blog posts with author, categories, featured image
 * 
 * @param {number} limit - Number of posts to fetch (default: 3)
 * @returns {Array} Array of blog post objects
 */
export async function getBlogPosts(limit = 3) {
  console.log(`📝 Fetching blog posts from WordPress (limit: ${limit})...`);
  
  try {
    const data = await fetchAPI(
      `
      query GetBlogPosts($limit: Int!) {
        posts(first: $limit, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            id
            title
            excerpt
            slug
            date
            modified
            featuredImage {
              node {
                sourceUrl(size: LARGE)
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
                description
              }
            }
            categories {
              nodes {
                name
                slug
              }
            }
            content
          }
        }
      }
    `,
      {
        variables: { limit },
      }
    );

    console.log('✅ Blog posts fetched:', data?.posts?.nodes?.length || 0);

    // Calculate reading time for each post
    const posts = data?.posts?.nodes?.map(post => {
      const wordCount = post.content ? post.content.replace(/<[^>]*>/g, '').split(/\s+/).length : 0;
      const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words/min

      return {
        id: post.id,
        title: post.title,
        excerpt: post.excerpt?.replace(/<[^>]*>/g, '').trim() || '',
        slug: post.slug,
        date: post.date,
        modified: post.modified,
        readingTime: readingTime || 5, // Default to 5 min if can't calculate
        categories: post.categories.nodes.map(cat => cat.name),
        author: {
          name: post.author.node.name,
          avatar: post.author.node.avatar.url,
          bio: post.author.node.description
        },
        featuredImage: post.featuredImage?.node ? {
          sourceUrl: post.featuredImage.node.sourceUrl,
          altText: post.featuredImage.node.altText,
          width: post.featuredImage.node.mediaDetails?.width,
          height: post.featuredImage.node.mediaDetails?.height
        } : null
      };
    }) || [];

    return posts;

  } catch (error) {
    console.error('❌ Failed to fetch blog posts:', error.message);
    return [];
  }
}

/**
 * Get Single Blog Post by Slug
 * 
 * @param {string} slug - Post slug
 * @returns {Object} Blog post object
 */
export async function getBlogPostBySlug(slug) {
  console.log(`📝 Fetching blog post: ${slug}`);
  
  try {
    const data = await fetchAPI(
      `
      query GetBlogPost($slug: String!) {
        postBy(slug: $slug) {
          id
          title
          content
          excerpt
          date
          modified
          slug
          featuredImage {
            node {
              sourceUrl(size: LARGE)
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
              description
              avatar {
                url
              }
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          tags {
            nodes {
              name
              slug
            }
          }
          seo {
            title
            description
            canonicalUrl
            openGraph {
              title
              description
              image { sourceUrl }
            }
          }
        }
      }
    `,
      {
        variables: { slug },
      }
    );

    if (!data?.postBy) {
      console.log('❌ Blog post not found');
      return null;
    }

    const post = data.postBy;
    const wordCount = post.content ? post.content.replace(/<[^>]*>/g, '').split(/\s+/).length : 0;
    const readingTime = Math.ceil(wordCount / 200);

    console.log('✅ Blog post fetched:', post.title);

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt?.replace(/<[^>]*>/g, '').trim() || '',
      slug: post.slug,
      date: post.date,
      modified: post.modified,
      readingTime,
      categories: post.categories.nodes.map(cat => ({ name: cat.name, slug: cat.slug })),
      tags: post.tags?.nodes.map(tag => ({ name: tag.name, slug: tag.slug })) || [],
      author: {
        name: post.author.node.name,
        bio: post.author.node.description,
        avatar: post.author.node.avatar.url
      },
      featuredImage: post.featuredImage?.node ? {
        sourceUrl: post.featuredImage.node.sourceUrl,
        altText: post.featuredImage.node.altText,
        width: post.featuredImage.node.mediaDetails?.width,
        height: post.featuredImage.node.mediaDetails?.height
      } : null,
      seo: post.seo || null
    };

  } catch (error) {
    console.error('❌ Failed to fetch blog post:', error.message);
    return null;
  }
}

/**
 * Get All Blog Post Slugs
 * For static generation of blog pages
 * 
 * @returns {Array} Array of slugs
 */
export async function getAllBlogPostSlugs() {
  console.log('📝 Fetching all blog post slugs...');
  
  try {
    const data = await fetchAPI(`
      query GetAllPostSlugs {
        posts(first: 1000) {
          nodes {
            slug
          }
        }
      }
    `);

    const slugs = data?.posts?.nodes?.map(post => post.slug) || [];
    console.log('✅ Blog post slugs fetched:', slugs.length);
    
    return slugs;

  } catch (error) {
    console.error('❌ Failed to fetch post slugs:', error.message);
    return [];
  }
}

// ==========================================
// CASES
// ==========================================

/**
 * Get Featured Cases
 * Returns cases for homepage display
 * 
 * @param {number} limit - Number of cases to fetch (default: 3)
 * @returns {Array} Array of case objects
 */
export async function getCases(limit = 3) {
  console.log(`💼 Fetching cases from WordPress (limit: ${limit})...`);
  
  try {
    const data = await fetchAPI(
      `
      query GetCases($limit: Int!) {
        cases(first: $limit, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            id
            title
            slug
            uri
            caseDetails {
              clientName
              clientLogo {
                node {
                  sourceUrl
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
              }
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
              excerpt
              metrics
              servicesUsed
              ctaText
              ctaUrl
              featured
              projectDate
            }
          }
        }
      }
    `,
      {
        variables: { limit },
      }
    );

    console.log('✅ Cases fetched:', data?.cases?.nodes?.length || 0);

    const cases = data?.cases?.nodes || [];
    
    // Transform data
    return cases.map(caseItem => ({
      id: caseItem.id,
      title: caseItem.title,
      slug: caseItem.slug,
      uri: caseItem.uri,
      clientName: caseItem.caseDetails?.clientName || '',
      clientLogo: caseItem.caseDetails?.clientLogo?.node ? {
        sourceUrl: caseItem.caseDetails.clientLogo.node.sourceUrl,
        altText: caseItem.caseDetails.clientLogo.node.altText || caseItem.caseDetails.clientName,
        width: caseItem.caseDetails.clientLogo.node.mediaDetails?.width || 400,
        height: caseItem.caseDetails.clientLogo.node.mediaDetails?.height || 100,
      } : null,
      featuredImage: caseItem.caseDetails?.featuredImage?.node ? {
        sourceUrl: caseItem.caseDetails.featuredImage.node.sourceUrl,
        altText: caseItem.caseDetails.featuredImage.node.altText || caseItem.title,
        width: caseItem.caseDetails.featuredImage.node.mediaDetails?.width || 1600,
        height: caseItem.caseDetails.featuredImage.node.mediaDetails?.height || 1000,
      } : null,
      excerpt: caseItem.caseDetails?.excerpt || '',
      metrics: caseItem.caseDetails?.metrics || '',
      servicesUsed: caseItem.caseDetails?.servicesUsed || [],
      ctaText: caseItem.caseDetails?.ctaText || `Bekijk de ${caseItem.caseDetails?.clientName || ''} case`,
      ctaUrl: caseItem.caseDetails?.ctaUrl || `/ons-werk/${caseItem.slug}`,
      featured: caseItem.caseDetails?.featured || false,
      projectDate: caseItem.caseDetails?.projectDate || null,
    }));
  } catch (error) {
    console.error('❌ Failed to fetch cases:', error.message);
    return [];
  }
}

/**
 * Get Single Case by Slug
 * For case detail pages - FULL DATA including all ACF fields
 * Uses Rank Math REST API for SEO (same approach as blog posts)
 * 
 * @param {string} slug - Case slug
 * @returns {Object} Case object with all details
 */
export async function getCaseBySlug(slug) {
  console.log(`💼 Fetching case: ${slug}`);
  
  try {
    const data = await fetchAPI(
      `
      query GetCaseBySlug($slug: ID!) {
        case(id: $slug, idType: SLUG) {
          id
          databaseId
          title
          slug
          uri
          caseDetails {
            clientName
            clientLogo {
              node {
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
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
            excerpt
            metrics
            fullCaseStudy
            servicesUsed
            websiteUrl
            ctaText
            ctaUrl
            featured
            projectDate
          }
        }
      }
    `,
      {
        variables: { slug },
      }
    );

    if (!data?.case) {
      console.log('❌ Case not found');
      return null;
    }

    const caseData = data.case;
    const details = caseData.caseDetails || {};

    console.log('✅ Case fetched:', caseData.title);
    console.log('📍 Case URI:', caseData.uri);

    // Build the case object
    const caseObj = {
      id: caseData.id,
      databaseId: caseData.databaseId,
      title: caseData.title,
      slug: caseData.slug,
      uri: caseData.uri,
      // Flatten caseDetails
      clientName: details.clientName || '',
      clientLogo: details.clientLogo?.node ? {
        sourceUrl: details.clientLogo.node.sourceUrl,
        altText: details.clientLogo.node.altText || details.clientName,
        width: details.clientLogo.node.mediaDetails?.width,
        height: details.clientLogo.node.mediaDetails?.height,
      } : null,
      featuredImage: details.featuredImage?.node ? {
        sourceUrl: details.featuredImage.node.sourceUrl,
        altText: details.featuredImage.node.altText || caseData.title,
        width: details.featuredImage.node.mediaDetails?.width,
        height: details.featuredImage.node.mediaDetails?.height,
      } : null,
      excerpt: details.excerpt || '',
      metrics: details.metrics || '',
      fullCaseStudy: details.fullCaseStudy || '',
      servicesUsed: details.servicesUsed || [],
      websiteUrl: details.websiteUrl || '',
      results: [],
      ctaText: details.ctaText || `Bekijk de ${details.clientName || ''} case`,
      ctaUrl: details.ctaUrl || '',
      featured: details.featured || false,
      projectDate: details.projectDate || null,
      // SEO - will be populated below
      rankMathHead: null,
    };

    // Fetch Rank Math SEO data via REST API
    const wpUrl = 'https://wordpress-988065-5984089.cloudwaysapps.com';
    
    // Use WordPress URL for Rank Math (not production URL)
    const caseUrl = `${wpUrl}${caseData.uri}`;
    
    try {
      console.log('🔍 Fetching Rank Math SEO for:', caseUrl);
      const rankMathRes = await fetch(
        `${wpUrl}/wp-json/rankmath/v1/getHead?url=${encodeURIComponent(caseUrl)}`,
        { next: { revalidate: 3600 } }
      );
      
      // Check if response is JSON before parsing
      const contentType = rankMathRes.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const rankMathData = await rankMathRes.json();
        
        if (rankMathData.success && rankMathData.head) {
          caseObj.rankMathHead = rankMathData.head;
          console.log('✅ Rank Math SEO fetched successfully');
        } else {
          console.log('⚠️ Rank Math returned no head data');
        }
      } else {
        console.log('⚠️ Rank Math response is not JSON');
      }
    } catch (seoError) {
      console.error('⚠️ Rank Math API Error (non-critical):', seoError.message);
    }

    return caseObj;
  } catch (error) {
    console.error('❌ Failed to fetch case:', error.message);
    return null;
  }
}

/**
 * Get All Case Slugs
 * For static generation of case detail pages
 * 
 * @returns {Array} Array of slugs
 */
export async function getAllCaseSlugs() {
  console.log('💼 Fetching all case slugs...');
  
  try {
    const data = await fetchAPI(`
      query GetAllCaseSlugs {
        cases(first: 100) {
          nodes {
            slug
          }
        }
      }
    `);

    return data?.cases?.nodes?.map(node => node.slug) || [];
  } catch (error) {
    console.error('❌ Failed to fetch case slugs:', error.message);
    return [];
  }
}