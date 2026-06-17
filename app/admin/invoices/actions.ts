"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createInvoice, setInvoiceStatus } from "@/lib/invoices";
import { getProposalById } from "@/lib/proposals";

export async function createInvoiceAction(formData: FormData) {
  const client_name = String(formData.get("client_name") || "").trim();
  const client_email = String(formData.get("client_email") || "").trim();
  const due_date = String(formData.get("due_date") || "").trim();
  const gst_percent = Number(formData.get("gst_percent") || 0);
  const notes = String(formData.get("notes") || "").trim();

  const descs = formData.getAll("itemDesc").map((v) => String(v).trim());
  const amounts = formData.getAll("itemAmount").map((v) => Number(v) || 0);
  const items = descs
    .map((desc, i) => ({ desc, amount: amounts[i] || 0 }))
    .filter((it) => it.desc || it.amount);

  if (!client_name) return;

  await createInvoice({ client_name, client_email, items, gst_percent, due_date, notes });
  redirect("/admin/invoices");
}

export async function markPaidAction(id: string) {
  await setInvoiceStatus(id, "paid");
  revalidatePath("/admin/invoices");
}

export async function voidInvoiceAction(id: string) {
  await setInvoiceStatus(id, "void");
  revalidatePath("/admin/invoices");
}

export async function createInvoiceFromProposalAction(proposalId: string) {
  const p = await getProposalById(proposalId);
  if (!p) return;
  await createInvoice({
    client_name: p.client_name,
    client_email: p.client_email,
    items: p.items,
    proposal_id: p.id,
  });
  redirect("/admin/invoices");
}
