import { notFound } from "next/navigation";
import { prisma } from "@eui/db";
import { requireSection } from "@/require-section";
import { CaseStudyForm } from "../case-form";

export const dynamic = "force-dynamic";

export default async function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  await requireSection("casestudies");
  const { id } = await params;
  const row = await prisma.caseStudy.findUnique({ where: { id: BigInt(id) } });
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
