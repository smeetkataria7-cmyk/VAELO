import { Plus, ExternalLink } from "lucide-react";
import { listInvoices, inr, isOverdue, type Invoice } from "@/lib/invoices";
import { markPaidAction, voidInvoiceAction } from "./actions";
import { LinkButton, MetricCard, PageHeader, StatusBadge } from "@/components/os/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Invoicing" };

function effectiveStatus(inv: Invoice): string {
  return isOverdue(inv) ? "overdue" : inv.status;
}

export default async function AdminInvoicesPage() {
  let invoices: Invoice[] = [];
  try {
    invoices = await listInvoices();
  } catch {
    invoices = [];
  }

  const now = new Date();
  const outstanding = invoices
    .filter((i) => effectiveStatus(i) === "sent" || effectiveStatus(i) === "overdue")
    .reduce((s, i) => s + i.total, 0);
  const overdue = invoices.filter((i) => effectiveStatus(i) === "overdue").reduce((s, i) => s + i.total, 0);
  const paidThisMonth = invoices
    .filter((i) => {
      if (i.status !== "paid" || !i.paid_at) return false;
      const d = new Date(i.paid_at);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    })
    .reduce((s, i) => s + i.total, 0);

  return (
    <div>
      <PageHeader
        title="Invoicing"
        subtitle="INR · 18% GST · Razorpay"
        actions={
          <LinkButton href="/admin/invoices/new" variant="primary" icon={Plus}>
            New invoice
          </LinkButton>
        }
      />

      {/* Overview cards */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Outstanding" value={inr(outstanding)} trend={`${invoices.length} invoices`} trendTone="info" />
        <MetricCard
          label="Overdue"
          value={inr(overdue)}
          trend={`${invoices.filter((i) => effectiveStatus(i) === "overdue").length} late`}
          trendTone="error"
        />
        <MetricCard
          label="Paid This Month"
          value={inr(paidThisMonth)}
          trend={`${invoices.filter((i) => i.status === "paid").length} paid total`}
          trendTone="success"
        />
        <MetricCard
          label="Drafts"
          value={invoices.filter((i) => i.status === "draft").length}
          trend="awaiting send"
          trendTone="warning"
        />
      </div>

      {invoices.length === 0 ? (
        <div className="os-card px-6 py-16 text-center">
          <p className="font-display text-lg text-ink">No invoices yet</p>
          <p className="mt-1 text-[13px] text-muted">Create one — or accept a proposal to auto-draft an invoice.</p>
        </div>
      ) : (
        <div className="os-card overflow-hidden p-0">
          <div className="os-scroll overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-[13px]">
              <thead className="border-b border-line-strong text-[10px] uppercase tracking-[0.08em] text-muted">
                <tr>
                  <th className="px-5 py-3 font-semibold">Invoice #</th>
                  <th className="px-5 py-3 font-semibold">Client</th>
                  <th className="px-5 py-3 font-semibold">Amount (incl. GST)</th>
                  <th className="px-5 py-3 font-semibold">Due</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => {
                  const status = effectiveStatus(inv);
                  return (
                    <tr key={inv.id} className="border-b border-line-2 last:border-0 hover:bg-[#ffffff05]">
                      <td className="px-5 py-3.5 font-medium text-ink">{inv.number}</td>
                      <td className="px-5 py-3.5 text-ink-soft">{inv.client_name}</td>
                      <td className="px-5 py-3.5 font-medium text-ink">{inr(inv.total)}</td>
                      <td className="px-5 py-3.5 text-muted">
                        {inv.due_date
                          ? new Date(inv.due_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
                          : "—"}
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusBadge status={status} />
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-3 text-[12px]">
                          <a
                            href={`/i/${inv.public_token}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-[#d4af37] hover:underline"
                          >
                            View <ExternalLink size={12} />
                          </a>
                          {inv.status !== "paid" && inv.status !== "void" ? (
                            <>
                              <form action={markPaidAction.bind(null, inv.id)}>
                                <button className="text-[#10b981] hover:underline">Mark paid</button>
                              </form>
                              <form action={voidInvoiceAction.bind(null, inv.id)}>
                                <button className="text-muted hover:text-ink">Void</button>
                              </form>
                            </>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="mt-4 flex items-center gap-2 text-[12px] text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
        Razorpay · UPI · Cards · Subscriptions · Auto-reminders
      </p>
    </div>
  );
}
