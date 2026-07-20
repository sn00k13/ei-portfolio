export interface VentureData {
  id: number;
  name: string;
  type: string | null;
  role: string | null;
  status: string | null;
  description: string | null;
  logoUrl: string | null;
  accentColor: string | null;
  websiteUrl: string | null;
}

export function VenturesSection({ ventures }: { ventures: VentureData[] }) {
  return (
    <section className="section" id="ventures">
      <div className="s-eyebrow">Ventures &amp; Founding</div>
      <h2 className="s-title">
        Building the <em>companies</em>
        <br />Africa needs
      </h2>
      <div className="s-rule" />
      <div className="ventures-grid">
        {ventures.map((v) => (
          <div key={v.id} className="vcard">
            <div className="vcard-accent" style={{ background: `linear-gradient(90deg, ${v.accentColor ?? "var(--teal)"}, transparent)` }} />
            <div className="vcard-header">
              {v.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="vcard-logo" src={v.logoUrl} alt={v.name} />
              ) : (
                <div className="vcard-logo-ph">{v.name.slice(0, 2).toUpperCase()}</div>
              )}
              <div>
                <div className="vcard-type">{v.type}</div>
                <div className="vcard-name">{v.name}</div>
              </div>
            </div>
            <div className="vcard-role">{v.role}</div>
            <p className="vcard-desc">{v.description}</p>
            <span className="vcard-status">{v.status}</span>
            {v.websiteUrl && (
              <a href={v.websiteUrl} target="_blank" rel="noopener" className="pcard-link">Visit →</a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
