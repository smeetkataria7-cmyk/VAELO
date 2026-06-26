import { CheckCircle2, Circle, FolderPlus, Sparkles } from "lucide-react";
import { listProjects, type Project } from "@/lib/projects";
import { ClientAvatar, LinkButton, PageHeader, type Tone } from "@/components/os/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Projects" };

const STATUS_DOT: Record<Project["status"], { tone: Tone; label: string }> = {
  active: { tone: "success", label: "Active" },
  onboarding: { tone: "info", label: "Onboarding" },
  paused: { tone: "warning", label: "Paused" },
  completed: { tone: "neutral", label: "Completed" },
};

const TONE_HEX: Record<Tone, string> = {
  gold: "#d4af37",
  success: "#10b981",
  error: "#ef4444",
  warning: "#f59e0b",
  info: "#3b82f6",
  neutral: "#9ca3af",
};

const LIFECYCLE = ["Onboarding", "Kickoff", "In Production", "Delivered"];
const STAGE_INDEX: Record<Project["status"], number> = {
  onboarding: 0,
  active: 2,
  paused: 2,
  completed: 4,
};

const AI_LINE: Record<Project["status"], string> = {
  onboarding: "Awaiting onboarding form and brand assets to kick off.",
  active: "On track — creatives in production this cycle.",
  paused: "Paused — awaiting client feedback before next milestone.",
  completed: "Delivered. Ready to turn into a case study.",
};

const ACCENTS = ["#c8331f", "#2a9d8f", "#e76f51", "#9b59b6", "#3b82f6"];
function accentFor(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) & 0xffffffff;
  return ACCENTS[Math.abs(h) % ACCENTS.length];
}

export default async function AdminProjectsPage() {
  let projects: Project[] = [];
  try {
    projects = await listProjects();
  } catch {
    projects = [];
  }

  const active = projects.filter((p) => p.status === "active").length;
  const onboarding = projects.filter((p) => p.status === "onboarding").length;

  return (
    <div>
      <PageHeader
        title="Projects"
        subtitle={`${active} active · ${onboarding} onboarding`}
        actions={
          <LinkButton href="/admin/proposals" icon={FolderPlus}>
            From proposal
          </LinkButton>
        }
      />

      {projects.length === 0 ? (
        <div className="os-card px-6 py-16 text-center">
          <p className="font-display text-lg text-ink">No projects yet</p>
          <p className="mt-1 text-[13px] text-muted">Accept a proposal, then convert it into a project.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {projects.map((p) => {
            const meta = STATUS_DOT[p.status];
            const stage = STAGE_INDEX[p.status];
            const accent = accentFor(p.client_name || p.client_email || p.title);
            return (
              <div key={p.id} className="os-card os-card-hover p-5">
                <div className="flex items-start gap-3">
                  <ClientAvatar name={p.client_name || p.title} accent={accent} size={44} rounded={12} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-[16px] text-ink">{p.client_name || "—"}</p>
                    <p className="truncate text-[12px] text-muted">{p.title}</p>
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium"
                    style={{ color: TONE_HEX[meta.tone] }}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ background: TONE_HEX[meta.tone] }} />
                    {meta.label}
                  </span>
                </div>

                {/* AI status */}
                <div className="mt-4 flex items-start gap-2.5 rounded-[10px] border border-[#d4af3740] bg-[#d4af370d] p-3">
                  <Sparkles size={15} className="mt-0.5 shrink-0 text-[#d4af37]" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#d4af37]">AI Status</p>
                    <p className="mt-0.5 text-[12.5px] text-ink-soft">{AI_LINE[p.status]}</p>
                  </div>
                </div>

                {/* Milestones */}
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                  {LIFECYCLE.map((m, i) => {
                    const done = i < stage;
                    const current = i === stage;
                    return (
                      <div key={m} className="flex items-center gap-1.5 text-[12px]">
                        {done ? (
                          <CheckCircle2 size={14} className="text-[#10b981]" />
                        ) : (
                          <Circle
                            size={14}
                            className={current ? "text-[#d4af37]" : "text-muted-3"}
                            strokeWidth={current ? 2.5 : 1.7}
                          />
                        )}
                        <span className={done ? "text-ink-soft" : current ? "text-ink" : "text-muted"}>{m}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between border-t border-line-2 pt-3 text-[12px]">
                  <span className="text-muted">{p.client_email || "—"}</span>
                  <span className="rounded-full bg-input px-2 py-0.5 text-[11px] text-muted">Health: not scored</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
