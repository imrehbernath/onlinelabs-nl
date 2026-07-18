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
