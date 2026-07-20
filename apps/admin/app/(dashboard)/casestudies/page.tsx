import { prisma } from "@eui/db";
import { requireSection } from "@/require-section";
import { CrudListPage } from "@/crud/List";
import { deleteCaseStudy } from "./actions";
import type { CrudRow } from "@/crud/types";

export const dynamic = "force-dynamic";

const config = {
  sectionId: "casestudies",
  modelName: "caseStudy",
  routeBase: "/casestudies",
  label: "Case Studies",
  titleField: "title",
  fields: [],
  orderBy: {},
} as const;

export default async function CaseStudiesListPage() {
  await requireSection("casestudies");
  const rows = await prisma.caseStudy.findMany({ orderBy: { displayOrder: "asc" } });

  const crudRows: CrudRow[] = rows.map((r) => ({
    id: Number(r.id),
    title: r.title,
    subtitle: r.tag ?? undefined,
  }));

  return <CrudListPage config={config as any} rows={crudRows} deleteAction={deleteCaseStudy} />;
}
