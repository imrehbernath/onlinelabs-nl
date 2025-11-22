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

export default async function ContactPage() {
  // Fetch testimonials for social proof
  const testimonials = await getTestimonials();

  return (
    <main>
      {/* Hero Section */}
      <ContactHero />

      {/* Contact Form with Sidebar */}
      <ContactForm />

      {/* Contact Information Cards */}
      <ContactInfo />

      {/* Map & Office Photo */}
      <ContactMap />

      {/* Testimonials - Social proof before contact */}
      <TestimonialsSection testimonials={testimonials} />
    </main>
  );
}