import { auth, signOut } from "@/auth";
import { ADMIN_SECTIONS, hasPermission } from "@eui/shared";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const visibleSections = ADMIN_SECTIONS.filter((s) => hasPermission(session.user, s.id));
  const groups = Array.from(new Set(visibleSections.map((s) => s.group)));

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 220,
          flexShrink: 0,
          borderRight: "1px solid var(--border)",
          background: "var(--bg2)",
          padding: "20px 12px",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.1em",
            color: "var(--gold)",
            marginBottom: 20,
            padding: "0 8px",
          }}
        >
          UEI ADMIN
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {groups.map((group) => (
            <div key={group}>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  padding: "0 8px 6px",
                }}
              >
                {group}
              </div>
              {visibleSections
                .filter((s) => s.group === group)
                .map((s) => (
                  <Link
                    key={s.id}
                    href={`/${s.id}`}
                    style={{
                      display: "block",
                      padding: "8px",
                      borderRadius: 4,
                      fontSize: 13,
                      textDecoration: "none",
                      color: "var(--text)",
                    }}
                  >
                    {s.label}
                  </Link>
                ))}
            </div>
          ))}
        </nav>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
          style={{ marginTop: 24 }}
        >
          <button
            type="submit"
            style={{
              background: "none",
              border: "1px solid var(--border2)",
              color: "var(--muted2)",
              borderRadius: 4,
              padding: "6px 10px",
              fontSize: 12,
              cursor: "pointer",
              width: "100%",
            }}
          >
            Sign out ({session.user.displayName ?? session.user.username})
          </button>
        </form>
      </aside>

      <main style={{ flex: 1, padding: 32 }}>{children}</main>
    </div>
  );
}
