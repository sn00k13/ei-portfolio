import { pool, toCamelCaseRows } from "@/db";
import { requireSection } from "@/require-section";

export const dynamic = "force-dynamic";

interface AnalyticsEventRow {
  id: string;
  eventType: string;
  pageSection: string | null;
  cvType: string | null;
  country: string | null;
  referrer: string | null;
  sessionId: string | null;
  createdAt: string | null;
}

function Bar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
        <span style={{ color: "var(--text)" }}>{label}</span>
        <span style={{ color: "var(--muted2)" }}>{value}</span>
      </div>
      <div style={{ background: "var(--bg3)", borderRadius: 4, height: 6, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, background: color, height: "100%" }} />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: number | string }) {
  return (
    <div style={{ border: "1px solid var(--border2)", borderRadius: 6, padding: 16, textAlign: "center" }}>
      <div style={{ fontSize: 22 }}>{icon}</div>
      <div style={{ fontFamily: "var(--serif)", fontSize: 26, marginTop: 6 }}>{value}</div>
      <div style={{ color: "var(--muted2)", fontSize: 11, marginTop: 4 }}>{label}</div>
    </div>
  );
}

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string }>;
}) {
  await requireSection("analytics");
  const { days: daysParam } = await searchParams;
  const days = daysParam ? Number(daysParam) : 7;

  const since = days > 0 ? new Date(Date.now() - days * 24 * 60 * 60 * 1000) : undefined;

  const [eventsResult, subCountResult, postCountResult] = await Promise.all([
    since
      ? pool.query(
          `select * from analytics_events where created_at >= $1 order by created_at desc limit 2000`,
          [since]
        )
      : pool.query(`select * from analytics_events order by created_at desc limit 2000`),
    since
      ? pool.query(`select count(*) from contact_submissions where created_at >= $1`, [since])
      : pool.query(`select count(*) from contact_submissions`),
    pool.query(`select count(*) from blog_posts`),
  ]);
  const events = toCamelCaseRows<AnalyticsEventRow>(eventsResult.rows);
  const subCount = Number(subCountResult.rows[0].count);
  const postCount = Number(postCountResult.rows[0].count);

  const pageViews = events.filter((e) => e.eventType === "page_view").length;
  const uniqueSessions = new Set(events.map((e) => e.sessionId).filter(Boolean)).size;
  const cvDownloads = events.filter((e) => e.eventType === "cv_download");
  const countries = new Map<string, number>();
  const sections = new Map<string, number>();
  const referrers = new Map<string, number>();
  const cvTypes = new Map<string, number>();

  for (const e of events) {
    if (e.country) countries.set(e.country, (countries.get(e.country) ?? 0) + 1);
    if (e.pageSection) sections.set(e.pageSection, (sections.get(e.pageSection) ?? 0) + 1);
    if (e.referrer) referrers.set(e.referrer, (referrers.get(e.referrer) ?? 0) + 1);
  }
  for (const e of cvDownloads) {
    if (e.cvType) cvTypes.set(e.cvType, (cvTypes.get(e.cvType) ?? 0) + 1);
  }

  const topSections = [...sections.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  const topCountries = [...countries.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  const topReferrers = [...referrers.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  const cvBars = [...cvTypes.entries()].sort((a, b) => b[1] - a[1]);

  const maxSection = Math.max(1, ...topSections.map((s) => s[1]));
  const maxCountry = Math.max(1, ...topCountries.map((s) => s[1]));
  const maxReferrer = Math.max(1, ...topReferrers.map((s) => s[1]));
  const maxCv = Math.max(1, ...cvBars.map((s) => s[1]));

  const filters = [
    { label: "Last 7 days", value: 7 },
    { label: "Last 30 days", value: 30 },
    { label: "Last 90 days", value: 90 },
    { label: "All time", value: 0 },
  ];

  return (
    <div>
      <h1 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 28, marginBottom: 4 }}>Analytics</h1>
      <p style={{ color: "var(--muted2)", fontSize: 13, marginBottom: 16 }}>Site performance and visitor data</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {filters.map((f) => (
          <a
            key={f.value}
            href={`/analytics?days=${f.value}`}
            style={{
              padding: "6px 12px",
              borderRadius: 4,
              fontSize: 12,
              textDecoration: "none",
              border: "1px solid var(--border2)",
              background: days === f.value ? "var(--gold)" : "transparent",
              color: days === f.value ? "#080a0d" : "var(--text)",
            }}
          >
            {f.label}
          </a>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 24 }}>
        <StatCard icon="👁️" label="Page Views" value={pageViews} />
        <StatCard icon="👤" label="Unique Visitors" value={uniqueSessions} />
        <StatCard icon="📥" label="CV Downloads" value={cvDownloads.length} />
        <StatCard icon="📬" label="Form Submissions" value={subCount} />
        <StatCard icon="✍️" label="Blog Posts" value={postCount} />
        <StatCard icon="🌐" label="Countries" value={countries.size} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        <div style={{ border: "1px solid var(--border2)", borderRadius: 6, padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Section Engagement</div>
          {topSections.length === 0 && <p style={{ color: "var(--muted)", fontSize: 12 }}>No data yet.</p>}
          {topSections.map(([label, value]) => (
            <Bar key={label} label={label} value={value} max={maxSection} color="var(--gold)" />
          ))}
        </div>

        <div style={{ border: "1px solid var(--border2)", borderRadius: 6, padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>CV Downloads by Type</div>
          {cvBars.length === 0 && <p style={{ color: "var(--muted)", fontSize: 12 }}>No data yet.</p>}
          {cvBars.map(([label, value]) => (
            <Bar key={label} label={label} value={value} max={maxCv} color="var(--teal)" />
          ))}
        </div>

        <div style={{ border: "1px solid var(--border2)", borderRadius: 6, padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Visitor Countries</div>
          {topCountries.length === 0 && <p style={{ color: "var(--muted)", fontSize: 12 }}>No data yet.</p>}
          {topCountries.map(([label, value]) => (
            <Bar key={label} label={label} value={value} max={maxCountry} color="#9b7ef8" />
          ))}
        </div>

        <div style={{ border: "1px solid var(--border2)", borderRadius: 6, padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Traffic Sources</div>
          {topReferrers.length === 0 && <p style={{ color: "var(--muted)", fontSize: 12 }}>No data yet.</p>}
          {topReferrers.map(([label, value]) => (
            <Bar key={label} label={label} value={value} max={maxReferrer} color="var(--red)" />
          ))}
        </div>
      </div>

      <div style={{ border: "1px solid var(--border2)", borderRadius: 6, padding: 16, marginTop: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Recent Activity</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 320, overflowY: "auto" }}>
          {events.slice(0, 40).map((e) => (
            <div key={Number(e.id)} style={{ fontSize: 12, color: "var(--muted2)", display: "flex", justifyContent: "space-between" }}>
              <span>
                {e.eventType}
                {e.pageSection ? ` — ${e.pageSection}` : ""}
              </span>
              <span>{e.createdAt ? new Date(e.createdAt).toLocaleString() : ""}</span>
            </div>
          ))}
          {events.length === 0 && <p style={{ color: "var(--muted)", fontSize: 12 }}>No activity yet.</p>}
        </div>
      </div>
    </div>
  );
}
