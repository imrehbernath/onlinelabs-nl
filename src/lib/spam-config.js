// lib/spam-config.js - blocklists en drempels voor het contactformulier
//
// Aanvullen kan hier; de logica staat in spam-filter.js.
// HARD = één treffer blokkeert de inzending.
// ZACHT = telt als één signaal, pas bij twee zachte signalen wordt geblokkeerd.
// Zet een term bij twijfel in de zachte lijst: OnlineLabs verkoopt zelf SEO en
// linkbuilding, dus een echte klant gebruikt die woorden ook.

export const SPAM_CONFIG = {
  MIN_FILL_MS: 3000, // sneller ingevuld dan 3s = geen mens
  MAX_FORM_AGE_MS: 2 * 60 * 60 * 1000, // ouder dan 2 uur = gescraped/replay

  RATE_LIMIT: {
    max: 3, // inzendingen per IP
    windowMs: 10 * 60 * 1000, // per 10 minuten
  },

  // HARD — exacte domeinen (subdomeinen tellen mee). Geldt voor het
  // e-mailadres en voor het website-veld.
  BLOCKED_DOMAINS: [
    'websfirm.com',
    'ranksindia.com',
    'nextbacklinks.com',
  ],

  // HARD — op het deel vóór de @ én op het domein.
  EMAIL_PATTERNS: [
    /linkbuild/,
    /backlink/,
    /guest\.?post/,
    /websfirm/,
    /ranksindia/,
  ],

  // HARD — alleen op het deel vóór de @. Kaal "seo" staat hier bewust niet:
  // dat zit ook in joseortega@, roseoliver@ en museon.nl.
  EMAIL_LOCAL_PATTERNS: [
    /seo(expert|specialist|consultant|services?|agency|team|guru)/, // malayseospecialist
    /(^|[._-])seo([._-]|$)/, // jan.seo, seo.jan
    /seo\d/, // janemwangiseo12
    /outreach/,
  ],

  // ZACHT — alleen op het deel vóór de @.
  EMAIL_LOCAL_SOFT_PATTERNS: [
    /seo/,
    /digital\.?marketing/,
    /webdesigner/,
    /digital\.?agency/,
  ],

  // HARD — in naam, bericht en website-veld. Kleine letters; spaties,
  // streepjes en regeleindes worden vóór het vergelijken gelijkgetrokken,
  // dus 'white label' vangt ook 'white-label'.
  CONTENT_PHRASES: [
    'guest post',
    'guestpost',
    'link insertion',
    'sponsored post',
    'sponsored content',
    'white label',
    'rank your website',
    'first page of google',
    'website redesign services',
    /\bda ?:? ?([5-9]\d|100)\b/, // DA 50 en hoger
  ],

  // ZACHT — in naam, bericht en website-veld. Meerdere treffers tellen samen
  // als één signaal.
  CONTENT_SOFT_PHRASES: [
    'backlink',
    'link building',
    'linkbuilding',
    'outsourc',
    'seo service',
  ],
};
