"use client";

import { useState } from "react";

export interface CaseStudyData {
  id: number;
  title: string;
  tag: string | null;
  label: string | null;
  challenge: string | null;
  results: string[];
  techStack: string[];
  fullDetails: string | null;
  outcomes: { val: string; label: string }[] | null;
}

export function CaseStudiesSection({ caseStudies }: { caseStudies: CaseStudyData[] }) {
  const [active, setActive] = useState<CaseStudyData | null>(null);

  return (
    <section className="section section-alt" id="casestudies">
      <div className="s-eyebrow">Case Studies</div>
      <h2 className="s-title">Deep dives into <em>real work</em></h2>
      <div className="s-rule" />
      <div className="case-grid">
        {caseStudies.map((c, i) => (
          <div key={c.id} className="case-card" onClick={() => setActive(c)}>
            <div className="case-card-num">{String(i + 1).padStart(2, "0")}</div>
            <div className="case-tag-s">{c.tag}</div>
            <div className="case-title">{c.title}</div>
            <div className="case-challenge-l">Challenge</div>
            <p className="case-body-s">{c.challenge}</p>
            <div className="case-results">
              {c.results.map((r) => (
                <div key={r} className="case-result">{r}</div>
              ))}
            </div>
            <div className="pcard-tools">
              {c.techStack.map((t) => (
                <span key={t} className="tool-pill">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {active && (
        <div
          onClick={() => setActive(null)}
          style={{ display: "flex", position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,.88)", zIndex: 9000, alignItems: "center", justifyContent: "center", padding: 16 }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#111", border: "1px solid #333", borderRadius: 8, width: "100%", maxWidth: 720, maxHeight: "88vh", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "10px 14px", borderBottom: "1px solid #2a2a2a", flexShrink: 0 }}>
              <button onClick={() => setActive(null)} style={{ width: 32, height: 32, background: "#1e1e1e", border: "1px solid #444", color: "#fff", fontSize: 15, cursor: "pointer", borderRadius: 4, lineHeight: 1 }}>✕</button>
            </div>
            <div style={{ padding: "24px 28px 32px", overflowY: "auto", flex: 1 }}>
              {active.label && <div style={{ fontSize: 12, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase", color: "#3ecfaa", marginBottom: 14 }}>{active.label}</div>}
              <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 20, lineHeight: 1.2 }}>{active.title}</div>
              {active.outcomes && active.outcomes.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(110px,1fr))", gap: 12, background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 6, padding: 16, marginBottom: 20 }}>
                  {active.outcomes.map((o, i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 26, fontWeight: 700, color: "#c9a84c", lineHeight: 1 }}>{o.val}</div>
                      <div style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: 1, textTransform: "uppercase", color: "#777", marginTop: 4 }}>{o.label}</div>
                    </div>
                  ))}
                </div>
              )}
              {active.fullDetails && (
                <div style={{ fontSize: 14, lineHeight: 1.85, color: "#ccc" }} dangerouslySetInnerHTML={{ __html: active.fullDetails }} />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
