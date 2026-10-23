'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

// Header 2027: overgenomen uit het Claude Design-bestand (Main.dc.html).
export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);
  const [mobWwd, setMobWwd] = useState(false);
  const rootRef = useRef(null);

  // Menu's sluiten bij navigeren
  useEffect(() => {
    setMenuOpen(false);
    setMobOpen(false);
  }, [pathname]);

  // Escape en klik buiten het megamenu sluiten het menu
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setMobOpen(false);
      }
    };
    const onDoc = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDoc);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDoc);
    };
  }, []);

  // Geen scroll achter het mobiele menu
  useEffect(() => {
    document.documentElement.style.overflow = mobOpen ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [mobOpen]);

  const headerH = '104px';
  const headerLine = '#E6E8EE';
  const menuOpenStr = menuOpen ? 'true' : 'false';
  const wwd = menuOpen
    ? { bg: '#EEF3FA', color: '#0A0F1F', rot: 'rotate(180deg)' }
    : { bg: 'transparent', color: '#0A0F1F', rot: 'none' };
  const toggleMenu = () => setMenuOpen((v) => !v);
  const openMob = () => setMobOpen(true);
  const closeMob = () => setMobOpen(false);
  const mobWwdStr = mobWwd ? 'true' : 'false';
  const mobWwdRot = mobWwd ? 'rotate(180deg)' : 'none';
  const toggleMobWwd = () => setMobWwd((v) => !v);
  // Klik op een link in het mobiele menu sluit het menu
  const onMobClick = (e) => { if (e.target.closest && e.target.closest('a')) setMobOpen(false); };

  return (
    <div className="v27" ref={rootRef}>
      <header style={{ position: 'fixed', top: '0', left: '0', right: '0', zIndex: '50', background: '#FFFFFF', borderBottom: `1px solid ${headerLine}`, transition: 'border-color .2s ease' }}>
      <div className="ol-headrow" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', height: headerH, boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)', alignItems: 'center', gap: '32px', position: 'relative' }}>

      <a href="/" aria-label="OnlineLabs, naar de homepage" style={{ display: 'flex', alignItems: 'center', flexShrink: '0' }}>
      <img className="ol-logo" src="/onlinelabs-logo-2027.svg" alt="OnlineLabs" width="140" height="28" style={{ height: '28px', width: 'auto', display: 'block' }} />
      </a>

      <nav className="ol-nav" aria-label="Hoofdmenu" style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px' }}>
      <button className="ol-navlink" type="button" onClick={toggleMenu} aria-expanded={menuOpenStr} aria-controls="ol-mega" style={{ fontFamily: 'inherit', fontSize: '17px', fontWeight: '600', border: '0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 18px', background: wwd.bg, color: wwd.color }}>
      <span>Wat we doen</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: '3', strokeLinecap: 'round', strokeLinejoin: 'round', transform: wwd.rot, transition: 'transform .2s ease' }}><path d="M6 9l6 6 6-6"></path></svg>
      </button>
      <a className="ol-navlink" href="/aanpak" style={{ display: 'flex', alignItems: 'center', padding: '0 16px', fontSize: '17px', fontWeight: '600', textDecoration: 'none' }}>Aanpak</a>
      <a className="ol-navlink" href="/ons-werk" style={{ display: 'flex', alignItems: 'center', padding: '0 16px', fontSize: '17px', fontWeight: '600', textDecoration: 'none' }}>Ons werk</a>
      <a className="ol-navlink" href="/blog" style={{ display: 'flex', alignItems: 'center', padding: '0 16px', fontSize: '17px', fontWeight: '600', textDecoration: 'none' }}>Blog</a>
      <a className="ol-navlink" href="/over-ons" style={{ display: 'flex', alignItems: 'center', padding: '0 16px', fontSize: '17px', fontWeight: '600', textDecoration: 'none' }}>Over ons</a>
      <a className="ol-navlink" href="/contact" style={{ display: 'flex', alignItems: 'center', padding: '0 16px', fontSize: '17px', fontWeight: '600', textDecoration: 'none' }}>Contact</a>
      </nav>

      <div className="ol-right" style={{ justifySelf: 'end', display: 'flex', alignItems: 'center', gap: '28px', flexShrink: '0' }}>
      <a className="ol-pill" href="/contact" style={{ display: 'inline-flex', alignItems: 'center', height: '56px', padding: '0 30px', borderRadius: '999px', background: '#0A0F1F', color: '#FFFFFF', fontSize: '16px', fontWeight: '600', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'background .2s ease' }}>Kennismaken</a>
      </div>

      <div className="ol-mob" style={{ marginLeft: 'auto', alignItems: 'center', gap: '8px' }}>
      <a className="ol-pill" href="/contact" style={{ display: 'inline-flex', alignItems: 'center', height: '44px', padding: '0 18px', borderRadius: '999px', background: '#0A0F1F', color: '#FFFFFF', fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}>Kennismaken</a>
      <button type="button" onClick={openMob} aria-label="Menu openen" style={{ width: '44px', height: '44px', border: '0', background: 'transparent', color: '#0A0F1F', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: '2.2', strokeLinecap: 'round' }}><path d="M3 7h18M3 12h18M3 17h12"></path></svg>
      </button>
      </div>

      {menuOpen && (<>
      <div id="ol-mega" className="ol-mega" style={{ position: 'absolute', top: 'calc(100% + 8px)', left: '40px', right: '40px', background: '#376EB5', color: '#FFFFFF', borderRadius: '24px', padding: '48px', boxShadow: '0 30px 60px rgba(10, 15, 31, 0.18)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '48px' }}>

      <div>
      <p style={{ margin: '0 0 8px', paddingBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.28)', fontSize: '13px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E3ECF8' }}>Gevonden worden</p>
      <ul style={{ listStyle: 'none', margin: '0', padding: '0' }}>
      <li><a className="ol-mlink" href="/skills/seo-specialist" style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '14px 0', color: '#FFFFFF', textDecoration: 'none' }}><span className="ol-mt" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '19px', fontWeight: '600' }}>SEO &amp; vindbaarheid<svg className="ol-marr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: '2.5', strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span></a></li>
      <li><a className="ol-mlink" href="/skills/geo-optimalisatie" style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '14px 0', color: '#FFFFFF', textDecoration: 'none' }}><span className="ol-mt" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '19px', fontWeight: '600' }}>GEO en AI-zichtbaarheid<svg className="ol-marr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: '2.5', strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span></a></li>
      <li><a className="ol-mlink" href="/skills/online-adverteren" style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '14px 0', color: '#FFFFFF', textDecoration: 'none' }}><span className="ol-mt" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '19px', fontWeight: '600' }}>Online adverteren<svg className="ol-marr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: '2.5', strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span></a></li>
      <li><a className="ol-mlink" href="/skills/lokale-seo-amsterdam" style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '14px 0', color: '#FFFFFF', textDecoration: 'none' }}><span className="ol-mt" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '19px', fontWeight: '600' }}>Lokale SEO Amsterdam<svg className="ol-marr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: '2.5', strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span></a></li>
      </ul>
      </div>

      <div>
      <p style={{ margin: '0 0 8px', paddingBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.28)', fontSize: '13px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E3ECF8' }}>Websites die werken</p>
      <ul style={{ listStyle: 'none', margin: '0', padding: '0' }}>
      <li><a className="ol-mlink" href="/skills/website-laten-maken" style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '14px 0', color: '#FFFFFF', textDecoration: 'none' }}><span className="ol-mt" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '19px', fontWeight: '600' }}>Website laten maken<svg className="ol-marr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: '2.5', strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span></a></li>
      <li><a className="ol-mlink" href="/skills/website-laten-maken" style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '14px 0', color: '#FFFFFF', textDecoration: 'none' }}><span className="ol-mt" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '19px', fontWeight: '600' }}>Webdesign &amp; UX<svg className="ol-marr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: '2.5', strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span></a></li>
      <li><a className="ol-mlink" href="/skills/website-snelheid-optimalisatie" style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '14px 0', color: '#FFFFFF', textDecoration: 'none' }}><span className="ol-mt" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '19px', fontWeight: '600' }}>Website snelheid<svg className="ol-marr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: '2.5', strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span></a></li>
      <li><a className="ol-mlink" href="/skills/conversie-optimalisatie-specialist" style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '14px 0', color: '#FFFFFF', textDecoration: 'none' }}><span className="ol-mt" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '19px', fontWeight: '600' }}>Conversie-optimalisatie<svg className="ol-marr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: '2.5', strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span></a></li>
      </ul>
      </div>

      <div>
      <p style={{ margin: '0 0 8px', paddingBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.28)', fontSize: '13px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E3ECF8' }}>Maatwerk en applicaties</p>
      <ul style={{ listStyle: 'none', margin: '0', padding: '0' }}>
      <li><a className="ol-mlink" href="/contact" style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '14px 0', color: '#FFFFFF', textDecoration: 'none' }}><span className="ol-mt" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '19px', fontWeight: '600' }}>Slimme features<svg className="ol-marr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: '2.5', strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span></a></li>
      <li><a className="ol-mlink" href="/contact" style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '14px 0', color: '#FFFFFF', textDecoration: 'none' }}><span className="ol-mt" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '19px', fontWeight: '600' }}>Webapplicaties<svg className="ol-marr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: '2.5', strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span></a></li>
      <li><a className="ol-mlink" href="/contact" style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '14px 0', color: '#FFFFFF', textDecoration: 'none' }}><span className="ol-mt" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '19px', fontWeight: '600' }}>AI-automatisering<svg className="ol-marr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: '2.5', strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span></a></li>
      </ul>
      </div>

      </div>

      </div>
      </>)}

      </div>
      </header>

      {mobOpen && (<>
      <div role="dialog" onClick={onMobClick} aria-modal="true" aria-label="Menu" style={{ position: 'fixed', inset: '0', zIndex: '60', background: '#0A0F1F', color: '#FFFFFF', overflowY: 'auto', padding: '0 20px 40px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: '0' }}>
      <img src="/onlinelabs-logo-2027-wit.svg" alt="OnlineLabs" style={{ height: '24px', width: 'auto', display: 'block' }} />
      <button type="button" onClick={closeMob} aria-label="Menu sluiten" style={{ width: '44px', height: '44px', border: '0', background: 'transparent', color: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: '2.2', strokeLinecap: 'round' }}><path d="M6 6l12 12M18 6L6 18"></path></svg>
      </button>
      </div>
      <nav aria-label="Mobiel menu" style={{ display: 'flex', flexDirection: 'column', marginTop: '24px' }}>
      <button type="button" onClick={toggleMobWwd} aria-expanded={mobWwdStr} style={{ fontFamily: 'inherit', fontSize: '32px', fontWeight: '800', letterSpacing: '-0.02em', color: '#FFFFFF', background: 'transparent', border: '0', borderBottom: '1px solid rgba(255, 255, 255, 0.14)', padding: '16px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left' }}>Wat we doen
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" style={{ strokeWidth: '2.5', strokeLinecap: 'round', strokeLinejoin: 'round', transform: mobWwdRot }}><path d="M6 9l6 6 6-6"></path></svg>
      </button>
      {mobWwd && (<>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px 0 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.14)' }}>
      <div>
      <p style={{ margin: '0 0 8px', fontSize: '13px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A9AFBF' }}>Gevonden worden</p>
      <a href="/skills/seo-specialist" style={{ display: 'block', padding: '6px 0', color: '#FFFFFF', fontSize: '18px', textDecoration: 'none' }}>SEO &amp; vindbaarheid</a>
      <a href="/skills/geo-optimalisatie" style={{ display: 'block', padding: '6px 0', color: '#FFFFFF', fontSize: '18px', textDecoration: 'none' }}>GEO en AI-zichtbaarheid</a>
      <a href="/skills/online-adverteren" style={{ display: 'block', padding: '6px 0', color: '#FFFFFF', fontSize: '18px', textDecoration: 'none' }}>Online adverteren</a>
      <a href="/skills/lokale-seo-amsterdam" style={{ display: 'block', padding: '6px 0', color: '#FFFFFF', fontSize: '18px', textDecoration: 'none' }}>Lokale SEO Amsterdam</a>
      </div>
      <div>
      <p style={{ margin: '0 0 8px', fontSize: '13px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A9AFBF' }}>Websites die werken</p>
      <a href="/skills/website-laten-maken" style={{ display: 'block', padding: '6px 0', color: '#FFFFFF', fontSize: '18px', textDecoration: 'none' }}>Website laten maken</a>
      <a href="/skills/website-laten-maken" style={{ display: 'block', padding: '6px 0', color: '#FFFFFF', fontSize: '18px', textDecoration: 'none' }}>Webdesign &amp; UX</a>
      <a href="/skills/website-snelheid-optimalisatie" style={{ display: 'block', padding: '6px 0', color: '#FFFFFF', fontSize: '18px', textDecoration: 'none' }}>Website snelheid</a>
      <a href="/skills/conversie-optimalisatie-specialist" style={{ display: 'block', padding: '6px 0', color: '#FFFFFF', fontSize: '18px', textDecoration: 'none' }}>Conversie-optimalisatie</a>
      </div>
      <div>
      <p style={{ margin: '0 0 8px', fontSize: '13px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A9AFBF' }}>Maatwerk en applicaties</p>
      <a href="/contact" style={{ display: 'block', padding: '6px 0', color: '#FFFFFF', fontSize: '18px', textDecoration: 'none' }}>Slimme features</a>
      <a href="/contact" style={{ display: 'block', padding: '6px 0', color: '#FFFFFF', fontSize: '18px', textDecoration: 'none' }}>Webapplicaties</a>
      <a href="/contact" style={{ display: 'block', padding: '6px 0', color: '#FFFFFF', fontSize: '18px', textDecoration: 'none' }}>AI-automatisering</a>
      </div>
      <div>
      <p style={{ margin: '0 0 8px', fontSize: '13px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A9AFBF' }}>Teun.ai, ons eigen platform</p>
      <a href="https://teun.ai/tools/ai-visibility" target="_blank" rel="noopener" style={{ display: 'block', padding: '6px 0', color: '#FFFFFF', fontSize: '18px', textDecoration: 'none' }}>AI Visibility scan</a>
      <a href="https://teun.ai/tools/ai-rank-tracker" target="_blank" rel="noopener" style={{ display: 'block', padding: '6px 0', color: '#FFFFFF', fontSize: '18px', textDecoration: 'none' }}>AI Rank Tracker</a>
      <a href="https://teun.ai/tools/geo-audit" target="_blank" rel="noopener" style={{ display: 'block', padding: '6px 0', color: '#FFFFFF', fontSize: '18px', textDecoration: 'none' }}>GEO Audit</a>
      <a href="https://teun.ai/tools/brand-check" target="_blank" rel="noopener" style={{ display: 'block', padding: '6px 0', color: '#FFFFFF', fontSize: '18px', textDecoration: 'none' }}>Brand Check</a>
      <a href="https://teun.ai/tools/ai-prompt-explorer" target="_blank" rel="noopener" style={{ display: 'block', padding: '6px 0', color: '#FFFFFF', fontSize: '18px', textDecoration: 'none' }}>AI Prompt Explorer</a>
      </div>
      </div>
      </>)}
      <a href="/aanpak" style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-0.02em', color: '#FFFFFF', textDecoration: 'none', padding: '16px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.14)' }}>Aanpak</a>
      <a href="/ons-werk" style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-0.02em', color: '#FFFFFF', textDecoration: 'none', padding: '16px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.14)' }}>Ons werk</a>
      <a href="/blog" style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-0.02em', color: '#FFFFFF', textDecoration: 'none', padding: '16px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.14)' }}>Blog</a>
      <a href="/over-ons" style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-0.02em', color: '#FFFFFF', textDecoration: 'none', padding: '16px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.14)' }}>Over ons</a>
      <a href="/contact" style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-0.02em', color: '#FFFFFF', textDecoration: 'none', padding: '16px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.14)' }}>Contact</a>
      <a href="https://teun.ai" target="_blank" rel="noopener" style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-0.02em', color: '#FFFFFF', textDecoration: 'none', padding: '16px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.14)' }}>Teun.ai</a>
      </nav>
      <div style={{ marginTop: 'auto', paddingTop: '40px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '17px' }}>
      <a href="tel:+31208202022" style={{ color: '#FFFFFF', textDecoration: 'none', padding: '6px 0' }}>020 820 20 22</a>
      <a href="mailto:hallo@onlinelabs.nl" style={{ color: '#FFFFFF', textDecoration: 'none', padding: '6px 0' }}>hallo@onlinelabs.nl</a>
      <span style={{ color: '#A9AFBF', fontSize: '15px', paddingTop: '6px' }}>Herengracht 221, Amsterdam</span>
      </div>
      </div>
      </>)}
    </div>
  );
}
