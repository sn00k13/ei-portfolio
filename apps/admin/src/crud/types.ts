export interface FieldDef {
  /** Must match the Prisma model field name (camelCase). */
  name: string;
  label: string;
  type: "text" | "textarea" | "url" | "number" | "checkbox" | "select" | "tags" | "date" | "json" | "image";
  options?: string[];
  required?: boolean;
}

export interface CrudConfig {
  /** Matches an id in ADMIN_SECTIONS (@eui/shared). */
  sectionId: string;
  /** Prisma client property name, e.g. "event", "speakingCard". */
  modelName: string;
  /** Route base, e.g. "/events". */
  routeBase: string;
  label: string;
  titleField: string;
  subtitleField?: string;
  statusField?: string;
  orderBy: Record<string, "asc" | "desc">;
  fields: FieldDef[];
}

export interface CrudRow {
  id: number;
  title: string;
  subtitle?: string;
  status?: string;
}
