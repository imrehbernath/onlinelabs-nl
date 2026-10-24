'use client';

import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import { WEB_FAQS } from './webFaqs';

// Website laten maken 2027: overgenomen uit het Claude Design-bestand (WEB.dc.html).

const WORD = 'Website op maat';
const CDN = 'https://cdn.onlinelabs.nl/wp-content/uploads';

const PROJECTEN = [
  { name: 'De Smaak van Italië', href: 'https://www.desmaakvanitalie.nl', img: `${CDN}/2026/10/De-Smaak-van-Italie-project.webp`, alt: 'Website De Smaak van Italië' },
  { name: 'Grachtenmuseum', href: 'https://grachten.museum', img: `${CDN}/2026/07/Het-Grachtenmuseum-project.webp`, alt: 'Website Grachtenmuseum' },
  { name: 'HvanA', href: 'https://hvana.nl', img: `${CDN}/2025/11/HvanA.webp`, alt: 'Website Hogeschool van Amsterdam' },
  { name: 'HM2 kwadraat', href: 'https://www.hmkwadraat.com', img: `${CDN}/2026/07/Project-HM2-kwadraat.webp`, alt: 'Project HM2 kwadraat' },
  { name: 'Rederij Navigo', href: 'https://navigoamsterdam.nl', img: `${CDN}/2025/11/Project-Rederij-Navigo.webp`, alt: 'Project Rederij Navigo' },
  { name: 'Sinck&Ko', href: 'https://www.sinck-ko.nl', img: `${CDN}/2026/10/Sinck-en-Ko-project.webp`, alt: 'Website Sinck&Ko' },
  { name: 'De Muider Compagnie', href: 'https://www.muidercompagnie.nl', img: `${CDN}/2025/11/Muider-Compagnie.webp`, alt: 'Website De Muider Compagnie' },
  { name: 'Human Rights Initiatives', href: 'https://www.humanrightsinitiatives.com', img: `${CDN}/2025/11/Human-Rights-Initiatives.webp`, alt: 'Website Human Rights Initiatives' },
  { name: 'Farber Zwaanswijk Advocaten', href: 'https://www.fzadvocaten.nl', img: `${CDN}/2026/10/Farber-Zwaanswijk-Advocaten-project.webp`, alt: 'Website Farber Zwaanswijk Advocaten' },
];

const lower = 'abcdefghijklnoprstuvxyz';
const upper = 'ABCDEFGHJKLNOPRSTUVXYZ';

