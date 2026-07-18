import Image from 'next/image';
import Link from 'next/link';

/* OnlineLabs — "Uitgelicht werk" (donkere portfolio-grid, 6 cases 3x2).
   Server component, geen client-JS. Foto's via CDN met vaste 4:5 aspect-ratio
   (geen CLS) en lazy-loading (onder de vouw). Accent in OnlineLabs-blauw. */

const ARROW = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

const cases = [
  {
    name: 'Grachtenmuseum',
    tags: 'Webdesign • SEO • content',
    result: 'Nieuwe website en SEO voor het museum over de Amsterdamse grachten.',
    img: 'https://cdn.onlinelabs.nl/wp-content/uploads/2026/06/Rode-Salon_Grachtenmuseum_RebekkaMell.webp',
    alt: 'De Rode Salon van het Grachtenmuseum in Amsterdam',
    href: 'https://grachten.museum',
    external: true,
    linkText: 'Bekijk de website',
  },
  {
    name: 'HvanA',
    tags: 'SEO • content • techniek',
    result: 'Migratie van 3.400 artikelen naar WordPress met behoud van design en functionaliteit.',
    img: 'https://cdn.onlinelabs.nl/wp-content/uploads/2026/06/Hogeschool-van-Amsterdam-case-homepage.webp',
    alt: 'HvanA – Hogeschool van Amsterdam',
    href: '/ons-werk/hvana',
    external: false,
    linkText: 'Bekijk case',
  },
  {
    name: 'De Muider Compagnie',
    tags: 'Lokale SEO • vindbaarheid • conversie',
    result: 'Een sfeervolle website voor events op het water, gericht op aanvragen en beleving.',
    img: 'https://cdn.onlinelabs.nl/wp-content/uploads/2026/06/Muider-compagnie-case-homepage.webp',
    href: 'https://www.muidercompagnie.nl',
    external: true,
    linkText: 'Bekijk de website',
  },
  {
    name: 'Evert Groot',
    tags: 'Webdesign • UX • SEO',
    result: 'SEO en webdesign voor meer zichtbaarheid op linnen gordijnen en maatwerk advies.',
    img: 'https://cdn.onlinelabs.nl/wp-content/uploads/2026/06/Evert-Groot-case-homepage.webp',
    href: '/ons-werk/evert-groot',
    external: false,
    linkText: 'Bekijk project',
  },
  {
    name: 'Forteiland Pampus',
    tags: 'Website • techniek • contentstructuur',
    result: '10+ jaar samenwerking aan websites, SEO, campagnes en meer online boekingen.',
    img: 'https://cdn.onlinelabs.nl/wp-content/uploads/2026/06/Forteiland-Pampus-case-homepage.webp',
    href: '/ons-werk/forteiland-pampus',
    external: false,
    linkText: 'Bekijk project',
  },
  {
    name: 'Webike Amsterdam',
    tags: 'Webdesign • SEO • conversie',
    result: 'Tourpagina’s en website-optimalisatie voor betere vindbaarheid en directe boekingen.',
    img: 'https://cdn.onlinelabs.nl/wp-content/uploads/2026/06/Webike-Amsterdam-case-homepage.webp',
    href: 'https://www.webikeamsterdam.com',
    external: true,
    linkText: 'Bekijk de website',
  },
];

export default function WorkSection() {
  return (
    <section className="work-sec" id="werk" aria-label="Uitgelicht werk">

      <div className="wrap">
        <div className="work__head">
          <span className="eyebrow work__eyebrow">Uitgelicht werk</span>
          <h2 className="work__title">Resultaten waar we <em>trots op zijn</em></h2>
          <p className="work__lead">
            Van SEO-trajecten en AI-zichtbaarheid tot websites die sneller, duidelijker en beter
            vindbaar zijn. Een selectie van werk voor klanten die online willen groeien.
          </p>
        </div>

        <div className="work__grid">
          {cases.map((c) => {
            const linkInner = (
              <>
                {c.linkText} {ARROW}
              </>
            );
            return (
              <article className="work__card" key={c.name}>
                <div className="work__shot">
                  <Image
                    src={c.img}
                    alt={c.alt || c.name}
                    fill
                    sizes="(max-width: 560px) 90vw, (max-width: 920px) 45vw, 400px"
                  />
                </div>
                <div className="work__body">
                  <h3 className="work__name">{c.name}</h3>
                  <p className="work__tags">{c.tags}</p>
                  <p className="work__result">{c.result}</p>
                  {c.status ? (
                    <span className="work__soon">{c.status}</span>
                  ) : c.external ? (
                    <a className="work__link" href={c.href} target="_blank" rel="noopener noreferrer">
                      {linkInner}
                    </a>
                  ) : (
                    <Link className="work__link" href={c.href}>
                      {linkInner}
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="work__more">
          <Link href="/ons-werk">
            Bekijk al ons werk {ARROW}
          </Link>
        </div>
      </div>
    </section>
  );
}
