'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { SEO_FAQS } from './seoFaqs';

// SEO specialist 2027: overgenomen uit het Claude Design-bestand (SEO.dc.html).

const WORD = 'SEO specialist';

const SERVICES = [
  { title: 'SEO audit', desc: 'We onderzoeken de huidige SEO-prestaties van je website: techniek, content, structuur en AI-zichtbaarheid. Met de audit als uitgangspunt maken we een strategie waarmee je je doelen haalt.', items: ['Technische analyse (Core Web Vitals, indexering, crawlability)', 'Content audit en keyword gap analyse', 'Concurrentieonderzoek en marktpositie', 'AI-visibility check (ChatGPT, Perplexity, Google AI)', 'Structured data implementatie assessment', 'Health score streven naar 100% (Ahrefs Site Audit)'] },
  { title: 'Zoekwoordfocus', desc: 'Elke belangrijke zoekterm krijgt één sterke pagina. We bouwen pillar- en cornerstonepagina\'s rond je kernonderwerpen en zorgen dat je eigen pagina\'s niet met elkaar concurreren.', items: ['Eén zoekwoord, één pagina: heldere keyword mapping', 'Pillar- en cornerstonepagina\'s per kernonderwerp', 'Interne concurrentie (kannibalisatie) opsporen en oplossen', 'Zoekintentie per pagina scherp', 'Interne links die autoriteit naar de juiste pagina sturen', 'Kansen in Google en in AI-antwoorden'] },
  { title: 'On-page SEO', desc: 'We zorgen dat zoekmachines en AI-modellen begrijpen waar je pagina\'s over gaan. Volgens de laatste richtlijnen, zonder over te optimaliseren.', items: ['Meta titles en descriptions', 'Heading structuur (H1 tot H6) en semantische HTML', 'Internal linking strategie', 'Image optimization (alt tags, compressie)', 'Content optimalisatie voor Google en AI', 'URL structuur en breadcrumbs'] },
  { title: 'Technische SEO', desc: 'Een website die technisch niet in orde is, wordt slecht gevonden. We scannen je site volledig, lossen de problemen op en houden Core Web Vitals, snelheid en crawlability scherp.', items: ['Core Web Vitals optimalisatie (LCP, INP, CLS)', 'Site speed en performance', 'Mobile-first en responsive check', 'Crawl budget management', 'XML sitemaps en robots.txt', 'HTTPS, canonicals en redirects'] },
  { title: 'Structured data en AI-leesbare content', desc: 'Content die niemand vindt, mist zijn doel. Met structured data en semantische markup maken we je content begrijpelijk voor bezoekers, zoekmachines en AI-modellen.', items: ['Schema.org markup implementatie', 'AI-leesbare content structuur', 'Content voor AI-citaties (GEO)', 'Semantische HTML voor betere context', 'Knowledge Graph optimalisatie', 'Rich results en featured snippets'] },
  { title: 'SEO strategie', desc: 'Google verandert voortdurend. Wij zorgen voor een sitestructuur, keyword targeting en strategie die werkt in Google en AI-platformen, en die actueel blijft.', items: ['Sitestructuur en informatie-architectuur', 'Keyword targeting en content roadmap', 'Link building en digital PR', 'Internationale SEO en hreflang', 'AI-visibility strategie (GEO)', 'Maandelijkse monitoring en bijsturing'] },
];


