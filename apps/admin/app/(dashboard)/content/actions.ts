"use server";

import { revalidatePath } from "next/cache";
import { requireSection } from "@/require-section";
import { pool } from "@/db";

/**
 * Ports the old dashboard's "save-old-value-before-overwrite" logic
 * (saveContentWithHistory in dashboard.html) as a single transaction —
 * there's no DB trigger for content_history, so this must run atomically
 * here instead.
 */
export async function saveSiteContentKey(key: string, value: string) {
  await requireSection("content");

  const client = await pool.connect();
  try {
    await client.query("begin");

    const { rows: existingRows } = await client.query(
      `select value from site_content where key = $1`,
      [key]
    );
    const existingValue = existingRows[0]?.value;
    if (existingValue != null) {
      await client.query(
        `insert into content_history (content_key, value) values ($1, $2)`,
        [key, existingValue]
      );
    }

    await client.query(
      `insert into site_content (key, value, updated_at) values ($1, $2, now())
       on conflict (key) do update set value = excluded.value, updated_at = now()`,
      [key, value]
    );

    await client.query("commit");
  } catch (err) {
    await client.query("rollback");
    throw err;
  } finally {
    client.release();
  }

  revalidatePath("/content");
}
