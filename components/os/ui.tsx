import Link from "next/link";
import type { ComponentType, ReactNode } from "react";

/* ----------------------------------------------------------------
   VAELO Agency OS — shared presentational primitives.
   Server-safe (no client hooks) so pages can be server components.
   Styled to the handoff design tokens (dark + gold).
----------------------------------------------------------------- */

type IconType = ComponentType<{ size?: number | string; className?: string; strokeWidth?: number }>;

const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(" ");

/* --- Tones / status chips -------------------------------------- */

export type Tone = "gold" | "success" | "error" | "warning" | "info" | "neutral";

const TONE_HEX: Record<Tone, string> = {
  gold: "#d4af37",
  success: "#10b981",
  error: "#ef4444",
  warning: "#f59e0b",
  info: "#3b82f6",
  neutral: "#9ca3af",
};

/** Map a domain status string to a chip tone. */
export function statusTone(status?: string | null): Tone {
  switch ((status ?? "").toLowerCase()) {
    case "accepted":
    case "paid":
    case "active":
    case "won":
    case "published":
    case "connected":
      return "success";
    case "overdue":
    case "declined":
    case "lost":
    case "at risk":
    case "at_risk":
      return "error";
    case "sent":
    case "proposal":
    case "proposal_sent":
    case "pending":
    case "revision":
      return "warning";
    case "viewed":
    case "contacted":
    case "onboarding":
    case "info":
      return "info";
    case "draft":
    case "new":
    case "paused":
    case "completed":
    default:
      return "neutral";
  }
}

export function StatusChip({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const hex = TONE_HEX[tone];
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-[5px] px-2 py-[3px] text-[10px] font-semibold uppercase tracking-[0.05em]",
        className,
      )}
      style={{ color: hex, backgroundColor: `${hex}1f` }}
    >
      {children}
    </span>
  );
}

/** Small status chip that infers its tone from a status string. */
export function StatusBadge({ status, label }: { status?: string | null; label?: string }) {
  return <StatusChip tone={statusTone(status)}>{label ?? status ?? "—"}</StatusChip>;
}

/* --- Layout / headings ----------------------------------------- */

export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx("text-[10px] font-semibold uppercase tracking-[0.1em] text-muted", className)}>
      {children}
    </p>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-[28px] leading-tight text-ink">{title}</h1>
        {subtitle ? <p className="mt-1 text-[13px] text-muted">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

/* --- Surfaces -------------------------------------------------- */

export function Card({
  children,
  className,
  hover = false,
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padded?: boolean;
}) {
  return (
    <div className={cx("os-card", hover && "os-card-hover", padded && "p-5", className)}>
      {children}
    </div>
  );
}

export function MetricCard({
  label,
  value,
  trend,
  trendTone = "success",
  icon: Icon,
}: {
  label: string;
  value: ReactNode;
  trend?: string;
  trendTone?: Tone;
  icon?: IconType;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <SectionLabel>{label}</SectionLabel>
        {Icon ? <Icon size={16} className="text-muted" /> : null}
      </div>
      <div className="mt-3 font-display text-[38px] leading-none text-ink">{value}</div>
      {trend ? (
        <div className="mt-2 text-[12px] font-medium" style={{ color: TONE_HEX[trendTone] }}>
          {trend}
        </div>
      ) : null}
    </Card>
  );
}

/* --- Buttons --------------------------------------------------- */

const BTN_BASE =
  "inline-flex items-center justify-center gap-2 rounded-[8px] px-4 text-[13px] font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none";

function btnClass(variant: "primary" | "secondary" | "ghost" | "danger", size: "sm" | "md") {
  const sizing = size === "sm" ? "h-8" : "h-9";
  const styles = {
    primary: "bg-[#d4af37] text-[#0a0a0a] hover:bg-[#e0bd4a]",
    secondary: "bg-input border border-line-strong text-ink hover:border-[#3a3a3a]",
    ghost: "text-muted hover:text-ink",
    danger: "bg-[#ef444412] border border-[#ef444455] text-[#ef4444] hover:bg-[#ef444420]",
  }[variant];
  return cx(BTN_BASE, sizing, styles);
}

export function Button({
  children,
  variant = "secondary",
  size = "md",
  icon: Icon,
  type = "button",
  className,
  ...rest
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  icon?: IconType;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={cx(btnClass(variant, size), className)} {...rest}>
      {Icon ? <Icon size={15} /> : null}
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  href,
  variant = "secondary",
  size = "md",
  icon: Icon,
  className,
}: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  icon?: IconType;
  className?: string;
}) {
  return (
    <Link href={href} className={cx(btnClass(variant, size), className)}>
      {Icon ? <Icon size={15} /> : null}
      {children}
    </Link>
  );
}

/* --- Avatar ---------------------------------------------------- */

export function ClientAvatar({
  name,
  accent = "#d4af37",
  size = 52,
  rounded = 14,
}: {
  name: string;
  accent?: string;
  size?: number;
  rounded?: number;
}) {
  const initial = (name?.trim()?.[0] ?? "?").toUpperCase();
  return (
    <div
      className="flex shrink-0 items-center justify-center font-display"
      style={{
        width: size,
        height: size,
        borderRadius: rounded,
        background: `${accent}1f`,
        color: accent,
        border: `1px solid ${accent}40`,
        fontSize: size * 0.42,
      }}
    >
      {initial}
    </div>
  );
}

/* --- Progress bar (retainer usage etc.) ------------------------ */

export function ProgressBar({
  used,
  limit,
  tone,
}: {
  used: number;
  limit: number;
  tone?: Tone;
}) {
  const pct = limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0;
  const over = limit > 0 && used >= limit;
  const hex = TONE_HEX[tone ?? (over ? "error" : "gold")];
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: "#ffffff12" }}>
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: hex }} />
    </div>
  );
}

/* --- Empty / loading states ------------------------------------ */

export function EmptyState({
  icon: Icon,
  title,
  hint,
  action,
}: {
  icon?: IconType;
  title: string;
  hint?: string;
  action?: ReactNode;
}) {
  return (
    <div className="os-card flex flex-col items-center justify-center px-6 py-16 text-center">
      {Icon ? (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-input text-muted">
          <Icon size={22} />
        </div>
      ) : null}
      <p className="font-display text-lg text-ink">{title}</p>
      {hint ? <p className="mt-1 max-w-sm text-[13px] text-muted">{hint}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cx("os-skeleton", className)} />;
}

/* --- Misc ------------------------------------------------------ */

export function CountPill({ count, tone = "gold" }: { count: number; tone?: Tone }) {
  const hex = TONE_HEX[tone];
  return (
    <span
      className="ml-auto inline-flex min-w-[18px] items-center justify-center rounded-full px-1.5 text-[10px] font-semibold"
      style={{ color: hex, backgroundColor: `${hex}26` }}
    >
      {count}
    </span>
  );
}

export { TONE_HEX };
