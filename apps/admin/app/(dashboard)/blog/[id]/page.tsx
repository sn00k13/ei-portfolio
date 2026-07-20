import { notFound } from "next/navigation";
import { prisma } from "@eui/db";
import { requireSection } from "@/require-section";
import { BlogForm } from "../blog-form";

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requireSection("blog");
  const { id } = await params;

  const [post, categories] = await Promise.all([
    prisma.blogPost.findUnique({ where: { id: BigInt(id) } }),
    prisma.blogCategory.findMany({ orderBy: { name: "asc" } }),
  ]);

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
          publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
        }}
        categories={categories.map((c) => c.name)}
      />
    </div>
  );
}
