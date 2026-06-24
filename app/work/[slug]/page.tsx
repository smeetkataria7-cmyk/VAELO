import { notFound } from "next/navigation";
import Link from "next/link";
import { caseStudies } from "@/lib/content";
import { readMedia } from "@/lib/works-media";

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

  const media = readMedia(slug);

  return (
    <>
      <section className="container-vaelo pt-20 pb-10 sm:pt-28">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          ← Return to portfolio
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
        {media.length === 0 ? (
          <p className="text-muted">No media yet — drop videos or images in <code>/public/images/work/{slug}/</code></p>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
            {media.map((m) => (
              <div key={m.src} className="overflow-hidden rounded-2xl bg-paper-2 mb-5 break-inside-avoid">
                {m.type === "video" ? (
                  <video
                    src={m.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    className="w-full object-cover"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.src} alt={brand.brand} loading="lazy" className="w-full object-cover" />
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
