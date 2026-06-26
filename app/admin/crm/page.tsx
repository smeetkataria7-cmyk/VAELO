import { UserPlus } from "lucide-react";
import { getLeads, LEAD_STATUSES, type Lead, type LeadStatus } from "@/lib/leads";
import { Button, PageHeader, type Tone } from "@/components/os/ui";
import { LeadCard } from "@/components/os/lead-card";

export const dynamic = "force-dynamic";

export const metadata = { title: "CRM / Leads" };

const COLUMNS: { status: LeadStatus; label: string; tone: Tone }[] = [
  { status: "new", label: "New", tone: "neutral" },
  { status: "contacted", label: "Contacted", tone: "info" },
  { status: "proposal_sent", label: "Proposal", tone: "warning" },
  { status: "won", label: "Won", tone: "success" },
  { status: "lost", label: "Lost", tone: "error" },
];

const TONE_HEX: Record<Tone, string> = {
  gold: "#d4af37",
  success: "#10b981",
  error: "#ef4444",
  warning: "#f59e0b",
  info: "#3b82f6",
  neutral: "#9ca3af",
};

export default async function CrmPage() {
  let leads: Lead[] = [];
  try {
    leads = await getLeads();
  } catch {
    leads = [];
  }

  const byStatus = (status: LeadStatus) =>
    leads.filter((l) => (LEAD_STATUSES.includes(l.status as LeadStatus) ? l.status : "new") === status);

  const won = byStatus("won").length;

  return (
    <div>
      <PageHeader
        title="CRM / Leads"
        subtitle={`${leads.length} leads · ${won} won`}
        actions={
          <Button variant="primary" icon={UserPlus}>
            Add lead
          </Button>
        }
      />

      {leads.length === 0 ? (
        <div className="os-card px-6 py-16 text-center">
          <p className="font-display text-lg text-ink">No leads yet</p>
          <p className="mt-1 text-[13px] text-muted">
            New leads from the public site form land here automatically.
          </p>
        </div>
      ) : (
        <div className="os-scroll -mx-1 overflow-x-auto pb-2">
          <div className="flex min-w-[900px] gap-3 px-1">
            {COLUMNS.map((col) => {
              const items = byStatus(col.status);
              const hex = TONE_HEX[col.tone];
              return (
                <div key={col.status} className="flex w-[19%] min-w-[200px] flex-1 flex-col">
                  <div className="mb-3 flex items-center gap-2 px-1">
                    <span className="h-2 w-2 rounded-full" style={{ background: hex }} />
                    <span className="text-[12px] font-medium text-ink">{col.label}</span>
                    <span className="text-[11px] text-muted">{items.length}</span>
                  </div>
                  <div className={`flex flex-col gap-2.5 ${col.status === "lost" ? "opacity-70" : ""}`}>
                    {items.map((lead) => (
                      <LeadCard key={lead.id} lead={lead} />
                    ))}
                    {items.length === 0 ? (
                      <div className="rounded-[10px] border border-dashed border-line-strong py-8 text-center text-[11px] text-muted-2">
                        Empty
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
