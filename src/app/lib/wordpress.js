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

// Fetch single service (voor detail pages later)
export async function getServiceBySlug(slug) {
  console.log(`🔍 Fetching service: ${slug}`);
  
  try {
    const data = await fetchAPI(
      `
      query GetServiceBySlug($slug: ID!) {
        service(id: $slug, idType: SLUG) {
          id
          title
          content
          slug
          uri
          serviceDetails {
            subtitle
            description
            featured
          }
        }
      }
    `,
      {
        variables: { slug },
      }
    );

    console.log('✅ Service fetched:', data?.service?.title || 'Not found');
    return data?.service;
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
// FUTURE: BLOG POSTS, CASES, etc.
// ==========================================

// TODO: Add getBlogPosts()
// TODO: Add getCases()
// TODO: Add getTeamMembers()