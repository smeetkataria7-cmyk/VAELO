import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/content";
import { ServiceIcon } from "@/components/site/icons";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Performance marketing, creative strategy, content, web, social, and AI-powered production — everything your brand needs to grow.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="container-vaelo pt-20 pb-12 sm:pt-28">
        <p className="eyebrow">Services</p>
        <h1 className="font-display mt-6 max-w-3xl text-5xl leading-[1.05] sm:text-7xl">
          Everything growth needs,
          <br />
          under one roof.
        </h1>
        <p className="mt-8 max-w-xl text-lg text-ink-soft">
          Strategy, creative, and performance — working as one system. Pricing is
          tailored to your brand and goals.
        </p>
      </section>

      <section className="container-vaelo pb-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.slug}
              className="glass group h-full rounded-xl p-7 transition-colors hover:border-accent/40"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line text-accent transition-colors group-hover:border-accent/50">
                <ServiceIcon name={s.icon} className="h-5 w-5" />
              </span>
              <h2 className="font-display mt-5 text-xl">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start gap-6 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md">
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              Pricing tailored to your brand.
            </h2>
            <p className="mt-3 text-ink-soft">
              Tell us where you want to grow and we&apos;ll send a custom plan.
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-all hover:gap-3"
          >
            Let&apos;s talk growth
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
