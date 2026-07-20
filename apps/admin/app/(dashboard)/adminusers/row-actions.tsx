"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteAdminUser } from "./actions";

export function DeleteUserButton({ id, disabled }: { id: number; disabled?: boolean }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={pending || disabled}
      title={disabled ? "You cannot delete your own account" : undefined}
      style={{
        background: "none",
        border: "1px solid rgba(224,92,74,0.4)",
        color: disabled ? "var(--muted)" : "var(--red)",
        borderRadius: 4,
        padding: "4px 8px",
        fontSize: 11,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      onClick={() => {
        if (!confirm("Delete this admin user?")) return;
        startTransition(async () => {
          await deleteAdminUser(id);
          router.refresh();
        });
      }}
    >
      {pending ? "…" : "Delete"}
    </button>
  );
}
