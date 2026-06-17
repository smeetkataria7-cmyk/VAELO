"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createReportFromForm, deleteReport } from "@/lib/reports";

export async function createReportAction(formData: FormData) {
  await createReportFromForm(formData);
  redirect("/admin/reports");
}

export async function deleteReportAction(id: string) {
  await deleteReport(id);
  revalidatePath("/admin/reports");
}
