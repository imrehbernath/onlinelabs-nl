'use client';

import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import { LOKAAL_FAQS } from './lokaalFaqs';

// Lokale SEO Amsterdam 2027: overgenomen uit het Claude Design-bestand (LOKAAL.dc.html).

const WORD = 'Lokaal gevonden';

const PLEKKEN = [
  { name: 'Google Maps', wie: 'In de kaart wint de loodgieter met het meest complete profiel en reviews die precies zeggen waar hij goed in is.', telt: ['Bedrijfsprofiel met de juiste hoofdcategorie en diensten', 'Reviews waarin klanten "warmtepomp" noemen', 'Foto\'s, openingstijden en reacties op reviews'] },
  { name: 'Google zoekresultaten', wie: 'Onder de kaart wint de site met een eigen pagina voor de specialisatie en duidelijke lokale signalen.', telt: ['Een dienstpagina per specialisatie en werkgebied', 'Adres, werkgebied en LocalBusiness-schema', 'Een snelle site die goed werkt op mobiel'] },
  { name: 'AI Overviews', wie: 'Google vat de beste bronnen samen. Wie de vraag het helderst beantwoordt, wordt geciteerd.', telt: ['Heldere antwoorden op de vragen die klanten stellen', 'Structured data die Google zonder twijfel begrijpt', 'Vermeldingen op betrouwbare sites in de branche'] },
  { name: 'ChatGPT', wie: 'ChatGPT noemt bedrijven die op meerdere betrouwbare plekken met dezelfde specialisatie terugkomen.', telt: ['Vermeldingen op vergelijkers, branchesites en nieuws', 'Overal dezelfde naam, adres en telefoonnummer', 'Reviews op meer dan één platform'] },
  { name: 'Perplexity', wie: 'Perplexity toont zijn bronnen. Je wilt een van die bronnen zijn, of erin genoemd worden.', telt: ['Pagina\'s met een duidelijke specialisatie', 'Actuele informatie over diensten en werkgebied', 'Vermeldingen in lokale en vakbronnen'] },
  { name: 'Gemini', wie: 'Gemini leunt op Google-data. Een sterk Bedrijfsprofiel en goede reviews tellen hier dubbel.', telt: ['Een compleet en actief Google Bedrijfsprofiel', 'Recente reviews met inhoud', 'Een site die je specialisatie bevestigt'] },
  { name: 'Apple Maps', wie: 'Wie op een iPhone of via Siri zoekt, krijgt Apple Maps. Veel bedrijven vergeten dit profiel.', telt: ['Een geclaimd profiel in Apple Business Connect', 'De juiste categorie, foto\'s en openingstijden', 'Dezelfde gegevens als in Google'] },
  { name: 'Bing', wie: 'Bing is kleiner, maar levert de data voor Microsoft Copilot. Een gemiste kans is snel opgelost.', telt: ['Een compleet profiel in Bing Places', 'Dezelfde naam, adres en telefoonnummer', 'Je site aangemeld bij Bing Webmaster Tools'] }
];

const lower = 'abcdefghijklnoprstuvxyz';
const upper = 'ABCDEFGHJKLNOPRSTUVXYZ';

