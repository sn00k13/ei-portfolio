import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const BROADCAST_FROM = "Eric Uzoukwu <hello@uzoukwuericikenna.com>";

export function wrapBroadcastHtml(bodyHtml: string): string {
  return (
    `<div style="font-family:sans-serif;max-width:600px;margin:0 auto">${bodyHtml}` +
    `<hr style="margin:2rem 0;border:none;border-top:1px solid #eee"/>` +
    `<p style="font-size:12px;color:#888">Uzoukwu Eric Ikenna &middot; uzoukwuericikenna.com<br/>To unsubscribe, reply with "unsubscribe".</p></div>`
  );
}
