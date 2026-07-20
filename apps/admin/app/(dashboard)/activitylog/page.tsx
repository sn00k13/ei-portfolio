import { prisma } from "@eui/db";
import { requireSection } from "@/require-section";

export const dynamic = "force-dynamic";

export default async function ActivityLogPage() {
  await requireSection("activitylog");
  const rows = await prisma.adminActivityLog.findMany({ orderBy: { loggedAt: "desc" }, take: 300 });

  return (
    <div>
      <h1 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 28, marginBottom: 4 }}>Activity Log</h1>
      <p style={{ color: "var(--muted2)", fontSize: 13, marginBottom: 20 }}>
        Record of admin actions across the dashboard.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {rows.map((r) => (
          <div
            key={Number(r.id)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 4px",
              borderBottom: "1px solid var(--border)",
              fontSize: 13,
            }}
          >
            <span>
              {r.icon ? `${r.icon} ` : ""}
              <strong style={{ fontWeight: 600 }}>{r.action}</strong>
              {r.detail ? <span style={{ color: "var(--muted2)" }}> — {r.detail}</span> : null}
            </span>
            <span style={{ color: "var(--muted)", fontSize: 12 }}>
              {r.loggedAt ? new Date(r.loggedAt).toLocaleString() : ""}
            </span>
          </div>
        ))}
        {rows.length === 0 && <p style={{ color: "var(--muted)", fontSize: 13 }}>No activity recorded yet.</p>}
      </div>
    </div>
  );
}
