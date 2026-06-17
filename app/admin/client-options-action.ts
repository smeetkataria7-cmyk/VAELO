"use server";

import { createClient } from "@/lib/supabase-server";
import { listClientOptions, type ClientOption } from "@/lib/clients";
import { isAdminEmail } from "@/lib/admin";

/** Returns the client list — only to a signed-in admin. */
export async function getClientOptions(): Promise<ClientOption[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdminEmail(user?.email)) return [];
  return listClientOptions();
}
