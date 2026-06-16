import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vaelo Creative is an AI-first creative studio helping brands look great and grow — without the cost of traditional photoshoots.",
};

export default function AboutPage() {
  return (
    <section className="container-vaelo pt-20 pb-24 sm:pt-28">
      <p className="eyebrow">About</p>
      <h1 className="font-display mt-6 max-w-4xl text-5xl leading-[1.05] sm:text-7xl">
        We&apos;re building the creative studio of the future.
      </h1>

      <div className="mt-16 grid gap-16 border-t border-line pt-16 lg:grid-cols-[1fr_1.4fr]">
        <p className="eyebrow">Our story</p>
        <div className="space-y-6 text-xl leading-relaxed text-ink-soft">
          <p>
            Vaelo Creative is an AI-first studio. We believe every brand deserves
            stunning visuals — without the cost, delay, and hassle of a
            traditional photoshoot.
          </p>
          <p>
            Using the latest in generative AI, we craft studio-quality imagery in
            days, not weeks, then put it to work growing your Instagram and ads.
            One team, one system, end to end.
          </p>
          <p>
            {/* TODO: replace with the founder's real story and mission */}
            We&apos;re a small, focused team obsessed with results — and we treat
            every brand we work with like our own.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 pt-4 text-base font-medium text-ink"
          >
            <span className="link-underline">Work with us</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
