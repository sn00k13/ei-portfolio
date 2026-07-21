import { pool } from "@/db";
import { requireSection } from "@/require-section";
import { BlogForm } from "../blog-form";

export const dynamic = "force-dynamic";

export default async function NewBlogPostPage() {
  await requireSection("blog");
  const { rows: categories } = await pool.query(`select name from blog_categories order by name asc`);

  return (
    <div>
      <h1 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 28, marginBottom: 20 }}>
        New Post
      </h1>
      <BlogForm post={null} categories={categories.map((c) => c.name)} />
    </div>
  );
}
