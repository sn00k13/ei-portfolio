const LINKS = [
  { href: "#about", label: "About" },
  { href: "#cybersecurity", label: "Cybersecurity" },
  { href: "#webapps", label: "Web/App" },
  { href: "#ventures", label: "Ventures" },
  { href: "#speaking", label: "Speaking" },
  { href: "#events", label: "Events" },
  { href: "#blog", label: "Blog" },
  { href: "#booking", label: "Book" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer>
      <div className="footer-brand">© 2026 Uzoukwu Eric Ikenna</div>
      <div className="footer-links">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <div className="footer-right">Egbu Road · Irete · Owerri · Nigeria</div>
      </div>
    </footer>
  );
}
