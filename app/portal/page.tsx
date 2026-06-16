import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

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

const cards = [
  { title: "Projects", body: "Track the status of your work and milestones." },
  { title: "Proposals", body: "Review and accept proposals online." },
  { title: "Invoices", body: "See what's due and pay securely." },
  { title: "Files", body: "Approve creatives and download your assets." },
];

export default async function PortalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <section className="container-vaelo py-16 sm:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Client portal</p>
          <h1 className="font-display mt-3 text-4xl sm:text-5xl">
            Welcome back.
          </h1>
          <p className="mt-3 text-ink-soft">{user.email}</p>
        </div>
        <form action={signOut}>
          <button className="rounded-full border border-line px-5 py-2.5 text-sm transition-colors hover:border-accent/50 hover:text-accent">
            Sign out
          </button>
        </form>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.title} className="glass rounded-xl p-7">
            <h2 className="font-display text-xl">{c.title}</h2>
            <p className="mt-2 text-sm text-ink-soft">{c.body}</p>
            <p className="mt-6 eyebrow text-accent/70">Coming soon</p>
          </div>
        ))}
      </div>
    </section>
  );
}
