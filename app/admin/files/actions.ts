"use server";

import { redirect } from "next/navigation";
import { uploadClientFile } from "@/lib/files";

export async function uploadFileAction(formData: FormData) {
  const email = String(formData.get("client_email") || "").trim().toLowerCase();
  const file = formData.get("file");
  if (!email || !(file instanceof File) || file.size === 0) return;
  await uploadClientFile(email, file);
  redirect("/admin/files");
}
