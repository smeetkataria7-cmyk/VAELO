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

const statusColor: Record<string, string> = {
  draft: "text-muted",
  sent: "text-ink-soft",
  viewed: "text-accent",
  accepted: "text-green-400",
  declined: "text-red-400",
  onboarding: "text-accent",
  active: "text-green-400",
  paused: "text-muted",
  completed: "text-ink-soft",
  paid: "text-green-400",
  overdue: "text-red-400",
  void: "text-muted",
  pending: "text-ink-soft",
  approved: "text-green-400",
  revision: "text-red-400",
};

export default async function PortalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const email = user.email ?? "";
  let proposals: Proposal[] = [];
  let projects: Project[] = [];
  let invoices: Invoice[] = [];
  let brand: BrandBrain | null = null;
  let files: FileRec[] = [];
  try {
    [proposals, projects, invoices, brand, files] = await Promise.all([
      getProposalsForEmail(email),
      getProjectsForEmail(email),
      getInvoicesForEmail(email),
      getBrandBrainForEmail(email),
      listFilesForEmail(email),
    ]);
  } catch {
    // tables may not exist yet — show empty states
  }
  const fileItems = await Promise.all(
    files.map(async (f) => ({ ...f, url: await signedUrlFor(f.path) }))
  );

  return (
    <section className="container-vaelo py-16 sm:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Client portal</p>
          <h1 className="font-display mt-3 text-4xl sm:text-5xl">Welcome back.</h1>
          <p className="mt-3 text-ink-soft">{email}</p>
        </div>
        <form action={signOut}>
          <button className="rounded-full border border-line px-5 py-2.5 text-sm transition-colors hover:border-accent/50 hover:text-accent">
            Sign out
          </button>
        </form>
      </div>

      {/* Proposals */}
      <div className="mt-12">
        <h2 className="font-display text-2xl">Your proposals</h2>
        {proposals.length === 0 ? (
          <p className="mt-3 text-muted">No proposals yet.</p>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {proposals.map((p) => (
              <Link key={p.id} href={`/p/${p.public_token}`} className="glass block rounded-xl p-6 transition-colors hover:border-accent/40">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-lg">{p.title}</h3>
                  <span className={`eyebrow capitalize ${statusColor[p.status] ?? ""}`}>{p.status}</span>
                </div>
                <p className="mt-2 text-2xl font-display">{inr(p.total)}</p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Projects */}
      <div className="mt-12">
        <h2 className="font-display text-2xl">Your projects</h2>
        {projects.length === 0 ? (
          <p className="mt-3 text-muted">No active projects yet.</p>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <div key={p.id} className="glass rounded-xl p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-lg">{p.title}</h3>
                  <span className={`eyebrow capitalize ${statusColor[p.status] ?? ""}`}>{p.status}</span>
                </div>
                <p className="mt-2 text-sm text-muted">
                  Started {new Date(p.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Invoices */}
      <div className="mt-12">
        <h2 className="font-display text-2xl">Your invoices</h2>
        {invoices.length === 0 ? (
          <p className="mt-3 text-muted">No invoices yet.</p>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {invoices.map((inv) => {
              const status = isOverdue(inv) ? "overdue" : inv.status;
              return (
                <Link key={inv.id} href={`/i/${inv.public_token}`} className="glass block rounded-xl p-6 transition-colors hover:border-accent/40">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-lg">{inv.number}</h3>
                    <span className={`eyebrow capitalize ${statusColor[status] ?? ""}`}>{status}</span>
                  </div>
                  <p className="mt-2 font-display text-2xl">{inr(inv.total)}</p>
                  {inv.due_date && status !== "paid" && (
                    <p className="mt-1 text-xs text-muted">Due {new Date(inv.due_date).toLocaleDateString()}</p>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Brand profile */}
      <div className="mt-12">
        <h2 className="font-display text-2xl">Your brand profile</h2>
        <p className="mt-2 max-w-xl text-sm text-ink-soft">
          The more we know about your brand, the sharper everything we make. Fill this
          once — we&apos;ll use it across all your creative.
        </p>
        <div className="glass mt-5 rounded-2xl p-6 sm:p-8">
          <BrandForm
            initial={brand as unknown as Record<string, string> | null}
            action={saveMyBrand}
          />
        </div>
      </div>

      {/* Files & approvals */}
      <div className="mt-12">
        <h2 className="font-display text-2xl">Your files</h2>
        {fileItems.length === 0 ? (
          <p className="mt-3 text-muted">No files delivered yet.</p>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {fileItems.map((f) => (
              <div key={f.id} className="glass rounded-xl p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="truncate font-medium" title={f.name}>{f.name}</h3>
                  <span className={`eyebrow capitalize ${statusColor[f.status] ?? ""}`}>{f.status}</span>
                </div>
                {f.url && (
                  <a href={f.url} target="_blank" className="mt-3 inline-block text-sm text-accent hover:underline">
                    Open / download →
                  </a>
                )}
                {f.status !== "approved" && (
                  <div className="mt-4 flex flex-col gap-2">
                    <form action={approveFile.bind(null, f.id)}>
                      <button className="w-full rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-ink hover:opacity-90">
                        Approve
                      </button>
                    </form>
                    <form action={requestRevision.bind(null, f.id)} className="flex gap-2">
                      <input
                        name="comment"
                        placeholder="What to change?"
                        className="min-w-0 flex-1 border-b border-line bg-transparent pb-1 text-sm outline-none focus:border-accent"
                      />
                      <button className="shrink-0 text-sm text-ink-soft hover:text-ink">Request revision</button>
                    </form>
                  </div>
                )}
                {f.status === "revision" && f.comment && (
                  <p className="mt-2 text-xs text-muted">You asked: &ldquo;{f.comment}&rdquo;</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
