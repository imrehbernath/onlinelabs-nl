'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X, Phone } from 'lucide-react';

/* OnlineLabs — "Met de hand gebouwd in Amsterdam"
   Cinematische, donkere sticky nav. Transparant over de homepage-video,
   egaal donker (ink) op andere pagina's en bij het scrollen. */
const MONO = "var(--font-space-mono), ui-monospace, monospace";
const INK_RGBA = 'rgba(10, 26, 43, 0.86)';   // --ink @86%
const INK_LINE = 'rgba(244, 241, 234, 0.13)'; // --ink-line

export default function Header({ services = [] }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll terwijl het mobiele menu open is
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Egaal donkere nav: altijd op subpagina's, op de homepage pas na scroll.
  const solid = isScrolled || !isHome;
  // Balk ook donker zodra het mobiele menu open is, zodat logo + sluitknop leesbaar blijven.
  const dark = solid || isMobileMenuOpen;
  const logoSrc = dark ? '/onlinelabs-logo-sticky.svg' : '/onlinelabs-logo-wit.svg';

  // Fallback services als WordPress niet beschikbaar is
  const defaultServices = [
    { title: 'SEO & vindbaarheid', subtitle: 'SEO specialisten', description: 'Hogere rankings en meer organisch verkeer.', uri: '/skills/seo-specialist' },
    { title: 'GEO optimalisatie', subtitle: 'AI-SEO specialisten', description: 'Word het antwoord in ChatGPT & AI.', uri: '/skills/geo-optimalisatie' },
    { title: 'Online adverteren', subtitle: 'Online Ads experts', description: 'Zichtbaar via Google Ads en social media.', uri: '/skills/online-adverteren' },
    { title: 'Webdesign & UX', subtitle: 'Webdesign specialisten', description: 'Scoort in Google, AI en overtuigt jouw klant.', uri: '/skills/website-laten-maken' },
    { title: 'Website snelheid', subtitle: 'Performance experts', description: 'Laadt snel en voldoet aan Core Web Vitals.', uri: '/skills/website-snelheid-optimalisatie' },
    { title: 'Conversie optimalisatie', subtitle: 'CRO specialisten', description: 'Meer resultaat uit elke bezoeker.', uri: '/skills/conversie-optimalisatie-specialist' },
  ];

  const displayServices = services.length > 0
    ? services
        .filter(service => service.serviceDetails?.showInMenu === true)
        .map(service => ({
          title: service.title,
          subtitle: service.serviceDetails?.subtitle || '',
          description: service.serviceDetails?.description || '',
          uri: service.uri,
        }))
    : defaultServices;

  return (
    <>
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-[400ms]"
      style={{
        backgroundColor: dark ? INK_RGBA : 'transparent',
        backdropFilter: dark ? 'blur(14px) saturate(1.2)' : 'none',
        WebkitBackdropFilter: dark ? 'blur(14px) saturate(1.2)' : 'none',
        borderBottom: `1px solid ${dark ? INK_LINE : 'transparent'}`,
      }}
    >
      <nav
        className="relative z-[2] flex items-center justify-between px-5 sm:px-8 lg:px-12 transition-all duration-[400ms]"
        style={{ paddingTop: solid ? '0.85rem' : '1.3rem', paddingBottom: solid ? '0.85rem' : '1.3rem' }}
      >
        {/* Logo — wit over de video, "Online" wit + "Labs" blauw zodra donker */}
        <Link href="/" aria-label="OnlineLabs" className="flex items-center shrink-0">
          <Image
            src={logoSrc}
            alt="OnlineLabs — Online Marketing Bureau Amsterdam sinds 2008"
            width={172}
            height={28}
            priority
            fetchPriority="high"
            className="h-7 w-auto"
          />
        </Link>

        {/* Desktop navigatie (≥1080px) */}
        <div className="hidden min-[1080px]:flex items-center gap-8">
          <div className="flex items-center gap-7">
            {/* Mega menu — Wat we doen */}
            <div
              className="relative flex items-center"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button
                className="flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 whitespace-nowrap"
                style={{ color: isMegaMenuOpen ? '#f4f1ea' : '#d7e0e8' }}
                aria-expanded={isMegaMenuOpen}
                aria-haspopup="true"
              >
                Wat we doen
                <ChevronDown className={`w-[15px] h-[15px] transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMegaMenuOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-screen max-w-[1060px] px-4">
                  <div className="bg-white rounded-[18px] overflow-hidden border border-[rgba(20,32,44,0.08)] shadow-[0_36px_90px_-24px_rgba(7,20,32,0.55)]">
                    {/* Kop */}
                    <div
                      className="px-9 pt-7 pb-4 border-b border-[rgba(20,32,44,0.12)]"
                      style={{ background: 'linear-gradient(135deg, #f7f8fa, #fff 60%)' }}
                    >
                      <span className="block font-serif font-bold text-2xl tracking-tight text-[#15212c]">
                        Wat we doen
                      </span>
                    </div>

                    {/* Diensten-grid (3 kolommen) */}
                    <div className="grid grid-cols-3 gap-x-5 gap-y-1 p-5">
                      {displayServices.map((service) => (
                        <Link
                          key={service.uri}
                          href={service.uri}
                          className="group flex flex-col rounded-xl px-[1.15rem] py-4 transition-colors duration-200 hover:bg-[rgba(55,110,181,0.07)]"
                        >
                          <span className="font-serif font-bold text-[1.06rem] mb-2 text-[#15212c] transition-colors duration-200 group-hover:text-[#376eb5]">
                            {service.title}
                          </span>
                          {service.subtitle && (
                            <span className="text-[0.9rem] font-semibold text-[#374151] mb-[0.35rem]">
                              {service.subtitle}
                            </span>
                          )}
                          <span className="text-[0.9rem] leading-relaxed text-[#6b7280]">
                            {service.description}
                          </span>
                        </Link>
                      ))}
                    </div>

                    {/* Footer — leesbare tekstlink, geen knop, geen pijl */}
                    <div className="flex items-center justify-between gap-4 px-9 py-5 border-t border-[rgba(20,32,44,0.12)] bg-[#fafbfc]">
                      <p className="m-0 text-[0.92rem] text-[#6b7280]">
                        Meer weten over onze aanpak en werkwijze?
                      </p>
                      <Link
                        href="/skills"
                        className="font-bold text-[0.95rem] text-[#15212c] whitespace-nowrap border-b-2 border-[#376eb5] pb-0.5 transition-colors duration-200 hover:text-[#376eb5] hover:border-[#4d83c9]"
                      >
                        Bekijk alle diensten
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Reguliere links */}
            {[
              { href: '/ons-werk', label: 'Ons werk' },
              { href: '/blog', label: 'Blog' },
              { href: '/over-ons', label: 'Over ons' },
              { href: '/contact', label: 'Contact' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-[0.93rem] font-medium text-[#d7e0e8] py-1 transition-colors duration-200 hover:text-[#f4f1ea] whitespace-nowrap after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[#4d83c9] after:transition-[width] after:duration-300 hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Teun.ai pill */}
          <a
            href="https://teun.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border px-[0.85rem] py-2 text-[0.78rem] tracking-[0.06em] text-[#f4f1ea] transition-colors duration-200 hover:border-[#4d83c9] hover:text-[#4d83c9]"
            style={{ fontFamily: MONO, borderColor: 'rgba(244,241,234,0.6)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4d83c9] animate-pulse" />
            Teun.ai
          </a>
        </div>

        {/* Mobiele menu-knop (<1080px) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="min-[1080px]:hidden p-2 text-[#f4f1ea] transition-colors duration-200"
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>
    </header>

      {/* Mobiel menu — fullscreen donkere overlay.
          BUITEN de header omdat backdrop-filter op de header een containing block
          maakt voor fixed children (anders wordt de overlay tot de balk afgekapt). */}
      <div
        className={`min-[1080px]:hidden fixed inset-0 z-40 flex flex-col gap-1 px-6 pt-24 pb-8 overflow-y-auto transition-transform duration-500 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: '#071420' }}
      >
        {/* Wat we doen — uitklapbaar */}
        <button
          onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
          className="w-full flex items-center justify-between font-serif text-2xl text-[#f4f1ea] py-2 border-b border-[rgba(244,241,234,0.07)]"
        >
          <span>Wat we doen</span>
          <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
        </button>
        {isMobileServicesOpen && (
          <div className="pl-3 py-2 flex flex-col gap-2 border-l border-[rgba(244,241,234,0.13)] ml-1 mb-2">
            {displayServices.map((service) => (
              <Link
                key={service.uri}
                href={service.uri}
                onClick={() => { setIsMobileMenuOpen(false); setIsMobileServicesOpen(false); }}
                className="text-[1.05rem] text-[#d7e0e8] hover:text-[#4d83c9] transition-colors py-0.5"
              >
                {service.title}
              </Link>
            ))}
            <Link
              href="/skills"
              onClick={() => { setIsMobileMenuOpen(false); setIsMobileServicesOpen(false); }}
              className="text-[1.05rem] font-semibold text-[#4d83c9] py-0.5"
            >
              Bekijk alle diensten
            </Link>
          </div>
        )}

        {[
          { href: '/ons-werk', label: 'Ons werk' },
          { href: '/blog', label: 'Blog' },
          { href: '/over-ons', label: 'Over ons' },
          { href: '/contact', label: 'Contact' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-serif text-2xl text-[#f4f1ea] py-2 border-b border-[rgba(244,241,234,0.07)]"
          >
            {item.label}
          </Link>
        ))}

        <a
          href="tel:+31208202022"
          className="flex items-center gap-3 text-[#d7e0e8] hover:text-[#4d83c9] transition-colors py-3"
          style={{ fontFamily: MONO, fontSize: '0.9rem' }}
        >
          <Phone className="w-5 h-5 text-[#4d83c9]" />
          020 - 820 20 22
        </a>

        <a
          href="https://teun.ai"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsMobileMenuOpen(false)}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-[3px] bg-[#376eb5] px-6 py-3.5 font-bold text-[#f4f1ea] transition-colors hover:bg-[#4d83c9]"
        >
          Ontdek Teun.ai
        </a>
      </div>
    </>
  );
}
