import { notFound, redirect } from "next/navigation";
import { requireSection } from "@/require-section";
import { crudFindById } from "@/db";
import { AdminUserForm } from "../admin-user-form";
import type { AdminRole } from "@eui/shared";

export const dynamic = "force-dynamic";

export default async function EditAdminUserPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireSection("adminusers");
  if (session.user.role !== "super_admin") redirect("/overview");

  const { id } = await params;
  const row = await crudFindById("admin_users", Number(id));
  if (!row) notFound();

  return (
    <div>
      <h1 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 28, marginBottom: 20 }}>
        Edit Admin User
      </h1>
      <AdminUserForm
        value={{
          id: Number(row.id),
          username: row.username,
          displayName: row.displayName,
          email: row.email,
          role: (row.role ?? "editor") as AdminRole,
          status: row.status ?? "active",
          permissions: Array.isArray(row.permissions) ? (row.permissions as string[]) : [],
        }}
      />
    </div>
  );
}
