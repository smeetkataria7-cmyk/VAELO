import type { Metadata } from "next";
import Link from "next/link";
import { about, brand } from "@/lib/content";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Vaelo Creative is a Mumbai-based growth agency combining creative strategy with data-driven performance marketing.",
};

export default function AboutPage() {
  return (
    <section className="container-vaelo pt-20 pb-24 sm:pt-28">
      <p className="eyebrow">The studio</p>
      <h1 className="font-display mt-6 max-w-4xl text-5xl leading-[1.05] sm:text-7xl">
        Your growth partner,
        <br />
        not a vendor.
      </h1>

      <div className="mt-16 grid gap-12 border-t border-line pt-16 lg:grid-cols-[0.4fr_1.6fr]">
        <p className="eyebrow pt-2">Who we are</p>
        <div className="space-y-6">
          <p className="font-display text-3xl leading-[1.3] sm:text-4xl">{about}</p>
          <div className="flex flex-col gap-2 pt-4 text-ink-soft">
            <a href={`mailto:${brand.email}`} className="hover:text-ink">{brand.email}</a>
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="hover:text-ink">{brand.phone}</a>
            <span className="text-muted">{brand.location}</span>
          </div>
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
