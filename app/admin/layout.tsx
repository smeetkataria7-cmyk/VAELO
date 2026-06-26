import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { resolveRoles } from "@/lib/roles";
import { getLeads } from "@/lib/leads";
import { listProjects } from "@/lib/projects";
import { listClientOptions } from "@/lib/clients";
import { AppShell } from "@/components/os/app-shell";
import type { SidebarCounts } from "@/components/os/sidebar";

export const dynamic = "force-dynamic";

export const metadata = {
  title: { default: "Agency OS", template: "%s · Vaelo Agency OS" },
  robots: { index: false, follow: false },
};

async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

function displayName(email: string | undefined, metaName: unknown): string {
  if (typeof metaName === "string" && metaName.trim()) return metaName;
  if (!email) return "Owner";
  const local = email.split("@")[0].replace(/[._-]+/g, " ");
  return local.replace(/\b\w/g, (c) => c.toUpperCase());
}

async function loadCounts(): Promise<SidebarCounts> {
  const [leads, projects, clients] = await Promise.allSettled([
    getLeads(),
    listProjects(),
    listClientOptions(),
  ]);
  return {
    leads: leads.status === "fulfilled" ? leads.value.length : undefined,
    projects: projects.status === "fulfilled" ? projects.value.length : undefined,
    clients: clients.status === "fulfilled" ? clients.value.length : undefined,
  };
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { isSuper } = await resolveRoles(user?.email);
  const counts = await loadCounts();

  const name = displayName(user?.email, user?.user_metadata?.name ?? user?.user_metadata?.full_name);
  const role = isSuper ? "Owner" : "Team";

  return (
    <AppShell userName={name} userRole={role} signOutAction={signOut} counts={counts}>
      {children}
    </AppShell>
  );
}
