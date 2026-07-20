"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export function DeleteRowButton({ id, deleteAction }: { id: number; deleteAction: (id: number) => Promise<void> }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={pending}
      style={{
        background: "none",
        border: "1px solid rgba(224,92,74,0.4)",
        color: "var(--red)",
        borderRadius: 4,
        padding: "4px 8px",
        fontSize: 11,
        cursor: "pointer",
      }}
      onClick={() => {
        if (!confirm("Delete this entry? This cannot be undone.")) return;
        startTransition(async () => {
          await deleteAction(id);
          router.refresh();
        });
      }}
    >
      {pending ? "…" : "Delete"}
    </button>
  );
}
