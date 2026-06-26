import { redirect } from "next/navigation";
import { getViewer } from "@/lib/client-access";
import { listFinanceEntries, computeMonthly } from "@/lib/finance";
import { listInvoices, inr } from "@/lib/invoices";
import { LineChart } from "@/components/site/line-chart";
import { addFinanceAction, deleteFinanceAction } from "./actions";
import { Card, MetricCard, PageHeader, SectionLabel } from "@/components/os/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Finance" };

export default async function FinancePage() {
  const viewer = await getViewer();
  if (!viewer.isSuper) redirect("/admin");

  const [entries, invoices] = await Promise.all([
    listFinanceEntries().catch(() => []),
    listInvoices().catch(() => []),
  ]);

  const invoiceIncomes = invoices
    .filter((i) => i.status === "paid")
    .map((i) => ({ amount: i.total, date: i.paid_at || i.created_at }));

  const { points, totals } = computeMonthly(entries, invoiceIncomes, 12);

  return (
    <div>
      <PageHeader
        title="Finance"
        subtitle="Profit & loss · paid invoices count as income automatically"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard label="Income (12 mo)" value={inr(totals.income)} trend="paid + recorded" trendTone="success" />
        <MetricCard label="Expenses (12 mo)" value={inr(totals.expense)} trend="recurring + one-off" trendTone="error" />
        <MetricCard
          label="Net P / L"
          value={inr(totals.net)}
          trend={totals.net >= 0 ? "in profit" : "in loss"}
          trendTone={totals.net >= 0 ? "success" : "error"}
        />
      </div>

      <Card className="mt-5">
        <SectionLabel className="mb-4">Monthly net (last 12 months)</SectionLabel>
        <LineChart points={points.map((p) => ({ label: p.label, net: p.net }))} />
      </Card>

      {/* Add entry */}
      <form action={addFinanceAction} className="os-card mt-5 space-y-4 p-6">
        <SectionLabel>Add an entry</SectionLabel>
        <div className="grid gap-4 sm:grid-cols-4">
          <input name="label" required placeholder="Label * (e.g. OpenAI API)" className="os-field sm:col-span-2" />
          <input name="amount" required placeholder="Amount ₹ *" className="os-field" />
          <select name="kind" defaultValue="expense" className="os-field">
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className="grid items-end gap-4 sm:grid-cols-4">
          <label className="flex h-9 items-center gap-2 text-[13px] text-ink-soft">
            <input type="checkbox" name="recurring" className="accent-[#d4af37]" />
            Recurring (monthly)
          </label>
          <input name="months" type="number" min={1} defaultValue={6} placeholder="Months" className="os-field" />
          <div>
            <label className="os-label">Start month</label>
            <input name="start_date" type="date" className="os-field" />
          </div>
          <input name="notes" placeholder="Notes" className="os-field" />
        </div>
        <button className="os-btn-primary">Add entry</button>
        <p className="text-[12px] text-muted">
          Recurring example: a client on retainer paying ₹50,000/mo for 6 months — add once as income, recurring,
          6 months. It counts every month automatically.
        </p>
      </form>

      {/* Entries */}
      <div className="os-card mt-5 overflow-hidden p-0">
        <div className="os-scroll overflow-x-auto">
          <table className="os-table min-w-[680px]">
            <thead>
              <tr>
                <th>Label</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Recurring</th>
                <th>Start</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-muted">
                    No entries yet. Paid invoices still count as income above.
                  </td>
                </tr>
              ) : (
                entries.map((e) => (
                  <tr key={e.id}>
                    <td className="font-medium text-ink">{e.label}</td>
                    <td className={e.kind === "income" ? "text-[#10b981]" : "text-[#ef4444]"}>{e.kind}</td>
                    <td className="text-ink-soft">{inr(e.amount)}</td>
                    <td className="text-muted">{e.recurring ? `${e.months} mo` : "one-off"}</td>
                    <td className="whitespace-nowrap text-muted">{new Date(e.start_date).toLocaleDateString()}</td>
                    <td>
                      <form action={deleteFinanceAction.bind(null, e.id)}>
                        <button className="text-[#ef4444] hover:underline">Delete</button>
                      </form>
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
