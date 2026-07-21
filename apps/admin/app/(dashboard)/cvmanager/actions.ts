"use server";

import { requireSection } from "@/require-section";
import { uploadToBucket, deleteFromBucket, CV_FILES_BUCKET } from "@/storage";
import { logActivity } from "@/activity-log";
import { pool, toCamelCase } from "@/db";
import { revalidatePath } from "next/cache";

interface CvFileRow {
  id: string;
  cvType: string;
  fileUrl: string | null;
}

export async function uploadCv(formData: FormData) {
  await requireSection("cvmanager");

  const cvType = String(formData.get("cvType") ?? "").trim();
  const file = formData.get("file") as File | null;
  if (!cvType || !file || file.size === 0) return;

  const fileUrl = await uploadToBucket(CV_FILES_BUCKET, file);

  const { rows } = await pool.query(`select * from cv_files where cv_type = $1 limit 1`, [cvType]);
  const existing = rows[0] ? toCamelCase<CvFileRow>(rows[0]) : null;

  if (existing) {
    if (existing.fileUrl) {
      const oldName = existing.fileUrl.split("/").pop();
      if (oldName) await deleteFromBucket(CV_FILES_BUCKET, oldName).catch(() => {});
    }
    await pool.query(
      `update cv_files set filename = $1, file_url = $2, uploaded_at = now() where id = $3`,
      [file.name, fileUrl, existing.id]
    );
  } else {
    await pool.query(
      `insert into cv_files (cv_type, filename, file_url, uploaded_at) values ($1, $2, $3, now())`,
      [cvType, file.name, fileUrl]
    );
  }

  await logActivity("CV uploaded", `${cvType}: ${file.name}`, "📄");
  revalidatePath("/cvmanager");
}

export async function deleteCv(id: number) {
  await requireSection("cvmanager");
  const { rows } = await pool.query(`select * from cv_files where id = $1`, [id]);
  const row = rows[0] ? toCamelCase<CvFileRow>(rows[0]) : null;
  if (!row) return;
  if (row.fileUrl) {
    const name = row.fileUrl.split("/").pop();
    if (name) await deleteFromBucket(CV_FILES_BUCKET, name).catch(() => {});
  }
  await pool.query(`delete from cv_files where id = $1`, [id]);
  await logActivity("CV deleted", row.cvType, "🗑");
  revalidatePath("/cvmanager");
}
