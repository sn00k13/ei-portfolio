import { prisma } from "@eui/db";
import { requireSection } from "@/require-section";
import { formatDate } from "@eui/shared";
import { AddSubscriberForm, DeleteSubscriberButton } from "./subscriber-controls";
import { BroadcastForm } from "./broadcast-form";

export const dynamic = "force-dynamic";

export default async function NewsletterPage() {
  await requireSection("newsletter");
  const rows = await prisma.newsletterSubscriber.findMany({ orderBy: { subscribedAt: "desc" } });

  return (
    <div>
      <h1 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 28 }}>Newsletter</h1>
      <p style={{ color: "var(--muted2)", fontSize: 13, marginTop: 4 }}>
        {rows.length} subscriber{rows.length === 1 ? "" : "s"}.
      </p>

      <div style={{ marginTop: 20 }}>
        <AddSubscriberForm />
      </div>

      <div style={{ marginTop: 24 }}>
        <BroadcastForm subscriberCount={rows.length} />
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ textAlign: "left", color: "var(--muted2)", borderBottom: "1px solid var(--border)" }}>
            <th style={{ padding: "8px 4px" }}>Email</th>
            <th style={{ padding: "8px 4px" }}>Subscribed</th>
            <th style={{ padding: "8px 4px" }}></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s) => (
            <tr key={Number(s.id)} style={{ borderBottom: "1px solid var(--border)" }}>
              <td style={{ padding: "10px 4px" }}>{s.email}</td>
              <td style={{ padding: "10px 4px", color: "var(--muted2)" }}>{formatDate(s.subscribedAt)}</td>
              <td style={{ padding: "10px 4px", textAlign: "right" }}>
                <DeleteSubscriberButton id={Number(s.id)} />
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={3} style={{ padding: 24, textAlign: "center", color: "var(--muted)" }}>
                No subscribers yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
