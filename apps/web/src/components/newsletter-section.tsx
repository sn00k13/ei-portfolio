"use client";

import { useActionState } from "react";
import { subscribeNewsletter } from "../actions";

export function NewsletterSection() {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, undefined);

  return (
    <section className="section nl-section" id="newsletter">
      <div className="nl-inner">
        <div className="nl-icon">✉</div>
        <h2 className="nl-title">Stay in the <em>loop</em></h2>
        <p className="nl-desc">
          Occasional updates on cybersecurity in Africa, product launches, events I&apos;m speaking at, and insights
          from building companies on the continent. No spam — ever.
        </p>
        <form action={formAction}>
          <div className="nl-form">
            <input className="nl-input" type="email" name="email" placeholder="your@email.com" required />
            <button type="submit" className="nl-submit" disabled={pending}>{pending ? "…" : "Subscribe →"}</button>
          </div>
        </form>
        {state && (
          <div id="nlStatus" className={state.ok ? "ok" : "err"} style={{ display: "block" }}>
            {state.message}
          </div>
        )}
        <div className="nl-note">Join · Unsubscribe anytime</div>
      </div>
    </section>
  );
}
