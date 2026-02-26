import { Resend } from "resend";
import { formatDate, formatTime, timeWindowLabels, serviceTypeLabels } from "./utils";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL || "contact@oyoun-optique.fr";
const fromName = process.env.FROM_NAME || "O'YOUN Optique";

interface ReservationData {
  id: string;
  fullName: string;
  email: string;
  serviceType: string;
  preferredDate: Date;
  preferredTimeWindow: string;
  confirmedDateTime?: Date | null;
  notes?: string | null;
  adminMessage?: string | null;
}

// Email styles matching brand
const emailStyles = {
  container:
    'background-color: #0B0F14; color: #F5F7FA; font-family: "Inter", sans-serif; padding: 40px 20px;',
  card:
    "background-color: #111821; border: 1px solid rgba(184, 192, 204, 0.1); border-radius: 16px; padding: 32px; max-width: 600px; margin: 0 auto;",
  heading:
    'color: #E3B261; font-family: "Cormorant Garamond", serif; font-size: 28px; font-weight: 400; margin-bottom: 24px;',
  text: "color: #B8C0CC; font-size: 16px; line-height: 1.6; margin-bottom: 16px;",
  highlight: "color: #E3B261; font-weight: 500;",
  button:
    "background-color: #E3B261; color: #0B0F14; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 500; display: inline-block; margin-top: 24px;",
  footer:
    "color: #6B7280; font-size: 14px; margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(184, 192, 204, 0.1);",
  detailRow: "margin-bottom: 12px;",
  detailLabel: "color: #6B7280; font-size: 14px;",
  detailValue: "color: #F5F7FA; font-size: 16px;",
};

export async function sendReservationAcknowledgment(data: ReservationData) {
  const subject = "Votre demande de rendez-vous - O'YOUN Optique";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=Inter:wght@400;500&display=swap" rel="stylesheet">
</head>
<body style="${emailStyles.container}">
  <div style="${emailStyles.card}">
    <h1 style="${emailStyles.heading}">O'YOUN Optique</h1>
    
    <p style="${emailStyles.text}">Bonjour <span style="${emailStyles.highlight}">${data.fullName}</span>,</p>
    
    <p style="${emailStyles.text}">
      Nous avons bien reçu votre demande de rendez-vous. Notre équipe l'examine et vous contactera dans les plus brefs délais pour confirmer votre créneau.
    </p>
    
    <div style="background-color: rgba(227, 178, 97, 0.1); border-radius: 12px; padding: 20px; margin: 24px 0;">
      <div style="${emailStyles.detailRow}">
        <div style="${emailStyles.detailLabel}">Service</div>
        <div style="${emailStyles.detailValue}">${serviceTypeLabels[data.serviceType]}</div>
      </div>
      <div style="${emailStyles.detailRow}">
        <div style="${emailStyles.detailLabel}">Date souhaitée</div>
        <div style="${emailStyles.detailValue}">${formatDate(data.preferredDate)}</div>
      </div>
      <div style="${emailStyles.detailRow}">
        <div style="${emailStyles.detailLabel}">Créneau préféré</div>
        <div style="${emailStyles.detailValue}">${timeWindowLabels[data.preferredTimeWindow]}</div>
      </div>
    </div>
    
    <p style="${emailStyles.text}">
      Si vous avez des questions, n'hésitez pas à nous contacter par téléphone au <span style="${emailStyles.highlight}">+33 1 42 60 00 00</span>.
    </p>
    
    <div style="${emailStyles.footer}">
      <p style="margin: 0;">O'YOUN Optique</p>
      <p style="margin: 4px 0 0 0;">15 Rue de la Paix, 75002 Paris</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: data.email,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send acknowledgment email:", error);
    return { success: false, error };
  }
}

