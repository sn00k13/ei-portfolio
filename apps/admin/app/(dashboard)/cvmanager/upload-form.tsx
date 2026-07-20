"use client";

import { useRef, useState, useTransition } from "react";
import { uploadCv } from "./actions";
import { useRouter } from "next/navigation";

const CV_TYPES = [
  { value: "general", label: "General CV" },
  { value: "cybersecurity", label: "Cybersecurity CV" },
  { value: "product", label: "Product / QA CV" },
  { value: "founder", label: "Founder / Leadership CV" },
];

export function UploadCvForm() {
  const [pending, startTransition] = useTransition();
  const [cvType, setCvType] = useState("general");
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  return (
    <form
      ref={formRef}
      action={(fd) => startTransition(async () => {
        await uploadCv(fd);
        formRef.current?.reset();
        router.refresh();
      })}
      style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}
    >
      <select
        name="cvType"
        value={cvType}
        onChange={(e) => setCvType(e.target.value)}
        style={{
          padding: "8px 10px",
          background: "var(--bg3)",
          border: "1px solid var(--border2)",
          borderRadius: 4,
          color: "var(--text)",
          fontSize: 13,
        }}
      >
        {CV_TYPES.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>
      <input type="file" name="file" accept=".pdf,.doc,.docx" required style={{ fontSize: 13, color: "var(--text)" }} />
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
    </form>
  );
}
