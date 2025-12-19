'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function WebsitesGallery({ 
  websites = [], 
  title = "Uitgelichte websites",
  subtitle = "Portfolio",
  mobileInitialCount = 3,
  desktopInitialCount = 9
}) {
  const [hoveredWebsite, setHoveredWebsite] = useState(null);
  const [showAll, setShowAll] = useState(false);

  if (!websites || websites.length === 0) {
    return null;
  }

  const mobileWebsites = showAll ? websites : websites.slice(0, mobileInitialCount);
  const desktopWebsites = showAll ? websites : websites.slice(0, desktopInitialCount);
  
  const hasMoreMobile = websites.length > mobileInitialCount;
  const hasMoreDesktop = websites.length > desktopInitialCount;

  return (
    <section className="py-16 lg:py-24 bg-white">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 lg:mb-12">
          <p className="text-sm font-medium tracking-wider text-[#376eb5] uppercase mb-3">
            {subtitle}
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
            {title}
          </h2>
        </div>
      </div>

      {/* Mobile: Horizontal Scroll */}
      <div className="lg:hidden overflow-hidden">
        <div 
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pl-4 sm:pl-6 scrollbar-hide"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollPaddingLeft: '16px'
          }}
        >
          {mobileWebsites.map((website, index) => (
            <a
              key={website.id}
              href={website.websiteUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={`snap-start flex-shrink-0 w-[75%] group block ${
                index === mobileWebsites.length - 1 ? 'mr-4 sm:mr-6' : ''
              }`}
            >
              <article className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="relative aspect-[3/2] overflow-hidden">
                  {website.featuredImage?.sourceUrl ? (
                    <Image
                      src={website.featuredImage.sourceUrl}
                      alt={website.featuredImage.altText || website.title}
                      fill
                      sizes="75vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Geen afbeelding</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-base font-bold text-gray-900">
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
          ))}
        </div>

        {/* Mobile: Tekst link */}
        {hasMoreMobile && !showAll && (
          <div className="mt-4 px-4">
            <button
              onClick={() => setShowAll(true)}
              className="text-[#376eb5] hover:text-[#2d5a94] font-medium transition-colors duration-200 inline-flex items-center gap-1"
            >
              Meer projecten
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {/* Mobile: Revealed Grid */}
        {showAll && (
          <div className="mt-6 px-4 grid grid-cols-2 gap-4 animate-fadeIn">
            {websites.slice(mobileInitialCount).map((website) => (
              <a
                key={website.id}
                href={website.websiteUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <article className="bg-white rounded-xl overflow-hidden shadow-lg">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    {website.featuredImage?.sourceUrl ? (
                      <Image
                        src={website.featuredImage.sourceUrl}
                        alt={website.featuredImage.altText || website.title}
                        fill
                        sizes="50vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Geen afbeelding</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-serif text-sm font-bold text-gray-900 line-clamp-1">
                      {website.title}
                    </h3>
                  </div>
                </article>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Desktop: Grid Layout */}
      <div className="hidden lg:block container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-6 lg:gap-8">
          {desktopWebsites.map((website) => {
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
                  <div className="relative aspect-[3/2] overflow-hidden">
                    {website.featuredImage?.sourceUrl ? (
                      <Image
                        src={website.featuredImage.sourceUrl}
                        alt={website.featuredImage.altText || website.title}
                        fill
                        sizes="33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Geen afbeelding</span>
                      </div>
                    )}

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

        {/* Desktop: Tekst link */}
        {hasMoreDesktop && !showAll && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="text-[#376eb5] hover:text-[#2d5a94] font-medium transition-colors duration-200 inline-flex items-center gap-2"
            >
              Meer projecten
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {/* Desktop: Revealed Extra Items */}
        {showAll && websites.length > desktopInitialCount && (
          <div className="mt-8 grid grid-cols-3 gap-6 lg:gap-8 animate-fadeIn">
            {websites.slice(desktopInitialCount).map((website) => {
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
                    <div className="relative aspect-[3/2] overflow-hidden">
                      {website.featuredImage?.sourceUrl ? (
                        <Image
                          src={website.featuredImage.sourceUrl}
                          alt={website.featuredImage.altText || website.title}
                          fill
                          sizes="33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-sm">Geen afbeelding</span>
                        </div>
                      )}

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
        )}
      </div>

      {/* Global styles */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  );
}