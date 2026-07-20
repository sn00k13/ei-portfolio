import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@eui/db";
import { requireSection } from "@/require-section";
import { formatDate } from "@eui/shared";
import { DeleteSubmissionButton } from "../row-actions";

export const dynamic = "force-dynamic";

export default async function SubmissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireSection("submissions");
  const { id } = await params;
  const sub = await prisma.contactSubmission.findUnique({ where: { id: BigInt(id) } });
  if (!sub) notFound();

  if (!sub.isRead) {
    await prisma.contactSubmission.update({ where: { id: sub.id }, data: { isRead: true } });
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
