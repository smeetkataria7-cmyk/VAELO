import type { Metadata } from "next";
import Link from "next/link";
import { Media } from "@/components/site/media";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Real brands, real results. How VAELO Creative grows brands with AI photoshoots, Instagram, and paid ads.",
};

export default function WorkPage() {
  return (
    <>
      <section className="container-vaelo pt-20 pb-12 sm:pt-28">
        <p className="eyebrow">Selected work</p>
        <h1 className="font-display mt-6 max-w-3xl text-5xl leading-[1.05] sm:text-7xl">
          Real brands.
          <br />
          Real results.
        </h1>
        <p className="mt-8 max-w-xl text-lg text-ink-soft">
          A look at the brands we&apos;ve helped grow with AI-generated visuals,
          Instagram management, and paid ads.
        </p>
      </section>

      <section className="container-vaelo pb-24">
        <div className="border-t border-line">
          {caseStudies.map((c, i) => (
            <div
              key={c.slug}
              className="grid items-center gap-8 border-b border-line py-16 lg:grid-cols-2 lg:gap-16"
            >
              <Media
                src={c.image || undefined}
                alt={`${c.brand} — ${c.industry}`}
                label={c.brand}
                className={`aspect-[4/3] w-full ${i % 2 === 1 ? "lg:order-2" : ""}`}
              />
              <div>
                <span className="eyebrow">{c.industry}</span>
                <h2 className="font-display mt-3 text-4xl">{c.brand}</h2>
                <p className="mt-5 max-w-md text-lg text-ink-soft">{c.summary}</p>
                <p className="mt-6 font-display text-2xl text-accent">{c.result}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 max-w-2xl">
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">
            Your brand could be next.
          </h2>
          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-all hover:gap-3"
          >
            Get a free AI sample
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
