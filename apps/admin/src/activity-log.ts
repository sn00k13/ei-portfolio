import { pool } from "./db";

export async function logActivity(action: string, detail?: string, icon?: string) {
  await pool.query(
    `insert into admin_activity_log (action, detail, icon) values ($1, $2, $3)`,
    [action, detail ?? null, icon ?? null]
  );
}
