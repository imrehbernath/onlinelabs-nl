// Tests voor de spamchecks van het contactformulier.
// Draaien: npm run test:spam

import test from 'node:test';
import assert from 'node:assert/strict';
import { checkContactSubmission, isRateLimited } from '../src/lib/spam-filter.js';

const NOW = Date.UTC(2026, 9, 12, 10, 0, 0);

// Een echte aanvraag, 45 seconden na het laden van de pagina verstuurd
function submission(overrides = {}) {
  return {
    name: 'Sanne de Vries',
    email: 'sanne@bakkerijdevries.nl',
    phone: '0612345678',
    website: 'bakkerijdevries.nl',
    message: 'Wij zoeken een bureau dat onze webshop beter vindbaar maakt in Google. Kunnen we volgende week bellen?',
    interests: ['SEO & vindbaarheid in Google'],
    company_website: '',
    form_rendered_at: String(NOW - 45_000),
    ...overrides,
  };
}

const reasonsFor = (overrides) => checkContactSubmission(submission(overrides), NOW).reasons;

test('echte aanvraag gaat door', () => {
  assert.deepEqual(reasonsFor(), []);
});

test('gevulde honeypot wordt geblokkeerd', () => {
  assert.match(reasonsFor({ company_website: 'https://example.com' }).join(), /honeypot/);
});

test('inzending binnen 3 seconden wordt geblokkeerd', () => {
  assert.match(reasonsFor({ form_rendered_at: String(NOW - 1200) }).join(), /min 3s/);
});

test('e-mail met "seoexpert" wordt geblokkeerd', () => {
  assert.match(reasonsFor({ email: 'subhajitseoexpert@gmail.com' }).join(), /e-mailadres matcht blocklist/);
});

test('bericht met "guest post" wordt geblokkeerd', () => {
  const message = 'Hello, I would like to publish a Guest\nPost on your website. Please share your price.';
  assert.match(reasonsFor({ message }).join(), /blocklist-term: guest post/);
});

test('alle spamadressen uit de inbox worden geblokkeerd', () => {
  const addresses = [
    'malayseospecialist@gmail.com',
    'subhajitseoexpert@gmail.com',
    'sidu.linkbuildersteam@gmail.com',
    'sachin.digitallinkbuilding@gmail.com',
    'deepseoconsultant01@gmail.com',
    'rajdeep.guestpostservice@gmail.com',
    'zoey.outreachspecialist@gmail.com',
    'laylamurphy.websfirm@gmail.com',
    'Marketing@WebsFirm.com',
    'info@ranksindia.com',
    'info@nextbacklinks.com',
    'janemwangiseo12@gmail.com',
  ];
  for (const email of addresses) {
    assert.notDeepEqual(reasonsFor({ email }), [], email);
  }
});

test('gewone adressen met toevallig "seo" of een bureaunaam gaan door', () => {
  const addresses = [
    'joseortega@gmail.com',
    'roseoliver@gmail.com',
    'info@museon.nl',
    'anna@seobureau.nl',
    'jan@webdesigner-utrecht.nl',
    'marketing@digitalagency.nl',
  ];
  for (const email of addresses) {
    assert.deepEqual(reasonsFor({ email }), [], email);
  }
});

test('verkoopzinnen in het bericht worden geblokkeerd', () => {
  const messages = [
    'We offer white-label development for agencies like yours at a fair price.',
    'I can provide sites with DA 50+ and real traffic for your clients.',
    'We can rank your website on the first page of Google within 3 months.',
    'Do you accept sponsored posts or link insertion on your blog?',
  ];
  for (const message of messages) {
    assert.notDeepEqual(reasonsFor({ message }), [], message);
  }
});

test('klant die zelf om linkbuilding vraagt gaat door', () => {
  const message = 'We willen meer backlinks en zoeken hulp met linkbuilding. Doen jullie dat ook voor webshops?';
  assert.deepEqual(reasonsFor({ message }), []);
});

test('twee zachte signalen samen worden geblokkeerd', () => {
  const reasons = reasonsFor({
    email: 'ravi.digitalmarketing@gmail.com',
    message: 'We are a team offering affordable SEO services and link building for agencies.',
  });
  assert.equal(reasons.length, 2);
});

test('rate limit: vierde inzending binnen 10 minuten wordt geweigerd', () => {
  const ip = '203.0.113.7';
  assert.equal(isRateLimited(ip, NOW), false);
  assert.equal(isRateLimited(ip, NOW + 60_000), false);
  assert.equal(isRateLimited(ip, NOW + 120_000), false);
  assert.equal(isRateLimited(ip, NOW + 180_000), true);
  assert.equal(isRateLimited('203.0.113.8', NOW + 180_000), false, 'ander IP telt apart');
  assert.equal(isRateLimited(ip, NOW + 11 * 60_000), false, 'na 10 minuten weer vrij');
});
