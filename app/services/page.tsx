import type { Metadata } from "next";
import Link from "next/link";
import { Media } from "@/components/site/media";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI photoshoots, Instagram management, and paid advertising — everything your brand needs to look great and grow.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="container-vaelo pt-20 pb-12 sm:pt-28">
        <p className="eyebrow">Services</p>
        <h1 className="font-display mt-6 max-w-3xl text-5xl leading-[1.05] sm:text-7xl">
          Everything your brand
          <br />
          needs to grow.
        </h1>
        <p className="mt-8 max-w-xl text-lg text-ink-soft">
          Pick one service or let us run the whole engine. Every plan is tailored
          to your brand — so pricing is quoted per project.
        </p>
      </section>

      <section className="container-vaelo pb-24">
        <div className="border-t border-line">
          {services.map((s, i) => (
            <div
              key={s.slug}
              className="grid items-center gap-8 border-b border-line py-16 lg:grid-cols-2 lg:gap-16"
            >
              <Media
                src={s.image || undefined}
                alt={s.title}
                label={s.title}
                className={`aspect-[4/3] w-full ${i % 2 === 1 ? "lg:order-2" : ""}`}
              />
              <div>
                <span className="font-display text-2xl text-muted">0{i + 1}</span>
                <h2 className="font-display mt-2 text-4xl">{s.title}</h2>
                <p className="mt-4 max-w-md text-lg text-ink-soft">{s.tagline}</p>
                <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {s.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-3 border-t border-line pt-3 text-sm">
                      <span className="text-accent">+</span>
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-md">
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              Pricing tailored to your brand.
            </h2>
            <p className="mt-3 text-ink-soft">
              Tell us what you need and we&apos;ll send a custom quote — plus a
              free AI sample.
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-all hover:gap-3"
          >
            Request a quote
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
