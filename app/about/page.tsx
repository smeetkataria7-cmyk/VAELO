import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "VAELO Creative is an AI-first creative studio helping brands look great and grow — without the cost of traditional photoshoots.",
};

export default function AboutPage() {
  return (
    <section className="container-vaelo py-20 sm:py-28">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          We&apos;re building the creative studio of the future.
        </h1>
        <div className="mt-8 space-y-5 text-lg leading-8 text-ink-soft">
          <p>
            VAELO Creative is an AI-first studio. We believe every brand deserves
            stunning visuals — without the cost, delay, and hassle of a
            traditional photoshoot.
          </p>
          <p>
            Using the latest in generative AI, we create studio-quality imagery in
            days, not weeks, then put it to work growing your Instagram and ads.
            One team, one system, end to end.
          </p>
          <p>
            {/* TODO: replace with the founder's real story and mission */}
            We&apos;re a small, focused team obsessed with results — and we treat
            every brand we work with like our own.
          </p>
        </div>

        <Link
          href="/contact"
          className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-paper transition-colors hover:bg-ink-soft"
        >
          Work with us
        </Link>
      </div>
    </section>
  );
}
