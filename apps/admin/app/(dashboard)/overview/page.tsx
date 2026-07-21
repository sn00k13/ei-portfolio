import { pool } from "@/db";
import { requireSection } from "@/require-section";

export const dynamic = "force-dynamic";

export default async function OverviewPage() {
  await requireSection("overview");

  const [unreadMessages, draftPosts, publishedPosts, subscribers] = await Promise.all([
    pool.query(`select count(*) from contact_submissions where is_read = false`),
    pool.query(`select count(*) from blog_posts where status = 'draft'`),
    pool.query(`select count(*) from blog_posts where status = 'published'`),
    pool.query(`select count(*) from newsletter_subscribers`),
  ]);

  const stats = [
    { label: "Unread messages", value: Number(unreadMessages.rows[0].count) },
    { label: "Draft posts", value: Number(draftPosts.rows[0].count) },
    { label: "Published posts", value: Number(publishedPosts.rows[0].count) },
    { label: "Subscribers", value: Number(subscribers.rows[0].count) },
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
