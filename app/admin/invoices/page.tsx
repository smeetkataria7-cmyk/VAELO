import Link from "next/link";
import { listInvoices, inr, isOverdue } from "@/lib/invoices";
import { markPaidAction, voidInvoiceAction } from "./actions";
import { AdminTabs } from "@/components/site/admin-tabs";

export const dynamic = "force-dynamic";
export const metadata = { title: "Invoices · Admin", robots: { index: false } };

const statusColor: Record<string, string> = {
  draft: "text-muted",
  sent: "text-ink-soft",
  paid: "text-green-400",
  overdue: "text-red-400",
  void: "text-muted line-through",
};

export default async function AdminInvoicesPage() {
  const invoices = await listInvoices();

  return (
    <section className="container-vaelo py-12">
      <AdminTabs />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Invoices</h1>
        <Link
          href="/admin/invoices/new"
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-ink-soft"
        >
          New invoice
        </Link>
      </div>

      {invoices.length === 0 ? (
        <p className="mt-8 text-muted">No invoices yet.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-paper-2 text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Number</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Due</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">By</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => {
                const status = isOverdue(inv) ? "overdue" : inv.status;
                return (
                  <tr key={inv.id} className="border-t border-line">
                    <td className="px-4 py-3 font-medium">{inv.number}</td>
                    <td className="px-4 py-3">{inv.client_name}</td>
                    <td className="px-4 py-3">{inr(inv.total)}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted">
                      {inv.due_date ? new Date(inv.due_date).toLocaleDateString() : "—"}
                    </td>
                    <td className={`px-4 py-3 capitalize ${statusColor[status] ?? ""}`}>{status}</td>
                    <td className="px-4 py-3 text-muted">{inv.created_by || "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <a href={`/i/${inv.public_token}`} target="_blank" className="text-accent hover:underline">View</a>
                        {inv.status !== "paid" && inv.status !== "void" && (
                          <>
                            <form action={markPaidAction.bind(null, inv.id)}>
                              <button className="text-green-400 hover:underline">Mark paid</button>
                            </form>
                            <form action={voidInvoiceAction.bind(null, inv.id)}>
                              <button className="text-muted hover:text-ink">Void</button>
                            </form>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
