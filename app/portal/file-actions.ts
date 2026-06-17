"use server";

import { revalidatePath } from "next/cache";
import { setFileStatus } from "@/lib/files";

export async function approveFile(id: string) {
  await setFileStatus(id, "approved");
  revalidatePath("/portal");
}

export async function requestRevision(id: string, formData: FormData) {
  const comment = String(formData.get("comment") || "").trim();
  await setFileStatus(id, "revision", comment);
  revalidatePath("/portal");
}
