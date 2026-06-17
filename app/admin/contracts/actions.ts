"use server";

import { redirect } from "next/navigation";
import { createContract } from "@/lib/contracts";

export async function createContractAction(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const client_name = String(formData.get("client_name") || "").trim();
  const client_email = String(formData.get("client_email") || "").trim();
  const body = String(formData.get("body") || "").trim();
  if (!title || !client_name) return;
  await createContract({ title, client_name, client_email, body });
  redirect("/admin/contracts");
}
