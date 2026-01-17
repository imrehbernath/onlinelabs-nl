import { getAllBlogPostSlugs, getAllCaseSlugs, getAllServices } from './lib/wordpress';

export default async function sitemap() {
  const siteUrl = 'https://www.onlinelabs.nl';

  // Fetch all dynamic content in parallel
  let blogSlugs = [];
  let caseSlugs = [];
  let services = [];

  try {
    [blogSlugs, caseSlugs, services] = await Promise.all([
      getAllBlogPostSlugs(),
      getAllCaseSlugs(),
      getAllServices(),
    ]);
  } catch (error) {
    console.error('Sitemap fetch error:', error);
  }

  // Static pages
  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/skills`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/ons-werk`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/over-ons`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Training pages
  const trainingPages = [
    {
      url: `${siteUrl}/trainingen`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/trainingen/ai-visibility-website-optimalisatie`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/trainingen/wordpress-ai-training`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/trainingen/online-ads-analytics`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic blog post pages (/blog/[slug])
  const blogPages = blogSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Dynamic service/skill pages (/skills/[slug])
  const servicePages = services.map((service) => ({
    url: `${siteUrl}/skills/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Dynamic case pages (/ons-werk/[slug])
  const casePages = caseSlugs.map((slug) => ({
    url: `${siteUrl}/ons-werk/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...trainingPages, ...servicePages, ...casePages, ...blogPages];
}
