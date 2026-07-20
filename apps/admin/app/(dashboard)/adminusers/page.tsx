import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@eui/db";
import { requireSection } from "@/require-section";
import { DeleteUserButton } from "./row-actions";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const session = await requireSection("adminusers");
  if (session.user.role !== "super_admin") redirect("/overview");

  const rows = await prisma.adminUser.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 28 }}>Admin Users</h1>
        <Link
          href="/adminusers/new"
          style={{
            background: "var(--gold)",
            color: "#080a0d",
            padding: "8px 16px",
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          + New User
        </Link>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginTop: 20 }}>
        <thead>
          <tr style={{ textAlign: "left", color: "var(--muted2)", borderBottom: "1px solid var(--border)" }}>
            <th style={{ padding: "8px 4px" }}>Username</th>
            <th style={{ padding: "8px 4px" }}>Role</th>
            <th style={{ padding: "8px 4px" }}>Status</th>
            <th style={{ padding: "8px 4px" }}></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((u) => (
            <tr key={Number(u.id)} style={{ borderBottom: "1px solid var(--border)" }}>
              <td style={{ padding: "10px 4px" }}>
                <Link href={`/adminusers/${Number(u.id)}`} style={{ color: "var(--text)", textDecoration: "none" }}>
                  {u.username}
                </Link>
                {u.displayName && <span style={{ color: "var(--muted2)" }}> — {u.displayName}</span>}
              </td>
              <td style={{ padding: "10px 4px", color: "var(--muted2)" }}>{u.role}</td>
              <td style={{ padding: "10px 4px", color: "var(--muted2)" }}>{u.status}</td>
              <td style={{ padding: "10px 4px", textAlign: "right" }}>
                <DeleteUserButton id={Number(u.id)} disabled={Number(u.id) === Number(session.user.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
