import Link from 'next/link';

/* OnlineLabs — filmische Amsterdam-videoheader.
   Full-bleed timelapse, donkere canal-night scrim, tekst links uitgelijnd
   en verticaal gecentreerd, 100vh. Trustregel onderaan de video. */
export default function Hero() {
  const MONO = 'var(--font-space-mono), ui-monospace, monospace';
  const trust = ['Amsterdam', 'sinds 2008', 'Google Partner', '5★ Google Reviews'];
  const trustSpans = trust.flatMap((t, i) =>
    i === 0
      ? [<span key={t}>{t}</span>]
      : [<span key={`${t}-sep`} className="text-[#4d83c9]">•</span>, <span key={t}>{t}</span>]
  );

  return (
    <header className="relative flex items-center overflow-hidden min-h-screen bg-[#0a1a2b] text-[#f4f1ea]">
      <style>{`
        /* Hero-content is ALTIJD zichtbaar (opacity:1). Alleen een transform-rise als
           entree — géén opacity:0-startstaat. Die zorgde dat Googlebot (en DebugBear)
           de hero zwart/leeg renderden: de screenshot valt vóór de animatie klaar is. */
        @keyframes hero-rise-up {
          from { transform: translateY(24px); }
          to   { transform: translateY(0); }
        }
        .hero-rise { animation: hero-rise-up 1s cubic-bezier(.2,.7,.3,1) both; }
        .hero-rise-1 { animation-delay: .30s; }
        .hero-rise-2 { animation-delay: .55s; }
        .hero-rise-3 { animation-delay: .75s; }
        .hero-rise-4 { animation-delay: .95s; }
        .hero-rise-5 { animation-delay: 1.2s; }
        @media (prefers-reduced-motion: reduce) {
          .hero-rise { opacity: 1; animation: none; transform: none; }
        }
      `}</style>

      {/* Video met eerste-frame als still-achtergrond: die rendert ALTIJD (plain
          CSS-image, geen codec/decodering nodig), dus Googlebot/GSC/Screaming Frog
          zien nooit zwart — ook niet als de video niet decodeert of laadt. De still
          is frame 0 van de video, dus naadloos: geen verspringing als de video start.
          WebM eerst (open codec), mp4 als fallback voor Safari. */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          backgroundImage: 'url(https://cdn.onlinelabs.nl/wp-content/uploads/2026/07/amsterdam-poster.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/amsterdam.webm" type="video/webm" />
          <source src="/amsterdam.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Scrim — donkere canal-night tint voor leesbaarheid */}
      <div
        className="absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(180deg, rgba(7,20,32,0.55) 0%, rgba(7,20,32,0.15) 30%, rgba(7,20,32,0.55) 62%, #0a1a2b 100%), radial-gradient(120% 80% at 20% 100%, rgba(7,20,32,0.57) 0%, transparent 60%)',
        }}
      />
      <div className="absolute inset-0 z-[1]" aria-hidden="true" style={{ background: 'rgba(7,20,32,0.28)' }} />

      {/* Content */}
      <div className="relative z-[2] w-full max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-[clamp(80px,14vh,140px)]">
        <h1
          className="hero-rise hero-rise-2 font-serif font-semibold tracking-[-0.015em] max-w-[20ch] mb-[1.7rem]"
          style={{ fontSize: 'clamp(2.1rem, 4.7vw, 3.95rem)', lineHeight: 1.06 }}
        >
          Online marketing bureau voor zichtbaarheid in Google, ChatGPT en{' '}
          <span style={{ color: '#4d83c9' }}>AI</span>
        </h1>

        <p
          className="hero-rise hero-rise-3 text-[#d7e0e8] max-w-[56ch] mb-[2.3rem]"
          style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)', lineHeight: 1.6 }}
        >
          Sinds 2008 helpt OnlineLabs vanuit Amsterdam bedrijven groeien met SEO, GEO, webdesign,
          snelheid en conversie-optimalisatie. Met Teun.ai maken we jouw bedrijf zichtbaar in
          Google, ChatGPT en andere AI-platformen.
        </p>

        <div className="hero-rise hero-rise-4 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-[2px] bg-[#f4f1ea] px-[1.7rem] py-4 text-base font-semibold text-[#0a1a2b] leading-none transition-all duration-200 hover:bg-white hover:-translate-y-0.5"
          >
            Start met online groei
          </Link>
          <a
            href="https://teun.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-[2px] border border-[rgba(244,241,234,0.13)] px-[1.7rem] py-4 text-base font-semibold text-[#f4f1ea] leading-none transition-all duration-200 hover:border-[#f4f1ea] hover:bg-[rgba(244,241,234,0.04)]"
          >
            Bekijk Teun.ai
          </a>
        </div>

        {/* Trustregel — mobiel: in de normale flow onder de knoppen (geen overlap),
            één regel die meeschaalt zodat alle items passen. */}
        <div
          className="hero-rise hero-rise-5 sm:hidden mt-9 pt-5 border-t border-[rgba(244,241,234,0.07)] whitespace-nowrap"
          style={{ fontFamily: MONO, fontSize: 'clamp(0.52rem, 2.5vw, 0.78rem)', letterSpacing: '0', color: '#8ba0b2' }}
        >
          {trust.map((t, i) => (
            <span key={t}>
              {i > 0 && <span className="text-[#4d83c9] mx-[5px]">•</span>}
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Trustregel — desktop/tablet: vast onderaan de video */}
      <div
        className="hero-rise hero-rise-5 hidden sm:flex absolute left-0 right-0 z-[2] mx-auto flex-wrap items-center gap-x-8 gap-y-4 pt-[1.4rem] border-t border-[rgba(244,241,234,0.07)] sm:w-[min(100%-4rem,1280px)] lg:w-[min(100%-6rem,1280px)]"
        style={{
          bottom: 'clamp(26px, 4.5vh, 52px)',
          fontFamily: MONO,
          fontSize: '0.8rem',
          letterSpacing: '0.05em',
          color: '#8ba0b2',
        }}
      >
        {trustSpans}
      </div>

      {/* Scroll-cue (verborgen op kleine schermen) */}
      <div
        className="hero-rise hero-rise-5 hidden sm:flex absolute z-[2] items-center gap-4 [writing-mode:vertical-rl] uppercase text-[#8ba0b2]"
        style={{
          right: 'clamp(20px, 5vw, 64px)',
          bottom: 'clamp(48px, 8vh, 96px)',
          fontFamily: 'var(--font-space-mono), ui-monospace, monospace',
          fontSize: '0.72rem',
          letterSpacing: '0.2em',
        }}
        aria-hidden="true"
      >
        <span className="h-[54px] w-px" style={{ background: 'linear-gradient(#4d83c9, transparent)' }} />
        scroll
      </div>
    </header>
  );
}
