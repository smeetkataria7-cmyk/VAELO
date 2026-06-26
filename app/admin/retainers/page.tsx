import { redirect } from "next/navigation";
import { getViewer } from "@/lib/client-access";
import { listProjects } from "@/lib/projects";
import { clientBilling } from "@/lib/billing";
import { inr } from "@/lib/invoices";
import { MetricCard, PageHeader, ProgressBar, StatusBadge, SectionLabel, EmptyState } from "@/components/os/ui";
import { Layers } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Retainers" };

export default async function RetainersPage() {
  const viewer = await getViewer();
  if (!viewer.isAdmin) redirect("/login");

  const [projects, { rows: billingRows }] = await Promise.all([
    listProjects().catch(() => []),
    clientBilling().catch(() => ({ rows: [], totals: { billed: 0, paid: 0, outstanding: 0 } })),
  ]);

  const activeProjects = projects.filter((p) => p.status === "active" || p.status === "onboarding");
  const billingMap = new Map(billingRows.map((r) => [r.email.toLowerCase(), r]));

  return (
    <div>
      <PageHeader
        title="Retainers"
        subtitle="Active client retainers and usage — usage limits coming once wired to DB"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard label="Active retainers" value={String(activeProjects.length)} trend="projects active / onboarding" trendTone="success" />
        <MetricCard
          label="Total collected"
          value={inr(billingRows.reduce((s, r) => s + r.paid, 0))}
          trend="from retainer clients"
          trendTone="success"
        />
        <MetricCard
          label="Outstanding"
          value={inr(billingRows.reduce((s, r) => s + r.outstanding, 0))}
          trend="due from clients"
          trendTone={billingRows.some((r) => r.outstanding > 0) ? "error" : "neutral"}
        />
      </div>

      {activeProjects.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            icon={Layers}
            title="No active retainers"
            hint="Projects with status 'active' or 'onboarding' appear here."
          />
        </div>
      ) : (
        <>
          <SectionLabel className="mb-3 mt-8">Active retainers ({activeProjects.length})</SectionLabel>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeProjects.map((p) => {
              const billing = billingMap.get(p.client_email?.toLowerCase() ?? "");
              return (
                <div key={p.id} className="os-card space-y-4 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-ink">{p.title}</p>
                      <p className="mt-0.5 text-[12px] text-muted">{p.client_email || p.client_name}</p>
                    </div>
                    <StatusBadge status={p.status} />
                  </div>

                  {/* Usage bar — placeholder until limit data is in DB */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-muted">Hours / deliverables used</span>
                      <span className="text-muted">— / —</span>
                    </div>
                    <ProgressBar used={0} limit={100} tone="gold" />
                    <p className="text-[10px] text-muted">Usage limits not yet configured — wire to DB when ready</p>
                  </div>

                  {billing && (
                    <div className="flex gap-4 border-t border-[#1e1e1e] pt-4">
                      <div>
                        <p className="text-[11px] text-muted">Collected</p>
                        <p className="text-[14px] font-medium text-[#10b981]">{inr(billing.paid)}</p>
                      </div>
                      {billing.outstanding > 0 && (
                        <div>
                          <p className="text-[11px] text-muted">Outstanding</p>
                          <p className="text-[14px] font-medium text-[#ef4444]">{inr(billing.outstanding)}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Paused / completed retainers */}
      {projects.filter((p) => p.status === "paused" || p.status === "completed").length > 0 && (
        <>
          <SectionLabel className="mb-3 mt-8">
            Inactive ({projects.filter((p) => p.status === "paused" || p.status === "completed").length})
          </SectionLabel>
          <div className="os-card overflow-hidden p-0">
            <div className="os-scroll overflow-x-auto">
              <table className="os-table min-w-[520px]">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Client</th>
                    <th>Status</th>
                    <th>Started</th>
                  </tr>
                </thead>
                <tbody>
                  {projects
                    .filter((p) => p.status === "paused" || p.status === "completed")
                    .map((p) => (
                      <tr key={p.id}>
                        <td className="font-medium text-ink">{p.title}</td>
                        <td className="text-muted">{p.client_email || p.client_name}</td>
                        <td><StatusBadge status={p.status} /></td>
                        <td className="whitespace-nowrap text-muted">{new Date(p.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
