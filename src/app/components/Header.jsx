'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ExternalLink, Menu, X, Phone } from 'lucide-react';

export default function Header({ services = [] }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fallback services als WordPress niet beschikbaar
  // Rij 1: Traffic generatie | Rij 2: Website optimalisatie
  const defaultServices = [
    // Rij 1: Hoe krijg je bezoekers
    {
      title: 'SEO & vindbaarheid',
      subtitle: 'SEO specialisten',
      description: 'Hogere rankings en meer organisch verkeer.',
      uri: '/skills/seo-specialist',
      featured: false,
    },
    {
      title: 'GEO optimalisatie',
      subtitle: 'AI-SEO specialisten',
      description: 'Word het antwoord in ChatGPT & AI.',
      uri: '/skills/geo-optimalisatie',
      featured: true,
    },
    {
      title: 'Online adverteren',
      subtitle: 'Online Ads experts',
      description: 'Zichtbaar via Google Ads en social media.',
      uri: '/skills/online-adverteren',
      featured: false,
    },
    // Rij 2: Wat doe je met bezoekers
    {
      title: 'Webdesign & UX',
      subtitle: 'Webdesign specialisten',
      description: 'Scoort in Google, AI en overtuigt jouw klant.',
      uri: '/skills/website-laten-maken',
      featured: false,
    },
    {
      title: 'Website snelheid',
      subtitle: 'Performance experts',
      description: 'Laadt snel en voldoet aan Core Web Vitals.',
      uri: '/skills/website-snelheid-optimalisatie',
      featured: false,
    },
    {
      title: 'Conversie optimalisatie',
      subtitle: 'CRO specialisten',
      description: 'Meer resultaat uit elke bezoeker.',
      uri: '/skills/conversie-optimalisatie-specialist',
      featured: false,
    },
  ];

  // Transform WordPress data naar component format
  // Filter op showInMenu - alleen tonen als expliciet true
  const displayServices = services.length > 0 
    ? services
        .filter(service => service.serviceDetails?.showInMenu === true)
        .map(service => ({
          title: service.title,
          subtitle: service.serviceDetails?.subtitle || '',
          description: service.serviceDetails?.description || '',
          uri: service.uri,
          featured: service.serviceDetails?.featured || false,
        }))
    : defaultServices;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        isScrolled
          ? 'shadow-sm border-b border-gray-200 py-3'
          : 'py-5'
      }`}
    >
      <nav className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - with priority for LCP */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-44 h-11">
              <Image
                src="/OnlineLabs_logo.svg"
                alt="OnlineLabs - Online Marketing Bureau Amsterdam sinds 2008"
                fill
                className="object-contain transition-opacity duration-200 group-hover:opacity-80"
                priority
                fetchPriority="high"
              />
            </div>
          </Link>

          {/* Desktop Navigation - Compact between 1024-1280px, full spacing above */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            {/* Mega Menu - Wat we doen */}
            <div
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button className="flex items-center gap-1.5 text-primary hover:text-primary-dark font-medium text-sm xl:text-base transition-colors duration-200">
                Wat we doen
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isMegaMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Mega Menu Dropdown */}
              {isMegaMenuOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-screen max-w-4xl">
                  <div className="bg-white rounded-2xl shadow-[0_20px_70px_-15px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden">
                    
                    {/* Header */}
                    <div className="relative px-10 pt-8 pb-5 bg-gradient-to-br from-gray-50 via-white to-gray-50/30">
                      <span className="block text-2xl font-bold text-gray-900 font-serif tracking-tight">
                        Wat we doen
                      </span>
                      <div className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                    </div>

                    {/* Services Grid - 3 kolommen, 2 rijen */}
                    <div className="px-10 py-8 bg-gradient-to-b from-white via-gray-50/20 to-white">
                      <div className="grid grid-cols-3 gap-6">
                        {displayServices.map((service) => (
                          <Link
                            key={service.uri}
                            href={service.uri}
                            className={`group block relative ${
                              service.featured 
                                ? 'bg-gradient-to-br from-primary/[0.04] to-accent/[0.04] rounded-xl p-4 -m-4 ring-2 ring-primary/20' 
                                : ''
                            }`}
                          >
                            {/* Hover background effect */}
                            {!service.featured && (
                              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-accent/[0.02] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-3 p-3" />
                            )}
                            
                            <div className="relative">
                              {/* Title with underline */}
                              <div className={`pb-2 mb-3 border-b-2 transition-all duration-300 ${
                                service.featured 
                                  ? 'border-primary' 
                                  : 'border-gray-200 group-hover:border-primary'
                              }`}>
                                <span className={`block leading-tight transition-colors duration-300 ${
                                  service.featured
                                    ? 'font-extrabold text-primary text-base'
                                    : 'font-bold text-gray-900 text-base group-hover:text-primary'
                                }`}>
                                  {service.title}
                                </span>
                              </div>
                              
                              {/* Subtitle */}
                              <p className="text-sm text-gray-700 font-semibold mb-2 tracking-tight">
                                {service.subtitle}
                              </p>
                              
                              {/* Description */}
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {service.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Footer Link */}
                      <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-sm text-gray-500 font-medium">
                          Meer weten over onze aanpak en werkwijze?
                        </p>
                        <Link
                          href="/skills"
                          className="group inline-flex items-center gap-2 px-5 py-2.5 bg-primary/5 hover:bg-primary/10 text-primary font-medium rounded-lg transition-all duration-200"
                        >
                          Bekijk alle diensten
                          <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Regular Menu Items - Compact text between 1024-1280px */}
            <Link
              href="/ons-werk"
              className="text-gray-700 hover:text-primary font-medium text-sm xl:text-base transition-colors duration-200"
            >
              Ons werk
            </Link>
            <Link
              href="/blog"
              className="text-gray-700 hover:text-primary font-medium text-sm xl:text-base transition-colors duration-200"
            >
              Blog
            </Link>
            <Link
              href="/over-ons"
              className="text-gray-700 hover:text-primary font-medium text-sm xl:text-base transition-colors duration-200"
            >
              Over ons
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-primary font-medium text-sm xl:text-base transition-colors duration-200"
            >
              Contact
            </Link>

            {/* Teun.ai Button - Compact between 1024-1280px */}
            <a
              href="https://teun.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative border-2 border-primary hover:bg-primary text-primary hover:text-white px-4 xl:px-6 py-2 xl:py-2.5 rounded-lg font-medium text-sm xl:text-base transition-all duration-300 inline-flex items-center gap-2"
            >
              <span className="relative z-10">Teun.ai</span>
              <ExternalLink className="w-4 h-4 relative z-10 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-primary transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu - COLLAPSIBLE */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-6 pb-6 border-t border-gray-200 pt-6">
            <div className="flex flex-col gap-4">
              
              {/* Wat we doen - Collapsible */}
              <div>
                <button
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className="w-full flex items-center justify-between text-gray-900 hover:text-primary font-medium text-base transition-colors duration-200"
                >
                  <span>Wat we doen</span>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isMobileServicesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Services Dropdown */}
                {isMobileServicesOpen && (
                  <div className="mt-3 ml-4 space-y-2 border-l-2 border-gray-200 pl-4">
                    {displayServices.map((service) => (
                      <Link
                        key={service.uri}
                        href={service.uri}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileServicesOpen(false);
                        }}
                        className={`block text-base transition-colors duration-200 py-1 ${
                          service.featured
                            ? 'text-primary font-semibold'
                            : 'text-gray-600 hover:text-primary'
                        }`}
                      >
                        {service.title}
                      </Link>
                    ))}
                    <Link
                      href="/skills"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileServicesOpen(false);
                      }}
                      className="block text-primary font-medium text-base py-1"
                    >
                      Naar alle skills →
                    </Link>
                  </div>
                )}
              </div>

              {/* Ons werk */}
              <Link
                href="/ons-werk"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-900 hover:text-primary font-medium text-base transition-colors duration-200"
              >
                Ons werk
              </Link>

              {/* Over ons */}
              <Link
                href="/over-ons"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-900 hover:text-primary font-medium text-base transition-colors duration-200"
              >
                Over ons
              </Link>

              {/* Blog */}
              <Link
                href="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-900 hover:text-primary font-medium text-base transition-colors duration-200"
              >
                Blog
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-900 hover:text-primary font-medium text-base transition-colors duration-200"
              >
                Contact
              </Link>

              {/* Divider */}
              <div className="border-t border-gray-200 my-2" />

              {/* Telefoonnummer */}
              <a
                href="tel:0208202022"
                className="flex items-center gap-2 text-gray-900 hover:text-primary font-medium text-base transition-colors duration-200"
              >
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                020 - 820 20 22
              </a>

              {/* Teun.ai CTA */}
              <a
                href="https://teun.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-primary hover:bg-primary text-primary hover:text-white px-6 py-3 rounded-lg font-medium text-base transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                Teun.ai
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}