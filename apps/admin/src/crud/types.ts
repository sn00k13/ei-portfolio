export interface FieldDef {
  /** camelCase; converted to the snake_case column name automatically. */
  name: string;
  label: string;
  type: "text" | "textarea" | "url" | "number" | "checkbox" | "select" | "tags" | "date" | "json" | "image";
  options?: string[];
  required?: boolean;
}

export interface CrudConfig {
  /** Matches an id in ADMIN_SECTIONS (@eui/shared). */
  sectionId: string;
  /** Real Postgres table name, e.g. "events", "speaking_cards". */
  tableName: string;
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
