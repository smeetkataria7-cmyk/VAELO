"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "How can AI photos look as good as a real shoot?",
    a: "We use the latest generative models and refine every visual by hand to match your brand. The result is studio-quality imagery — without the studio, models, or crew.",
  },
  {
    q: "How fast will I get my visuals?",
    a: "Most projects are delivered in days, not weeks. Need something urgent? Tell us and we'll work to your timeline.",
  },
  {
    q: "How much does it cost?",
    a: "A fraction of a traditional photoshoot. Pricing is tailored to your brand and goals, so we send a custom quote — along with a free sample so you can see the quality first.",
  },
  {
    q: "Do you also manage my Instagram and ads?",
    a: "Yes. We can take the visuals all the way through — content calendar, posting, reels, and paid ads — and report on what's working.",
  },
  {
    q: "What do you need from me to start?",
    a: "Just your brand details and what you want to achieve. We learn your colours, audience, and voice, then get to work.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-line">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b border-line">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-accent"
              aria-expanded={isOpen}
            >
              <span className="font-display text-xl sm:text-2xl">{f.q}</span>
              <span
                className={`shrink-0 text-2xl text-accent transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl text-ink-soft">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
