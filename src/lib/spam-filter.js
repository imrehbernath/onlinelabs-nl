// lib/spam-filter.js - spamchecks voor het contactformulier
//
// Geen Next- of netwerk-afhankelijkheden, zodat scripts/spam-filter.test.mjs
// dit los kan draaien. De lijsten en drempels staan in spam-config.js.

import { SPAM_CONFIG } from './spam-config.js';

const URL_PATTERN = /https?:\/\//i;

function vowelRatio(value) {
  const letters = value.replace(/[^\p{L}]/gu, '');
  if (!letters.length) return 0;
  const vowels = letters.match(/[aeiouyàáâäãåèéêëìíîïòóôöõùúûüýÿ]/giu);
  return (vowels ? vowels.length : 0) / letters.length;
}

// "iVCsXuthlulZlrJg" → random string. "Schmidt" of "Imre" → gewoon een naam.
function looksLikeRandomString(name) {
  if (name.length < 8) return false; // korte namen nooit flaggen
  if (/\s/.test(name)) return false; // meerdere woorden = echte naam
  return vowelRatio(name) < 0.2;
}

function heuristicSignals({ name, message, interests }) {
  const hard = []; // elk signaal apart genoeg om te weigeren
  const soft = []; // pas weigeren bij twee of meer

  const interestCount = Array.isArray(interests) ? interests.length : 0;
  if (interestCount > 6) hard.push(`${interestCount} interesses aangevinkt (max 6)`);
  else if (interestCount >= 5) soft.push(`${interestCount} interesses aangevinkt`);

  const cleanName = (name || '').trim();
  const cleanMessage = (message || '').trim();

  if (!cleanMessage) soft.push('geen bericht ingevuld');
  else if (cleanMessage.length < 10) hard.push(`bericht is ${cleanMessage.length} tekens (min 10)`);
  else if (!/\s/.test(cleanMessage)) hard.push('bericht bevat geen enkele spatie');

  if (looksLikeRandomString(cleanName)) {
    hard.push(`naam lijkt een random string (${Math.round(vowelRatio(cleanName) * 100)}% klinkers, geen spatie)`);
  }

  if (URL_PATTERN.test(cleanName)) hard.push('naam bevat een URL');
  if (URL_PATTERN.test(cleanMessage)) hard.push('bericht bevat een URL');

  return { hard, soft };
}

function asText(value) {
  return typeof value === 'string' ? value : '';
}

// Kleine letters, en spaties/streepjes/regeleindes naar één spatie
function normalize(value) {
  return asText(value).toLowerCase().replace(/[\s _-]+/g, ' ').trim();
}

function firstMatch(patterns, value) {
  return patterns.find((pattern) => pattern.test(value));
}

function matchingPhrases(phrases, text) {
  return phrases
    .filter((phrase) => (typeof phrase === 'string' ? text.includes(phrase) : phrase.test(text)))
    .map((phrase) => (typeof phrase === 'string' ? phrase : String(phrase)));
}

function isBlockedDomain(hostname) {
  return SPAM_CONFIG.BLOCKED_DOMAINS.some(
    (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
  );
}

function blocklistSignals({ name, email, message, website }) {
  const hard = [];
  const soft = [];

  const address = asText(email).trim().toLowerCase();
  const at = address.lastIndexOf('@');
  const local = at === -1 ? address : address.slice(0, at);
  const domain = at === -1 ? '' : address.slice(at + 1);

  if (isBlockedDomain(domain)) {
    hard.push(`e-maildomein ${domain} staat op de blocklist`);
  } else {
    const pattern =
      firstMatch(SPAM_CONFIG.EMAIL_PATTERNS, local) ||
      firstMatch(SPAM_CONFIG.EMAIL_PATTERNS, domain) ||
      firstMatch(SPAM_CONFIG.EMAIL_LOCAL_PATTERNS, local);

    if (pattern) {
      hard.push(`e-mailadres matcht blocklist ${pattern}`);
    } else {
      const softPattern = firstMatch(SPAM_CONFIG.EMAIL_LOCAL_SOFT_PATTERNS, local);
      if (softPattern) soft.push(`e-mailadres matcht ${softPattern}`);
    }
  }

  const site = asText(website).trim().toLowerCase();
  const blockedSite = SPAM_CONFIG.BLOCKED_DOMAINS.find((blocked) => site.includes(blocked));
  if (blockedSite) hard.push(`website-veld bevat ${blockedSite}`);

  const text = [name, message, website].map(normalize).join(' \n ');

  const hardPhrases = matchingPhrases(SPAM_CONFIG.CONTENT_PHRASES, text);
  if (hardPhrases.length) hard.push(`blocklist-term: ${hardPhrases.join(', ')}`);

  const softPhrases = matchingPhrases(SPAM_CONFIG.CONTENT_SOFT_PHRASES, text);
  if (softPhrases.length) soft.push(`verkoopterm: ${softPhrases.join(', ')}`);

  return { hard, soft };
}

// Alle inhoudelijke checks op één contactinzending. Lege `reasons` = doorlaten.
export function checkContactSubmission(body, now = Date.now()) {
  const { name, email, website, message, interests } = body;
  const reasons = [];
  let elapsedMs = null;

  // Alleen bots vullen dit veld in — het is onzichtbaar en niet tabbaar
  if (typeof body.company_website === 'string' && body.company_website.trim()) {
    reasons.push('honeypot-veld ingevuld');
  }

  const renderedAt = Number(body.form_rendered_at);
  if (!Number.isFinite(renderedAt) || renderedAt <= 0) {
    reasons.push('render-timestamp ontbreekt');
  } else {
    elapsedMs = now - renderedAt;
    if (elapsedMs < SPAM_CONFIG.MIN_FILL_MS) {
      reasons.push(`in ${Math.max(0, Math.round(elapsedMs / 100) / 10)}s ingevuld (min 3s)`);
    } else if (elapsedMs > SPAM_CONFIG.MAX_FORM_AGE_MS) {
      reasons.push(`formulier was ${Math.round(elapsedMs / 60000)} min oud (max 120)`);
    }
  }

  const heuristics = heuristicSignals({ name, message, interests });
  const blocklist = blocklistSignals({ name, email, message, website });

  reasons.push(...heuristics.hard, ...blocklist.hard);

  const soft = [...heuristics.soft, ...blocklist.soft];
  if (soft.length >= 2) reasons.push(...soft);

  return { reasons, elapsedMs };
}

// In-memory teller per IP. Op Vercel leeft dit per serverinstantie, dus het is
// een vangnet tegen een burst vanaf één adres, geen harde grens.
const submissionsByIp = new Map();

export function isRateLimited(ip, now = Date.now()) {
  const { max, windowMs } = SPAM_CONFIG.RATE_LIMIT;

  if (submissionsByIp.size > 500) {
    for (const [key, times] of submissionsByIp) {
      if (times.every((time) => now - time >= windowMs)) submissionsByIp.delete(key);
    }
  }

  const recent = (submissionsByIp.get(ip) || []).filter((time) => now - time < windowMs);
  const limited = recent.length >= max;
  if (!limited) recent.push(now);
  submissionsByIp.set(ip, recent);

  return limited;
}
