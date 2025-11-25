'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Calendar, Building2, Wrench, Globe } from 'lucide-react';

function CaseContent({ caseData }) {
  const {
    fullCaseStudy,
    clientName,
    clientLogo,
    servicesUsed = [],
    projectDate,
    websiteUrl,
    results = []
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

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.getFullYear().toString();
  };

  return (
    <section 
      className="py-16 lg:py-24"
      style={{ backgroundColor: '#FAFAF8' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8">
            {/* WYSIWYG Content with Prose Styling */}
            {fullCaseStudy && (
              <div 
                className="prose prose-lg prose-gray max-w-none
                  prose-headings:font-serif prose-headings:text-gray-900 prose-headings:font-bold
                  prose-h2:text-3xl prose-h2:lg:text-4xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg
                  prose-a:text-[#376eb5] prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-ul:my-6 prose-li:text-gray-700 prose-li:text-lg
                  prose-blockquote:border-l-4 prose-blockquote:border-[#376eb5] prose-blockquote:bg-white 
                  prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                  prose-blockquote:not-italic prose-blockquote:text-gray-800
                  prose-img:rounded-xl prose-img:shadow-lg
                  prose-figure:my-8
                  [&_figcaption]:text-base [&_figcaption]:text-gray-500 [&_figcaption]:mt-3 [&_figcaption]:text-center
                "
                dangerouslySetInnerHTML={{ __html: fullCaseStudy }}
              />
            )}

            {/* Results Stats Grid (if available) */}
            {results && results.length > 0 && (
              <div className="mt-16 pt-12 border-t border-gray-200">
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                  De resultaten
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((result, index) => (
                    <div 
                      key={index}
                      className="bg-white rounded-xl p-6 text-center shadow-sm"
                    >
                      <div className="font-serif text-4xl lg:text-5xl font-bold text-[#376eb5] mb-2">
                        {result.value}
                      </div>
                      <div className="text-base text-gray-600">
                        {result.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-6">
              
              {/* Client Info Card */}
              <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm">
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-6">
                  Over dit project
                </h3>
                
                <div className="space-y-5">
                  {/* Client */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-[#376eb5]">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Klant</p>
                      <p className="text-lg font-semibold text-gray-900">{clientName}</p>
                    </div>
                  </div>

                  {/* Services */}
                  {servicesUsed && servicesUsed.length > 0 && (
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-[#376eb5]">
                        <Wrench className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Skills</p>
                        <p className="text-base text-gray-900">
                          {servicesUsed.map(s => serviceLabels[s] || s).join(', ')}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Project Date */}
                  {projectDate && (
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-[#376eb5]">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Klant sinds</p>
                        <p className="text-lg font-semibold text-gray-900">{formatDate(projectDate)}</p>
                      </div>
                    </div>
                  )}

                  {/* Website Link */}
                  {websiteUrl && (
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-[#376eb5]">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Website</p>
                        <a 
                          href={websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#376eb5] hover:text-[#2d5a94] font-medium underline underline-offset-2 decoration-1 transition-colors"
                        >
                          Bekijken
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-[#376eb5] rounded-xl p-6 lg:p-8 text-white">
                <h3 className="font-serif text-xl font-bold mb-3">
                  Vergelijkbaar project?
                </h3>
                <p className="text-white/90 text-base leading-relaxed mb-6">
                  Wil je ook zo'n resultaat behalen? Laten we samen kijken naar de mogelijkheden voor jouw organisatie.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-white text-[#376eb5] font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  Neem contact op
                </Link>
              </div>

              {/* Client Logo (subtle) */}
              {clientLogo?.sourceUrl && (
                <div className="pt-6 border-t border-gray-200">
                  <div className="relative w-32 h-12 mx-auto opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-300">
                    <Image
                      src={clientLogo.sourceUrl}
                      alt={clientName || 'Client logo'}
                      fill
                      sizes="128px"
                      className="object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default CaseContent;