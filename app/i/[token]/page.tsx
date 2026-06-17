import Link from "next/link";
import { notFound } from "next/navigation";
import { getInvoiceByToken, inr, isOverdue } from "@/lib/invoices";

export const dynamic = "force-dynamic";
export const metadata = { title: "Invoice", robots: { index: false } };

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const inv = await getInvoiceByToken(token);
  if (!inv) notFound();

  const status = isOverdue(inv) ? "overdue" : inv.status;

  return (
    <section className="container-vaelo max-w-2xl py-16 sm:py-24">
      <Link href="/portal" className="mb-8 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink">
        ← Back to portal
      </Link>
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Invoice {inv.number}</p>
          <h1 className="font-display mt-3 text-3xl">{inv.client_name}</h1>
        </div>
        <span
          className={`rounded-full border px-4 py-1.5 text-sm capitalize ${
            status === "paid"
              ? "border-green-500/40 text-green-400"
              : status === "overdue"
                ? "border-red-500/40 text-red-400"
                : "border-line text-ink-soft"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-line">
        <table className="w-full text-left text-sm">
          <tbody>
            {inv.items.map((it, i) => (
              <tr key={i} className="border-b border-line">
                <td className="px-5 py-4">{it.desc}</td>
                <td className="px-5 py-4 text-right">{inr(it.amount)}</td>
              </tr>
            ))}
            <tr className="border-b border-line text-muted">
              <td className="px-5 py-3">Subtotal</td>
              <td className="px-5 py-3 text-right">{inr(inv.subtotal)}</td>
            </tr>
            {inv.gst_percent > 0 && (
              <tr className="border-b border-line text-muted">
                <td className="px-5 py-3">GST ({inv.gst_percent}%)</td>
                <td className="px-5 py-3 text-right">{inr(inv.total - inv.subtotal)}</td>
              </tr>
            )}
            <tr className="bg-paper-2">
              <td className="px-5 py-4 font-medium">Total due</td>
              <td className="px-5 py-4 text-right font-display text-xl">{inr(inv.total)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {inv.due_date && status !== "paid" && (
        <p className="mt-4 text-sm text-muted">
          Due by {new Date(inv.due_date).toLocaleDateString()}
        </p>
      )}

      {inv.notes && (
        <div className="mt-8">
          <p className="eyebrow">Notes</p>
          <p className="mt-2 whitespace-pre-line text-ink-soft">{inv.notes}</p>
        </div>
      )}

      {status === "paid" ? (
        <div className="mt-10 rounded-xl border border-green-500/30 bg-green-500/10 p-6">
          <p className="font-display text-xl text-green-400">Paid — thank you!</p>
        </div>
      ) : (
        <div className="mt-10 rounded-xl border border-line p-6">
          {/* TODO: replace with a Razorpay "Pay now" button once KYC is approved. */}
          <p className="font-display text-lg">Online payment coming soon.</p>
          <p className="mt-1 text-sm text-ink-soft">
            For now, please pay using the details shared with you, or email{" "}
            <a href="mailto:hello@vaelocreative.com" className="text-accent hover:underline">
              hello@vaelocreative.com
            </a>
            . We&apos;ll mark this paid on receipt.
          </p>
        </div>
      )}
    </section>
  );
}
