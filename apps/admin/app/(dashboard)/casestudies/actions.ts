"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSection } from "@/require-section";
import { crudInsert, crudUpdate, crudDelete } from "@/db";

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
    outcomes,
    displayOrder: Number(formData.get("displayOrder") || 0),
  };

  if (id) {
    await crudUpdate("case_studies", id, data);
  } else {
    await crudInsert("case_studies", data);
  }

  revalidatePath("/casestudies");
  redirect("/casestudies");
}

export async function deleteCaseStudy(id: number) {
  await requireSection("casestudies");
  await crudDelete("case_studies", id);
  revalidatePath("/casestudies");
}
