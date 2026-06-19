/** Minimal responsive SVG line chart of monthly net P&L. */
export function LineChart({ points }: { points: { label: string; net: number }[] }) {
  const w = 820;
  const h = 260;
  const pad = 36;
  if (points.length === 0) return null;

  const vals = points.map((p) => p.net);
  const max = Math.max(1, ...vals);
  const min = Math.min(0, ...vals);
  const range = max - min || 1;
  const n = points.length;

  const x = (i: number) => pad + (i * (w - 2 * pad)) / Math.max(1, n - 1);
  const y = (v: number) => h - pad - ((v - min) / range) * (h - 2 * pad);

  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(p.net).toFixed(1)}`).join(" ");
  const area = `${path} L ${x(n - 1).toFixed(1)} ${y(min).toFixed(1)} L ${x(0).toFixed(1)} ${y(min).toFixed(1)} Z`;
  const zeroY = y(0);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full" preserveAspectRatio="xMidYMid meet">
      {/* zero baseline */}
      <line x1={pad} y1={zeroY} x2={w - pad} y2={zeroY} stroke="var(--line)" strokeWidth="1" />
      {/* area + line */}
      <path d={area} fill="var(--accent)" opacity="0.08" />
      <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {points.map((p, i) => (
        <g key={p.label}>
          <circle cx={x(i)} cy={y(p.net)} r="3.5" fill="var(--accent)" />
          <text x={x(i)} y={h - 12} textAnchor="middle" fontSize="11" fill="var(--muted)">
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
