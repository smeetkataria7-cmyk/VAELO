import Link from "next/link";
import { redirect } from "next/navigation";
import { getViewer } from "@/lib/client-access";
import { listTeam } from "@/lib/team";
import { clientBilling } from "@/lib/billing";
import { inr } from "@/lib/invoices";
import { PageHeader, MetricCard, SectionLabel } from "@/components/os/ui";
import { CheckCircle2, XCircle } from "lucide-react";
import { inviteUserAction, removeAdminAction } from "../people/actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Settings" };

const TABS = ["general", "integrations", "team", "billing"] as const;
type Tab = (typeof TABS)[number];

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const viewer = await getViewer();
  if (!viewer.isSuper) redirect("/admin");

  const sp = await searchParams;
  const tab = (TABS.includes(sp.tab as Tab) ? sp.tab : "general") as Tab;

  const [team, { rows: billingRows, totals }] = await Promise.all([
    listTeam().catch(() => []),
    clientBilling().catch(() => ({ rows: [], totals: { billed: 0, paid: 0, outstanding: 0 } })),
  ]);

  const hasSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const hasResend = !!process.env.RESEND_API_KEY;

  return (
    <div>
      <PageHeader title="Settings" subtitle="Agency configuration and integrations" />

      {/* Tab bar */}
      <div className="mb-7 flex gap-1 border-b border-[#1e1e1e]">
        {TABS.map((t) => (
          <Link
            key={t}
            href={`/admin/settings?tab=${t}`}
            className={[
              "px-4 pb-3 text-[13px] font-medium capitalize transition-colors",
              tab === t
                ? "border-b-2 border-[#d4af37] text-[#d4af37]"
                : "text-muted hover:text-ink",
            ].join(" ")}
          >
            {t}
          </Link>
        ))}
      </div>

      {tab === "general" && (
        <div className="os-card max-w-xl space-y-5 p-6">
          <SectionLabel className="mb-4">General</SectionLabel>
          <div>
            <label className="os-label">Agency name</label>
            <input defaultValue="Vaelo Creative" className="os-field" readOnly />
          </div>
          <div>
            <label className="os-label">Tagline</label>
            <input defaultValue="Creative that moves brands forward." className="os-field" readOnly />
          </div>
          <div>
            <label className="os-label">Contact email</label>
            <input defaultValue={viewer.email ?? ""} className="os-field" readOnly />
          </div>
          <p className="text-[12px] text-muted">
            General settings editing is coming soon — these fields are read-only for now.
          </p>
        </div>
      )}

      {tab === "integrations" && (
        <div className="space-y-3 max-w-xl">
          <SectionLabel className="mb-4">Integrations</SectionLabel>
          {[
            {
              name: "Supabase",
              desc: "Database, auth, and file storage",
              connected: hasSupabase,
            },
            {
              name: "Resend",
              desc: "Transactional email (invites, proposals, invoices)",
              connected: hasResend,
            },
            {
              name: "Razorpay",
              desc: "Online payment collection for invoices",
              connected: false,
              note: "Not yet configured",
            },
            {
              name: "WhatsApp",
              desc: "Client notifications via WhatsApp Business",
              connected: false,
              note: "Not yet configured",
            },
          ].map((integration) => (
            <div key={integration.name} className="os-card flex items-center gap-4 p-4">
              <div className="flex-1">
                <p className="font-medium text-ink">{integration.name}</p>
                <p className="text-[12px] text-muted">{integration.desc}</p>
              </div>
              <div className="flex items-center gap-2">
                {integration.connected ? (
                  <>
                    <CheckCircle2 size={16} className="text-[#10b981]" />
                    <span className="text-[12px] text-[#10b981]">Connected</span>
                  </>
                ) : (
                  <>
                    <XCircle size={16} className="text-muted" />
                    <span className="text-[12px] text-muted">{integration.note ?? "Not connected"}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "team" && (
        <div>
          <form action={inviteUserAction} className="os-card mb-5 flex flex-wrap items-end gap-3 p-5">
            <div>
              <label className="os-label">Invite email</label>
              <input name="email" type="email" required placeholder="person@email.com" className="os-field w-64" />
            </div>
            <div>
              <label className="os-label">Role</label>
              <select name="role" defaultValue="admin" className="os-field">
                <option value="admin">Admin</option>
                <option value="super">Master admin</option>
              </select>
            </div>
            <button className="os-btn-primary">Send invite</button>
          </form>

          <SectionLabel className="mb-3">Team ({team.length})</SectionLabel>
          <div className="os-card overflow-hidden p-0">
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
                  {team.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-muted">No team members yet.</td>
                    </tr>
                  ) : (
                    team.map((m) => (
                      <tr key={m.email}>
                        <td className="font-medium text-ink">{m.email}</td>
                        <td>
                          <span className={m.role === "super" ? "text-[#d4af37]" : "text-ink-soft"}>
                            {m.role === "super" ? "Master admin" : "Admin"}
                          </span>
                        </td>
                        <td>
                          <form action={removeAdminAction.bind(null, m.email)}>
                            <button className="text-[#ef4444] hover:underline">Remove</button>
                          </form>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-3 text-[12px] text-muted">
            Full team management (including client logins) at{" "}
            <Link href="/admin/people" className="text-[#d4af37] hover:underline">People</Link>.
          </p>
        </div>
      )}

      {tab === "billing" && (
        <div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <MetricCard label="Total billed" value={inr(totals.billed)} trend="all invoices" trendTone="neutral" />
            <MetricCard label="Collected" value={inr(totals.paid)} trend="paid" trendTone="success" />
            <MetricCard
              label="Outstanding"
              value={inr(totals.outstanding)}
              trend={totals.outstanding > 0 ? "unpaid" : "all clear"}
              trendTone={totals.outstanding > 0 ? "error" : "success"}
            />
          </div>

          <SectionLabel className="mb-3 mt-6">By client</SectionLabel>
          <div className="os-card overflow-hidden p-0">
            <div className="os-scroll overflow-x-auto">
              <table className="os-table min-w-[620px]">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Invoices</th>
                    <th>Billed</th>
                    <th>Collected</th>
                    <th>Outstanding</th>
                  </tr>
                </thead>
                <tbody>
                  {billingRows.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-muted">No invoices yet.</td>
                    </tr>
                  ) : (
                    billingRows.map((r) => (
                      <tr key={r.email}>
                        <td>
                          <div className="font-medium text-ink">{r.name || r.email}</div>
                          {r.name && <div className="text-[11px] text-muted">{r.email}</div>}
                        </td>
                        <td className="text-ink-soft">{r.count}</td>
                        <td className="text-ink-soft">{inr(r.billed)}</td>
                        <td className="text-[#10b981]">{inr(r.paid)}</td>
                        <td className={r.outstanding > 0 ? "text-[#ef4444]" : "text-muted"}>
                          {r.outstanding > 0 ? inr(r.outstanding) : "—"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-3 text-[12px] text-muted">
            Full analytics at{" "}
            <Link href="/admin/billing" className="text-[#d4af37] hover:underline">Billing</Link>.
          </p>
        </div>
      )}
    </div>
  );
}
