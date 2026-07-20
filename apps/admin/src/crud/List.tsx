import Link from "next/link";
import type { CrudConfig, CrudRow } from "./types";
import { DeleteRowButton } from "./row-actions";

export function CrudListPage({
  config,
  rows,
  deleteAction,
}: {
  config: CrudConfig;
  rows: CrudRow[];
  deleteAction: (id: number) => Promise<void>;
}) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 28 }}>{config.label}</h1>
        <Link href={`${config.routeBase}/new`} style={primaryLinkStyle}>
          + New
        </Link>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginTop: 20 }}>
        <thead>
          <tr style={{ textAlign: "left", color: "var(--muted2)", borderBottom: "1px solid var(--border)" }}>
            <th style={{ padding: "8px 4px" }}>Title</th>
            {rows.some((r) => r.subtitle !== undefined) && <th style={{ padding: "8px 4px" }}>Detail</th>}
            {rows.some((r) => r.status !== undefined) && <th style={{ padding: "8px 4px" }}>Status</th>}
            <th style={{ padding: "8px 4px" }}></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} style={{ borderBottom: "1px solid var(--border)" }}>
              <td style={{ padding: "10px 4px" }}>
                <Link href={`${config.routeBase}/${row.id}`} style={{ color: "var(--text)", textDecoration: "none" }}>
                  {row.title}
                </Link>
              </td>
              {rows.some((r) => r.subtitle !== undefined) && (
                <td style={{ padding: "10px 4px", color: "var(--muted2)" }}>{row.subtitle}</td>
              )}
              {rows.some((r) => r.status !== undefined) && (
                <td style={{ padding: "10px 4px" }}>
                  {row.status && (
                    <span
                      style={{
                        fontSize: 11,
                        padding: "2px 8px",
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.08)",
                        color: "var(--muted2)",
                      }}
                    >
                      {row.status}
                    </span>
                  )}
                </td>
              )}
              <td style={{ padding: "10px 4px", textAlign: "right" }}>
                <DeleteRowButton id={row.id} deleteAction={deleteAction} />
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={4} style={{ padding: 24, textAlign: "center", color: "var(--muted)" }}>
                No entries yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const primaryLinkStyle: React.CSSProperties = {
  background: "var(--gold)",
  color: "#080a0d",
  padding: "8px 16px",
  borderRadius: 4,
  fontSize: 13,
  fontWeight: 600,
  textDecoration: "none",
};
