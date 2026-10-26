import { Fragment } from 'react';
import Image from 'next/image';

// Casepagina 2027: korte opbouw met hero, grote schermafbeelding, cijfers, verhaal, wat we gedaan hebben en andere cases.

export default function CaseView({ c }) {
  return (
    <div className="v27 v27-home v27-case">
      <section className="ol-hero ol-case-hero" style={{ maxWidth: '1440px', margin: '0 auto', padding: '96px 40px 64px', boxSizing: 'border-box' }}>
      <p className="ol-eyebrow" style={{ margin: '0 0 32px', fontSize: '15px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5B6275' }}><a className="ol-case-back" href="/ons-werk" style={{ color: 'inherit', textDecoration: 'none' }}>Ons werk</a><span aria-hidden="true" style={{ margin: '0 10px' }}>/</span>{c.sector}</p>
      <h1 style={{ margin: '0', fontSize: 'clamp(52px, 7.6vw, 120px)', fontWeight: '800', lineHeight: '0.95', letterSpacing: '-0.035em' }}>{c.name}<span style={{ color: '#376EB5' }}>.</span></h1>
      <p className="ol-seo-lede" style={{ margin: '40px 0 0', maxWidth: '900px', fontSize: '30px', fontWeight: '400', lineHeight: '1.35', letterSpacing: '-0.01em', color: '#0A0F1F' }}>{c.lede}</p>
      <div className="ol-hero-row" style={{ marginTop: '56px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '24px 48px' }}>
      <p className="ol-seo-proof" style={{ margin: '0', fontSize: '15px', color: '#5B6275', display: 'flex', flexWrap: 'wrap', gap: '6px 10px' }}>
      {c.proof.map((p, i) => (<Fragment key={i}>{i > 0 && <span aria-hidden="true">·</span>}<span>{p}</span></Fragment>))}
      </p>
      <div className="ol-seo-cta" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px 32px' }}>
      <a className="ol-scroll ol-down" href={c.url} target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', fontSize: '17px', fontWeight: '600', textDecoration: 'none' }}>Bekijk {c.urlLabel}</a>
      <a className="ol-pill" href="/contact?skill=website" style={{ display: 'inline-flex', alignItems: 'center', height: '56px', padding: '0 28px', borderRadius: '999px', background: '#0A0F1F', color: '#FFFFFF', fontSize: '16px', fontWeight: '600', textDecoration: 'none', whiteSpace: 'nowrap' }}>Gratis adviesgesprek</a>
      </div>
      </div>
      </section>

      <section className="ol-wwd ol-case-show" aria-label={`De website van ${c.name}`} style={{ padding: '0 16px 16px' }}>
      <div className="ol-wwd-panel ol-case-panel" style={{ maxWidth: '1600px', margin: '0 auto', background: '#F4F6FA', borderRadius: '12px', padding: '72px 56px', boxSizing: 'border-box' }}>
      <div className="ol-case-screen" style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', aspectRatio: '3 / 2', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 24px 64px rgba(10,15,31,.16)', background: '#FFFFFF' }}>
      <Image src={c.desktop.src} alt={c.desktop.alt} fill priority sizes="(max-width: 960px) 92vw, 1200px" quality={85} style={{ objectFit: 'cover', objectPosition: 'top center' }} />
      </div>
      <dl className="ol-case-stats" style={{ margin: '72px auto 0', maxWidth: '1200px', display: 'grid', gridTemplateColumns: `repeat(${c.stats.length}, minmax(0, 1fr))`, gap: '32px' }}>
      {c.stats.map((s, i) => (<div key={i} style={{ borderTop: '2px solid #0A0F1F', paddingTop: '20px' }}>
      <dt style={{ fontSize: '56px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.04em', color: '#376EB5' }}>{s.n}</dt>
      <dd style={{ margin: '10px 0 0', fontSize: '17px', color: '#3A4256' }}>{s.l}</dd>
      </div>))}
      </dl>
      </div>
      </section>

      <section className="ol-why ol-case-story" aria-labelledby="ol-case-story-h" style={{ maxWidth: '1440px', margin: '0 auto', padding: '120px 40px 56px', boxSizing: 'border-box' }}>
      <div className="ol-why-top" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '64px', alignItems: 'start' }}>
      <h2 id="ol-case-story-h" className="ol-why-h" style={{ margin: '0', fontSize: '64px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.035em' }}>{c.storyH}<span style={{ color: '#376EB5' }}>.</span></h2>
      <p style={{ margin: '0', fontSize: '20px', lineHeight: '1.6', color: '#3A4256' }}>{c.story}</p>
      </div>
      </section>

      <section className="ol-steps ol-case-done" aria-labelledby="ol-case-done-h" style={{ maxWidth: '1440px', margin: '0 auto', padding: '56px 40px 120px', boxSizing: 'border-box' }}>
      <h2 id="ol-case-done-h" className="ol-why-h" style={{ margin: '0', fontSize: '64px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.035em' }}>Wat we gedaan hebben<span style={{ color: '#376EB5' }}>.</span></h2>
      <div className="ol-case-grid" style={{ marginTop: '64px', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '56px 64px' }}>
      {c.done.map((d, i) => (<div key={i} className="ol-step-col" style={{ borderTop: '2px solid #0A0F1F', paddingTop: '28px' }}>
      <p style={{ margin: '0', fontSize: '15px', fontWeight: '600', letterSpacing: '0.12em', color: '#376EB5' }}>{String(i + 1).padStart(2, '0')}</p>
      <h3 style={{ margin: '16px 0 0', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em' }}>{d.t}</h3>
      <p style={{ margin: '14px 0 0', fontSize: '17px', lineHeight: '1.6', color: '#3A4256' }}>{d.d}</p>
      </div>))}
      </div>
      </section>

      <section className="ol-wwd" aria-labelledby="ol-case-more-h" style={{ padding: '0 16px 16px' }}>
      <div className="ol-wwd-panel" style={{ maxWidth: '1600px', margin: '0 auto', background: '#F4F6FA', borderRadius: '12px', padding: '64px 56px', boxSizing: 'border-box' }}>
      <div className="ol-why-top" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '64px', alignItems: 'end' }}>
      <h2 id="ol-case-more-h" className="ol-why-h" style={{ margin: '0', fontSize: '64px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.035em' }}>Meer cases<span style={{ color: '#376EB5' }}>.</span></h2>
      <p style={{ margin: '0', fontSize: '20px', lineHeight: '1.6', color: '#3A4256' }}>Andere websites waar we aan bouwen en aan blijven werken.</p>
      </div>
      <div className="ol-port-grid" style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '32px 24px' }}>
      {c.more.map((p, i) => (<a key={i} className="ol-portcard" href={p.href} style={{ display: 'block', color: '#0A0F1F', textDecoration: 'none' }}>
      <span className="ol-portimg is-framed" style={{ position: 'relative', display: 'block', aspectRatio: '3 / 2', borderRadius: '10px', overflow: 'hidden', background: '#DCE7F6' }}>
      <span className="ol-portshot"><Image src={p.img} alt={p.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw" quality={78} style={{ objectFit: 'cover', objectPosition: 'top center' }} /></span>
      <span className="ol-portover" style={{ position: 'absolute', left: '16px', bottom: '16px', display: 'inline-flex', alignItems: 'center', height: '40px', padding: '0 16px', borderRadius: '6px', background: '#FFFFFF', color: '#0A0F1F', fontSize: '14px', fontWeight: '700' }}>Bekijk case</span>
      </span>
      <span style={{ display: 'block', marginTop: '14px', fontSize: '20px', fontWeight: '600', letterSpacing: '-0.01em' }}>{p.name}</span>
      </a>))}
      </div>
      <a className="ol-scroll ol-down" href="/ons-werk" style={{ marginTop: '32px', display: 'inline-block', fontSize: '17px', fontWeight: '600', textDecoration: 'none' }}>Alle cases</a>
      </div>
      </section>
    </div>
  );
}
