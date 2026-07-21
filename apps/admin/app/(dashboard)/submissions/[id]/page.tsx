import { notFound } from "next/navigation";
import Link from "next/link";
import { requireSection } from "@/require-section";
import { pool, toCamelCase } from "@/db";
import { formatDate } from "@eui/shared";
import { DeleteSubmissionButton } from "../row-actions";

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

export default async function SubmissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireSection("submissions");
  const { id } = await params;
  const { rows } = await pool.query(`select * from contact_submissions where id = $1`, [id]);
  const sub = rows[0] ? toCamelCase<ContactSubmissionRow>(rows[0]) : null;
  if (!sub) notFound();

  if (!sub.isRead) {
    await pool.query(`update contact_submissions set is_read = true where id = $1`, [sub.id]);
  }

  const mailto = sub.email
    ? `mailto:${sub.email}?subject=${encodeURIComponent("Re: " + (sub.subject || "your message"))}`
    : undefined;

  return (
    <div style={{ maxWidth: 640 }}>
      <Link href="/submissions" style={{ color: "var(--muted2)", fontSize: 13 }}>
        ← Back to Submissions
      </Link>
      <h1 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 26, marginTop: 12 }}>
        {sub.subject || "(no subject)"}
      </h1>
      <p style={{ color: "var(--muted2)", fontSize: 13 }}>
        {sub.name} &lt;{sub.email}&gt; — {formatDate(sub.createdAt)}
      </p>
      <div
        style={{
          background: "var(--bg2)",
          border: "1px solid var(--border)",
          borderRadius: 4,
          padding: 20,
          marginTop: 16,
          whiteSpace: "pre-wrap",
          fontSize: 14,
        }}
      >
        {sub.message}
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        {mailto && (
          <a
            href={mailto}
            style={{
              padding: "8px 16px",
              background: "var(--gold)",
              color: "#080a0d",
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Reply by email
          </a>
        )}
        <DeleteSubmissionButton id={Number(sub.id)} />
      </div>
    </div>
  );
}
