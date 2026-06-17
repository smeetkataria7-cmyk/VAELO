"use server";

import { createClient } from "@/lib/supabase-server";
import { listClientOptions, type ClientOption } from "@/lib/clients";

/** Returns the client list — only to the signed-in admin. */
export async function getClientOptions(): Promise<ClientOption[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const admin = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "").toLowerCase();
  if (!user?.email || user.email.toLowerCase() !== admin) return [];
  return listClientOptions();
}
