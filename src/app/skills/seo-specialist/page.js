import Image from 'next/image';
import Link from 'next/link';
import LogoSlider from '../../components/LogoSlider';
import { getHomepageSettings } from '../../lib/wordpress';
import './seo.css';

const CDN_URL = 'https://cdn.onlinelabs.nl';
function toCdn(str) {
  if (!str || typeof str !== 'string') return str;
  return str.replace(/https:\/\/wordpress-988065-5984089\.cloudwaysapps\.com/g, CDN_URL);
}

const TITLE = 'SEO specialist · Zichtbaar in Google én AI · OnlineLabs';
const DESC =
  'SEO specialist uit Amsterdam. OnlineLabs combineert technische SEO, sterke content en GEO-optimalisatie voor zichtbaarheid in Google, ChatGPT en andere AI-platformen. Sinds 2008.';

export const metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: '/skills/seo-specialist' },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: '/skills/seo-specialist',
    type: 'website',
    locale: 'nl_NL',
    siteName: 'OnlineLabs',
    images: ['/og-image-homepage.jpg'],
  },
};

export const revalidate = 86400;

/* ---- Icons ---- */
const Check = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 13l4 4L19 7" />
  </svg>
);
const Plus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);
const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

/* ---- Content ---- */
const whyList = [
  ['Sinds 2008 bewezen expertise', '15+ jaar resultaat in uiteenlopende sectoren.'],
  ['Data-gedreven, geen black box', 'Transparante strategieën met meetbare groei.'],
  ['Techniek + content + structuur', 'Alles sluit naadloos op elkaar aan, zonder templates.'],
  ['AI-proof & toekomstgericht', 'Structured data, semantische HTML en GEO voor AI-antwoorden.'],
  ['Groei, geen quick wins', 'SEO voor duurzame leads, omzet en zichtbaarheid.'],
  ['Inzichtelijk & toegankelijk', 'Maandelijkse updates, afgestemd op jouw doelen.'],
];

const svcCards = [
  ['01', 'Technische SEO', 'We verbeteren crawlbaarheid, indexatie, snelheid, structuur en technische kwaliteit.'],
  ['02', 'Content & zoekintentie', "We optimaliseren pagina's op zoekgedrag, relevantie en commerciële intentie."],
  ['03', 'GEO & AI-zichtbaarheid', 'We versterken je zichtbaarheid in ChatGPT, Google AI en andere AI-antwoorden.'],
  ['04', 'Autoriteit & interne links', 'We bouwen aan vertrouwen met interne structuur, contentclusters en externe signalen.'],
  ['05', 'Conversie uit SEO-verkeer', 'We kijken niet alleen naar rankings, maar ook naar aanvragen, leads en rendement.'],
  ['06', 'Monitoring & bijsturing', 'We volgen rankings, verkeer, conversies en AI-vermeldingen structureel.'],
];

const storyList = [
  ['Traditionele SEO vormt de basis.', ' Techniek, content en autoriteit. Google moet je eerst vinden en waarderen.'],
  ['AI-visibility als nieuwe laag.', ' Structured data, semantische HTML en content die AI-modellen citeren in ChatGPT, Perplexity en Google AI.'],
  ['Gericht op blijvende groei.', ' Een strategie die werkt in beide werelden, voor nu én de toekomst.'],
];

const flowSteps = [
  ['01', 'Analyse & strategie', 'We brengen je SEO-status in kaart en ontwikkelen een plan op maat dat gericht is op groei.'],
  ['02', 'Optimalisatie & content', 'Techniek, structuur en content worden verbeterd voor Google én AI-platformen als ChatGPT.'],
  ['03', 'Inzicht & bijsturing', 'Je krijgt realtime SEO-data en maandelijkse updates. We sturen bij voor maximaal resultaat.'],
];

const workCases = [
  {
    name: 'Evert Groot',
    tags: 'SEO • content • webdesign',
    result: 'Meer organisch verkeer en betere zichtbaarheid op linnen gordijnen en maatwerk advies.',
    img: 'https://cdn.onlinelabs.nl/wp-content/uploads/2026/06/Evert-Groot-case-homepage.webp',
    href: '/ons-werk/evert-groot',
  },
  {
    name: 'HvanA',
    tags: 'SEO • content • techniek',
    result: 'Migratie van 3.400 artikelen naar WordPress met behoud van design, structuur en vindbaarheid.',
    img: 'https://cdn.onlinelabs.nl/wp-content/uploads/2026/06/Hogeschool-van-Amsterdam-case-homepage.webp',
    alt: 'HvanA – Hogeschool van Amsterdam',
    href: '/ons-werk/hvana',
  },
  {
    name: 'Forteiland Pampus',
    tags: 'SEO • website • campagnes',
    result: '10+ jaar groei met SEO, websiteontwikkeling en campagnes voor meer boekingen.',
    img: 'https://cdn.onlinelabs.nl/wp-content/uploads/2026/06/Forteiland-Pampus-case-homepage.webp',
    href: '/ons-werk/forteiland-pampus',
  },
];

