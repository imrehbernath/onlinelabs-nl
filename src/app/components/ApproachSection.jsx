/* OnlineLabs — "Onze aanpak" (koele licht-grijsblauwe sectie).
   Server component, geen client-JS. Links een sticky intro, rechts een
   verticale roadmap met 4 stappen op een dunne blauwe lijn.
   Tonale afwisseling met de warmere/donkere secties eromheen. */

const steps = [
  { num: '01', title: 'Analyse', desc: 'Website, markt, concurrenten, techniek en zichtbaarheid.' },
  { num: '02', title: 'Strategie', desc: 'Prioriteiten bepalen op basis van impact en haalbaarheid.' },
  { num: '03', title: 'Optimalisatie', desc: 'SEO, GEO, content, techniek, UX, snelheid en conversie verbeteren.' },
  { num: '04', title: 'Meten & verbeteren', desc: 'Resultaten volgen in rankings, verkeer, leads, conversies en AI-vermeldingen.' },
];

export default function ApproachSection() {
  return (
    <section className="flow-sec" id="aanpak" aria-label="Onze aanpak">
      <style>{`
        .flow-sec {
          --mist:#e9edf3; --mist-2:#f3f6fa; --mist-line:rgba(20,32,44,0.10);
          --paper-ink:#15212c; --paper-muted:#5d6b76;
          --blue:#4d83c9; --blue-deep:#376eb5; --accent:#4d83c9;
          --serif:'Playfair Display',Georgia,serif;
          --mono:var(--font-space-mono),'Space Mono',ui-monospace,monospace;
          --wrap:1280px; --gutter:clamp(20px,5vw,64px);
          position:relative; background:var(--mist); color:var(--paper-ink);
          padding:clamp(80px,11vw,168px) 0;
        }
        .flow-sec .wrap { width:min(100% - var(--gutter)*2, var(--wrap)); margin-inline:auto; }
        .flow-sec .flow__grid { display:grid; grid-template-columns:0.92fr 1.08fr; gap:clamp(2.5rem,6vw,6rem); align-items:start; }

        .flow-sec .eyebrow {
          font-family:var(--mono); font-size:0.78rem; letter-spacing:0.22em; text-transform:uppercase;
          color:var(--accent); display:inline-flex; align-items:center; gap:0.7em; font-weight:400;
        }
        .flow-sec .eyebrow::before { content:""; width:26px; height:1px; background:currentColor; opacity:0.6; }

        .flow-sec .flow__intro { position:sticky; top:clamp(90px,12vh,130px); }
        .flow-sec .flow__eyebrow { margin-bottom:1.3rem; }
        .flow-sec .flow__title {
          font-family:var(--serif); font-weight:600; letter-spacing:-0.015em; text-wrap:balance;
          font-size:clamp(2.1rem,4.6vw,3.6rem); line-height:1.04; max-width:13ch; margin:0 0 1.6rem; color:var(--paper-ink);
        }
        .flow-sec .flow__lead { color:var(--paper-muted); max-width:46ch; font-size:clamp(1.02rem,1.3vw,1.16rem); line-height:1.62; margin:0; }
        .flow-sec .flow__proof {
          margin:clamp(1.8rem,3vw,2.4rem) 0 0; padding-left:1.1rem; border-left:2px solid var(--blue);
          font-family:var(--serif); font-style:italic; font-weight:400;
          font-size:clamp(1.05rem,1.4vw,1.22rem); line-height:1.45; color:var(--paper-ink); max-width:34ch;
        }

        .flow-sec .flow__road { position:relative; padding-left:0.5rem; }
        .flow-sec .flow__road::before {
          content:""; position:absolute; left:23px; top:26px; bottom:26px; width:1px;
          background:linear-gradient(var(--blue), color-mix(in oklab, var(--blue) 25%, transparent));
        }
        .flow-sec .flow__step {
          position:relative; display:grid; grid-template-columns:48px 1fr; gap:1.4rem; align-items:start;
          padding:clamp(1.5rem,2.6vw,2.2rem) 0; border-top:1px solid var(--mist-line);
          transition:transform .35s cubic-bezier(.2,.7,.3,1);
        }
        .flow-sec .flow__step:first-child { border-top:none; padding-top:0; }
        .flow-sec .flow__step:last-child { padding-bottom:0; }
        .flow-sec .flow__node {
          position:relative; z-index:1; width:48px; height:48px; border-radius:50%;
          background:var(--mist-2); border:1px solid color-mix(in oklab, var(--blue) 45%, var(--mist-line));
          display:grid; place-items:center;
          font-family:var(--mono); font-size:0.92rem; font-weight:700; color:var(--blue-deep);
          transition:background .3s, color .3s, border-color .3s, box-shadow .3s;
        }
        .flow-sec .flow__step-title { font-family:var(--serif); font-weight:700; font-size:clamp(1.3rem,1.9vw,1.7rem);
          line-height:1.1; color:var(--paper-ink); margin:0.2rem 0 0.5rem; transition:color .3s; }
        .flow-sec .flow__step-desc { color:var(--paper-muted); font-size:1.02rem; line-height:1.55; margin:0; max-width:42ch; }

        .flow-sec .flow__step:hover { transform:translateX(8px); }
        .flow-sec .flow__step:hover .flow__node {
          background:var(--blue-deep); color:#fff; border-color:var(--blue-deep);
          box-shadow:0 8px 22px -8px rgba(55,110,181,0.6);
        }
        .flow-sec .flow__step:hover .flow__step-title { color:var(--blue-deep); }

        @media (max-width:880px) {
          .flow-sec .flow__grid { grid-template-columns:1fr; gap:2.8rem; }
          .flow-sec .flow__intro { position:static; }
        }
      `}</style>

      <div className="wrap flow__grid">
        <div className="flow__intro">
          <span className="eyebrow flow__eyebrow">Onze aanpak</span>
          <h2 className="flow__title">Van analyse naar online groei</h2>
          <p className="flow__lead">
            We starten met data, niet met aannames. We onderzoeken je website, markt, concurrenten en
            zichtbaarheid in Google en AI-platformen. Daarna bouwen we een aanpak die past bij je doelen:
            meer zichtbaarheid, meer vertrouwen en meer aanvragen.
          </p>
          <p className="flow__proof">Geen losse acties, maar een duidelijke route van inzicht naar resultaat.</p>
        </div>

        <div className="flow__road">
          {steps.map((s) => (
            <div className="flow__step" key={s.num}>
              <div className="flow__node">{s.num}</div>
              <div className="flow__content">
                <h3 className="flow__step-title">{s.title}</h3>
                <p className="flow__step-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
