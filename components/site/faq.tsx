"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "What does Vaelo actually do?",
    a: "We're a growth agency. Creative strategy, content, performance marketing, web, social, and AI-powered production — working as one system so every asset has a job and every rupee of ad spend works harder.",
  },
  {
    q: "Who do you work with?",
    a: "Brands that are serious about scaling. Whether you're launching or already running ads, we build the strategy and creative to grow profitably.",
  },
  {
    q: "How is pricing structured?",
    a: "Every plan is tailored to your brand and goals, so we send a custom proposal after a quick chat about where you want to grow.",
  },
  {
    q: "Do you handle both creative and ads?",
    a: "Yes — that's the point. We build the creative and run the paid media, so strategy, content, and performance stay aligned.",
  },
  {
    q: "How do we get started?",
    a: "Tell us about your brand and where you want to grow. We'll come back with how we'd get you there.",
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
