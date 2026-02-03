import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Slack notificatie functie
async function sendSlackNotification(contactData) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  
  console.log('🔍 Slack webhook URL:', webhookUrl ? 'Gevonden' : 'NIET GEVONDEN');
  
  if (!webhookUrl) {
    console.log('⚠️ Slack webhook URL niet geconfigureerd');
    return;
  }

  try {
    const { name, email, phone, website, message, interests } = contactData;
    const interestsList = interests?.length > 0 ? interests.join(', ') : 'Geen specifieke interesse';

    // Simpele tekst versie (werkt altijd)
    const slackMessage = {
      text: `📬 *Nieuwe contactaanvraag!*\n\n*Naam:* ${name}\n*Email:* ${email}\n*Telefoon:* ${phone || 'Niet ingevuld'}\n*Website:* ${website || 'Niet ingevuld'}\n*Interesse:* ${interestsList}${message ? `\n*Bericht:* ${message}` : ''}`
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slackMessage)
    });

    console.log(response.ok ? '✅ Slack verstuurd' : '❌ Slack mislukt: ' + response.status);
  } catch (error) {
    console.error('❌ Slack error:', error);
  }
}

// Calculator submission handler
async function handleCalculatorSubmission(data) {
  const { name, email, company, phone, message, calculatedPrice, designStatus, experience, websiteType, pageCount, cms, timeline, features } = data;

  // Validation
  if (!name || !email || !company) {
    return NextResponse.json(
      { error: 'Naam, email en bedrijf zijn verplicht' },
      { status: 400 }
    );
  }

  // Labels voor leesbaarheid
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

  const selectedFeatures = Object.entries(features || {})
    .filter(([_, enabled]) => enabled)
    .map(([key]) => featureLabels[key] || key);

  const dateTime = new Date().toLocaleString('nl-NL', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Amsterdam'
  });

  try {
    // Send email to OnlineLabs
    await resend.emails.send({
      from: 'OnlineLabs <website@onlinelabs.nl>',
      to: process.env.RESEND_TO_EMAIL || 'hallo@onlinelabs.nl',
      replyTo: email,
      subject: `🧮 Calculator Lead: ${name} - €${calculatedPrice?.toLocaleString('nl-NL')}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #376eb5, #2d5a94); color: white; padding: 24px; border-radius: 8px 8px 0 0; }
            .price-badge { background: rgba(255,255,255,0.2); padding: 12px 20px; border-radius: 8px; display: inline-block; margin-top: 12px; }
            .price { font-size: 32px; font-weight: bold; }
            .content { background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
            .section { margin-bottom: 20px; }
            .section-title { font-weight: 600; color: #374151; font-size: 14px; text-transform: uppercase; margin-bottom: 8px; border-bottom: 2px solid #376eb5; padding-bottom: 4px; }
            .field { background: white; padding: 12px; border-radius: 6px; border: 1px solid #e5e7eb; margin-bottom: 8px; }
            .label { font-size: 12px; color: #6b7280; }
            .value { font-weight: 500; color: #1f2937; }
            .features-list { list-style: none; padding: 0; margin: 0; }
            .features-list li { background: white; padding: 8px 12px; border-radius: 6px; border: 1px solid #e5e7eb; margin-bottom: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 20px;">🧮 Nieuwe Calculator Aanvraag</h1>
              <p style="margin: 8px 0 0; opacity: 0.9;">${dateTime}</p>
              <div class="price-badge">
                <span class="price">€${calculatedPrice?.toLocaleString('nl-NL')}</span>
                <span style="opacity: 0.8; font-size: 14px;"> excl. BTW</span>
              </div>
            </div>
            <div class="content">
              <div class="section">
                <div class="section-title">Contactgegevens</div>
                <div class="field"><span class="label">Naam</span><br><span class="value">${name}</span></div>
                <div class="field"><span class="label">Bedrijf</span><br><span class="value">${company}</span></div>
                <div class="field"><span class="label">Email</span><br><span class="value"><a href="mailto:${email}">${email}</a></span></div>
                ${phone ? `<div class="field"><span class="label">Telefoon</span><br><span class="value"><a href="tel:${phone}">${phone}</a></span></div>` : ''}
              </div>
              
              <div class="section">
                <div class="section-title">Website Configuratie</div>
                <div class="field"><span class="label">Pakket</span><br><span class="value">${typeLabels[websiteType] || '-'}</span></div>
                <div class="field"><span class="label">Aantal pagina's</span><br><span class="value">${pageCount}</span></div>
                <div class="field"><span class="label">Design status</span><br><span class="value">${designLabels[designStatus] || '-'}</span></div>
                <div class="field"><span class="label">Techniek</span><br><span class="value">${cmsLabels[cms] || '-'}</span></div>
                <div class="field"><span class="label">Timeline</span><br><span class="value">${timelineLabels[timeline] || '-'}</span></div>
              </div>
              
              ${selectedFeatures.length > 0 ? `
              <div class="section">
                <div class="section-title">Geselecteerde Extra's</div>
                <ul class="features-list">
                  ${selectedFeatures.map(f => `<li>✓ ${f}</li>`).join('')}
                </ul>
              </div>
              ` : ''}
              
              ${message ? `
              <div class="section">
                <div class="section-title">Bericht</div>
                <div class="field">${message.replace(/\n/g, '<br>')}</div>
              </div>
              ` : ''}
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Send confirmation email to lead
    await resend.emails.send({
      from: 'OnlineLabs <website@onlinelabs.nl>',
      to: email,
      subject: `Je website prijsindicatie: €${calculatedPrice?.toLocaleString('nl-NL')}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #376eb5; margin-bottom: 24px; }
            .logo { font-size: 24px; font-weight: bold; color: #376eb5; }
            .price-box { background: linear-gradient(135deg, #376eb5, #2d5a94); color: white; padding: 32px; border-radius: 12px; text-align: center; margin: 24px 0; }
            .price { font-size: 48px; font-weight: bold; }
            .content { padding: 0 20px; }
            .summary { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .summary-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
            .summary-row:last-child { border-bottom: none; }
            .contact-info { background: #376eb5; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-top: 24px; }
            .contact-info a { color: white; }
            .footer { margin-top: 32px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">OnlineLabs</div>
            </div>
            
            <div class="content">
              <h1 style="text-align: center; color: #1f2937;">Hoi ${name.split(' ')[0]}! 👋</h1>
              
              <p>Bedankt voor je interesse! Hier is je persoonlijke prijsindicatie:</p>
              
              <div class="price-box">
                <div style="font-size: 14px; opacity: 0.9; margin-bottom: 8px;">Jouw investering vanaf</div>
                <div class="price">€${calculatedPrice?.toLocaleString('nl-NL')}</div>
                <div style="font-size: 14px; opacity: 0.8; margin-top: 4px;">excl. BTW</div>
              </div>
              
              <div class="summary">
                <strong style="display: block; margin-bottom: 12px;">Jouw configuratie:</strong>
                <div class="summary-row"><span>Pakket</span><span>${typeLabels[websiteType] || '-'}</span></div>
                <div class="summary-row"><span>Pagina's</span><span>${pageCount}</span></div>
                <div class="summary-row"><span>Techniek</span><span>${cmsLabels[cms] || '-'}</span></div>
                <div class="summary-row"><span>Timeline</span><span>${timelineLabels[timeline] || '-'}</span></div>
                ${selectedFeatures.length > 0 ? `<div class="summary-row"><span>Extra's</span><span>${selectedFeatures.length} geselecteerd</span></div>` : ''}
              </div>
              
              <p><strong>Wat nu?</strong><br>
              We nemen binnen 24 uur contact met je op om je wensen te bespreken en een offerte op maat te maken. Deze prijsindicatie is een startpunt – de definitieve prijs bepalen we samen.</p>
              
              <div class="contact-info">
                <p style="margin: 0 0 8px;"><strong>Liever direct contact?</strong></p>
                <p style="margin: 0;">
                  📞 <a href="tel:+31208202022">020 - 820 20 22</a><br>
                  📧 <a href="mailto:hallo@onlinelabs.nl">hallo@onlinelabs.nl</a>
                </p>
              </div>
            </div>
            
            <div class="footer">
              <p>
                OnlineLabs<br>
                Herengracht 221, Amsterdam<br>
                <a href="https://www.onlinelabs.nl">www.onlinelabs.nl</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Send Slack notification
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (webhookUrl) {
      const slackMessage = {
        text: `🧮 *Calculator Lead!*\n\n*${name}* (${company})\n💰 *€${calculatedPrice?.toLocaleString('nl-NL')}*\n\n📧 ${email}${phone ? `\n📞 ${phone}` : ''}\n\n*Pakket:* ${typeLabels[websiteType] || '-'}\n*Pagina's:* ${pageCount}\n*Techniek:* ${cmsLabels[cms] || '-'}\n*Timeline:* ${timelineLabels[timeline] || '-'}${selectedFeatures.length > 0 ? `\n*Extra's:* ${selectedFeatures.join(', ')}` : ''}`
      };

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slackMessage)
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Calculator submission error:', error);
    return NextResponse.json(
      { error: 'Er is een fout opgetreden' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Check if this is a calculator submission
    if (body.type === 'calculator') {
      return handleCalculatorSubmission(body);
    }
    
    // Regular contact form
    const { name, email, phone, website, message, interests } = body;

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Naam en email zijn verplicht' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Ongeldig emailadres' },
        { status: 400 }
      );
    }

    const dateTime = new Date().toLocaleString('nl-NL', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Europe/Amsterdam'
    });

    // Format interests for email
    const interestsHtml = interests && interests.length > 0
      ? `<ul style="margin: 0; padding-left: 20px;">${interests.map(i => `<li>${i}</li>`).join('')}</ul>`
      : '<em>Geen specifieke interesse aangegeven</em>';

    // Send notification to OnlineLabs
    await resend.emails.send({
      from: 'OnlineLabs <website@onlinelabs.nl>',
      to: process.env.RESEND_TO_EMAIL || 'hallo@onlinelabs.nl',
      replyTo: email,
      subject: `🚀 Nieuwe aanvraag van ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #376eb5; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 16px; }
            .label { font-weight: 600; color: #374151; font-size: 14px; margin-bottom: 4px; }
            .value { background: white; padding: 12px; border-radius: 6px; border: 1px solid #e5e7eb; }
            .message-box { background: white; padding: 16px; border-radius: 6px; border-left: 4px solid #376eb5; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">Nieuwe contactaanvraag</h1>
              <p style="margin: 8px 0 0; opacity: 0.9;">${dateTime}</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Naam</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              
              ${phone ? `
              <div class="field">
                <div class="label">Telefoon</div>
                <div class="value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              ` : ''}
              
              ${website ? `
              <div class="field">
                <div class="label">Website</div>
                <div class="value"><a href="${website}" target="_blank">${website}</a></div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="label">Interesse in</div>
                <div class="value">${interestsHtml}</div>
              </div>
              
              ${message ? `
              <div class="field">
                <div class="label">Bericht</div>
                <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
              </div>
              ` : ''}
              
              <div class="footer">
                <p>Via het contactformulier op onlinelabs.nl</p>
                <p>Klik reply om direct te antwoorden naar ${email}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Send confirmation to the person who filled out the form
    await resend.emails.send({
      from: 'OnlineLabs <website@onlinelabs.nl>',
      to: email,
      subject: 'Bedankt voor je bericht - OnlineLabs',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #376eb5; margin-bottom: 24px; }
            .logo { font-size: 24px; font-weight: bold; color: #376eb5; }
            .content { padding: 0 20px; }
            h1 { color: #1f2937; font-size: 24px; margin-bottom: 16px; }
            .highlight { background: #f0f7ff; border-left: 4px solid #376eb5; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0; }
            .summary { background: #f9fafb; padding: 16px; border-radius: 8px; margin: 20px 0; }
            .summary-item { margin-bottom: 8px; }
            .summary-label { font-weight: 600; color: #6b7280; font-size: 12px; text-transform: uppercase; }
            .footer { margin-top: 32px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px; }
            .contact-info { background: #376eb5; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-top: 24px; }
            .contact-info a { color: white; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">OnlineLabs</div>
            </div>
            
            <div class="content">
              <h1>Hoi ${name.split(' ')[0]}! 👋</h1>
              
              <p>Bedankt voor je interesse in OnlineLabs. We hebben je bericht goed ontvangen.</p>
              
              <div class="highlight">
                <strong>Wat nu?</strong><br>
                We nemen binnen 24 uur contact met je op voor een persoonlijk gesprek. Geen verkooppraatjes, maar strategisch advies op maat.
              </div>
              
              <div class="summary">
                <div class="summary-item">
                  <div class="summary-label">Jouw interesse</div>
                  <div>${interests && interests.length > 0 ? interests.join(', ') : 'Niet gespecificeerd'}</div>
                </div>
                ${website ? `
                <div class="summary-item">
                  <div class="summary-label">Website</div>
                  <div>${website}</div>
                </div>
                ` : ''}
              </div>
              
              <p>In de tussentijd kun je alvast kijken naar:</p>
              <ul>
                <li><a href="https://www.onlinelabs.nl/ons-werk">Ons werk</a> - bekijk projecten voor onze klanten</li>
                <li><a href="https://www.onlinelabs.nl/blog">Blog</a> - tips over SEO, GEO en online groei</li>
              </ul>
              
              <div class="contact-info">
                <p style="margin: 0 0 8px;"><strong>Liever direct contact?</strong></p>
                <p style="margin: 0;">
                  📞 <a href="tel:+31208202022">020 - 820 20 22</a><br>
                  📧 <a href="mailto:hallo@onlinelabs.nl">hallo@onlinelabs.nl</a>
                </p>
              </div>
            </div>
            
            <div class="footer">
              <p>
                OnlineLabs<br>
                Herengracht 221, Amsterdam<br>
                <a href="https://www.onlinelabs.nl">www.onlinelabs.nl</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // ✅ Send Slack notification
    await sendSlackNotification({ name, email, phone, website, message, interests });

    return NextResponse.json(
      { success: true, message: 'Bericht succesvol verstuurd' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het versturen' },
      { status: 500 }
    );
  }
}