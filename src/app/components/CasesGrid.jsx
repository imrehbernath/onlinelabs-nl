'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Service label mapping - matches ACF checkbox choices
const serviceLabels = {
  'seo': 'SEO & Vindbaarheid',
  'geo': 'GEO Optimalisatie',
  'wordpress': 'WordPress Development',
  'webdesign': 'Webdesign & UX',
  'performance': 'Website Snelheid',
  'ads': 'Online Adverteren'
};

export default function CasesGrid({ 
  cases = [], 
  title = "Impactvolle oplossingen: Webdesign, SEO en optimalisatie",
  subtitle = "Cases",
  id
}) {
  const [activeFilter, setActiveFilter] = useState('Alle');

  // Extract unique services for filters
  const allServices = useMemo(() => {
    const services = new Set();
    cases.forEach(caseItem => {
      if (caseItem.services && Array.isArray(caseItem.services)) {
        caseItem.services.forEach(service => services.add(service));
      }
    });
    return ['Alle', ...Array.from(services)];
  }, [cases]);

  // Filter cases based on active filter
  const filteredCases = useMemo(() => {
    if (activeFilter === 'Alle') return cases;
    return cases.filter(caseItem => 
      caseItem.services && caseItem.services.includes(activeFilter)
    );
  }, [cases, activeFilter]);

  if (!cases || cases.length === 0) {
    return null;
  }

  return (
    <section id={id} className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 lg:mb-12">
          <p className="text-sm font-medium tracking-wider text-[#376eb5] uppercase mb-3">
            {subtitle}
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
            {title}
          </h2>
        </div>

        {/* Filter Tabs */}
        {allServices.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {allServices.map((service) => (
              <button
                key={service}
                onClick={() => setActiveFilter(service)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === service
                    ? 'bg-[#376eb5] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {service === 'Alle' ? 'Alle' : (serviceLabels[service] || service)}
              </button>
            ))}
          </div>
        )}

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredCases.map((caseItem) => (
            <Link
              key={caseItem.id}
              href={`/ons-werk/${caseItem.slug}`}
              className="group block"
            >
              <article className="h-full">
                {/* Image */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-5 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  {caseItem.featuredImage?.sourceUrl ? (
                    <Image
                      src={caseItem.featuredImage.sourceUrl}
                      alt={caseItem.featuredImage.altText || caseItem.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Geen afbeelding</span>
                    </div>
                  )}
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  {/* Title & Client */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-[#376eb5] transition-colors duration-300 leading-tight">
                        {caseItem.title}
                      </h3>
                      {caseItem.clientName && (
                        <p className="text-gray-500 text-sm mt-1">
                          {caseItem.clientName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Service Tags */}
                  {caseItem.services && caseItem.services.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {caseItem.services.map((service, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                        >
                          {serviceLabels[service] || service}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Result Highlight (metrics) */}
                  {caseItem.resultHighlight && (
                    <p className="text-[#376eb5] font-medium text-sm">
                      {caseItem.resultHighlight}
                    </p>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {filteredCases.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Geen cases gevonden voor "{serviceLabels[activeFilter] || activeFilter}".
            </p>
            <button
              onClick={() => setActiveFilter('Alle')}
              className="mt-4 text-[#376eb5] font-medium hover:underline"
            >
              Toon alle cases
            </button>
          </div>
        )}
      </div>
    </section>
  );
}