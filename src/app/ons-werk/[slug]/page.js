import { notFound } from 'next/navigation';
import he from 'he';
import CaseHero from '../../components/CaseHero';
import CaseContent from '../../components/CaseContent';
import RelatedCases from '../../components/RelatedCases';
import CTASection from '../../components/CTASection';
import LogoSlider from '../../components/LogoSlider';
import { getCaseBySlug, getCases, getAllCaseSlugs, getHomepageSettings } from '../../lib/wordpress';

const SITE_URL = 'https://www.onlinelabs.nl';

// 🚀 ISR: Revalidate every 24 hours
export const revalidate = 86400;

// Generate static paths for all cases
export async function generateStaticParams() {
  const slugs = await getAllCaseSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Dynamic metadata based on case content + Rank Math SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const caseData = await getCaseBySlug(resolvedParams.slug);

  if (!caseData) {
    return {
      title: 'Case niet gevonden',
    };
  }

  // Use Rank Math SEO data if available (same approach as skills)
  if (caseData.seo) {
    return {
      title: {
        absolute: caseData.seo.title || caseData.title
      },
      description: caseData.seo.description || '',
      alternates: {
        canonical: `/ons-werk/${resolvedParams.slug}`,
      },
      openGraph: {
        title: caseData.seo.openGraph?.title || caseData.seo.title || caseData.title,
        description: caseData.seo.openGraph?.description || caseData.seo.description,
        url: `/ons-werk/${resolvedParams.slug}`,
        images: caseData.seo.openGraph?.image?.url 
          ? [caseData.seo.openGraph.image.url]
          : caseData.featuredImage?.sourceUrl 
            ? [caseData.featuredImage.sourceUrl]
            : ['/og-image-ons-werk.jpg'],
        type: 'article',
        locale: 'nl_NL',
        siteName: 'OnlineLabs',
      },
      twitter: {
        card: 'summary_large_image',
        title: caseData.seo.openGraph?.title || caseData.seo.title || caseData.title,
        description: caseData.seo.openGraph?.description || caseData.seo.description,
        images: caseData.seo.openGraph?.image?.url 
          ? [caseData.seo.openGraph.image.url]
          : caseData.featuredImage?.sourceUrl 
            ? [caseData.featuredImage.sourceUrl]
            : ['/og-image-ons-werk.jpg'],
      },
    };
  }

  // Fallback to case content (no Rank Math data)
  const title = caseData.title;
  const description = caseData.excerpt || '';
  const ogImage = caseData.featuredImage?.sourceUrl || '/og-image-ons-werk.jpg';

  return {
    title: {
      absolute: `${title} | OnlineLabs`
    },
    description,
    alternates: {
      canonical: `/ons-werk/${resolvedParams.slug}`,
    },
    openGraph: {
      title: `${title} | OnlineLabs`,
      description,
      url: `/ons-werk/${resolvedParams.slug}`,
      images: [ogImage],
      type: 'article',
      locale: 'nl_NL',
      siteName: 'OnlineLabs',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | OnlineLabs`,
      description,
      images: [ogImage],
    },
  };
}

export default async function CaseDetailPage({ params }) {
  const resolvedParams = await params;
  
  // Fetch case data and related cases in parallel
  const [caseData, allCases, homepageSettings] = await Promise.all([
    getCaseBySlug(resolvedParams.slug),
    getCases(10),
    getHomepageSettings(),
  ]);

  // 404 if case not found
  if (!caseData) {
    notFound();
  }

  // Extract logo slider data
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

  const currentUrl = `${SITE_URL}/ons-werk/${resolvedParams.slug}`;

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": caseData.clientName || caseData.title,
        "item": currentUrl
      }
    ]
  };

  // Case Study Schema (Article subtype voor case studies)
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${currentUrl}/#article`,
    "headline": caseData.title,
    "description": caseData.excerpt,
    "image": caseData.featuredImage?.sourceUrl || undefined,
    "datePublished": caseData.projectDate ? `${caseData.projectDate}T00:00:00+01:00` : undefined,
    "dateModified": caseData.projectDate ? `${caseData.projectDate}T00:00:00+01:00` : undefined,
    "author": {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      "name": "OnlineLabs",
      "url": SITE_URL
    },
    "publisher": {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      "name": "OnlineLabs",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cdn.onlinelabs.nl/wp-content/uploads/2025/01/18075444/OnlineLabs-logo.png"
      }
    },
    "about": {
      "@type": "Organization",
      "name": caseData.clientName
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    },
    "isPartOf": {
      "@id": `${SITE_URL}/#website`
    },
    "inLanguage": "nl-NL"
  };

  return (
    <>
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Case Study Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />

      <main>
        {/* Hero Section */}
        <CaseHero caseData={caseData} />

        {/* Main Content with Sidebar */}
        <CaseContent caseData={caseData} />

        {/* Related Cases */}
        <RelatedCases cases={allCases} currentSlug={resolvedParams.slug} />

        {/* Logo Slider - Social Proof */}
        {logoSliderData && logoSliderData.logos.length > 0 && (
          <LogoSlider 
            title={logoSliderData.title}
            logos={logoSliderData.logos}
            speed={logoSliderData.speed}
            grayscale={logoSliderData.grayscale}
          />
        )}

        {/* Final CTA */}
        <CTASection 
          title="Wat kan OnlineLabs voor jou betekenen?"
          description="Plan een vrijblijvend gesprek en ontdek de mogelijkheden voor jouw online groei."
          primaryButton={{ text: "Neem contact op", url: "/contact" }}
          secondaryButton={{ text: "Bekijk onze skills", url: "/skills" }}
          variant="primary"
        />
      </main>
    </>
  );
}