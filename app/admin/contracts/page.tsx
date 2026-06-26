import { listContracts } from "@/lib/contracts";
import { ClientEmailInput } from "@/components/site/client-email-input";
import { createContractAction, deleteContractAction } from "./actions";
import { PageHeader, SectionLabel, StatusBadge } from "@/components/os/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Contracts" };

export default async function AdminContractsPage() {
  const contracts = await listContracts();

  return (
    <div>
      <PageHeader title="Contracts" subtitle="Send agreements clients can sign by typing their name" />

      <form action={createContractAction} className="os-card mb-5 space-y-4 p-6">
        <SectionLabel>New contract</SectionLabel>
        <div className="grid gap-4 sm:grid-cols-3">
          <input name="title" required placeholder="Contract title *" className="os-field" />
          <input name="client_name" required placeholder="Client name *" className="os-field" />
          <ClientEmailInput placeholder="Client email" className="os-field" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="os-label">Upload contract PDF</label>
            <input name="file" type="file" accept="application/pdf" className="block w-full text-[13px] text-ink-soft" />
          </div>
          <div>
            <label className="os-label">…or paste a link (Drive, etc.)</label>
            <input name="file_link" type="url" placeholder="https://drive.google.com/…" className="os-field" />
          </div>
        </div>
        <textarea name="body" rows={3} placeholder="Optional terms / note shown above the PDF…" className="os-field" />
        <button className="os-btn-primary">Create &amp; get sign link</button>
        <p className="text-[12px] text-muted">
          Upload your PDF (or a link). The client opens it and signs by typing their name.
        </p>
      </form>

      {contracts.length === 0 ? (
        <div className="os-card px-6 py-16 text-center">
          <p className="font-display text-lg text-ink">No contracts yet</p>
          <p className="mt-1 text-[13px] text-muted">Create one to get a shareable sign link.</p>
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
                  <th>Status</th>
                  <th>By</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((c) => (
                  <tr key={c.id}>
                    <td className="whitespace-nowrap text-muted">{new Date(c.created_at).toLocaleDateString()}</td>
                    <td className="font-medium text-ink">{c.title}</td>
                    <td className="text-ink-soft">{c.client_name}</td>
                    <td>
                      <StatusBadge
                        status={c.status === "signed" ? "signed" : "sent"}
                        label={c.status === "signed" ? `Signed · ${c.signer_name}` : "Awaiting sign"}
                      />
                    </td>
                    <td className="text-muted">{c.created_by || "—"}</td>
                    <td>
                      <div className="flex items-center gap-4">
                        <a href={`/c/${c.public_token}`} target="_blank" className="text-[#d4af37] hover:underline">
                          View
                        </a>
                        <form action={deleteContractAction.bind(null, c.id)}>
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
