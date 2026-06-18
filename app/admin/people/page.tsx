import { redirect } from "next/navigation";
import { getViewer } from "@/lib/client-access";
import { isSuperAdminEmail, adminEmails, superAdminEmails } from "@/lib/admin";
import { listClientOptions } from "@/lib/clients";
import { listProposals } from "@/lib/proposals";
import { listProjects } from "@/lib/projects";
import { listInvoices } from "@/lib/invoices";
import { AdminTabs } from "@/components/site/admin-tabs";

export const dynamic = "force-dynamic";
export const metadata = { title: "People · Admin", robots: { index: false } };

export default async function PeoplePage() {
  const viewer = await getViewer();
  if (!isSuperAdminEmail(viewer.email)) redirect("/admin");

  const [clients, proposals, projects, invoices] = await Promise.all([
    listClientOptions().catch(() => []),
    listProposals().catch(() => []),
    listProjects().catch(() => []),
    listInvoices().catch(() => []),
  ]);

  const supers = new Set(superAdminEmails());
  const admins = adminEmails();
  const countBy = (
    arr: { client_email?: string }[],
    email: string
  ) => arr.filter((x) => (x.client_email || "").toLowerCase() === email).length;

  return (
    <section className="container-vaelo py-12">
      <AdminTabs />
      <h1 className="text-2xl font-semibold tracking-tight">People</h1>

      {/* Admins */}
      <h2 className="mt-8 text-sm uppercase tracking-wider text-muted">
        Admins ({admins.length})
      </h2>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper-2 text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
            </tr>
          </thead>
          <tbody>
            {admins.length === 0 ? (
              <tr><td colSpan={2} className="px-4 py-3 text-muted">No admins configured.</td></tr>
            ) : (
              admins.map((email) => (
                <tr key={email} className="border-t border-line">
                  <td className="px-4 py-3 font-medium">{email}</td>
                  <td className="px-4 py-3">
                    {supers.has(email) ? (
                      <span className="text-accent">Master admin</span>
                    ) : (
                      <span className="text-ink-soft">Admin</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Clients */}
      <h2 className="mt-10 text-sm uppercase tracking-wider text-muted">
        Clients ({clients.length})
      </h2>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper-2 text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Proposals</th>
              <th className="px-4 py-3 font-medium">Projects</th>
              <th className="px-4 py-3 font-medium">Invoices</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-3 text-muted">No clients yet.</td></tr>
            ) : (
              clients.map((c) => (
                <tr key={c.email} className="border-t border-line">
                  <td className="px-4 py-3 font-medium">{c.name || "—"}</td>
                  <td className="px-4 py-3 text-muted">{c.email}</td>
                  <td className="px-4 py-3">{countBy(proposals, c.email)}</td>
                  <td className="px-4 py-3">{countBy(projects, c.email)}</td>
                  <td className="px-4 py-3">{countBy(invoices, c.email)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
