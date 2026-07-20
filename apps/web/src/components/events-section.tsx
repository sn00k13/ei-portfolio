"use client";

import { useMemo, useState } from "react";

export interface EventData {
  id: number;
  name: string;
  type: string;
  status: string | null;
  dateStart: string;
  dateEnd: string | null;
  location: string;
  organisation: string | null;
  myRole: string | null;
  eventLink: string | null;
  shortDescription: string | null;
  fullDescription: string | null;
}

const FILTERS = ["all", "upcoming", "past", "Speaking", "Workshop", "Attending", "Community"];

export function EventsSection({ events }: { events: EventData[] }) {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState<EventData | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return events;
    if (filter === "upcoming" || filter === "past") return events.filter((e) => (e.status ?? "upcoming") === filter);
    return events.filter((e) => e.type === filter);
  }, [events, filter]);

  return (
    <section className="section" id="events">
      <div className="s-eyebrow">Events</div>
      <h2 className="s-title">Where I show up &amp; <em>contribute</em></h2>
      <div className="s-rule" />
      <div className="events-filters">
        {FILTERS.map((f) => (
          <button key={f} className={`events-filter${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>
            {f === "all" ? "All" : f}
          </button>
        ))}
      </div>
      <div className="events-grid">
        {filtered.map((e) => (
          <div key={e.id} className="pcard clickable" onClick={() => setActive(e)} style={{ cursor: "pointer" }}>
            <div className="pcard-top">
              <span className="pcard-tag tag-progress">{e.type}</span>
              <span className="pcard-context">{new Date(e.dateStart).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
            </div>
            <h3 className="pcard-name">{e.name}</h3>
            <p className="pcard-desc">{e.shortDescription}</p>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="events-empty">No events in this category.</div>
      )}

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
              <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 16, lineHeight: 1.2 }}>{active.name}</div>
              <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 6, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#aaa" }}>
                <div>{new Date(active.dateStart).toLocaleDateString()}</div>
                <div>{active.location}</div>
                {active.organisation && <div>{active.organisation}</div>}
              </div>
              {active.fullDescription && <div style={{ fontSize: 14, lineHeight: 1.85, color: "#ccc" }}>{active.fullDescription}</div>}
              {active.eventLink && (
                <a href={active.eventLink} target="_blank" rel="noopener" style={{ display: "inline-block", marginTop: 16, color: "#c9a84c" }}>
                  Event link →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
