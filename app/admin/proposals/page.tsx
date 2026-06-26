import Link from "next/link";
import { ExternalLink, FolderPlus, Plus, ReceiptText, Sparkles } from "lucide-react";
import { listProposals, inr, type Proposal } from "@/lib/proposals";
import { convertToProjectAction } from "./actions";
import { createInvoiceFromProposalAction } from "../invoices/actions";
import { LinkButton, PageHeader, StatusBadge } from "@/components/os/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Proposals" };

const PIPELINE: { key: Proposal["status"]; label: string }[] = [
  { key: "draft", label: "Draft" },
  { key: "sent", label: "Sent" },
  { key: "viewed", label: "Viewed" },
  { key: "accepted", label: "Accepted" },
  { key: "declined", label: "Declined" },
];

export default async function AdminProposalsPage() {
  let proposals: Proposal[] = [];
  try {
    proposals = await listProposals();
  } catch {
    proposals = [];
  }

  const count = (s: Proposal["status"]) => proposals.filter((p) => p.status === s).length;

  return (
    <div>
      <PageHeader
        title="Proposals"
        subtitle={`${proposals.length} total · ${count("accepted")} accepted`}
        actions={
          <LinkButton href="/admin/proposals/new" variant="primary" icon={Plus}>
            New proposal
          </LinkButton>
        }
      />

      {/* Pipeline strip */}
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {PIPELINE.map((stage) => (
          <div key={stage.key} className="os-card p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">{stage.label}</p>
            <p className="mt-1.5 font-display text-[24px] text-ink">{count(stage.key)}</p>
          </div>
        ))}
      </div>

      {proposals.length === 0 ? (
        <div className="os-card px-6 py-16 text-center">
          <p className="font-display text-lg text-ink">No proposals yet</p>
          <p className="mt-1 text-[13px] text-muted">Create one to send a hosted, trackable proposal.</p>
        </div>
      ) : (
        <div className="os-card overflow-hidden p-0">
          <div className="os-scroll overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-[13px]">
              <thead className="border-b border-line-strong text-[10px] uppercase tracking-[0.08em] text-muted">
                <tr>
                  <th className="px-5 py-3 font-semibold">Client / Title</th>
                  <th className="px-5 py-3 font-semibold">Amount</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Sent</th>
                  <th className="px-5 py-3 font-semibold">Viewed</th>
                  <th className="px-5 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {proposals.map((p) => (
                  <tr key={p.id} className="border-b border-line-2 last:border-0 hover:bg-[#ffffff05]">
                    <td className="px-5 py-3.5">
                      <div className="font-medium text-ink">{p.client_name}</div>
                      <div className="text-[12px] text-muted">{p.title}</div>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-ink">{inr(p.total)}</td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="px-5 py-3.5 text-muted">
                      {new Date(p.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </td>
                    <td className="px-5 py-3.5 text-muted">
                      {p.viewed_at
                        ? new Date(p.viewed_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
                        : "—"}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-3 text-[12px]">
                        <a
                          href={`/p/${p.public_token}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-[#d4af37] hover:underline"
                        >
                          View <ExternalLink size={12} />
                        </a>
                        {p.status === "accepted" ? (
                          <>
                            <form action={convertToProjectAction.bind(null, p.id)}>
                              <button className="inline-flex items-center gap-1 text-muted hover:text-ink">
                                <FolderPlus size={13} /> Project
                              </button>
                            </form>
                            <form action={createInvoiceFromProposalAction.bind(null, p.id)}>
                              <button className="inline-flex items-center gap-1 text-muted hover:text-ink">
                                <ReceiptText size={13} /> Invoice
                              </button>
                            </form>
                          </>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI draft callout */}
      <Link
        href="/admin/proposals/new"
        className="mt-5 flex items-center gap-3 rounded-[12px] border border-[#d4af3740] bg-[#d4af370d] p-4 transition-colors hover:bg-[#d4af3714]"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#d4af371f] text-[#d4af37]">
          <Sparkles size={17} />
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-ink">AI Proposal Draft</p>
          <p className="text-[12px] text-muted">Generated from Brand Brain · scope + pricing pre-filled</p>
        </div>
        <span className="ml-auto text-[12px] font-medium text-[#d4af37]">Review draft →</span>
      </Link>
    </div>
  );
}
