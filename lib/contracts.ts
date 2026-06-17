import { getSupabaseAdmin } from "./supabase";

export type Contract = {
  id: string;
  title: string;
  client_name: string;
  client_email: string;
  body: string;
  public_token: string;
  status: "sent" | "signed";
  signer_name: string;
  signed_at: string | null;
  created_at: string;
};

function db() {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase is not configured.");
  return supabase;
}

export async function createContract(input: {
  title: string;
  client_name: string;
  client_email?: string;
  body?: string;
}): Promise<Contract> {
  const { data, error } = await db()
    .from("contracts")
    .insert({
      title: input.title,
      client_name: input.client_name,
      client_email: input.client_email ?? "",
      body: input.body ?? "",
      public_token: crypto.randomUUID(),
      status: "sent",
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as Contract;
}

export async function listContracts(): Promise<Contract[]> {
  const { data, error } = await db()
    .from("contracts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Contract[];
}

export async function getContractByToken(token: string): Promise<Contract | null> {
  const { data, error } = await db()
    .from("contracts")
    .select("*")
    .eq("public_token", token)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data as Contract) ?? null;
}

export async function getContractsForEmail(email: string): Promise<Contract[]> {
  if (!email) return [];
  const { data, error } = await db()
    .from("contracts")
    .select("*")
    .ilike("client_email", email)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Contract[];
}

export async function signContract(token: string, signerName: string): Promise<void> {
  const { error } = await db()
    .from("contracts")
    .update({ status: "signed", signer_name: signerName, signed_at: new Date().toISOString() })
    .eq("public_token", token);
  if (error) throw new Error(error.message);
}
