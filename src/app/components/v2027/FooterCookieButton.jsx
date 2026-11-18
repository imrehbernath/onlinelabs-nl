'use client';

import { openCookieSettings } from '../CookieConsent';

// Knop in de footer die de cookiebanner opnieuw opent
export default function FooterCookieButton() {
  return (
    <button type="button" className="ol-ft-link ol-ft-btn" onClick={openCookieSettings}>Cookievoorkeuren</button>
  );
}
