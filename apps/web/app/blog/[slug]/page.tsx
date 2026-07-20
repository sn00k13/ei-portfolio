import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@eui/db";
import { sanitizeContentHtml } from "@eui/shared/sanitize";

export const dynamic = "force-dynamic";

async function getPost(slug: string) {
  return prisma.blogPost.findFirst({ where: { slug, status: "published" } });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Uzoukwu Eric Ikenna`,
    description: post.seoDescription ?? post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.seoDescription ?? post.excerpt ?? undefined,
      images: post.ogImage ? [{ url: post.ogImage }] : post.coverImage ? [{ url: post.coverImage }] : undefined,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const words = post.content.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length;
  const readTime = `${Math.max(1, Math.ceil(words / 200))} min`;

  return (
    <div className="blog-modal-overlay open" style={{ position: "static", display: "block", background: "var(--bg)", padding: "8rem 1.5rem 4rem" }}>
      <div className="blog-modal" style={{ maxWidth: 760, margin: "0 auto", background: "transparent", border: "none", maxHeight: "none" }}>
        <Link href="/#blog" style={{ display: "inline-block", marginBottom: "1.5rem", fontFamily: "var(--mono)", fontSize: "0.65rem", color: "var(--muted2)", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
          ← Back to Blog
        </Link>
        <div className="blog-modal-content">
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span className="post-cat">{post.category}</span>
            {post.publishedAt && <span>{new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>}
            <span>{readTime}</span>
          </div>
          {post.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.coverImage} alt={post.title} />
          )}
          <div className="post-body" dangerouslySetInnerHTML={{ __html: sanitizeContentHtml(post.content) }} />
          {post.tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "2rem" }}>
              {post.tags.map((t) => (
                <span key={t} className="tool-pill">{t}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
