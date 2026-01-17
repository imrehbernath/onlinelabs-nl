'use client';

import Link from 'next/link';
import Image from 'next/image';

/**
 * Footer Component
 */
export default function Footer({ footerData }) {
  const currentYear = new Date().getFullYear();

  const footer = footerData || {
    companyName: 'OnlineLabs',
    tagline: 'Dé expert in online groei en webdesign',
    description: 'OnlineLabs helpt bedrijven groeien met slimme online marketing strategieën sinds 2008.',
    
    services: [
      { title: 'SEO specialist', url: '/skills/seo-specialist' },
      { title: 'GEO optimalisatie', url: '/skills/geo-optimalisatie' },
      { title: 'Online adverteren', url: '/skills/online-adverteren' },
      { title: 'Website laten maken', url: '/skills/website-laten-maken' },
      { title: 'Website snelheid optimalisatie', url: '/skills/website-snelheid-optimalisatie' },
      { title: 'Conversie optimalisatie', url: '/skills/conversie-optimalisatie-specialist' },
    ],
    
    company: [
      { title: 'Over ons', url: '/over-ons' },
      { title: 'Ons werk', url: '/ons-werk' },
      { title: 'Skills', url: '/skills' },
      { title: 'Contact', url: '/contact' },
    ],
    
    contact: {
      address: 'Amsterdam, Nederland',
      email: 'hallo@onlinelabs.nl',
      phone: '020 820 20 22',
    },
    
    social: [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/company/onlinelabs', icon: 'linkedin' },
      { name: 'X (Twitter)', url: 'https://x.com/onlinelabs_nl', icon: 'x' },
      { name: 'Facebook', url: 'https://www.facebook.com/onlinelabs.nl', icon: 'facebook' },
      { name: 'YouTube', url: 'https://www.youtube.com/@OnlineLabs-nl', icon: 'youtube' },
    ],
  };

  const SocialIcon = ({ icon }) => {
    const icons = {
      linkedin: (
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      ),
      x: (
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      ),
      facebook: (
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      ),
      youtube: (
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      ),
    };

    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        {icons[icon]}
      </svg>
    );
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Company Info */}
          <div className="space-y-6">
            <div>
              <div className="font-serif text-2xl font-bold text-white mb-2">
                {footer.companyName}
              </div>
              <p className="text-base text-sky-400 font-medium mb-4 leading-relaxed">
                {footer.tagline}
              </p>
              <p className="text-base leading-relaxed">
                {footer.description}
              </p>
            </div>
            <div className="pt-4">
              <a
                href="https://www.google.com/partners/agency?id=8066409399"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:opacity-80 transition-opacity duration-200"
                aria-label="Google Partner Badge"
              >
                <Image
                  src="https://www.gstatic.com/partners/badge/images/2021/PartnerBadgeClickable.svg"
                  alt="Google Partner"
                  width={120}
                  height={48}
                  className="h-auto"
                />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <div className="font-serif text-lg font-bold text-white mb-6">
              Skills
            </div>
            <ul className="space-y-3">
              {footer.services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.url}
                    className="text-sm hover:text-primary transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-primary mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-200"></span>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <div className="font-serif text-lg font-bold text-white mb-6">
              Bedrijf
            </div>
            <ul className="space-y-3">
              <li>
                <Link href="/over-ons" className="text-sm hover:text-primary transition-colors duration-200 flex items-center group">
                  <span className="w-0 h-0.5 bg-primary mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-200"></span>
                  Over ons
                </Link>
              </li>
              <li>
                <Link href="/ons-werk" className="text-sm hover:text-primary transition-colors duration-200 flex items-center group">
                  <span className="w-0 h-0.5 bg-primary mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-200"></span>
                  Ons werk
                </Link>
              </li>
              <li>
                <Link href="/skills" className="text-sm hover:text-primary transition-colors duration-200 flex items-center group">
                  <span className="w-0 h-0.5 bg-primary mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-200"></span>
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/trainingen" className="text-sm hover:text-primary transition-colors duration-200 flex items-center group">
                  <span className="w-0 h-0.5 bg-primary mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-200"></span>
                  Trainingen
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-primary transition-colors duration-200 flex items-center group">
                  <span className="w-0 h-0.5 bg-primary mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-200"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact + Social */}
          <div>
            <div className="font-serif text-lg font-bold text-white mb-6">
              Contact
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">{footer.contact.address}</span>
              </li>
              <li>
                <a
                  href={`mailto:${footer.contact.email}`}
                  className="flex items-center text-sm hover:text-primary transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {footer.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${footer.contact.phone.replace(/\s/g, '')}`}
                  className="flex items-center text-sm hover:text-primary transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {footer.contact.phone}
                </a>
              </li>
            </ul>
            <div>
              <div className="font-medium text-white text-sm mb-4">
                Volg Ons
              </div>
              <div className="flex gap-4">
                {footer.social.map((platform, index) => (
                  <a
                    key={index}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-200"
                    aria-label={platform.name}
                  >
                    <SocialIcon icon={platform.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-400">
              © {currentYear} {footer.companyName}. Alle rechten voorbehouden.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
              <Link href="/privacyverklaring" className="text-gray-400 hover:text-primary transition-colors duration-200">
                Privacyverklaring
              </Link>
              <Link href="/algemene-voorwaarden" className="text-gray-400 hover:text-primary transition-colors duration-200">
                Algemene Voorwaarden
              </Link>
              <button 
                onClick={() => window.Cookiebot?.renew()}
                className="font-sans text-sm text-gray-400 hover:text-primary transition-colors duration-200 bg-transparent border-none cursor-pointer p-0"
              >
                Cookie-instellingen
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
