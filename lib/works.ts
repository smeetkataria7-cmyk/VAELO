import { getSupabaseAdmin } from "./supabase";
import { getViewer } from "./client-access";

const BUCKET = "works";

// The filter pills shown on the public Works page (order matters).
export const WORK_CATEGORIES = [
  "Branding",
  "Website",
  "Production",
  "Strategy",
  "SEO",
  "2D Animation",
  "Social Media",
  "AI Production",
  "Market Research",
  "Post-Production",
] as const;

export type Work = {
  id: string;
  slug: string;
  title: string;
  image_url: string;
  accent_color: string;
  categories: string[];
  case_url: string;
  sort_order: number;
  published: boolean;
  created_by: string;
  created_at: string;
  // Local media (videos + images) from /public/images/work/<slug>/ — populated server-side.
  media?: MediaItem[];
};

export type MediaItem = { type: "video" | "image"; src: string };

/** File extensions we treat as portfolio media. */
export const IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"];
export const VIDEO_EXTS = [".mp4", ".webm", ".mov"];

function db() {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase is not configured.");
  return supabase;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Published works, ordered for the public page. */
export async function listPublishedWorks(): Promise<Work[]> {
  const { data, error } = await db()
    .from("works")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Work[];
}

/** Every work (admin view). */
export async function listAllWorks(): Promise<Work[]> {
  const { data, error } = await db()
    .from("works")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Work[];
}

/** Creates a work. Accepts an uploaded image file or a pasted image_url. */
export async function addWork(formData: FormData): Promise<void> {
  const supabase = db();
  const title = String(formData.get("title") || "").trim();
  if (!title) return;

  const slug = slugify(String(formData.get("slug") || "") || title);
  const accent_color = String(formData.get("accent_color") || "#1a1a1a").trim() || "#1a1a1a";
  const case_url = String(formData.get("case_url") || "").trim();
  const sort_order = Number(formData.get("sort_order") || 0) || 0;
  const published = String(formData.get("published") || "on") === "on";

  // Categories arrive as repeated "categories" checkbox values.
  const categories = formData
    .getAll("categories")
    .map((c) => String(c).trim())
    .filter(Boolean);

  // Image: uploaded file wins; otherwise fall back to a pasted URL.
  let image_url = String(formData.get("image_url") || "").trim();
  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    const ext = (file.name.split(".").pop() || "jpg").replace(/[^\w]/g, "");
    const path = `${slug}-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, { contentType: file.type || undefined, upsert: true });
    if (upErr) throw new Error(upErr.message);
    image_url = supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
  }

  const { error } = await supabase.from("works").insert({
    slug,
    title,
    image_url,
    accent_color,
    categories,
    case_url,
    sort_order,
    published,
    created_by: (await getViewer()).email ?? "",
  });
  if (error) throw new Error(error.message);
}

export async function deleteWork(id: string): Promise<void> {
  const { error } = await db().from("works").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function setWorkPublished(id: string, published: boolean): Promise<void> {
  const { error } = await db().from("works").update({ published }).eq("id", id);
  if (error) throw new Error(error.message);
}
