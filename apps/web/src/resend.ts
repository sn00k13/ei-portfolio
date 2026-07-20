import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const OWNER_EMAIL = "uzoukwuericiyke@yahoo.com";
const FROM = "Portfolio Admin <admin@uzoukwuericikenna.com>";

export async function sendContactNotification(sub: { name: string; email: string; subject: string | null; message: string }) {
  if (!process.env.RESEND_API_KEY) return;

  await resend.emails.send({
    from: FROM,
    to: [OWNER_EMAIL],
    replyTo: sub.email,
    subject: `New Contact Submission from ${sub.name}`,
    html:
      `<p><strong>Name:</strong> ${escapeHtml(sub.name)}</p>` +
      `<p><strong>Email:</strong> ${escapeHtml(sub.email)}</p>` +
      (sub.subject ? `<p><strong>Subject:</strong> ${escapeHtml(sub.subject)}</p>` : "") +
      `<p><strong>Message:</strong></p><p>${escapeHtml(sub.message).replace(/\n/g, "<br/>")}</p>`,
  });
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
