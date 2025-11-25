'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

function RelatedCases({ cases, currentSlug }) {
  // Filter out current case
  const filteredCases = cases?.filter(c => c.slug !== currentSlug) || [];
  
  // Take max 2 cases
  const displayCases = filteredCases.slice(0, 2);

  if (displayCases.length === 0) {
    return null;
  }

  // Service labels mapping
  const serviceLabels = {
    seo: 'SEO',
    geo: 'GEO',
    wordpress: 'WordPress',
    webdesign: 'Webdesign',
    performance: 'Performance',
    ads: 'Ads'
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-wider text-[#376eb5] uppercase mb-3">
            Meer inspiratie
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">
            Andere cases
          </h2>
        </div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {displayCases.map((caseItem) => (
            <Link
              key={caseItem.id || caseItem.slug}
              href={`/ons-werk/${caseItem.slug}`}
              className="group"
            >
              <article className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  {caseItem.featuredImage?.sourceUrl ? (
                    <>
                      <Image
                        src={caseItem.featuredImage.sourceUrl}
                        alt={caseItem.featuredImage.altText || caseItem.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Geen afbeelding</span>
                    </div>
                  )}

                  {/* Services Tags Overlay */}
                  {caseItem.servicesUsed && caseItem.servicesUsed.length > 0 && (
                    <div className="absolute top-4 right-4 flex flex-wrap gap-2 justify-end max-w-[60%]">
                      {caseItem.servicesUsed.slice(0, 3).map((service) => (
                        <span
                          key={service}
                          className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-full uppercase tracking-wide"
                        >
                          {serviceLabels[service] || service}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  {/* Client Name */}
                  {caseItem.clientName && (
                    <p className="text-sm font-medium text-[#376eb5] uppercase tracking-wide mb-2">
                      {caseItem.clientName}
                    </p>
                  )}

                  {/* Title */}
                  <h3 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900 mb-3 group-hover:text-[#376eb5] transition-colors duration-300">
                    {caseItem.title}
                  </h3>

                  {/* Excerpt */}
                  {caseItem.excerpt && (
                    <p className="text-gray-600 text-base leading-relaxed mb-4 line-clamp-2">
                      {caseItem.excerpt}
                    </p>
                  )}

                  {/* Read More */}
                  <span className="inline-flex items-center gap-2 text-[#376eb5] font-medium text-base group/link">
                    <span className="relative">
                      Bekijk case
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#376eb5] transition-all duration-300 group-hover:w-full" />
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            href="/ons-werk"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#376eb5] text-white font-medium rounded-lg hover:bg-[#2d5a94] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Bekijk alle cases
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  );
}

export default RelatedCases;