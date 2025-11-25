'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

function CaseHero({ caseData }) {
  const {
    title,
    featuredImage,
    clientName,
    clientLogo,
    excerpt,
    metrics,
    servicesUsed = [],
    projectDate
  } = caseData;

  // Service labels mapping
  const serviceLabels = {
    seo: 'SEO & Vindbaarheid',
    geo: 'GEO Optimalisatie',
    wordpress: 'WordPress Development',
    webdesign: 'Webdesign & UX',
    performance: 'Website Snelheid',
    ads: 'Online Adverteren'
  };

  // Format year
  const projectYear = projectDate ? new Date(projectDate).getFullYear() : null;

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 lg:pt-28 lg:pb-20">
        
        {/* Back Link */}
        <Link 
          href="/ons-werk"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#376eb5] text-base font-medium mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug naar alle cases
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-6">
            
            {/* Client Logo */}
            {clientLogo?.sourceUrl && (
              <div className="relative w-32 h-10 lg:w-40 lg:h-12">
                <Image
                  src={clientLogo.sourceUrl}
                  alt={clientName || 'Client logo'}
                  fill
                  sizes="160px"
                  className="object-contain object-left"
                />
              </div>
            )}

            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[#376eb5] font-semibold text-sm tracking-widest uppercase"
              style={{ backgroundColor: 'rgba(55, 110, 181, 0.1)' }}
            >
              Case Study {projectYear && `• ${projectYear}`}
            </div>

            {/* Title */}
            <h1 className="font-serif font-bold leading-[1.1] text-gray-900 text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.75rem] tracking-tight">
              {title}
            </h1>

            {/* Excerpt */}
            {excerpt && (
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                {excerpt}
              </p>
            )}

            {/* Services Tags */}
            {servicesUsed && servicesUsed.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {servicesUsed.map((service) => (
                  <span
                    key={service}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
                  >
                    {serviceLabels[service] || service}
                  </span>
                ))}
              </div>
            )}

            {/* Metrics */}
            {metrics && (
              <div className="pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {metrics.split('|').map((metric, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#1abc9c]" />
                      <span className="text-base text-gray-600 font-medium">
                        {metric.trim()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Featured Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
              {featuredImage?.sourceUrl ? (
                <>
                  <Image
                    src={featuredImage.sourceUrl}
                    alt={featuredImage.altText || title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Geen afbeelding</span>
                </div>
              )}
            </div>

            {/* Client Badge - Bottom left of image */}
            {clientName && (
              <div className="absolute -bottom-4 left-6 bg-white rounded-lg shadow-lg px-4 py-2.5 border border-gray-100">
                <p className="text-xs uppercase tracking-wider text-gray-400 mb-0.5">Klant</p>
                <p className="text-base font-bold text-gray-900">{clientName}</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

export default CaseHero;