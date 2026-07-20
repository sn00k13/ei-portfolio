export interface ProductData {
  id: number;
  name: string;
  sector: string | null;
  status: string | null;
  description: string | null;
  techStack: string[];
  logoUrl: string | null;
  websiteUrl: string | null;
}

const STATUS_LABEL: Record<string, string> = { complete: "Complete", progress: "In Progress" };

export function WebAppSection({ products }: { products: ProductData[] }) {
  return (
    <section className="section section-alt" id="webapps">
      <div className="s-eyebrow">Web &amp; App</div>
      <h2 className="s-title">Products built for <em>real problems</em></h2>
      <div className="s-rule" />
      <div className="webapp-grid">
        {products.map((p) => (
          <div key={p.id} className="wcard">
            <div className="wcard-badge">
              <span className={`pcard-tag ${p.status === "complete" ? "tag-complete" : "tag-progress"}`}>
                {STATUS_LABEL[p.status ?? "progress"] ?? p.status}
              </span>
            </div>
            <div className="wcard-header">
              {p.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="wcard-logo" src={p.logoUrl} alt={p.name} />
              ) : (
                <div className="wcard-logo-ph">{p.name.slice(0, 2).toUpperCase()}</div>
              )}
              <div>
                <div className="wcard-name">{p.name}</div>
                <div className="wcard-sector">{p.sector}</div>
              </div>
            </div>
            <p className="wcard-desc">{p.description}</p>
            <div className="pcard-tools">
              {p.techStack.map((t) => (
                <span key={t} className="tool-pill">{t}</span>
              ))}
            </div>
            {p.websiteUrl && (
              <a href={p.websiteUrl} target="_blank" rel="noopener" className="pcard-link">Visit →</a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
