"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveGoals } from "./actions";

interface Goals {
  views?: number;
  cvDownloads?: number;
  subscribers?: number;
  submissions?: number;
}

export function GoalsForm({ goals }: { goals: Goals }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <form
      action={(fd) => startTransition(async () => {
        await saveGoals(fd);
        router.refresh();
      })}
      style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 420 }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Page Views Target" name="goalViews" defaultValue={goals.views} />
        <Field label="CV Downloads Target" name="goalCVs" defaultValue={goals.cvDownloads} />
        <Field label="New Subscribers Target" name="goalSubs" defaultValue={goals.subscribers} />
        <Field label="Contact Submissions Target" name="goalSubmissions" defaultValue={goals.submissions} />
      </div>
      <button type="submit" disabled={pending} style={btnStyle}>
        {pending ? "Saving…" : "Save Goals"}
      </button>
    </form>
  );
}

function Field({ label, name, defaultValue }: { label: string; name: string; defaultValue?: number }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12 }}>
      <span style={{ color: "var(--muted2)" }}>{label}</span>
      <input name={name} type="number" defaultValue={defaultValue ?? ""} style={inputStyle} />
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "8px 10px",
  background: "var(--bg3)",
  border: "1px solid var(--border2)",
  borderRadius: 4,
  color: "var(--text)",
  fontSize: 14,
};

const btnStyle: React.CSSProperties = {
  padding: "10px 20px",
  background: "var(--gold)",
  color: "#080a0d",
  border: "none",
  borderRadius: 4,
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
  alignSelf: "flex-start",
};
