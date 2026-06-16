import type { Metadata } from "next";
import { LeadForm } from "@/components/site/lead-form";

export const metadata: Metadata = {
  title: "Get a free AI sample",
  description:
    "Tell us about your brand and we'll send a free AI sample — no commitment.",
};

export default function ContactPage() {
  return (
    <section className="container-vaelo pt-20 pb-24 sm:pt-28">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <p className="eyebrow">Get started</p>
          <h1 className="font-display mt-6 text-5xl leading-[1.05] sm:text-6xl">
            Let&apos;s see what
            <br />
            we&apos;d make for you.
          </h1>
          <p className="mt-8 max-w-md text-lg text-ink-soft">
            Share a few details about your brand. We&apos;ll send back a free AI
            sample so you can see the quality before spending a rupee.
          </p>
          <ul className="mt-12 space-y-4">
            {[
              "A real AI visual made for your brand",
              "A quick read on how we'd grow your Instagram",
              "No pressure, no obligation",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 border-t border-line pt-4 text-ink-soft">
                <span className="text-accent">+</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:pt-4">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
