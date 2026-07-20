import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

export const BLOG_IMAGES_BUCKET = "blog-images";
export const CV_FILES_BUCKET = "cv-files";

export async function uploadToBucket(bucket: string, file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabaseAdmin.storage.from(bucket).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) throw new Error(error.message);
  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function listBucket(bucket: string) {
  const { data, error } = await supabaseAdmin.storage.from(bucket).list("", {
    limit: 200,
    sortBy: { column: "created_at", order: "desc" },
  });
  if (error) throw new Error(error.message);
  return (data ?? [])
    .filter((f) => f.name !== ".emptyFolderPlaceholder")
    .map((f) => ({
      name: f.name,
      url: supabaseAdmin.storage.from(bucket).getPublicUrl(f.name).data.publicUrl,
      size: f.metadata?.size as number | undefined,
      createdAt: f.created_at ?? undefined,
    }));
}

export async function deleteFromBucket(bucket: string, name: string) {
  const { error } = await supabaseAdmin.storage.from(bucket).remove([name]);
  if (error) throw new Error(error.message);
}
