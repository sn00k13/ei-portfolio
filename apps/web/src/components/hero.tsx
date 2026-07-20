import Image from "next/image";

export function Hero({ tags }: { tags: string[] }) {
  return (
    <section className="hero" id="home">
      <div className="hero-grid" />
      <div className="hero-glow" />
      <div className="hero-glow2" />
      <div className="hero-left">
        <div className="hero-eyebrow">Owerri, Imo State · Nigeria · Global</div>
        <h1 className="hero-name">
          <span className="first">Uzoukwu</span>
          <span className="last">Eric Ikenna</span>
        </h1>
        <div className="hero-descriptor">
          {tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <p className="hero-bio">
          Nigerian technologist and serial founder building Africa-first technology solutions. I secure systems,
          build products, and train the next generation — turning complex problems into scalable impact.
        </p>
        <div className="hero-actions">
          <a href="#ventures" className="btn btn-gold">Explore My Work</a>
          <a href="#booking" className="btn btn-ghost">Book a Call</a>
        </div>
        <div className="hero-stats">
          <div className="stat"><div className="stat-n">7<sup>+</sup></div><div className="stat-l">Active Ventures</div></div>
          <div className="stat"><div className="stat-n">10<sup>+</sup></div><div className="stat-l">Projects Delivered</div></div>
          <div className="stat"><div className="stat-n">17<sup>+</sup></div><div className="stat-l">Products Built</div></div>
        </div>
      </div>
      <div className="hero-photo-wrap">
        <div className="hero-photo-frame">
          <Image src="/images/uzoukwu-eric-ikenna-0.jpg" alt="Uzoukwu Eric Ikenna" width={420} height={530} priority />
        </div>
        <div className="hero-photo-border" />
        <div className="hero-photo-tag">Owerri, Nigeria · 2026</div>
      </div>
    </section>
  );
}
