"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { num?: number; prefix?: string; suffix?: string; text?: string; label: string };

// TODO: replace with real, verified numbers.
const STATS: Stat[] = [
  { num: 5, suffix: "+", label: "Brands grown" },
  { num: 100, suffix: "+", label: "Creatives delivered" },
  { num: 3, suffix: "-day", label: "Avg. turnaround" },
  { num: 10, suffix: "x", label: "Cheaper than a shoot" },
];

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {STATS.map((s) => (
        <div key={s.label} className="glass rounded-xl p-7 sm:p-9">
          <p className="font-display text-4xl text-ink sm:text-5xl">
            {s.prefix}
            {s.num !== undefined ? <CountUp target={s.num} run={on} /> : s.text}
            {s.suffix}
          </p>
          <p className="eyebrow mt-3">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

function CountUp({ target, run }: { target: number; run: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1100;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return <>{n}</>;
}
