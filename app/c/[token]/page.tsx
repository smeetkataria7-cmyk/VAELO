import Link from "next/link";
import { notFound } from "next/navigation";
import { getContractByToken } from "@/lib/contracts";
import { signContractAction } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Contract", robots: { index: false } };

export default async function ContractPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const c = await getContractByToken(token);
  if (!c) notFound();

  return (
    <section className="container-vaelo max-w-2xl py-16 sm:py-24">
      <Link href="/portal" className="mb-8 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink">
        ← Back to portal
      </Link>

      <p className="eyebrow">Contract for {c.client_name}</p>
      <h1 className="font-display mt-4 text-4xl sm:text-5xl">{c.title}</h1>

      <div className="mt-8 whitespace-pre-line rounded-2xl border border-line p-6 leading-relaxed text-ink-soft">
        {c.body || "No contract text provided."}
      </div>

      {c.status === "signed" ? (
        <div className="mt-10 rounded-xl border border-green-500/30 bg-green-500/10 p-6">
          <p className="font-display text-xl text-green-400">Signed ✓</p>
          <p className="mt-1 text-ink-soft">
            Signed by {c.signer_name}
            {c.signed_at ? ` on ${new Date(c.signed_at).toLocaleString()}` : ""}.
          </p>
        </div>
      ) : (
        <form action={signContractAction.bind(null, token)} className="mt-10 space-y-4 rounded-xl border border-line p-6">
          <p className="font-display text-lg">Sign this contract</p>
          <div>
            <label htmlFor="name" className="eyebrow block">Type your full name to sign</label>
            <input
              id="name"
              name="name"
              required
              placeholder="Your full name"
              className="mt-2 w-full border-b border-line bg-transparent pb-2 text-lg outline-none focus:border-accent"
            />
          </div>
          <button className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-7 text-sm font-medium text-accent-ink hover:opacity-90">
            Sign contract
          </button>
          <p className="text-xs text-muted">Typing your name acts as your electronic signature.</p>
        </form>
      )}
    </section>
  );
}
