"use client";

import { useActionState, useState } from "react";
import { saveBlogPost, addBlogCategory } from "./actions";
import { TiptapEditor } from "@/rich-text/tiptap-editor";
import { ImageField } from "@/image-field";
import { slugify } from "@eui/shared";

export interface BlogFormPost {
  id?: number;
  title: string;
  slug: string | null;
  category: string;
  coverImage: string | null;
  excerpt: string | null;
  content: string;
  status: string;
  tags: string[];
  seoDescription: string | null;
  ogImage: string | null;
  isFeatured: boolean;
  publishedAt: string | null; // ISO string
}

export function BlogForm({ post, categories }: { post: BlogFormPost | null; categories: string[] }) {
  const [state, formAction, pending] = useActionState(saveBlogPost, undefined);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [categoryList, setCategoryList] = useState(categories);
  const [newCategory, setNewCategory] = useState("");

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 780 }}>
      {post?.id && <input type="hidden" name="id" value={post.id} />}

      {state?.error && (
        <p style={{ color: "var(--red)", fontSize: 13, margin: 0 }}>{state.error}</p>
      )}

      <Field label="Title">
        <input
          name="title"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!post?.id) setSlug(slugify(e.target.value));
          }}
          style={inputStyle}
        />
      </Field>

      <Field label="Slug">
        <input
          name="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder={slugify(title) || "auto-generated-from-title"}
          style={inputStyle}
        />
      </Field>

      <Field label="Category">
        <div style={{ display: "flex", gap: 8 }}>
          <select name="category" defaultValue={post?.category ?? ""} required style={{ ...inputStyle, flex: 1 }}>
            <option value="" disabled>
              Select a category
            </option>
            {categoryList.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            placeholder="New category…"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            style={{ ...inputStyle, width: 160 }}
          />
          <button
            type="button"
            onClick={async () => {
              if (!newCategory.trim()) return;
              await addBlogCategory(newCategory.trim());
              setCategoryList((prev) =>
                prev.includes(newCategory.trim()) ? prev : [...prev, newCategory.trim()]
              );
              setNewCategory("");
            }}
            style={secondaryBtnStyle}
          >
            Add
          </button>
        </div>
      </Field>

      <ImageField name="coverImage" label="Cover image" defaultValue={post?.coverImage ?? ""} />

      <Field label="Excerpt">
        <textarea name="excerpt" defaultValue={post?.excerpt ?? ""} rows={2} style={inputStyle} />
      </Field>

      <Field label="Content">
        <TiptapEditor initialContent={content} onChange={setContent} />
        <input type="hidden" name="content" value={content} />
      </Field>

      <Field label="Tags (comma-separated)">
        <input name="tags" defaultValue={post?.tags?.join(", ") ?? ""} style={inputStyle} />
      </Field>

      <div style={{ display: "flex", gap: 16 }}>
        <Field label="Status">
          <select name="status" defaultValue={post?.status ?? "draft"} style={inputStyle}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </Field>

        <Field label="Publish date">
          <input
            type="datetime-local"
            name="publishedAt"
            defaultValue={post?.publishedAt ? post.publishedAt.slice(0, 16) : ""}
            style={inputStyle}
          />
        </Field>
      </div>

      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
        <input type="checkbox" name="isFeatured" defaultChecked={post?.isFeatured ?? false} />
        Featured post
      </label>

      <Field label="SEO description">
        <textarea name="seoDescription" defaultValue={post?.seoDescription ?? ""} rows={2} style={inputStyle} />
      </Field>

      <ImageField name="ogImage" label="OG / social image" defaultValue={post?.ogImage ?? ""} />

      <button type="submit" disabled={pending} style={primaryBtnStyle}>
        {pending ? "Saving…" : post?.id ? "Save changes" : "Create post"}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, flex: 1 }}>
      <span style={{ color: "var(--muted2)" }}>{label}</span>
      {children}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "8px 10px",
  background: "var(--bg3)",
  border: "1px solid var(--border2)",
  borderRadius: 4,
  color: "var(--text)",
  fontSize: 14,
  fontFamily: "var(--sans)",
};

const primaryBtnStyle: React.CSSProperties = {
  padding: "10px 20px",
  background: "var(--gold)",
  color: "#080a0d",
  border: "none",
  borderRadius: 4,
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
  alignSelf: "flex-start",
};

const secondaryBtnStyle: React.CSSProperties = {
  padding: "8px 12px",
  background: "var(--bg3)",
  border: "1px solid var(--border2)",
  borderRadius: 4,
  color: "var(--text)",
  fontSize: 13,
  cursor: "pointer",
};
