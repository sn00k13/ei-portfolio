import { prisma } from "@eui/db";

export async function logActivity(action: string, detail?: string, icon?: string) {
  await prisma.adminActivityLog.create({
    data: { action, detail: detail ?? null, icon: icon ?? null },
  });
}
