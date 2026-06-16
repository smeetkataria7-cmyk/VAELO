import Link from "next/link";
import { listProposals, inr } from "@/lib/proposals";

export const dynamic = "force-dynamic";
export const metadata = { title: "Proposals · Admin", robots: { index: false } };

const statusColor: Record<string, string> = {
  draft: "text-muted",
  sent: "text-ink-soft",
  viewed: "text-accent",
  accepted: "text-green-400",
  declined: "text-red-400",
};

export default async function AdminProposalsPage() {
  const proposals = await listProposals();

  return (
    <section className="container-vaelo py-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">Proposals</h1>
          <Link href="/admin" className="text-sm text-muted hover:text-ink">Leads →</Link>
        </div>
        <Link
          href="/admin/proposals/new"
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-ink-soft"
        >
          New proposal
        </Link>
      </div>

      {proposals.length === 0 ? (
        <p className="mt-8 text-muted">No proposals yet.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-paper-2 text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Link</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map((p) => (
                <tr key={p.id} className="border-t border-line">
                  <td className="whitespace-nowrap px-4 py-3 text-muted">
                    {new Date(p.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3">{p.client_name}</td>
                  <td className="px-4 py-3">{inr(p.total)}</td>
                  <td className={`px-4 py-3 capitalize ${statusColor[p.status] ?? ""}`}>{p.status}</td>
                  <td className="px-4 py-3">
                    <a href={`/p/${p.public_token}`} target="_blank" className="text-accent hover:underline">
                      View →
                    </a>
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
