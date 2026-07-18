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
