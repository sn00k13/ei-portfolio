import { notFound } from "next/navigation";
import { pool, toCamelCase } from "@/db";
import { requireSection } from "@/require-section";
import { BlogForm } from "../blog-form";

export const dynamic = "force-dynamic";

interface BlogPostRow {
  id: string;
  title: string;
  slug: string | null;
  category: string;
  coverImage: string | null;
  excerpt: string | null;
  content: string;
  status: string | null;
  tags: string[];
  seoDescription: string | null;
  ogImage: string | null;
  isFeatured: boolean | null;
  publishedAt: Date | null;
}

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requireSection("blog");
  const { id } = await params;

  const [postResult, categoriesResult] = await Promise.all([
    pool.query(`select * from blog_posts where id = $1`, [id]),
    pool.query(`select name from blog_categories order by name asc`),
  ]);

  const post = postResult.rows[0] ? toCamelCase<BlogPostRow>(postResult.rows[0]) : null;
  if (!post) notFound();

  return (
    <div>
      <h1 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 28, marginBottom: 20 }}>
        Edit Post
      </h1>
      <BlogForm
        post={{
          id: Number(post.id),
          title: post.title,
          slug: post.slug,
          category: post.category,
          coverImage: post.coverImage,
          excerpt: post.excerpt,
          content: post.content,
          status: post.status ?? "draft",
          tags: post.tags,
          seoDescription: post.seoDescription,
          ogImage: post.ogImage,
          isFeatured: post.isFeatured ?? false,
          publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString() : null,
        }}
        categories={categoriesResult.rows.map((c) => c.name)}
      />
    </div>
  );
}
