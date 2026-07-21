"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSection } from "@/require-section";
import { uploadToBucket, BLOG_IMAGES_BUCKET } from "@/storage";
import { crudInsert, crudUpdate, crudDelete, isUniqueViolation } from "@/db";
import type { CrudConfig, FieldDef } from "./types";

function coerceValue(field: FieldDef, raw: FormDataEntryValue | null): unknown {
  const str = typeof raw === "string" ? raw.trim() : "";
  switch (field.type) {
    case "number":
      return str === "" ? 0 : Number(str);
    case "checkbox":
      return raw === "on" || raw === "true";
    case "tags":
      return str
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    case "date":
      return str ? new Date(str) : null;
    case "json":
      if (!str) return {};
      try {
        return JSON.parse(str);
      } catch {
        throw new Error(`Invalid JSON in "${field.label}"`);
      }
    default:
      return str === "" ? null : str;
  }
}

export type CrudFormState = { error?: string } | undefined;

/**
 * Bind a CrudConfig to get a (prevState, formData) action usable with
 * useActionState: `genericSave.bind(null, config)`.
 */
export async function genericSave(
  config: CrudConfig,
  _prevState: CrudFormState,
  formData: FormData
): Promise<CrudFormState> {
  await requireSection(config.sectionId);

  const idRaw = formData.get("id");
  const id = idRaw ? Number(idRaw) : undefined;

  const data: Record<string, unknown> = {};
  try {
    for (const field of config.fields) {
      if (field.type === "image") {
        const file = formData.get(`${field.name}__file`);
        if (file && typeof file !== "string" && file.size > 0) {
          data[field.name] = await uploadToBucket(BLOG_IMAGES_BUCKET, file);
        } else {
          const existing = formData.get(field.name);
          data[field.name] = typeof existing === "string" && existing.trim() ? existing.trim() : null;
        }
        continue;
      }
      data[field.name] = coerceValue(field, formData.get(field.name));
    }
  } catch (err: any) {
    return { error: err.message ?? "Invalid form data." };
  }

  try {
    if (id) {
      await crudUpdate(config.tableName, id, data);
    } else {
      await crudInsert(config.tableName, data);
    }
  } catch (err: unknown) {
    if (isUniqueViolation(err)) {
      return { error: `An entry with that ${config.titleField} already exists.` };
    }
    throw err;
  }

  revalidatePath(config.routeBase);
  redirect(config.routeBase);
}

/** Bind a CrudConfig: `genericDelete.bind(null, config)`. */
export async function genericDelete(config: CrudConfig, id: number) {
  await requireSection(config.sectionId);
  await crudDelete(config.tableName, id);
  revalidatePath(config.routeBase);
}
