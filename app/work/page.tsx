import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { listPublishedWorks, type Work } from "@/lib/works";
import { caseStudies } from "@/lib/content";
import { WorksPageClient } from "@/components/site/works-page";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Work",
  description:
    "AI-generated creatives by Vaelo Creative — studio-quality visuals built to stop the scroll.",
};

const PALETTE = [
  "#d6a128", "#c8331f", "#1f2552", "#2f5d3a",
  "#8d2f6b", "#9bd14a", "#0e4d59", "#b5612b",
  "#3a1d54", "#1a1a1a",
];

function fallbackWorks(): Work[] {
  const now = new Date().toISOString();
  const base = (i: number): Omit<Work, "slug" | "title" | "image_url" | "categories"> => ({
    id: `fallback-${i}`,
    accent_color: PALETTE[i % PALETTE.length],
    case_url: "",
    sort_order: i,
    published: true,
    created_by: "",
    created_at: now,
  });
  const studies: Work[] = caseStudies.map((c, i) => ({
    ...base(i),
    id: `cs-${c.slug}`,
    slug: c.slug,
    title: c.brand,
    image_url: c.image,
    accent_color: c.accent,
    categories: c.categories,
  }));
  return studies;
}

/** Read /public/images/work/<slug>/ and return sorted video URLs. */
function readVideos(slug: string): string[] {
  try {
    const dir = path.join(process.cwd(), "public", "images", "work", slug);
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".mp4"))
      .sort((a, b) => parseInt(a) - parseInt(b))
      .map((f) => `/images/work/${slug}/${f}`);
  } catch {
    return [];
  }
}

export default async function WorkPage() {
  const works = await listPublishedWorks().catch(() => []);
  const items = works.length > 0 ? works : fallbackWorks();

  // Attach local videos to each work.
  const withVideos: Work[] = items.map((w) => ({
    ...w,
    videos: readVideos(w.slug),
  }));

  return <WorksPageClient works={withVideos} />;
}
