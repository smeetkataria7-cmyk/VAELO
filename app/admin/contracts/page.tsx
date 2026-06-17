import { listContracts } from "@/lib/contracts";
import { AdminTabs } from "@/components/site/admin-tabs";
import { ClientEmailInput } from "@/components/site/client-email-input";
import { createContractAction, deleteContractAction } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Contracts · Admin", robots: { index: false } };

const statusColor: Record<string, string> = {
  sent: "text-accent",
  signed: "text-green-400",
};

export default async function AdminContractsPage() {
  const contracts = await listContracts();

  return (
    <section className="container-vaelo py-12">
      <AdminTabs />
      <h1 className="text-2xl font-semibold tracking-tight">Contracts</h1>

      <form action={createContractAction} className="mt-6 space-y-4 rounded-2xl border border-line p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <input name="title" required placeholder="Contract title *" className="border-b border-line bg-transparent pb-2 outline-none focus:border-accent" />
          <input name="client_name" required placeholder="Client name *" className="border-b border-line bg-transparent pb-2 outline-none focus:border-accent" />
          <ClientEmailInput placeholder="Client email" className="border-b border-line bg-transparent pb-2 outline-none focus:border-accent" />
        </div>
        <textarea name="body" rows={5} placeholder="Contract terms / text…" className="w-full border-b border-line bg-transparent pb-2 outline-none focus:border-accent" />
        <button className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-ink-soft">
          Create &amp; get sign link
        </button>
      </form>

      {contracts.length === 0 ? (
        <p className="mt-8 text-muted">No contracts yet.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-paper-2 text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Link</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((c) => (
                <tr key={c.id} className="border-t border-line">
                  <td className="whitespace-nowrap px-4 py-3 text-muted">{new Date(c.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 font-medium">{c.title}</td>
                  <td className="px-4 py-3">{c.client_name}</td>
                  <td className={`px-4 py-3 capitalize ${statusColor[c.status] ?? ""}`}>
                    {c.status === "signed" ? `Signed by ${c.signer_name}` : "Waiting to sign"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-4">
                      <a href={`/c/${c.public_token}`} target="_blank" className="text-accent hover:underline">View</a>
                      <form action={deleteContractAction.bind(null, c.id)}>
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
