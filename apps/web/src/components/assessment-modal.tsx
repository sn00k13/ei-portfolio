"use client";

export interface AssessmentData {
  id: number;
  title: string;
  tag: string | null;
  label: string | null;
  overview: string | null;
  findings: string[];
  outcome: string | null;
  toolsUsed: string[];
  metrics: { outcomes?: { val: string; label: string }[] } | null;
}

export function AssessmentModal({ assessment, onClose }: { assessment: AssessmentData | null; onClose: () => void }) {
  if (!assessment) return null;
  const outcomes = assessment.metrics?.outcomes ?? [];

  return (
    <div
      onClick={onClose}
      style={{ display: "flex", position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,.88)", zIndex: 9000, alignItems: "center", justifyContent: "center", padding: 16 }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#111", border: "1px solid #333", borderRadius: 8, width: "100%", maxWidth: 720, maxHeight: "88vh", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "10px 14px", borderBottom: "1px solid #2a2a2a", flexShrink: 0 }}>
          <button onClick={onClose} style={{ width: 32, height: 32, background: "#1e1e1e", border: "1px solid #444", color: "#fff", fontSize: 15, cursor: "pointer", borderRadius: 4, lineHeight: 1 }}>✕</button>
        </div>
        <div style={{ padding: "24px 28px 32px", overflowY: "auto", flex: 1 }}>
          {assessment.tag && (
            <div style={{ fontSize: 11, fontFamily: "monospace", background: "#1e1e2a", color: "#6699ff", letterSpacing: 2, textTransform: "uppercase", padding: "4px 10px", display: "inline-block", marginBottom: 6 }}>
              {assessment.tag}
            </div>
          )}
          {assessment.label && <div style={{ fontSize: 12, fontFamily: "monospace", color: "#666", marginBottom: 14 }}>{assessment.label}</div>}
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 20, lineHeight: 1.2 }}>{assessment.title}</div>

          {outcomes.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(110px,1fr))", gap: 12, background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 6, padding: 16, marginBottom: 20 }}>
              {outcomes.map((o, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 26, fontWeight: 700, color: "#c9a84c", lineHeight: 1 }}>{o.val}</div>
                  <div style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: 1, textTransform: "uppercase", color: "#777", marginTop: 4 }}>{o.label}</div>
                </div>
              ))}
            </div>
          )}

          {assessment.overview && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase", color: "#c9a84c", marginBottom: 8 }}>Overview</div>
              <div style={{ fontSize: 14, lineHeight: 1.85, color: "#ccc" }} dangerouslySetInnerHTML={{ __html: assessment.overview }} />
            </div>
          )}

          {assessment.findings.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase", color: "#c9a84c", marginBottom: 8 }}>Key Findings</div>
              <ul style={{ fontSize: 14, lineHeight: 1.85, color: "#ccc", paddingLeft: 20 }}>
                {assessment.findings.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {assessment.outcome && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase", color: "#c9a84c", marginBottom: 8 }}>Outcome</div>
              <div style={{ fontSize: 14, lineHeight: 1.85, color: "#ccc" }}>{assessment.outcome}</div>
            </div>
          )}

          {assessment.toolsUsed.length > 0 && (
            <div>
              <div style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase", color: "#c9a84c", marginBottom: 8 }}>Tools Used</div>
              <div style={{ fontSize: 14, lineHeight: 1.85, color: "#ccc" }}>{assessment.toolsUsed.join(" · ")}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
