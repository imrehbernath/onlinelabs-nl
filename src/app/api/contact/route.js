import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, email, phone, website, message, interests } = await request.json();

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