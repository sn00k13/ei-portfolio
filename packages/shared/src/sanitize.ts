import sanitizeHtml from "sanitize-html";

/**
 * Sanitizes admin-authored rich-text HTML (Tiptap output stored in
 * blog_posts.content / case_studies.full_details / assessments.overview)
 * before it's rendered via dangerouslySetInnerHTML on the public site. The
 * old site rendered this HTML unsanitized.
 *
 * Uses sanitize-html (pure JS) rather than isomorphic-dompurify/jsdom —
 * jsdom ships browser-asset files (default-stylesheet.css) that webpack
 * can't resolve once bundled into a Next.js server build.
 */
export function sanitizeContentHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "hr", "strong", "em", "u", "s", "blockquote", "pre", "code",
      "h1", "h2", "h3", "h4", "ul", "ol", "li", "a", "img", "figure", "figcaption", "span",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel", "title", "class"],
      img: ["src", "alt", "title", "class"],
      "*": ["class"],
    },
    allowedSchemes: ["http", "https", "mailto"],
  });
}
