import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { getProposalsForEmail, inr, type Proposal } from "@/lib/proposals";
import { getProjectsForEmail, type Project } from "@/lib/projects";
import { getInvoicesForEmail, isOverdue, type Invoice } from "@/lib/invoices";
import { getBrandBrainForEmail, type BrandBrain } from "@/lib/brand-brain";
import { BrandForm } from "@/components/site/brand-form";
import { saveMyBrand } from "./brand-actions";
import { listFilesForEmail, signedUrlFor, type FileRec } from "@/lib/files";
import { approveFile, requestRevision } from "./file-actions";
import { getContractsForEmail, type Contract } from "@/lib/contracts";
import { getReportsForEmail, type Report } from "@/lib/reports";
import { PortalTabs } from "@/components/site/portal-tabs";
import { StatusBadge } from "@/components/os/ui";

export const metadata = {
  title: "Portal",
  robots: { index: false, follow: false },
};

async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="text-[13px] text-muted">{children}</p>;
}

export default async function PortalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const email = user.email ?? "";

  const [proposalsR, projectsR, invoicesR, brandR, filesR, contractsR, reportsR] =
    await Promise.allSettled([
      getProposalsForEmail(email),
      getProjectsForEmail(email),
      getInvoicesForEmail(email),
      getBrandBrainForEmail(email),
      listFilesForEmail(email),
      getContractsForEmail(email),
      getReportsForEmail(email),
    ]);
  const proposals: Proposal[] = proposalsR.status === "fulfilled" ? proposalsR.value : [];
  const projects: Project[] = projectsR.status === "fulfilled" ? projectsR.value : [];
  const invoices: Invoice[] = invoicesR.status === "fulfilled" ? invoicesR.value : [];
  const brand: BrandBrain | null = brandR.status === "fulfilled" ? brandR.value : null;
  const files: FileRec[] = filesR.status === "fulfilled" ? filesR.value : [];
  const contracts: Contract[] = contractsR.status === "fulfilled" ? contractsR.value : [];
  const reports: Report[] = reportsR.status === "fulfilled" ? reportsR.value : [];

  const fileItems = await Promise.all(
    files.map(async (f) => ({
      ...f,
      url: await signedUrlFor(f.path).catch(() => null),
    }))
  );

  const proposalsContent =
    proposals.length === 0 ? (
      <Empty>No proposals yet.</Empty>
    ) : (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {proposals.map((p) => (
          <Link
            key={p.id}
            href={`/p/${p.public_token}`}
            className="os-card block transition-colors hover:border-[#d4af3740]"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-[18px] text-ink">{p.title}</h3>
              <StatusBadge status={p.status} />
            </div>
            <p className="mt-2 font-display text-[24px] text-ink">{inr(p.total)}</p>
          </Link>
        ))}
      </div>
    );

  const contractsContent =
    contracts.length === 0 ? (
      <Empty>No contracts yet.</Empty>
    ) : (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {contracts.map((c) => (
          <Link
            key={c.id}
            href={`/c/${c.public_token}`}
            className="os-card block transition-colors hover:border-[#d4af3740]"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-[18px] text-ink">{c.title}</h3>
              <StatusBadge status={c.status} label={c.status === "signed" ? "Signed" : "To sign"} />
            </div>
            <p className="mt-2 text-[13px] text-[#d4af37]">
              {c.status === "signed" ? "View" : "Review & sign →"}
            </p>
          </Link>
        ))}
      </div>
    );

  const projectsContent =
    projects.length === 0 ? (
      <Empty>No active projects yet.</Empty>
    ) : (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <div key={p.id} className="os-card">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-[18px] text-ink">{p.title}</h3>
              <StatusBadge status={p.status} />
            </div>
            <p className="mt-2 text-[12px] text-muted">
              Started {new Date(p.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    );

  const invoicesContent =
    invoices.length === 0 ? (
      <Empty>No invoices yet.</Empty>
    ) : (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {invoices.map((inv) => {
          const status = isOverdue(inv) ? "overdue" : inv.status;
          const paid = status === "paid";
          return (
            <Link
              key={inv.id}
              href={`/i/${inv.public_token}`}
              className="os-card block transition-colors hover:border-[#d4af3740]"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-[18px] text-ink">{inv.number}</h3>
                <StatusBadge status={status} />
              </div>
              <p className={`mt-2 font-display text-[24px] ${paid ? "text-muted line-through" : "text-ink"}`}>
                {inr(inv.total)}
              </p>
              {inv.due_date && !paid && (
                <p className="mt-1 text-[12px] text-muted">Due {new Date(inv.due_date).toLocaleDateString()}</p>
              )}
            </Link>
          );
        })}
      </div>
    );

  const filesContent =
    fileItems.length === 0 ? (
      <Empty>No files delivered yet.</Empty>
    ) : (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {fileItems.map((f) => (
          <div key={f.id} className="os-card">
            <div className="flex items-start justify-between gap-3">
              <h3 className="truncate font-medium text-ink" title={f.name}>{f.name}</h3>
              <StatusBadge status={f.status} label={f.status === "revision" && f.comment ? `Revision` : f.status} />
            </div>
            {(f.link || f.url) && (
              <a href={f.link || f.url!} target="_blank" className="mt-3 inline-block text-[13px] text-[#d4af37] hover:underline">
                Open / download →
              </a>
            )}
            {f.status !== "approved" && (
              <div className="mt-4 flex flex-col gap-2">
                <form action={approveFile.bind(null, f.id)}>
                  <button className="os-btn-primary w-full">Approve</button>
                </form>
                <form action={requestRevision.bind(null, f.id)} className="flex gap-2">
                  <input
                    name="comment"
                    placeholder="What to change?"
                    className="os-field min-w-0 flex-1"
                  />
                  <button className="shrink-0 text-[13px] text-ink-soft hover:text-ink">Request revision</button>
                </form>
              </div>
            )}
            {f.status === "revision" && f.comment && (
              <p className="mt-2 text-[12px] text-muted">You asked: &ldquo;{f.comment}&rdquo;</p>
            )}
          </div>
        ))}
      </div>
    );

  const brandContent = (
    <div>
      <p className="mb-5 max-w-xl text-[13px] text-muted">
        The more we know about your brand, the sharper everything we make. Fill this
        once — we&apos;ll use it across all your creative.
      </p>
      <div className="os-card p-6">
        <BrandForm
          initial={brand as unknown as Record<string, string> | null}
          action={saveMyBrand}
        />
      </div>
    </div>
  );

  const fmt = (n: number | null) => (n == null ? null : n.toLocaleString("en-IN"));
  const reportsContent =
    reports.length === 0 ? (
      <Empty>No reports yet.</Empty>
    ) : (
      <div className="grid gap-4 sm:grid-cols-2">
        {reports.map((r) => {
          const metrics = [
            r.spend != null && (["Spend", inr(r.spend)] as [string, string]),
            r.reach != null && (["Reach", fmt(r.reach)!] as [string, string]),
            r.clicks != null && (["Clicks", fmt(r.clicks)!] as [string, string]),
            r.conversions != null && (["Conversions", fmt(r.conversions)!] as [string, string]),
            r.roas && (["ROAS", r.roas] as [string, string]),
          ].filter(Boolean) as [string, string][];
          return (
            <div key={r.id} className="os-card">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-[18px] text-ink">{r.title}</h3>
                {r.platform && <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">{r.platform}</span>}
              </div>
              {r.period && <p className="mt-1 text-[12px] text-muted">{r.period}</p>}
              {metrics.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {metrics.map(([k, v]) => (
                    <div key={k}>
                      <p className="font-display text-[20px] text-ink">{v}</p>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">{k}</p>
                    </div>
                  ))}
                </div>
              )}
              {r.link && (
                <a href={r.link} target="_blank" className="mt-4 inline-block text-[13px] text-[#d4af37] hover:underline">
                  Open full dashboard →
                </a>
              )}
              {r.notes && <p className="mt-3 text-[13px] text-muted">{r.notes}</p>}
            </div>
          );
        })}
      </div>
    );

  return (
    <div className="os min-h-screen bg-[#0a0a0a]">
      <div className="mx-auto max-w-[1100px] px-5 py-10 sm:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#d4af37]">Client portal</p>
            <h1 className="mt-2 font-display text-[32px] text-ink sm:text-[40px]">Welcome back.</h1>
            <p className="mt-1 text-[13px] text-muted">{email}</p>
          </div>
          <form action={signOut}>
            <button className="rounded-[8px] border border-[#2d2d2d] px-4 py-2 text-[13px] text-muted transition-colors hover:border-[#d4af3750] hover:text-[#d4af37]">
              Sign out
            </button>
          </form>
        </div>

        <PortalTabs
          tabs={[
            { key: "proposals", label: "Proposals", content: proposalsContent },
            { key: "contracts", label: "Contracts", content: contractsContent },
            { key: "projects", label: "Projects", content: projectsContent },
            { key: "invoices", label: "Invoices", content: invoicesContent },
            { key: "reports", label: "Reports", content: reportsContent },
            { key: "files", label: "Files", content: filesContent },
            { key: "brand", label: "Brand profile", content: brandContent },
          ]}
        />
      </div>
    </div>
  );
}
