import { notFound } from "next/navigation";
import { prisma } from "@eui/db";
import { requireSection } from "@/require-section";
import { CrudListPage } from "./List";
import { CrudForm } from "./Form";
import { genericSave, genericDelete } from "./actions";
import type { CrudConfig, CrudRow } from "./types";

export function buildListPage(config: CrudConfig) {
  return async function ListPage() {
    await requireSection(config.sectionId);
    const model = (prisma as any)[config.modelName];
    const rows = await model.findMany({ orderBy: config.orderBy });

    const crudRows: CrudRow[] = rows.map((r: any) => ({
      id: Number(r.id),
      title: r[config.titleField],
      subtitle: config.subtitleField ? r[config.subtitleField] ?? undefined : undefined,
      status: config.statusField ? r[config.statusField] ?? undefined : undefined,
    }));

    const deleteAction = genericDelete.bind(null, config);
    return <CrudListPage config={config} rows={crudRows} deleteAction={deleteAction} />;
  };
}

export function buildFormPage(config: CrudConfig) {
  return async function FormPage({ params }: { params?: Promise<{ id: string }> }) {
    await requireSection(config.sectionId);
    const model = (prisma as any)[config.modelName];

    let values: Record<string, unknown> & { id?: number } = {};
    if (params) {
      const { id } = await params;
      const row = await model.findUnique({ where: { id: BigInt(id) } });
      if (!row) notFound();
      values = { ...row, id: Number(row.id) };
    }

    const saveAction = genericSave.bind(null, config);

    return (
      <div>
        <h1 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 28, marginBottom: 20 }}>
          {values.id != null ? "Edit" : "New"} — {config.label}
        </h1>
        <CrudForm config={config} values={values} saveAction={saveAction} />
      </div>
    );
  };
}
