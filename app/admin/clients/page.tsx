import Link from "next/link";
import { Plus } from "lucide-react";
import { listClientOptions, type ClientOption } from "@/lib/clients";
import { listProjects, type Project } from "@/lib/projects";
import { listProposals } from "@/lib/proposals";
import { Button, ClientAvatar, PageHeader } from "@/components/os/ui";

export const dynamic = "force-dynamic";

export const metadata = { title: "Clients" };

const ACCENTS = ["#c8331f", "#2a9d8f", "#e76f51", "#9b59b6", "#3b82f6", "#d4af37", "#10b981"];

/** Deterministic accent per client so colors stay stable across renders. */
function accentFor(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) & 0xffffffff;
  return ACCENTS[Math.abs(h) % ACCENTS.length];
}

async function settled<T>(p: Promise<T>, fallback: T): Promise<T> {
  try {
    return await p;
  } catch {
    return fallback;
  }
}

export default async function ClientsPage() {
  const [clients, projects, proposals] = await Promise.all([
    settled(listClientOptions(), [] as ClientOption[]),
    settled(listProjects(), [] as Project[]),
    settled(listProposals(), [] as Awaited<ReturnType<typeof listProposals>>),
  ]);

  const projectsFor = (email: string) =>
    projects.filter((p) => p.client_email?.toLowerCase() === email.toLowerCase()).length;
  const proposalsFor = (email: string) =>
    proposals.filter((p) => p.client_email?.toLowerCase() === email.toLowerCase()).length;

  return (
    <div>
      <PageHeader
        title="Clients"
        subtitle={`${clients.length} client${clients.length === 1 ? "" : "s"}`}
        actions={
          <Button variant="primary" icon={Plus}>
            New client
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {clients.map((c) => {
          const accent = accentFor(c.email);
          return (
            <Link
              key={c.email}
              href={`/admin/brand-brain/${encodeURIComponent(c.email)}`}
              className="os-card os-card-hover flex flex-col items-center p-6 text-center"
            >
              <ClientAvatar name={c.name || c.email} accent={accent} />
              <p className="mt-3 font-display text-[16px] text-ink">{c.name || c.email.split("@")[0]}</p>
              <p className="mt-0.5 text-[11px] uppercase tracking-wide text-muted">{c.email}</p>

              <div className="mt-4 grid w-full grid-cols-2 divide-x divide-line-strong border-t border-line-strong pt-4">
                <div>
                  <p className="font-display text-[20px] text-ink">{projectsFor(c.email)}</p>
                  <p className="text-[10px] uppercase tracking-wide text-muted">Projects</p>
                </div>
                <div>
                  <p className="font-display text-[20px] text-ink">{proposalsFor(c.email)}</p>
                  <p className="text-[10px] uppercase tracking-wide text-muted">Proposals</p>
                </div>
              </div>
            </Link>
          );
        })}

        {/* Add-new tile */}
        <button className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-[14px] border border-dashed border-line-strong text-muted transition-colors hover:border-[#d4af37] hover:text-[#d4af37]">
          <Plus size={22} />
          <span className="text-[13px]">Add new client</span>
        </button>
      </div>

      {clients.length === 0 ? (
        <p className="mt-4 text-[13px] text-muted">
          Clients appear here once they accept a proposal or are added to a project.
        </p>
      ) : null}
    </div>
  );
}
