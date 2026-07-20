import { prisma } from "@eui/db";
import { auth } from "@/auth";
import { hasPermission } from "@eui/shared";

export async function GET() {
  const session = await auth();
  if (!hasPermission(session?.user, "newsletter")) {
    return new Response("Forbidden", { status: 403 });
  }

  const rows = await prisma.newsletterSubscriber.findMany({ orderBy: { subscribedAt: "desc" } });
  const csv = ["email,subscribed_at", ...rows.map((r) => `${r.email},${r.subscribedAt?.toISOString() ?? ""}`)].join(
    "\n"
  );

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="newsletter_subscribers.csv"',
    },
  });
}
