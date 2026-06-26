"use client";

import { useTransition } from "react";
import { AtSign } from "lucide-react";
import type { Lead, LeadStatus } from "@/lib/leads";
import { changeLeadStatus } from "@/app/admin/crm/actions";

const LEAD_STATUSES = ["new", "contacted", "proposal_sent", "won", "lost"] as const;

const STATUS_LABEL: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  proposal_sent: "Proposal",
  won: "Won",
  lost: "Lost",
};

export function LeadCard({ lead }: { lead: Lead }) {
  const [pending, startTransition] = useTransition();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const status = e.target.value as LeadStatus;
    startTransition(() => {
      void changeLeadStatus(lead.id, status);
    });
  }

  return (
    <div className={`os-card os-card-hover p-3.5 ${pending ? "opacity-60" : ""}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-display text-[14px] text-ink">{lead.brand || lead.name}</p>
          <p className="truncate text-[11px] text-muted">{lead.name}</p>
        </div>
      </div>

      {lead.instagram ? (
        <a
          href={`https://instagram.com/${lead.instagram.replace(/^@/, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-[11px] text-muted hover:text-[#d4af37]"
        >
          <AtSign size={12} />
          {lead.instagram.startsWith("@") ? lead.instagram : `@${lead.instagram}`}
        </a>
      ) : null}

      {lead.goal ? <p className="mt-2 line-clamp-2 text-[12px] text-ink-soft">{lead.goal}</p> : null}

      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="truncate text-[10px] uppercase tracking-wide text-muted-2">
          {lead.source || "website"} · {new Date(lead.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
        </span>
        <select
          value={lead.status}
          onChange={onChange}
          disabled={pending}
          className="rounded-[6px] border border-line-strong bg-input px-1.5 py-1 text-[11px] text-ink-soft"
          aria-label="Change status"
        >
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABEL[s]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
