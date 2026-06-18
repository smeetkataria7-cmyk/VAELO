"use server";

import { createClient } from "@/lib/supabase-server";
import { listClientOptions, type ClientOption } from "@/lib/clients";
import { isAdminEmail, isSuperAdminEmail } from "@/lib/admin";

/** Whether the signed-in viewer is a master (super) admin. */
export async function viewerIsSuper(): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return isSuperAdminEmail(user?.email);
}

/** Returns the client list — only to a signed-in admin. */
export async function getClientOptions(): Promise<ClientOption[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdminEmail(user?.email)) return [];
  return listClientOptions();
}
