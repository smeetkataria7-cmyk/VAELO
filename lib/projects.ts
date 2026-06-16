import { getSupabaseAdmin } from "./supabase";

export type Project = {
  id: string;
  title: string;
  client_name: string;
  client_email: string;
  status: "onboarding" | "active" | "paused" | "completed";
  proposal_id: string | null;
  created_at: string;
};

function db() {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase is not configured.");
  return supabase;
}

export async function createProject(input: {
  title: string;
  client_name: string;
  client_email?: string;
  proposal_id?: string | null;
  status?: Project["status"];
}): Promise<Project> {
  const { data, error } = await db()
    .from("projects")
    .insert({
      title: input.title,
      client_name: input.client_name,
      client_email: input.client_email ?? "",
      proposal_id: input.proposal_id ?? null,
      status: input.status ?? "active",
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as Project;
}

export async function listProjects(): Promise<Project[]> {
  const { data, error } = await db()
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Project[];
}

export async function getProjectsForEmail(email: string): Promise<Project[]> {
  if (!email) return [];
  const { data, error } = await db()
    .from("projects")
    .select("*")
    .ilike("client_email", email)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Project[];
}
