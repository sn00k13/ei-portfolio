"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteCv } from "./actions";

export function DeleteCvButton({ id }: { id: number }) {
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
        if (!confirm("Delete this CV file?")) return;
        startTransition(async () => {
          await deleteCv(id);
          router.refresh();
        });
      }}
    >
      {pending ? "…" : "Delete"}
    </button>
  );
}
