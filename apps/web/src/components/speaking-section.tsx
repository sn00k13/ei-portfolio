"use client";

import { useState } from "react";

export interface SpeakingCardData {
  id: number;
  title: string;
  type: string;
  datePeriod: string | null;
  location: string | null;
  organisation: string | null;
  myRole: string | null;
  shortDescription: string | null;
  fullDescription: string | null;
  status: string | null;
}

export function SpeakingSection({ cards }: { cards: SpeakingCardData[] }) {
  const [active, setActive] = useState<SpeakingCardData | null>(null);

  return (
    <section className="section" id="speaking">
      <div className="s-eyebrow">Speaking &amp; Media</div>
      <h2 className="s-title">Online, on air, <em>driving conversations</em></h2>
      <div className="s-rule" />
      <div className="media-stats">
        <div className="media-stat"><div className="media-stat-n">20+</div><div className="media-stat-l">Training Sessions</div></div>
        <div className="media-stat"><div className="media-stat-n">500+</div><div className="media-stat-l">Professionals Trained</div></div>
      </div>
      <div className="speaking-grid">
        {cards.map((c) => (
          <div key={c.id} className="speak-card clickable" onClick={() => setActive(c)}>
            <div className="speak-card-type">{c.type}</div>
            <div className="speak-card-title">{c.title}</div>
            <div className="speak-card-meta">
              {c.datePeriod} &nbsp;·&nbsp; {c.location}
              <br />
              {c.organisation} &nbsp;·&nbsp; {c.myRole}
            </div>
            <div className="speak-card-desc">{c.shortDescription}</div>
            <div className="speak-card-read-more">Read more →</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: ".65rem", color: "var(--muted)", letterSpacing: ".1em", marginBottom: "1rem" }}>
          OPEN TO SPEAKING INVITATIONS · WORKSHOPS · PANEL DISCUSSIONS
        </p>
        <a href="#contact" className="btn btn-gold">Invite Me to Speak →</a>
      </div>

      {active && (
        <div
          onClick={() => setActive(null)}
          style={{ display: "flex", position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,.88)", zIndex: 9000, alignItems: "center", justifyContent: "center", padding: 16 }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#111", border: "1px solid #333", borderRadius: 8, width: "100%", maxWidth: 680, maxHeight: "88vh", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "10px 14px", borderBottom: "1px solid #2a2a2a", flexShrink: 0 }}>
              <button onClick={() => setActive(null)} style={{ width: 32, height: 32, background: "#1e1e1e", border: "1px solid #444", color: "#fff", fontSize: 15, cursor: "pointer", borderRadius: 4, lineHeight: 1 }}>✕</button>
            </div>
            <div style={{ padding: "24px 28px 32px", overflowY: "auto", flex: 1 }}>
              <div style={{ fontSize: 11, fontFamily: "monospace", background: "#1e2a1e", color: "#4caf50", letterSpacing: 2, textTransform: "uppercase", padding: "4px 10px", display: "inline-block", marginBottom: 12 }}>
                {active.type}
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 16, lineHeight: 1.2 }}>{active.title}</div>
              <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 6, padding: "12px 16px", marginBottom: 20 }}>
                {active.datePeriod && <div style={{ fontSize: 13, color: "#aaa", marginBottom: 6 }}>{active.datePeriod}</div>}
                {active.location && <div style={{ fontSize: 13, color: "#aaa", marginBottom: 6 }}>{active.location}</div>}
                {active.organisation && <div style={{ fontSize: 13, color: "#aaa", marginBottom: 6 }}>{active.organisation}</div>}
                {active.myRole && <div style={{ fontSize: 13, color: "#aaa" }}>{active.myRole}</div>}
              </div>
              {active.fullDescription && (
                <div style={{ fontSize: 14, lineHeight: 1.85, color: "#ccc" }}>{active.fullDescription}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
