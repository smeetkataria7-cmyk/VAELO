import Link from "next/link";
import { notFound } from "next/navigation";
import { getProposalByToken, markViewed, inr } from "@/lib/proposals";
import { acceptProposal, declineProposal } from "./actions";
import { getViewer, canAccess } from "@/lib/client-access";
import { NoAccess } from "@/components/site/no-access";

export const dynamic = "force-dynamic";
export const metadata = { title: "Proposal", robots: { index: false } };

export default async function ProposalPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const p = await getProposalByToken(token);
  if (!p) notFound();
  if (!canAccess(await getViewer(), p.client_email)) return <NoAccess />;
  await markViewed(token);

  const decided = p.status === "accepted" || p.status === "declined";

  return (
    <section className="container-vaelo max-w-2xl py-16 sm:py-24">
      <Link href="/portal" className="mb-8 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink">
        ← Back to portal
      </Link>
      <p className="eyebrow">Proposal for {p.client_name}</p>
      <h1 className="font-display mt-4 text-4xl sm:text-5xl">{p.title}</h1>

      <div className="mt-10 overflow-hidden rounded-2xl border border-line">
        <table className="w-full text-left text-sm">
          <tbody>
            {p.items.map((it, i) => (
              <tr key={i} className="border-b border-line last:border-0">
                <td className="px-5 py-4">{it.desc}</td>
                <td className="px-5 py-4 text-right">{inr(it.amount)}</td>
              </tr>
            ))}
            <tr className="bg-paper-2">
              <td className="px-5 py-4 font-medium">Total</td>
              <td className="px-5 py-4 text-right font-display text-xl">{inr(p.total)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {p.notes && (
        <div className="mt-8">
          <p className="eyebrow">Notes</p>
          <p className="mt-2 whitespace-pre-line text-ink-soft">{p.notes}</p>
        </div>
      )}

      {p.status === "accepted" ? (
        <div className="mt-10 rounded-xl border border-green-500/30 bg-green-500/10 p-6">
          <p className="font-display text-xl text-green-400">Accepted — thank you!</p>
          <p className="mt-1 text-ink-soft">We&apos;ll be in touch with next steps shortly.</p>
        </div>
      ) : p.status === "declined" ? (
        <div className="mt-10 rounded-xl border border-line p-6">
          <p className="font-display text-xl">Proposal declined.</p>
          <p className="mt-1 text-ink-soft">No problem — reach out if anything changes.</p>
        </div>
      ) : (
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <form action={acceptProposal.bind(null, token)}>
            <button className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-7 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90">
              Accept proposal
            </button>
          </form>
          <form action={declineProposal.bind(null, token)}>
            <button className="inline-flex h-12 items-center justify-center rounded-full border border-line px-7 text-sm font-medium transition-colors hover:border-ink-soft">
              Decline
            </button>
          </form>
        </div>
      )}

      {!decided && (
        <p className="mt-6 text-xs text-muted">
          Questions? Email hello@vaelocreative.com before accepting.
        </p>
      )}
    </section>
  );
}
