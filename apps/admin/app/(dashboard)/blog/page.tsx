import Link from "next/link";
import { pool, toCamelCaseRows } from "@/db";
import { requireSection } from "@/require-section";
import { formatDate } from "@eui/shared";
import { DeleteButton, StatusToggleButton } from "./row-actions";

export const dynamic = "force-dynamic";

interface BlogPostRow {
  id: string;
  title: string;
  category: string;
  status: string | null;
  publishedAt: string | null;
  isFeatured: boolean | null;
}

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  await requireSection("blog");
  const { q, status } = await searchParams;

  const conditions: string[] = [];
  const values: unknown[] = [];
  if (status) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }
  if (q) {
    values.push(`%${q}%`);
    conditions.push(`(title ilike $${values.length} or category ilike $${values.length})`);
  }
  const whereClause = conditions.length ? `where ${conditions.join(" and ")}` : "";

  const { rows: raw } = await pool.query(
    `select id, title, category, status, published_at, is_featured from blog_posts ${whereClause} order by created_at desc`,
    values
  );
  const posts = toCamelCaseRows<BlogPostRow>(raw);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 28 }}>Blog</h1>
        <Link
          href="/blog/new"
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
          + New Post
        </Link>
      </div>

      <form style={{ display: "flex", gap: 8, margin: "16px 0" }}>
        <input
          name="q"
          defaultValue={q}
          placeholder="Search title or category…"
          style={{
            flex: 1,
            padding: "8px 10px",
            background: "var(--bg3)",
            border: "1px solid var(--border2)",
            borderRadius: 4,
            color: "var(--text)",
            fontSize: 13,
          }}
        />
        <select
          name="status"
          defaultValue={status ?? ""}
          style={{
            padding: "8px 10px",
            background: "var(--bg3)",
            border: "1px solid var(--border2)",
            borderRadius: 4,
            color: "var(--text)",
            fontSize: 13,
          }}
        >
          <option value="">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
        </select>
        <button
          type="submit"
          style={{
            padding: "8px 14px",
            background: "var(--bg3)",
            border: "1px solid var(--border2)",
            borderRadius: 4,
            color: "var(--text)",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Filter
        </button>
      </form>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ textAlign: "left", color: "var(--muted2)", borderBottom: "1px solid var(--border)" }}>
            <th style={{ padding: "8px 4px" }}>Title</th>
            <th style={{ padding: "8px 4px" }}>Category</th>
            <th style={{ padding: "8px 4px" }}>Status</th>
            <th style={{ padding: "8px 4px" }}>Published</th>
            <th style={{ padding: "8px 4px" }}></th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            const id = Number(post.id);
            return (
              <tr key={id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "10px 4px" }}>
                  <Link href={`/blog/${id}`} style={{ color: "var(--text)", textDecoration: "none" }}>
                    {post.title}
                  </Link>
                  {post.isFeatured && (
                    <span style={{ marginLeft: 6, fontSize: 10, color: "var(--gold)" }}>★ featured</span>
                  )}
                </td>
                <td style={{ padding: "10px 4px", color: "var(--muted2)" }}>{post.category}</td>
                <td style={{ padding: "10px 4px" }}>
                  <span
                    style={{
                      fontSize: 11,
                      padding: "2px 8px",
                      borderRadius: 999,
                      background:
                        post.status === "published" ? "rgba(62,207,170,0.15)" : "rgba(255,255,255,0.08)",
                      color: post.status === "published" ? "var(--teal)" : "var(--muted2)",
                    }}
                  >
                    {post.status}
                  </span>
                </td>
                <td style={{ padding: "10px 4px", color: "var(--muted2)" }}>{formatDate(post.publishedAt)}</td>
                <td style={{ padding: "10px 4px", textAlign: "right", whiteSpace: "nowrap" }}>
                  <StatusToggleButton id={id} currentStatus={post.status ?? "draft"} />
                  <DeleteButton id={id} />
                </td>
              </tr>
            );
          })}
          {posts.length === 0 && (
            <tr>
              <td colSpan={5} style={{ padding: 24, textAlign: "center", color: "var(--muted)" }}>
                No posts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
