"use client";

import { useActionState } from "react";
import { submitContactForm } from "../actions";

export function ContactSection() {
  const [state, formAction, pending] = useActionState(submitContactForm, undefined);

  return (
    <section className="section" id="contact">
      <div className="s-eyebrow">Contact</div>
      <div className="contact-grid">
        <div>
          <div className="open-badge">Open to Opportunities &amp; Partnerships</div>
          <h2 className="contact-lead">Let&apos;s build something <em>remarkable</em> together.</h2>
          <p className="contact-body">
            Whether you&apos;re an investor, a business needing embedded security expertise, or a collaborator ready
            to build something meaningful in the African tech ecosystem — I&apos;m open to that conversation.
          </p>
          <div className="social-links">
            <a href="mailto:uzoukwuericiyke@yahoo.com" className="social-link">Email</a>
            <a href="https://linkedin.com/in/uzoukwu-eric-ikenna" target="_blank" rel="noopener" className="social-link">LinkedIn</a>
            <a href="https://github.com/UzoukwuEricIyke" target="_blank" rel="noopener" className="social-link">GitHub</a>
            <a href="https://linktr.ee/uzoukwuericiyke" target="_blank" rel="noopener" className="social-link">Linktree</a>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.75rem" }}>
            <a href="#booking" className="btn btn-ghost" style={{ fontSize: ".68rem" }}>Book a Call →</a>
          </div>
          <div className="contact-meta">
            <div>Imo Digital City Limited, Egbu Road, Owerri</div>
            <div style={{ paddingLeft: "1.4rem" }}>A2 Ojukwu Brown Avenue, Irete, Owerri</div>
            <div><a href="mailto:uzoukwuericiyke@yahoo.com">uzoukwuericiyke@yahoo.com</a></div>
            <div><a href="https://linktr.ee/uzoukwuericiyke" target="_blank">linktr.ee/uzoukwuericiyke</a></div>
          </div>
        </div>
        <div>
          <form action={formAction}>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Name</label><input className="form-input" name="name" type="text" placeholder="Your name" required /></div>
              <div className="form-group"><label className="form-label">Email</label><input className="form-input" name="email" type="email" placeholder="your@email.com" required /></div>
            </div>
            <div className="form-group"><label className="form-label">Subject</label><input className="form-input" name="subject" type="text" placeholder="Investment · Partnership · Security · Other" /></div>
            <div className="form-group"><label className="form-label">Message</label><textarea className="form-textarea" name="message" placeholder="Tell me what you're working on..." required /></div>
            <button type="submit" className="form-submit" disabled={pending}>{pending ? "Sending…" : "Send Message →"}</button>
            {state && (
              <div id="formStatus" className={state.ok ? "success" : "error"} style={{ display: "block" }}>
                {state.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
