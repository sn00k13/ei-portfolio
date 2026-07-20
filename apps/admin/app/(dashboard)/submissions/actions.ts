"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@eui/db";
import { requireSection } from "@/require-section";

export async function markSubmissionRead(id: number, isRead: boolean) {
  await requireSection("submissions");
  await prisma.contactSubmission.update({ where: { id: BigInt(id) }, data: { isRead } });
  revalidatePath("/submissions");
}

export async function deleteSubmission(id: number) {
  await requireSection("submissions");
  await prisma.contactSubmission.delete({ where: { id: BigInt(id) } });
  revalidatePath("/submissions");
}
