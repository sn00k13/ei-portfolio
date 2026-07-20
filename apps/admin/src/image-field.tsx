"use client";

import { useState } from "react";

export function ImageField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue: string;
}) {
  const [preview, setPreview] = useState(defaultValue);
  const [urlValue, setUrlValue] = useState(defaultValue);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
      <span style={{ color: "var(--muted2)" }}>{label}</span>
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt=""
          style={{ maxWidth: 180, maxHeight: 130, objectFit: "cover", borderRadius: 4, border: "1px solid var(--border2)" }}
        />
      )}
      <input type="hidden" name={name} value={urlValue} />
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type="file"
          name={`${name}__file`}
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setPreview(URL.createObjectURL(file));
          }}
          style={{ fontSize: 12, color: "var(--text)" }}
        />
        {preview && (
          <button
            type="button"
            onClick={() => {
              setPreview("");
              setUrlValue("");
            }}
            style={{ background: "none", border: "1px solid var(--border2)", color: "var(--muted2)", borderRadius: 4, padding: "4px 8px", fontSize: 11, cursor: "pointer" }}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
