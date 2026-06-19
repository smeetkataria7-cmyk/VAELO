import { redirect } from "next/navigation";
import { getViewer } from "@/lib/client-access";
import { adminEmails, superAdminEmails } from "@/lib/admin";
import { listTeam } from "@/lib/team";
import { listClientOptions } from "@/lib/clients";
import { listProposals } from "@/lib/proposals";
import { listProjects } from "@/lib/projects";
import { listInvoices } from "@/lib/invoices";
import { AdminTabs } from "@/components/site/admin-tabs";
import { inviteUserAction, removeAdminAction, removeClientAction } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "People · Admin", robots: { index: false } };

const field =
  "border-b border-line bg-transparent pb-2 outline-none focus:border-accent";

export default async function PeoplePage() {
  const viewer = await getViewer();
  if (!viewer.isSuper) redirect("/admin");

  const [team, clients, proposals, projects, invoices] = await Promise.all([
    listTeam().catch(() => []),
    listClientOptions().catch(() => []),
    listProposals().catch(() => []),
    listProjects().catch(() => []),
    listInvoices().catch(() => []),
  ]);

  // Merge env-configured admins (not removable) with UI-added ones (removable).
  const envSupers = new Set(superAdminEmails());
  const rows = new Map<string, { role: string; removable: boolean }>();
  adminEmails().forEach((e) =>
    rows.set(e, { role: envSupers.has(e) ? "Master admin" : "Admin", removable: false })
  );
  team.forEach((m) => {
    if (!rows.has(m.email)) {
      rows.set(m.email, { role: m.role === "super" ? "Master admin" : "Admin", removable: true });
    }
  });
  const adminList = [...rows.entries()];

  const countBy = (arr: { client_email?: string }[], email: string) =>
    arr.filter((x) => (x.client_email || "").toLowerCase() === email).length;

  return (
    <section className="container-vaelo py-12">
      <AdminTabs />
      <h1 className="text-2xl font-semibold tracking-tight">People</h1>

      {/* Admins */}
      <h2 className="mt-8 text-sm uppercase tracking-wider text-muted">
        Admins ({adminList.length})
      </h2>

      <form action={inviteUserAction} className="mt-3 flex flex-wrap items-end gap-3 rounded-2xl border border-line p-5">
        <div>
          <label className="eyebrow block">Invite email</label>
          <input name="email" type="email" required placeholder="person@email.com" className={`mt-2 w-72 ${field}`} />
        </div>
        <div>
          <label className="eyebrow block">Role</label>
          <select name="role" defaultValue="client" className={`mt-2 ${field}`}>
            <option value="client">Client (portal)</option>
            <option value="admin">Admin</option>
            <option value="super">Master admin</option>
          </select>
        </div>
        <button className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-ink-soft">
          Send invite
        </button>
      </form>
      <p className="mt-2 text-xs text-muted">
        They get an email with a link to set a password and log in. Admin/Master roles also get admin access.
      </p>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper-2 text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {adminList.map(([email, info]) => (
              <tr key={email} className="border-t border-line">
                <td className="px-4 py-3 font-medium">{email}</td>
                <td className="px-4 py-3">
                  <span className={info.role === "Master admin" ? "text-accent" : "text-ink-soft"}>{info.role}</span>
                </td>
                <td className="px-4 py-3">
                  {info.removable ? (
                    <form action={removeAdminAction.bind(null, email)}>
                      <button className="text-red-400 hover:underline">Remove</button>
                    </form>
                  ) : (
                    <span className="text-xs text-muted">owner</span>
                  )}
                </td>
              </tr>
            ))}
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
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-3 text-muted">No clients yet.</td></tr>
            ) : (
              clients.map((c) => (
                <tr key={c.email} className="border-t border-line">
                  <td className="px-4 py-3 font-medium">{c.name || "—"}</td>
                  <td className="px-4 py-3 text-muted">{c.email}</td>
                  <td className="px-4 py-3">{countBy(proposals, c.email)}</td>
                  <td className="px-4 py-3">{countBy(projects, c.email)}</td>
                  <td className="px-4 py-3">{countBy(invoices, c.email)}</td>
                  <td className="px-4 py-3">
                    <form action={removeClientAction.bind(null, c.email)}>
                      <button className="text-red-400 hover:underline" title="Deletes their login (records are kept)">
                        Remove login
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