export async function sendReservationConfirmation(data: ReservationData) {
  const subject = "Votre rendez-vous est confirmé - O'YOUN Optique";

  const confirmedDate = data.confirmedDateTime
    ? new Date(data.confirmedDateTime)
    : null;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=Inter:wght@400;500&display=swap" rel="stylesheet">
</head>
<body style="${emailStyles.container}">
  <div style="${emailStyles.card}">
    <h1 style="${emailStyles.heading}">Rendez-vous Confirmé</h1>
    
    <p style="${emailStyles.text}">Bonjour <span style="${emailStyles.highlight}">${data.fullName}</span>,</p>
    
    <p style="${emailStyles.text}">
      Nous avons le plaisir de confirmer votre rendez-vous. Nous vous attendons à l'heure convenue.
    </p>
    
    <div style="background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 20px; margin: 24px 0;">
      <div style="${emailStyles.detailRow}">
        <div style="${emailStyles.detailLabel}">Service</div>
        <div style="${emailStyles.detailValue}">${serviceTypeLabels[data.serviceType]}</div>
      </div>
      <div style="${emailStyles.detailRow}">
        <div style="${emailStyles.detailLabel}">Date confirmée</div>
        <div style="${emailStyles.detailValue}">${confirmedDate ? formatDate(confirmedDate) : "-"}</div>
      </div>
      <div style="${emailStyles.detailRow}">
        <div style="${emailStyles.detailLabel}">Heure</div>
        <div style="${emailStyles.detailValue}">${confirmedDate ? formatTime(confirmedDate) : "-"}</div>
      </div>
    </div>
    
    ${data.adminMessage ? `<p style="${emailStyles.text}"><strong>Message de l'équipe :</strong><br>${data.adminMessage}</p>` : ""}
    
    <p style="${emailStyles.text}">
      <strong>Adresse :</strong><br>
      O'YOUN Optique<br>
      15 Rue de la Paix<br>
      75002 Paris
    </p>
    
    <p style="${emailStyles.text}">
      En cas d'empêchement, merci de nous prévenir au moins 24h à l'avance au <span style="${emailStyles.highlight}">+33 1 42 60 00 00</span>.
    </p>
    
    <div style="${emailStyles.footer}">
      <p style="margin: 0;">À très bientôt,</p>
      <p style="margin: 4px 0 0 0; color: #E3B261;">L'équipe O'YOUN Optique</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: data.email,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
    return { success: false, error };
  }
}

export async function sendReservationDecline(data: ReservationData) {
  const subject = "Concernant votre demande de rendez-vous - O'YOUN Optique";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=Inter:wght@400;500&display=swap" rel="stylesheet">
</head>
<body style="${emailStyles.container}">
  <div style="${emailStyles.card}">
    <h1 style="${emailStyles.heading}">O'YOUN Optique</h1>
    
    <p style="${emailStyles.text}">Bonjour <span style="${emailStyles.highlight}">${data.fullName}</span>,</p>
    
    <p style="${emailStyles.text}">
      Nous vous remercions pour votre demande de rendez-vous. Malheureusement, nous ne sommes pas en mesure de vous accueillir à la date et au créneau souhaités.
    </p>
    
    ${data.adminMessage ? `<p style="${emailStyles.text}"><strong>Message de l'équipe :</strong><br>${data.adminMessage}</p>` : ""}
    
    <p style="${emailStyles.text}">
      Nous vous invitons à :
    </p>
    
    <ul style="${emailStyles.text}">
      <li>Reprendre rendez-vous en ligne à une autre date</li>
      <li>Nous appeler au <span style="${emailStyles.highlight}">+33 1 42 60 00 00</span> pour trouver un créneau ensemble</li>
    </ul>
    
    <a href="${process.env.NEXTAUTH_URL}/reservation" style="${emailStyles.button}">
      Nouveau rendez-vous
    </a>
    
    <div style="${emailStyles.footer}">
      <p style="margin: 0;">Cordialement,</p>
      <p style="margin: 4px 0 0 0; color: #E3B261;">L'équipe O'YOUN Optique</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: data.email,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send decline email:", error);
    return { success: false, error };
  }
}
