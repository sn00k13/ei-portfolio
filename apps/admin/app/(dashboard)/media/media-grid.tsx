"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { uploadMedia, deleteMedia } from "./actions";

interface MediaItem {
  name: string;
  url: string;
  size?: number;
  createdAt?: string;
}

export function MediaGrid({ items }: { items: MediaItem[] }) {
  const [pending, startTransition] = useTransition();
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  return (
    <div>
      <form
        ref={formRef}
        action={(fd) => startTransition(async () => {
          await uploadMedia(fd);
          formRef.current?.reset();
          router.refresh();
        })}
        style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}
      >
        <input type="file" name="files" accept="image/*" multiple required style={{ fontSize: 13, color: "var(--text)" }} />
        <button
          type="submit"
          disabled={pending}
          style={{
            padding: "8px 16px",
            background: "var(--gold)",
            color: "#080a0d",
            border: "none",
            borderRadius: 4,
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          {pending ? "Uploading…" : "Upload"}
        </button>
        <span style={{ color: "var(--muted2)", fontSize: 12 }}>{items.length} file(s)</span>
      </form>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
        {items.map((item) => (
          <div key={item.name} style={{ border: "1px solid var(--border2)", borderRadius: 6, overflow: "hidden" }}>
            <img
              src={item.url}
              alt={item.name}
              style={{ width: "100%", height: 110, objectFit: "cover", cursor: "pointer" }}
              onClick={async () => {
                await navigator.clipboard.writeText(item.url);
                setCopiedName(item.name);
                setTimeout(() => setCopiedName(null), 1500);
              }}
            />
            <div style={{ padding: 8, fontSize: 11 }}>
              <div style={{ color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {item.name}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                <span style={{ color: "var(--teal)" }}>{copiedName === item.name ? "Copied!" : "Click to copy URL"}</span>
                <button
                  type="button"
                  onClick={() => {
                    if (!confirm("Delete this image?")) return;
                    startTransition(async () => {
                      await deleteMedia(item.name);
                      router.refresh();
                    });
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--red)",
                    cursor: "pointer",
                    fontSize: 11,
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p style={{ color: "var(--muted)", fontSize: 13 }}>No images uploaded yet.</p>}
      </div>
    </div>
  );
}
