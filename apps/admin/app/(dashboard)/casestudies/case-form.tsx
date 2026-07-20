"use client";

import { useActionState, useState } from "react";
import { saveCaseStudy } from "./actions";
import { TiptapEditor } from "@/rich-text/tiptap-editor";

export interface CaseStudyFormValue {
  id?: number;
  title: string;
  tag: string | null;
  label: string | null;
  challenge: string | null;
  results: string[];
  techStack: string[];
  fullDetails: string | null;
  outcomes: unknown;
  displayOrder: number;
}

export function CaseStudyForm({ value }: { value: CaseStudyFormValue | null }) {
  const [state, formAction, pending] = useActionState(saveCaseStudy, undefined);
  const [fullDetails, setFullDetails] = useState(value?.fullDetails ?? "");

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 780 }}>
      {value?.id != null && <input type="hidden" name="id" value={value.id} />}

      {state?.error && <p style={{ color: "var(--red)", fontSize: 13, margin: 0 }}>{state.error}</p>}

      <Field label="Title">
        <input name="title" required defaultValue={value?.title ?? ""} style={inputStyle} />
      </Field>

      <div style={{ display: "flex", gap: 16 }}>
        <Field label="Tag">
          <input name="tag" defaultValue={value?.tag ?? ""} style={inputStyle} />
        </Field>
        <Field label="Label">
          <input name="label" defaultValue={value?.label ?? ""} style={inputStyle} />
        </Field>
      </div>

      <Field label="Challenge">
        <textarea name="challenge" defaultValue={value?.challenge ?? ""} rows={3} style={inputStyle} />
      </Field>

      <Field label="Results (comma-separated)">
        <input name="results" defaultValue={value?.results?.join(", ") ?? ""} style={inputStyle} />
      </Field>

      <Field label="Tech stack (comma-separated)">
        <input name="techStack" defaultValue={value?.techStack?.join(", ") ?? ""} style={inputStyle} />
      </Field>

      <Field label="Full details">
        <TiptapEditor initialContent={fullDetails} onChange={setFullDetails} />
        <input type="hidden" name="fullDetails" value={fullDetails} />
      </Field>

      <Field label="Outcomes (JSON, optional)">
        <textarea
          name="outcomes"
          defaultValue={value?.outcomes ? JSON.stringify(value.outcomes, null, 2) : ""}
          rows={5}
          style={{ ...inputStyle, fontFamily: "var(--mono)" }}
        />
      </Field>

      <Field label="Display order">
        <input name="displayOrder" type="number" defaultValue={value?.displayOrder ?? 0} style={inputStyle} />
      </Field>

      <button type="submit" disabled={pending} style={primaryBtnStyle}>
        {pending ? "Saving…" : value?.id != null ? "Save changes" : "Create"}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
      <span style={{ color: "var(--muted2)" }}>{label}</span>
      {children}
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
  fontFamily: "var(--sans)",
};

const primaryBtnStyle: React.CSSProperties = {
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
