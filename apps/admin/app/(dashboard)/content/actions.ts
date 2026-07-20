"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@eui/db";
import { requireSection } from "@/require-section";

/**
 * Ports the old dashboard's "save-old-value-before-overwrite" logic
 * (saveContentWithHistory in dashboard.html) as a single transaction —
 * there's no DB trigger for content_history, so this must run atomically
 * here instead.
 */
export async function saveSiteContentKey(key: string, value: string) {
  await requireSection("content");

  await prisma.$transaction(async (tx) => {
    const existing = await tx.siteContent.findUnique({ where: { key } });
    if (existing?.value != null) {
      await tx.contentHistory.create({
        data: { contentKey: key, value: existing.value },
      });
    }
    await tx.siteContent.upsert({
      where: { key },
      update: { value, updatedAt: new Date() },
      create: { key, value },
    });
  });

  revalidatePath("/content");
}
