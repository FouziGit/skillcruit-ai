import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema
const ContactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().min(2).max(100),
  phone: z.string().max(20).optional(),
  companySize: z.string().max(50).optional(),
  message: z.string().min(10).max(2000),
});

// Simple rate limiting (in-memory, resets on redeploy)
const requestCounts = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 3600000; // 1 hour
const RATE_LIMIT_MAX = 5; // 5 emails per hour per IP

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function getRateLimitKey(event: any): string {
  return event.headers['client-ip'] ||
         event.headers['x-forwarded-for']?.split(',')[0] ||
         event.requestContext?.identity?.sourceIp ||
         'unknown';
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const existing = requestCounts.get(key);

  if (!existing || now - existing.timestamp > RATE_LIMIT_WINDOW) {
    requestCounts.set(key, { count: 1, timestamp: now });
    return true;
  }

  if (existing.count >= RATE_LIMIT_MAX) {
    return false;
  }

  existing.count++;
  return true;
}

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  const ipKey = getRateLimitKey(event);

  if (!checkRateLimit(ipKey)) {
    return {
      statusCode: 429,
      body: JSON.stringify({ error: 'Trop de requêtes. Veuillez réessayer plus tard.' }),
    };
  }

  try {
    const parsedData = JSON.parse(event.body);
    const validatedData = ContactFormSchema.parse(parsedData);

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Configuration error' }),
      };
    }

    // Escape all HTML to prevent XSS
    const escapedName = escapeHtml(validatedData.name);
    const escapedEmail = escapeHtml(validatedData.email);
    const escapedCompany = escapeHtml(validatedData.company);
    const escapedPhone = validatedData.phone ? escapeHtml(validatedData.phone) : 'Non renseigné';
    const escapedCompanySize = validatedData.companySize ? escapeHtml(validatedData.companySize) : 'Non renseignée';
    const escapedMessage = escapeHtml(validatedData.message).replace(/\n/g, '<br/>');

    const data = await resend.emails.send({
      from: 'Skillcruit <noreply@skillcruit.app>',
      to: ['contact@skillcruit.app'],
      replyTo: escapedEmail,
      subject: `Nouveau message de ${escapedName} - Skillcruit`,
      html: `
        <h2>Nouveau contact depuis le site Skillcruit</h2>
        <p><strong>Nom :</strong> ${escapedName}</p>
        <p><strong>Email :</strong> ${escapedEmail}</p>
        <p><strong>Entreprise :</strong> ${escapedCompany}</p>
        <p><strong>Téléphone :</strong> ${escapedPhone}</p>
        <p><strong>Taille entreprise :</strong> ${escapedCompanySize}</p>
        <br/>
        <p><strong>Message :</strong></p>
        <p>${escapedMessage}</p>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email envoyé avec succès' }),
    };
  } catch (error: any) {
    console.error('Email send error:', error);

    // Zod validation error
    if (error instanceof z.ZodError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Données invalides' }),
      };
    }

    // Resend API error
    if (error.message?.includes('Resend')) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Erreur lors de l\'envoi. Veuillez réessayer ou contacter contact@skillcruit.app' }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erreur serveur' }),
    };
  }
};
