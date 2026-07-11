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
      <style>{`
        .svc {
          --ink:#0a1a2b; --ink-3:#071420; --ink-line:rgba(244,241,234,0.13);
          --cream:#f4f1ea; --cream-2:#c9d3dc; --muted:#8ba0b2;
          --blue:#4d83c9; --blue-deep:#376eb5; --accent:#4d83c9;
          --serif:'Playfair Display',Georgia,serif;
          --mono:var(--font-space-mono),'Space Mono',ui-monospace,monospace;
          --wrap:1280px; --gutter:clamp(20px,5vw,64px);
          position:relative; overflow:hidden;
          background:var(--ink); color:var(--cream);
          padding:clamp(80px,11vw,168px) 0;
        }
        .svc .wrap { width:min(100% - var(--gutter)*2, var(--wrap)); margin-inline:auto; position:relative; z-index:1; }

        .svc__arc {
          position:absolute; z-index:0; pointer-events:none;
          transform-origin:top right; transform:scale(0.5); opacity:0.25;
          will-change:transform, opacity;
          width:min(74vw,1040px); aspect-ratio:1; border-radius:50%;
          right:-14vw; top:-18vw;
          border:1px solid rgba(77,131,201,0.22);
          background:radial-gradient(circle at 36% 38%, rgba(77,131,201,0.22), transparent 60%),
                     radial-gradient(circle at 62% 60%, rgba(55,110,181,0.12), transparent 62%);
        }
        .svc__arc--2 {
          right:auto; top:auto; left:-20vw; bottom:-24vw;
          width:min(64vw,820px); transform-origin:bottom left;
          border:1px solid rgba(77,131,201,0.18);
          background:radial-gradient(circle at 60% 42%, rgba(77,131,201,0.16), transparent 60%),
                     radial-gradient(circle at 44% 64%, rgba(55,110,181,0.12), transparent 62%);
        }
        @media (prefers-reduced-motion: reduce) {
          .svc__arc { transform:scale(1) !important; opacity:1 !important; }
        }

        .svc .eyebrow {
          font-family:var(--mono); font-size:0.78rem; letter-spacing:0.22em; text-transform:uppercase;
          color:var(--accent); display:inline-flex; align-items:center; gap:0.7em; font-weight:400;
        }
        .svc .eyebrow::before { content:""; width:26px; height:1px; background:currentColor; opacity:0.6; }

        .svc__head { display:grid; grid-template-columns:1.15fr 1fr; gap:clamp(1.5rem,4vw,4rem);
          align-items:end; margin-bottom:clamp(3rem,5vw,4.6rem); }
        .svc__title { font-family:var(--serif); font-weight:600; letter-spacing:-0.015em; text-wrap:balance;
          font-size:clamp(2.4rem,5.4vw,4.6rem); line-height:1.0; max-width:12ch; margin:0; color:var(--cream); }
        .svc__title em { font-style:normal; color:var(--blue); }
        .svc__intro { color:var(--cream-2); font-size:clamp(1.05rem,1.4vw,1.28rem); line-height:1.62; max-width:46ch; margin:0; }

        .svc__grid { display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(1rem,1.6vw,1.5rem); }
        .svc__card {
          position:relative; isolation:isolate; overflow:hidden;
          display:flex; flex-direction:column;
          padding:clamp(1.6rem,2.4vw,2.2rem);
          background:linear-gradient(180deg, rgba(244,241,234,0.04), rgba(244,241,234,0.012)),
                     linear-gradient(180deg, rgba(10,26,43,0.86), rgba(7,20,32,0.9));
          border:1px solid var(--ink-line); border-radius:16px;
          transition:transform .4s cubic-bezier(.2,.7,.3,1), border-color .4s, background .4s;
        }
        .svc__card::before {
          content:""; position:absolute; left:0; right:0; bottom:0; height:2px; z-index:2;
          background:linear-gradient(90deg, var(--blue), var(--blue-deep));
          transform:scaleX(0); transform-origin:left; transition:transform .45s cubic-bezier(.2,.7,.3,1);
        }
        .svc__card:hover {
          transform:translateY(-6px); border-color:rgba(77,131,201,0.4);
          background:linear-gradient(180deg, rgba(77,131,201,0.12), rgba(244,241,234,0.015)),
                     linear-gradient(180deg, rgba(10,26,43,0.86), rgba(7,20,32,0.9));
        }
        .svc__card:hover::before { transform:scaleX(1); }

        .svc__fold {
          position:absolute; top:0; right:0; z-index:3; width:0; height:0;
          border-style:solid; border-width:0 26px 26px 0;
          border-color:transparent rgba(77,131,201,0.5) transparent transparent;
          transition:border-width .4s cubic-bezier(.2,.7,.3,1), border-color .4s;
        }
        .svc__card:hover .svc__fold { border-width:0 42px 42px 0; border-right-color:var(--blue); }

        .svc__num { font-family:var(--mono); font-size:0.78rem; letter-spacing:0.12em; color:var(--muted);
          margin-bottom:clamp(2rem,3.5vw,3.2rem); }
        .svc__name { font-family:var(--serif); font-weight:700; font-size:clamp(1.3rem,1.8vw,1.6rem);
          line-height:1.12; color:var(--cream); margin:0 0 0.7rem; transition:color .3s; }
        .svc__card:hover .svc__name { color:#fff; }
        .svc__text { color:var(--muted); font-size:0.98rem; line-height:1.55; margin:0; }

        @media (max-width:980px) {
          .svc__grid { grid-template-columns:repeat(2,1fr); }
          .svc__head { grid-template-columns:1fr; align-items:start; }
        }
        @media (max-width:600px) {
          .svc__grid { grid-template-columns:1fr; }
        }
      `}</style>

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
