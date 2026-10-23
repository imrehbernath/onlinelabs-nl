'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { GEO_FAQS } from './geoFaqs';

// GEO optimalisatie 2027: overgenomen uit het Claude Design-bestand (GEO.dc.html).

const WORD = 'GEO optimalisatie';
const AI_WORDS = ['ChatGPT', 'Perplexity', 'Gemini', 'Google AI'];
const TEUN_API = 'https://teun.ai';

const COMPARE = [
  { k: 'Basis', seo: 'Crawlers en indexatie', ai: 'Trainingsdata en prompts' },
  { k: 'Focus', seo: 'Zoekwoorden en backlinks', ai: 'Entiteiten en context' },
  { k: 'Resultaat', seo: 'Een positie in de zoekresultaten', ai: 'Een vermelding in het antwoord' },
  { k: 'Formule', seo: 'Techniek + content = ranking', ai: 'Herkenning + autoriteit = vermelding' },
  { k: 'Gebruiker', seo: 'Kiest zelf uit een lijst met links', ai: 'Krijgt direct een antwoord' },
];

const lower = 'abcdefghijklnoprstuvxyz';
const upper = 'ABCDEFGHJKLNOPRSTUVXYZ';
const rnd = (c) => {
  const pool = c >= 'A' && c <= 'Z' ? upper : lower;
  return pool[Math.floor(Math.random() * pool.length)];
};

