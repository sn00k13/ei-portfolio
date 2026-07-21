import { Pool } from "pg";

/**
 * Plain `pg` data layer for apps/admin — Prisma is fully removed from this
 * app. Its generated client (WASM query compiler, engineType = "client")
 * never reliably reached Netlify's deployed function bundle across five
 * separate, individually-correct fix attempts (native binary targets, file
 * tracing, included_files, a build-time copy step, output: standalone).
 * apps/web hit the exact same wall and was migrated first; this mirrors
 * that fix. Plain `pg` has no engine of any kind to lose — nothing is
 * loaded from a computed runtime path, so there's nothing for any
 * bundler's packaging step to miss.
 */
const globalForPool = globalThis as unknown as { pgPool?: Pool };

export const pool =
  globalForPool.pgPool ?? new Pool({ connectionString: process.env.DATABASE_URL });

if (process.env.NODE_ENV !== "production") {
  globalForPool.pgPool = pool;
}

/** snake_case DB row -> camelCase JS object. Shallow; values pass through as-is. */
export function toCamelCase<T = any>(row: Record<string, any>): T {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(row)) {
    const camelKey = k.replace(/_([a-z0-9])/g, (_, c: string) => c.toUpperCase());
    out[camelKey] = v;
  }
  return out as T;
}

export function toCamelCaseRows<T = any>(rows: Record<string, any>[]): T[] {
  return rows.map((r) => toCamelCase<T>(r));
}

export function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
}

/** JS values need JSON.stringify for jsonb columns; pg does not do this automatically. */
function serializeValue(v: unknown): unknown {
  if (v instanceof Date) return v;
  if (v !== null && typeof v === "object" && !Array.isArray(v)) return JSON.stringify(v);
  return v;
}

// ── Generic CRUD engine SQL — table/column names only ever come from our
// own CrudConfig definitions (apps/admin/src/crud/configs.ts), never from
// request data, so string interpolation here is safe despite not being
// parameterized the way values are. ───────────────────────────────────

export async function crudFindMany(
  tableName: string,
  orderBy: Record<string, "asc" | "desc">
): Promise<Record<string, any>[]> {
  const orderClauses = Object.entries(orderBy)
    .map(([k, dir]) => `"${toSnakeCase(k)}" ${dir}`)
    .join(", ");
  const sql = `select * from "${tableName}"${orderClauses ? ` order by ${orderClauses}` : ""}`;
  const { rows } = await pool.query(sql);
  return toCamelCaseRows(rows);
}

export async function crudFindById(tableName: string, id: number): Promise<Record<string, any> | null> {
  const { rows } = await pool.query(`select * from "${tableName}" where id = $1`, [id]);
  return rows[0] ? toCamelCase(rows[0]) : null;
}

export async function crudInsert(tableName: string, data: Record<string, unknown>): Promise<void> {
  const keys = Object.keys(data);
  const columns = keys.map((k) => `"${toSnakeCase(k)}"`);
  const placeholders = keys.map((_, i) => `$${i + 1}`);
  const values = keys.map((k) => serializeValue(data[k]));
  const sql = `insert into "${tableName}" (${columns.join(", ")}) values (${placeholders.join(", ")})`;
  await pool.query(sql, values);
}

export async function crudUpdate(tableName: string, id: number, data: Record<string, unknown>): Promise<void> {
  const keys = Object.keys(data);
  const setClauses = keys.map((k, i) => `"${toSnakeCase(k)}" = $${i + 1}`);
  const values = keys.map((k) => serializeValue(data[k]));
  const sql = `update "${tableName}" set ${setClauses.join(", ")} where id = $${keys.length + 1}`;
  await pool.query(sql, [...values, id]);
}

export async function crudDelete(tableName: string, id: number): Promise<void> {
  await pool.query(`delete from "${tableName}" where id = $1`, [id]);
}

/** Postgres unique_violation error code (Prisma's P2002 equivalent). */
export function isUniqueViolation(err: unknown): boolean {
  return typeof err === "object" && err !== null && (err as { code?: string }).code === "23505";
}
