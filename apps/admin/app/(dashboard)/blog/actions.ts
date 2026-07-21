"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@eui/shared";
import { requireSection } from "@/require-section";
import { uploadToBucket, BLOG_IMAGES_BUCKET } from "@/storage";
import { pool, crudInsert, crudUpdate, crudDelete, isUniqueViolation } from "@/db";

const blogPostSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, "Title is required").max(300),
  slug: z.string().min(1).max(300).optional().or(z.literal("")),
  category: z.string().min(1, "Category is required"),
  coverImage: z.string().url().optional().or(z.literal("")),
  excerpt: z.string().max(500).optional().or(z.literal("")),
  content: z.string().min(1, "Content is required"),
  status: z.enum(["draft", "published", "scheduled"]),
  tags: z.string().optional(), // comma-separated in the form, split below
  seoDescription: z.string().max(300).optional().or(z.literal("")),
  ogImage: z.string().url().optional().or(z.literal("")),
  isFeatured: z.coerce.boolean().optional(),
  publishedAt: z.string().optional().or(z.literal("")),
});

export type BlogFormState = { error?: string } | undefined;

export async function saveBlogPost(_prevState: BlogFormState, formData: FormData): Promise<BlogFormState> {
  await requireSection("blog");

  const raw = Object.fromEntries(formData.entries()) as Record<string, unknown>;

  const coverImageFile = formData.get("coverImage__file");
  if (coverImageFile && typeof coverImageFile !== "string" && coverImageFile.size > 0) {
    raw.coverImage = await uploadToBucket(BLOG_IMAGES_BUCKET, coverImageFile);
  }
  const ogImageFile = formData.get("ogImage__file");
  if (ogImageFile && typeof ogImageFile !== "string" && ogImageFile.size > 0) {
    raw.ogImage = await uploadToBucket(BLOG_IMAGES_BUCKET, ogImageFile);
  }

  const parsed = blogPostSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data." };
  }
  const data = parsed.data;

  const tags = (data.tags ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const slug = data.slug?.trim() ? slugify(data.slug) : slugify(data.title);

  const payload = {
    title: data.title,
    slug,
    category: data.category,
    coverImage: data.coverImage || null,
    excerpt: data.excerpt || null,
    content: data.content,
    status: data.status,
    tags,
    seoDescription: data.seoDescription || null,
    ogImage: data.ogImage || null,
    isFeatured: data.isFeatured ?? false,
    publishedAt: data.publishedAt ? new Date(data.publishedAt) : data.status === "published" ? new Date() : null,
    updatedAt: new Date(),
  };

  try {
    if (data.id) {
      await crudUpdate("blog_posts", data.id, payload);
    } else {
      await crudInsert("blog_posts", payload);
    }
  } catch (err: unknown) {
    if (isUniqueViolation(err)) {
      return { error: "A post with that title or slug already exists." };
    }
    throw err;
  }

  revalidatePath("/blog");
  redirect("/blog");
}

export async function deleteBlogPost(id: number) {
  await requireSection("blog");
  await crudDelete("blog_posts", id);
  revalidatePath("/blog");
}

export async function toggleBlogPostStatus(id: number, nextStatus: "draft" | "published") {
  await requireSection("blog");
  if (nextStatus === "published") {
    await pool.query(
      `update blog_posts set status = $1, published_at = now(), updated_at = now() where id = $2`,
      [nextStatus, id]
    );
  } else {
    // Leave published_at untouched when un-publishing, matching the
    // original Prisma behavior (undefined field = no-op, not a clear).
    await pool.query(`update blog_posts set status = $1, updated_at = now() where id = $2`, [nextStatus, id]);
  }
  revalidatePath("/blog");
}

export async function addBlogCategory(name: string) {
  await requireSection("blog");
  const trimmed = name.trim();
  if (!trimmed) return;
  await pool.query(
    `insert into blog_categories (name) values ($1) on conflict (name) do nothing`,
    [trimmed]
  );
  revalidatePath("/blog");
}
