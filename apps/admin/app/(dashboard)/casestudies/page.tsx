import { requireSection } from "@/require-section";
import { crudFindMany } from "@/db";
import { CrudListPage } from "@/crud/List";
import { deleteCaseStudy } from "./actions";
import type { CrudRow } from "@/crud/types";

export const dynamic = "force-dynamic";

const config = {
  sectionId: "casestudies",
  tableName: "case_studies",
  routeBase: "/casestudies",
  label: "Case Studies",
  titleField: "title",
  fields: [],
  orderBy: { displayOrder: "asc" },
} as const;

export default async function CaseStudiesListPage() {
  await requireSection("casestudies");
  const rows = await crudFindMany(config.tableName, config.orderBy);

  const crudRows: CrudRow[] = rows.map((r) => ({
    id: Number(r.id),
    title: r.title,
    subtitle: r.tag ?? undefined,
  }));

  return <CrudListPage config={config as any} rows={crudRows} deleteAction={deleteCaseStudy} />;
}
