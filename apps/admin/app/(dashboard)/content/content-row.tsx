"use client";

import { useState, useTransition } from "react";
import { saveSiteContentKey } from "./actions";

export function ContentRow({ contentKey, initialValue }: { contentKey: string; initialValue: string }) {
  const [value, setValue] = useState(initialValue);
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        padding: 16,
        background: "var(--bg2)",
        border: "1px solid var(--border)",
        borderRadius: 4,
      }}
    >
      <div style={{ fontSize: 12, fontFamily: "var(--mono)", color: "var(--gold)" }}>{contentKey}</div>
      <textarea
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setSaved(false);
        }}
        rows={value.length > 200 ? 6 : 2}
        style={{
          padding: "8px 10px",
          background: "var(--bg3)",
          border: "1px solid var(--border2)",
          borderRadius: 4,
          color: "var(--text)",
          fontSize: 13,
          fontFamily: "var(--sans)",
        }}
      />
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              await saveSiteContentKey(contentKey, value);
              setSaved(true);
            })
          }
          style={{
            padding: "6px 14px",
            background: "var(--gold)",
            color: "#080a0d",
            border: "none",
            borderRadius: 4,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            alignSelf: "flex-start",
          }}
        >
          {pending ? "Saving…" : "Save"}
        </button>
        {saved && !pending && <span style={{ fontSize: 12, color: "var(--teal)" }}>Saved (previous value archived to history)</span>}
      </div>
    </div>
  );
}
