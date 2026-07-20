"use client";

import { useActionState, useState } from "react";
import { saveAdminUser } from "./actions";
import { ADMIN_SECTIONS, type AdminRole } from "@eui/shared";

export interface AdminUserFormValue {
  id?: number;
  username: string;
  displayName: string | null;
  email: string | null;
  role: AdminRole;
  status: string;
  permissions: string[];
}

export function AdminUserForm({ value }: { value: AdminUserFormValue | null }) {
  const [state, formAction, pending] = useActionState(saveAdminUser, undefined);
  const [role, setRole] = useState<AdminRole>(value?.role ?? "editor");
  const [permissions, setPermissions] = useState<string[]>(value?.permissions ?? []);

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 600 }}>
      {value?.id != null && <input type="hidden" name="id" value={value.id} />}

      {state?.error && <p style={{ color: "var(--red)", fontSize: 13, margin: 0 }}>{state.error}</p>}

      <Field label="Username">
        <input name="username" required defaultValue={value?.username ?? ""} style={inputStyle} />
      </Field>

      <Field label="Display name">
        <input name="displayName" defaultValue={value?.displayName ?? ""} style={inputStyle} />
      </Field>

      <Field label="Email">
        <input name="email" type="email" defaultValue={value?.email ?? ""} style={inputStyle} />
      </Field>

      <Field label={value?.id != null ? "New password (leave blank to keep current)" : "Password"}>
        <input name="password" type="password" style={inputStyle} required={value?.id == null} />
      </Field>

      <Field label="Role">
        <select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value as AdminRole)}
          style={inputStyle}
        >
          <option value="super_admin">Super Admin (all sections)</option>
          <option value="admin">Admin (all except Admin Users)</option>
          <option value="editor">Editor (content sections only)</option>
          <option value="custom">Custom (pick sections)</option>
        </select>
      </Field>

      <Field label="Status">
        <select name="status" defaultValue={value?.status ?? "active"} style={inputStyle}>
          <option value="active">Active</option>
          <option value="disabled">Disabled</option>
        </select>
      </Field>

      {role === "custom" && (
        <div>
          <span style={{ color: "var(--muted2)", fontSize: 13 }}>Permissions</span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 8,
              marginTop: 8,
            }}
          >
            {ADMIN_SECTIONS.map((s) => (
              <label key={s.id} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                <input
                  type="checkbox"
                  name="permissions"
                  value={s.id}
                  checked={permissions.includes(s.id)}
                  onChange={(e) =>
                    setPermissions((prev) =>
                      e.target.checked ? [...prev, s.id] : prev.filter((p) => p !== s.id)
                    )
                  }
                />
                {s.label}
              </label>
            ))}
          </div>
        </div>
      )}

      <button type="submit" disabled={pending} style={primaryBtnStyle}>
        {pending ? "Saving…" : value?.id != null ? "Save changes" : "Create user"}
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
