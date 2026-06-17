import { listProjects } from "@/lib/projects";
import { AdminTabs } from "@/components/site/admin-tabs";

export const dynamic = "force-dynamic";
export const metadata = { title: "Projects · Admin", robots: { index: false } };

const statusColor: Record<string, string> = {
  onboarding: "text-accent",
  active: "text-green-400",
  paused: "text-muted",
  completed: "text-ink-soft",
};

export default async function AdminProjectsPage() {
  const projects = await listProjects();

  return (
    <section className="container-vaelo py-12">
      <AdminTabs />
      <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>

      {projects.length === 0 ? (
        <p className="mt-8 text-muted">
          No projects yet. Accept a proposal, then convert it to a project.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-paper-2 text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Project</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-t border-line">
                  <td className="whitespace-nowrap px-4 py-3 text-muted">
                    {new Date(p.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3">{p.client_name}</td>
                  <td className="px-4 py-3 text-muted">{p.client_email || "—"}</td>
                  <td className={`px-4 py-3 capitalize ${statusColor[p.status] ?? ""}`}>{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
