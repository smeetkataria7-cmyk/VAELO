"use server";

import { revalidatePath } from "next/cache";
import { getViewer } from "@/lib/client-access";
import { addFinanceEntry, deleteFinanceEntry } from "@/lib/finance";

async function requireSuper() {
  const v = await getViewer();
  if (!v.isSuper) throw new Error("Not authorized");
}

export async function addFinanceAction(formData: FormData) {
  await requireSuper();
  await addFinanceEntry(formData);
  revalidatePath("/admin/finance");
}

export async function deleteFinanceAction(id: string) {
  await requireSuper();
  await deleteFinanceEntry(id);
  revalidatePath("/admin/finance");
}
