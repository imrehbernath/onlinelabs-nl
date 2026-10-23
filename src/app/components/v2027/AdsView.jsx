'use client';

import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import { ADS_FAQS } from './adsFaqs';

// Online adverteren 2027: overgenomen uit het Claude Design-bestand (ADS.dc.html).

const WORD = 'Online adverteren';

const KANALEN = [
  { name: 'Google Ads', sub: 'Search en Shopping', what: 'Vindbaar op het moment dat klanten zoeken. We optimaliseren op ROAS, niet op klikken.', when: 'mensen actief zoeken naar jouw product of dienst.' },
  { name: 'Meta Ads', sub: 'Facebook en Instagram', what: 'Bereik je doelgroep met visuele campagnes, van awareness tot retargeting.', when: 'je visuele producten hebt of nieuwe doelgroepen wilt bereiken.' },
  { name: 'LinkedIn Ads', sub: 'B2B', what: 'Leadgeneratie met targeting op functie, bedrijfsgrootte en branche.', when: 'je zakelijk verkoopt en specifieke functies wilt bereiken.' },
  { name: 'Display en remarketing', sub: 'Google Display en Meta', what: 'Blijf in beeld bij bezoekers die je site al kennen. Slim retargeten zonder te irriteren.', when: 'je bezoekers hebt die nog niet kochten of aanvroegen.' },
];

const lower = 'abcdefghijklnoprstuvxyz';
const upper = 'ABCDEFGHJKLNOPRSTUVXYZ';

