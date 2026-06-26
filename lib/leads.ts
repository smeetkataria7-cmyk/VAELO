import { promises as fs } from "fs";
import path from "path";
import { getSupabaseAdmin } from "./supabase";

export type Lead = {
  id: string;
  name: string;
  brand: string;
  email: string;
  instagram: string;
  goal: string;
  source: string;
  status: string;
  created_at: string;
};

export type NewLead = Omit<Lead, "id" | "created_at" | "status" | "source"> & {
  source?: string;
};

const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");

/**
 * Save a lead. Uses Supabase when configured, otherwise falls back to a local
 * JSON file so the form works end-to-end during early development.
 */
export async function saveLead(input: NewLead): Promise<Lead> {
  const supabase = getSupabaseAdmin();

  const base = {
    name: input.name,
    brand: input.brand,
    email: input.email,
    instagram: input.instagram ?? "",
    goal: input.goal ?? "",
    source: input.source ?? "website",
    status: "new",
  };

  if (supabase) {
    const { data, error } = await supabase
      .from("leads")
      .insert(base)
      .select()
      .single();
    if (error) throw new Error(`Supabase insert failed: ${error.message}`);
    return data as Lead;
  }

  // Local fallback
  const lead: Lead = {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    ...base,
  };
  await fs.mkdir(path.dirname(LEADS_FILE), { recursive: true });
  let leads: Lead[] = [];
  try {
    leads = JSON.parse(await fs.readFile(LEADS_FILE, "utf-8"));
  } catch {
    // no file yet
  }
  leads.push(lead);
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  return lead;
}

/** Valid lead pipeline statuses (mirrors the CRM Kanban columns). */
export const LEAD_STATUSES = [
  "new",
  "contacted",
  "proposal_sent",
  "won",
  "lost",
] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

/** Update a lead's pipeline status. No-op without Supabase configured. */
export async function setLeadStatus(id: string, status: LeadStatus): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;
  const { error } = await supabase.from("leads").update({ status }).eq("id", id);
  if (error) throw new Error(`Supabase update failed: ${error.message}`);
}

/** Fetch all leads (newest first) for the admin view. */
export async function getLeads(): Promise<Lead[]> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(`Supabase select failed: ${error.message}`);
    return (data ?? []) as Lead[];
  }

  try {
    const leads: Lead[] = JSON.parse(await fs.readFile(LEADS_FILE, "utf-8"));
    return leads.sort((a, b) => b.created_at.localeCompare(a.created_at));
  } catch {
    return [];
  }
}
