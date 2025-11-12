'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function CasesSection({ cases, title = "Projecten waar we trots op zijn", subtitle = "Cases" }) {
  const [hoveredCase, setHoveredCase] = useState(null);

  if (!cases || cases.length === 0) {
    return null;
  }

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-sm font-medium tracking-wider text-[#376eb5] uppercase mb-3">
            {subtitle}
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900">
            {title}
          </h2>
        </div>

        {/* Cases Grid */}
        <div className="space-y-16 lg:space-y-24">
          {cases.map((caseItem, index) => {
            const isEven = index % 2 === 1;
            const isHovered = hoveredCase === index;

            return (
              <div
                key={caseItem.id}
                className="group"
                onMouseEnter={() => setHoveredCase(index)}
                onMouseLeave={() => setHoveredCase(null)}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Image Side */}
                  <div className={`relative ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500">
                      {caseItem.featuredImage?.sourceUrl ? (
                        <>
                          <Image
                            src={caseItem.featuredImage.sourceUrl}
                            alt={caseItem.featuredImage.altText || caseItem.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Subtle overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-sm">Geen afbeelding</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    {/* Client Logo */}
                    {caseItem.clientLogo?.sourceUrl && (
                      <div className="mb-6">
                        <div className="relative w-32 h-12">
                          <Image
                            src={caseItem.clientLogo.sourceUrl}
                            alt={caseItem.clientName || caseItem.title}
                            fill
                            sizes="128px"
                            className={`object-contain transition-all duration-500 ${
                              isHovered ? 'grayscale-0 opacity-100' : 'grayscale opacity-60'
                            }`}
                          />
                        </div>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="font-serif text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                      {caseItem.title}
                    </h3>

                    {/* Excerpt */}
                    {caseItem.excerpt && (
                      <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        {caseItem.excerpt}
                      </p>
                    )}

                    {/* Metrics - Clean text-based */}
                    {caseItem.metrics && (
                      <div className="mb-8">
                        <p className="text-gray-500 text-base leading-relaxed">
                          {caseItem.metrics}
                        </p>
                      </div>
                    )}

                    {/* CTA Link */}
                    <Link
                      href={caseItem.ctaUrl || `/cases/${caseItem.slug}`}
                      className="inline-flex items-center gap-2 text-[#376eb5] font-medium text-lg group/link transition-all duration-300"
                    >
                      <span className="relative">
                        {caseItem.ctaText || `Bekijk de ${caseItem.clientName || ''} case`}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#376eb5] transition-all duration-300 group-hover/link:w-full" />
                      </span>
                      <ArrowRight 
                        className="w-5 h-5 transition-transform duration-300 group-hover/link:translate-x-1" 
                      />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Optional: View All Cases CTA */}
        <div className="text-center mt-16 lg:mt-20">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#376eb5] text-white font-medium rounded-lg hover:bg-[#2d5a94] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Bekijk alle projecten
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}