"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [error, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <form
      action={formAction}
      style={{
        width: 320,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: 32,
        background: "var(--bg2)",
        border: "1px solid var(--border)",
        borderRadius: 8,
      }}
    >
      <h1
        style={{
          fontFamily: "var(--mono)",
          fontSize: 12,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--muted2)",
          margin: 0,
        }}
      >
        Admin Login
      </h1>

      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 13 }}>
        Username
        <input
          name="username"
          type="text"
          required
          autoComplete="username"
          style={inputStyle}
        />
      </label>

      <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 13 }}>
        Password
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          style={inputStyle}
        />
      </label>

      {error && (
        <p style={{ color: "var(--red)", fontSize: 13, margin: 0 }}>{error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        style={{
          marginTop: 8,
          padding: "10px 16px",
          background: "var(--gold)",
          color: "#080a0d",
          border: "none",
          borderRadius: 4,
          fontFamily: "var(--sans)",
          fontWeight: 600,
          cursor: pending ? "wait" : "pointer",
        }}
      >
        {pending ? "Signing in…" : "Sign in"}
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
