import { redirect } from "next/navigation";
import { getViewer } from "@/lib/client-access";
import { clientBilling } from "@/lib/billing";
import { inr } from "@/lib/invoices";
import { MetricCard, PageHeader } from "@/components/os/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Billing" };

export default async function BillingPage() {
  const viewer = await getViewer();
  if (!viewer.isAdmin) redirect("/login");

  const { rows, totals } = await clientBilling();

  return (
    <div>
      <PageHeader title="Billing Analytics" subtitle="Revenue collected across all clients" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard label="Total billed" value={inr(totals.billed)} trend="all invoices" trendTone="neutral" />
        <MetricCard label="Collected" value={inr(totals.paid)} trend="paid invoices" trendTone="success" />
        <MetricCard
          label="Outstanding"
          value={inr(totals.outstanding)}
          trend={totals.outstanding > 0 ? "unpaid" : "all clear"}
          trendTone={totals.outstanding > 0 ? "error" : "success"}
        />
      </div>

      <div className="os-card mt-6 overflow-hidden p-0">
        <div className="os-scroll overflow-x-auto">
          <table className="os-table min-w-[680px]">
            <thead>
              <tr>
                <th>Client</th>
                <th>Email</th>
                <th>Invoices</th>
                <th>Billed</th>
                <th>Collected</th>
                <th>Outstanding</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-muted">No invoices yet.</td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.email}>
                    <td className="font-medium text-ink">{r.name || "—"}</td>
                    <td className="text-muted">{r.email}</td>
                    <td className="text-ink-soft">{r.count}</td>
                    <td className="text-ink-soft">{inr(r.billed)}</td>
                    <td className="text-[#10b981]">{inr(r.paid)}</td>
                    <td className={r.outstanding > 0 ? "text-[#ef4444]" : "text-muted"}>
                      {r.outstanding > 0 ? inr(r.outstanding) : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
