'use client';

import { Fragment, useEffect, useState } from 'react';
import { SNELHEID_FAQS } from './snelheidFaqs';

// Website snelheid 2027: zelfde opbouw als de andere dienstpagina's (WebView, SeoView).

const WORD = 'Snellere website';

// Echte metingen uit eigen trajecten (PageSpeed Insights, mobiel)
const RESULTATEN = [
  { name: 'HM2 Warehouse Signing', n: '0,51 s', l: 'laadtijd van de belangrijkste inhoud (LCP), Google wil onder 2,5 s', d: 'Nieuwe website in WordPress en Bricks, overgezet van Squarespace. Vanaf de eerste regel code op snelheid gebouwd.', case: '/ons-werk/hm2-kwadraat' },
  { name: 'Sec Arbeidsrecht', n: '58 → 80', l: 'PageSpeed-score mobiel, na één dag werk', d: 'LCP van 12,5 naar 4,1 seconde. Een zware iconenset en reviewwidget vervangen door lichte eigen code.' },
  { name: 'Forteiland Pampus', n: '6,7 → 1,5 MB', l: 'paginagewicht op mobiel', d: 'De pagina verspringt niet meer tijdens het laden: CLS naar 0. Agentisch browsen op 3/3.', case: '/ons-werk/forteiland-pampus' },
];

const VITALS = [
  { k: 'LCP', t: 'Laadtijd', n: '< 2,5 s', d: 'Hoe snel staat de belangrijkste inhoud in beeld? Meestal de grote foto of de kop bovenaan.' },
  { k: 'INP', t: 'Reactie', n: '< 200 ms', d: 'Hoe snel reageert de pagina als je klikt, tikt of typt? Traag voelt kapot.' },
  { k: 'CLS', t: 'Stabiliteit', n: '< 0,1', d: 'Verspringt de pagina tijdens het laden? Dan klik je zo op de verkeerde knop.' },
];

const STAPPEN = [
  { t: 'Meten', d: 'Met PageSpeed, Lighthouse en data van echte bezoekers. Zo weten we wat je bezoekers merken, niet alleen wat een test zegt.' },
  { t: 'De bron aanpakken', d: 'Code, server, afbeeldingen, lettertypes en scripts van derden. Daar zit de winst. Zware widgets vervangen we door lichte eigen code.' },
  { t: 'Caching als laatste laag', d: 'Een caching plugin zoals WP Rocket of Breeze geeft daarna de finishing touch. Niet andersom.' },
  { t: 'Bewaken', d: 'Via Search Console en CoreDash zien we het direct als iets terugzakt, bijvoorbeeld na een update of een nieuwe plugin.' },
];

const lower = 'abcdefghijklnoprstuvxyz';
const upper = 'ABCDEFGHJKLNOPRSTUVXYZ';

