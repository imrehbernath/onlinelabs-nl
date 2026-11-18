import Image from 'next/image';
import MarkDot from './MarkDot';
import FooterCookieButton from './FooterCookieButton';

// Afsluiter (navy paneel met Kop koffie aan de Herengracht) en daaronder de witte footer met het Google Partner-badge.
export default function SiteFooter() {
  return (
    <div className="v27">
      <div className="ol-endwrap ol-snap" style={{ padding: '16px' }}>
      <div className="ol-endpanel" style={{ maxWidth: '1600px', margin: '0 auto', background: '#0A0F1F', color: '#FFFFFF', borderRadius: '12px', padding: '72px 56px', boxSizing: 'border-box' }}>

      <section className="ol-cta-top" aria-labelledby="ol-cta-h" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '64px', alignItems: 'end' }}>
      <div>
      <h2 id="ol-cta-h" className="ol-cta-h" style={{ margin: '0', fontSize: 'clamp(40px, 5.6vw, 88px)', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.035em' }}><span style={{ display: 'block', whiteSpace: 'nowrap' }}>Kop koffie aan</span><span style={{ display: 'block', whiteSpace: 'nowrap' }}>de <em className="ol-acc">Herengracht</em><MarkDot img="https://cdn.onlinelabs.nl/wp-content/uploads/2025/11/OnlineLabs-kantoor.webp" char="?" color="#6FA3E6" /></span></h2>
      <div style={{ marginTop: '40px', maxWidth: '560px' }}>
      <p style={{ margin: '0', fontSize: '20px', lineHeight: '1.6', color: '#A9AFBF' }}>Vertel waar je staat en waar je naartoe wilt. Dan kijken we samen wat er nodig is, zonder verkooppraatje.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px 32px', marginTop: '32px' }}>
      <a className="ol-pill" href="/contact" style={{ display: 'inline-flex', alignItems: 'center', height: '56px', padding: '0 30px', borderRadius: '999px', background: '#FFFFFF', color: '#0A0F1F', fontSize: '16px', fontWeight: '600', textDecoration: 'none', whiteSpace: 'nowrap' }}>Kennismaken</a>
      <a className="ol-big" href="tel:+31208202022" style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: '600', textDecoration: 'none' }}>020 820 20 22</a>
      <a className="ol-big" href="mailto:hallo@onlinelabs.nl" style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: '600', textDecoration: 'none' }}>hallo@onlinelabs.nl</a>
      </div>
      </div>
      </div>
      <div className="ol-office" style={{ position: 'relative', width: '100%', maxWidth: '440px', aspectRatio: '875 / 1000', justifySelf: 'end', borderRadius: '10px', overflow: 'hidden', background: '#1A2033' }}>
      <Image src="https://cdn.onlinelabs.nl/wp-content/uploads/2025/11/OnlineLabs-kantoor.webp" alt="Kantoor van OnlineLabs aan de Herengracht 221 in Amsterdam" fill sizes="(max-width: 960px) 100vw, 440px" quality={78} style={{ objectFit: 'cover' }} />
      </div>
      </section>


      </div>
      </div>

      <footer className="ol-ft">
      <div className="ol-ft-inner">
      <div className="ol-ft-top">
      <a className="ol-ft-logo" href="/" aria-label="OnlineLabs, naar de homepage"><img src="/onlinelabs-logo-2027.svg" alt="OnlineLabs" width="207" height="36" loading="lazy" style={{ height: '36px', width: 'auto', display: 'block' }} /></a>
      <a className="ol-ft-badge" href="https://www.google.com/partners/agency?id=8066409399" target="_blank" rel="noopener noreferrer" aria-label="OnlineLabs op Google Partners, opent in een nieuw tabblad"><img src="https://www.gstatic.com/partners/badge/images/2021/PartnerBadgeClickable.svg" alt="Google Partner" width="110" height="110" loading="lazy" decoding="async" style={{ display: 'block' }} /></a>
      </div>
      <div className="ol-ft-grid">
      <div className="ol-ft-col ol-ft-contact">
      <p className="ol-ft-title">Contact</p>
      <address className="ol-ft-addr" style={{ fontStyle: 'normal' }}>OnlineLabs<br />Herengracht 221<br />1016 BG Amsterdam<br /><a className="ol-ft-link" href="tel:+31208202022">020 820 20 22</a><br /><a className="ol-ft-link" href="mailto:hallo@onlinelabs.nl">hallo@onlinelabs.nl</a></address>
      <p className="ol-ft-rating">5,0 uit 30 Google reviews</p>
      </div>
      <nav className="ol-ft-col ol-ft-wat" aria-label="Wat we doen">
      <p className="ol-ft-title">Wat we doen</p>
      <ul className="ol-ft-list"><li><a className="ol-ft-link" href="/skills">Alle skills</a></li><li><a className="ol-ft-link" href="/skills/seo-specialist">SEO specialist</a></li><li><a className="ol-ft-link" href="/skills/geo-optimalisatie">GEO en AI-zichtbaarheid</a></li><li><a className="ol-ft-link" href="/skills/online-adverteren">Online adverteren</a></li><li><a className="ol-ft-link" href="/skills/lokale-seo-amsterdam">Lokale SEO Amsterdam</a></li><li><a className="ol-ft-link" href="/skills/website-laten-maken">Website laten maken</a></li><li><a className="ol-ft-link" href="/skills/website-snelheid-optimalisatie">Website snelheid</a></li><li><a className="ol-ft-link" href="/skills/conversie-optimalisatie-specialist">Conversie optimalisatie</a></li></ul>
      </nav>
      <nav className="ol-ft-col" aria-label="OnlineLabs">
      <p className="ol-ft-title">OnlineLabs</p>
      <ul className="ol-ft-list"><li><a className="ol-ft-link" href="/ons-werk">Ons werk</a></li><li><a className="ol-ft-link" href="/over-ons">Over ons</a></li><li><a className="ol-ft-link" href="/blog">Blog</a></li><li><a className="ol-ft-link" href="/trainingen">Trainingen</a></li><li><a className="ol-ft-link" href="/contact">Contact</a></li><li><a className="ol-ft-link" href="https://teun.ai" target="_blank" rel="noopener noreferrer">Teun.ai</a></li></ul>
      </nav>
      <nav className="ol-ft-col" aria-label="Volg ons">
      <p className="ol-ft-title">Volg ons</p>
      <ul className="ol-ft-list"><li><a className="ol-ft-link" href="https://www.linkedin.com/company/onlinelabs" target="_blank" rel="noopener noreferrer">LinkedIn</a></li><li><a className="ol-ft-link" href="https://www.facebook.com/onlinelabs.nl" target="_blank" rel="noopener noreferrer">Facebook</a></li><li><a className="ol-ft-link" href="https://x.com/onlinelabs_nl" target="_blank" rel="noopener noreferrer">X</a></li><li><a className="ol-ft-link" href="https://www.youtube.com/@OnlineLabs-nl" target="_blank" rel="noopener noreferrer">YouTube</a></li></ul>
      </nav>
      </div>
      <div className="ol-ft-bottom">
      <div className="ol-ft-legal">
      <p>© {new Date().getFullYear()} OnlineLabs. Alle rechten voorbehouden.</p>
      <p>De SEO-diensten van OnlineLabs worden niet geverifieerd of goedgekeurd door Google.</p>
      </div>
      <ul className="ol-ft-bl">
      <li><a className="ol-ft-link" href="/privacyverklaring">Privacyverklaring</a></li>
      <li><a className="ol-ft-link" href="/algemene-voorwaarden">Algemene voorwaarden</a></li>
      <li><FooterCookieButton /></li>
      </ul>
      </div>
      </div>
      </footer>
    </div>
  );
}