const seoDiensten = [
  {
    title: 'SEO Audit',
    intro:
      'Uitgebreid onderzoek naar de huidige SEO-prestaties van jouw website: techniek, content, structuur én AI-zichtbaarheid. De audit is het uitgangspunt voor je strategie.',
    items: [
      'Technische analyse (Core Web Vitals, indexering, crawlability)',
      'Content audit & keyword gap analyse',
      'Concurrentieonderzoek & marktpositie',
      'AI-visibility check (ChatGPT, Perplexity, Google AI)',
      'Structured data implementatie-assessment',
    ],
  },
  {
    title: 'Zoekwoordenonderzoek',
    intro:
      'We kijken niet alleen naar Google, maar ook naar hoe mensen zoeken in AI-platformen. We analyseren zoekintentie, zoekvolume en concurrentie.',
    items: [
      'Search intent analyse (informational, navigational, transactional)',
      'Long-tail keyword opportuniteiten',
      'AI-platform keyword research (ChatGPT, Perplexity)',
      'Semantische keyword clusters',
      'Featured Snippets & "People Also Ask" targeting',
    ],
  },
  {
    title: 'On-page SEO',
    intro:
      "We zorgen dat zoekmachines én AI-modellen begrijpen waar jouw pagina's over gaan, volgens de laatste richtlijnen, zonder over-optimalisatie.",
    items: [
      'Meta titles & descriptions optimalisatie',
      'Heading-structuur (H1-H6) & semantische HTML',
      'Interne linking-strategie',
      'Image optimization (alt tags, compressie)',
      'Content optimization voor Google én AI',
    ],
  },
  {
    title: 'Technische SEO',
    intro:
      'Als een website technisch niet in orde is, lijdt de vindbaarheid eronder. We scannen volledig op technische problemen en lossen ze op.',
    items: [
      'Core Web Vitals optimalisatie (LCP, INP, CLS)',
      'Site speed & performance optimization',
      'Mobile-first & responsive design check',
      'XML sitemaps & robots.txt configuratie',
      'HTTPS, canonicals & redirect management',
    ],
  },
  {
    title: 'Structured data & AI-content',
    intro:
      'Content die relevant is voor bezoekers, zoekmachines én AI-platformen. Structured data en semantische markup maken je content begrijpelijk voor AI-modellen.',
    items: [
      'Schema.org markup implementatie',
      'AI-leesbare contentstructuur',
      'Content optimalisatie voor AI-citaties (GEO)',
      'Knowledge Graph optimalisatie',
      'Rich Results & Featured Snippets targeting',
    ],
  },
  {
    title: 'SEO-strategie',
    intro:
      'Een toekomstgerichte strategie met een goede sitestructuur en efficiënte keyword targeting, die werkt in Google én AI-platformen, en altijd up-to-date blijft.',
    items: [
      'Strategische sitestructuur & informatie-architectuur',
      'Keyword targeting & content roadmap',
      'Link building & digital PR-strategie',
      'Internationale SEO & hreflang setup',
      'Maandelijkse monitoring & bijsturing',
    ],
  },
];

const reviews = [
  {
    text: '"Wij hebben Imre Bernáth van OnlineLabs ingeschakeld om onze posities in de Google-rankings te verbeteren. Met resultaat."',
    ini: 'EB',
    name: 'Enzo van Bambost',
    role: 'CEO · Hettema & van Bambost juristen',
  },
  {
    text: '"Na eerdere teleurstellingen bij grotere SEO-partijen ben ik blij dat ik nu wél resultaat zie, dankzij de experts van OnlineLabs."',
    ini: 'HH',
    name: 'Hans Henzen',
    role: 'Eigenaar · Dry Systems',
  },
  {
    text: '"Al 10 jaar klant van OnlineLabs. Snel, bereikbaar en inzetbaar voor SEO, webdesign en development."',
    ini: 'JS',
    name: 'Jorick Serto',
    role: 'Designer · ContactCare',
  },
];

