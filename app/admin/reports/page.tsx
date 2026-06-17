import { listReports } from "@/lib/reports";
import { AdminTabs } from "@/components/site/admin-tabs";
import { createReportAction, deleteReportAction } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Reports · Admin", robots: { index: false } };

const field = "border-b border-line bg-transparent pb-2 outline-none focus:border-accent";

export default async function AdminReportsPage() {
  const reports = await listReports();

  return (
    <section className="container-vaelo py-12">
      <AdminTabs />
      <h1 className="text-2xl font-semibold tracking-tight">Ad reports</h1>

      <form action={createReportAction} className="mt-6 space-y-4 rounded-2xl border border-line p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <input name="client_email" type="email" required placeholder="Client email *" className={field} />
          <input name="title" required placeholder="Report title * (e.g. June performance)" className={field} />
          <input name="period" placeholder="Period (e.g. Jun 2026)" className={field} />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <select name="platform" className={field} defaultValue="">
            <option value="" disabled>Platform…</option>
            <option>Meta Ads</option>
            <option>Facebook Ads</option>
            <option>Instagram Ads</option>
            <option>Amazon Ads</option>
            <option>Google Ads</option>
            <option>Other</option>
          </select>
          <input name="link" type="url" placeholder="Dashboard / PDF link (Looker Studio…)" className={`sm:col-span-2 ${field}`} />
        </div>
        <div className="grid gap-4 sm:grid-cols-5">
          <input name="spend" placeholder="Spend ₹" className={field} />
          <input name="reach" placeholder="Reach" className={field} />
          <input name="clicks" placeholder="Clicks" className={field} />
          <input name="conversions" placeholder="Conversions" className={field} />
          <input name="roas" placeholder="ROAS (e.g. 3.2x)" className={field} />
        </div>
        <input name="notes" placeholder="Notes (optional)" className={`w-full ${field}`} />
        <button className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-ink-soft">
          Add report
        </button>
      </form>

      {reports.length === 0 ? (
        <p className="mt-8 text-muted">No reports yet.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-paper-2 text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Platform</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id} className="border-t border-line">
                  <td className="whitespace-nowrap px-4 py-3 text-muted">{new Date(r.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 font-medium">{r.title}{r.period ? ` · ${r.period}` : ""}</td>
                  <td className="px-4 py-3 text-muted">{r.client_email}</td>
                  <td className="px-4 py-3">{r.platform || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-4">
                      {r.link && <a href={r.link} target="_blank" className="text-accent hover:underline">Open</a>}
                      <form action={deleteReportAction.bind(null, r.id)}>
                        <button className="text-red-400 hover:underline">Delete</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
