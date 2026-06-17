import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { getProposalsForEmail, inr, type Proposal } from "@/lib/proposals";
import { getProjectsForEmail, type Project } from "@/lib/projects";
import { getInvoicesForEmail, isOverdue, type Invoice } from "@/lib/invoices";
import { getBrandBrainForEmail, type BrandBrain } from "@/lib/brand-brain";
import { BrandForm } from "@/components/site/brand-form";
import { saveMyBrand } from "./brand-actions";

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
  try {
    [proposals, projects, invoices, brand] = await Promise.all([
      getProposalsForEmail(email),
      getProjectsForEmail(email),
      getInvoicesForEmail(email),
      getBrandBrainForEmail(email),
    ]);
  } catch {
    // tables may not exist yet — show empty states
  }

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

      {/* Files — coming soon */}
      <div className="mt-12">
        <div className="glass rounded-xl p-7">
          <h2 className="font-display text-xl">Files</h2>
          <p className="mt-2 text-sm text-ink-soft">Approve creatives and download your assets.</p>
          <p className="eyebrow mt-6 text-accent/70">Coming soon</p>
        </div>
      </div>
    </section>
  );
}
