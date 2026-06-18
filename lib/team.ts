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

/** Deletes a client's login account by email (revokes portal access). */
export async function deleteAuthUserByEmail(email: string): Promise<boolean> {
  const supabase = db();
  const { data } = await supabase.auth.admin.listUsers();
  const u = data?.users?.find((x) => (x.email || "").toLowerCase() === email.toLowerCase());
  if (!u) return false;
  const { error } = await supabase.auth.admin.deleteUser(u.id);
  return !error;
}
