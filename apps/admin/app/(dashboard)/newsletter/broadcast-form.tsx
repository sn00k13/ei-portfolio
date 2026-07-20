"use client";

import { useActionState } from "react";
import { sendBroadcast } from "./actions";

export function BroadcastForm({ subscriberCount }: { subscriberCount: number }) {
  const [state, formAction, pending] = useActionState(sendBroadcast, undefined);

  return (
    <form
      action={formAction}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        maxWidth: 560,
        border: "1px solid var(--border2)",
        borderRadius: 6,
        padding: 20,
        marginBottom: 24,
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 600 }}>Send Broadcast</div>
      <p style={{ color: "var(--muted2)", fontSize: 12, margin: 0 }}>
        Sends to all {subscriberCount} subscriber{subscriberCount === 1 ? "" : "s"} via Resend, one email per
        recipient (no shared recipient list).
      </p>

      {state?.error && <p style={{ color: "var(--red)", fontSize: 13, margin: 0 }}>{state.error}</p>}
      {state?.success && <p style={{ color: "var(--teal)", fontSize: 13, margin: 0 }}>{state.success}</p>}

      <input name="subject" placeholder="Subject" required style={inputStyle} />
      <textarea name="body" placeholder="Message (plain text or simple HTML)" required rows={6} style={inputStyle} />

      <button type="submit" disabled={pending || subscriberCount === 0} style={btnStyle}>
        {pending ? "Sending…" : "Send to All Subscribers"}
      </button>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "8px 10px",
  background: "var(--bg3)",
  border: "1px solid var(--border2)",
  borderRadius: 4,
  color: "var(--text)",
  fontSize: 14,
  fontFamily: "var(--sans)",
};

const btnStyle: React.CSSProperties = {
  padding: "10px 20px",
  background: "var(--gold)",
  color: "#080a0d",
  border: "none",
  borderRadius: 4,
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
  alignSelf: "flex-start",
};
