import { notFound } from 'next/navigation';
import he from 'he';
import CaseHero from '../../components/CaseHero';
import CaseContent from '../../components/CaseContent';
import RelatedCases from '../../components/RelatedCases';
import CTASection from '../../components/CTASection';
import LogoSlider from '../../components/LogoSlider';
import { getCaseBySlug, getCases, getAllCaseSlugs, getHomepageSettings } from '../../lib/wordpress';

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
      title: 'Case niet gevonden | OnlineLabs',
    };
  }

  // Default values from case content
  let title = caseData.title;
  let description = caseData.excerpt || '';
  let ogImage = caseData.featuredImage?.sourceUrl;

  // Parse Rank Math HEAD for SEO data (same approach as blog posts)
  if (caseData.rankMathHead) {
    // Extract title from og:title or <title> tag
    const titleMatch = caseData.rankMathHead.match(/<meta property="og:title" content="([^"]*)"/)
      || caseData.rankMathHead.match(/<title>([^<]*)<\/title>/);
    if (titleMatch) {
      title = he.decode(titleMatch[1]);
    }
    
    // Extract description
    const descMatch = caseData.rankMathHead.match(/<meta name="description" content="([^"]*)"/);
    if (descMatch) {
      description = he.decode(descMatch[1]);
    }
    
    // Extract OG image
    const ogImageMatch = caseData.rankMathHead.match(/<meta property="og:image" content="([^"]*)"/);
    if (ogImageMatch) {
      ogImage = ogImageMatch[1];
    }
  }

  return {
    title: {
      absolute: title
    },
    description,
    alternates: {
      canonical: `/ons-werk/${resolvedParams.slug}`,
    },
    openGraph: {
      title,
      description,
      images: ogImage ? [ogImage] : [],
      type: 'article',
      locale: 'nl_NL',
      siteName: 'OnlineLabs',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
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

  const currentUrl = `https://www.onlinelabs.nl/ons-werk/${resolvedParams.slug}`;

  // JSON-LD Schema for Case Study
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseData.title,
    description: caseData.excerpt,
    image: caseData.featuredImage?.sourceUrl,
    datePublished: caseData.projectDate,
    author: {
      '@type': 'Organization',
      name: 'OnlineLabs',
      url: 'https://www.onlinelabs.nl'
    },
    publisher: {
      '@type': 'Organization',
      name: 'OnlineLabs',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cdn.onlinelabs.nl/wp-content/uploads/2024/12/18111213/Onlinelabs-logo.svg'
      }
    },
    about: {
      '@type': 'Organization',
      name: caseData.clientName
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': currentUrl
    }
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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