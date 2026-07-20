import { prisma } from "@eui/db";
import { requireSection } from "@/require-section";
import { ContentRow } from "./content-row";
import { AddKeyForm } from "./add-key-form";

export const dynamic = "force-dynamic";

export default async function SiteContentPage() {
  await requireSection("content");
  const rows = await prisma.siteContent.findMany({ orderBy: { key: "asc" } });

  return (
    <div>
      <h1 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 28 }}>Site Content</h1>
      <p style={{ color: "var(--muted2)", fontSize: 13, marginTop: 4 }}>
        Generic key/value CMS store — every editable text block on the public site maps to a key here.
        Saving a key archives its previous value to Content History.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
        {rows.map((row) => (
          <ContentRow key={row.key} contentKey={row.key} initialValue={row.value ?? ""} />
        ))}
        {rows.length === 0 && <p style={{ color: "var(--muted)" }}>No content keys yet.</p>}
      </div>

      <AddKeyForm />
    </div>
  );
}
