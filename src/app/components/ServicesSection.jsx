'use client';

import Link from 'next/link';

export default function ServicesSection({ services = [] }) {
  if (!services || services.length === 0) {
    return null;
  }

  const serviceInfo = {
    'seo-specialist': {
      labName: 'SEOLab',
      tagline: 'Jouw partner in SEO-optimalisatie sinds 2008'
    },
    'geo-optimalisatie': {
      labName: 'AILab',
      tagline: 'Jouw specialisten in AI-zichtbaarheid & AEO'
    },
    'website-laten-maken': {
      labName: 'DesignLab',
      tagline: 'Websites die inspireren, converteren en presteren sinds 2001'
    },
    'website-snelheid-optimalisatie': {
      labName: 'WebLab',
      tagline: 'Techniek en performance, al meer dan 10 jaar ons vak'
    },
    'online-adverteren': {
      labName: 'AdLab',
      tagline: 'Slimme advertenties voor meer leads en omzet'
    },
  };

  return (
    <section className="py-20 lg:py-24 bg-[#FAFAF8]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT COLUMN - STICKY */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              {/* Heading - BLIJFT GROOT (feature section) */}
              <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                De bouwstenen voor jouw online succes
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                Met onze expertise in SEO, webdesign, online adverteren en conversie-optimalisatie helpen wij bedrijven in heel Nederland groeien. Elk LAB is ontworpen om jouw online zichtbaarheid te vergroten en omzet te verhogen – of je nu een webshop runt, diensten aanbiedt of leads zoekt.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN - SERVICES LIST */}
          <div className="lg:col-span-7">
            <div className="space-y-8">
              {services.map((service) => {
                const info = serviceInfo[service.slug];
                if (!info) return null;
                
                return (
                  <Link
                    key={service.slug}
                    href={service.uri}
                    className="group block"
                  >
                    <div className="relative">
                      {/* Accent bar */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-700 group-hover:bg-[#376eb5] rounded-full transition-all duration-300 group-hover:w-2" />
                      
                      <div className="pl-8 transition-all duration-300 group-hover:pl-10">
                        {/* Title - BLIJFT (is goed zo) */}
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="font-serif text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 group-hover:text-[#376eb5] transition-colors duration-300 leading-tight">
                            {service.title}
                          </h3>
                          
                          {/* Arrow */}
                          <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-gray-300 group-hover:border-[#376eb5] flex items-center justify-center transition-all duration-300 group-hover:rotate-90">
                            <svg 
                              className="w-4 h-4 text-gray-400 group-hover:text-[#376eb5] transition-colors duration-300" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>

                        {/* Subtitle - UPPERCASE + TRACKING */}
                        {service.serviceDetails?.subtitle && (
                          <p className="text-sm font-medium text-gray-500 mb-3 tracking-wider uppercase">
                            {service.serviceDetails.subtitle}
                          </p>
                        )}

                        {/* Description */}
                        <p className="text-lg text-gray-600 leading-relaxed mb-4">
                          {service.serviceDetails?.description}
                        </p>

                        {/* LAB tagline */}
                        <div className="flex items-start gap-2 text-sm text-gray-500">
                          <span className="text-[#376eb5] font-bold">→</span>
                          <p>
                            <span className="font-semibold text-gray-900">{info.labName}</span> – {info.tagline}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Footer link */}
            <div className="mt-12 pl-8">
              <Link
                href="/skills"
                className="group inline-flex items-center gap-2 text-[#376eb5] hover:text-[#2d5a94] font-medium text-base transition-colors duration-300"
              >
                Bekijk alle diensten
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}