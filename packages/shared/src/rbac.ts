export type SectionGroup = "Dashboard" | "Content" | "Portfolio" | "Audience" | "System";

export interface AdminSection {
  id: string;
  label: string;
  group: SectionGroup;
}

/**
 * Canonical list of admin-manageable sections. This is the single source of
 * truth for admin nav, route guards (middleware), and Server Action
 * permission checks — replaces the duplicated ALL_SECTIONS/nav-group labels
 * that had drifted apart in the old dashboard.html.
 */
export const ADMIN_SECTIONS: AdminSection[] = [
  { id: "overview", label: "Overview", group: "Dashboard" },

  { id: "blog", label: "Blog", group: "Content" },
  { id: "events", label: "Events", group: "Content" },
  { id: "speaking", label: "Speaking & Media", group: "Content" },
  { id: "casestudies", label: "Case Studies", group: "Content" },
  { id: "testimonials", label: "Testimonials", group: "Content" },
  { id: "content", label: "Site Content", group: "Content" },
  { id: "assessments", label: "Assessments", group: "Content" },
  { id: "certifications", label: "Certifications", group: "Content" },

  { id: "products", label: "Products", group: "Portfolio" },
  { id: "pmprojects", label: "PM Projects", group: "Portfolio" },
  { id: "qaproducts", label: "QA Products", group: "Portfolio" },
  { id: "ventures", label: "Ventures", group: "Portfolio" },
  { id: "tools", label: "Tools Built", group: "Portfolio" },
  { id: "cvmanager", label: "CV Manager", group: "Portfolio" },

  { id: "submissions", label: "Submissions", group: "Audience" },
  { id: "newsletter", label: "Newsletter", group: "Audience" },
  { id: "calendar", label: "Calendar", group: "Audience" },
  { id: "media", label: "Media Library", group: "Audience" },
  { id: "analytics", label: "Analytics", group: "Audience" },

  { id: "activitylog", label: "Activity Log", group: "System" },
  { id: "adminusers", label: "Admin Users", group: "System" },
  { id: "settings", label: "Settings", group: "System" },
] as const;

export const ALL_SECTION_IDS: string[] = ADMIN_SECTIONS.map((s) => s.id);

export type AdminRole = "super_admin" | "admin" | "editor" | "custom";

/**
 * Default permission sets applied when an admin_users row is created with a
 * given role. `custom` starts empty — the creator hand-picks sections.
 * super_admin/admin still carry an explicit permissions array (not just role
 * checks) so every authorization decision goes through the same
 * `hasPermission()` check, super_admin included.
 */
export const ROLE_PRESETS: Record<AdminRole, string[]> = {
  super_admin: ALL_SECTION_IDS,
  admin: ALL_SECTION_IDS.filter((id) => id !== "adminusers"),
  editor: ["overview", "blog", "events", "speaking", "testimonials", "casestudies", "media", "content"],
  custom: [],
};

export interface AdminSessionLike {
  role: AdminRole;
  permissions: string[];
}

/** Server-side permission check — must be called on every route/action, not just for UI hiding. */
export function hasPermission(session: AdminSessionLike | null | undefined, sectionId: string): boolean {
  if (!session) return false;
  if (session.role === "super_admin") return true;
  return session.permissions.includes(sectionId);
}
