"use server";

import { revalidatePath } from "next/cache";
import { signContract } from "@/lib/contracts";

export async function signContractAction(token: string, formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  if (!name) return;
  await signContract(token, name);
  revalidatePath(`/c/${token}`);
}
