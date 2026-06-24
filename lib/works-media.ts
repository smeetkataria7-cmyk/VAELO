import fs from "fs";
import path from "path";
import { IMAGE_EXTS, VIDEO_EXTS, type MediaItem } from "./works";

/**
 * Reads /public/images/work/<slug>/ and returns sorted media (videos + images).
 * Drop .mp4/.webm or .jpg/.png/.webp files in the folder — they show up here.
 * Server-only (uses fs).
 */
export function readMedia(slug: string): MediaItem[] {
  try {
    const dir = path.join(process.cwd(), "public", "images", "work", slug);
    return fs
      .readdirSync(dir)
      .filter((f) => {
        const ext = path.extname(f).toLowerCase();
        return IMAGE_EXTS.includes(ext) || VIDEO_EXTS.includes(ext);
      })
      .sort((a, b) => (parseInt(a) || 0) - (parseInt(b) || 0) || a.localeCompare(b))
      .map((f) => {
        const ext = path.extname(f).toLowerCase();
        const type: MediaItem["type"] = VIDEO_EXTS.includes(ext) ? "video" : "image";
        return { type, src: `/images/work/${slug}/${f}` };
      });
  } catch {
    return [];
  }
}
