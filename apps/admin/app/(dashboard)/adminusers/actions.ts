"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSection } from "@/require-section";
import { auth } from "@/auth";
import { crudInsert, crudUpdate, crudDelete, isUniqueViolation, pool } from "@/db";
import { ROLE_PRESETS, type AdminRole } from "@eui/shared";

export type AdminUserFormState = { error?: string } | undefined;

async function requireSuperAdmin() {
  const session = await requireSection("adminusers");
  if (session.user.role !== "super_admin") {
    throw new Error("Only super_admin can manage admin users.");
  }
  return session;
}

export async function saveAdminUser(
  _prevState: AdminUserFormState,
  formData: FormData
): Promise<AdminUserFormState> {
  await requireSuperAdmin();

  const idRaw = formData.get("id");
  const id = idRaw ? Number(idRaw) : undefined;
  const username = (formData.get("username") as string)?.trim();
  const displayName = (formData.get("displayName") as string) || null;
  const email = (formData.get("email") as string) || null;
  const role = (formData.get("role") as AdminRole) || "editor";
  const status = (formData.get("status") as string) || "active";
  const password = (formData.get("password") as string) || "";

  const permissions =
    role === "custom"
      ? formData.getAll("permissions").map(String)
      : ROLE_PRESETS[role];

  if (!username) return { error: "Username is required." };

  const data: Record<string, unknown> = { username, displayName, email, role, status, permissions };

  try {
    if (id) {
      if (password) data.passwordHash = await bcrypt.hash(password, 12);
      await crudUpdate("admin_users", id, data);
    } else {
      if (!password) return { error: "Password is required for a new user." };
      data.passwordHash = await bcrypt.hash(password, 12);
      await crudInsert("admin_users", data);
    }
  } catch (err: unknown) {
    if (isUniqueViolation(err)) return { error: "That username is already taken." };
    throw err;
  }

  revalidatePath("/adminusers");
  redirect("/adminusers");
}

export async function deleteAdminUser(id: number) {
  const session = await requireSuperAdmin();
  if (Number(session.user.id) === id) {
    throw new Error("You cannot delete your own account.");
  }
  await crudDelete("admin_users", id);
  revalidatePath("/adminusers");
}

export async function resetOwnPassword(newPassword: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated.");
  const passwordHash = await bcrypt.hash(newPassword, 12);
  await pool.query(`update admin_users set password_hash = $1 where id = $2`, [
    passwordHash,
    session.user.id,
  ]);
}
