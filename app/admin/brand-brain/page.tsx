import Link from "next/link";
import { ArrowRight, Brain } from "lucide-react";
import { listBrandBrains } from "@/lib/brand-brain";
import { openBrandForEmail } from "./actions";
import { ClientEmailInput } from "@/components/site/client-email-input";
import { ClientAvatar, PageHeader, SectionLabel } from "@/components/os/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Brand Brain" };

const ACCENTS = ["#c8331f", "#2a9d8f", "#e76f51", "#9b59b6", "#3b82f6", "#d4af37"];
function accentFor(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) & 0xffffffff;
  return ACCENTS[Math.abs(h) % ACCENTS.length];
}

export default async function AdminBrandBrainPage() {
  const brains = await listBrandBrains();

  return (
    <div>
      <PageHeader
        title="Brand Brain"
        subtitle="The moat — per-client knowledge that powers every AI action"
      />

      <div className="os-card mb-5 p-5">
        <SectionLabel className="mb-3">Open or create a profile</SectionLabel>
        <form action={openBrandForEmail} className="flex flex-wrap items-center gap-3">
          <ClientEmailInput
            name="email"
            required
            className="h-9 w-72 rounded-[8px] border border-line-strong bg-input px-3 text-[13px] text-ink outline-none focus:border-[#d4af37]"
          />
          <button className="inline-flex h-9 items-center gap-2 rounded-[8px] bg-[#d4af37] px-4 text-[13px] font-medium text-[#0a0a0a] hover:bg-[#e0bd4a]">
            <Brain size={15} />
            Open / create
          </button>
        </form>
      </div>

      {brains.length === 0 ? (
        <div className="os-card px-6 py-16 text-center">
          <p className="font-display text-lg text-ink">No brand profiles yet</p>
          <p className="mt-1 text-[13px] text-muted">
            Clients fill theirs in the portal, or open one above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {brains.map((b) => {
            const accent = accentFor(b.client_email);
            return (
              <Link
                key={b.id}
                href={`/admin/brand-brain/${encodeURIComponent(b.client_email)}`}
                className="os-card os-card-hover flex items-center gap-3 p-5"
              >
                <ClientAvatar name={b.client_name || b.client_email} accent={accent} size={44} rounded={12} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-[15px] text-ink">{b.client_name || b.client_email}</p>
                  <p className="truncate text-[11px] text-muted">{b.client_email}</p>
                  <p className="mt-1 text-[11px] text-muted-2">
                    Updated {new Date(b.updated_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </p>
                </div>
                <ArrowRight size={16} className="text-muted" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
