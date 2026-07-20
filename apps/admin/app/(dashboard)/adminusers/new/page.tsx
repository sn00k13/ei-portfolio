import { redirect } from "next/navigation";
import { requireSection } from "@/require-section";
import { AdminUserForm } from "../admin-user-form";

export const dynamic = "force-dynamic";

export default async function NewAdminUserPage() {
  const session = await requireSection("adminusers");
  if (session.user.role !== "super_admin") redirect("/overview");

  return (
    <div>
      <h1 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 28, marginBottom: 20 }}>
        New Admin User
      </h1>
      <AdminUserForm value={null} />
    </div>
  );
}
