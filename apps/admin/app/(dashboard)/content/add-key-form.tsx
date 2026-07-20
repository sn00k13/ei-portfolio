"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveSiteContentKey } from "./actions";

export function AddKeyForm() {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
      <input
        placeholder="new_content_key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        style={{ ...inputStyle, width: 220 }}
      />
      <input
        placeholder="Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ ...inputStyle, flex: 1 }}
      />
      <button
        type="button"
        disabled={pending || !key.trim()}
        onClick={() =>
          startTransition(async () => {
            await saveSiteContentKey(key.trim(), value);
            setKey("");
            setValue("");
            router.refresh();
          })
        }
        style={{
          padding: "8px 14px",
          background: "var(--bg3)",
          border: "1px solid var(--border2)",
          borderRadius: 4,
          color: "var(--text)",
          fontSize: 13,
          cursor: "pointer",
        }}
      >
        Add key
      </button>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "8px 10px",
  background: "var(--bg3)",
  border: "1px solid var(--border2)",
  borderRadius: 4,
  color: "var(--text)",
  fontSize: 13,
};
