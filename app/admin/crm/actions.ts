"use server";

import { revalidatePath } from "next/cache";
import { resolveRoles } from "@/lib/roles";
import { createClient } from "@/lib/supabase-server";
import { setLeadStatus, type LeadStatus } from "@/lib/leads";

/** Change a lead's pipeline status. Admin only. */
export async function changeLeadStatus(id: string, status: LeadStatus): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!(await resolveRoles(user?.email)).isAdmin) return;

  await setLeadStatus(id, status);
  revalidatePath("/admin/crm");
}
