import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, company, phone, companySize, message } = JSON.parse(event.body);

    const data = await resend.emails.send({
      from: 'Skillcruit <onboarding@resend.dev>', // Modifie ceci une fois ton domaine configuré sur Resend
      to: ['contact@skillcruit.app'],
      subject: `Nouveau message de ${name} - Skillcruit`,
      html: `
        <h2>Nouveau contact depuis le site Skillcruit</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Entreprise :</strong> ${company}</p>
        <p><strong>Téléphone :</strong> ${phone || 'Non renseigné'}</p>
        <p><strong>Taille entreprise :</strong> ${companySize || 'Non renseignée'}</p>
        <br/>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email envoyé avec succès', data }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
