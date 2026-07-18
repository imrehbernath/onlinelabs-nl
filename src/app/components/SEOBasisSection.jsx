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
