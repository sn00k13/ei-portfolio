"use client";

import { useState } from "react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#cybersecurity", label: "Cybersecurity" },
  { href: "#webapps", label: "Web/App" },
  { href: "#ventures", label: "Ventures" },
  { href: "#speaking", label: "Speaking" },
  { href: "#casestudies", label: "Cases" },
  { href: "#events", label: "Events" },
  { href: "#blog", label: "Blog" },
  { href: "#booking", label: "Book" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div id="infoBar">
        <span className="ib-name">Uzoukwu Eric Ikenna</span>
        <div className="ib-links">
          <a href="mailto:uzoukwuericiyke@yahoo.com">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <polyline points="2,4 12,13 22,4" />
            </svg>
            uzoukwuericiyke@yahoo.com
          </a>
          <a href="https://linkedin.com/in/uzoukwu-eric-ikenna" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            uzoukwu-eric-ikenna
          </a>
          <a href="https://linktr.ee/uzoukwuericiyke" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.52 2.672l4.978 4.927-2.19 2.22-2.788-2.76V13.8h-3.04V7.06L7.692 9.82l-2.19-2.22 4.978-4.927a1.8 1.8 0 0 1 3.04 0zM7.692 15.18l2.788 2.76V13.8h3.04v4.14l2.788-2.76 2.19 2.22-4.978 4.927a1.8 1.8 0 0 1-3.04 0L5.502 17.4l2.19-2.22z" />
            </svg>
            linktr.ee/uzoukwuericiyke
          </a>
        </div>
      </div>

      <nav id="mainNav">
        <a href="#home" className="nav-logo">Eric Uzoukwu</a>
        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>
        <a href="#booking" className="nav-cta">Book a Call</a>
        <div className="nav-hamburger" onClick={() => setOpen(true)}>
          <span /><span /><span />
        </div>
      </nav>

      <div className={`mobile-menu${open ? " open" : ""}`} id="mobileMenu">
        <span className="mobile-close" onClick={() => setOpen(false)}>✕</span>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
      </div>
    </>
  );
}
