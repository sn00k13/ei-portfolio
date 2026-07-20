export interface TestimonialData {
  id: number;
  quote: string;
  name: string;
  role: string | null;
  avatar: string | null;
}

export function TestimonialsSection({ testimonials }: { testimonials: TestimonialData[] }) {
  return (
    <section className="section section-alt" id="testimonials">
      <div className="s-eyebrow">Testimonials</div>
      <h2 className="s-title">What people <em>say</em></h2>
      <div className="s-rule" />
      <div className="testimonials-grid">
        {testimonials.map((t) => (
          <div key={t.id} className="tcard">
            <div className="tcard-quote">{t.quote}</div>
            <div className="tcard-author">
              <div
                className="tcard-avatar"
                style={{ background: "var(--bg3)", color: "var(--gold)", fontFamily: "var(--mono)", fontSize: ".85rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                {t.avatar || t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div>
                <div className="tcard-name">{t.name}</div>
                <div className="tcard-role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
