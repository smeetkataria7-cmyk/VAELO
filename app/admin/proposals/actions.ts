"use server";

import { redirect } from "next/navigation";
import { createProposal, getProposalById } from "@/lib/proposals";
import { createProject } from "@/lib/projects";

export async function convertToProjectAction(proposalId: string) {
  const p = await getProposalById(proposalId);
  if (!p) return;
  await createProject({
    title: p.title,
    client_name: p.client_name,
    client_email: p.client_email,
    proposal_id: p.id,
    status: "onboarding",
  });
  redirect("/admin/projects");
}

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
