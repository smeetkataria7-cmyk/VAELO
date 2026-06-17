import { getLeads } from "@/lib/leads";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

// Always render fresh (leads change frequently).
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Leads · Admin",
  robots: { index: false, follow: false },
};

async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export default async function AdminLeadsPage() {
  const leads = await getLeads();

  return (
    <section className="container-vaelo py-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
          <a href="/admin/proposals" className="text-sm text-muted hover:text-ink">Proposals →</a>
          <a href="/admin/projects" className="text-sm text-muted hover:text-ink">Projects →</a>
        </div>
        <div className="flex items-center gap-4">
          <span className="rounded-full bg-paper-2 px-3 py-1 text-sm text-muted">
            {leads.length} leads
          </span>
          <form action={signOut}>
            <button className="text-sm text-muted hover:text-ink">Sign out</button>
          </form>
        </div>
      </div>

      {leads.length === 0 ? (
        <p className="mt-8 text-muted">No leads yet. They&apos;ll appear here as they come in.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-paper-2 text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Brand</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Instagram</th>
                <th className="px-4 py-3 font-medium">Goal</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-t border-line align-top">
                  <td className="whitespace-nowrap px-4 py-3 text-muted">
                    {new Date(l.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-medium">{l.name}</td>
                  <td className="px-4 py-3">{l.brand}</td>
                  <td className="px-4 py-3">
                    <a className="text-accent hover:underline" href={`mailto:${l.email}`}>
                      {l.email}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-muted">{l.instagram || "—"}</td>
                  <td className="max-w-xs px-4 py-3 text-ink-soft">{l.goal || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
