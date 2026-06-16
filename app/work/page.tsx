import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Real brands, real results. See how VAELO Creative uses AI photoshoots and Instagram to grow brands.",
};

export default function WorkPage() {
  return (
    <section className="container-vaelo py-20 sm:py-28">
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
        Real brands. Real results.
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted">
        A look at the brands we&apos;ve helped grow with AI-generated visuals,
        Instagram management, and paid ads.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {caseStudies.map((c) => (
          <article
            key={c.slug}
            className="flex flex-col rounded-2xl border border-line bg-paper-2 p-7"
          >
            {/* TODO: add before/after creative images for each case study */}
            <div className="mb-5 flex aspect-[16/9] items-center justify-center rounded-xl border border-dashed border-line bg-paper text-sm text-muted">
              Creative preview
            </div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted">
              <span>{c.industry}</span>
            </div>
            <h2 className="mt-2 text-2xl font-semibold">{c.brand}</h2>
            <p className="mt-3 flex-1 text-sm text-ink-soft">{c.summary}</p>
            <p className="mt-5 text-sm font-medium text-accent">{c.result}</p>
          </article>
        ))}
      </div>

      <div className="mt-16 rounded-3xl bg-ink px-8 py-14 text-center text-paper">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Your brand could be next.
        </h2>
        <Link
          href="/contact"
          className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90"
        >
          Get a free AI sample
        </Link>
      </div>
    </section>
  );
}
