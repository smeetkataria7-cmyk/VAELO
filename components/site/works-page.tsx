"use client";

import { useId } from "react";
import Link from "next/link";
import { WorksGrid } from "@/components/site/works-grid";
import type { Work } from "@/lib/works";

// Thumbnails that float around the CTA headline (uses your gallery images).
const FLOATS: { src: string; cls: string }[] = [
  { src: "/images/work/1.png", cls: "absolute -left-8 top-4  w-28 -rotate-[8deg] sm:-left-16 sm:w-36" },
  { src: "/images/work/2.png", cls: "absolute -right-6 top-8  w-24 rotate-[6deg]  sm:-right-14 sm:w-32" },
  { src: "/images/work/3.png", cls: "absolute -left-4 bottom-0 w-24 rotate-[4deg]  sm:-left-10 sm:w-32" },
  { src: "/images/work/4.png", cls: "absolute -right-4 bottom-2 w-20 -rotate-[5deg] sm:-right-12 sm:w-28" },
];

export function WorksPageClient({ works }: { works: Work[] }) {
  const id = useId();

  return (
    <div className="works-page">
      {/* Back button */}
      <section className="container-vaelo pt-6 sm:pt-8">
        <a
          href="https://www.vaelocreative.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          ← Back to mainpage
        </a>
      </section>

      {/* Hero */}
      <section className="container-vaelo works-hero pt-12 pb-12 text-center sm:pt-20">
        <p className="eyebrow">Selected work</p>
        <h1 className="font-display mx-auto mt-6 max-w-3xl text-5xl leading-[1.05] sm:text-7xl">
          Made with AI.
          <br />
          Built for the scroll.
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-lg text-ink-soft">
          A selection of AI-generated creatives and brand builds — studio-quality
          visuals produced in days, not weeks.
        </p>
      </section>

      {/* Grid */}
      <section className="works-grid-section container-vaelo pb-20">
        <WorksGrid works={works} />
      </section>

      {/* CTA — "Vaelo the competition" */}
      <section className="works-cta relative overflow-hidden py-24 sm:py-36">
        <div className="container-vaelo">
          {/* Floating thumbnails */}
          <div className="relative mx-auto max-w-xl">
            {FLOATS.map(({ src, cls }, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${id}-float-${i}`}
                src={src}
                alt=""
                aria-hidden
                className={`${cls} hidden rounded-2xl object-cover shadow-2xl transition-transform duration-700 hover:-translate-y-1 sm:block`}
              />
            ))}

            {/* Headline */}
            <div className="relative z-10 text-center">
              <h2 className="font-display works-cta-headline text-5xl font-bold leading-[1.08] sm:text-6xl lg:text-7xl">
                <span className="text-accent">Vaelo</span> the competition
                <br />
                Scale your{" "}
                <em className="not-italic" style={{ fontStyle: "italic", fontFamily: "Georgia, serif" }}>
                  brand.
                </em>
              </h2>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
                >
                  Let&apos;s talk growth
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