export default function GeoView({ logosTop = [], logosBottom = [] }) {
  const [now, setNow] = useState(0);
  const [start, setStart] = useState(Infinity);
  const [reduced, setReduced] = useState(false);
  const [cmpAi, setCmpAi] = useState(false);
  const [tIdx, setTIdx] = useState(0);
  const [tStart, setTStart] = useState(-Infinity);
  const [faqOpen, setFaqOpen] = useState(0);
  // Scanformulier (Teun.ai)
  const [form, setForm] = useState({ companyName: '', companyCategory: '', website: '' });
  const [keywords, setKeywords] = useState([]);
  const [scanError, setScanError] = useState(null);
  const lastUrl = useRef('');
  const extracting = useRef(false);
  const teunVisible = useRef(false);

  useEffect(() => {
    const isReduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setReduced(isReduced);
    if (isReduced) {
      setStart(0);
      setNow(Date.now());
      return undefined;
    }
    const s0 = Date.now() + 300;
    setStart(s0);
    setNow(Date.now());
    const heroEnd = s0 + 280 + WORD.length * 55 + 60;
    let ts = s0 + 1300;
    let ti = 0;
    setTStart(ts);
    // Eén timer: hero-scramble en het wisselende AI-platform
    // Het wisselende AI-platform alleen laten lopen als het blok in beeld is
    const teun = document.getElementById('ol-scan');
    let io = null;
    if (teun && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(([en]) => { teunVisible.current = en.isIntersecting; });
      io.observe(teun);
    } else teunVisible.current = true;
    const anim = setInterval(() => {
      const t = Date.now();
      const w = AI_WORDS[ti];
      if (t > heroEnd && !teunVisible.current) return;
      if (t > ts + 280 + w.length * 55 + 2600) {
        ti = (ti + 1) % AI_WORDS.length;
        ts = t;
        setTIdx(ti);
        setTStart(ts);
      }
      // Alleen verversen terwijl er iets beweegt
      if (t < heroEnd || t < ts + 280 + AI_WORDS[ti].length * 55 + 60) setNow(t);
    }, 50);
    return () => { clearInterval(anim); if (io) io.disconnect(); };
  }, []);

  // Website invullen: Teun.ai haalt zoekwoorden, naam en branche op
  useEffect(() => {
    const url = form.website.trim();
    if (!url || !url.includes('.') || url === lastUrl.current) return undefined;
    const timer = setTimeout(async () => {
      if (extracting.current) return;
      lastUrl.current = url;
      extracting.current = true;
      try {
        const res = await fetch(`${TEUN_API}/api/extract-keywords`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.keywords && data.keywords.length) setKeywords(data.keywords);
          setForm((f) => ({
            ...f,
            companyName: f.companyName || data.companyName || '',
            companyCategory: f.companyCategory || data.category || '',
          }));
        }
      } catch (e) {
        // Zoekwoorden zijn optioneel, de scan werkt ook zonder
      } finally {
        extracting.current = false;
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [form.website]);

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
        chars.push({ c: rnd(c), color: '#376EB5' });
      }
    }
  } else {
    for (let j = 0; j < WORD.length; j++) chars.push({ c: WORD[j], color: 'transparent' });
  }
  const dotColor = done ? '#376EB5' : 'transparent';

  // Vergelijking
  const ai = cmpAi;
  const cmp = COMPARE.map((r) => ({ k: r.k, v: ai ? r.ai : r.seo, color: ai ? '#376EB5' : '#0A0F1F' }));
  const seoPressed = ai ? 'false' : 'true';
  const aiPressed = ai ? 'true' : 'false';
  const seoBg = ai ? 'transparent' : '#0A0F1F';
  const seoFg = ai ? '#3A4256' : '#FFFFFF';
  const aiBg = ai ? '#376EB5' : 'transparent';
  const aiFg = ai ? '#FFFFFF' : '#3A4256';
  const pickSeo = () => setCmpAi(false);
  const pickAi = () => setCmpAi(true);

  // Teun.ai: wisselend AI-platform
  const tw = AI_WORDS[tIdx];
  const tt = now - tStart;
  const tChars = [];
  for (let j = 0; j < tw.length; j++) {
    const c = tw[j];
    if (reduced || c === ' ' || tt < 0 || tt >= 280 + j * 55) tChars.push({ c, color: '#6FA3E6' });
    else tChars.push({ c: rnd(c), color: '#FFFFFF' });
  }

  // Scan starten op Teun.ai
  const setField = (k) => (e) => { const v = e.target.value; setForm((f) => ({ ...f, [k]: v })); };
  const onScan = (e) => {
    e.preventDefault();
    if (!form.companyName.trim() || !form.companyCategory.trim() || !form.website.trim()) {
      setScanError('Vul bedrijfsnaam, branche en website in.');
      return;
    }
    setScanError(null);
    const params = new URLSearchParams();
    params.set('company', form.companyName.trim());
    params.set('category', form.companyCategory.trim());
    params.set('website', form.website.trim());
    if (keywords.length) params.set('keywords', keywords.join(', '));
    params.set('ref', 'onlinelabs');
    params.set('autostart', 'true');
    window.open(`${TEUN_API}/tools/ai-visibility?${params.toString()}`, '_blank', 'noopener');
  };

  // Veelgestelde vragen
  const faqs = GEO_FAQS.map((f, i) => ({
    q: f.q, a: f.a,
    open: faqOpen === i,
    exp: faqOpen === i ? 'true' : 'false',
    rot: faqOpen === i ? 'rotate(45deg)' : 'none',
    toggle: () => setFaqOpen((o) => (o === i ? -1 : i)),
  }));

  return (
    <div className="v27 v27-home v27-geo">
      <section className="ol-hero ol-snap" style={{ maxWidth: '1440px', margin: '0 auto', padding: '120px 40px 96px', boxSizing: 'border-box', minHeight: 'calc(100vh - 104px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1 style={{ margin: '0', fontWeight: '800' }}>
      <span className="ol-eyebrow" style={{ display: 'block', fontSize: '15px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5B6275', marginBottom: '32px' }}>GEO bureau Amsterdam, sinds 2023 actief in AI-zichtbaarheid</span>
      <span className="ol-sr">GEO optimalisatie: word het antwoord in ChatGPT en AI.</span>
      <span aria-hidden="true" className="ol-seo-lede" style={{ display: 'block', maxWidth: '900px', fontSize: '36px', fontWeight: '400', lineHeight: '1.3', letterSpacing: '-0.01em', color: '#0A0F1F' }}>Word het antwoord in ChatGPT, Perplexity, Claude en Google AI. Wij zorgen dat AI je merk kent, vertrouwt en noemt.</span>
      <span aria-hidden="true" className="ol-seo-big" style={{ display: 'block', marginTop: '56px', textAlign: 'right', whiteSpace: 'nowrap', fontSize: 'clamp(56px, 8.4vw, 132px)', lineHeight: '0.95', letterSpacing: '-0.035em' }}>{chars.map((ch, $index) => (<Fragment key={$index}><span style={{ color: ch.color }}>{ch.c}</span></Fragment>))}<span style={{ color: dotColor }}>.</span></span>
      </h1>

      <div className="ol-hero-row" style={{ marginTop: '72px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '24px 48px' }}>
      <p className="ol-seo-proof" style={{ margin: '0', fontSize: '15px', color: '#5B6275', display: 'flex', flexWrap: 'wrap', gap: '6px 10px' }}>
      <span>Google Partner</span><span aria-hidden="true">·</span><span>5,0 uit 29 Google reviews</span><span aria-hidden="true">·</span><span>Bouwer van Teun.ai</span>
      </p>
      <div className="ol-seo-cta" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px 32px' }}>
      <a className="ol-scroll ol-down" href="#ol-geo" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '17px', fontWeight: '600', textDecoration: 'none' }}>Wat is GEO</a>
      <a className="ol-pill" href="#ol-scan" style={{ display: 'inline-flex', alignItems: 'center', height: '56px', padding: '0 28px', borderRadius: '999px', background: '#0A0F1F', color: '#FFFFFF', fontSize: '16px', fontWeight: '600', textDecoration: 'none', whiteSpace: 'nowrap' }}>Test je AI-zichtbaarheid</a>
      </div>
      </div>
      </section>

      <section className="ol-imre ol-snap" aria-labelledby="ol-imre-h" style={{ maxWidth: '1440px', margin: '0 auto', padding: '96px 40px', boxSizing: 'border-box', minHeight: 'calc(100vh - 104px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="ol-imre-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)', gap: '72px', alignItems: 'center' }}>
      <div className="ol-imre-photo" style={{ position: 'relative', aspectRatio: '2 / 3', maxHeight: '680px', borderRadius: '12px', overflow: 'hidden', background: '#DCE7F6' }}>
      <Image src="https://cdn.onlinelabs.nl/wp-content/uploads/2025/11/Imre-Bernath.webp" alt="Imre Bernáth, SEO specialist en oprichter van OnlineLabs" fill sizes="(max-width: 640px) 100vw, (max-width: 960px) 40vw, 36vw" quality={85} style={{ objectFit: 'cover', objectPosition: 'center 20%' }} />
      <span style={{ position: 'absolute', left: '20px', bottom: '20px', display: 'inline-flex', alignItems: 'center', height: '40px', padding: '0 16px', borderRadius: '6px', background: '#FFFFFF', color: '#0A0F1F', fontSize: '15px', fontWeight: '700' }}>Imre Bernáth</span>
      </div>
      <div>
      <p style={{ margin: '0', fontSize: '15px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5B6275' }}>Je GEO specialist</p>
      <h2 id="ol-imre-h" className="ol-why-h" style={{ margin: '16px 0 0', fontSize: '64px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.035em' }}>Wij zetten de lijnen uit<span style={{ color: '#376EB5' }}>.</span></h2>
      <p style={{ margin: '28px 0 0', fontSize: '20px', lineHeight: '1.6', color: '#3A4256', maxWidth: '660px' }}>Imre Bernáth was twintig jaar geleden een van de eerste SEO specialisten van Nederland. Met Teun.ai was hij er bij GEO weer vroeg bij. Je spreekt de specialist die het werk ook echt doet.</p>
      <p style={{ margin: '16px 0 0', fontSize: '20px', lineHeight: '1.6', color: '#3A4256', maxWidth: '660px' }}>GEO is geen magie en SEO is niet dood: ze gaan hand in hand. We bepalen wat voor jouw bedrijf echt verschil maakt, zetten de koers uit en helpen je op weg.</p>
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

      <section id="ol-geo" className="ol-wwd ol-snap" aria-labelledby="ol-geo-h" style={{ marginTop: '30px', padding: '30px 16px 16px' }}>
      <div className="ol-wwd-panel" style={{ maxWidth: '1600px', margin: '0 auto', background: '#F4F6FA', borderRadius: '12px', padding: '64px 56px', boxSizing: 'border-box', minHeight: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="ol-geo-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '72px', alignItems: 'center' }}>
      <div>
      <h2 id="ol-geo-h" className="ol-why-h" style={{ margin: '0', fontSize: '64px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.035em' }}>Wat is GEO<span style={{ color: '#376EB5' }}>?</span></h2>
      <p style={{ margin: '28px 0 0', fontSize: '20px', lineHeight: '1.6', color: '#3A4256', maxWidth: '620px' }}>GEO staat voor Generative Engine Optimization: je website en content zo inrichten dat ChatGPT, Gemini en Perplexity jou kiezen als antwoord. Die platformen tonen geen lijst met links, ze geven direct antwoord.</p>
      <p style={{ margin: '16px 0 0', fontSize: '20px', lineHeight: '1.6', color: '#3A4256', maxWidth: '620px' }}>GEO vervangt SEO niet, het bouwt erop voort. Zonder sterke SEO-basis heeft AI-optimalisatie geen effect.</p>
      <p style={{ margin: '28px 0 0', paddingTop: '20px', borderTop: '1px solid #DCE1EA', fontSize: '16px', lineHeight: '1.6', color: '#5B6275', maxWidth: '620px' }}>Ook de term AEO, Answer Engine Optimization, kom je tegen. Die richt zich op directe antwoorden in Google, zoals AI Overviews. Wij combineren beide.</p>
      </div>

      <div className="ol-cmp" style={{ background: '#FFFFFF', borderRadius: '12px', padding: '32px', boxSizing: 'border-box' }}>
      <div role="group" aria-label="Vergelijk klassieke SEO met AI-zichtbaarheid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '4px', borderRadius: '999px', background: '#EEF1F6' }}>
      <button className="ol-seg" type="button" aria-pressed={seoPressed} onClick={pickSeo} style={{ height: '48px', border: '0', borderRadius: '999px', fontFamily: 'inherit', fontSize: '16px', fontWeight: '600', background: seoBg, color: seoFg }}>Klassieke SEO</button>
      <button className="ol-seg" type="button" aria-pressed={aiPressed} onClick={pickAi} style={{ height: '48px', border: '0', borderRadius: '999px', fontFamily: 'inherit', fontSize: '16px', fontWeight: '600', background: aiBg, color: aiFg }}>AI-zichtbaarheid</button>
      </div>
      <dl className="ol-cmp-list" aria-live="polite" style={{ margin: '28px 0 0' }}>
      {cmp.map((r, $index) => (<Fragment key={$index}>
      <div style={{ display: 'grid', gridTemplateColumns: '120px minmax(0, 1fr)', gap: '20px', alignItems: 'baseline', borderTop: '1px solid #DCE1EA', padding: '16px 0' }}>
      <dt style={{ fontSize: '14px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5B6275' }}>{r.k}</dt>
      <dd className="ol-cmp-v" style={{ margin: '0', fontSize: '18px', fontWeight: '600', lineHeight: '1.4', whiteSpace: 'nowrap', letterSpacing: '-0.01em', color: r.color }}>{r.v}</dd>
      </div>
      </Fragment>))}
      </dl>
      </div>
      </div>
      </div>
      </section>

      <section id="ol-scan" className="ol-teun ol-snap" aria-labelledby="ol-teun-h" style={{ padding: '16px' }}>
      <div className="ol-teun-panel" style={{ maxWidth: '1600px', margin: '0 auto', background: '#0A0F1F', color: '#FFFFFF', borderRadius: '12px', padding: '72px 56px', boxSizing: 'border-box', minHeight: 'calc(100vh - 136px)', display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)', gap: '72px', alignItems: 'center' }}>
      <div>
      <p style={{ margin: '0', fontSize: '15px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A9AFBF' }}>Teun.ai, ons eigen platform</p>
      <h2 id="ol-teun-h" className="ol-why-h ol-teun-h" style={{ margin: '16px 0 0', fontSize: '64px', fontWeight: '800', lineHeight: '1.05', letterSpacing: '-0.035em' }}><span className="ol-sr">Hoe noemt AI jouw bedrijf?</span><span aria-hidden="true" style={{ display: 'block' }}>Hoe noemt</span><span aria-hidden="true" className="ol-teun-word" style={{ display: 'block', whiteSpace: 'nowrap' }}>{tChars.map((ch, $index) => (<Fragment key={$index}><span style={{ color: ch.color }}>{ch.c}</span></Fragment>))}</span><span aria-hidden="true" style={{ display: 'block' }}>jouw bedrijf<span style={{ color: '#6FA3E6' }}>?</span></span></h2>
      <p style={{ margin: '28px 0 0', fontSize: '20px', lineHeight: '1.6', color: '#A9AFBF', maxWidth: '600px' }}>Teun.ai is gebouwd door Imre, op basis van duizenden scans. Teun stelt AI-modellen de commerciële vragen die jouw klanten stellen en laat zien of jij in het antwoord staat.</p>
      <ul style={{ listStyle: 'none', margin: '32px 0 0', padding: '0', maxWidth: '600px' }}>
      <li style={{ borderTop: '1px solid rgba(255, 255, 255, 0.14)', padding: '16px 0', fontSize: '17px', color: '#FFFFFF' }}>Vragen op basis van jouw branche en website</li>
      <li style={{ borderTop: '1px solid rgba(255, 255, 255, 0.14)', padding: '16px 0', fontSize: '17px', color: '#FFFFFF' }}>Meting in ChatGPT, Perplexity en Google AI</li>
      <li style={{ borderTop: '1px solid rgba(255, 255, 255, 0.14)', borderBottom: '1px solid rgba(255, 255, 255, 0.14)', padding: '16px 0', fontSize: '17px', color: '#FFFFFF' }}>Dashboard dat laat zien hoe vaak je genoemd wordt</li>
      </ul>
      <div style={{ marginTop: '32px', display: 'flex', flexWrap: 'wrap', gap: '16px 32px' }}>
      <a className="ol-teunlink" href="https://teun.ai" target="_blank" rel="noopener" style={{ fontSize: '17px', fontWeight: '600', color: '#FFFFFF', textDecoration: 'none', borderBottom: '2px solid #6FA3E6', paddingBottom: '4px' }}>Ontdek Teun.ai</a>
      <a className="ol-teunlink" href="https://teun.ai/geo-optimalisatie" target="_blank" rel="noopener" style={{ fontSize: '17px', fontWeight: '600', color: '#FFFFFF', textDecoration: 'none', borderBottom: '2px solid rgba(111, 163, 230, 0.4)', paddingBottom: '4px' }}>Lees de gids: GEO in 10 stappen</a>
      </div>
      </div>
      <form className="ol-scanform" onSubmit={onScan} style={{ background: '#FFFFFF', color: '#0A0F1F', borderRadius: '12px', padding: '40px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
      <p style={{ margin: '0', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em' }}>Test je AI-zichtbaarheid</p>
      <p style={{ margin: '8px 0 0', fontSize: '16px', lineHeight: '1.5', color: '#5B6275' }}>Gratis scan, de analyse draait op Teun.ai.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label htmlFor="ol-f-naam" style={{ fontSize: '15px', fontWeight: '600' }}>Bedrijfsnaam</label>
      <input id="ol-f-naam" className="ol-input" type="text" name="bedrijfsnaam" value={form.companyName} onChange={setField('companyName')} required autoComplete="organization" style={{ height: '56px', border: '1px solid #C9D1DE', borderRadius: '10px', padding: '0 18px', fontFamily: 'inherit', fontSize: '17px', color: '#0A0F1F', background: '#FFFFFF', boxSizing: 'border-box' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label htmlFor="ol-f-branche" style={{ fontSize: '15px', fontWeight: '600' }}>Branche</label>
      <input id="ol-f-branche" className="ol-input" type="text" name="branche" value={form.companyCategory} onChange={setField('companyCategory')} required style={{ height: '56px', border: '1px solid #C9D1DE', borderRadius: '10px', padding: '0 18px', fontFamily: 'inherit', fontSize: '17px', color: '#0A0F1F', background: '#FFFFFF', boxSizing: 'border-box' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label htmlFor="ol-f-web" style={{ fontSize: '15px', fontWeight: '600' }}>Website</label>
      <input id="ol-f-web" className="ol-input" type="text" name="website" value={form.website} onChange={setField('website')} placeholder="jouwbedrijf.nl" required inputMode="url" style={{ height: '56px', border: '1px solid #C9D1DE', borderRadius: '10px', padding: '0 18px', fontFamily: 'inherit', fontSize: '17px', color: '#0A0F1F', background: '#FFFFFF', boxSizing: 'border-box' }} />
      </div>
      <button className="ol-pill" type="submit" style={{ marginTop: '8px', height: '56px', border: '0', borderRadius: '999px', background: '#0A0F1F', color: '#FFFFFF', fontFamily: 'inherit', fontSize: '16px', fontWeight: '600' }}>Start gratis analyse</button>
      {scanError && (<p role="alert" style={{ margin: '0', fontSize: '15px', color: '#B42318', textAlign: 'center' }}>{scanError}</p>)}
      <p style={{ margin: '0', fontSize: '14px', color: '#5B6275', textAlign: 'center' }}>Registreren is niet nodig.</p>
      </form>
      </div>
      </section>

      <section className="ol-steps ol-snap" aria-labelledby="ol-steps-h" style={{ maxWidth: '1440px', margin: '0 auto', padding: '96px 40px', boxSizing: 'border-box', minHeight: 'calc(100vh - 104px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="ol-why-top" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '64px', alignItems: 'end' }}>
      <h2 id="ol-steps-h" className="ol-why-h" style={{ margin: '0', fontSize: '64px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.035em' }}>Zo pakken we het aan<span style={{ color: '#376EB5' }}>.</span></h2>
      <p style={{ margin: '0', fontSize: '20px', lineHeight: '1.6', color: '#3A4256' }}>Van onzichtbaar naar aanbevolen in ChatGPT, Gemini en Perplexity. In drie stappen, met meetbaar resultaat.</p>
      </div>
      <div className="ol-steps-grid" style={{ marginTop: '72px', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '40px' }}>
      <div className="ol-step-col" style={{ borderTop: '2px solid #0A0F1F', paddingTop: '28px' }}>
      <p style={{ margin: '0', fontSize: '72px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.04em', color: '#376EB5' }}>01</p>
      <h3 style={{ margin: '28px 0 0', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em' }}>AI-zichtbaarheidsanalyse</h3>
      <p style={{ margin: '14px 0 0', fontSize: '17px', lineHeight: '1.6', color: '#3A4256' }}>We meten hoe ChatGPT, Gemini en Perplexity jouw merk en je concurrenten nu noemen, bij de vragen die jouw klanten stellen.</p>
      </div>
      <div className="ol-step-col" style={{ borderTop: '2px solid #0A0F1F', paddingTop: '28px' }}>
      <p style={{ margin: '0', fontSize: '72px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.04em', color: '#376EB5' }}>02</p>
      <h3 style={{ margin: '28px 0 0', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em' }}>Content en autoriteit</h3>
      <p style={{ margin: '14px 0 0', fontSize: '17px', lineHeight: '1.6', color: '#3A4256' }}>Structured data, duidelijke expertise-signalen en citeerbare bronnen, zodat AI je herkent als betrouwbare bron.</p>
      </div>
      <div className="ol-step-col" style={{ borderTop: '2px solid #0A0F1F', paddingTop: '28px' }}>
      <p style={{ margin: '0', fontSize: '72px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.04em', color: '#376EB5' }}>03</p>
      <h3 style={{ margin: '28px 0 0', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em' }}>Monitoring en groei</h3>
      <p style={{ margin: '14px 0 0', fontSize: '17px', lineHeight: '1.6', color: '#3A4256' }}>In het Teun.ai-dashboard zie je hoe vaak AI jouw merk noemt. Verandert het gedrag van de modellen, dan sturen we bij.</p>
      </div>
      </div>
      <p className="ol-steps-meta" style={{ margin: '56px 0 0', fontSize: '15px', color: '#5B6275', display: 'flex', flexWrap: 'wrap', gap: '6px 10px' }}><span>Eerste verbeteringen vaak binnen 4 tot 8 weken</span><span aria-hidden="true">·</span><span>Structurele vermeldingen na 3 tot 6 maanden</span></p>
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
