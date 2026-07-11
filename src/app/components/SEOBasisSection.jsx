import Link from 'next/link';

/* OnlineLabs — "AI-zichtbaarheid begint bij sterke SEO" (editorial, paper).
   Server component, geen client-JS. Twee kolommen: links de copy, rechts een
   rustig signalenpaneel. Accent in OnlineLabs-blauw. */

const signals = [
  'Technische SEO',
  'Sterke content',
  'Structured data',
  'Reviews & autoriteit',
  'Snelle website',
  'Merkconsistentie',
];

export default function SEOBasisSection() {
  return (
    <section className="aiv-sec" id="geo" aria-label="AI-zichtbaarheid">
      <style>{`
        .aiv-sec {
          --paper:#f4f0e7; --paper-2:#ece6d8; --paper-ink:#15212c; --paper-muted:#5d6b76;
          --paper-line:rgba(20,32,44,0.12);
          --blue:#4d83c9; --blue-deep:#376eb5; --accent:#4d83c9;
          --serif:'Playfair Display',Georgia,serif;
          --mono:var(--font-space-mono),'Space Mono',ui-monospace,monospace;
          --wrap:1280px; --gutter:clamp(20px,5vw,64px);
          position:relative; background:var(--paper); color:var(--paper-ink);
          padding:clamp(80px,11vw,168px) 0;
        }
        .aiv-sec .wrap { width:min(100% - var(--gutter)*2, var(--wrap)); margin-inline:auto; }
        .aiv-sec .aiv__grid { display:grid; grid-template-columns:1.02fr 0.98fr; gap:clamp(2.5rem,6vw,6rem); align-items:center; }

        .aiv-sec .eyebrow {
          font-family:var(--mono); font-size:0.78rem; letter-spacing:0.22em; text-transform:uppercase;
          color:var(--accent); display:inline-flex; align-items:center; gap:0.7em; font-weight:400;
        }
        .aiv-sec .eyebrow::before { content:""; width:26px; height:1px; background:currentColor; opacity:0.6; }
        .aiv-sec .aiv__eyebrow { margin-bottom:1.3rem; }
        .aiv-sec .aiv__title {
          font-family:var(--serif); font-weight:600; letter-spacing:-0.015em; text-wrap:balance;
          font-size:clamp(2.1rem,4.6vw,3.6rem); line-height:1.04; max-width:16ch; margin:0 0 1.7rem; color:var(--paper-ink);
        }
        .aiv-sec .aiv__title em { font-style:normal; color:var(--blue-deep); }
        .aiv-sec .aiv__body { color:var(--paper-muted); max-width:50ch; }
        .aiv-sec .aiv__body p { margin:0 0 1.2rem; font-size:clamp(1.02rem,1.3vw,1.16rem); line-height:1.62; }
        .aiv-sec .aiv__body p:last-of-type { margin-bottom:0; }
        .aiv-sec .aiv__body strong { color:var(--paper-ink); font-weight:600; }
        .aiv-sec .aiv__cta {
          display:inline-flex; align-items:center; gap:0.6em; margin-top:clamp(1.8rem,3vw,2.4rem);
          font-weight:600; font-size:1.02rem; color:var(--blue-deep);
          border-bottom:2px solid color-mix(in oklab, var(--blue) 35%, transparent);
          padding-bottom:3px; transition:border-color .25s, gap .25s;
        }
        .aiv-sec .aiv__cta:hover { border-bottom-color:var(--blue); gap:0.9em; }
        .aiv-sec .aiv__cta svg { width:18px; height:18px; transition:transform .3s; }
        .aiv-sec .aiv__cta:hover svg { transform:translateX(3px); }

        .aiv-sec .aiv__panel {
          background:var(--paper-2); border:1px solid var(--paper-line); border-radius:20px;
          padding:clamp(1.8rem,2.6vw,2.6rem); box-shadow:0 30px 70px -44px rgba(7,20,32,0.4);
        }
        .aiv-sec .aiv__panel-label {
          font-family:var(--mono); font-size:0.74rem; letter-spacing:0.16em; text-transform:uppercase;
          color:var(--blue-deep); margin:0 0 0.4rem;
        }
        .aiv-sec .aiv__panel-title {
          font-family:var(--serif); font-weight:700; font-size:clamp(1.3rem,1.7vw,1.55rem);
          color:var(--paper-ink); margin:0 0 1.4rem; line-height:1.15;
        }
        .aiv-sec .aiv__signals { list-style:none; margin:0; padding:0; }
        .aiv-sec .aiv__signal { display:flex; align-items:center; gap:1rem; padding:0.95rem 0; border-top:1px solid var(--paper-line); }
        .aiv-sec .aiv__signal:first-child { border-top:none; padding-top:0; }
        .aiv-sec .aiv__signal:last-child { padding-bottom:0; }
        .aiv-sec .aiv__signal .tick {
          flex:none; width:30px; height:30px; border-radius:9px;
          background:rgba(55,110,181,0.12); color:var(--blue-deep); display:grid; place-items:center;
        }
        .aiv-sec .aiv__signal .tick svg { width:16px; height:16px; }
        .aiv-sec .aiv__signal-name { font-weight:600; font-size:1.06rem; color:var(--paper-ink); }
        .aiv-sec .aiv__foot {
          margin-top:clamp(1.4rem,2.4vw,2rem); padding-top:clamp(1.2rem,2vw,1.6rem);
          border-top:1px solid var(--paper-line); display:flex; align-items:center; gap:0.7rem;
          font-family:var(--mono); font-size:0.78rem; letter-spacing:0.04em; color:var(--paper-muted);
        }
        .aiv-sec .aiv__foot b { color:var(--blue-deep); font-weight:700; }

        @media (max-width:880px) {
          .aiv-sec .aiv__grid { grid-template-columns:1fr; gap:2.5rem; }
        }
      `}</style>

      <div className="wrap aiv__grid">
        <div className="aiv__copy">
          <span className="eyebrow aiv__eyebrow">GEO &amp; AI-zichtbaarheid</span>
          <h2 className="aiv__title">AI-zichtbaarheid begint bij <em>sterke SEO</em></h2>
          <div className="aiv__body">
            <p>
              ChatGPT, Google AI en andere AI-systemen halen hun antwoorden uit bestaande online
              signalen. Daarom begint GEO niet met trucjes, maar met <strong>sterke content,
              technische SEO, autoriteit, reviews en een duidelijk merkverhaal</strong>.
            </p>
            <p>
              OnlineLabs combineert klassieke SEO met AI visibility, zodat je zichtbaar wordt in
              Google én in de antwoorden die klanten steeds vaker gebruiken.
            </p>
          </div>
          <Link className="aiv__cta" href="/skills/geo-optimalisatie">
            Bekijk GEO optimalisatie
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="aiv__panel">
          <p className="aiv__panel-label">Waar GEO op rust</p>
          <h3 className="aiv__panel-title">De signalen die AI laat meewegen</h3>
          <ul className="aiv__signals">
            {signals.map((name) => (
              <li className="aiv__signal" key={name}>
                <span className="tick">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="aiv__signal-name">{name}</span>
              </li>
            ))}
          </ul>
          <div className="aiv__foot"><b>SEO + GEO</b> = maximale zichtbaarheid</div>
        </div>
      </div>
    </section>
  );
}
