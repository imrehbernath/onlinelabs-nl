import { initBotId } from 'botid/client/core';

// Vercel BotID — client-side sessie voor de routes die we serverside met
// checkBotId() verifiëren. Onzichtbaar voor bezoekers: geen challenge, geen UI.
initBotId({
  protect: [
    {
      path: '/api/contact',
      method: 'POST',
    },
  ],
});
