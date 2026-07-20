"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addSubscriber, deleteSubscriber } from "./actions";

export function AddSubscriberForm() {
  const [email, setEmail] = useState("");
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      <input
        placeholder="email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: "8px 10px",
          background: "var(--bg3)",
          border: "1px solid var(--border2)",
          borderRadius: 4,
          color: "var(--text)",
          fontSize: 13,
          width: 260,
        }}
      />
      <button
        type="button"
        disabled={pending || !email.trim()}
        onClick={() =>
          startTransition(async () => {
            await addSubscriber(email);
            setEmail("");
            router.refresh();
          })
        }
        style={{
          padding: "8px 14px",
          background: "var(--gold)",
          color: "#080a0d",
          border: "none",
          borderRadius: 4,
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Add subscriber
      </button>
      <a
        href="/api/newsletter/export"
        style={{
          padding: "8px 14px",
          background: "var(--bg3)",
          border: "1px solid var(--border2)",
          borderRadius: 4,
          color: "var(--text)",
          fontSize: 13,
          textDecoration: "none",
        }}
      >
        Export CSV
      </a>
    </div>
  );
}

export function DeleteSubscriberButton({ id }: { id: number }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(async () => { await deleteSubscriber(id); router.refresh(); })}
      style={{
        background: "none",
        border: "1px solid rgba(224,92,74,0.4)",
        color: "var(--red)",
        borderRadius: 4,
        padding: "4px 8px",
        fontSize: 11,
        cursor: "pointer",
      }}
    >
      {pending ? "…" : "Delete"}
    </button>
  );
}