export default function LokaalView({ logosTop = [], logosBottom = [] }) {
  const [now, setNow] = useState(0);
  const [start, setStart] = useState(Infinity);
  const [pIdx, setPIdx] = useState(0);
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

  // Zoekplekken
  const plekken = PLEKKEN.map((p, i) => ({
    name: p.name,
    sel: i === pIdx ? 'true' : 'false',
    bg: i === pIdx ? '#0A0F1F' : '#FFFFFF',
    fg: i === pIdx ? '#FFFFFF' : '#0A0F1F',
    border: i === pIdx ? '#0A0F1F' : '#DCE1EA',
    pick: () => setPIdx(i),
  }));
  const c0 = PLEKKEN[pIdx];
  const cur = { num: String(pIdx + 1).padStart(2, '0'), name: c0.name, wie: c0.wie, telt: c0.telt.map((x) => ({ t: x })) };

  // Veelgestelde vragen
  const faqs = LOKAAL_FAQS.map((f, i) => ({
    q: f.q, a: f.a,
    open: faqOpen === i,
    exp: faqOpen === i ? 'true' : 'false',
    rot: faqOpen === i ? 'rotate(45deg)' : 'none',
    toggle: () => setFaqOpen((o) => (o === i ? -1 : i)),
  }));

  return (
    <div className="v27 v27-home v27-lokaal">
      <section className="ol-hero ol-snap" style={{ maxWidth: '1440px', margin: '0 auto', padding: '120px 40px 96px', boxSizing: 'border-box', minHeight: 'calc(100vh - 104px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1 style={{ margin: '0', fontWeight: '800' }}>
      <span className="ol-eyebrow" style={{ display: 'block', fontSize: '15px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5B6275', marginBottom: '32px' }}>Lokale SEO Amsterdam</span>
      <span className="ol-sr">Lokale SEO Amsterdam: lokaal gevonden in Google, Maps en AI.</span>
      <span aria-hidden="true" className="ol-seo-lede" style={{ display: 'block', maxWidth: '900px', fontSize: '36px', fontWeight: '400', lineHeight: '1.3', letterSpacing: '-0.01em', color: '#0A0F1F' }}>Gevonden door klanten in de buurt. In Google, in Google Maps en in de antwoorden van ChatGPT en Gemini.</span>
      <span aria-hidden="true" className="ol-seo-big" style={{ display: 'block', marginTop: '56px', textAlign: 'right', whiteSpace: 'nowrap', fontSize: 'clamp(56px, 8.4vw, 132px)', lineHeight: '0.95', letterSpacing: '-0.035em' }}>{chars.map((ch, $index) => (<Fragment key={$index}><span style={{ color: ch.color }}>{ch.c}</span></Fragment>))}<span style={{ color: dotColor }}>.</span></span>
      </h1>

      <div className="ol-hero-row" style={{ marginTop: '72px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '24px 48px' }}>
      <p className="ol-seo-proof" style={{ margin: '0', fontSize: '15px', color: '#5B6275', display: 'flex', flexWrap: 'wrap', gap: '6px 10px' }}>
      <span>Google Partner</span><span aria-hidden="true">·</span><span>5,0 uit 29 Google reviews</span><span aria-hidden="true">·</span><span>Kantoor aan de Herengracht</span>
      </p>
      <div className="ol-seo-cta" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px 32px' }}>
      <a className="ol-scroll ol-down" href="#ol-plekken" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '17px', fontWeight: '600', textDecoration: 'none' }}>Bekijk hoe het werkt</a>
      <a className="ol-pill" href="/contact" style={{ display: 'inline-flex', alignItems: 'center', height: '56px', padding: '0 28px', borderRadius: '999px', background: '#0A0F1F', color: '#FFFFFF', fontSize: '16px', fontWeight: '600', textDecoration: 'none', whiteSpace: 'nowrap' }}>Bespreek je lokale vindbaarheid</a>
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
      <p style={{ margin: '0', fontSize: '15px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5B6275' }}>Je lokale SEO specialist</p>
      <h2 id="ol-imre-h" className="ol-why-h" style={{ margin: '16px 0 0', fontSize: '64px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.035em' }}>Wij zetten de lijnen uit<span style={{ color: '#376EB5' }}>.</span></h2>
      <p style={{ margin: '28px 0 0', fontSize: '20px', lineHeight: '1.6', color: '#3A4256', maxWidth: '660px' }}>Imre Bernáth helpt al twintig jaar ondernemers aan klanten uit de buurt, vanaf de Herengracht in Amsterdam. Je spreekt de specialist die het werk ook echt doet.</p>
      <p style={{ margin: '16px 0 0', fontSize: '20px', lineHeight: '1.6', color: '#3A4256', maxWidth: '660px' }}>Een goed Bedrijfsprofiel is niet meer genoeg. Klanten vragen het ook aan ChatGPT. We zorgen dat je op beide plekken genoemd wordt, en dat je weet waarom.</p>
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

      <section id="ol-plekken" className="ol-wwd ol-snap" aria-labelledby="ol-plek-h" style={{ marginTop: '30px', padding: '30px 16px 16px' }}>
      <div className="ol-wwd-panel" style={{ maxWidth: '1600px', margin: '0 auto', background: '#F4F6FA', borderRadius: '12px', padding: '64px 56px', boxSizing: 'border-box', minHeight: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="ol-why-top" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '64px', alignItems: 'end' }}>
      <h2 id="ol-plek-h" className="ol-why-h" style={{ margin: '0', fontSize: '64px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.035em' }}>Eén vraag, acht plekken<span style={{ color: '#376EB5' }}>.</span></h2>
      <p style={{ margin: '0', fontSize: '20px', lineHeight: '1.6', color: '#3A4256' }}>Je klant zoekt niet meer op één plek. Dezelfde vraag gaat naar Google, naar Maps en naar ChatGPT. Op elke plek tellen andere signalen.</p>
      </div>
      <div className="ol-query" style={{ marginTop: '48px', background: '#FFFFFF', borderRadius: '999px', padding: '0 32px', height: '72px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: '16px' }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B6275" aria-hidden="true" style={{ flexShrink: '0', strokeWidth: '2.2', strokeLinecap: 'round' }}><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-4-4"></path></svg>
      <p style={{ margin: '0', fontSize: '22px', fontWeight: '600', letterSpacing: '-0.01em', color: '#0A0F1F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Goede loodgieter in Amsterdam, gespecialiseerd in warmtepompen, met goede reviews</p>
      </div>
      <div className="ol-plek-tabs" role="tablist" aria-label="Zoekplekken" style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {plekken.map((p, $index) => (<Fragment key={$index}>
      <button className="ol-plek" type="button" role="tab" aria-selected={p.sel} onClick={p.pick} style={{ height: '48px', padding: '0 22px', borderRadius: '999px', border: `1px solid ${p.border}`, background: p.bg, color: p.fg, fontFamily: 'inherit', fontSize: '16px', fontWeight: '600' }}>{p.name}</button>
      </Fragment>))}
      </div>
      <div className="ol-plek-panel" role="tabpanel" aria-live="polite" style={{ marginTop: '24px', background: '#FFFFFF', borderRadius: '12px', padding: '40px', boxSizing: 'border-box', minHeight: '300px', display: 'grid', gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)', gap: '56px' }}>
      <div>
      <p style={{ margin: '0', fontSize: '14px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5B6275' }}>{cur.num} / 08</p>
      <h3 style={{ margin: '12px 0 0', fontSize: '40px', fontWeight: '800', lineHeight: '1.05', letterSpacing: '-0.03em' }}>{cur.name}</h3>
      <p style={{ margin: '20px 0 0', fontSize: '18px', lineHeight: '1.6', color: '#3A4256' }}>{cur.wie}</p>
      </div>
      <div>
      <p style={{ margin: '0', fontSize: '14px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5B6275' }}>Wat hier telt</p>
      <ul style={{ listStyle: 'none', margin: '16px 0 0', padding: '0' }}>
      {cur.telt.map((t, $index) => (<Fragment key={$index}>
      <li style={{ borderTop: '1px solid #DCE1EA', padding: '16px 0', fontSize: '17px', lineHeight: '1.5', color: '#0A0F1F' }}>{t.t}</li>
      </Fragment>))}
      </ul>
      </div>
      </div>
      </div>
      </section>

      <section className="ol-steps ol-snap" aria-labelledby="ol-steps-h" style={{ maxWidth: '1440px', margin: '0 auto', padding: '96px 40px', boxSizing: 'border-box', minHeight: 'calc(100vh - 104px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="ol-why-top" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '64px', alignItems: 'end' }}>
      <h2 id="ol-steps-h" className="ol-why-h" style={{ margin: '0', fontSize: '64px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.035em' }}>Zo pakken we het aan<span style={{ color: '#376EB5' }}>.</span></h2>
      <p style={{ margin: '0', fontSize: '20px', lineHeight: '1.6', color: '#3A4256' }}>We zoeken zoals jouw klant zoekt, en zetten daarna alles recht wat je in de buurt zichtbaar maakt.</p>
      </div>
      <div className="ol-steps-grid" style={{ marginTop: '72px', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '32px' }}>
      <div className="ol-step-col" style={{ borderTop: '2px solid #0A0F1F', paddingTop: '28px' }}>
      <p style={{ margin: '0', fontSize: '72px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.04em', color: '#376EB5' }}>01</p>
      <h3 style={{ margin: '28px 0 0', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em' }}>Nulmeting</h3>
      <p style={{ margin: '14px 0 0', fontSize: '17px', lineHeight: '1.6', color: '#3A4256' }}>We meten waar je nu staat in Google, Maps en AI-antwoorden, en hoe je concurrenten in de buurt het doen. Met Teun.ai voor de AI-kant.</p>
      </div>
      <div className="ol-step-col" style={{ borderTop: '2px solid #0A0F1F', paddingTop: '28px' }}>
      <p style={{ margin: '0', fontSize: '72px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.04em', color: '#376EB5' }}>02</p>
      <h3 style={{ margin: '28px 0 0', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em' }}>Profielen op orde</h3>
      <p style={{ margin: '14px 0 0', fontSize: '17px', lineHeight: '1.6', color: '#3A4256' }}>Google Bedrijfsprofiel, Apple Business Connect en Bing Places compleet, met overal dezelfde naam, adres en telefoonnummer.</p>
      </div>
      <div className="ol-step-col" style={{ borderTop: '2px solid #0A0F1F', paddingTop: '28px' }}>
      <p style={{ margin: '0', fontSize: '72px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.04em', color: '#376EB5' }}>03</p>
      <h3 style={{ margin: '28px 0 0', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em' }}>Pagina's en reviews</h3>
      <p style={{ margin: '14px 0 0', fontSize: '17px', lineHeight: '1.6', color: '#3A4256' }}>Een sterke pagina per dienst en werkgebied, LocalBusiness-schema en een aanpak voor reviews die vertellen waar je goed in bent.</p>
      </div>
      <div className="ol-step-col" style={{ borderTop: '2px solid #0A0F1F', paddingTop: '28px' }}>
      <p style={{ margin: '0', fontSize: '72px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.04em', color: '#376EB5' }}>04</p>
      <h3 style={{ margin: '28px 0 0', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em' }}>Meten en bijsturen</h3>
      <p style={{ margin: '14px 0 0', fontSize: '17px', lineHeight: '1.6', color: '#3A4256' }}>Elke maand je posities in de kaart, je vermeldingen in AI en de aanvragen die het oplevert. Wat niet werkt, sturen we bij.</p>
      </div>
      </div>
      <p style={{ margin: '56px 0 0', fontSize: '16px', lineHeight: '1.6', color: '#3A4256' }}>In heel Nederland gevonden worden? Bekijk dan onze <a href="/skills/seo-specialist" style={{ fontWeight: '600', textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px', textDecorationColor: '#376EB5' }}>SEO specialist</a>.</p>
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
