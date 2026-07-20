import { prisma } from "@eui/db";
import { requireSection } from "@/require-section";

export const dynamic = "force-dynamic";

export default async function OverviewPage() {
  await requireSection("overview");

  const [unreadMessages, draftPosts, publishedPosts, subscribers] = await Promise.all([
    prisma.contactSubmission.count({ where: { isRead: false } }),
    prisma.blogPost.count({ where: { status: "draft" } }),
    prisma.blogPost.count({ where: { status: "published" } }),
    prisma.newsletterSubscriber.count(),
  ]);

  const stats = [
    { label: "Unread messages", value: unreadMessages },
    { label: "Draft posts", value: draftPosts },
    { label: "Published posts", value: publishedPosts },
    { label: "Subscribers", value: subscribers },
  ];

  return (
    <div>
      <h1 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 28 }}>Overview</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 1, background: "var(--border)", marginTop: 20 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: "var(--bg2)", padding: 20 }}>
            <div style={{ fontSize: 28, fontFamily: "var(--mono)", color: "var(--gold)" }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "var(--muted2)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
