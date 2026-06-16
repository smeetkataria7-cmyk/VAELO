import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI photoshoots, Instagram management, and paid advertising — everything your brand needs to look great and grow.",
};

export default function ServicesPage() {
  return (
    <section className="container-vaelo py-20 sm:py-28">
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
        Everything your brand needs to look great — and grow.
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted">
        Pick one service or let us run the whole engine. Every plan is tailored to
        your brand, so pricing is quoted per project.
      </p>

      <div className="mt-12 space-y-6">
        {services.map((s, i) => (
          <div
            key={s.slug}
            className="grid gap-6 rounded-2xl border border-line bg-paper-2 p-8 md:grid-cols-[1fr_1.5fr]"
          >
            <div>
              <p className="font-mono text-sm text-accent">
                0{i + 1}
              </p>
              <h2 className="mt-2 text-2xl font-semibold">{s.title}</h2>
              <p className="mt-2 text-muted">{s.tagline}</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {s.includes.map((inc) => (
                <li key={inc} className="flex items-start gap-2 text-sm text-ink-soft">
                  <span className="mt-1 text-accent">✓</span>
                  {inc}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-line bg-paper p-8 text-center">
        <p className="text-lg font-medium">
          Pricing is tailored to your brand and goals.
        </p>
        <p className="mt-2 text-muted">
          Tell us what you need and we&apos;ll send a custom quote — plus a free
          AI sample.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-paper transition-colors hover:bg-ink-soft"
        >
          Request a quote
        </Link>
      </div>
    </section>
  );
}
