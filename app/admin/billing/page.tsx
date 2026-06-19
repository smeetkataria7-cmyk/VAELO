import { redirect } from "next/navigation";
import { getViewer } from "@/lib/client-access";
import { clientBilling } from "@/lib/billing";
import { inr } from "@/lib/invoices";
import { AdminTabs } from "@/components/site/admin-tabs";

export const dynamic = "force-dynamic";
export const metadata = { title: "Billing · Admin", robots: { index: false } };

export default async function BillingPage() {
  const viewer = await getViewer();
  if (!viewer.isAdmin) redirect("/login");

  const { rows, totals } = await clientBilling();

  const cards = [
    { label: "Total billed", value: inr(totals.billed) },
    { label: "Collected", value: inr(totals.paid), tone: "text-green-400" },
    { label: "Outstanding", value: inr(totals.outstanding), tone: "text-red-400" },
  ];

  return (
    <section className="container-vaelo py-12">
      <AdminTabs />
      <h1 className="text-2xl font-semibold tracking-tight">Billing analytics</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="glass rounded-xl p-7">
            <p className={`font-display text-4xl ${c.tone ?? ""}`}>{c.value}</p>
            <p className="mt-2 text-xs uppercase tracking-wider text-muted">{c.label}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-sm uppercase tracking-wider text-muted">By client</h2>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper-2 text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Invoices</th>
              <th className="px-4 py-3 font-medium">Billed</th>
              <th className="px-4 py-3 font-medium">Collected</th>
              <th className="px-4 py-3 font-medium">Outstanding</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-3 text-muted">No invoices yet.</td></tr>
            ) : (
              rows.map((r) => (
                <tr key={r.email} className="border-t border-line">
                  <td className="px-4 py-3 font-medium">{r.name || "—"}</td>
                  <td className="px-4 py-3 text-muted">{r.email}</td>
                  <td className="px-4 py-3">{r.count}</td>
                  <td className="px-4 py-3">{inr(r.billed)}</td>
                  <td className="px-4 py-3 text-green-400">{inr(r.paid)}</td>
                  <td className="px-4 py-3 text-red-400">{r.outstanding > 0 ? inr(r.outstanding) : "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
