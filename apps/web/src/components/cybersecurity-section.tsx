"use client";

import { useState } from "react";
import { AssessmentModal, type AssessmentData } from "./assessment-modal";

export interface CyberToolData {
  id: number;
  name: string;
  category: string | null;
  description: string | null;
  techStack: string[];
  githubUrl: string | null;
}

export function CyberSecuritySection({ assessments, tools }: { assessments: AssessmentData[]; tools: CyberToolData[] }) {
  const [tab, setTab] = useState<"assessments" | "tools">("assessments");
  const [active, setActive] = useState<AssessmentData | null>(null);

  return (
    <section className="section" id="cybersecurity">
      <div className="s-eyebrow">Cybersecurity</div>
      <h2 className="s-title">Security work that <em>matters</em></h2>
      <div className="s-rule" />
      <div className="cyber-tabs">
        <button className={`ctab${tab === "assessments" ? " active" : ""}`} onClick={() => setTab("assessments")}>
          Assessments &amp; Investigations
        </button>
        <button className={`ctab${tab === "tools" ? " active" : ""}`} onClick={() => setTab("tools")}>
          Tools Built
        </button>
      </div>

      <div className={`cyber-panel${tab === "assessments" ? " active" : ""}`}>
        <div className="project-grid">
          {assessments.map((a) => {
            const isSoc = (a.tag ?? "").toLowerCase().includes("soc") || (a.tag ?? "").toLowerCase().includes("investigation");
            return (
              <div key={a.id} className="pcard clickable" onClick={() => setActive(a)} style={{ cursor: "pointer" }}>
                <div className="pcard-top">
                  <span className={`pcard-tag ${isSoc ? "tag-soc" : "tag-complete"}`}>{isSoc ? "SOC Investigation" : "Complete"}</span>
                </div>
                <h3 className="pcard-name">{a.title}</h3>
                <p className="pcard-desc">{a.tag}</p>
                <div className="pcard-read-more" style={{ cursor: "pointer" }}>Read full details →</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`cyber-panel${tab === "tools" ? " active" : ""}`}>
        <div className="project-grid">
          {tools.map((t) => (
            <div key={t.id} className="pcard">
              <div className="pcard-top">
                <span className="pcard-tag tag-tool">Tool Built</span>
                <span className="pcard-context">{t.category}</span>
              </div>
              <h3 className="pcard-name">{t.name}</h3>
              <p className="pcard-desc">{t.description}</p>
              <div className="pcard-tools">
                {t.techStack.map((s) => (
                  <span key={s} className="tool-pill">{s}</span>
                ))}
              </div>
              {t.githubUrl && (
                <a href={t.githubUrl} target="_blank" rel="noopener" className="pcard-link">GitHub →</a>
              )}
            </div>
          ))}
        </div>
      </div>

      <AssessmentModal assessment={active} onClose={() => setActive(null)} />
    </section>
  );
}
