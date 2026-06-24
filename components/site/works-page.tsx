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
          ← Back to Main page
        </a>
      </section>

      {/* Hero */}
      <section className="container-vaelo works-hero pt-12 pb-16 text-center sm:pt-20 sm:pb-20">
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

        {/* What we are + who we work with */}
        <div className="mx-auto mt-16 max-w-2xl grid gap-12 sm:grid-cols-2 text-left">
          <div>
            <p className="eyebrow">Who we are</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Full-service <span className="text-ink font-medium">AI-first creative agency</span>. We pair sharp creative with data-driven media — not a performance marketing shop.
            </p>
          </div>
          <div>
            <p className="eyebrow">Who we serve</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              <span className="text-ink font-medium">D2C</span> · <span className="text-ink font-medium">Real Estate</span> · <span className="text-ink font-medium">Ed-tech</span> · <span className="text-ink font-medium">Fashion</span>
            </p>
          </div>
        </div>
      </section>

      {/* AI Workflow - MOVED TO TOP */}
      <section className="container-vaelo border-t border-line py-16 sm:py-24">
        <p className="eyebrow">How we do it</p>
        <h2 className="font-display mt-6 text-3xl sm:text-5xl">AI-Native Production Engine</h2>
        <p className="mt-6 max-w-2xl text-ink-soft">
          While traditional agencies rely on photographers, production teams, and lengthy creative cycles, we leverage an AI-native production system that transforms ideas into campaign-ready assets at unprecedented speed.
        </p>

        {/* Horizontal Workflow Chain */}
        <div className="mt-16 overflow-x-auto pb-4">
          <div className="flex items-center gap-4 min-w-max">
            {/* Frame Generation */}
            <div className="flex-shrink-0">
              <p className="eyebrow text-accent">Frame Generation</p>
              <p className="mt-2 text-sm text-ink-soft">Nano Banana</p>
            </div>

            {/* Arrow */}
            <div className="flex-shrink-0 text-ink-soft text-xl">→</div>

            {/* Motion Creation */}
            <div className="flex-shrink-0">
              <p className="eyebrow text-accent">Motion Creation</p>
              <p className="mt-2 text-sm text-ink-soft">Higgsfield · Kling · Seedance</p>
            </div>

            {/* Arrow */}
            <div className="flex-shrink-0 text-ink-soft text-xl">→</div>

            {/* Creative Refinement */}
            <div className="flex-shrink-0">
              <p className="eyebrow text-accent">Creative Refinement</p>
              <p className="mt-2 text-sm text-ink-soft">Editing · Sound Design · Brand Adaptation</p>
            </div>

            {/* Arrow */}
            <div className="flex-shrink-0 text-ink-soft text-xl">→</div>

            {/* Deployment */}
            <div className="flex-shrink-0">
              <p className="eyebrow text-accent">Deployment</p>
              <p className="mt-2 text-sm text-ink-soft">Social · Ads · Websites · Sales Assets</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-line p-6">
            <p className="font-display text-2xl sm:text-3xl text-accent">3x</p>
            <p className="mt-2 text-sm font-medium">Faster Production</p>
          </div>
          <div className="rounded-xl border border-line p-6">
            <p className="font-display text-2xl sm:text-3xl text-accent">10x</p>
            <p className="mt-2 text-sm font-medium">More Creative Variations</p>
          </div>
          <div className="rounded-xl border border-line p-6">
            <p className="font-display text-2xl sm:text-3xl text-accent">↓ Cost</p>
            <p className="mt-2 text-sm font-medium">Lower Production Costs</p>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="container-vaelo border-t border-line py-16 sm:py-24">
        <p className="eyebrow">What we do</p>
        <div className="mt-10 grid gap-4 text-sm text-ink-soft sm:grid-cols-2">
          <div>
            <p className="text-ink font-medium mb-2">Meta Ads & Paid Social</p>
            <p className="text-ink font-medium mb-2">Content Strategy & Social Management</p>
            <p className="text-ink font-medium mb-2">AI-Native Video Production</p>
          </div>
          <div>
            <p className="text-ink font-medium mb-2">Shopify & E-commerce</p>
            <p className="text-ink font-medium mb-2">Web Design & Development</p>
            <p className="text-ink font-medium mb-2">Brand Strategy & Creative Direction</p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="works-grid-section container-vaelo pb-20 pt-20">
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
