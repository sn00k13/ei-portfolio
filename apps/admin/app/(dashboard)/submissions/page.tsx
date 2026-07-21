import Link from "next/link";
import { requireSection } from "@/require-section";
import { pool, toCamelCaseRows } from "@/db";
import { formatDate } from "@eui/shared";
import { ReadToggle, DeleteSubmissionButton } from "./row-actions";

export const dynamic = "force-dynamic";

interface ContactSubmissionRow {
  id: string;
  name: string | null;
  email: string | null;
  subject: string | null;
  message: string | null;
  isRead: boolean | null;
  createdAt: string;
}

export default async function SubmissionsPage() {
  await requireSection("submissions");
  const { rows: raw } = await pool.query(`select * from contact_submissions order by created_at desc`);
  const rows = toCamelCaseRows<ContactSubmissionRow>(raw);

  return (
    <div>
      <h1 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 28 }}>Submissions</h1>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginTop: 20 }}>
        <thead>
          <tr style={{ textAlign: "left", color: "var(--muted2)", borderBottom: "1px solid var(--border)" }}>
            <th style={{ padding: "8px 4px" }}>From</th>
            <th style={{ padding: "8px 4px" }}>Subject</th>
            <th style={{ padding: "8px 4px" }}>Received</th>
            <th style={{ padding: "8px 4px" }}></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s) => {
            const id = Number(s.id);
            return (
              <tr key={id} style={{ borderBottom: "1px solid var(--border)", fontWeight: s.isRead ? 400 : 700 }}>
                <td style={{ padding: "10px 4px" }}>
                  <Link href={`/submissions/${id}`} style={{ color: "var(--text)", textDecoration: "none" }}>
                    {s.name || s.email || "Unknown"}
                  </Link>
                </td>
                <td style={{ padding: "10px 4px", color: "var(--muted2)" }}>{s.subject || "(no subject)"}</td>
                <td style={{ padding: "10px 4px", color: "var(--muted2)" }}>{formatDate(s.createdAt)}</td>
                <td style={{ padding: "10px 4px", textAlign: "right", whiteSpace: "nowrap" }}>
                  <ReadToggle id={id} isRead={s.isRead ?? false} />
                  <DeleteSubmissionButton id={id} />
                </td>
              </tr>
            );
          })}
          {rows.length === 0 && (
            <tr>
              <td colSpan={4} style={{ padding: 24, textAlign: "center", color: "var(--muted)" }}>
                No submissions yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
