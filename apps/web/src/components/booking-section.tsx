const MEETING_TYPES = [
  { name: "Consultation", desc: "30 min · Cybersecurity advisory, web & app development, project review, general enquiries", href: "https://cal.com/uzoukwuericikenna/consultation" },
  { name: "Partnership & Collaboration", desc: "45 min · Joint builds, ventures, cross-company work", href: "https://cal.com/uzoukwuericikenna/partnership-collaboration-call" },
  { name: "Investment & Funding", desc: "30 min · Investors, VCs, angel networks & funding partners only", href: "https://cal.com/uzoukwuericikenna/investment-funding-call" },
];

export function BookingSection() {
  return (
    <section className="section booking-section" id="booking">
      <div className="s-eyebrow">Book a Meeting</div>
      <h2 className="s-title">Let&apos;s talk — <em>book a call</em></h2>
      <div className="s-rule" />
      <div className="booking-layout">
        <div>
          <p className="booking-desc">
            Whether you want to explore a partnership, discuss a security challenge, talk investment, or simply
            connect — pick the right call type and let&apos;s have a real conversation.
          </p>
          <div className="meeting-types">
            {MEETING_TYPES.map((m) => (
              <a key={m.name} href={m.href} target="_blank" rel="noopener" className="meeting-type meeting-type-link">
                <div className="meeting-type-body">
                  <div className="meeting-type-name">{m.name}</div>
                  <div className="meeting-type-desc">{m.desc}</div>
                </div>
                <span className="meeting-type-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="calendly-wrap" style={{ background: "var(--bg2)", border: "1px solid var(--border)", overflow: "hidden", borderRadius: 4 }}>
            <iframe
              src="https://cal.com/uzoukwuericikenna?embed=1&theme=dark&brandColor=c9a84c"
              loading="lazy"
              title="Book a meeting with Eric Uzoukwu"
              style={{ width: "100%", height: 700, border: "none" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
