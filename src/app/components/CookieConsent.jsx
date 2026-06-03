'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'

const CONSENT_COOKIE = 'onlinelabs-cookie-consent'
const GTM_ID = 'GTM-P6CQL8N' // bestaande GTM-container, laadt GA4 na akkoord

function readConsent() {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|;\s*)onlinelabs-cookie-consent=([^;]+)/)
  return match ? match[1] : null
}

function writeConsent(value) {
  const sixMonths = 60 * 60 * 24 * 182
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${sixMonths}; SameSite=Lax`
}

// Roep dit overal aan (bv. footer-link) om de banner opnieuw te openen
export function openCookieSettings() {
  window.dispatchEvent(new Event('onlinelabs-open-cookie-settings'))
}

export default function CookieConsent() {
  const [consent, setConsent] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = readConsent()
    if (stored === 'granted' || stored === 'denied') {
      setConsent(stored)
    } else {
      setVisible(true)
    }

    function handleOpen() {
      setVisible(true)
    }
    window.addEventListener('onlinelabs-open-cookie-settings', handleOpen)
    return () => window.removeEventListener('onlinelabs-open-cookie-settings', handleOpen)
  }, [])

  function accept() {
    writeConsent('granted')
    setConsent('granted')
    setVisible(false)
  }

  function reject() {
    const wasGranted = consent === 'granted'
    writeConsent('denied')
    setConsent('denied')
    setVisible(false)
    // GTM was al geladen deze sessie, herlaad zodat tracking echt stopt
    if (wasGranted) window.location.reload()
  }

  return (
    <>
      {consent === 'granted' && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      )}

      {visible && (
        <div
          className="fixed inset-x-4 bottom-4 z-[9999] flex justify-center pointer-events-none"
          role="dialog"
          aria-live="polite"
          aria-label="Cookietoestemming"
        >
          <div className="pointer-events-auto w-full max-w-3xl bg-white border border-gray-200 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="flex-1">
              <p className="font-serif text-lg font-semibold text-gray-900 mb-1">
                Cookies op OnlineLabs
              </p>
              <p className="font-sans text-sm leading-relaxed text-gray-700">
                We gebruiken alleen analytische cookies (Google Analytics) om te zien
                hoe bezoekers de site gebruiken. Geen marketing, geen tracking door
                derden.{' '}
                <a href="/privacyverklaring" className="text-[#376eb5] underline">
                  Privacyverklaring
                </a>
                .
              </p>
              {consent && (
                <p className="font-sans text-xs text-gray-500 mt-2">
                  Huidige keuze: {consent === 'granted' ? 'cookies geaccepteerd' : 'cookies geweigerd'}.
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
              <button
                type="button"
                onClick={reject}
                className="flex-1 sm:flex-none font-sans text-sm font-semibold px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Weigeren
              </button>
              <button
                type="button"
                onClick={accept}
                className="flex-1 sm:flex-none font-sans text-sm font-semibold px-5 py-2.5 rounded-lg bg-[#376eb5] text-white hover:bg-[#2f5f9c] transition-colors"
              >
                Accepteren
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
