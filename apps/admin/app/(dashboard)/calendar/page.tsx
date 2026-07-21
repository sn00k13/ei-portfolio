import { pool, toCamelCaseRows } from "@/db";
import { requireSection } from "@/require-section";

interface BlogPostRow {
  id: string;
  title: string;
  publishedAt: Date | null;
  createdAt: Date | null;
}

interface EventRow {
  id: string;
  name: string;
  dateStart: Date;
}

export const dynamic = "force-dynamic";

interface CalItem {
  date: Date;
  label: string;
  color: string;
  href: string;
}

function monthLabel(year: number, month: number) {
  return new Date(year, month, 1).toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ y?: string; m?: string }>;
}) {
  await requireSection("calendar");
  const { y, m } = await searchParams;
  const now = new Date();
  const year = y ? Number(y) : now.getFullYear();
  const month = m ? Number(m) : now.getMonth(); // 0-indexed

  const rangeStart = new Date(year, month, 1);
  const rangeEnd = new Date(year, month + 1, 1);

  const [postRows, eventRows] = await Promise.all([
    pool.query(
      `select id, title, published_at, created_at from blog_posts
       where (published_at >= $1 and published_at < $2) or (created_at >= $1 and created_at < $2)`,
      [rangeStart, rangeEnd]
    ),
    pool.query(`select id, name, date_start from events where date_start >= $1 and date_start < $2`, [
      rangeStart,
      rangeEnd,
    ]),
  ]);
  const posts = toCamelCaseRows<BlogPostRow>(postRows.rows);
  const events = toCamelCaseRows<EventRow>(eventRows.rows);

  const items: CalItem[] = [
    ...posts.map((p) => ({
      date: p.publishedAt ?? p.createdAt ?? rangeStart,
      label: p.title,
      color: "var(--gold)",
      href: `/blog/${Number(p.id)}`,
    })),
    ...events.map((e) => ({
      date: e.dateStart,
      label: e.name,
      color: "var(--teal)",
      href: `/events/${Number(e.id)}`,
    })),
  ];

  const byDay = new Map<number, CalItem[]>();
  for (const item of items) {
    const d = item.date.getDate();
    byDay.set(d, [...(byDay.get(d) ?? []), item]);
  }

  const firstWeekday = rangeStart.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  const prevMonth = month === 0 ? { y: year - 1, m: 11 } : { y: year, m: month - 1 };
  const nextMonth = month === 11 ? { y: year + 1, m: 0 } : { y: year, m: month + 1 };

  return (
    <div>
      <h1 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 28, marginBottom: 4 }}>Content Calendar</h1>
      <p style={{ color: "var(--muted2)", fontSize: 13, marginBottom: 20 }}>
        Blog posts and events scheduled this month.
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <a href={`/calendar?y=${prevMonth.y}&m=${prevMonth.m}`} style={{ color: "var(--text)", textDecoration: "none" }}>
          ‹
        </a>
        <div style={{ fontFamily: "var(--serif)", fontSize: 16 }}>{monthLabel(year, month)}</div>
        <a href={`/calendar?y=${nextMonth.y}&m=${nextMonth.m}`} style={{ color: "var(--text)", textDecoration: "none" }}>
          ›
        </a>
        <a href="/calendar" style={{ marginLeft: "auto", fontSize: 12, color: "var(--muted2)" }}>
          Today
        </a>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 16 }}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", padding: 4 }}>
            {d}
          </div>
        ))}
        {cells.map((day, i) => (
          <div
            key={i}
            style={{
              minHeight: 70,
              border: "1px solid var(--border2)",
              borderRadius: 4,
              padding: 4,
              fontSize: 11,
              background: day === now.getDate() && month === now.getMonth() && year === now.getFullYear() ? "rgba(201,168,76,0.06)" : "transparent",
            }}
          >
            {day && <div style={{ color: "var(--muted2)", marginBottom: 4 }}>{day}</div>}
            {day &&
              (byDay.get(day) ?? []).map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  title={item.label}
                  style={{
                    display: "block",
                    color: item.color,
                    fontSize: 10,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    textDecoration: "none",
                  }}
                >
                  ■ {item.label}
                </a>
              ))}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
        <span style={{ color: "var(--gold)" }}>■ Blog Post</span>
        <span style={{ color: "var(--teal)" }}>■ Event</span>
      </div>
    </div>
  );
}
