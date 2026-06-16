"use server";

import { redirect } from "next/navigation";
import { createProposal } from "@/lib/proposals";

export async function createProposalAction(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const client_name = String(formData.get("client_name") || "").trim();
  const client_email = String(formData.get("client_email") || "").trim();
  const notes = String(formData.get("notes") || "").trim();

  const descs = formData.getAll("itemDesc").map((v) => String(v).trim());
  const amounts = formData.getAll("itemAmount").map((v) => Number(v) || 0);
  const items = descs
    .map((desc, i) => ({ desc, amount: amounts[i] || 0 }))
    .filter((it) => it.desc || it.amount);

  if (!title || !client_name) return;

  await createProposal({ title, client_name, client_email, items, notes });
  redirect("/admin/proposals");
}
