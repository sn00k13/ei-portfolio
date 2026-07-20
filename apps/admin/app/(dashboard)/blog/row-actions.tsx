"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteBlogPost, toggleBlogPostStatus } from "./actions";

const btnStyle: React.CSSProperties = {
  background: "none",
  border: "1px solid var(--border2)",
  color: "var(--muted2)",
  borderRadius: 4,
  padding: "4px 8px",
  fontSize: 11,
  cursor: "pointer",
  marginLeft: 6,
};

export function StatusToggleButton({ id, currentStatus }: { id: number; currentStatus: string }) {
  const [pending, startTransition] = useTransition();
  const next = currentStatus === "published" ? "draft" : "published";

  return (
    <button
      type="button"
      disabled={pending}
      style={btnStyle}
      onClick={() => startTransition(() => toggleBlogPostStatus(id, next))}
    >
      {pending ? "…" : next === "published" ? "Publish" : "Unpublish"}
    </button>
  );
}

export function DeleteButton({ id }: { id: number }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={pending}
      style={{ ...btnStyle, color: "var(--red)", borderColor: "rgba(224,92,74,0.4)" }}
      onClick={() => {
        if (!confirm("Delete this post? This cannot be undone.")) return;
        startTransition(async () => {
          await deleteBlogPost(id);
          router.refresh();
        });
      }}
    >
      {pending ? "…" : "Delete"}
    </button>
  );
}
