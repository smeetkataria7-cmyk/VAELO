import { getSupabaseAdmin } from "./supabase";

export type TeamMember = {
  id: string;
  email: string;
  role: "admin" | "super";
  added_by: string;
  created_at: string;
};

function db() {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase is not configured.");
  return supabase;
}

export async function listTeam(): Promise<TeamMember[]> {
  const { data, error } = await db()
    .from("team_members")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as TeamMember[];
}

export async function addTeamMember(email: string, role: "admin" | "super", by: string): Promise<void> {
  const { error } = await db()
    .from("team_members")
    .upsert(
      { email: email.trim().toLowerCase(), role, added_by: by },
      { onConflict: "email" }
    );
  if (error) throw new Error(error.message);
}

export async function removeTeamMember(email: string): Promise<void> {
  const { error } = await db().from("team_members").delete().ilike("email", email);
  if (error) throw new Error(error.message);
}

/** Sends an email invite so the person can set a password and log in. */
export async function inviteUser(
  email: string,
  redirectTo: string
): Promise<{ ok: boolean; error?: string }> {
  const { error } = await db().auth.admin.inviteUserByEmail(email.trim().toLowerCase(), {
    redirectTo,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/** Deletes a client's login account by email (revokes portal access). */
export async function deleteAuthUserByEmail(email: string): Promise<boolean> {
  const supabase = db();
  const { data } = await supabase.auth.admin.listUsers();
  const u = data?.users?.find((x) => (x.email || "").toLowerCase() === email.toLowerCase());
  if (!u) return false;
  const { error } = await supabase.auth.admin.deleteUser(u.id);
  return !error;
}
