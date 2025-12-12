'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function AiResultsGallery({ 
  results = [], 
  title = "Onze klanten in ChatGPT",
  subtitle = "Resultaten",
  intro = "Dit is waar we voor werken: jouw merk als aanbevolen antwoord in AI."
}) {
  const [hoveredResult, setHoveredResult] = useState(null);

  if (!results || results.length === 0) {
    return null;
  }

  return (
    <section className="py-16 lg:py-24 bg-[#FAFAF8]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 lg:mb-12 max-w-3xl">
          <p className="text-sm font-medium tracking-wider text-[#376eb5] uppercase mb-3">
            {subtitle}
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight mb-4">
            {title}
          </h2>
          {intro && (
            <p className="text-lg text-gray-600">
              {intro}
            </p>
          )}
        </div>

        {/* Results Grid - 3 columns, 1:1 aspect ratio */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {results.map((result, index) => {
            const isHovered = hoveredResult === index;

            return (
              <a
                key={index}
                href={result.chatgptUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                onMouseEnter={() => setHoveredResult(index)}
                onMouseLeave={() => setHoveredResult(null)}
              >
                <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
                  {/* Image Container - 1:1 aspect ratio for square screenshots */}
                  <div className="relative aspect-square overflow-hidden">
                    {result.image?.sourceUrl ? (
                      <Image
                        src={result.image.sourceUrl}
                        alt={result.image.altText || result.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Geen afbeelding</span>
                      </div>
                    )}

                    {/* Hover Overlay with ChatGPT icon */}
                    <div className={`absolute inset-0 bg-[#1e3a5f]/90 flex items-center justify-center transition-opacity duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="text-center text-white px-6">
                        {/* ChatGPT-style icon */}
                        <svg className="w-10 h-10 mx-auto mb-3" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
                        </svg>
                        <span className="text-sm font-medium uppercase tracking-wider">
                          Bekijk in ChatGPT
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-serif text-lg lg:text-xl font-bold text-gray-900 group-hover:text-[#376eb5] transition-colors duration-300">
                      {result.title}
                    </h3>
                    {result.prompt && (
                      <p className="text-gray-500 text-sm mt-2 italic">
                        "{result.prompt}"
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