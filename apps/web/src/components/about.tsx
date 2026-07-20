export function About({ pillars }: { pillars: Record<string, string> }) {
  return (
    <section className="section section-alt" id="about">
      <div className="s-eyebrow">About</div>
      <h2 className="s-title">
        The intersection of <em>depth</em>
        <br />
        and real-world impact
      </h2>
      <div className="s-rule" />
      <div className="about-layout">
        <div className="about-text">
          <p>
            I am a <strong>Nigerian technologist, serial founder, cybersecurity professional, and builder</strong> —
            passionate about building solutions that matter, particularly in Africa, where the right technology,
            deployed the right way, can change how businesses operate and how people live.
          </p>
          <p>
            Over the years, I have worked across{" "}
            <strong>threat analysis, vulnerability assessment, digital forensics, and security architecture</strong>,
            applying these skills both to defending organisations and to building products that create real value.
            My work is backed by internationally recognised certifications and a track record of verified results
            across multiple markets.
          </p>
          <p>
            Beyond pure security practice, I have <strong>founded and led multiple ventures</strong>, each one
            reflecting my drive to solve genuine problems. I work on digital solutions that address infrastructure
            challenges — cybersecurity products designed for African markets, spaces where security and business
            opportunity intersect in ways that are still largely untapped.
          </p>
          <p>
            I have built educational programmes that turn complex technical concepts into practical capability,
            training professionals across <strong>Nigeria, the United Kingdom, Brazil, and Switzerland</strong>. What
            drives me is the intersection of deep technical knowledge and real-world business impact.
          </p>
          <p>
            Whether you are an investor, a business seeking embedded security expertise, or a collaborator ready to
            build something meaningful in the African tech ecosystem — <strong>I turn complex problems into
            scalable solutions.</strong>
          </p>
        </div>
        <div className="about-sidebar">
          <div className="identity-pillars">
            <div className="pillar"><div className="pillar-icon">⬡</div><div className="pillar-name">Security</div><div className="pillar-desc">VAPT · Forensics · SOC · Governance</div></div>
            <div className="pillar"><div className="pillar-icon">◈</div><div className="pillar-name">Product</div><div className="pillar-desc">{pillars.pillar_product ?? "IoT · Web · Mobile · QA · PM"}</div></div>
            <div className="pillar"><div className="pillar-icon">◎</div><div className="pillar-name">Education</div><div className="pillar-desc">{pillars.pillar_education ?? "NG · UK · Community"}</div></div>
            <div className="pillar"><div className="pillar-icon">◇</div><div className="pillar-name">Ventures</div><div className="pillar-desc">6 active companies &amp; communities</div></div>
          </div>
          <div className="about-meta">
            <div className="meta-row"><span className="meta-key">Base</span><span style={{ color: "var(--text)", fontSize: "0.64rem" }}>Owerri, Nigeria</span></div>
            <div className="meta-row"><span className="meta-key">Reach</span><span style={{ color: "var(--text)", fontSize: "0.64rem" }}>{pillars.pillar_reach ?? "Owerri · NG · Africa · Global"}</span></div>
            <div className="meta-row"><span className="meta-key">Focus</span><span style={{ color: "var(--text)", fontSize: "0.64rem" }}>{pillars.pillar_focus ?? "Africa-first Tech"}</span></div>
            <div className="meta-row"><span className="meta-key">Status</span><span className="open-dot" style={{ color: "var(--teal)", fontSize: "0.64rem" }}>Open to Partners</span></div>
            <div className="meta-row"><span className="meta-key">Links</span><a href="https://linktr.ee/uzoukwuericiyke" target="_blank" style={{ color: "var(--gold)", fontSize: "0.6rem", textDecoration: "none" }}>linktr.ee/uzoukwuericiyke</a></div>
          </div>
        </div>
      </div>
    </section>
  );
}
