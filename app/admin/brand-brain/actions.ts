"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { upsertBrandBrain, BRAND_FIELDS } from "@/lib/brand-brain";

export async function saveBrandForEmail(email: string, formData: FormData) {
  const fields: Record<string, string> = {};
  for (const f of BRAND_FIELDS) fields[f.name] = String(formData.get(f.name) || "");
  await upsertBrandBrain(email, fields);
  revalidatePath(`/admin/brand-brain/${encodeURIComponent(email)}`);
  revalidatePath("/admin/brand-brain");
}

export async function openBrandForEmail(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  if (!email) return;
  redirect(`/admin/brand-brain/${encodeURIComponent(email)}`);
}
