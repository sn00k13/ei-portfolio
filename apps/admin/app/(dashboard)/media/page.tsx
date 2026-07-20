import { requireSection } from "@/require-section";
import { listBucket, BLOG_IMAGES_BUCKET } from "@/storage";
import { MediaGrid } from "./media-grid";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  await requireSection("media");
  const items = await listBucket(BLOG_IMAGES_BUCKET).catch(() => []);

  return (
    <div>
      <h1 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 28, marginBottom: 4 }}>Media Library</h1>
      <p style={{ color: "var(--muted2)", fontSize: 13, marginBottom: 20 }}>
        All uploaded images. Click any image to copy its URL.
      </p>
      <MediaGrid items={items} />
    </div>
  );
}
