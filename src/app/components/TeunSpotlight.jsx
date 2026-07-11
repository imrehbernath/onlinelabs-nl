import Image from 'next/image';

/* OnlineLabs — "Teun.ai" platformsectie (editorial paper).
   Server component, geen client-JS. Teun staat op een blauwe rand met 3
   zwevende kaartjes (pure CSS, respecteert prefers-reduced-motion).
   Mascotte via CDN met vaste afmetingen (geen CLS), lazy onder de vouw. */

export default function TeunSpotlight() {
  const checks = [
    'Meetbaar in plaats van giswerk',
    'Inzicht in merk en concurrenten',
    'Gebouwd door OnlineLabs',
  ];

  return (
    <section className="teun-sec" id="teun" aria-label="Teun.ai">
      <style>{`
        .teun-sec {
          --paper:#f4f0e7; --paper-2:#ece6d8; --paper-ink:#15212c; --paper-muted:#5d6b76;
          --paper-line:rgba(20,32,44,0.12);
          --ink:#0a1a2b; --ink-2:#0f2436; --cream:#f4f1ea;
          --blue:#4d83c9; --blue-deep:#376eb5;
          --serif:'Playfair Display',Georgia,serif;
          --mono:var(--font-space-mono),'Space Mono',ui-monospace,monospace;
          --wrap:1280px; --gutter:clamp(20px,5vw,64px);
          position:relative; overflow:hidden; background:var(--paper); color:var(--paper-ink);
          padding:clamp(80px,11vw,168px) 0;
        }
        .teun-sec .wrap { width:min(100% - var(--gutter)*2, var(--wrap)); margin-inline:auto; }
        .teun-sec .teun__grid { display:grid; grid-template-columns:1.04fr 0.96fr; gap:clamp(2.5rem,6vw,6rem); align-items:center; }

        .teun-sec .teun__badge {
          display:inline-flex; align-items:center; gap:0.6em; margin-bottom:1.4rem;
          font-family:var(--mono); font-size:0.76rem; letter-spacing:0.12em; text-transform:uppercase;
          color:var(--paper-ink); background:var(--paper-2); border:1px solid var(--paper-line);
          border-radius:100px; padding:0.5rem 0.9rem 0.5rem 0.6rem;
        }
        .teun-sec .teun__badge .dot {
          width:20px; height:20px; border-radius:50%; display:grid; place-items:center;
          background:#e8743b; color:#fff; font-weight:700; font-size:0.7rem;
        }
        .teun-sec .teun__title {
          font-family:var(--serif); font-weight:600; letter-spacing:-0.015em; text-wrap:balance;
          font-size:clamp(2.1rem,4.6vw,3.55rem); line-height:1.05; margin:0 0 1.5rem; max-width:15ch; color:var(--paper-ink);
        }
        .teun-sec .teun__title em { font-style:normal; color:var(--blue-deep); }
        .teun-sec .teun__lead { color:var(--paper-muted); max-width:50ch; font-size:clamp(1.04rem,1.3vw,1.18rem); line-height:1.62; margin:0 0 clamp(1.8rem,3vw,2.3rem); }

        .teun-sec .teun__actions { display:flex; flex-wrap:wrap; gap:0.9rem; margin-bottom:clamp(2rem,3.4vw,2.6rem); }
        .teun-sec .btn {
          font-weight:600; font-size:1rem; display:inline-flex; align-items:center; gap:0.55em;
          padding:1rem 1.5rem; border-radius:100px; border:1px solid transparent; cursor:pointer;
          transition:background .25s, transform .25s; white-space:nowrap; background:var(--ink); color:var(--cream);
        }
        .teun-sec .btn svg { width:17px; height:17px; transition:transform .25s; }
        .teun-sec .btn:hover { background:var(--ink-2); transform:translateY(-2px); }
        .teun-sec .btn:hover svg { transform:translateX(4px); }

        .teun-sec .teun__checks { list-style:none; margin:0; padding:0; display:grid; gap:0.85rem; }
        .teun-sec .teun__checks li { display:flex; align-items:center; gap:0.85rem; font-size:1.04rem; color:var(--paper-ink); font-weight:500; }
        .teun-sec .teun__checks .tick {
          flex:none; width:26px; height:26px; border-radius:50%;
          background:rgba(31,138,91,0.14); color:#1f8a5b; display:grid; place-items:center;
        }
        .teun-sec .teun__checks .tick svg { width:14px; height:14px; }

        .teun-sec .teun__stage { position:relative; min-height:540px; display:flex; align-items:flex-end; justify-content:center; }
        .teun-sec .teun__halo {
          position:absolute; z-index:0; left:50%; top:46%; transform:translate(-50%,-50%);
          width:78%; aspect-ratio:1; border-radius:50%;
          background:radial-gradient(circle, rgba(77,131,201,0.18), rgba(77,131,201,0.05) 55%, transparent 70%);
        }
        .teun-sec .teun__edge {
          position:absolute; z-index:1; left:4%; right:4%; bottom:36px; height:2px;
          background:linear-gradient(90deg, transparent, var(--blue-deep) 18%, var(--blue-deep) 82%, transparent);
          border-radius:2px;
        }
        .teun-sec .teun__ground {
          position:absolute; z-index:1; left:50%; bottom:50px; transform:translateX(-50%);
          width:230px; height:26px; border-radius:50%;
          background:radial-gradient(ellipse, rgba(10,26,43,0.22), transparent 70%); filter:blur(3px);
        }
        .teun-sec .teun__mascot {
          position:relative; z-index:2; height:520px; width:auto; max-width:100%;
          object-fit:contain; object-position:bottom center; margin-bottom:38px;
          filter:drop-shadow(0 24px 30px rgba(10,26,43,0.18));
        }

        .teun-sec .teun__card {
          position:absolute; z-index:3; background:#fff; border:1px solid var(--paper-line); border-radius:14px;
          padding:0.7rem 0.9rem; box-shadow:0 20px 44px -20px rgba(10,26,43,0.4); min-width:150px;
        }
        .teun-sec .teun__card .head { display:flex; align-items:center; gap:0.5em; margin-bottom:0.35rem; }
        .teun-sec .teun__card .head .ic {
          width:22px; height:22px; border-radius:50%; display:grid; place-items:center;
          font-size:0.7rem; font-weight:700; color:#fff;
        }
        .teun-sec .teun__card .head .lbl { font-family:var(--mono); font-size:0.64rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--paper-muted); }
        .teun-sec .teun__card .val { font-size:1.02rem; color:var(--paper-ink); font-weight:500; white-space:nowrap; }
        .teun-sec .teun__card .val b { font-weight:700; }
        .teun-sec .teun__card--c1 { top:12%; left:-4%; animation:teunFloat1 7s ease-in-out infinite; }
        .teun-sec .teun__card--c2 { top:44%; right:-6%; animation:teunFloat2 8s ease-in-out infinite; }
        .teun-sec .teun__card--c3 { bottom:16%; left:2%; animation:teunFloat1 7.5s ease-in-out infinite 0.5s; }
        @keyframes teunFloat1 { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-12px); } }
        @keyframes teunFloat2 { 0%,100% { transform:translateY(0); } 50% { transform:translateY(10px); } }
        @media (prefers-reduced-motion: reduce) { .teun-sec .teun__card { animation:none !important; } }

        @media (max-width:880px) {
          .teun-sec .teun__grid { grid-template-columns:1fr; gap:2rem; }
          .teun-sec .teun__stage { min-height:480px; order:-1; }
          .teun-sec .teun__mascot { height:440px; }
          .teun-sec .teun__card--c1 { left:0; }
          .teun-sec .teun__card--c2 { right:0; }
        }
      `}</style>

      <div className="wrap teun__grid">
        <div className="teun__copy">
          <span className="teun__badge"><span className="dot">T</span>Teun.ai · ons eigen platform</span>
          <h2 className="teun__title">Wij praten niet over AI. <em>Wij bouwen de tools.</em></h2>
          <p className="teun__lead">
            Met Teun.ai meten we hoe zichtbaar je bedrijf is in ChatGPT, Google AI en andere
            AI-antwoorden. Die inzichten gebruiken we om je SEO- en GEO-strategie scherper,
            meetbaarder en toekomstbestendiger te maken.
          </p>
          <div className="teun__actions">
            <a className="btn" href="https://teun.ai" target="_blank" rel="noopener noreferrer">
              Bekijk Teun.ai
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
            </a>
          </div>
          <ul className="teun__checks">
            {checks.map((c) => (
              <li key={c}>
                <span className="tick">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="teun__stage">
          <div className="teun__halo" />
          <div className="teun__card teun__card--c1">
            <div className="head"><span className="ic" style={{ background: '#0a1a2b' }}>G</span><span className="lbl">ChatGPT zegt</span></div>
            <div className="val">✓ <b>genoemd</b> · positie 2</div>
          </div>
          <div className="teun__card teun__card--c2">
            <div className="head"><span className="ic" style={{ background: '#e0a23b' }}>★</span><span className="lbl">GEO score</span></div>
            <div className="val">72 / 100 <b>goed</b></div>
          </div>
          <div className="teun__card teun__card--c3">
            <div className="head"><span className="ic" style={{ background: '#1f8a5b' }}>✓</span><span className="lbl">Scan klaar</span></div>
            <div className="val">14 / 20 <b>vermeldingen</b></div>
          </div>
          <div className="teun__edge" />
          <div className="teun__ground" />
          <Image
            className="teun__mascot"
            src="https://cdn.onlinelabs.nl/wp-content/uploads/2026/06/teun-ai.png"
            alt="Teun, de AI-zichtbaarheidsassistent van Teun.ai"
            width={360}
            height={540}
            sizes="(max-width: 880px) 300px, 360px"
          />
        </div>
      </div>
    </section>
  );
}
