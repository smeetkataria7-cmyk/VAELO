import { listReports } from "@/lib/reports";
import { ClientEmailInput } from "@/components/site/client-email-input";
import { createReportAction, deleteReportAction } from "./actions";
import { PageHeader, SectionLabel } from "@/components/os/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Reports" };

export default async function AdminReportsPage() {
  const reports = await listReports();

  return (
    <div>
      <PageHeader title="Ad Reports" subtitle="Performance reports delivered to clients" />

      <form action={createReportAction} className="os-card mb-5 space-y-4 p-6">
        <SectionLabel>Add a report</SectionLabel>
        <div className="grid gap-4 sm:grid-cols-3">
          <ClientEmailInput required placeholder="Client email *" className="os-field" />
          <input name="title" required placeholder="Report title * (e.g. June performance)" className="os-field" />
          <input name="period" placeholder="Period (e.g. Jun 2026)" className="os-field" />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <select name="platform" className="os-field" defaultValue="">
            <option value="" disabled>
              Platform…
            </option>
            <option>Meta Ads</option>
            <option>Facebook Ads</option>
            <option>Instagram Ads</option>
            <option>Amazon Ads</option>
            <option>Google Ads</option>
            <option>Other</option>
          </select>
          <input name="link" type="url" placeholder="Dashboard / PDF link (Looker Studio…)" className="os-field sm:col-span-2" />
        </div>
        <div className="grid gap-4 sm:grid-cols-5">
          <input name="spend" placeholder="Spend ₹" className="os-field" />
          <input name="reach" placeholder="Reach" className="os-field" />
          <input name="clicks" placeholder="Clicks" className="os-field" />
          <input name="conversions" placeholder="Conversions" className="os-field" />
          <input name="roas" placeholder="ROAS (e.g. 3.2x)" className="os-field" />
        </div>
        <input name="notes" placeholder="Notes (optional)" className="os-field" />
        <button className="os-btn-primary">Add report</button>
      </form>

      {reports.length === 0 ? (
        <div className="os-card px-6 py-16 text-center">
          <p className="font-display text-lg text-ink">No reports yet</p>
          <p className="mt-1 text-[13px] text-muted">Add a performance report to share it in the client portal.</p>
        </div>
      ) : (
        <div className="os-card overflow-hidden p-0">
          <div className="os-scroll overflow-x-auto">
            <table className="os-table min-w-[720px]">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Client</th>
                  <th>Platform</th>
                  <th>By</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r.id}>
                    <td className="whitespace-nowrap text-muted">{new Date(r.created_at).toLocaleDateString()}</td>
                    <td className="font-medium text-ink">
                      {r.title}
                      {r.period ? ` · ${r.period}` : ""}
                    </td>
                    <td className="text-muted">{r.client_email}</td>
                    <td className="text-ink-soft">{r.platform || "—"}</td>
                    <td className="text-muted">{r.created_by || "—"}</td>
                    <td>
                      <div className="flex items-center gap-4">
                        {r.link && (
                          <a href={r.link} target="_blank" className="text-[#d4af37] hover:underline">
                            Open
                          </a>
                        )}
                        <form action={deleteReportAction.bind(null, r.id)}>
                          <button className="text-[#ef4444] hover:underline">Delete</button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