const faqs = [
  {
    q: 'Wat is het verschil tussen traditionele SEO en AI-optimalisatie?',
    a: [
      'Traditionele SEO richt zich op rankings in Google via techniek, keyword research, content en linkbuilding. Dit blijft de essentiële basis voor online vindbaarheid.',
      'AI-optimalisatie (GEO) zorgt daarnaast dat je zichtbaar bent in de AI-antwoorden van ChatGPT, Perplexity en Google AI Overviews. Dat vraagt om structured data, semantische HTML en AI-proof content. Het één werkt niet zonder het ander.',
    ],
  },
  {
    q: 'Hoe lang duurt het voordat ik resultaat zie?',
    a: [
      'Eerlijk antwoord: 3 tot 6 maanden voor de eerste meetbare verbetering, 12+ maanden voor stabiele, structurele groei. SEO is geen quick fix: Google heeft tijd nodig om wijzigingen te indexeren en je autoriteit te erkennen.',
      'Het voordeel: SEO-verkeer blijft komen zonder kosten per klik. Investeer je in SEO, dan bouw je aan een asset dat blijft renderen.',
    ],
  },
  {
    q: 'Wat kost een SEO-specialist?',
    a: [
      'Dit hangt af van je doelen, concurrentie en scope. Indicatie: SEO-audit €1.500 – €3.500 eenmalig, maandelijks beheer €1.000 – €5.000 per maand, projecten vanaf €5.000.',
      'Bij OnlineLabs werken we transparant met vaste maand- of projectprijzen. We adviseren minimaal 6 maanden, omdat SEO tijd nodig heeft om resultaat te tonen.',
    ],
  },
  {
    q: 'Wat maakt een goede SEO-specialist?',
    a: [
      'Een goede SEO-specialist combineert drie dingen: technische kennis, strategisch denken en eerlijke communicatie. Resultaten worden getoond met data, niet alleen met verhalen, en niemand belooft een gegarandeerde #1-positie.',
      'Bij OnlineLabs werk je met specialisten die sinds 2008 actief zijn en honderden Google-updates hebben meegemaakt.',
    ],
  },
  {
    q: 'Kan een SEO-specialist #1 in Google garanderen?',
    a: [
      'Nee, en als iemand dat wél belooft, is het onbetrouwbaar. Google gebruikt 200+ rankingfactoren en voert dagelijks updates uit. Wat we wél leveren: meetbare verbetering in rankings, groei in organisch verkeer, een technisch sterke website en transparante rapportages.',
    ],
  },
];

