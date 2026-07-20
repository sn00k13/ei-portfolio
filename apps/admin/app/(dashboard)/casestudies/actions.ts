"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@eui/db";
import { requireSection } from "@/require-section";

export type CaseStudyFormState = { error?: string } | undefined;

function parseTags(value: FormDataEntryValue | null): string[] {
  return typeof value === "string"
    ? value.split(",").map((t) => t.trim()).filter(Boolean)
    : [];
}

export async function saveCaseStudy(
  _prevState: CaseStudyFormState,
  formData: FormData
): Promise<CaseStudyFormState> {
  await requireSection("casestudies");

  const idRaw = formData.get("id");
  const id = idRaw ? Number(idRaw) : undefined;
  const title = (formData.get("title") as string)?.trim();
  if (!title) return { error: "Title is required." };

  const outcomesRaw = (formData.get("outcomes") as string)?.trim();
  let outcomes: unknown = null;
  if (outcomesRaw) {
    try {
      outcomes = JSON.parse(outcomesRaw);
    } catch {
      return { error: "Outcomes must be valid JSON." };
    }
  }

  const data = {
    title,
    tag: (formData.get("tag") as string) || null,
    label: (formData.get("label") as string) || null,
    challenge: (formData.get("challenge") as string) || null,
    results: parseTags(formData.get("results")),
    techStack: parseTags(formData.get("techStack")),
    fullDetails: (formData.get("fullDetails") as string) || null,
    outcomes: outcomes as any,
    displayOrder: Number(formData.get("displayOrder") || 0),
  };

  if (id) {
    await prisma.caseStudy.update({ where: { id: BigInt(id) }, data });
  } else {
    await prisma.caseStudy.create({ data });
  }

  revalidatePath("/casestudies");
  redirect("/casestudies");
}

export async function deleteCaseStudy(id: number) {
  await requireSection("casestudies");
  await prisma.caseStudy.delete({ where: { id: BigInt(id) } });
  revalidatePath("/casestudies");
}
