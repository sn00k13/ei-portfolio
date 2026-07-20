"use server";

import { requireSection } from "@/require-section";
import { uploadToBucket, deleteFromBucket, BLOG_IMAGES_BUCKET } from "@/storage";
import { logActivity } from "@/activity-log";
import { revalidatePath } from "next/cache";

export async function uploadMedia(formData: FormData) {
  await requireSection("media");
  const files = formData.getAll("files") as File[];
  for (const file of files) {
    if (!file || file.size === 0) continue;
    await uploadToBucket(BLOG_IMAGES_BUCKET, file);
  }
  await logActivity("Media uploaded", `${files.length} file(s)`, "🖼");
  revalidatePath("/media");
}

export async function deleteMedia(name: string) {
  await requireSection("media");
  await deleteFromBucket(BLOG_IMAGES_BUCKET, name);
  await logActivity("Media deleted", name, "🗑");
  revalidatePath("/media");
}
