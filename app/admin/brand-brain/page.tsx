import Link from "next/link";
import { listBrandBrains } from "@/lib/brand-brain";
import { openBrandForEmail } from "./actions";
import { AdminTabs } from "@/components/site/admin-tabs";

export const dynamic = "force-dynamic";
export const metadata = { title: "Brand Brain · Admin", robots: { index: false } };

export default async function AdminBrandBrainPage() {
  const brains = await listBrandBrains();

  return (
    <section className="container-vaelo py-12">
      <AdminTabs />
      <h1 className="text-2xl font-semibold tracking-tight">Brand Brain</h1>

      <form action={openBrandForEmail} className="mt-6 flex gap-3">
        <input
          name="email"
          type="email"
          placeholder="client@brand.com"
          required
          className="w-72 border-b border-line bg-transparent pb-2 outline-none focus:border-accent"
        />
        <button className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-ink-soft">
          Open / create profile
        </button>
      </form>

      {brains.length === 0 ? (
        <p className="mt-8 text-muted">No brand profiles yet. Clients fill theirs in the portal, or open one above.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-paper-2 text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Brand</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {brains.map((b) => (
                <tr key={b.id} className="border-t border-line">
                  <td className="px-4 py-3 font-medium">{b.client_name || "—"}</td>
                  <td className="px-4 py-3">{b.client_email}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted">
                    {new Date(b.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/brand-brain/${encodeURIComponent(b.client_email)}`}
                      className="text-accent hover:underline"
                    >
                      Edit →
                    </Link>
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
