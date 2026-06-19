import { redirect } from "next/navigation";
import { getViewer } from "@/lib/client-access";
import { listFinanceEntries, computeMonthly } from "@/lib/finance";
import { listInvoices, inr } from "@/lib/invoices";
import { AdminTabs } from "@/components/site/admin-tabs";
import { LineChart } from "@/components/site/line-chart";
import { addFinanceAction, deleteFinanceAction } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Finance · Admin", robots: { index: false } };

const field = "border-b border-line bg-transparent pb-2 outline-none focus:border-accent";

export default async function FinancePage() {
  const viewer = await getViewer();
  if (!viewer.isSuper) redirect("/admin");

  const [entries, invoices] = await Promise.all([
    listFinanceEntries().catch(() => []),
    listInvoices().catch(() => []),
  ]);

  // Paid invoices count as income, on the date they were paid.
  const invoiceIncomes = invoices
    .filter((i) => i.status === "paid")
    .map((i) => ({ amount: i.total, date: i.paid_at || i.created_at }));

  const { points, totals } = computeMonthly(entries, invoiceIncomes, 12);

  const cards = [
    { label: "Income (12 mo)", value: inr(totals.income), tone: "text-green-400" },
    { label: "Expenses (12 mo)", value: inr(totals.expense), tone: "text-red-400" },
    { label: "Net profit / loss", value: inr(totals.net), tone: totals.net >= 0 ? "text-green-400" : "text-red-400" },
  ];

  return (
    <section className="container-vaelo py-12">
      <AdminTabs />
      <h1 className="text-2xl font-semibold tracking-tight">Finance — profit &amp; loss</h1>
      <p className="mt-2 text-sm text-muted">
        Paid invoices count as income automatically. Add your subscriptions, APIs, and
        retainers below — tick <em>recurring</em> for monthly items.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="glass rounded-xl p-7">
            <p className={`font-display text-4xl ${c.tone}`}>{c.value}</p>
            <p className="mt-2 text-xs uppercase tracking-wider text-muted">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="glass mt-4 rounded-2xl p-6">
        <p className="eyebrow mb-4">Monthly net (last 12 months)</p>
        <LineChart points={points.map((p) => ({ label: p.label, net: p.net }))} />
      </div>

      {/* Add entry */}
      <form action={addFinanceAction} className="mt-8 space-y-4 rounded-2xl border border-line p-6">
        <div className="grid gap-4 sm:grid-cols-4">
          <input name="label" required placeholder="Label * (e.g. OpenAI API)" className={`sm:col-span-2 ${field}`} />
          <input name="amount" required placeholder="Amount ₹ *" className={field} />
          <select name="kind" defaultValue="expense" className={field}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className="grid items-center gap-4 sm:grid-cols-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="recurring" className="accent-[var(--accent)]" />
            Recurring (monthly)
          </label>
          <input name="months" type="number" min={1} defaultValue={6} placeholder="Months" className={field} />
          <div>
            <label className="eyebrow block">Start month</label>
            <input name="start_date" type="date" className={`mt-1 w-full ${field}`} />
          </div>
          <input name="notes" placeholder="Notes" className={field} />
        </div>
        <button className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-ink-soft">
          Add entry
        </button>
        <p className="text-xs text-muted">
          Recurring example: a client on retainer paying ₹50,000/mo for 6 months — add once as
          income, recurring, 6 months. It counts every month automatically.
        </p>
      </form>

      {/* Entries */}
      <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper-2 text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Label</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Recurring</th>
              <th className="px-4 py-3 font-medium">Start</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-3 text-muted">No entries yet. Paid invoices still count as income above.</td></tr>
            ) : (
              entries.map((e) => (
                <tr key={e.id} className="border-t border-line">
                  <td className="px-4 py-3 font-medium">{e.label}</td>
                  <td className={`px-4 py-3 capitalize ${e.kind === "income" ? "text-green-400" : "text-red-400"}`}>{e.kind}</td>
                  <td className="px-4 py-3">{inr(e.amount)}</td>
                  <td className="px-4 py-3 text-muted">{e.recurring ? `${e.months} mo` : "one-off"}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted">{new Date(e.start_date).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <form action={deleteFinanceAction.bind(null, e.id)}>
                      <button className="text-red-400 hover:underline">Delete</button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
