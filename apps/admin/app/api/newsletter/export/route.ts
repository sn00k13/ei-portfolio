import { pool } from "@/db";
import { auth } from "@/auth";
import { hasPermission } from "@eui/shared";

export async function GET() {
  const session = await auth();
  if (!hasPermission(session?.user, "newsletter")) {
    return new Response("Forbidden", { status: 403 });
  }

  const { rows } = await pool.query<{ email: string; subscribed_at: Date | null }>(
    `select email, subscribed_at from newsletter_subscribers order by subscribed_at desc`
  );
  const csv = ["email,subscribed_at", ...rows.map((r) => `${r.email},${r.subscribed_at?.toISOString() ?? ""}`)].join(
    "\n"
  );

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="newsletter_subscribers.csv"',
    },
  });
}
