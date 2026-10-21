'use client';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Homepage 2027: overgenomen uit het Claude Design-bestand (Main.dc.html).

const ACCENT = '#376EB5';
const KOP = {
  size: 'clamp(52px, 10vw, 148px)',
  lines: [
    { t: 'Gevonden.', label: 'in Google' },
    { t: 'Genoemd.', label: 'door AI' },
    { t: 'Gekozen', label: 'door jouw klant' },
  ],
  sr: 'Gevonden in Google. Genoemd door AI. Gekozen door jouw klant.',
};
const NEVER = [Infinity, Infinity, Infinity];

function usePrefersReducedMotion() {
  const ref = useRef(false);
  useEffect(() => {
    ref.current = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);
  return ref;
}

/* ------------------------------------------------------------------ */
/* Hero met scramble                                                    */
/* ------------------------------------------------------------------ */
function Hero() {
  const [now, setNow] = useState(0);
  const [starts, setStarts] = useState(NEVER);
  const anim = useRef(null);
  const wow = useRef(null);
  const startsRef = useRef(NEVER);
  const heroRef = useRef(null);
  const reduced = useRef(false);

  const lineEnd = (st, i) => (st[i] || 0) + 280 + KOP.lines[i].t.length * 55;

  const runScramble = useCallback((onDone) => {
    clearInterval(anim.current);
    anim.current = setInterval(() => {
      const t = Date.now();
      const st = startsRef.current;
      let busy = false;
      for (let i = 0; i < KOP.lines.length; i++) if (t < lineEnd(st, i) + 60) busy = true;
      setNow(t);
      if (!busy) {
        clearInterval(anim.current);
        anim.current = null;
        if (onDone) onDone();
      }
    }, 45);
  }, []);

  const scheduleWow = useCallback(() => {
    clearTimeout(wow.current);
    wow.current = setTimeout(() => {
      const i = Math.floor(Math.random() * KOP.lines.length);
      const st = startsRef.current.slice();
      st[i] = Date.now();
      startsRef.current = st;
      setStarts(st);
      setNow(Date.now());
      runScramble();
    }, 2500 + Math.random() * 2500);
  }, [runScramble]);

  useEffect(() => {
    reduced.current = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (reduced.current) {
      startsRef.current = [0, 0, 0];
      setStarts([0, 0, 0]);
      setNow(Date.now());
    } else {
      const t0 = Date.now() + 250;
      const st = [t0, t0 + 520, t0 + 1040];
      startsRef.current = st;
      setStarts(st);
      setNow(Date.now());
      runScramble(() => scheduleWow());
    }

    // Diepte: de woorden schuiven een paar pixels mee met de muis
    const el = heroRef.current;
    let onMove = null;
    let onLeave = null;
    if (el && !reduced.current && window.matchMedia && window.matchMedia('(hover: hover)').matches) {
      onMove = (e) => {
        if (anim.current) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
        el.style.setProperty('--my', (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
      };
      onLeave = () => {
        el.style.setProperty('--mx', '0');
        el.style.setProperty('--my', '0');
      };
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
    }
    return () => {
      clearInterval(anim.current);
      clearTimeout(wow.current);
      if (el && onMove) {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      }
    };
  }, [runScramble, scheduleWow]);

  const accent = ACCENT;
  const h1Size = KOP.size;
  const srText = KOP.sr;
  const lower = 'abcdefghijklnoprstuvxyz';
  const upper = 'ABCDEFGHJKLNOPRSTUVXYZ';
  const rnd = (c) => {
    const pool = c >= 'A' && c <= 'Z' ? upper : lower;
    return pool[Math.floor(Math.random() * pool.length)];
  };
  const lines = KOP.lines.map((ln, i) => {
    const t = now - (starts[i] || 0);
    const chars = [];
    let done = t >= 0;
    if (t >= 0) {
      for (let j = 0; j < ln.t.length; j++) {
        const c = ln.t[j];
        if (c === ' ' || t >= 280 + j * 55) chars.push({ c, color: 'inherit' });
        else { done = false; chars.push({ c: rnd(c), color: accent }); }
      }
    }
    return {
      chars,
      dot: i === KOP.lines.length - 1 && done,
      labelBefore: false,
      labelAfter: !!ln.label,
      label: ln.label || '',
      labelOpacity: done ? '1' : '0',
      justify: 'flex-start',
      indent: '0',
      k: String([-10, 6, 18][i] ?? 6),
      ky: String([-3, 2, 5][i] ?? 2),
    };
  });

  return (
    <>
      <section ref={heroRef} className="ol-hero ol-snap" style={{ maxWidth: '1440px', margin: '0 auto', padding: '120px 40px 96px', boxSizing: 'border-box', minHeight: 'calc(100vh - 104px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1 style={{ margin: '0', fontWeight: '800' }}>
      <span className="ol-eyebrow" style={{ display: 'block', fontSize: '15px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5B6275', marginBottom: '32px' }}>Online marketing bureau Amsterdam, sinds 2008</span>
      <span className="ol-sr">{srText}</span>
      <span aria-hidden="true" style={{ display: 'block', fontSize: h1Size, lineHeight: '0.95', letterSpacing: '-0.035em' }}>
      {lines.map((ln, $index) => (<Fragment key={$index}>
      <span className="ol-hline" style={{ display: 'flex', alignItems: 'baseline', gap: '0.18em', minHeight: '0.95em', whiteSpace: 'pre', justifyContent: ln.justify, paddingLeft: ln.indent, transform: `translate3d(calc(var(--mx, 0) * ${ln.k}px), calc(var(--my, 0) * ${ln.ky}px), 0)`, transition: 'transform 1.1s cubic-bezier(.2,.7,.2,1), padding-left .6s cubic-bezier(.2,.7,.2,1)' }}>
      {ln.labelBefore && (<><span className="ol-h1label" style={{ fontSize: '22px', fontWeight: '600', letterSpacing: '0', color: '#5B6275', opacity: ln.labelOpacity }}>{ln.label}</span></>)}
      <span>{ln.chars.map((ch, $index) => (<Fragment key={$index}><span style={{ color: ch.color }}>{ch.c}</span></Fragment>))}{ln.dot && (<><span style={{ color: accent }}>.</span></>)}</span>
      {ln.labelAfter && (<><span className="ol-h1label" style={{ fontSize: '22px', fontWeight: '600', letterSpacing: '0', color: '#5B6275', opacity: ln.labelOpacity }}>{ln.label}</span></>)}
      </span>
      </Fragment>))}
      </span>
      </h1>

      <div className="ol-hero-row" style={{ marginTop: '80px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 540px)', gap: '64px', alignItems: 'end' }}>
      <a className="ol-scroll ol-down" href="#ol-werk" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '17px', fontWeight: '600', textDecoration: 'none', justifySelf: 'start' }}>Bekijk ons werk
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: '2.2', strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M12 5v14M6 13l6 6 6-6"></path></svg>
      </a>
      <div>
      <p className="ol-intro" style={{ margin: '0', fontSize: '20px', lineHeight: '1.6', color: '#3A4256' }}>Drie specialisten met een slimme AI-assistent ernaast. Wij leveren vakwerk: websites, SEO, AI-zichtbaarheid en campagnes in Google Ads en Meta, die tot achter de komma kloppen. Topkwaliteit die vroeger alleen voor grote budgetten was, nu binnen bereik.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px 28px', marginTop: '32px' }}>
      <a className="ol-pill" href="/over-ons" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', height: '56px', padding: '0 28px', borderRadius: '999px', background: '#0A0F1F', color: '#FFFFFF', fontSize: '16px', fontWeight: '600', textDecoration: 'none', transition: 'background .2s ease' }}>Meer over ons</a>
      </div>
      <p style={{ margin: '28px 0 0', fontSize: '15px', color: '#5B6275', display: 'flex', flexWrap: 'wrap', gap: '6px 10px' }}>
      <span>Google Partner</span><span aria-hidden="true">·</span><span>5,0 uit 29 Google reviews</span><span aria-hidden="true">·</span><span>150+ websites in beheer</span>
      </p>
      </div>
      </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Ons werk                                                             */
/* ------------------------------------------------------------------ */
const BLUE = { bg: '#376EB5', fg: '#FFFFFF', circleBg: '#FFFFFF', circleFg: '#0A0F1F' };
const PALE = { bg: '#DCE7F6', fg: '#0A0F1F', circleBg: '#0A0F1F', circleFg: '#FFFFFF' };
const CDN = 'https://cdn.onlinelabs.nl/wp-content/uploads';
const CASES = [
  { name: 'Forteiland Pampus', tag: 'Erfgoed', services: 'Website · SEO · Campagnes', stat: '10+ jaar samenwerking aan websites, SEO, campagnes en meer online boekingen.', href: '/ons-werk/forteiland-pampus', img: `${CDN}/2026/06/Forteiland-Pampus-case-homepage.webp`, alt: 'Forteiland Pampus vanuit de lucht tijdens een evenement', pos: 'center 45%', tone: BLUE },
  { name: 'Grachtenmuseum', tag: 'Museum', services: 'Website · SEO', stat: 'Website en SEO voor het museum over de Amsterdamse grachten.', href: '/ons-werk', img: `${CDN}/2026/06/Rode-Salon_Grachtenmuseum_RebekkaMell.webp`, alt: 'Bezoeker in de beschilderde zaal van het Grachtenmuseum', pos: 'center 55%', tone: PALE },
  { name: 'Evert Groot', tag: 'Retail', services: 'Webdesign · SEO', stat: 'SEO en webdesign voor meer zichtbaarheid op linnen gordijnen en maatwerk advies.', href: '/ons-werk/evert-groot', img: `${CDN}/2026/06/Evert-Groot-case-homepage.webp`, alt: 'Evert Groot in zijn winkel tussen de stoffen', pos: 'center 30%', tone: BLUE },
  { name: 'HvanA', tag: 'Onderwijs', services: 'Migratie · WordPress', stat: 'Migratie van 3.400 artikelen naar WordPress met behoud van design en functionaliteit.', href: '/ons-werk/hvana', img: `${CDN}/2026/06/Hogeschool-van-Amsterdam-case-homepage.webp`, alt: 'Gebouw van de Hogeschool van Amsterdam', pos: 'center', tone: PALE },
];

function Work() {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  activeRef.current = active;

  useEffect(() => {
    const cards = document.querySelectorAll('.ol-card');
    if (!cards.length || !window.IntersectionObserver) return undefined;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const i = parseInt(e.target.getAttribute('data-idx'), 10);
          if (!isNaN(i) && i !== activeRef.current) setActive(i);
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const cases = CASES.map((c, i) => ({
    ...c,
    hasImg: !!c.img,
    overBase: c.img ? '0' : '1',
    overClass: c.img ? '' : 'ol-nophoto',
    bg: c.tone.bg, fg: c.tone.fg, circleBg: c.tone.circleBg, circleFg: c.tone.circleFg,
    nameColor: i === active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.32)',
    pick: () => { if (activeRef.current !== i) setActive(i); },
  }));

  return (
    <>
      <section id="ol-werk" className="ol-workwrap ol-snap" aria-labelledby="ol-werk-h" style={{ marginTop: '30px', padding: '30px 16px 16px' }}>
      <div className="ol-work" style={{ maxWidth: '1600px', margin: '0 auto', background: '#0A0F1F', color: '#FFFFFF', borderRadius: '12px', padding: '56px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '56px' }}>

      <div className="ol-workleft" style={{ position: 'sticky', top: '120px', alignSelf: 'start', display: 'flex', flexDirection: 'column' }}>
      <h2 id="ol-werk-h" style={{ margin: '0', fontSize: '22px', fontWeight: '600', letterSpacing: '-0.01em' }}>Ons werk</h2>
      <p style={{ margin: '8px 0 0', fontSize: '16px', lineHeight: '1.6', color: '#A9AFBF', maxWidth: '380px' }}>Een greep uit de 150+ websites waar we dagelijks aan werken.</p>
      <ul className="ol-names" style={{ listStyle: 'none', margin: '120px 0 0', padding: '0', display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {cases.map((c, $index) => (<Fragment key={$index}>
      <li>
      <a className="ol-name" href={c.href} onMouseEnter={c.pick} onFocus={c.pick} style={{ display: 'block', textDecoration: 'none', color: c.nameColor }}>
      <span style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#A9AFBF' }}>({c.tag})</span>
      <span style={{ display: 'block', fontSize: 'clamp(36px, 4.2vw, 64px)', fontWeight: '600', letterSpacing: '-0.035em', lineHeight: '1.05' }}>{c.name}</span>
      </a>
      </li>
      </Fragment>))}
      </ul>
      <a className="ol-alllink" href="/ons-werk" style={{ marginTop: '48px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: '600', color: '#FFFFFF', textDecoration: 'none' }}>Alle cases
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: '2.5', strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
      </a>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {cases.map((c, $index) => (<Fragment key={$index}>
      <div>
      <a className="ol-card" data-idx={$index} href={c.href} onMouseEnter={c.pick} onFocus={c.pick} aria-label={`${c.name}: ${c.stat}`} style={{ position: 'relative', display: 'block', aspectRatio: '16 / 10', borderRadius: '8px', overflow: 'hidden', background: c.bg, textDecoration: 'none' }}>
      {c.hasImg && (<>
      <Image src={c.img} alt={c.alt} fill sizes="(max-width: 960px) 100vw, 50vw" quality={78} style={{ objectFit: 'cover', objectPosition: c.pos }} />
      </>)}
      <div className={`ol-cardover ${c.overClass}`} style={{ position: 'absolute', inset: '0', background: c.bg, padding: '32px', boxSizing: 'border-box', opacity: c.overBase }}>
      <p className="ol-cardstat" style={{ margin: '0', maxWidth: '92%', fontSize: 'clamp(26px, 2.6vw, 40px)', fontWeight: '600', lineHeight: '1.12', letterSpacing: '-0.025em', color: c.fg }}>{c.stat}</p>
      <span className="ol-circle" aria-hidden="true" style={{ position: 'absolute', left: '50%', top: '58%', transform: 'translate(-50%, -50%)', width: '112px', height: '112px', borderRadius: '50%', background: c.circleBg, color: c.circleFg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M7 17L17 7M8 7h9v9"></path></svg>
      </span>
      </div>
      <div style={{ position: 'absolute', left: '20px', right: '20px', bottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', height: '40px', padding: '0 16px', borderRadius: '6px', background: '#FFFFFF', color: '#0A0F1F', fontSize: '15px', fontWeight: '700' }}>{c.name}</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', height: '40px', padding: '0 16px', borderRadius: '6px', background: 'rgba(255, 255, 255, 0.92)', color: '#0A0F1F', fontSize: '14px', fontWeight: '600' }}>{c.services}</span>
      </div>
      </a>
      <p className="ol-cardcap" style={{ margin: '14px 0 0', fontSize: '16px', lineHeight: '1.5', color: '#A9AFBF' }}>{c.stat}</p>
      </div>
      </Fragment>))}
      </div>

      </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Waarom OnlineLabs                                                    */
/* ------------------------------------------------------------------ */
function Why() {
  const [whyOn, setWhyOn] = useState(false);
  useEffect(() => {
    const reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const why = document.querySelector('.ol-why-cards');
    if (reduced || !why || !window.IntersectionObserver) {
      setWhyOn(true);
      return undefined;
    }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setWhyOn(true);
        io.disconnect();
      }
    }, { threshold: 0.35 });
    io.observe(why);
    return () => io.disconnect();
  }, []);
  const whyClass = whyOn ? 'is-on' : '';

  return (
    <>
      <section className="ol-why ol-snap" aria-labelledby="ol-why-h" style={{ maxWidth: '1440px', margin: '0 auto', padding: '96px 40px', boxSizing: 'border-box', minHeight: 'calc(100vh - 104px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="ol-why-top" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '64px', alignItems: 'start' }}>
      <h2 id="ol-why-h" className="ol-why-h" style={{ margin: '0', fontSize: '64px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.035em' }}>Waarom OnlineLabs<span style={{ color: '#376EB5' }}>.</span></h2>
      <p style={{ margin: '0', fontSize: '20px', lineHeight: '1.6', color: '#3A4256' }}>Voor de AI-revolutie werkten hier twee programmeurs en drie SEO-copywriters. Nu doen we het met drie specialisten en een slimme AI-assistent naast ons. Sneller, scherper en betaalbaarder. AI is ons gereedschap, het vakwerk en de liefde voor het vak maken het verschil.</p>
      </div>

      <div className={`ol-why-cards ${whyClass}`} style={{ marginTop: '64px', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '24px' }}>

      <div className="ol-why-card" style={{ background: '#376EB5', color: '#FFFFFF', borderRadius: '12px', padding: '36px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ margin: '0', fontSize: '38px', fontWeight: '800', lineHeight: '1.05', letterSpacing: '-0.03em' }}>Drie specialisten, één AI-assistent</h3>
      <p style={{ margin: '24px 0 0', fontSize: '16px', lineHeight: '1.6', color: '#E4ECF8' }}>Imre, Sanne en Adrian: SEO en AI-zichtbaarheid, development en adverteren. Elk een expert in zijn vak, samen met AI die het zware werk versnelt.</p>
      </div>

      <div className="ol-why-card" style={{ background: '#DCE7F6', color: '#0A0F1F', borderRadius: '12px', padding: '36px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ margin: '0', fontSize: '38px', fontWeight: '800', lineHeight: '1.05', letterSpacing: '-0.03em' }}>Topkwaliteit binnen bereik</h3>
      <p style={{ margin: '24px 0 0', fontSize: '16px', lineHeight: '1.6', color: '#3A4256' }}>Wat voor de AI-revolutie 30.000 euro kostte, ligt nu binnen bereik van veel meer ondernemers. Zonder in te leveren op UX, SEO of techniek.</p>
      </div>

      <div className="ol-why-card" style={{ background: '#0A0F1F', color: '#FFFFFF', borderRadius: '12px', padding: '36px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ margin: '0', fontSize: '38px', fontWeight: '800', lineHeight: '1.05', letterSpacing: '-0.03em' }}>We meten het zelf</h3>
      <p style={{ margin: '24px 0 0', fontSize: '16px', lineHeight: '1.6', color: '#A9AFBF' }}>Met ons eigen platform Teun.ai zien we hoe ChatGPT, Perplexity en Google AI jouw merk noemen. Geen onderbuikgevoel, maar data.</p>
      <a className="ol-why-link" href="https://teun.ai/tools/ai-visibility" target="_blank" rel="noopener" style={{ marginTop: '20px', alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '8px', minHeight: '44px', color: '#FFFFFF', fontSize: '16px', fontWeight: '600', textDecoration: 'none' }}>Scan je merk met Teun.ai
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: '2.5', strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M7 17L17 7M8 7h9v9"></path></svg>
      </a>
      </div>

      </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Reviews en logo's                                                    */
/* ------------------------------------------------------------------ */
function Reviews({ reviews, logosTop, logosBottom }) {
  const [revP, setRevP] = useState(0);
  const [revW, setRevW] = useState(0.3);
  const st = useRef({ p: 0, w: 0.3 });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = document.querySelector('.ol-revgrid');
    if (!el) return undefined;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      const p = max > 0 ? el.scrollLeft / max : 0;
      const w = el.scrollWidth > 0 ? Math.min(1, el.clientWidth / el.scrollWidth) : 1;
      if (Math.abs(p - st.current.p) > 0.004 || Math.abs(w - st.current.w) > 0.004) {
        st.current = { p, w };
        setRevP(p);
        setRevW(w);
      }
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const revStep = (dir) => {
    const el = document.querySelector('.ol-revgrid');
    if (!el) return;
    const card = el.querySelector('.ol-rev');
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth / 3;
    el.scrollBy({ left: dir * step, behavior: reduced.current ? 'auto' : 'smooth' });
  };

  const w = Math.max(revW, 0.08);
  const revThumbW = (w * 100).toFixed(2) + '%';
  const revThumbLeft = (revP * (1 - w) * 100).toFixed(2) + '%';
  const revPrevOp = revP <= 0.002 ? '0.35' : '1';
  const revNextOp = revP >= 0.998 ? '0.35' : '1';
  const revPrev = () => revStep(-1);
  const revNext = () => revStep(1);

  return (
    <>
      <section className="ol-revs ol-snap" aria-labelledby="ol-revs-h" style={{ maxWidth: '1440px', margin: '0 auto', padding: '72px 40px', boxSizing: 'border-box', minHeight: 'calc(100vh - 104px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="ol-why-top" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '64px', alignItems: 'end' }}>
      <h2 id="ol-revs-h" className="ol-why-h" style={{ margin: '0', fontSize: '64px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.035em' }}>In hun woorden<span style={{ color: '#376EB5' }}>.</span></h2>
      <div>
      <p style={{ margin: '0', fontSize: '20px', lineHeight: '1.6', color: '#3A4256' }}>Sommige klanten werken al meer dan tien jaar met ons. Dat zegt meer dan wij zelf kunnen zeggen.</p>
      <p style={{ margin: '16px 0 0', fontSize: '15px', color: '#5B6275', display: 'flex', flexWrap: 'wrap', gap: '6px 10px' }}><span>5,0 uit 29 Google reviews</span><span aria-hidden="true">·</span><span>Google Partner</span></p>
      </div>
      </div>

      <div className="ol-revgrid" style={{ marginTop: '40px', marginRight: '-40px', padding: '8px 40px 28px 0', display: 'flex', gap: '16px', overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}>
      {reviews.map((r, $index) => (<Fragment key={$index}>
      <figure className="ol-rev" style={{ flex: '0 0 calc((100% - 48px) / 3.3)', scrollSnapAlign: 'start', margin: '0', background: '#FFFFFF', border: '1px solid #E6E8EE', borderRadius: '12px', padding: '28px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '24px' }}>
      <blockquote style={{ margin: '0', fontSize: '16px', lineHeight: '1.6', color: '#0A0F1F' }}>{r.q}</blockquote>
      <figcaption>
      <span style={{ display: 'block', fontSize: '15px', fontWeight: '600', color: '#0A0F1F' }}>{r.n}</span>
      <span style={{ display: 'block', marginTop: '2px', fontSize: '14px', color: '#5B6275' }}>{r.r}</span>
      </figcaption>
      </figure>
      </Fragment>))}
      </div>
      <div className="ol-revnav" style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '40px' }}>
      <div aria-hidden="true" style={{ flex: '1', height: '2px', background: '#E6E8EE', borderRadius: '2px', position: 'relative', overflow: 'hidden' }}><span style={{ position: 'absolute', top: '0', bottom: '0', left: revThumbLeft, width: revThumbW, background: '#376EB5', borderRadius: '2px', transition: 'left .25s ease' }}></span></div>
      <div style={{ display: 'flex', gap: '24px' }}>
      <button className="ol-revbtn" type="button" onClick={revPrev} aria-label="Vorige reviews" style={{ opacity: revPrevOp }}>Vorige</button>
      <button className="ol-revbtn" type="button" onClick={revNext} aria-label="Volgende reviews" style={{ opacity: revNextOp }}>Volgende</button>
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
    </>
  );
}

export default function HomeView({ reviews = [], logosTop = [], logosBottom = [] }) {
  return (
    <div className="v27 v27-home">
      <Hero />
      <Work />
      <Why />
      <Reviews reviews={reviews} logosTop={logosTop} logosBottom={logosBottom} />
    </div>
  );
}
