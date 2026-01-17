import TrainingHero from '@/app/components/TrainingHero';
import TrainingProblemSection from '@/app/components/TrainingProblemSection';
import TrainingAudienceSection from '@/app/components/TrainingAudienceSection';
import TrainingCurriculumSection from '@/app/components/TrainingCurriculumSection';
import TrainingPricingSection from '@/app/components/TrainingPricingSection';
import TrainingTrainerSection from '@/app/components/TrainingTrainerSection';
import FAQSection from '@/app/components/FAQSection';
import CTASection from '@/app/components/CTASection';
import { notFound } from 'next/navigation';
import { getTrainingBySlug, getAllTrainings } from '@/app/lib/wordpress';

const SITE_URL = 'https://www.onlinelabs.nl';

// Helper: Replace WordPress URLs with production URLs
function replaceWpUrls(str) {
  if (!str) return str;
  return str.replace(
    /https:\/\/wordpress-988065-5984089\.cloudwaysapps\.com/g,
    SITE_URL
  );
}

// SEO Metadata - Using Rank Math SEO data
export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  const training = await getTrainingBySlug(slug);

  if (!training) {
    return {
      title: 'Training niet gevonden',
    };
  }

  // Use Rank Math SEO data if available
  if (training?.seo) {
    return {
      title: {
        absolute: training.seo.title || training.title
      },
      description: training.seo.description || '',
      alternates: {
        canonical: `/trainingen/${slug}`,
      },
      openGraph: {
        title: training.seo.openGraph?.title || training.seo.title || training.title,
        description: training.seo.openGraph?.description || training.seo.description,
        images: training.seo.openGraph?.image?.url 
          ? [training.seo.openGraph.image.url] 
          : [],
      },
    };
  }

  // Fallback to page data
  const title = training?.trainingDetails?.heroSection?.title || training?.title || '';
  const description = training?.trainingDetails?.heroSection?.description || '';

  return {
    title: {
      absolute: `${title} | Training | OnlineLabs`
    },
    description: description,
    alternates: {
      canonical: `/trainingen/${slug}`,
    },
    openGraph: {
      title: `${title} | Training | OnlineLabs`,
      description: description,
    },
  };
}

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

// Generate static paths
export async function generateStaticParams() {
  try {
    const trainings = await getAllTrainings();
    
    if (trainings && trainings.length > 0) {
      return trainings.map((training) => ({
        slug: training.slug,
      }));
    }
  } catch (error) {
    console.error('Failed to generate static params for trainings:', error);
  }
  
  // Fallback
  return [
    { slug: 'ai-visibility-website-optimalisatie' },
  ];
}

export default async function TrainingDetailPage({ params }) {
  const { slug } = await params;
  
  let training = null;
  
  try {
    training = await getTrainingBySlug(slug);
    if (training && training.trainingDetails) {
      console.log('✅ Using WordPress data for training:', slug);
    }
  } catch (error) {
    console.error('❌ WordPress fetch failed for training:', slug);
  }

  if (!training) {
    notFound();
  }

  const details = training.trainingDetails || {};
  
  // Extract sections
  const heroSection = details.heroSection || {};
  const problemSection = details.problemSection || {};
  const audienceSection = details.audienceSection || {};
  const curriculumSection = details.curriculumSection || {};
  const pricingSection = details.pricingSection || {};
  const trainerSection = details.trainerSection || {};
  const faqSection = details.faqSection || {};
  const ctaSection = details.ctaSection || {};

  // Build hero data
  const heroData = {
    badge: details.badge || 'TRAINING',
    title: heroSection.title || training.title,
    description: heroSection.description || '',
    ctaText: heroSection.ctaText || 'Bekijk trainingsopties',
    ctaLink: heroSection.ctaLink || '#pricing',
    usps: heroSection.usps || [],
  };

  // Build FAQ items for schema
  const faqItems = faqSection.items || [];
  const faqSchema = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer?.replace(/<[^>]*>/g, '') || ''
      }
    }))
  } : null;

  // Breadcrumb Schema
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
        "name": "Trainingen",
        "item": `${SITE_URL}/trainingen`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": heroData.title,
        "item": `${SITE_URL}/trainingen/${slug}`
      }
    ]
  };

  // Course Schema
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": heroData.title,
    "description": heroData.description,
    "provider": {
      "@type": "Organization",
      "name": "OnlineLabs",
      "sameAs": SITE_URL
    },
    "hasCourseInstance": pricingSection.packages?.map(pkg => ({
      "@type": "CourseInstance",
      "name": pkg.name,
      "courseMode": pkg.name?.toLowerCase().includes('online') ? "online" : "onsite",
      "location": {
        "@type": "Place",
        "name": "OnlineLabs Amsterdam",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Amsterdam",
          "addressCountry": "NL"
        }
      },
      "offers": {
        "@type": "Offer",
        "price": pkg.price?.replace(/[^0-9]/g, '') || '',
        "priceCurrency": "EUR"
      }
    })) || []
  };

  return (
    <main>
      {/* Hero Section */}
      <TrainingHero
        badge={heroData.badge}
        title={heroData.title}
        description={heroData.description}
        ctaText={heroData.ctaText}
        ctaLink={heroData.ctaLink}
        usps={heroData.usps}
        slug={slug}
      />

      {/* Problem Section */}
      {problemSection.enabled && (
        <TrainingProblemSection
          badge={problemSection.badge}
          title={problemSection.title}
          content={problemSection.content}
          quote={problemSection.quote}
          quoteAuthor={problemSection.quoteAuthor}
          wrongExample={problemSection.wrongExample}
          rightExample={problemSection.rightExample}
        />
      )}

      {/* Audience Section */}
      {audienceSection.enabled && (
        <TrainingAudienceSection
          title={audienceSection.title}
          subtitle={audienceSection.subtitle}
          items={audienceSection.items || []}
        />
      )}

      {/* Curriculum Section */}
      {curriculumSection.enabled && (
        <TrainingCurriculumSection
          title={curriculumSection.title}
          subtitle={curriculumSection.subtitle}
          modules={curriculumSection.modules || []}
        />
      )}

      {/* Pricing Section */}
      {pricingSection.packages && pricingSection.packages.length > 0 && (
        <TrainingPricingSection
          title={pricingSection.title}
          subtitle={pricingSection.subtitle}
          packages={pricingSection.packages}
        />
      )}

      {/* Trainer Section */}
      {trainerSection.enabled && (
        <TrainingTrainerSection
          name={trainerSection.name}
          title={trainerSection.title}
          image={trainerSection.image}
          bio={trainerSection.bio}
          stats={trainerSection.stats || []}
        />
      )}

      {/* FAQ Section */}
      {faqSection.enabled && faqItems.length > 0 && (
        <FAQSection
          title={faqSection.title || 'Veelgestelde vragen'}
          faqItems={faqItems.map(item => ({
            question: item.question,
            answer: item.answer
          }))}
          background="white"
        />
      )}

      {/* CTA Section */}
      {ctaSection.enabled && (
        <CTASection
          title={ctaSection.title}
          description={ctaSection.description}
          cta={{
            text: ctaSection.primaryText || 'Plan adviesgesprek',
            url: ctaSection.primaryLink || '/contact'
          }}
          variant="primary"
        />
      )}

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Course Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      {/* FAQ Schema */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </main>
  );
}
