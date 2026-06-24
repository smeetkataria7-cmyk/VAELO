import fs from "fs";
import path from "path";
import { IMAGE_EXTS, VIDEO_EXTS, type MediaItem } from "./works";

/**
 * Reads /public/images/work/<slug>/ and returns sorted media (videos + images).
 * Drop .mp4/.webm or .jpg/.png/.webp files in the folder — they show up here.
 * Server-only (uses fs).
 */
/** Deterministic hash of a string — stable shuffle key across loads. */
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function readMedia(slug: string): MediaItem[] {
  try {
    const dir = path.join(process.cwd(), "public", "images", "work", slug);
    const all = fs
      .readdirSync(dir)
      .filter((f) => {
        const ext = path.extname(f).toLowerCase();
        return IMAGE_EXTS.includes(ext) || VIDEO_EXTS.includes(ext);
      })
      .map((f) => {
        const ext = path.extname(f).toLowerCase();
        const type: MediaItem["type"] = VIDEO_EXTS.includes(ext) ? "video" : "image";
        return { type, src: `/images/work/${slug}/${f}` };
      });

    // Shuffle each type independently (stable, random-looking)...
    const byKey = (a: MediaItem, b: MediaItem) => hash(a.src) - hash(b.src);
    const vids = all.filter((m) => m.type === "video").sort(byKey);
    const imgs = all.filter((m) => m.type === "image").sort(byKey);

    // ...then weave them together so videos are spread evenly among images.
    if (!vids.length) return imgs;
    if (!imgs.length) return vids;
    const out: MediaItem[] = [];
    let vi = 0;
    let ii = 0;
    const total = vids.length + imgs.length;
    for (let k = 0; k < total; k++) {
      if (ii >= imgs.length) out.push(vids[vi++]);
      else if (vi >= vids.length) out.push(imgs[ii++]);
      else if ((vi + 0.5) / vids.length <= (ii + 0.5) / imgs.length) out.push(vids[vi++]);
      else out.push(imgs[ii++]);
    }
    return out;
  } catch {
    return [];
  }
}
