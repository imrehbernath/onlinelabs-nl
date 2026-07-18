'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

/* OnlineLabs — "Wat we doen" (donkere editorial grid).
   6 genummerde diensten met gevouwen-hoekje kaarten en twee oversized
   achtergrondringen die meegroeien tijdens het scrollen.
   CWV: de ringen animeren alleen transform/opacity (compositor-only),
   de scroll-handler is passief en rAF-throttled. Teal uit het ontwerp
   vervangen door OnlineLabs-blauw, conform de rest van de site. */

const services = [
  { num: '01', name: 'SEO & vindbaarheid', text: 'Beter gevonden worden in Google met techniek, content en autoriteit.', href: '/skills/seo-specialist' },
  { num: '02', name: 'GEO & AI-zichtbaarheid', text: 'Zichtbaar worden in ChatGPT, Google AI en andere AI-antwoorden.', href: '/skills/geo-optimalisatie' },
  { num: '03', name: 'Webdesign & UX', text: 'Websites die snel, duidelijk en conversiegericht zijn.', href: '/skills/website-laten-maken' },
  { num: '04', name: 'Snelheid & Core Web Vitals', text: 'Snellere websites, betere gebruikerservaring en sterkere prestaties in Google.', href: '/skills/website-snelheid-optimalisatie' },
  { num: '05', name: 'Online adverteren', text: 'Google Ads en Meta Ads die meetbaar bijdragen aan groei.', href: '/skills/online-adverteren' },
  { num: '06', name: 'Conversie-optimalisatie', text: "Meer aanvragen uit hetzelfde verkeer door betere structuur, CTA's en data.", href: '/skills/conversie-optimalisatie-specialist' },
];

export default function ServicesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const arcs = Array.from(section.querySelectorAll('.svc__arc'));
    if (!arcs.length) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let tick = false;
    const easeOut = (x) => 1 - Math.pow(1 - x, 2);
    const update = () => {
      tick = false;
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      let through = (vh - r.top) / (r.height + vh);
      through = Math.max(0, Math.min(1, through));
      const l1 = Math.max(0, Math.min(1, through / 0.45));        // rechtsboven: groeit vroeg
      const l2 = Math.max(0, Math.min(1, (through - 0.30) / 0.45)); // linksonder: groeit later
      const map = [easeOut(l1), easeOut(l2)];
      arcs.forEach((a, i) => {
        const e = map[i] != null ? map[i] : map[0];
        a.style.transform = `scale(${(0.5 + e * 0.5).toFixed(3)})`;
        a.style.opacity = (0.25 + e * 0.75).toFixed(3);
      });
    };
    const onScroll = () => { if (!tick) { tick = true; requestAnimationFrame(update); } };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="svc" id="diensten" aria-label="Onze diensten">

      <div className="svc__arc" />
      <div className="svc__arc svc__arc--2" />

      <div className="wrap">
        <div className="svc__head">
          <div>
            <span className="eyebrow" style={{ marginBottom: '1.3rem' }}>Onze diensten</span>
            <h2 className="svc__title">Wat we <em>doen</em></h2>
          </div>
          <p className="svc__intro">
            OnlineLabs helpt bedrijven groeien met strategie, techniek, content en data. Geen losse
            trucjes, maar een complete aanpak voor zichtbaarheid, vertrouwen en meer aanvragen.
          </p>
        </div>

        <div className="svc__grid">
          {services.map((s) => (
            <Link key={s.num} className="svc__card" href={s.href}>
              <span className="svc__fold" />
              <span className="svc__num">{s.num}</span>
              <h3 className="svc__name">{s.name}</h3>
              <p className="svc__text">{s.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
