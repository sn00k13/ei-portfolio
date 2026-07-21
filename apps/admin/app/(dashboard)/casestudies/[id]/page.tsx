import { notFound } from "next/navigation";
import { requireSection } from "@/require-section";
import { crudFindById } from "@/db";
import { CaseStudyForm } from "../case-form";

export const dynamic = "force-dynamic";

export default async function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  await requireSection("casestudies");
  const { id } = await params;
  const row = await crudFindById("case_studies", Number(id));
  if (!row) notFound();

  return (
    <div>
      <h1 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 28, marginBottom: 20 }}>
        Edit Case Study
      </h1>
      <CaseStudyForm
        value={{
          id: Number(row.id),
          title: row.title,
          tag: row.tag,
          label: row.label,
          challenge: row.challenge,
          results: row.results,
          techStack: row.techStack,
          fullDetails: row.fullDetails,
          outcomes: row.outcomes,
          displayOrder: row.displayOrder ?? 0,
        }}
      />
    </div>
  );
}