export default async function SeoSpecialistPage() {
  // Logo slider (gedeeld, "al uitgewerkt en goed") — data uit WordPress, faalt netjes
  let logoSliderData = null;
  try {
    const homepageSettings = await getHomepageSettings();
    if (homepageSettings?.logoSlider && homepageSettings.logoSlider.sliderEnabled) {
      logoSliderData = {
        title: homepageSettings.logoSlider.sliderTitle || 'Vertrouwd door toonaangevende bedrijven',
        speed: homepageSettings.logoSlider.sliderSpeed || 'normal',
        grayscale: homepageSettings.logoSlider.sliderGrayscale !== false,
        logos:
          homepageSettings.logoSlider.logos?.map((logo) => ({
            name: logo.companyName,
            imageUrl: toCdn(logo.logoImage?.node?.sourceUrl),
            altText: logo.logoAlt || `${logo.companyName} logo`,
            url: logo.websiteUrl || null,
          })) || [],
      };
    }
  } catch {
    logoSliderData = null;
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a.join(' ') },
    })),
  };

  return (
    <div className="seo-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <header className="shero" id="top">
        <div className="wrap shero__inner">
          <span className="eyebrow shero__eyebrow">SEO specialist · sinds 2008</span>
          <h1 className="display">SEO specialist voor zichtbaarheid in <em>Google</em> en <em>AI</em></h1>
          <p className="lead shero__sub">
            OnlineLabs helpt bedrijven groeien met technische SEO, sterke content en GEO-optimalisatie.
            Sinds 2008 bouwen we vanuit Amsterdam aan duurzame vindbaarheid in Google, ChatGPT en andere
            AI-platformen.
          </p>
          <div className="shero__cta">
            <Link className="btn btn--primary" href="/contact">Vraag SEO-advies aan</Link>
            <a className="btn btn--ghost" href="#aanpak">Bekijk onze aanpak</a>
          </div>
          <div className="shero__trust">
            <span>Sinds 2008</span><span className="sep">•</span><span>Google Partner</span>
            <span className="sep">•</span><span><b>5★</b> Google Reviews</span>
          </div>
        </div>
      </header>

      {/* LOGO SLIDER — onder de hero */}
      {logoSliderData && logoSliderData.logos.length > 0 && (
        <LogoSlider
          title={logoSliderData.title}
          logos={logoSliderData.logos}
          speed={logoSliderData.speed}
          grayscale={logoSliderData.grayscale}
          background="gray"
        />
      )}

      {/* WAAROM SEO */}
      <section className="section paper why" id="waarom">
        <div className="wrap why__grid">
          <div className="why__copy">
            <span className="eyebrow why__eyebrow">Waarom SEO?</span>
            <h2 className="display why__title">Waarom jouw bedrijf een <em>SEO specialist</em> nodig heeft</h2>
            <div className="why__body">
              <p>Google voert jaarlijks 4.000+ updates uit en AI-platformen zoals ChatGPT veranderen hoe mensen zoeken. Je concurrenten investeren al in vindbaarheid, in beide kanalen.</p>
              <p>Zonder strategische SEO-expertise verlies je marktaandeel aan bedrijven die wél investeren in structurele zichtbaarheid. <strong>Niet alleen in Google, maar ook in de AI-antwoorden waar steeds meer beslissingen worden genomen.</strong></p>
              <p>Bij OnlineLabs combineren we sinds 2008 technische SEO, contentstrategie en GEO-optimalisatie. Zo blijf jij zichtbaar, hoe het zoeklandschap ook verandert.</p>
            </div>
          </div>
          <div className="why__panel">
            <h3 className="why__panel-title">Onze SEO-aanpak: slim, snel en toekomstgericht</h3>
            <ul className="why__list">
              {whyList.map(([b, d]) => (
                <li key={b}>
                  <span className="tick"><Check /></span>
                  <span><b>{b}</b><span className="d">{d}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WAT WE DOEN VOOR JE SEO (dark) */}
      <section className="section svc" id="seo-diensten-dark">
        <div className="wrap">
          <div className="svc__head">
            <div>
              <span className="eyebrow" style={{ marginBottom: '1.3rem' }}>Wat we doen voor je SEO</span>
              <h2 className="display svc__title">Alles voor je <em>vindbaarheid</em></h2>
            </div>
            <p className="svc__intro">Van techniek en content tot autoriteit en AI-zichtbaarheid. We bouwen een complete SEO-aanpak die werkt in Google én in de AI-antwoorden waar je klanten steeds vaker zoeken.</p>
          </div>
          <div className="svc__grid">
            {svcCards.map(([num, name, text]) => (
              <div className="svc__card" key={num}>
                <span className="svc__fold" />
                <span className="svc__num">{num}</span>
                <h3 className="svc__name">{name}</h3>
                <p className="svc__text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMRE — TRADITIONELE SEO + AI */}
      <section className="section paper story" id="visie">
        <div className="wrap story__grid">
          <div className="story__media">
            <div style={{ position: 'relative', width: '100%', aspectRatio: '5 / 6', borderRadius: '16px', overflow: 'hidden' }}>
              <Image
                src="https://cdn.onlinelabs.nl/wp-content/uploads/2025/04/11093106/Imre-Bernath-eigenaar-OnlineLabs.webp"
                alt="Imre Bernáth, SEO &amp; AI visibility specialist bij OnlineLabs"
                fill
                className="story__img"
                sizes="(max-width: 880px) 90vw, 45vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="story__stamp"><b>2008</b>SEO sinds<br />het begin</div>
          </div>
          <div className="story__copy">
            <span className="eyebrow">Onze visie</span>
            <h2 className="display h-md" style={{ maxWidth: '16ch', margin: '0.6rem 0 1.3rem' }}>Traditionele SEO + <em>AI-zichtbaarheid</em></h2>
            <p className="lead" style={{ marginBottom: '1.4rem' }}>Waar anderen kiezen tussen traditionele SEO óf AI-optimalisatie, combineren wij beide. Want zonder sterke SEO-fundamenten geen AI-zichtbaarheid.</p>
            <ul className="story__list">
              {storyList.map(([b, rest]) => (
                <li key={b}>
                  <span className="tick"><Check width="20" height="20" /></span>
                  <span><b>{b}</b>{rest}</span>
                </li>
              ))}
            </ul>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem', letterSpacing: '0.04em', color: 'var(--paper-muted)', margin: 0 }}>Imre Bernáth · SEO &amp; AI visibility specialist, OnlineLabs</p>
          </div>
        </div>
      </section>

      {/* SEO-AANPAK IN 3 STAPPEN */}
      <section className="section flow" id="aanpak">
        <div className="wrap flow__grid">
          <div className="flow__intro">
            <span className="eyebrow flow__eyebrow">Onze aanpak</span>
            <h2 className="display flow__title">Onze SEO-aanpak in 3 stappen</h2>
            <p className="flow__lead">Met een slimme strategie, technische optimalisatie en continue bijsturing zorgen we dat jouw website scoort in Google én zichtbaar is in AI-antwoorden.</p>
            <p className="flow__proof">Geen losse acties, maar een duidelijke route van inzicht naar resultaat.</p>
          </div>
          <div className="flow__road">
            {flowSteps.map(([num, title, desc]) => (
              <div className="flow__step" key={num}>
                <div className="flow__node">{num}</div>
                <div className="flow__content">
                  <h3 className="flow__step-title">{title}</h3>
                  <p className="flow__step-desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO-RESULTATEN (cases) */}
      <section className="section work" id="resultaten">
        <div className="wrap">
          <div className="work__head">
            <span className="eyebrow work__eyebrow">Uit de praktijk</span>
            <h2 className="display work__title">SEO-resultaten waar we <em>trots op zijn</em></h2>
            <p className="work__lead">Een selectie van SEO-trajecten waarin techniek, content en strategie samenkomen voor structurele groei.</p>
          </div>
          <div className="work__grid">
            {workCases.map((c) => (
              <article className="work__card" key={c.name}>
                <div className="work__shot">
                  <Image src={c.img} alt={c.alt || c.name} fill sizes="(max-width: 560px) 90vw, (max-width: 920px) 45vw, 400px" style={{ objectFit: 'cover' }} />
                </div>
                <div className="work__body">
                  <h3 className="work__name">{c.name}</h3>
                  <p className="work__tags">{c.tags}</p>
                  <p className="work__result">{c.result}</p>
                  <Link className="work__link" href={c.href}>Bekijk case <Arrow /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SEO-DIENSTEN (accordion) */}
      <section className="section paper" id="seo-diensten">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">SEO-diensten</span>
            <h2 className="display">SEO-diensten die we <em>aanbieden</em></h2>
            <p>Vanuit Amsterdam zorgen we voor SEO-groei in Nederland en daarbuiten.</p>
          </div>
          <div className="acc">
            {seoDiensten.map((d, i) => (
              <details className="acc__item" key={d.title} open={i === 0}>
                <summary>{d.title} <span className="ico"><Plus /></span></summary>
                <div className="acc__body">
                  <p>{d.intro}</p>
                  <ul>
                    {d.items.map((it) => (
                      <li key={it}><span className="tk">✓</span>{it}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section" id="reviews">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Wat klanten zeggen</span>
            <h2 className="display">Beoordeeld met een <em>5.0</em> op Google</h2>
            <p>Onze klanten waarderen onze expertise, transparantie en toewijding.</p>
          </div>
          <div className="reviews">
            {reviews.map((r) => (
              <div className="review" key={r.name}>
                <div className="review__stars">★★★★★</div>
                <p className="review__text">{r.text}</p>
                <div className="review__who">
                  <span className="ava">{r.ini}</span>
                  <span><span className="n">{r.name}</span><br /><span className="r">{r.role}</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section paper" id="faq">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">FAQ</span>
            <h2 className="display">Veelgestelde <em>vragen</em></h2>
          </div>
          <div className="acc">
            {faqs.map((f, i) => (
              <details className="acc__item" key={f.q} open={i === 0}>
                <summary>{f.q} <span className="ico"><Plus /></span></summary>
                <div className="acc__body">
                  {f.a.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta section" id="contact">
        <div className="cta__scrim" />
        <div className="wrap cta__inner">
          <span className="eyebrow eyebrow--bare" style={{ justifyContent: 'center', color: 'var(--cream-2)', marginBottom: '1.3rem' }}>Klaar voor de volgende stap?</span>
          <h2 className="display h-lg">Klaar om zichtbaar te worden in <em>Google en AI</em>?</h2>
          <p className="lead">Plan een vrijblijvend gesprek en ontdek waar jouw grootste SEO- en GEO-kansen liggen.</p>
          <div className="cta__btns">
            <Link className="btn btn--primary" href="/contact">Plan SEO-adviesgesprek</Link>
            <a className="btn btn--ghost" href="https://teun.ai" target="_blank" rel="noopener noreferrer">Bekijk Teun.ai</a>
          </div>
          <div className="cta__sub">
            <span>15+ jaar ervaring</span><span className="sep">•</span><span>100+ tevreden klanten</span><span className="sep">•</span><span>Google Partner</span>
          </div>
        </div>
      </section>
    </div>
  );
}
