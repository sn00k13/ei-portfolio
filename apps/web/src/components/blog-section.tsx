"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export interface BlogPostSummary {
  id: number;
  slug: string | null;
  title: string;
  category: string;
  coverImage: string | null;
  excerpt: string | null;
  publishedAt: string | null;
  readTime: string;
}

const CATEGORIES = [
  "all",
  "Cybersecurity",
  "Founder & Entrepreneurship",
  "Tech in Africa",
  "Product & QA",
  "Project Management",
  "Personal & Thought Leadership",
];

export function BlogSection({ posts }: { posts: BlogPostSummary[] }) {
  const [category, setCategory] = useState("all");

  const filtered = useMemo(
    () => (category === "all" ? posts : posts.filter((p) => p.category === category)),
    [posts, category]
  );

  return (
    <section className="section" id="blog">
      <div className="s-eyebrow">Blog</div>
      <h2 className="s-title">Thoughts, insights &amp; <em>perspectives</em></h2>
      <div className="s-rule" />
      <div className="blog-filters">
        {CATEGORIES.map((c) => (
          <button key={c} className={`blog-filter${category === c ? " active" : ""}`} onClick={() => setCategory(c)}>
            {c === "all" ? "All" : c}
          </button>
        ))}
      </div>
      <div className="blog-grid">
        {filtered.map((p) => (
          <Link key={p.id} href={p.slug ? `/blog/${p.slug}` : "#"} className="blog-card">
            {p.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="blog-card-img" src={p.coverImage} alt={p.title} loading="lazy" />
            ) : (
              <div className="blog-card-img-ph">✍</div>
            )}
            <div className="blog-card-body">
              <div className="blog-card-meta">
                <span className="blog-card-cat">{p.category}</span>
                <span className="blog-card-date">{p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : ""}</span>
                <span className="blog-card-read">{p.readTime}</span>
              </div>
              <h3 className="blog-card-title">{p.title}</h3>
              {p.excerpt && <p className="blog-card-excerpt">{p.excerpt}</p>}
            </div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="blog-empty">
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>✍</div>
          <div style={{ fontFamily: "var(--mono)", fontSize: "0.75rem", color: "var(--muted)", letterSpacing: "0.1em" }}>No posts yet in this category.</div>
        </div>
      )}
    </section>
  );
}
