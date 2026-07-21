"use server";

import { revalidatePath } from "next/cache";
import { requireSection } from "@/require-section";
import { pool } from "@/db";
import { resend, BROADCAST_FROM, wrapBroadcastHtml } from "@/resend";
import { logActivity } from "@/activity-log";

export async function addSubscriber(email: string) {
  await requireSection("newsletter");
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return;
  await pool.query(
    `insert into newsletter_subscribers (email) values ($1) on conflict (email) do nothing`,
    [trimmed]
  );
  revalidatePath("/newsletter");
}

export async function deleteSubscriber(id: number) {
  await requireSection("newsletter");
  await pool.query(`delete from newsletter_subscribers where id = $1`, [id]);
  revalidatePath("/newsletter");
}

export type BroadcastState = { error?: string; success?: string } | undefined;

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

export async function sendBroadcast(_prev: BroadcastState, formData: FormData): Promise<BroadcastState> {
  await requireSection("newsletter");

  const subject = String(formData.get("subject") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  if (!subject || !body) {
    return { error: "Subject and message are required." };
  }

  const { rows: subscribers } = await pool.query<{ email: string }>(`select email from newsletter_subscribers`);
  if (subscribers.length === 0) {
    return { error: "No subscribers yet." };
  }

  const html = wrapBroadcastHtml(body.replace(/\n/g, "<br/>"));
  let sent = 0;
  let failed = 0;

  for (const batch of chunk(subscribers, 100)) {
    try {
      const result = await resend.batch.send(
        batch.map((s) => ({ from: BROADCAST_FROM, to: s.email, subject, html }))
      );
      if (result.error) {
        failed += batch.length;
      } else {
        sent += batch.length;
      }
    } catch {
      failed += batch.length;
    }
  }

  await logActivity("Newsletter broadcast sent", `"${subject}" — ${sent} sent${failed ? `, ${failed} failed` : ""}`, "📧");
  revalidatePath("/newsletter");

  if (sent === 0) {
    return { error: "Broadcast failed to send. Check the Resend API key and verified domain." };
  }
  return { success: `Sent to ${sent} subscriber${sent === 1 ? "" : "s"}.${failed ? ` ${failed} failed.` : ""}` };
}
