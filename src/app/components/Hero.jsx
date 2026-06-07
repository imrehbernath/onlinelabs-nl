import Link from 'next/link';

/* OnlineLabs — filmische Amsterdam-videoheader.
   Full-bleed timelapse, donkere canal-night scrim, tekst links uitgelijnd
   en verticaal gecentreerd, 100vh. Trustregel onderaan de video. */
export default function Hero() {
  return (
    <header className="relative flex items-center overflow-hidden min-h-[100svh] bg-[#0a1a2b] text-[#f4f1ea]">
      <style>{`
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(26px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-rise { opacity: 0; animation: hero-fade-up 1.1s cubic-bezier(.2,.7,.3,1) forwards; }
        .hero-rise-1 { animation-delay: .30s; }
        .hero-rise-2 { animation-delay: .55s; }
        .hero-rise-3 { animation-delay: .75s; }
        .hero-rise-4 { animation-delay: .95s; }
        .hero-rise-5 { animation-delay: 1.2s; }
        @media (prefers-reduced-motion: reduce) {
          .hero-rise { opacity: 1; animation: none; transform: none; }
        }
      `}</style>

      {/* Video */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <video
          className="w-full h-full object-cover"
          src="/amsterdam.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
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
          Sinds 2008 helpt OnlineLabs vanuit Amsterdam bedrijven groeien met SEO, GEO,
          webdesign, snelheid en conversie-optimalisatie. Met ons eigen AI-platform Teun.ai
          maken we zichtbaar waar je klanten zoeken: in Google, ChatGPT en andere AI-platformen.
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
      </div>

      {/* Trustregel — onderaan de video */}
      <div
        className="hero-rise hero-rise-5 absolute left-0 right-0 z-[2] mx-auto flex flex-wrap items-center gap-x-8 gap-y-4 pt-[1.4rem] border-t border-[rgba(244,241,234,0.07)] w-[min(100%-2.5rem,1280px)] sm:w-[min(100%-4rem,1280px)] lg:w-[min(100%-6rem,1280px)]"
        style={{
          bottom: 'clamp(26px, 4.5vh, 52px)',
          fontFamily: 'var(--font-space-mono), ui-monospace, monospace',
          fontSize: '0.8rem',
          letterSpacing: '0.05em',
          color: '#8ba0b2',
        }}
      >
        <span>Amsterdam</span>
        <span className="text-[#4d83c9]">•</span>
        <span>sinds 2008</span>
        <span className="text-[#4d83c9]">•</span>
        <span>Google Partner</span>
        <span className="text-[#4d83c9]">•</span>
        <span>5★ Google Reviews</span>
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