export default function AdsView({ logosTop = [], logosBottom = [] }) {
  const [now, setNow] = useState(0);
  const [start, setStart] = useState(Infinity);
  const [kIdx, setKIdx] = useState(0);
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

  // Kanalen
  const kanalen = KANALEN.map((k, i) => ({
    name: k.name,
    num: String(i + 1).padStart(2, '0'),
    sel: i === kIdx ? 'true' : 'false',
    color: i === kIdx ? '#0A0F1F' : '#8A91A3',
    numColor: i === kIdx ? '#376EB5' : '#8A91A3',
    pick: () => setKIdx(i),
  }));
  const cur = KANALEN[kIdx];

  // Veelgestelde vragen
  const faqs = ADS_FAQS.map((f, i) => ({
    q: f.q, a: f.a,
    open: faqOpen === i,
    exp: faqOpen === i ? 'true' : 'false',
    rot: faqOpen === i ? 'rotate(45deg)' : 'none',
    toggle: () => setFaqOpen((o) => (o === i ? -1 : i)),
  }));

  return (
    <div className="v27 v27-home v27-ads">
      <section className="ol-hero ol-snap" style={{ maxWidth: '1440px', margin: '0 auto', padding: '120px 40px 96px', boxSizing: 'border-box', minHeight: 'calc(100vh - 104px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1 style={{ margin: '0', fontWeight: '800' }}>
      <span className="ol-eyebrow" style={{ display: 'block', fontSize: '15px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5B6275', marginBottom: '32px' }}>Ads bureau Amsterdam, sinds 2008</span>
      <span className="ol-sr">Online adverteren: direct zichtbaar, meetbaar resultaat.</span>
      <span aria-hidden="true" className="ol-seo-lede" style={{ display: 'block', maxWidth: '900px', fontSize: '36px', fontWeight: '400', lineHeight: '1.3', letterSpacing: '-0.01em', color: '#0A0F1F' }}>Direct zichtbaar in Google, Meta, LinkedIn en Pinterest. Campagnes die niet alleen klikken opleveren, maar converteren.</span>
      <span aria-hidden="true" className="ol-seo-big" style={{ display: 'block', marginTop: '56px', textAlign: 'right', whiteSpace: 'nowrap', fontSize: 'clamp(56px, 8.4vw, 132px)', lineHeight: '0.95', letterSpacing: '-0.035em' }}>{chars.map((ch, $index) => (<Fragment key={$index}><span style={{ color: ch.color }}>{ch.c}</span></Fragment>))}<span style={{ color: dotColor }}>.</span></span>
      </h1>

      <div className="ol-hero-row" style={{ marginTop: '72px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '24px 48px' }}>
      <p className="ol-seo-proof" style={{ margin: '0', fontSize: '15px', color: '#5B6275', display: 'flex', flexWrap: 'wrap', gap: '6px 10px' }}>
      <span>Google Partner</span><span aria-hidden="true">·</span><span>5,0 uit 29 Google reviews</span><span aria-hidden="true">·</span><span>Geen langlopend contract</span>
      </p>
      <div className="ol-seo-cta" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px 32px' }}>
      <a className="ol-scroll ol-down" href="#ol-prijs" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '17px', fontWeight: '600', textDecoration: 'none' }}>Bekijk de tarieven</a>
      <a className="ol-pill" href="/contact" style={{ display: 'inline-flex', alignItems: 'center', height: '56px', padding: '0 28px', borderRadius: '999px', background: '#0A0F1F', color: '#FFFFFF', fontSize: '16px', fontWeight: '600', textDecoration: 'none', whiteSpace: 'nowrap' }}>Bespreek je campagne</a>
      </div>
      </div>
      </section>

      <section className="ol-imre ol-snap" aria-labelledby="ol-imre-h" style={{ maxWidth: '1440px', margin: '0 auto', padding: '96px 40px', boxSizing: 'border-box', minHeight: 'calc(100vh - 104px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="ol-imre-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)', gap: '72px', alignItems: 'center' }}>
      <div className="ol-imre-photo" style={{ position: 'relative', aspectRatio: '3 / 4', maxHeight: '540px', width: '100%', maxWidth: '420px', borderRadius: '12px', overflow: 'hidden', background: '#DCE7F6' }}>
      <Image src="https://cdn.onlinelabs.nl/wp-content/uploads/2025/11/Adrian-Enders.webp" alt="Adrian Enders, Ads specialist bij OnlineLabs" fill sizes="(max-width: 640px) 360px, 420px" quality={85} style={{ objectFit: 'cover', objectPosition: 'center 25%' }} />
      <span style={{ position: 'absolute', left: '20px', bottom: '20px', display: 'inline-flex', alignItems: 'center', height: '40px', padding: '0 16px', borderRadius: '6px', background: '#FFFFFF', color: '#0A0F1F', fontSize: '15px', fontWeight: '700' }}>Adrian Enders</span>
      </div>
      <div>
      <p style={{ margin: '0', fontSize: '15px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5B6275' }}>Je Ads specialist</p>
      <h2 id="ol-imre-h" className="ol-why-h" style={{ margin: '16px 0 0', fontSize: '64px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.035em' }}>Wij sturen op conversies<span style={{ color: '#376EB5' }}>.</span></h2>
      <p style={{ margin: '28px 0 0', fontSize: '20px', lineHeight: '1.6', color: '#3A4256', maxWidth: '660px' }}>Adrian Enders is onze Ads specialist. Google en Meta sturen campagnes steeds meer met AI. Adrian zorgt dat die AI op de juiste data stuurt: echte conversies, geen klikken. Elke euro advertentiebudget moet bijdragen aan jouw doel, of dat nu leads, verkopen of aanvragen zijn.</p>
      <p style={{ margin: '16px 0 0', fontSize: '20px', lineHeight: '1.6', color: '#3A4256', maxWidth: '660px' }}>We combineren adverteren met 15+ jaar SEO-kennis. We weten welke zoekwoorden organisch kansrijk zijn en welke je beter kunt inkopen. Zo betaal je niet dubbel en benut je het volledige potentieel van Google.</p>
      <div className="ol-imre-stats" style={{ marginTop: '44px', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '24px' }}>
      <div style={{ borderTop: '2px solid #0A0F1F', paddingTop: '18px' }}><p style={{ margin: '0', fontSize: '44px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.03em' }}>Google</p><p style={{ margin: '10px 0 0', fontSize: '15px', color: '#5B6275' }}>Partner sinds 2015</p></div>
      <div style={{ borderTop: '2px solid #0A0F1F', paddingTop: '18px' }}><p style={{ margin: '0', fontSize: '44px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.03em' }}>15+ jaar</p><p style={{ margin: '10px 0 0', fontSize: '15px', color: '#5B6275' }}>SEO-kennis erbij</p></div>
      <div style={{ borderTop: '2px solid #0A0F1F', paddingTop: '18px' }}><p style={{ margin: '0', fontSize: '44px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.03em' }}>5,0</p><p style={{ margin: '10px 0 0', fontSize: '15px', color: '#5B6275' }}>uit 29 Google reviews</p></div>
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

      <section id="ol-kanalen" className="ol-wwd ol-snap" aria-labelledby="ol-kan-h" style={{ marginTop: '30px', padding: '30px 16px 16px' }}>
      <div className="ol-wwd-panel" style={{ maxWidth: '1600px', margin: '0 auto', background: '#F4F6FA', borderRadius: '12px', padding: '64px 56px', boxSizing: 'border-box', minHeight: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="ol-why-top" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '64px', alignItems: 'end' }}>
      <h2 id="ol-kan-h" className="ol-why-h" style={{ margin: '0', fontSize: '64px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.035em' }}>Waar zoekt jouw klant<span style={{ color: '#376EB5' }}>?</span></h2>
      <p style={{ margin: '0', fontSize: '20px', lineHeight: '1.6', color: '#3A4256' }}>Organisch bereik kost tijd. Met adverteren sta je direct in beeld bij mensen die nu zoeken, en betaal je alleen voor relevante kliks.</p>
      </div>
      <div className="ol-kan-grid" style={{ marginTop: '56px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '64px', alignItems: 'stretch' }}>
      <div className="ol-kan-list" role="tablist" aria-label="Kanalen" style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #DCE1EA' }}>
      {kanalen.map((k, $index) => (<Fragment key={$index}>
      <button className="ol-kan" type="button" role="tab" aria-selected={k.sel} onClick={k.pick} style={{ background: 'transparent', border: '0', borderBottom: '1px solid #DCE1EA', padding: '22px 0', display: 'flex', alignItems: 'baseline', gap: '20px', fontFamily: 'inherit', textAlign: 'left', color: k.color }}>
      <span style={{ flexShrink: '0', width: '32px', fontSize: '15px', fontWeight: '600', color: k.numColor }}>{k.num}</span>
      <span style={{ fontSize: '36px', fontWeight: '800', lineHeight: '1.1', letterSpacing: '-0.03em' }}>{k.name}</span>
      </button>
      </Fragment>))}
      </div>
      <div className="ol-kan-panel" role="tabpanel" aria-live="polite" style={{ background: '#FFFFFF', borderRadius: '12px', padding: '40px', boxSizing: 'border-box', minHeight: '380px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
      <p style={{ margin: '0', fontSize: '14px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5B6275' }}>{cur.sub}</p>
      <h3 style={{ margin: '12px 0 0', fontSize: '40px', fontWeight: '800', lineHeight: '1.05', letterSpacing: '-0.03em' }}>{cur.name}</h3>
      <p style={{ margin: '20px 0 0', fontSize: '19px', lineHeight: '1.6', color: '#3A4256' }}>{cur.what}</p>
      <p style={{ margin: '24px 0 0', paddingTop: '20px', borderTop: '1px solid #DCE1EA', fontSize: '16px', lineHeight: '1.6', color: '#5B6275' }}><span style={{ fontWeight: '600', color: '#0A0F1F' }}>Kies dit als</span> {cur.when}</p>
      </div>
      </div>
      </div>
      </section>

      <section className="ol-steps ol-snap" aria-labelledby="ol-steps-h" style={{ maxWidth: '1440px', margin: '0 auto', padding: '96px 40px', boxSizing: 'border-box', minHeight: 'calc(100vh - 104px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="ol-why-top" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '64px', alignItems: 'end' }}>
      <h2 id="ol-steps-h" className="ol-why-h" style={{ margin: '0', fontSize: '64px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.035em' }}>Zo pakken we het aan<span style={{ color: '#376EB5' }}>.</span></h2>
      <p style={{ margin: '0', fontSize: '20px', lineHeight: '1.6', color: '#3A4256' }}>Onze aanpak zorgt dat je advertentiebudget maximaal rendeert. Van eerste analyse tot schaalbare groei.</p>
      </div>
      <div className="ol-steps-grid" style={{ marginTop: '72px', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '32px' }}>
      <div className="ol-step-col" style={{ borderTop: '2px solid #0A0F1F', paddingTop: '28px' }}>
      <p style={{ margin: '0', fontSize: '72px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.04em', color: '#376EB5' }}>01</p>
      <h3 style={{ margin: '28px 0 0', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em' }}>Analyse</h3>
      <p style={{ margin: '14px 0 0', fontSize: '17px', lineHeight: '1.6', color: '#3A4256' }}>Doelgroep, markt en concurrentie in kaart. We bepalen waar jouw kansen liggen en welke kanalen het beste passen.</p>
      </div>
      <div className="ol-step-col" style={{ borderTop: '2px solid #0A0F1F', paddingTop: '28px' }}>
      <p style={{ margin: '0', fontSize: '72px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.04em', color: '#376EB5' }}>02</p>
      <h3 style={{ margin: '28px 0 0', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em' }}>Campagne opzetten</h3>
      <p style={{ margin: '14px 0 0', fontSize: '17px', lineHeight: '1.6', color: '#3A4256' }}>Accountstructuur, targeting en advertenties, ingericht volgens de richtlijnen en met conversietracking vanaf dag één.</p>
      </div>
      <div className="ol-step-col" style={{ borderTop: '2px solid #0A0F1F', paddingTop: '28px' }}>
      <p style={{ margin: '0', fontSize: '72px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.04em', color: '#376EB5' }}>03</p>
      <h3 style={{ margin: '28px 0 0', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em' }}>Optimalisatie</h3>
      <p style={{ margin: '14px 0 0', fontSize: '17px', lineHeight: '1.6', color: '#3A4256' }}>Continu A/B-testen op advertenties, doelgroepen en biedstrategieën. We sturen op ROAS en kosten per conversie.</p>
      </div>
      <div className="ol-step-col" style={{ borderTop: '2px solid #0A0F1F', paddingTop: '28px' }}>
      <p style={{ margin: '0', fontSize: '72px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.04em', color: '#376EB5' }}>04</p>
      <h3 style={{ margin: '28px 0 0', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em' }}>Schalen</h3>
      <p style={{ margin: '14px 0 0', fontSize: '17px', lineHeight: '1.6', color: '#3A4256' }}>Zodra campagnes renderen, verhogen we het budget stap voor stap. Groei zonder stijgende acquisitiekosten.</p>
      </div>
      </div>
      <p className="ol-steps-meta" style={{ margin: '56px 0 0', fontSize: '15px', color: '#5B6275', display: 'flex', flexWrap: 'wrap', gap: '6px 10px' }}><span>Google Ads: eerste kliks en conversies vaak binnen enkele dagen</span><span aria-hidden="true">·</span><span>Social: 2 tot 4 weken data opbouwen</span><span aria-hidden="true">·</span><span>Schaalbaar resultaat na 2 tot 3 maanden</span></p>
      </section>

      <section id="ol-prijs" className="ol-prijs ol-snap" aria-labelledby="ol-prijs-h" style={{ padding: '16px' }}>
      <div className="ol-prijs-panel" style={{ maxWidth: '1600px', margin: '0 auto', background: '#DCE7F6', borderRadius: '12px', padding: '72px 56px', boxSizing: 'border-box', minHeight: 'calc(100vh - 136px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="ol-why-top" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '64px', alignItems: 'end' }}>
      <h2 id="ol-prijs-h" className="ol-why-h" style={{ margin: '0', fontSize: '64px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.035em' }}>Tarieven<span style={{ color: '#376EB5' }}>.</span></h2>
      <p style={{ margin: '0', fontSize: '20px', lineHeight: '1.6', color: '#3A4256' }}>Van eenmalige setup tot doorlopend beheer. Je advertentiebudget bepaal je zelf, wij adviseren minimaal €500 per maand voor meetbare resultaten.</p>
      </div>
      <div className="ol-prijs-grid" style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '24px' }}>
      <div className="ol-price" style={{ background: '#FFFFFF', borderRadius: '12px', padding: '36px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <p style={{ margin: '0', fontSize: '20px', fontWeight: '800', letterSpacing: '-0.01em' }}>Eenmalige setup</p>
      <p style={{ margin: '20px 0 0', display: 'flex', alignItems: 'baseline', gap: '10px' }}><span style={{ fontSize: '15px', color: '#5B6275' }}>v.a.</span><span style={{ fontSize: '56px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.04em' }}>€500</span><span style={{ fontSize: '15px', color: '#5B6275' }}>per platform</span></p>
      <ul style={{ listStyle: 'none', margin: '28px 0 0', padding: '0' }}>
      <li style={{ borderTop: '1px solid #DCE1EA', padding: '14px 0', fontSize: '16px', lineHeight: '1.45', color: '#0A0F1F' }}>Google Ads, Meta Ads of LinkedIn Ads</li>
      <li style={{ borderTop: '1px solid #DCE1EA', padding: '14px 0', fontSize: '16px', lineHeight: '1.45', color: '#0A0F1F' }}>Accountstructuur en campagne-opzet</li>
      <li style={{ borderTop: '1px solid #DCE1EA', padding: '14px 0', fontSize: '16px', lineHeight: '1.45', color: '#0A0F1F' }}>Conversietracking installeren</li>
      <li style={{ borderTop: '1px solid #DCE1EA', padding: '14px 0', fontSize: '16px', lineHeight: '1.45', color: '#0A0F1F' }}>Doelgroeptargeting</li>
      <li style={{ borderTop: '1px solid #DCE1EA', padding: '14px 0', fontSize: '16px', lineHeight: '1.45', color: '#0A0F1F' }}>Eerste advertenties live</li>
      </ul>
      <a className="ol-scroll ol-down" href="/contact" style={{ marginTop: 'auto', paddingTop: '24px', alignSelf: 'flex-start', fontSize: '16px', fontWeight: '600', textDecoration: 'none' }}>Direct aanvragen</a>
      </div>
      <div className="ol-price" style={{ background: '#FFFFFF', borderRadius: '12px', padding: '36px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <p style={{ margin: '0', fontSize: '20px', fontWeight: '800', letterSpacing: '-0.01em' }}>Maandelijks beheer</p>
      <p style={{ margin: '20px 0 0', display: 'flex', alignItems: 'baseline', gap: '10px' }}><span style={{ fontSize: '15px', color: '#5B6275' }}>v.a.</span><span style={{ fontSize: '56px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.04em' }}>€125</span><span style={{ fontSize: '15px', color: '#5B6275' }}>per maand</span></p>
      <ul style={{ listStyle: 'none', margin: '28px 0 0', padding: '0' }}>
      <li style={{ borderTop: '1px solid #DCE1EA', padding: '14px 0', fontSize: '16px', lineHeight: '1.45', color: '#0A0F1F' }}>Campagne-optimalisatie</li>
      <li style={{ borderTop: '1px solid #DCE1EA', padding: '14px 0', fontSize: '16px', lineHeight: '1.45', color: '#0A0F1F' }}>A/B-testen van advertenties</li>
      <li style={{ borderTop: '1px solid #DCE1EA', padding: '14px 0', fontSize: '16px', lineHeight: '1.45', color: '#0A0F1F' }}>Maandelijkse rapportage</li>
      <li style={{ borderTop: '1px solid #DCE1EA', padding: '14px 0', fontSize: '16px', lineHeight: '1.45', color: '#0A0F1F' }}>Budgetbewaking</li>
      <li style={{ borderTop: '1px solid #DCE1EA', padding: '14px 0', fontSize: '16px', lineHeight: '1.45', color: '#0A0F1F' }}>Prijs afhankelijk van de complexiteit</li>
      </ul>
      <a className="ol-scroll ol-down" href="/contact" style={{ marginTop: 'auto', paddingTop: '24px', alignSelf: 'flex-start', fontSize: '16px', fontWeight: '600', textDecoration: 'none' }}>Offerte aanvragen</a>
      </div>
      <div className="ol-price" style={{ background: '#FFFFFF', borderRadius: '12px', padding: '36px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <p style={{ margin: '0', fontSize: '20px', fontWeight: '800', letterSpacing: '-0.01em' }}>Social media beheer</p>
      <p style={{ margin: '20px 0 0', display: 'flex', alignItems: 'baseline', gap: '10px' }}><span style={{ fontSize: '15px', color: '#5B6275' }}>v.a.</span><span style={{ fontSize: '56px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.04em' }}>€250</span><span style={{ fontSize: '15px', color: '#5B6275' }}>per maand</span></p>
      <ul style={{ listStyle: 'none', margin: '28px 0 0', padding: '0' }}>
      <li style={{ borderTop: '1px solid #DCE1EA', padding: '14px 0', fontSize: '16px', lineHeight: '1.45', color: '#0A0F1F' }}>Content maken en inplannen</li>
      <li style={{ borderTop: '1px solid #DCE1EA', padding: '14px 0', fontSize: '16px', lineHeight: '1.45', color: '#0A0F1F' }}>Posts op Meta en LinkedIn</li>
      <li style={{ borderTop: '1px solid #DCE1EA', padding: '14px 0', fontSize: '16px', lineHeight: '1.45', color: '#0A0F1F' }}>Community management</li>
      <li style={{ borderTop: '1px solid #DCE1EA', padding: '14px 0', fontSize: '16px', lineHeight: '1.45', color: '#0A0F1F' }}>Prijs op basis van frequentie</li>
      </ul>
      <a className="ol-scroll ol-down" href="/contact" style={{ marginTop: 'auto', paddingTop: '24px', alignSelf: 'flex-start', fontSize: '16px', fontWeight: '600', textDecoration: 'none' }}>Bespreek de mogelijkheden</a>
      </div>
      </div>
      <p className="ol-steps-meta" style={{ margin: '32px 0 0', fontSize: '15px', color: '#3A4256', display: 'flex', flexWrap: 'wrap', gap: '6px 10px' }}><span>Altijd inbegrepen: conversietracking</span><span aria-hidden="true">·</span><span>Maandelijkse rapportage</span><span aria-hidden="true">·</span><span>Geen langlopend contract</span><span aria-hidden="true">·</span><span>Alle prijzen exclusief btw</span></p>
      </div>
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
