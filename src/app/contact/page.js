import { Suspense } from 'react';
import ContactHero from '../components/ContactHero';
import ContactForm from '../components/ContactForm';
import ContactInfo from '../components/ContactInfo';
import ContactMap from '../components/ContactMap';
import TestimonialsSection from '../components/TestimonialsSection';
import { getTestimonials } from '../lib/wordpress';

export const revalidate = 86400; // 24 hours ISR

export const metadata = {
  title: 'Contact | OnlineLabs - Online Marketing Bureau Amsterdam',
  description: 'Neem contact op met OnlineLabs voor SEO, GEO, webdesign en online marketing. Gevestigd in hartje Amsterdam aan de Herengracht. Bel 020-820 20 22 of mail hallo@onlinelabs.nl.',
  openGraph: {
    title: 'Contact | OnlineLabs - Online Marketing Bureau Amsterdam',
    description: 'Neem contact op met OnlineLabs voor SEO, GEO, webdesign en online marketing. Gevestigd in hartje Amsterdam aan de Herengracht.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.onlinelabs.nl/contact',
  },
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
  );
}