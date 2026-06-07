import Image from 'next/image';

/* OnlineLabs — "Over ons" sectie (editorial, paper).
   Server component, geen client-JS: morphende blob + scan-on-hover zijn
   pure CSS. Foto met vaste aspect-ratio zodat er geen layout shift (CLS) is.
   Accent in OnlineLabs-blauw i.p.v. teal, conform de rest van de site. */
export default function AboutSection() {
  const checks = [
    'Eigen AI-visibility platform: Teun.ai',
    '17+ jaar SEO- en online marketingervaring',
    'Senior specialisten, geen accountmanagers',
    'SEO, techniek, content en conversie onder één dak',
    'Liefde voor het vak, focus op resultaat',
  ];

  return (
    <section className="about-sec" id="over" aria-label="Over OnlineLabs">
      <style>{`
        .about-sec {
          --paper:#f4f0e7; --paper-2:#ece6d8; --paper-ink:#15212c; --paper-muted:#5d6b76;
          --paper-line:rgba(20,32,44,0.12);
          --ink:#0a1a2b; --cream:#f4f1ea; --muted:#8ba0b2;
          --blue:#4d83c9; --blue-deep:#376eb5; --accent:#376eb5;
          --serif:'Playfair Display',Georgia,serif;
          --mono:var(--font-space-mono),'Space Mono',ui-monospace,monospace;
          --wrap:1280px; --gutter:clamp(20px,5vw,64px);
          position:relative; overflow:hidden;
          background:var(--paper); color:var(--paper-ink);
          padding:clamp(80px,11vw,168px) 0;
        }
        .about-sec .wrap { width:min(100% - var(--gutter)*2, var(--wrap)); margin-inline:auto; }
        .about-sec .about__grid {
          display:grid; grid-template-columns:0.92fr 1.08fr;
          gap:clamp(2.5rem,6vw,6.5rem); align-items:center;
        }

        .about-sec .about__media { position:relative; isolation:isolate; padding:clamp(1.4rem,2.5vw,2.4rem); }
        .about-sec .about__blob {
          position:absolute; z-index:-2; inset:-4% -2% -8% 0;
          background:var(--paper-2);
          border-radius:62% 38% 46% 54% / 55% 50% 50% 45%;
          animation:aboutBlob 18s ease-in-out infinite;
        }
        @keyframes aboutBlob {
          0%   { border-radius:62% 38% 46% 54% / 55% 50% 50% 45%; background:var(--paper-2); }
          25%  { border-radius:48% 52% 60% 40% / 46% 58% 42% 54%; background:color-mix(in oklab, var(--paper-2) 88%, var(--blue) 12%); }
          50%  { border-radius:55% 45% 40% 60% / 60% 42% 58% 40%; background:color-mix(in oklab, var(--paper-2) 92%, var(--blue-deep) 8%); }
          75%  { border-radius:40% 60% 54% 46% / 48% 56% 44% 52%; background:color-mix(in oklab, var(--paper-2) 90%, var(--blue) 10%); }
          100% { border-radius:62% 38% 46% 54% / 55% 50% 50% 45%; background:var(--paper-2); }
        }

        .about-sec .about__figure {
          margin:0; position:relative; border-radius:16px; overflow:hidden;
          box-shadow:0 40px 80px -36px rgba(7,20,32,0.45), 0 4px 14px -6px rgba(7,20,32,0.25);
          transition:transform .55s cubic-bezier(.2,.7,.3,1), box-shadow .55s cubic-bezier(.2,.7,.3,1);
        }
        .about-sec .about__ratio { position:relative; width:100%; aspect-ratio:4/5; }
        .about-sec .about__figure::after {
          content:""; position:absolute; left:0; right:0; top:0; height:34%; z-index:2; pointer-events:none;
          background:linear-gradient(to bottom, transparent, rgba(255,255,255,0.16) 44%, rgba(77,131,201,0.14) 52%, transparent);
          transform:translateY(-140%); opacity:0; transition:opacity .4s ease;
        }
        .about-sec .about__media:hover .about__figure {
          transform:translateY(-5px);
          box-shadow:0 56px 100px -34px rgba(7,20,32,0.5), 0 6px 18px -6px rgba(7,20,32,0.3);
        }
        .about-sec .about__media:hover .about__figure::after { opacity:1; animation:aboutScan 2.6s linear infinite; }
        @keyframes aboutScan { 0% { transform:translateY(-140%); } 100% { transform:translateY(395%); } }

        .about-sec .about__badge {
          position:absolute; left:clamp(-0.4rem,-1vw,-1.2rem); bottom:clamp(1.4rem,4vw,2.8rem); z-index:2;
          background:var(--ink); color:var(--cream); border-radius:14px;
          padding:1rem 1.3rem; display:flex; align-items:baseline; gap:0.7rem;
          box-shadow:0 24px 50px -20px rgba(7,20,32,0.6);
        }
        .about-sec .about__badge b { font-family:var(--serif); font-weight:700; font-size:2.5rem; line-height:0.9; color:var(--cream); }
        .about-sec .about__badge span { font-family:var(--mono); font-size:0.72rem; letter-spacing:0.06em; text-transform:uppercase; color:var(--muted); max-width:9ch; line-height:1.35; }

        .about-sec .eyebrow {
          font-family:var(--mono); font-size:0.78rem; letter-spacing:0.22em; text-transform:uppercase;
          color:var(--accent); display:inline-flex; align-items:center; gap:0.7em; font-weight:400;
        }
        .about-sec .eyebrow::before { content:""; width:26px; height:1px; background:currentColor; opacity:0.6; }
        .about-sec .about__eyebrow { margin-bottom:1.3rem; }
        .about-sec .about__title {
          font-family:var(--serif); font-weight:600; line-height:1.04; letter-spacing:-0.015em; text-wrap:balance;
          font-size:clamp(2.1rem,4.4vw,3.5rem); max-width:16ch; margin:0 0 1.6rem;
        }
        .about-sec .about__title em { font-style:normal; color:var(--blue-deep); }
        .about-sec .about__lead {
          font-size:clamp(1.1rem,1.5vw,1.35rem); line-height:1.6; color:var(--paper-muted);
          max-width:52ch; margin:0 0 clamp(2rem,4vw,3rem);
        }

        .about-sec .about__why { border-top:1px solid var(--paper-line); padding-top:clamp(1.6rem,3vw,2.3rem); }
        .about-sec .about__why-title { font-family:var(--serif); font-weight:700; font-size:1.4rem; color:var(--paper-ink); margin:0 0 1.4rem; }
        .about-sec .about__list { list-style:none; padding:0; margin:0; display:grid; gap:0.95rem; }
        .about-sec .about__list li { display:flex; align-items:center; gap:0.95rem; font-size:1.05rem; color:var(--paper-ink); }
        .about-sec .about__list .tick {
          flex:none; width:28px; height:28px; border-radius:50%;
          background:rgba(55,110,181,0.12); color:var(--blue-deep);
          display:grid; place-items:center;
        }
        .about-sec .about__list .tick svg { width:15px; height:15px; }

        @media (max-width:880px) {
          .about-sec .about__grid { grid-template-columns:1fr; gap:2.5rem; }
          .about-sec .about__media { max-width:440px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .about-sec .about__blob { animation:none; }
          .about-sec .about__figure { transition:none; }
          .about-sec .about__media:hover .about__figure { transform:none; }
          .about-sec .about__media:hover .about__figure::after { animation:none; opacity:0; }
        }
      `}</style>

      <div className="wrap about__grid">
        <div className="about__media">
          <div className="about__blob" />
          <figure className="about__figure">
            <div className="about__ratio">
              <Image
                src="/sanne-onlinelabs.webp"
                alt="Sanne Verschoor aan het werk bij OnlineLabs in Amsterdam"
                fill
                className="object-cover"
                sizes="(max-width: 880px) 88vw, 540px"
              />
            </div>
          </figure>
          <div className="about__badge">
            <b>17</b>
            <span>jaar online expertise</span>
          </div>
        </div>

        <div className="about__body">
          <span className="eyebrow about__eyebrow">Meer dan een bureau</span>
          <h2 className="about__title">Eén missie: <em>jouw online groei.</em></h2>
          <p className="about__lead">
            OnlineLabs is geen bureau dat AI als buzzword gebruikt. Wij werken er dagelijks mee. Van ons
            eigen platform Teun.ai tot de strategieën die we voor klanten ontwikkelen. We combineren 17+ jaar
            SEO-ervaring met technische kennis, data en een nuchtere ondernemersblik.
          </p>
          <div className="about__why">
            <h3 className="about__why-title">Waarom OnlineLabs?</h3>
            <ul className="about__list">
              {checks.map((item) => (
                <li key={item}>
                  <span className="tick">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
