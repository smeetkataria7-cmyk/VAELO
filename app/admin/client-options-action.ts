"use server";

import { createClient } from "@/lib/supabase-server";
import { listClientOptions, type ClientOption } from "@/lib/clients";
import { resolveRoles } from "@/lib/roles";

async function roles() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return resolveRoles(user?.email);
}

/** Returns the client list — only to a signed-in admin. */
export async function getClientOptions(): Promise<ClientOption[]> {
  if (!(await roles()).isAdmin) return [];
  return listClientOptions();
}

export async function viewerIsSuper(): Promise<boolean> {
  return (await roles()).isSuper;
}

export async function viewerIsAdmin(): Promise<boolean> {
  return (await roles()).isAdmin;
}
