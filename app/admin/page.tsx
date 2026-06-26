import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  FileText,
  Image as ImageIcon,
  Images,
  Receipt,
  Sparkles,
} from "lucide-react";
import { getLeads, type Lead } from "@/lib/leads";
import { listClientOptions } from "@/lib/clients";
import { listAllWorks, type Work } from "@/lib/works";
import { listProposals } from "@/lib/proposals";
import { listInvoices, inr, type Invoice } from "@/lib/invoices";
import { LineChart } from "@/components/site/line-chart";
import {
  Card,
  LinkButton,
  MetricCard,
  PageHeader,
  SectionLabel,
} from "@/components/os/ui";

export const dynamic = "force-dynamic";

export const metadata = { title: "Dashboard" };

async function settled<T>(p: Promise<T>, fallback: T): Promise<T> {
  try {
    return await p;
  } catch {
    return fallback;
  }
}

/** Count of items created on each of the last `days` days, oldest → newest. */
function dailySeries(dates: string[], days = 7): { label: string; net: number }[] {
  const out: { label: string; net: number }[] = [];
  const dayMs = 86_400_000;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = days - 1; i >= 0; i--) {
    const start = today.getTime() - i * dayMs;
    const end = start + dayMs;
    const count = dates.filter((d) => {
      const t = new Date(d).getTime();
      return t >= start && t < end;
    }).length;
    out.push({ label: new Date(start).toLocaleDateString("en-IN", { weekday: "short" }), net: count });
  }
  return out;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default async function DashboardPage() {
  const [clients, works, proposals, invoices, leads] = await Promise.all([
    settled(listClientOptions(), [] as { email: string; name: string }[]),
    settled(listAllWorks(), [] as Work[]),
    settled(listProposals(), [] as Awaited<ReturnType<typeof listProposals>>),
    settled(listInvoices(), [] as Invoice[]),
    settled(getLeads(), [] as Lead[]),
  ]);

  const now = new Date();
  const thisMonth = works.filter((w) => {
    const d = new Date(w.created_at);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }).length;

  const outstanding = invoices
    .filter((i) => i.status === "sent" || i.status === "overdue")
    .reduce((s, i) => s + i.total, 0);

  const acceptedProposals = proposals.filter((p) => p.status === "accepted").length;
  const recentCreatives = works.filter((w) => w.image_url).slice(0, 8);
  const series = dailySeries(works.map((w) => w.created_at));

  // Activity feed: most recent leads + proposal/invoice events.
  const activity = [
    ...leads.slice(0, 4).map((l) => ({
      icon: Building2,
      text: `New lead — ${l.brand || l.name}`,
      at: l.created_at,
    })),
    ...proposals.slice(0, 3).map((p) => ({
      icon: FileText,
      text: `Proposal ${p.status} — ${p.client_name}`,
      at: p.created_at,
    })),
    ...invoices.slice(0, 3).map((i) => ({
      icon: Receipt,
      text: `Invoice ${i.number} ${i.status} — ${i.client_name}`,
      at: i.created_at,
    })),
  ]
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, 7);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Your agency at a glance"
        actions={
          <>
            <div className="flex items-center rounded-[8px] border border-line-strong bg-input p-0.5 text-[12px]">
              <span className="px-2.5 py-1 text-muted">7d</span>
              <span className="rounded-[6px] bg-surface-3 px-2.5 py-1 text-ink">30d</span>
              <span className="px-2.5 py-1 text-muted">Custom</span>
            </div>
            <LinkButton href="/admin/reports" icon={ArrowUpRight}>
              Reports
            </LinkButton>
          </>
        }
      />

      {/* Metric cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Active Clients" value={clients.length} icon={Building2} trend={`${clients.length} onboarded`} />
        <MetricCard label="Total Creatives" value={works.length} icon={Images} trend={`+${thisMonth} this month`} />
        <MetricCard
          label="Proposals"
          value={proposals.length}
          icon={FileText}
          trend={`${acceptedProposals} accepted`}
        />
        <MetricCard
          label="Outstanding"
          value={outstanding > 0 ? inr(outstanding) : "₹0"}
          icon={Receipt}
          trend={`${invoices.filter((i) => i.status === "overdue").length} overdue`}
          trendTone={invoices.some((i) => i.status === "overdue") ? "error" : "success"}
        />
      </div>

      {/* Three-column row */}
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Recent creatives */}
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <SectionLabel>Recent Creatives</SectionLabel>
            <Link href="/admin/works" className="text-[12px] text-[#d4af37] hover:underline">
              View all →
            </Link>
          </div>
          {recentCreatives.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted">
              <ImageIcon size={22} className="mb-2" />
              <p className="text-[13px]">No creatives uploaded yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {recentCreatives.map((w) => (
                <Link
                  key={w.id}
                  href="/admin/works"
                  className="group relative aspect-square overflow-hidden rounded-[10px] border border-line-strong"
                  style={{ background: `linear-gradient(135deg, ${w.accent_color || "#333"}, #111)` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={w.image_url}
                    alt={w.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute bottom-2 left-2 right-2 truncate text-[11px] font-medium text-white drop-shadow">
                    {w.title}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </Card>

        {/* Activity feed */}
        <Card>
          <SectionLabel className="mb-4">Activity</SectionLabel>
          {activity.length === 0 ? (
            <p className="text-[13px] text-muted">No recent activity.</p>
          ) : (
            <ul className="flex flex-col gap-3.5">
              {activity.map((a, idx) => {
                const Icon = a.icon;
                return (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-input text-muted">
                      <Icon size={13} />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[12.5px] text-ink-soft">{a.text}</p>
                      <p className="text-[11px] text-muted">{timeAgo(a.at)}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </div>

      {/* Chart */}
      <Card className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <SectionLabel>Creative Output</SectionLabel>
            <p className="mt-1 text-[12px] text-muted">Uploads over the last 7 days</p>
          </div>
          <Sparkles size={16} className="text-[#d4af37]" />
        </div>
        <LineChart points={series} />
      </Card>
    </div>
  );
}
