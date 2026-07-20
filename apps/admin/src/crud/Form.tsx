"use client";

import { useActionState } from "react";
import type { CrudConfig, FieldDef } from "./types";
import type { CrudFormState } from "./actions";
import { ImageField } from "@/image-field";

function toInputValue(field: FieldDef, value: unknown): string {
  if (value == null) return "";
  switch (field.type) {
    case "tags":
      return Array.isArray(value) ? value.join(", ") : "";
    case "json":
      return typeof value === "object" ? JSON.stringify(value, null, 2) : String(value);
    case "date":
      return typeof value === "string" ? value.slice(0, 10) : "";
    case "checkbox":
      return value ? "on" : "";
    default:
      return String(value);
  }
}

export function CrudForm({
  config,
  values,
  saveAction,
}: {
  config: CrudConfig;
  values: Record<string, unknown> & { id?: number };
  saveAction: (prevState: CrudFormState, formData: FormData) => Promise<CrudFormState>;
}) {
  const [state, formAction, pending] = useActionState(saveAction, undefined);

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 700 }}>
      {values.id != null && <input type="hidden" name="id" value={values.id} />}

      {state?.error && <p style={{ color: "var(--red)", fontSize: 13, margin: 0 }}>{state.error}</p>}

      {config.fields.map((field) => (
        <FieldInput key={field.name} field={field} defaultValue={toInputValue(field, values[field.name])} />
      ))}

      <button type="submit" disabled={pending} style={primaryBtnStyle}>
        {pending ? "Saving…" : values.id != null ? "Save changes" : "Create"}
      </button>
    </form>
  );
}

function FieldInput({ field, defaultValue }: { field: FieldDef; defaultValue: string }) {
  const label = (
    <span style={{ color: "var(--muted2)" }}>
      {field.label}
      {field.required && " *"}
    </span>
  );

  if (field.type === "image") {
    return <ImageField name={field.name} label={field.label} defaultValue={defaultValue} />;
  }

  if (field.type === "checkbox") {
    return (
      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
        <input type="checkbox" name={field.name} defaultChecked={defaultValue === "on"} />
        {field.label}
      </label>
    );
  }

  if (field.type === "textarea" || field.type === "json") {
    return (
      <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
        {label}
        <textarea
          name={field.name}
          defaultValue={defaultValue}
          required={field.required}
          rows={field.type === "json" ? 6 : 3}
          style={{ ...inputStyle, fontFamily: field.type === "json" ? "var(--mono)" : "var(--sans)" }}
        />
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
        {label}
        <select name={field.name} defaultValue={defaultValue} required={field.required} style={inputStyle}>
          <option value="" disabled>
            Select…
          </option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
      {label}
      <input
        name={field.name}
        type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
        defaultValue={defaultValue}
        required={field.required}
        style={inputStyle}
      />
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