export default function SnelheidView({ logosTop = [], logosBottom = [] }) {
  const [now, setNow] = useState(0);
  const [start, setStart] = useState(Infinity);
  const [faqOpen, setFaqOpen] = useState(0);

  useEffect(() => {
    const reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (reduced) {
      setStart(0);
      setNow(Date.now());
      return undefined;
    }
    const s0 = Date.now() + 300;
    setStart(s0);
    setNow(Date.now());
    const end = s0 + 280 + WORD.length * 55 + 60;
    const anim = setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (t > end) clearInterval(anim);
    }, 45);
    return () => clearInterval(anim);
  }, []);

  // Hero
  const t = now - start;
  const chars = [];
  let done = t >= 0;
  if (t >= 0) {
    for (let j = 0; j < WORD.length; j++) {
      const c = WORD[j];
      if (c === ' ' || t >= 280 + j * 55) chars.push({ c, color: 'inherit' });
      else {
        done = false;
        const pool = c >= 'A' && c <= 'Z' ? upper : lower;
        chars.push({ c: pool[Math.floor(Math.random() * pool.length)], color: '#376EB5' });
      }
    }
  } else {
    for (let j = 0; j < WORD.length; j++) chars.push({ c: WORD[j], color: 'transparent' });
  }
  const dotColor = done ? '#376EB5' : 'transparent';

  // Veelgestelde vragen
  const faqs = SNELHEID_FAQS.map((f, i) => ({
    q: f.q, a: f.a,
    open: faqOpen === i,
    exp: faqOpen === i ? 'true' : 'false',
    rot: faqOpen === i ? 'rotate(45deg)' : 'none',
    toggle: () => setFaqOpen((o) => (o === i ? -1 : i)),
  }));

  const h2 = { margin: '0', fontSize: '64px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.035em' };
  const intro = { margin: '0', fontSize: '20px', lineHeight: '1.6', color: '#3A4256' };
  const logoRow = (list, rev) => (
    <div className="ol-logos" style={{ overflow: 'hidden', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)', maskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)' }}>
    <div className={rev ? 'ol-logotrack ol-logorev' : 'ol-logotrack'} style={{ display: 'flex', alignItems: 'center', width: 'max-content' }}>
    {list.map((l, $index) => (<Fragment key={$index}>
    <a className="ol-logolink" href={l.href} target="_blank" rel="noopener noreferrer" aria-label={`Bezoek ${l.n} website`} aria-hidden={l.dup} tabIndex={l.tab} style={{ display: 'block', flexShrink: '0', marginRight: '48px' }}><img className="ol-logoimg" src={l.src} alt={l.n} loading="lazy" decoding="async" style={{ height: '96px', width: 'auto', display: 'block' }} /></a>
    </Fragment>))}
    </div>
    </div>
  );

  return (
    <div className="v27 v27-home v27-snelheid">
      <section className="ol-hero ol-snap" style={{ maxWidth: '1440px', margin: '0 auto', padding: '120px 40px 96px', boxSizing: 'border-box', minHeight: 'calc(100vh - 104px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1 style={{ margin: '0', fontWeight: '800' }}>
      <span className="ol-eyebrow" style={{ display: 'block', fontSize: '15px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5B6275', marginBottom: '32px' }}>Website snelheid optimalisatie</span>
      <span className="ol-sr">Website snelheid optimalisatie: een snellere website die beter scoort in Google en AI.</span>
      <span aria-hidden="true" className="ol-seo-lede" style={{ display: 'block', maxWidth: '900px', fontSize: '36px', fontWeight: '400', lineHeight: '1.3', letterSpacing: '-0.01em', color: '#0A0F1F' }}>Een trage website kost bezoekers, posities en aanvragen. Wij pakken eerst de bron aan: code, server en beeld. Pas daarna komt caching.</span>
      <span aria-hidden="true" className="ol-seo-big" style={{ display: 'block', marginTop: '56px', textAlign: 'right', whiteSpace: 'nowrap', fontSize: 'clamp(56px, 8.4vw, 132px)', lineHeight: '0.95', letterSpacing: '-0.035em' }}>{chars.map((ch, $index) => (<Fragment key={$index}><span style={{ color: ch.color }}>{ch.c}</span></Fragment>))}<span style={{ color: dotColor }}>.</span></span>
      </h1>

      <div className="ol-hero-row" style={{ marginTop: '72px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '24px 48px' }}>
      <p className="ol-seo-proof" style={{ margin: '0', fontSize: '15px', color: '#5B6275', display: 'flex', flexWrap: 'wrap', gap: '6px 10px' }}>
      <span>Google Partner</span><span aria-hidden="true">·</span><span>5,0 uit 29 Google reviews</span><span aria-hidden="true">·</span><span>WordPress en Next.js</span>
      </p>
      <div className="ol-seo-cta" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px 32px' }}>
      <a className="ol-scroll ol-down" href="#ol-resultaten" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '17px', fontWeight: '600', textDecoration: 'none' }}>Bekijk resultaten</a>
      <a className="ol-pill" href="/contact?skill=snelheid" style={{ display: 'inline-flex', alignItems: 'center', height: '56px', padding: '0 28px', borderRadius: '999px', background: '#0A0F1F', color: '#FFFFFF', fontSize: '16px', fontWeight: '600', textDecoration: 'none', whiteSpace: 'nowrap' }}>Gratis adviesgesprek</a>
      </div>
      </div>
      </section>

      <section className="ol-logosec" aria-label="Een greep uit onze klanten" style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 40px 72px', boxSizing: 'border-box' }}>
      <div className="ol-logowrap" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {logoRow(logosTop, false)}
      {logoRow(logosBottom, true)}
      </div>
      </section>

      <section id="ol-resultaten" className="ol-wwd ol-snap" aria-labelledby="ol-res-h" style={{ marginTop: '30px', padding: '30px 16px 16px' }}>
      <div className="ol-wwd-panel" style={{ maxWidth: '1600px', margin: '0 auto', background: '#F4F6FA', borderRadius: '12px', padding: '64px 56px', boxSizing: 'border-box', minHeight: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="ol-why-top" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '64px', alignItems: 'end' }}>
      <h2 id="ol-res-h" className="ol-why-h" style={h2}>Resultaten<span style={{ color: '#376EB5' }}>.</span></h2>
      <p style={intro}>Echte metingen uit onze eigen trajecten, gemeten met Google PageSpeed op mobiel. Geen beloftes, maar cijfers.</p>
      </div>
      <div className="ol-speed-cards" style={{ marginTop: '56px', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '24px' }}>
      {RESULTATEN.map((r, i) => (
      <article key={i} style={{ background: '#FFFFFF', borderRadius: '10px', padding: '36px 32px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ margin: '0', fontSize: '15px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5B6275' }}>{r.name}</h3>
      <p className="ol-speed-n" style={{ margin: '28px 0 0', fontSize: 'clamp(36px, 3.4vw, 56px)', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.04em', color: '#376EB5', whiteSpace: 'nowrap' }}>{r.n}</p>
      <p style={{ margin: '12px 0 0', fontSize: '17px', fontWeight: '600', lineHeight: '1.45', color: '#0A0F1F' }}>{r.l}</p>
      <p style={{ margin: '20px 0 0', fontSize: '16px', lineHeight: '1.6', color: '#3A4256' }}>{r.d}</p>
      {r.case && (<a className="ol-down" href={r.case} aria-label={`Bekijk case ${r.name}`} style={{ marginTop: 'auto', paddingTop: '24px', alignSelf: 'flex-start', fontSize: '16px', fontWeight: '600', color: '#0A0F1F', textDecoration: 'none' }}>Bekijk case</a>)}
      </article>
      ))}
      </div>
      </div>
      </section>

      <section className="ol-steps ol-snap" aria-labelledby="ol-cwv-h" style={{ maxWidth: '1440px', margin: '0 auto', padding: '96px 40px', boxSizing: 'border-box', minHeight: 'calc(100vh - 104px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="ol-why-top" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '64px', alignItems: 'end' }}>
      <h2 id="ol-cwv-h" className="ol-why-h" style={h2}>Wat Google meet<span style={{ color: '#376EB5' }}>.</span></h2>
      <p style={intro}>Google noemt dit de Core Web Vitals: drie cijfers op basis van echte bezoekers. Groen op alle drie is het doel.</p>
      </div>
      <div className="ol-steps-grid" style={{ marginTop: '72px', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '40px' }}>
      {VITALS.map((v, i) => (
      <div key={i} className="ol-step-col" style={{ borderTop: '2px solid #0A0F1F', paddingTop: '28px' }}>
      <p style={{ margin: '0', fontSize: 'clamp(48px, 5vw, 72px)', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.04em', color: '#376EB5', whiteSpace: 'nowrap' }}>{v.n}</p>
      <h3 style={{ margin: '28px 0 0', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em' }}>{v.t} <span style={{ fontWeight: '600', color: '#5B6275' }}>({v.k})</span></h3>
      <p style={{ margin: '14px 0 0', fontSize: '17px', lineHeight: '1.6', color: '#3A4256' }}>{v.d}</p>
      </div>
      ))}
      </div>
      <p style={{ margin: '56px 0 0', fontSize: '16px', lineHeight: '1.6', color: '#3A4256' }}>Nieuw in PageSpeed: agentisch browsen. Die check meet of AI-assistenten je pagina goed kunnen laden en lezen. Ook daar sturen we op.</p>
      </section>

      <section className="ol-steps ol-snap" aria-labelledby="ol-steps-h" style={{ maxWidth: '1440px', margin: '0 auto', padding: '96px 40px', boxSizing: 'border-box', minHeight: 'calc(100vh - 104px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="ol-why-top" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '64px', alignItems: 'end' }}>
      <h2 id="ol-steps-h" className="ol-why-h" style={h2}>Eerst de bron, dan de boost<span style={{ color: '#376EB5' }}>.</span></h2>
      <p style={intro}>De meeste snelheidsproblemen los je niet op met een plugin. Daarom werken we altijd in deze volgorde.</p>
      </div>
      <div className="ol-steps-grid ol-steps-4" style={{ marginTop: '72px', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '40px' }}>
      {STAPPEN.map((s, i) => (
      <div key={i} className="ol-step-col" style={{ borderTop: '2px solid #0A0F1F', paddingTop: '28px' }}>
      <p style={{ margin: '0', fontSize: '72px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.04em', color: '#376EB5' }}>{String(i + 1).padStart(2, '0')}</p>
      <h3 style={{ margin: '28px 0 0', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em' }}>{s.t}</h3>
      <p style={{ margin: '14px 0 0', fontSize: '17px', lineHeight: '1.6', color: '#3A4256' }}>{s.d}</p>
      </div>
      ))}
      </div>
      <p style={{ margin: '56px 0 0', fontSize: '16px', lineHeight: '1.6', color: '#3A4256' }}>Voor WordPress met Avada, Divi of Bricks, en voor headless Next.js websites.</p>
      </section>

      <section className="ol-faq ol-snap" aria-labelledby="ol-faq-h" style={{ maxWidth: '1440px', margin: '0 auto', padding: '96px 40px', boxSizing: 'border-box', minHeight: 'calc(100vh - 104px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="ol-faq-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.8fr) minmax(0, 1.2fr)', gap: '64px', alignItems: 'start' }}>
      <div>
      <h2 id="ol-faq-h" className="ol-why-h" style={h2}>Veelgestelde vragen<span style={{ color: '#376EB5' }}>.</span></h2>
      <p style={{ margin: '24px 0 0', fontSize: '18px', lineHeight: '1.6', color: '#3A4256', maxWidth: '420px' }}>Staat je vraag er niet bij? Bel ons op 020 820 20 22, dan krijg je direct een eerlijk antwoord.</p>
      </div>
      <div style={{ borderTop: '1px solid #DCE1EA' }}>
      {faqs.map((q, $index) => (<Fragment key={$index}>
      <div style={{ borderBottom: '1px solid #DCE1EA' }}>
      <button className="ol-faqbtn" type="button" onClick={q.toggle} aria-expanded={q.exp} style={{ width: '100%', background: 'transparent', border: '0', padding: '24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', fontFamily: 'inherit', textAlign: 'left', color: '#0A0F1F' }}>
      <span style={{ fontSize: '20px', fontWeight: '600', letterSpacing: '-0.01em' }}>{q.q}</span>
      <span aria-hidden="true" className="ol-faqplus" style={{ flexShrink: '0', position: 'relative', width: '16px', height: '16px', transform: q.rot }}><span style={{ position: 'absolute', left: '0', right: '0', top: '7px', height: '2px', background: '#0A0F1F', borderRadius: '1px' }}></span><span style={{ position: 'absolute', top: '0', bottom: '0', left: '7px', width: '2px', background: '#0A0F1F', borderRadius: '1px' }}></span></span>
      </button>
      {q.open && (<>
      <p style={{ margin: '0', padding: '0 56px 26px 0', fontSize: '17px', lineHeight: '1.65', color: '#3A4256' }}>{q.a}</p>
      </>)}
      </div>
      </Fragment>))}
      </div>
      </div>
      </section>
    </div>
  );
}
