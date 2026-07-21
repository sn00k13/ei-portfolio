"use server";

import { revalidatePath } from "next/cache";
import { requireSection } from "@/require-section";
import { pool } from "@/db";

export async function markSubmissionRead(id: number, isRead: boolean) {
  await requireSection("submissions");
  await pool.query(`update contact_submissions set is_read = $1 where id = $2`, [isRead, id]);
  revalidatePath("/submissions");
}

export async function deleteSubmission(id: number) {
  await requireSection("submissions");
  await pool.query(`delete from contact_submissions where id = $1`, [id]);
  revalidatePath("/submissions");
}
