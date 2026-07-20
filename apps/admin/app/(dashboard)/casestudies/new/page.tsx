import { requireSection } from "@/require-section";
import { CaseStudyForm } from "../case-form";

export const dynamic = "force-dynamic";

export default async function NewCaseStudyPage() {
  await requireSection("casestudies");
  return (
    <div>
      <h1 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 28, marginBottom: 20 }}>
        New Case Study
      </h1>
      <CaseStudyForm value={null} />
    </div>
  );
}
