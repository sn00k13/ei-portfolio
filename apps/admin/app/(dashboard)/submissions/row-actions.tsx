"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { markSubmissionRead, deleteSubmission } from "./actions";

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

export function ReadToggle({ id, isRead }: { id: number; isRead: boolean }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <button
      type="button"
      disabled={pending}
      style={btnStyle}
      onClick={() => startTransition(async () => { await markSubmissionRead(id, !isRead); router.refresh(); })}
    >
      {pending ? "…" : isRead ? "Mark unread" : "Mark read"}
    </button>
  );
}

export function DeleteSubmissionButton({ id }: { id: number }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <button
      type="button"
      disabled={pending}
      style={{ ...btnStyle, color: "var(--red)", borderColor: "rgba(224,92,74,0.4)" }}
      onClick={() => {
        if (!confirm("Delete this submission?")) return;
        startTransition(async () => { await deleteSubmission(id); router.refresh(); });
      }}
    >
      {pending ? "…" : "Delete"}
    </button>
  );
}
