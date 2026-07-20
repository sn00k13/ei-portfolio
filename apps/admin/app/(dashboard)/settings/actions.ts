"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@eui/db";
import { auth } from "@/auth";
import { logActivity } from "@/activity-log";
import { revalidatePath } from "next/cache";

export type SettingsState = { error?: string; success?: string } | undefined;

export async function changePassword(_prev: SettingsState, formData: FormData): Promise<SettingsState> {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated.");

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (newPassword.length < 8) return { error: "New password must be at least 8 characters." };
  if (newPassword !== confirmPassword) return { error: "Passwords do not match." };

  const user = await prisma.adminUser.findUnique({ where: { id: BigInt(session.user.id) } });
  if (!user) return { error: "User not found." };

  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) return { error: "Current password is incorrect." };

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await prisma.adminUser.update({ where: { id: user.id }, data: { passwordHash } });
  await logActivity("Password changed", user.username, "🔒");

  return { success: "Password updated." };
}

export async function saveGoals(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated.");

  const goals = {
    views: Number(formData.get("goalViews") ?? 0) || 0,
    cvDownloads: Number(formData.get("goalCVs") ?? 0) || 0,
    subscribers: Number(formData.get("goalSubs") ?? 0) || 0,
    submissions: Number(formData.get("goalSubmissions") ?? 0) || 0,
  };

  const user = await prisma.adminUser.findUnique({ where: { id: BigInt(session.user.id) } });
  const existingPrefs = (user?.preferences as Record<string, unknown> | null) ?? {};

  await prisma.adminUser.update({
    where: { id: BigInt(session.user.id) },
    data: { preferences: { ...existingPrefs, goals } },
  });

  revalidatePath("/settings");
}
