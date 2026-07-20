"use server";

import { prisma } from "@eui/db";
import { sendContactNotification } from "./resend";

export type FormState = { ok: boolean; message: string } | undefined;

export async function submitContactForm(_prev: FormState, formData: FormData): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim() || null;
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false, message: "Please fill in your name, email and message." };
  }

  await prisma.contactSubmission.create({
    data: { name, email, subject, message },
  });

  // Notification is best-effort — a Resend outage shouldn't stop the
  // submission from being saved; it's still visible in the admin dashboard.
  try {
    await sendContactNotification({ name, email, subject, message });
  } catch (err) {
    console.error("Failed to send contact notification email:", err);
  }

  return { ok: true, message: "Message sent — thanks for reaching out. I'll get back to you soon." };
}

export async function subscribeNewsletter(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!email || !email.includes("@")) {
    return { ok: false, message: "Enter a valid email address." };
  }

  await prisma.newsletterSubscriber.upsert({
    where: { email },
    update: {},
    create: { email },
  });

  return { ok: true, message: "Subscribed — welcome aboard." };
}
