"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { uploadClientFile, addFileLink, deleteFile } from "@/lib/files";

export async function uploadFileAction(formData: FormData) {
  const email = String(formData.get("client_email") || "").trim().toLowerCase();
  if (!email) return;

  const file = formData.get("file");
  const link = String(formData.get("link") || "").trim();
  const linkName = String(formData.get("link_name") || "").trim();

  if (file instanceof File && file.size > 0) {
    await uploadClientFile(email, file);
  } else if (link) {
    await addFileLink(email, linkName || link, link);
  } else {
    return; // nothing provided
  }
  redirect("/admin/files");
}

export async function deleteFileAction(id: string) {
  await deleteFile(id);
  revalidatePath("/admin/files");
}
