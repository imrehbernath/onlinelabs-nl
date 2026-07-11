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
      <style>{`
        .work-sec {
          --ink:#0a1a2b; --ink-line:rgba(244,241,234,0.13);
          --cream:#f4f1ea; --cream-2:#c9d3dc; --muted:#8ba0b2;
          --blue:#4d83c9; --blue-deep:#376eb5; --accent:#4d83c9;
          --serif:'Playfair Display',Georgia,serif;
          --mono:var(--font-space-mono),'Space Mono',ui-monospace,monospace;
          --wrap:1280px; --gutter:clamp(20px,5vw,64px);
          position:relative; background:var(--ink); color:var(--cream);
          padding:clamp(80px,11vw,168px) 0;
        }
        .work-sec .wrap { width:min(100% - var(--gutter)*2, var(--wrap)); margin-inline:auto; }

        .work-sec .eyebrow {
          font-family:var(--mono); font-size:0.78rem; letter-spacing:0.22em; text-transform:uppercase;
          color:var(--accent); display:inline-flex; align-items:center; gap:0.7em; font-weight:400;
        }
        .work-sec .eyebrow::before { content:""; width:26px; height:1px; background:currentColor; opacity:0.6; }

        .work-sec .work__head { max-width:60ch; margin-bottom:clamp(2.6rem,5vw,4.2rem); }
        .work-sec .work__eyebrow { margin-bottom:1.3rem; }
        .work-sec .work__title {
          font-family:var(--serif); font-weight:600; letter-spacing:-0.015em; text-wrap:balance;
          font-size:clamp(2.2rem,4.8vw,3.7rem); line-height:1.04; margin:0 0 1.3rem; max-width:18ch; color:var(--cream);
        }
        .work-sec .work__title em { font-style:normal; color:var(--blue); }
        .work-sec .work__lead { color:var(--cream-2); font-size:clamp(1.05rem,1.35vw,1.22rem); line-height:1.62; margin:0; max-width:58ch; }

        .work-sec .work__grid { display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(1rem,1.8vw,1.7rem); }
        .work-sec .work__card {
          position:relative; display:flex; flex-direction:column;
          background:rgba(244,241,234,0.03); border:1px solid var(--ink-line); border-radius:18px; overflow:hidden;
          transition:transform .45s cubic-bezier(.2,.7,.3,1), border-color .45s, box-shadow .45s;
        }
        .work-sec .work__shot { position:relative; aspect-ratio:4/5; overflow:hidden; }
        .work-sec .work__shot img { object-fit:cover; transition:transform .7s cubic-bezier(.2,.7,.3,1); }
        .work-sec .work__shot::after {
          content:""; position:absolute; inset:0; z-index:1;
          background:linear-gradient(to top, rgba(7,20,32,0.55), transparent 42%);
          opacity:0.7; transition:opacity .45s;
        }
        .work-sec .work__card:hover {
          transform:translateY(-7px); border-color:rgba(77,131,201,0.42);
          box-shadow:0 40px 80px -38px rgba(0,0,0,0.7);
        }
        .work-sec .work__card:hover .work__shot img { transform:scale(1.05); }
        .work-sec .work__card:hover .work__shot::after { opacity:0.45; }

        .work-sec .work__body { padding:clamp(1.3rem,1.9vw,1.7rem); display:flex; flex-direction:column; flex:1; }
        .work-sec .work__name { font-family:var(--serif); font-weight:700; font-size:clamp(1.22rem,1.7vw,1.5rem);
          line-height:1.12; color:var(--cream); margin:0 0 0.55rem; }
        .work-sec .work__tags { font-family:var(--mono); font-size:0.72rem; letter-spacing:0.04em; text-transform:uppercase;
          color:var(--blue); margin:0 0 0.9rem; }
        .work-sec .work__result { color:var(--muted); font-size:0.98rem; line-height:1.5; margin:0 0 1.3rem; }
        .work-sec .work__link {
          margin-top:auto; display:inline-flex; align-items:center; gap:0.5em;
          font-weight:600; font-size:0.96rem; color:var(--cream); transition:gap .25s, color .25s;
        }
        .work-sec .work__link svg { width:16px; height:16px; transition:transform .3s; }
        .work-sec .work__card:hover .work__link { color:var(--blue); }
        .work-sec .work__card:hover .work__link svg { transform:translateX(4px); }
        .work-sec .work__link::before { content:""; position:absolute; inset:0; z-index:2; }
        /* Niet-klikbare status (bv. "Binnenkort live") — geen stretched link */
        .work-sec .work__soon {
          margin-top:auto; display:inline-flex; align-items:center; gap:0.5em;
          font-weight:600; font-size:0.96rem; color:var(--muted);
        }
        .work-sec .work__soon::before {
          content:""; width:7px; height:7px; border-radius:50%; background:var(--blue); flex:none;
        }

        .work-sec .work__more { margin-top:clamp(2.6rem,4vw,3.6rem); display:flex; justify-content:center; }
        .work-sec .work__more a {
          display:inline-flex; align-items:center; gap:0.55em; font-weight:600; font-size:1.02rem; color:var(--cream-2);
          border-bottom:1px solid var(--ink-line); padding-bottom:4px; transition:color .25s, border-color .25s, gap .25s;
        }
        .work-sec .work__more a:hover { color:var(--cream); border-bottom-color:var(--blue); gap:0.85em; }
        .work-sec .work__more svg { width:17px; height:17px; }

        @media (max-width:920px) { .work-sec .work__grid { grid-template-columns:repeat(2,1fr); } }
        @media (max-width:560px) { .work-sec .work__grid { grid-template-columns:1fr; } }
      `}</style>

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
