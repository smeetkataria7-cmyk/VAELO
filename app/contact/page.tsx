import type { Metadata } from "next";
import { LeadForm } from "@/components/site/lead-form";

export const metadata: Metadata = {
  title: "Get a free AI sample",
  description:
    "Tell us about your brand and we'll send a free AI sample — no commitment.",
};

export default function ContactPage() {
  return (
    <section className="container-vaelo py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Let&apos;s see what we&apos;d make for you.
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted">
            Share a few details about your brand. We&apos;ll send back a free AI
            sample so you can see the quality before spending a rupee.
          </p>
          <ul className="mt-8 space-y-4 text-ink-soft">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-accent">✓</span>
              A real AI visual made for your brand
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-accent">✓</span>
              A quick read on how we&apos;d grow your Instagram
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-accent">✓</span>
              No pressure, no obligation
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-8">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
