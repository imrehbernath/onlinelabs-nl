'use client';

import Link from 'next/link';
import { Check, Star, Zap, Crown } from 'lucide-react';

/**
 * PricingSection Component
 * 
 * Displays pricing packages in a responsive grid
 * Clean, simple design without expand/collapse
 * 
 * Props:
 * - title: Section title
 * - subtitle: Badge text above title
 * - description: Optional description below title
 * - packages: Array of package objects
 * - background: 'white' | 'gray' | 'beige'
 * - includedFeatures: String of always-included features (optional)
 */
export default function PricingSection({
  title = "Kies het pakket dat bij je past",
  subtitle = "Prijzen",
  description = "",
  packages = [],
  background = 'white',
  includedFeatures = "Responsive design • SSL-certificaat • Cookiemelding • Google Analytics & Search Console • SEO & AI-optimalisatie • SEO-basis (robots.txt, sitemap, meta's) • WebP afbeeldingen • Persoonlijke begeleiding • 100% eigendom"
}) {
  // Background color mapping
  const bgClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    beige: 'bg-[#FAF9F6]',
  };

  // Icon mapping for packages
  const iconMap = {
    'star': Star,
    'zap': Zap,
    'crown': Crown,
  };

  // Helper: Parse features - handles both string (from ACF textarea) and array
  const parseFeatures = (features) => {
    if (!features) return [];
    if (Array.isArray(features)) return features;
    if (typeof features === 'string') {
      // Split by newlines and filter empty lines
      return features.split('\n').map(f => f.trim()).filter(f => f.length > 0);
    }
    return [];
  };

  // Default packages if none provided
  const defaultPackages = [
    {
      name: 'Start Website',
      price: '€2.999',
      priceNote: 'eenmalig',
      description: 'Een perfecte oplossing voor een snelle en professionele online aanwezigheid.',
      highlighted: false,
      badge: '',
      features: [
        'Professioneel template design',
        'Tot 10 pagina\'s',
        '2 feedbackrondes',
        'PageSpeed 60+ gegarandeerd',
        'Binnen 3 weken live'
      ],
      cta: 'Offerte aanvragen',
      ctaUrl: '/contact',
      icon: 'zap'
    },
    {
      name: 'Business Website',
      price: '€4.499',
      priceNote: 'eenmalig',
      description: 'Voor bedrijven die een krachtigere online uitstraling willen.',
      highlighted: true,
      badge: 'Meest gekozen',
      features: [
        'Uniek design in jouw huisstijl',
        'Tot 20 pagina\'s',
        '3 feedbackrondes',
        '4 formulieren',
        'PageSpeed 70+ gegarandeerd'
      ],
      cta: 'Offerte aanvragen',
      ctaUrl: '/contact',
      icon: 'star'
    },
    {
      name: 'Custom Website',
      price: 'v.a. €7.499',
      priceNote: 'eenmalig',
      description: 'Voor bedrijven die het maximale uit hun online aanwezigheid willen halen.',
      highlighted: false,
      badge: '',
      features: [
        'Volledig maatwerk design',
        'Tot 50 pagina\'s',
        'Onbeperkte feedbackrondes',
        'API-integraties op maat',
        'PageSpeed 80+ gegarandeerd'
      ],
      cta: 'Neem contact op',
      ctaUrl: '/contact',
      icon: 'crown'
    }
  ];

  const displayPackages = packages.length > 0 ? packages : defaultPackages;

  return (
    <section className={`py-20 lg:py-24 ${bgClasses[background] || bgClasses.white}`}>
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          {subtitle && (
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
              {subtitle}
            </span>
          )}
          <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayPackages.map((pkg, index) => {
            const IconComponent = iconMap[pkg.icon] || Star;
            const features = parseFeatures(pkg.features);
            
            return (
              <div
                key={index}
                className={`relative rounded-2xl p-8 transition-all duration-300 flex flex-col ${
                  pkg.highlighted
                    ? 'bg-white border-2 border-primary shadow-lg ring-1 ring-primary/10'
                    : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                {/* Badge */}
                {pkg.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-block px-4 py-1 text-sm font-semibold rounded-full bg-primary text-white">
                      {pkg.badge}
                    </span>
                  </div>
                )}

                {/* Header with Icon */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    pkg.highlighted
                      ? 'bg-primary/10'
                      : 'bg-gray-100'
                  }`}>
                    <IconComponent className={`w-6 h-6 ${
                      pkg.highlighted ? 'text-primary' : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    {/* Package Name */}
                    <h3 className="text-xl font-bold text-gray-900">
                      {pkg.name}
                    </h3>
                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-gray-900 whitespace-nowrap">
                        {pkg.price}
                      </span>
                      {pkg.priceNote && (
                        <span className="text-sm text-gray-500">
                          {pkg.priceNote}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                {pkg.description && (
                  <p className="text-sm text-gray-600 mb-6">
                    {pkg.description}
                  </p>
                )}

                {/* Features - All visible */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-gray-600">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href={pkg.ctaUrl || '/contact'}
                  className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 mt-auto ${
                    pkg.highlighted
                      ? 'bg-primary text-white hover:bg-primary-dark'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {pkg.cta || 'Offerte aanvragen'}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Always Included Features */}
        {includedFeatures && (
          <div className="text-center mt-12 max-w-4xl mx-auto">
            <p className="text-gray-600 text-sm">
              <span className="font-semibold text-gray-900">Altijd inbegrepen:</span>{' '}
              {includedFeatures}
            </p>
          </div>
        )}

        {/* Bottom Note */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Alle prijzen zijn exclusief BTW. Heb je specifieke wensen?{' '}
            <Link href="/contact" className="text-primary hover:text-primary-dark font-medium">
              Neem contact op
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}