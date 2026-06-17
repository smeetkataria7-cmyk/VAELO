"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase-server";
import { upsertBrandBrain, BRAND_FIELDS } from "@/lib/brand-brain";

/** Saves the signed-in client's own brand profile. */
export async function saveMyBrand(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return;

  const fields: Record<string, string> = {};
  for (const f of BRAND_FIELDS) fields[f.name] = String(formData.get(f.name) || "");

  await upsertBrandBrain(user.email, fields);
  revalidatePath("/portal");
}
