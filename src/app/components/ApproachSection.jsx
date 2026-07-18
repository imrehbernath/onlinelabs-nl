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
