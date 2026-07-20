"use client";

import { useActionState } from "react";
import { changePassword } from "./actions";

export function PasswordForm() {
  const [state, formAction, pending] = useActionState(changePassword, undefined);

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 420 }}>
      {state?.error && <p style={{ color: "var(--red)", fontSize: 13, margin: 0 }}>{state.error}</p>}
      {state?.success && <p style={{ color: "var(--teal)", fontSize: 13, margin: 0 }}>{state.success}</p>}

      <input name="currentPassword" type="password" placeholder="Current password" required style={inputStyle} />
      <input name="newPassword" type="password" placeholder="New password (min 8 characters)" required style={inputStyle} />
      <input name="confirmPassword" type="password" placeholder="Confirm new password" required style={inputStyle} />

      <button type="submit" disabled={pending} style={btnStyle}>
        {pending ? "Saving…" : "Change Password"}
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
