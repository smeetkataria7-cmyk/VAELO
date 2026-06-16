import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { gallery } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "AI-generated creatives by VAELO Creative — studio-quality visuals built to stop the scroll.",
};

export default function WorkPage() {
  return (
    <>
      <section className="container-vaelo pt-20 pb-12 sm:pt-28">
        <p className="eyebrow">Selected work</p>
        <h1 className="font-display mt-6 max-w-3xl text-5xl leading-[1.05] sm:text-7xl">
          Made with AI.
          <br />
          Built for the scroll.
        </h1>
        <p className="mt-8 max-w-xl text-lg text-ink-soft">
          A selection of AI-generated creatives — studio-quality visuals
          produced in days, not weeks.
        </p>
      </section>

      <section className="container-vaelo pb-12">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {gallery.map((src, i) => (
            <div
              key={src}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-paper-2"
            >
              <Image
                src={src}
                alt={`VAELO AI creative ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="container-vaelo py-24">
        <div className="max-w-2xl">
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
