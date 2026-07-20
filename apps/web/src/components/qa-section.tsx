export interface QaProductData {
  id: number;
  name: string;
  sector: string | null;
  description: string | null;
}

export function QaSection({ products }: { products: QaProductData[] }) {
  return (
    <section className="section" id="qa">
      <div className="s-eyebrow">Quality Assurance</div>
      <h2 className="s-title">
        Quality as a <em>system</em>,<br />not an afterthought
      </h2>
      <div className="s-rule" />
      <div className="qa-metrics">
        <div className="qa-metric"><div className="qa-num">30&ndash;40%</div><div className="qa-label">Post-Release Defect Reduction</div></div>
        <div className="qa-metric"><div className="qa-num">85&ndash;90%</div><div className="qa-label">Critical Workflow Coverage</div></div>
        <div className="qa-metric"><div className="qa-num">18+</div><div className="qa-label">Product Ecosystems QA&apos;d</div></div>
        <div className="qa-metric"><div className="qa-num">Bi-weekly</div><div className="qa-label">Stable Sprint Releases</div></div>
      </div>
      <div className="s-eyebrow" style={{ marginBottom: "0.7rem" }}>Tools &amp; Stack</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginBottom: "2.5rem" }}>
        {["Jira", "Trello", "Postman", "GitHub", "Browser DevTools", "Linux", "REST APIs", "Agile / Scrum"].map((t) => (
          <span key={t} className="tool-pill" style={{ fontSize: "0.68rem", padding: "0.28rem 0.65rem" }}>{t}</span>
        ))}
      </div>
      <div className="s-eyebrow" style={{ marginBottom: "1.2rem" }}>Products QA&apos;d</div>
      <div className="qa-product-grid">
        {products.map((p) => (
          <div key={p.id} className="qa-pcard">
            <div className="qa-sector">{p.sector}</div>
            <div className="qa-pname">{p.name}</div>
            <div className="qa-pdesc">{p.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
