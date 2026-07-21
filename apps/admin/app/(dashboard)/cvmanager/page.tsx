import { requireSection } from "@/require-section";
import { pool, toCamelCaseRows } from "@/db";
import { UploadCvForm } from "./upload-form";
import { DeleteCvButton } from "./row-actions";

export const dynamic = "force-dynamic";

interface CvFileRow {
  id: string;
  cvType: string;
  filename: string | null;
  fileUrl: string | null;
  uploadedAt: string | null;
}

export default async function CvManagerPage() {
  await requireSection("cvmanager");
  const { rows: raw } = await pool.query(`select * from cv_files order by uploaded_at desc`);
  const rows = toCamelCaseRows<CvFileRow>(raw);

  return (
    <div>
      <h1 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 28, marginBottom: 4 }}>CV Manager</h1>
      <p style={{ color: "var(--muted2)", fontSize: 13, marginBottom: 20 }}>
        Upload and manage CV files, stored in Supabase Storage and served directly on the public site.
      </p>

      <UploadCvForm />

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ textAlign: "left", color: "var(--muted2)", borderBottom: "1px solid var(--border)" }}>
            <th style={{ padding: "8px 4px" }}>Type</th>
            <th style={{ padding: "8px 4px" }}>File</th>
            <th style={{ padding: "8px 4px" }}>Uploaded</th>
            <th style={{ padding: "8px 4px" }}></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={Number(r.id)} style={{ borderBottom: "1px solid var(--border)" }}>
              <td style={{ padding: "10px 4px" }}>{r.cvType}</td>
              <td style={{ padding: "10px 4px" }}>
                {r.fileUrl ? (
                  <a href={r.fileUrl} target="_blank" rel="noreferrer" style={{ color: "var(--teal)" }}>
                    {r.filename ?? "view file"}
                  </a>
                ) : (
                  <span style={{ color: "var(--muted)" }}>{r.filename ?? "—"}</span>
                )}
              </td>
              <td style={{ padding: "10px 4px", color: "var(--muted2)" }}>
                {r.uploadedAt ? new Date(r.uploadedAt).toLocaleDateString() : "—"}
              </td>
              <td style={{ padding: "10px 4px", textAlign: "right" }}>
                <DeleteCvButton id={Number(r.id)} />
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={4} style={{ padding: "16px 4px", color: "var(--muted)" }}>
                No CV files uploaded yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