export default function SeoView({ logosTop = [], logosBottom = [] }) {
  // Scramble van "SEO specialist"
  const [now, setNow] = useState(0);
  const [start, setStart] = useState(Infinity);
  // Draaitrommel
  const [fanActive, setFanActive] = useState(0);
  const [fanHeld, setFanHeld] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);
  const touched = useRef(false);
  const heldRef = useRef(false);
  const activeRef = useRef(0);
  const lastDrum = useRef(0);
  heldRef.current = fanHeld;
  activeRef.current = fanActive;

  useEffect(() => {
    const reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    let anim = null;
    let fanTimer = null;
    if (reduced) {
      setStart(0);
      setNow(Date.now());
    } else {
      const s0 = Date.now() + 300;
      setStart(s0);
      setNow(Date.now());
      const end = s0 + 280 + WORD.length * 55 + 60;
      anim = setInterval(() => {
        const t = Date.now();
        setNow(t);
        if (t > end) { clearInterval(anim); anim = null; }
      }, 45);
      fanTimer = setInterval(() => {
        if (heldRef.current || touched.current) return;
        setFanActive((a) => (a + 1) % SERVICES.length);
      }, 5000);
    }

    // Scrollen over de trommel draait de trommel, niet de pagina
    const drum = document.querySelector('.ol-drum');
    const onDrumWheel = (e) => {
      const st = e.deltaY > 0 ? 1 : -1;
      const next = activeRef.current + st;
      if (next < 0 || next >= SERVICES.length) return;
      e.preventDefault();
      if (Math.abs(e.deltaY) < 4) return;
      const t = Date.now();
      if (t - lastDrum.current < 420) return;
      lastDrum.current = t;
      touched.current = true;
      setFanActive(next);
    };
    if (drum) drum.addEventListener('wheel', onDrumWheel, { passive: false });
    return () => {
      if (anim) clearInterval(anim);
      if (fanTimer) clearInterval(fanTimer);
      if (drum) drum.removeEventListener('wheel', onDrumWheel);
    };
  }, []);

  // Hero
  const lower = 'abcdefghijklnoprstuvxyz';
  const upper = 'ABCDEFGHJKLNOPRSTUVXYZ';
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
  }
  const dot = done;

  // Draaitrommel
  const n = SERVICES.length;
  const act = fanActive;
  const fan = SERVICES.map((s, i) => {
    let d = i - act;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    const ad = Math.abs(d);
    return {
      title: s.title,
      y: String(d * 84),
      rx: String(-d * 16),
      sc: String(Math.max(0.7, 1 - ad * 0.08)),
      op: String(Math.max(0, 1 - ad * 0.3)),
      bl: String(ad * 1.4),
      z: String(10 - ad),
      fs: d === 0 ? '40' : '30',
      fw: d === 0 ? '800' : '600',
      dot: d === 0 ? '1' : '0',
      cls: d === 0 ? 'is-active' : '',
      pressed: d === 0 ? 'true' : 'false',
      pick: () => { touched.current = true; if (activeRef.current !== i) setFanActive(i); },
    };
  });
  const c0 = SERVICES[act];
  const cur = { num: String(act + 1).padStart(2, '0'), title: c0.title, desc: c0.desc, items: c0.items.map((t2) => ({ t: t2 })) };
  const fanHold = () => setFanHeld(true);
  const fanFree = () => setFanHeld(false);
  const drumKey = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      touched.current = true;
      const st = e.key === 'ArrowDown' ? 1 : -1;
      setFanActive((a) => (a + st + n) % n);
    }
  };

  // Veelgestelde vragen
  const faqs = SEO_FAQS.map((f, i) => ({
    q: f.q, a: f.a,
    open: faqOpen === i,
    exp: faqOpen === i ? 'true' : 'false',
    rot: faqOpen === i ? 'rotate(45deg)' : 'none',
    toggle: () => setFaqOpen((o) => (o === i ? -1 : i)),
  }));

  return (
    <div className="v27 v27-home v27-seo">
      <section className="ol-hero ol-snap" style={{ maxWidth: '1440px', margin: '0 auto', padding: '120px 40px 96px', boxSizing: 'border-box', minHeight: 'calc(100vh - 104px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1 style={{ margin: '0', fontWeight: '800' }}>
      <span className="ol-eyebrow" style={{ display: 'block', fontSize: '15px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5B6275', marginBottom: '32px' }}>SEO bureau Amsterdam, sinds 2008</span>
      <span className="ol-sr">SEO specialist: hoger in Google en zichtbaar in AI.</span>
      <span aria-hidden="true" className="ol-seo-lede" style={{ display: 'block', maxWidth: '880px', fontSize: '36px', fontWeight: '400', lineHeight: '1.3', letterSpacing: '-0.01em', color: '#0A0F1F' }}>Hoger in Google en zichtbaar in AI. Traditionele SEO als fundament, AI-zichtbaarheid als volgende laag.</span>
      <span aria-hidden="true" className="ol-seo-big" style={{ display: 'block', marginTop: '56px', textAlign: 'right', whiteSpace: 'nowrap', fontSize: 'clamp(56px, 10vw, 150px)', lineHeight: '0.95', letterSpacing: '-0.035em' }}>{chars.map((ch, $index) => (<Fragment key={$index}><span style={{ color: ch.color }}>{ch.c}</span></Fragment>))}{dot && (<><span style={{ color: '#376EB5' }}>.</span></>)}</span>
      </h1>

      <div className="ol-hero-row" style={{ marginTop: '72px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '24px 48px' }}>
      <p className="ol-seo-proof" style={{ margin: '0', fontSize: '15px', color: '#5B6275', display: 'flex', flexWrap: 'wrap', gap: '6px 10px' }}>
      <span>Google Partner</span><span aria-hidden="true">·</span><span>5,0 uit 29 Google reviews</span><span aria-hidden="true">·</span><span>150+ websites in beheer</span>
      </p>
      <div className="ol-seo-cta" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px 32px' }}>
      <a className="ol-scroll ol-down" href="#ol-wwd" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '17px', fontWeight: '600', textDecoration: 'none' }}>Bekijk wat we doen</a>
      <a className="ol-pill" href="/contact" style={{ display: 'inline-flex', alignItems: 'center', height: '56px', padding: '0 28px', borderRadius: '999px', background: '#0A0F1F', color: '#FFFFFF', fontSize: '16px', fontWeight: '600', textDecoration: 'none', whiteSpace: 'nowrap' }}>Vraag SEO-advies aan</a>
      </div>
      </div>
      </section>

      <section className="ol-imre ol-snap" aria-labelledby="ol-imre-h" style={{ maxWidth: '1440px', margin: '0 auto', padding: '96px 40px', boxSizing: 'border-box', minHeight: 'calc(100vh - 104px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="ol-imre-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)', gap: '72px', alignItems: 'center' }}>
      <div className="ol-imre-photo" style={{ position: 'relative', aspectRatio: '2 / 3', maxHeight: '680px', borderRadius: '12px', overflow: 'hidden', background: '#DCE7F6' }}>
      <Image src="https://cdn.onlinelabs.nl/wp-content/uploads/2025/11/Imre-Bernath.webp" alt="Imre Bernáth, SEO specialist en oprichter van OnlineLabs" fill sizes="(max-width: 960px) 100vw, 40vw" quality={85} style={{ objectFit: 'cover', objectPosition: 'center 20%' }} />
      <span style={{ position: 'absolute', left: '20px', bottom: '20px', display: 'inline-flex', alignItems: 'center', height: '40px', padding: '0 16px', borderRadius: '6px', background: '#FFFFFF', color: '#0A0F1F', fontSize: '15px', fontWeight: '700' }}>Imre Bernáth</span>
      </div>
      <div>
      <p style={{ margin: '0', fontSize: '15px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5B6275' }}>Je SEO specialist</p>
      <h2 id="ol-imre-h" className="ol-why-h" style={{ margin: '16px 0 0', fontSize: '64px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.035em' }}>Wij zetten de lijnen uit<span style={{ color: '#376EB5' }}>.</span></h2>
      <p style={{ margin: '28px 0 0', fontSize: '20px', lineHeight: '1.6', color: '#3A4256', maxWidth: '660px' }}>Imre Bernáth werkt al 20 jaar aan SEO en bouwde met Teun.ai een eigen platform voor AI-zichtbaarheid. Je spreekt de specialist die het werk ook echt doet.</p>
      <p style={{ margin: '16px 0 0', fontSize: '20px', lineHeight: '1.6', color: '#3A4256', maxWidth: '660px' }}>In deze AI-tijd hoef je geen lijstjes uit ChatGPT af te werken. We bepalen wat voor jouw bedrijf echt verschil maakt, zetten de koers uit en helpen je op weg, zodat je zelf ook weet wat je kunt doen.</p>
      <div className="ol-imre-stats" style={{ marginTop: '44px', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '24px' }}>
      <div style={{ borderTop: '2px solid #0A0F1F', paddingTop: '18px' }}><p style={{ margin: '0', fontSize: '44px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.03em' }}>20 jaar</p><p style={{ margin: '10px 0 0', fontSize: '15px', color: '#5B6275' }}>SEO-ervaring</p></div>
      <div style={{ borderTop: '2px solid #0A0F1F', paddingTop: '18px' }}><p style={{ margin: '0', fontSize: '44px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.03em' }}>150+</p><p style={{ margin: '10px 0 0', fontSize: '15px', color: '#5B6275' }}>websites in beheer</p></div>
      <div style={{ borderTop: '2px solid #0A0F1F', paddingTop: '18px' }}><p style={{ margin: '0', fontSize: '44px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.03em' }}>5,0</p><p style={{ margin: '10px 0 0', fontSize: '15px', color: '#5B6275' }}>uit 29 Google reviews</p></div>
      <div style={{ borderTop: '2px solid #0A0F1F', paddingTop: '18px' }}><p style={{ margin: '0', fontSize: '44px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.03em' }}>Teun.ai</p><p style={{ margin: '10px 0 0', fontSize: '15px', color: '#5B6275' }}>eigen AI-platform</p></div>
      </div>
      </div>
      </div>
      <div className="ol-logowrap" aria-label="Een greep uit onze klanten" style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
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

      <section id="ol-wwd" className="ol-wwd ol-snap" aria-labelledby="ol-wwd-h" style={{ marginTop: '30px', padding: '30px 16px 16px' }}>
      <div className="ol-wwd-panel" style={{ maxWidth: '1600px', margin: '0 auto', background: '#F4F6FA', borderRadius: '12px', padding: '64px 56px', boxSizing: 'border-box', minHeight: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="ol-why-top" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '64px', alignItems: 'end' }}>
      <h2 id="ol-wwd-h" className="ol-why-h" style={{ margin: '0', fontSize: '64px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.035em' }}>Wat we doen<span style={{ color: '#376EB5' }}>.</span></h2>
      <p style={{ margin: '0', fontSize: '20px', lineHeight: '1.6', color: '#3A4256' }}>Zes onderdelen die samen zorgen dat je gevonden wordt in Google en genoemd in AI.</p>
      </div>

      <div className="ol-fanwrap" style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '64px', alignItems: 'center' }}>
      <div className="ol-drum" tabIndex="0" role="listbox" aria-label="Wat we doen" onMouseEnter={fanHold} onMouseLeave={fanFree} onKeyDown={drumKey} style={{ position: 'relative', height: '560px', borderRadius: '12px', background: '#DCE7F6', overflow: 'hidden', perspective: '900px', WebkitMaskImage: 'linear-gradient(180deg, transparent, #000 22%, #000 78%, transparent)', maskImage: 'linear-gradient(180deg, transparent, #000 22%, #000 78%, transparent)' }}>
      {fan.map((f, $index) => (<Fragment key={$index}>
      <button className={`ol-drumitem ${f.cls}`} type="button" role="option" aria-selected={f.pressed} onClick={f.pick} style={{ position: 'absolute', left: '48px', right: '32px', top: '50%', height: '72px', marginTop: '-36px', background: 'transparent', border: '0', padding: '0', display: 'flex', alignItems: 'center', gap: '18px', fontFamily: 'inherit', textAlign: 'left', color: '#0A0F1F', transform: `translateY(${f.y}px) rotateX(${f.rx}deg) scale(${f.sc})`, opacity: f.op, filter: `blur(${f.bl}px)`, zIndex: f.z }}>
      <span aria-hidden="true" style={{ flexShrink: '0', width: '14px', height: '14px', borderRadius: '50%', background: '#376EB5', opacity: f.dot }}></span>
      <span style={{ fontSize: `${f.fs}px`, fontWeight: f.fw, letterSpacing: '-0.025em', lineHeight: '1.1', whiteSpace: 'nowrap' }}>{f.title}</span>
      </button>
      </Fragment>))}
      </div>

      <div key={cur.num} id="ol-fan-panel" className="ol-fanpanel" aria-live="polite">
      <p style={{ margin: '0', fontSize: '15px', fontWeight: '600', color: '#5B6275' }}>{cur.num} / 06</p>
      <h3 style={{ margin: '12px 0 0', fontSize: '44px', fontWeight: '800', lineHeight: '1.05', letterSpacing: '-0.03em' }}>{cur.title}</h3>
      <p style={{ margin: '20px 0 0', fontSize: '18px', lineHeight: '1.6', color: '#3A4256' }}>{cur.desc}</p>
      <ul style={{ listStyle: 'none', margin: '28px 0 0', padding: '0', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', columnGap: '32px' }}>
      {cur.items.map((it, $index) => (<Fragment key={$index}>
      <li style={{ borderTop: '1px solid #DCE1EA', padding: '14px 0', fontSize: '16px', lineHeight: '1.45', color: '#0A0F1F' }}>{it.t}</li>
      </Fragment>))}
      </ul>
      </div>
      </div>
      </div>
      </section>

      <section className="ol-steps ol-snap" aria-labelledby="ol-steps-h" style={{ maxWidth: '1440px', margin: '0 auto', padding: '96px 40px', boxSizing: 'border-box', minHeight: 'calc(100vh - 104px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="ol-why-top" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '64px', alignItems: 'end' }}>
      <h2 id="ol-steps-h" className="ol-why-h" style={{ margin: '0', fontSize: '64px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.035em' }}>Zo pakken we het aan<span style={{ color: '#376EB5' }}>.</span></h2>
      <p style={{ margin: '0', fontSize: '20px', lineHeight: '1.6', color: '#3A4256' }}>Geen black box. Je weet altijd wat we doen, waarom we het doen en wat het oplevert.</p>
      </div>
      <div className="ol-steps-grid" style={{ marginTop: '72px', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '40px' }}>
      <div className="ol-step-col" style={{ borderTop: '2px solid #0A0F1F', paddingTop: '28px' }}>
      <p style={{ margin: '0', fontSize: '72px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.04em', color: '#376EB5' }}>01</p>
      <h3 style={{ margin: '28px 0 0', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em' }}>Analyse en strategie</h3>
      <p style={{ margin: '14px 0 0', fontSize: '17px', lineHeight: '1.6', color: '#3A4256' }}>We brengen je SEO-status in kaart en maken een groeiplan dat past bij jouw doelen.</p>
      </div>
      <div className="ol-step-col" style={{ borderTop: '2px solid #0A0F1F', paddingTop: '28px' }}>
      <p style={{ margin: '0', fontSize: '72px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.04em', color: '#376EB5' }}>02</p>
      <h3 style={{ margin: '28px 0 0', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em' }}>Optimalisatie en content</h3>
      <p style={{ margin: '14px 0 0', fontSize: '17px', lineHeight: '1.6', color: '#3A4256' }}>We verbeteren techniek, structuur en content, voor Google en voor AI-platformen.</p>
      </div>
      <div className="ol-step-col" style={{ borderTop: '2px solid #0A0F1F', paddingTop: '28px' }}>
      <p style={{ margin: '0', fontSize: '72px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.04em', color: '#376EB5' }}>03</p>
      <h3 style={{ margin: '28px 0 0', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em' }}>Inzicht en bijsturing</h3>
      <p style={{ margin: '14px 0 0', fontSize: '17px', lineHeight: '1.6', color: '#3A4256' }}>Je krijgt realtime SEO-data en maandelijkse updates. Wat niet werkt, sturen we bij.</p>
      </div>
      </div>
      <p className="ol-steps-meta" style={{ margin: '56px 0 0', fontSize: '15px', color: '#5B6275', display: 'flex', flexWrap: 'wrap', gap: '6px 10px' }}><span>Eerste meetbare verbetering na 3 tot 6 maanden</span><span aria-hidden="true">·</span><span>Structurele groei na 12 maanden of langer</span></p>
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
