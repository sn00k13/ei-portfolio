"use server";

import { prisma } from "@eui/db";
import { requireSection } from "@/require-section";
import { uploadToBucket, deleteFromBucket, CV_FILES_BUCKET } from "@/storage";
import { logActivity } from "@/activity-log";
import { revalidatePath } from "next/cache";

export async function uploadCv(formData: FormData) {
  await requireSection("cvmanager");

  const cvType = String(formData.get("cvType") ?? "").trim();
  const file = formData.get("file") as File | null;
  if (!cvType || !file || file.size === 0) return;

  const fileUrl = await uploadToBucket(CV_FILES_BUCKET, file);

  const existing = await prisma.cvFile.findFirst({ where: { cvType } });
  if (existing) {
    if (existing.fileUrl) {
      const oldName = existing.fileUrl.split("/").pop();
      if (oldName) await deleteFromBucket(CV_FILES_BUCKET, oldName).catch(() => {});
    }
    await prisma.cvFile.update({
      where: { id: existing.id },
      data: { filename: file.name, fileUrl, uploadedAt: new Date() },
    });
  } else {
    await prisma.cvFile.create({
      data: { cvType, filename: file.name, fileUrl, uploadedAt: new Date() },
    });
  }

  await logActivity("CV uploaded", `${cvType}: ${file.name}`, "📄");
  revalidatePath("/cvmanager");
}

export async function deleteCv(id: number) {
  await requireSection("cvmanager");
  const row = await prisma.cvFile.findUnique({ where: { id: BigInt(id) } });
  if (!row) return;
  if (row.fileUrl) {
    const name = row.fileUrl.split("/").pop();
    if (name) await deleteFromBucket(CV_FILES_BUCKET, name).catch(() => {});
  }
  await prisma.cvFile.delete({ where: { id: BigInt(id) } });
  await logActivity("CV deleted", row.cvType, "🗑");
  revalidatePath("/cvmanager");
}