export default function WebView({ logosTop = [], logosBottom = [] }) {
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

  const projecten = PROJECTEN;

  // Veelgestelde vragen
  const faqs = WEB_FAQS.map((f, i) => ({
    q: f.q, a: f.a,
    open: faqOpen === i,
    exp: faqOpen === i ? 'true' : 'false',
    rot: faqOpen === i ? 'rotate(45deg)' : 'none',
    toggle: () => setFaqOpen((o) => (o === i ? -1 : i)),
  }));

  return (
    <div className="v27 v27-home v27-web">
      <section className="ol-hero ol-snap" style={{ maxWidth: '1440px', margin: '0 auto', padding: '120px 40px 96px', boxSizing: 'border-box', minHeight: 'calc(100vh - 104px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1 style={{ margin: '0', fontWeight: '800' }}>
      <span className="ol-eyebrow" style={{ display: 'block', fontSize: '15px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5B6275', marginBottom: '32px' }}>Website laten maken, sinds 2008</span>
      <span className="ol-sr">Website laten maken: geen template, maar vakwerk.</span>
      <span aria-hidden="true" className="ol-seo-lede" style={{ display: 'block', maxWidth: '900px', fontSize: '36px', fontWeight: '400', lineHeight: '1.3', letterSpacing: '-0.01em', color: '#0A0F1F' }}>Geen template, maar vakwerk. Een eigen design, razendsnel en gebouwd om gevonden te worden in Google en AI.</span>
      <span aria-hidden="true" className="ol-seo-big" style={{ display: 'block', marginTop: '56px', textAlign: 'right', whiteSpace: 'nowrap', fontSize: 'clamp(56px, 8.4vw, 132px)', lineHeight: '0.95', letterSpacing: '-0.035em' }}>{chars.map((ch, $index) => (<Fragment key={$index}><span style={{ color: ch.color }}>{ch.c}</span></Fragment>))}<span style={{ color: dotColor }}>.</span></span>
      </h1>

      <div className="ol-hero-row" style={{ marginTop: '72px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '24px 48px' }}>
      <p className="ol-seo-proof" style={{ margin: '0', fontSize: '15px', color: '#5B6275', display: 'flex', flexWrap: 'wrap', gap: '6px 10px' }}>
      <span>Google Partner</span><span aria-hidden="true">·</span><span>5,0 uit 29 Google reviews</span><span aria-hidden="true">·</span><span>150+ websites in beheer</span>
      </p>
      <div className="ol-seo-cta" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px 32px' }}>
      <a className="ol-scroll ol-down" href="#ol-portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '17px', fontWeight: '600', textDecoration: 'none' }}>Bekijk ons werk</a>
      <a className="ol-pill" href="/contact?skill=website" style={{ display: 'inline-flex', alignItems: 'center', height: '56px', padding: '0 28px', borderRadius: '999px', background: '#0A0F1F', color: '#FFFFFF', fontSize: '16px', fontWeight: '600', textDecoration: 'none', whiteSpace: 'nowrap' }}>Gratis adviesgesprek</a>
      </div>
      </div>
      </section>

      <section className="ol-logosec" aria-label="Een greep uit onze klanten" style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 40px 72px', boxSizing: 'border-box' }}>
      <div className="ol-logowrap" aria-label="Een greep uit onze klanten" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div className="ol-logos" style={{ overflow: 'hidden', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)', maskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)' }}>
      <div className="ol-logotrack" style={{ display: 'flex', alignItems: 'center', width: 'max-content' }}>
      {logosTop.map((l, $index) => (<Fragment key={$index}>
      <a className="ol-logolink" href={l.href} target="_blank" rel="noopener noreferrer" aria-label={`Bezoek ${l.n} website`} aria-hidden={l.dup} tabIndex={l.tab} style={{ display: 'block', flexShrink: '0', marginRight: '48px' }}><img className="ol-logoimg" src={l.src} alt={l.n} loading="lazy" decoding="async" style={{ height: '96px', width: 'auto', display: 'block' }} /></a>
      </Fragment>))}
      </div>
      </div>
      <div className="ol-logos" style={{ overflow: 'hidden', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)', maskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)' }}>
      <div className="ol-logotrack ol-logorev" style={{ display: 'flex', alignItems: 'center', width: 'max-content' }}>
      {logosBottom.map((l, $index) => (<Fragment key={$index}>
      <a className="ol-logolink" href={l.href} target="_blank" rel="noopener noreferrer" aria-label={`Bezoek ${l.n} website`} aria-hidden={l.dup} tabIndex={l.tab} style={{ display: 'block', flexShrink: '0', marginRight: '48px' }}><img className="ol-logoimg" src={l.src} alt={l.n} loading="lazy" decoding="async" style={{ height: '96px', width: 'auto', display: 'block' }} /></a>
      </Fragment>))}
      </div>
      </div>
      </div>
      </section>

      <section id="ol-portfolio" className="ol-wwd ol-snap" aria-labelledby="ol-port-h" style={{ marginTop: '30px', padding: '30px 16px 16px' }}>
      <div className="ol-wwd-panel" style={{ maxWidth: '1600px', margin: '0 auto', background: '#F4F6FA', borderRadius: '12px', padding: '64px 56px', boxSizing: 'border-box', minHeight: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="ol-why-top" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '64px', alignItems: 'end' }}>
      <h2 id="ol-port-h" className="ol-why-h" style={{ margin: '0', fontSize: '64px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.035em' }}>Ons werk<span style={{ color: '#376EB5' }}>.</span></h2>
      <p style={{ margin: '0', fontSize: '20px', lineHeight: '1.6', color: '#3A4256' }}>Een greep uit de websites die we bouwden. Elk met een eigen design, niets van de lopende band.</p>
      </div>
      <div className="ol-port-grid" style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '32px 24px' }}>
      {projecten.map((p, $index) => (<Fragment key={$index}>
      <a className="ol-portcard" href={p.href} target="_blank" rel="noopener" aria-label={`Bekijk de website van ${p.name}`} style={{ display: 'block', color: '#0A0F1F', textDecoration: 'none' }}>
      <span className="ol-portimg" style={{ position: 'relative', display: 'block', aspectRatio: '3 / 2', borderRadius: '10px', overflow: 'hidden', background: '#DCE7F6' }}>
      <Image src={p.img} alt={p.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw" quality={78} style={{ objectFit: 'cover', objectPosition: 'top center' }} />
      <span className="ol-portover" style={{ position: 'absolute', left: '16px', bottom: '16px', display: 'inline-flex', alignItems: 'center', height: '40px', padding: '0 16px', borderRadius: '6px', background: '#FFFFFF', color: '#0A0F1F', fontSize: '14px', fontWeight: '700' }}>Bekijk website</span>
      </span>
      <span style={{ display: 'block', marginTop: '14px', fontSize: '20px', fontWeight: '600', letterSpacing: '-0.01em' }}>{p.name}</span>
      </a>
      </Fragment>))}
      </div>
      <a className="ol-scroll ol-down" href="/ons-werk" style={{ marginTop: '32px', alignSelf: 'flex-start', fontSize: '17px', fontWeight: '600', textDecoration: 'none' }}>Alle cases</a>
      </div>
      </section>

      <section className="ol-steps ol-snap" aria-labelledby="ol-steps-h" style={{ maxWidth: '1440px', margin: '0 auto', padding: '96px 40px', boxSizing: 'border-box', minHeight: 'calc(100vh - 104px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="ol-why-top" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '64px', alignItems: 'end' }}>
      <h2 id="ol-steps-h" className="ol-why-h" style={{ margin: '0', fontSize: '64px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.035em' }}>Zo pakken we het aan<span style={{ color: '#376EB5' }}>.</span></h2>
      <p style={{ margin: '0', fontSize: '20px', lineHeight: '1.6', color: '#3A4256' }}>Van eerste gesprek tot livegang. Websites die niet alleen mooi zijn, maar ook scoren in Google en AI.</p>
      </div>
      <div className="ol-steps-grid" style={{ marginTop: '72px', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '40px' }}>
      <div className="ol-step-col" style={{ borderTop: '2px solid #0A0F1F', paddingTop: '28px' }}>
      <p style={{ margin: '0', fontSize: '72px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.04em', color: '#376EB5' }}>01</p>
      <h3 style={{ margin: '28px 0 0', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em' }}>Strategie en ontwerp</h3>
      <p style={{ margin: '14px 0 0', fontSize: '17px', lineHeight: '1.6', color: '#3A4256' }}>We bespreken je doelen en doelgroep. Daarop maken we een ontwerp dat converteert en vindbaar is.</p>
      </div>
      <div className="ol-step-col" style={{ borderTop: '2px solid #0A0F1F', paddingTop: '28px' }}>
      <p style={{ margin: '0', fontSize: '72px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.04em', color: '#376EB5' }}>02</p>
      <h3 style={{ margin: '28px 0 0', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em' }}>Ontwikkeling en SEO</h3>
      <p style={{ margin: '14px 0 0', fontSize: '17px', lineHeight: '1.6', color: '#3A4256' }}>We bouwen je site in WordPress of Next.js. SEO en AI-zichtbaarheid zitten er vanaf dag één in.</p>
      </div>
      <div className="ol-step-col" style={{ borderTop: '2px solid #0A0F1F', paddingTop: '28px' }}>
      <p style={{ margin: '0', fontSize: '72px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.04em', color: '#376EB5' }}>03</p>
      <h3 style={{ margin: '28px 0 0', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em' }}>Lancering en groei</h3>
      <p style={{ margin: '14px 0 0', fontSize: '17px', lineHeight: '1.6', color: '#3A4256' }}>Na een grondige test gaat je site live. Daarna blijven we optimaliseren voor Google en AI.</p>
      </div>
      </div>
      <p style={{ margin: '56px 0 0', fontSize: '16px', lineHeight: '1.6', color: '#3A4256' }}>Je website is na oplevering helemaal van jou: design, code en content.</p>
      </section>

      <section className="ol-faq ol-snap" aria-labelledby="ol-faq-h" style={{ maxWidth: '1440px', margin: '0 auto', padding: '96px 40px', boxSizing: 'border-box', minHeight: 'calc(100vh - 104px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="ol-faq-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.8fr) minmax(0, 1.2fr)', gap: '64px', alignItems: 'start' }}>
      <div>
      <h2 id="ol-faq-h" className="ol-why-h" style={{ margin: '0', fontSize: '64px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.035em' }}>Veelgestelde vragen<span style={{ color: '#376EB5' }}>.</span></h2>
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
