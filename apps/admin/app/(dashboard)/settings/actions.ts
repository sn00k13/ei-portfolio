"use server";

import bcrypt from "bcryptjs";
import { pool, toCamelCase } from "@/db";
import { auth } from "@/auth";
import { logActivity } from "@/activity-log";
import { revalidatePath } from "next/cache";

export type SettingsState = { error?: string; success?: string } | undefined;

interface AdminUserRow {
  id: string;
  username: string;
  passwordHash: string;
  preferences: Record<string, unknown> | null;
}

export async function changePassword(_prev: SettingsState, formData: FormData): Promise<SettingsState> {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated.");

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (newPassword.length < 8) return { error: "New password must be at least 8 characters." };
  if (newPassword !== confirmPassword) return { error: "Passwords do not match." };

  const { rows } = await pool.query(`select * from admin_users where id = $1`, [session.user.id]);
  const user = rows[0] ? toCamelCase<AdminUserRow>(rows[0]) : null;
  if (!user) return { error: "User not found." };

  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) return { error: "Current password is incorrect." };

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await pool.query(`update admin_users set password_hash = $1 where id = $2`, [passwordHash, user.id]);
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

  const { rows } = await pool.query(`select preferences from admin_users where id = $1`, [session.user.id]);
  const existingPrefs = (rows[0]?.preferences as Record<string, unknown> | null) ?? {};

  await pool.query(`update admin_users set preferences = $1 where id = $2`, [
    JSON.stringify({ ...existingPrefs, goals }),
    session.user.id,
  ]);

  revalidatePath("/settings");
}
