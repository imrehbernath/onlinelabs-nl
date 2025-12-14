import { Suspense } from 'react';
import ContactHero from '../components/ContactHero';
import ContactForm from '../components/ContactForm';
import ContactInfo from '../components/ContactInfo';
import ContactMap from '../components/ContactMap';
import TestimonialsSection from '../components/TestimonialsSection';
import { getTestimonials } from '../lib/wordpress';

const SITE_URL = 'https://www.onlinelabs.nl';

export const revalidate = 86400; // 24 hours ISR

export const metadata = {
  title: 'Contact – Bel, mail of bezoek ons in Amsterdam',
  description: 'Neem contact op met OnlineLabs. Herengracht 221, Amsterdam. Bel 020-820 20 22 of mail hallo@onlinelabs.nl. Reactie binnen 24 uur.',
  openGraph: {
    title: 'Contact – Bel, mail of bezoek ons in Amsterdam | OnlineLabs',
    description: 'Neem contact op met OnlineLabs. Herengracht 221, Amsterdam. Bel 020-820 20 22 of mail hallo@onlinelabs.nl.',
    url: '/contact',
    type: 'website',
    locale: 'nl_NL',
    siteName: 'OnlineLabs',
    images: [{
      url: '/og-image-contact.jpg',
      width: 1200,
      height: 630,
      alt: 'OnlineLabs kantoor aan de Herengracht in Amsterdam',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact – Bel, mail of bezoek ons in Amsterdam | OnlineLabs',
    description: 'Neem contact op met OnlineLabs. Herengracht 221, Amsterdam. Bel 020-820 20 22 of mail hallo@onlinelabs.nl.',
    images: ['/og-image-contact.jpg'],
  },
  alternates: {
    canonical: '/contact',
  },
};

// ContactPage + BreadcrumbList Schema
const contactPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${SITE_URL}/contact/#contactpage`,
      "url": `${SITE_URL}/contact`,
      "name": "Contact – OnlineLabs",
      "description": "Neem contact op met OnlineLabs voor SEO, GEO, webdesign en online marketing in Amsterdam.",
      "isPartOf": {
        "@id": `${SITE_URL}/#website`
      },
      "about": {
        "@id": `${SITE_URL}/#organization`
      },
      "mainEntity": {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": "OnlineLabs",
        "telephone": "+31-20-820-20-22",
        "email": "hallo@onlinelabs.nl",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Herengracht 221",
          "addressLocality": "Amsterdam",
          "addressRegion": "Noord-Holland",
          "postalCode": "1016 BG",
          "addressCountry": "NL"
        }
      },
      "inLanguage": "nl-NL"
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/contact/#breadcrumb`,
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
          "name": "Contact",
          "item": `${SITE_URL}/contact`
        }
      ]
    }
  ]
};

// Loading fallback for the form
function ContactFormLoading() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="h-12 bg-gray-200 rounded-lg"></div>
            <div className="h-12 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function ContactPage() {
  // Fetch testimonials for social proof
  const testimonials = await getTestimonials();

  return (
    <>
      {/* ContactPage + Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />

      <main>
        {/* Hero Section */}
        <ContactHero />

        {/* Contact Form with Sidebar - Wrapped in Suspense for useSearchParams */}
        <Suspense fallback={<ContactFormLoading />}>
          <ContactForm />
        </Suspense>

        {/* Contact Information Cards */}
        <ContactInfo />

        {/* Map & Office Photo */}
        <ContactMap />

        {/* Testimonials - Social proof before contact */}
        <TestimonialsSection testimonials={testimonials} />
      </main>
    </>
  );
}