"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { Reveal } from "@/components/site/reveal";
import type { Work } from "@/lib/works";

/** True when a hex colour is light enough to need dark text on top. */
function isLight(hex: string): boolean {
  const m = hex.replace("#", "");
  const v = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  const r = parseInt(v.slice(0, 2), 16) || 0;
  const g = parseInt(v.slice(2, 4), 16) || 0;
  const b = parseInt(v.slice(4, 6), 16) || 0;
  // Perceived luminance.
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.62;
}

function WorkCard({ work, delay }: { work: Work; delay: number }) {
  const href = work.case_url || "";
  const light = isLight(work.accent_color);
  const text = light ? "text-black" : "text-white";
  const subtle = light ? "text-black/60" : "text-white/70";
  const pill = light ? "bg-black/10 text-black/80" : "bg-white/15 text-white/90";
  const btn = light
    ? "border-black/25 text-black hover:bg-black/10"
    : "border-white/35 text-white hover:bg-white/15";

  // All media for this work: prefer the local folder, else fall back to image_url.
  const media = work.media && work.media.length > 0
    ? work.media
    : work.image_url
      ? [{ type: "image" as const, src: work.image_url }]
      : [];
  const [active, setActive] = useState(0);
  const current = media[active];
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-advance to next item when the current video ends.
  const handleEnded = () => {
    if (media.length > 1) setActive((i) => (i + 1) % media.length);
  };

  // When active index changes to a video, reload & play it.
  // For images, advance on a timer (images don't fire onEnded).
  useEffect(() => {
    if (current?.type === "video") {
      const v = videoRef.current;
      if (v) {
        v.load();
        v.play().catch(() => {});
      }
      return;
    }
    if (current?.type === "image" && media.length > 1) {
      const t = setTimeout(() => setActive((i) => (i + 1) % media.length), 3500);
      return () => clearTimeout(t);
    }
  }, [active, current, media.length]);

  return (
    <Reveal delay={delay} className="mb-5 break-inside-avoid">
    <div className="group cursor-pointer" onClick={() => window.location.href = `/work/${work.slug}`}>
      <div className="relative overflow-hidden rounded-[1.25rem] bg-paper-2">
        {current?.type === "video" ? (
          <video
            ref={videoRef}
            src={current.src}
            autoPlay
            muted
            playsInline
            onEnded={handleEnded}
            className="w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          />
        ) : current ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={current.src}
            alt={work.title}
            loading="lazy"
            className="w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          />
        ) : null}

        {/* Dot indicators — only show when there are multiple items */}
        {media.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {media.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-5 bg-white" : "w-1.5 bg-white/40"
                }`}
                aria-label={`Reel ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      <div
        className="relative z-10 -mt-6 rounded-[1.25rem] p-5 pt-7 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:-translate-y-0.5"
        style={{ backgroundColor: work.accent_color }}
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className={`font-display text-lg font-semibold leading-tight ${text}`}>
            {work.title}
          </h3>
          {href && (
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${btn}`}
            >
              See case
            </a>
          )}
        </div>
        {work.categories.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {work.categories.map((c) => (
              <span
                key={c}
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium leading-none ${pill}`}
              >
                {c}
              </span>
            ))}
          </div>
        )}
        {!work.categories.length && href === "" && (
          <p className={`mt-1 text-xs ${subtle}`}>Vaelo Creative</p>
        )}
      </div>
    </div>
    </Reveal>
  );
}

export function WorksGrid({ works }: { works: Work[] }) {
  const [active, setActive] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set<string>();
    works.forEach((w) => w.categories.forEach((c) => set.add(c)));
    return ["All", ...Array.from(set)];
  }, [works]);

  const filtered = useMemo(
    () => (active === "All" ? works : works.filter((w) => w.categories.includes(active))),
    [works, active]
  );

  return (
    <>
      <div className="mx-auto mb-14 flex max-w-2xl flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full px-4 py-1.5 text-sm transition-all ${
              active === c
                ? "bg-accent text-accent-ink"
                : "border border-line text-ink-soft hover:border-ink/40 hover:text-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-muted">Nothing here yet.</p>
      ) : (
        <div className="gap-5 sm:columns-2 lg:columns-3">
          {filtered.map((w, i) => (
            <WorkCard key={w.id} work={w} delay={(i % 3) * 90} />
          ))}
        </div>
      )}
    </>
  );
}
