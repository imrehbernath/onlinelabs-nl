// ============================================
// API Route voor Website Calculator
// Plaats in: src/app/api/calculator/route.js
// ============================================

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Mapping voor leesbare labels
    const designLabels = {
      figma: 'Figma/Sketch aangeleverd (-15%)',
      sketch: 'Schets/wireframe',
      nothing: 'Nog geen design (+25%)',
    };
    
    const typeLabels = {
      starter: 'Starter Pakket (€2.999)',
      business: 'Zakelijk Pakket (€4.499)',
      webshop: 'Webshop (€7.499)',
      custom: 'Custom Website (€12.000+)',
    };
    
    const cmsLabels = {
      wordpress: 'WordPress',
      headless: 'Headless Next.js (+€2.500)',
      custom: 'Volledig maatwerk (+€5.000)',
    };
    
    const timelineLabels = {
      standard: 'Standaard (8-12 weken)',
      fast: 'Versneld (5-7 weken) +20%',
      urgent: 'Spoed (3-4 weken) +40%',
    };
    
    const featureLabels = {
      multilingual: 'Meertalig (+€1.200)',
      blog: 'Blog/Nieuws (+€600)',
      booking: 'Boekingssysteem (+€1.800)',
      crm: 'CRM integratie (+€1.200)',
      seoPackage: 'SEO pakket (+€1.500)',
      aiVisibility: 'AI zichtbaarheid (+€800)',
    };
    
    // Geselecteerde features
    const selectedFeatures = Object.entries(data.features || {})
      .filter(([_, enabled]) => enabled)
      .map(([key]) => featureLabels[key] || key);

    // Slack message
    const slackMessage = {
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🧮 Nieuwe Calculator Aanvraag',
            emoji: true,
          },
        },
        {
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: `*Naam:*\n${data.name}` },
            { type: 'mrkdwn', text: `*Bedrijf:*\n${data.company}` },
            { type: 'mrkdwn', text: `*Email:*\n${data.email}` },
            { type: 'mrkdwn', text: `*Telefoon:*\n${data.phone || 'Niet opgegeven'}` },
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*💰 Berekende prijs: €${data.calculatedPrice?.toLocaleString('nl-NL')}*`,
          },
        },
        {
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: `*Design:*\n${designLabels[data.designStatus] || '-'}` },
            { type: 'mrkdwn', text: `*Ervaring:*\n${data.experience === 'first' ? 'Eerste website' : 'Ervaren'}` },
            { type: 'mrkdwn', text: `*Pakket:*\n${typeLabels[data.websiteType] || '-'}` },
            { type: 'mrkdwn', text: `*Pagina's:*\n${data.pageCount}` },
            { type: 'mrkdwn', text: `*Techniek:*\n${cmsLabels[data.cms] || '-'}` },
            { type: 'mrkdwn', text: `*Timeline:*\n${timelineLabels[data.timeline] || '-'}` },
          ],
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Extra's:*\n${selectedFeatures.length > 0 ? selectedFeatures.join('\n') : 'Geen'}`,
          },
        },
        ...(data.message ? [{
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Bericht:*\n${data.message}`,
          },
        }] : []),
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: '📧 Stuur email',
                emoji: true,
              },
              url: `mailto:${data.email}?subject=Website offerte OnlineLabs&body=Beste ${encodeURIComponent(data.name)},%0D%0A%0D%0ABedankt voor je interesse in een website van OnlineLabs!%0D%0A%0D%0AOp basis van de calculator kom ik uit op een indicatie van €${data.calculatedPrice?.toLocaleString('nl-NL')} excl. BTW.%0D%0A%0D%0AIk plan graag een vrijblijvend gesprek om je wensen door te nemen.%0D%0A%0D%0AMet vriendelijke groet,%0D%0AImre Bernáth%0D%0AOnlineLabs`,
              style: 'primary',
            },
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: '📞 Bellen',
                emoji: true,
              },
              url: `tel:${data.phone || ''}`,
            },
          ],
        },
      ],
    };

    // Verzend naar Slack
    // Gebruik dezelfde webhook als je contact formulier
    const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK_URL;
    
    if (SLACK_WEBHOOK) {
      await fetch(SLACK_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slackMessage),
      });
    }

    return Response.json({ success: true });
    
  } catch (error) {
    console.error('Calculator API Error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
