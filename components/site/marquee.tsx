/** Infinite scrolling keyword ticker. CSS-only. */
export function Marquee({ items }: { items: string[] }) {
  const Group = () => (
    <div className="flex items-center gap-12 pr-12">
      {items.map((t, i) => (
        <span key={i} className="flex items-center gap-12 whitespace-nowrap">
          <span className="font-display text-3xl text-ink/90 sm:text-5xl">{t}</span>
          <span className="text-xl text-accent">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee border-y border-line py-6">
      <div className="marquee-track" aria-hidden>
        <Group />
        <Group />
      </div>
    </div>
  );
}
