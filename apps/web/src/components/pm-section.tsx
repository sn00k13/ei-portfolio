export interface PmProjectData {
  id: number;
  name: string;
  role: string | null;
  description: string | null;
}

export function PmSection({ projects }: { projects: PmProjectData[] }) {
  return (
    <section className="section section-alt" id="pm">
      <div className="s-eyebrow">Project Management</div>
      <h2 className="s-title">Execution at every <em>level</em></h2>
      <div className="s-rule" />
      <div className="pm-stats-bar">
        <div className="pm-stat-item"><div className="pm-stat-val">17<sup>+</sup></div><div className="pm-stat-lbl">Projects Delivered</div></div>
        <div className="pm-stat-item"><div className="pm-stat-val">17<sup>+</sup></div><div className="pm-stat-lbl">Products as PM &amp; QA Lead</div></div>
        <div className="pm-stat-item"><div className="pm-stat-val">20%</div><div className="pm-stat-lbl">Timeline Deviation Reduced</div></div>
        <div className="pm-stat-item"><div className="pm-stat-val">100%</div><div className="pm-stat-lbl">PMO Compliance</div></div>
      </div>
      <div className="pm-meta-row">
        <div className="pm-meta-block">
          <div className="pm-meta-label">Certification</div>
          <span className="tool-pill" style={{ color: "var(--gold)", borderColor: "rgba(201,168,76,.4)", fontSize: ".65rem", padding: ".28rem .65rem" }}>
            CPO — Center for Project Innovation, AU
          </span>
        </div>
        <div className="pm-meta-block">
          <div className="pm-meta-label">Tools</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".38rem" }}>
            {["Trello", "Jira", "Asana", "ClickUp", "Notion", "MS Project"].map((t) => (
              <span key={t} className="tool-pill">{t}</span>
            ))}
          </div>
        </div>
        <div className="pm-meta-block">
          <div className="pm-meta-label">Methodologies</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".38rem" }}>
            {["Agile Scrum", "Kanban", "Waterfall"].map((t) => (
              <span key={t} className="tool-pill">{t}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="pm-cards-grid">
        {projects.map((p, i) => (
          <div key={p.id} className="pm-card">
            <div className="pm-card-num">{String(i + 1).padStart(2, "0")}</div>
            <div className="pm-card-body">
              <div className="pm-card-name">{p.name}</div>
              <div className="pm-card-role">{p.role}</div>
              <div className="pm-card-desc">{p.description}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
