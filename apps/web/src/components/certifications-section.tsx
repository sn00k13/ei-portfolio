export interface CertificationData {
  id: number;
  name: string;
  issuer: string;
  dateEarned: string | null;
  group: string | null;
}

export function CertificationsSection({ certifications }: { certifications: CertificationData[] }) {
  const groups = new Map<string, CertificationData[]>();
  for (const c of certifications) {
    const g = c.group ?? "Other";
    groups.set(g, [...(groups.get(g) ?? []), c]);
  }

  return (
    <section className="section section-alt" id="certifications">
      <div className="s-eyebrow">Certifications</div>
      <h2 className="s-title">Credentials that <em>verify</em> the work</h2>
      <div className="s-rule" />
      <div className="certs-layout">
        <div className="certs-sidebar">
          <div className="certs-highlight">
            <div className="ch-label">Top Credential</div>
            <div className="ch-name">Certified Cybersecurity Educator Professional</div>
            <div className="ch-issuer">Red Team Leaders · Apr 2026</div>
          </div>
          <div className="certs-highlight">
            <div className="ch-label">Project Management</div>
            <div className="ch-name">Certified Project Officer (CPO)</div>
            <div className="ch-issuer">Center for Project Innovation, Australia</div>
          </div>
          <div className="certs-highlight">
            <div className="ch-label">Academic</div>
            <div className="ch-name">Diploma in Cybersecurity</div>
            <div className="ch-issuer">University of Johannesburg · 2025</div>
          </div>
        </div>
        <div>
          {[...groups.entries()].map(([label, items]) => (
            <div key={label} className="cert-group">
              <div className="cert-group-label">{label}</div>
              <div className="cert-list">
                {items.map((c) => (
                  <div key={c.id} className="cert-item">
                    <div className="cert-dot" />
                    <div>
                      <div className="cert-name">{c.name}</div>
                      <div className="cert-issuer">{c.issuer}</div>
                    </div>
                    <div className="cert-date">{c.dateEarned ?? "—"}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
