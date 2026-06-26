import { redirect } from "next/navigation";
import { getViewer } from "@/lib/client-access";
import { adminEmails, superAdminEmails } from "@/lib/admin";
import { listTeam } from "@/lib/team";
import { listClientOptions } from "@/lib/clients";
import { listProposals } from "@/lib/proposals";
import { listProjects } from "@/lib/projects";
import { listInvoices } from "@/lib/invoices";
import { inviteUserAction, removeAdminAction, removeClientAction } from "./actions";
import { PageHeader, SectionLabel } from "@/components/os/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Team" };

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

  const envSupers = new Set(superAdminEmails());
  const rows = new Map<string, { role: string; removable: boolean }>();
  adminEmails().forEach((e) =>
    rows.set(e, { role: envSupers.has(e) ? "Master admin" : "Admin", removable: false }),
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
    <div>
      <PageHeader title="Team & People" subtitle="Manage admin access and client logins" />

      {/* Invite */}
      <form action={inviteUserAction} className="os-card mb-3 flex flex-wrap items-end gap-3 p-5">
        <div>
          <label className="os-label">Invite email</label>
          <input name="email" type="email" required placeholder="person@email.com" className="os-field w-72" />
        </div>
        <div>
          <label className="os-label">Role</label>
          <select name="role" defaultValue="client" className="os-field">
            <option value="client">Client (portal)</option>
            <option value="admin">Admin</option>
            <option value="super">Master admin</option>
          </select>
        </div>
        <button className="os-btn-primary">Send invite</button>
      </form>
      <p className="mb-6 text-[12px] text-muted">
        They get an email with a link to set a password and log in. Admin/Master roles also get admin access.
      </p>

      {/* Admins */}
      <SectionLabel className="mb-3">Admins ({adminList.length})</SectionLabel>
      <div className="os-card mb-8 overflow-hidden p-0">
        <div className="os-scroll overflow-x-auto">
          <table className="os-table min-w-[480px]">
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {adminList.map(([email, info]) => (
                <tr key={email}>
                  <td className="font-medium text-ink">{email}</td>
                  <td>
                    <span className={info.role === "Master admin" ? "text-[#d4af37]" : "text-ink-soft"}>
                      {info.role}
                    </span>
                  </td>
                  <td>
                    {info.removable ? (
                      <form action={removeAdminAction.bind(null, email)}>
                        <button className="text-[#ef4444] hover:underline">Remove</button>
                      </form>
                    ) : (
                      <span className="text-[11px] text-muted">owner</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clients */}
      <SectionLabel className="mb-3">Clients ({clients.length})</SectionLabel>
      <div className="os-card overflow-hidden p-0">
        <div className="os-scroll overflow-x-auto">
          <table className="os-table min-w-[680px]">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Proposals</th>
                <th>Projects</th>
                <th>Invoices</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-muted">
                    No clients yet.
                  </td>
                </tr>
              ) : (
                clients.map((c) => (
                  <tr key={c.email}>
                    <td className="font-medium text-ink">{c.name || "—"}</td>
                    <td className="text-muted">{c.email}</td>
                    <td className="text-ink-soft">{countBy(proposals, c.email)}</td>
                    <td className="text-ink-soft">{countBy(projects, c.email)}</td>
                    <td className="text-ink-soft">{countBy(invoices, c.email)}</td>
                    <td>
                      <form action={removeClientAction.bind(null, c.email)}>
                        <button
                          className="text-[#ef4444] hover:underline"
                          title="Deletes their login (records are kept)"
                        >
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
      </div>
    </div>
  );
}
