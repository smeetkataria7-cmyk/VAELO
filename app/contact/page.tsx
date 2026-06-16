import type { Metadata } from "next";
import { LeadForm } from "@/components/site/lead-form";
import { brand } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your brand and where you want to grow — we'll come back with how we'd get you there.",
};

export default function ContactPage() {
  return (
    <section className="container-vaelo pt-20 pb-24 sm:pt-28">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <p className="eyebrow">Let&apos;s talk growth</p>
          <h1 className="font-display mt-6 text-5xl leading-[1.05] sm:text-6xl">
            Tell us about
            <br />
            your brand.
          </h1>
          <p className="mt-8 max-w-md text-lg text-ink-soft">
            Share where you want to grow and we&apos;ll come back with how we&apos;d
            get you there — strategy, creative, and performance.
          </p>
          <ul className="mt-12 space-y-4">
            {[
              "A clear read on your growth opportunities",
              "How we'd approach creative + paid media",
              "No pressure, no obligation",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 border-t border-line pt-4 text-ink-soft">
                <span className="text-accent">+</span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-2 text-sm">
            <a href={`mailto:${brand.email}`} className="text-ink-soft hover:text-ink">{brand.email}</a>
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="text-ink-soft hover:text-ink">{brand.phone}</a>
            <span className="text-muted">{brand.location}</span>
          </div>
        </div>

        <div className="lg:pt-4">
          <div className="glass rounded-2xl p-6 sm:p-8">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
