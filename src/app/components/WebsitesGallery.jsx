'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function WebsitesGallery({ 
  websites = [], 
  title = "Onze creaties: Websites die werken én inspireren",
  subtitle = "Portfolio"
}) {
  const [hoveredWebsite, setHoveredWebsite] = useState(null);

  if (!websites || websites.length === 0) {
    return null;
  }

  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: '#F9FAFB' }}>
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

        {/* Websites Grid - Clean 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {websites.map((website) => {
            const isHovered = hoveredWebsite === website.id;

            return (
              <a
                key={website.id}
                href={website.websiteUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                onMouseEnter={() => setHoveredWebsite(website.id)}
                onMouseLeave={() => setHoveredWebsite(null)}
              >
                <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
                  {/* Image Container - 3:2 aspect ratio */}
                  <div className="relative aspect-[3/2] overflow-hidden">
                    {website.featuredImage?.sourceUrl ? (
                      <Image
                        src={website.featuredImage.sourceUrl}
                        alt={website.featuredImage.altText || website.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Geen afbeelding</span>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 bg-[#376eb5]/90 flex items-center justify-center transition-opacity duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="text-center text-white px-6">
                        <svg className="w-8 h-8 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span className="text-sm font-medium uppercase tracking-wider">
                          Bekijk website
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-serif text-lg lg:text-xl font-bold text-gray-900 group-hover:text-[#376eb5] transition-colors duration-300">
                      {website.title}
                    </h3>
                    {website.clientName && website.clientName !== website.title && (
                      <p className="text-gray-500 text-sm mt-1">
                        {website.clientName}
                      </p>
                    )}
                  </div>
                </article>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}