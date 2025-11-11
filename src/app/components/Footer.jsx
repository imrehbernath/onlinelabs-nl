import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Bedrijfsinfo */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-white font-montserrat font-bold text-xl">
                OnlineLabs
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Online marketing bureau uit Amsterdam. Specialist in SEO, GEO optimalisatie en webdesign sinds 2008.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Herengracht 221</p>
              <p>1016 BG Amsterdam</p>
              <p className="mt-3">
                <a href="tel:+31208202022" className="hover:text-white transition-colors">
                  020 820 20 22
                </a>
              </p>
              <p>
                <a href="mailto:hallo@onlinelabs.nl" className="hover:text-white transition-colors">
                  hallo@onlinelabs.nl
                </a>
              </p>
            </div>
          </div>

          {/* Diensten */}
          <div>
            <span className="text-white font-semibold text-base block mb-4">Diensten</span>
            <ul className="space-y-2">
              <li>
                <Link href="/seo-vindbaarheid" className="text-gray-400 hover:text-white text-sm transition-colors">
                  SEO & Vindbaarheid
                </Link>
              </li>
              <li>
                <Link href="/geo-optimalisatie" className="text-gray-400 hover:text-white text-sm transition-colors">
                  GEO Optimalisatie
                </Link>
              </li>
              <li>
                <Link href="/webdesign-ux" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Webdesign & UX
                </Link>
              </li>
              <li>
                <Link href="/website-snelheid" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Website Snelheid
                </Link>
              </li>
              <li>
                <Link href="/online-adverteren" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Online Adverteren
                </Link>
              </li>
              <li>
                <Link href="/diensten" className="text-gray-400 hover:text-white text-sm transition-colors font-medium">
                  Alle diensten →
                </Link>
              </li>
            </ul>
          </div>

          {/* Bedrijf */}
          <div>
            <span className="text-white font-semibold text-base block mb-4">Bedrijf</span>
            <ul className="space-y-2">
              <li>
                <Link href="/over-ons" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Over OnlineLabs
                </Link>
              </li>
              <li>
                <Link href="/ons-werk" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Ons werk
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a 
                  href="https://teun.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1"
                >
                  Teun.ai
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Certificeringen */}
          <div>
            <span className="text-white font-semibold text-base block mb-4">Neem contact op</span>
            <Link
              href="/contact"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium text-sm transition-all hover:shadow-lg mb-6"
            >
              Gratis adviesgesprek
            </Link>
            
            <div className="space-y-4">
              <span className="text-gray-400 text-xs block">Certified partners</span>
              <div className="flex items-center gap-4 opacity-70">
                <span className="text-xs text-gray-500">Google Partner</span>
                <span className="text-xs text-gray-500">Semrush Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">
              © {currentYear} OnlineLabs. Alle rechten voorbehouden.
            </p>
            
            <div className="flex flex-wrap gap-4 text-xs">
              <Link href="/privacyverklaring" className="text-gray-500 hover:text-white transition-colors">
                Privacyverklaring
              </Link>
              <Link href="/algemene-voorwaarden" className="text-gray-500 hover:text-white transition-colors">
                Algemene Voorwaarden
              </Link>
              <Link href="/sitemap.xml" className="text-gray-500 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
            
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/onlinelabs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="OnlineLabs op LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}