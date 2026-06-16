import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { getProposalsForEmail, inr, type Proposal } from "@/lib/proposals";
import { getProjectsForEmail, type Project } from "@/lib/projects";

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
  try {
    [proposals, projects] = await Promise.all([
      getProposalsForEmail(email),
      getProjectsForEmail(email),
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

      {/* Coming soon */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {[
          { title: "Invoices", body: "See what's due and pay securely." },
          { title: "Files", body: "Approve creatives and download your assets." },
        ].map((c) => (
          <div key={c.title} className="glass rounded-xl p-7">
            <h2 className="font-display text-xl">{c.title}</h2>
            <p className="mt-2 text-sm text-ink-soft">{c.body}</p>
            <p className="eyebrow mt-6 text-accent/70">Coming soon</p>
          </div>
        ))}
      </div>
    </section>
  );
}
