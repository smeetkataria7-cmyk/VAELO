import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { caseStudies } from "@/lib/content";

function readVideos(slug: string): string[] {
  try {
    const dir = path.join(process.cwd(), "public", "images", "work", slug);
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".mp4"))
      .sort()
      .map((f) => `/images/work/${slug}/${f}`);
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = caseStudies.find((c) => c.slug === slug);
  if (!brand) notFound();

  const videos = readVideos(slug);

  return (
    <>
      <section className="container-vaelo pt-20 pb-10 sm:pt-28">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          ← All work
        </Link>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Case study</p>
            <h1 className="font-display mt-3 text-5xl sm:text-6xl">{brand.brand}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {brand.categories.map((c) => (
              <span
                key={c}
                className="rounded-full border border-line px-3.5 py-1 text-sm text-ink-soft"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="container-vaelo pb-24">
        {videos.length === 0 ? (
          <p className="text-muted">No reels yet — drop MP4s in <code>/public/images/work/{slug}/</code></p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((src, i) => (
              <div key={src} className="overflow-hidden rounded-2xl bg-paper-2">
                <video
                  src={src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className="w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
