"use server";

import { revalidatePath } from "next/cache";
import { getViewer } from "@/lib/client-access";
import { addTeamMember, removeTeamMember, deleteAuthUserByEmail } from "@/lib/team";

async function requireSuper() {
  const v = await getViewer();
  if (!v.isSuper) throw new Error("Not authorized");
  return v;
}

export async function addAdminAction(formData: FormData) {
  const v = await requireSuper();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const role = String(formData.get("role") || "admin") === "super" ? "super" : "admin";
  if (!email) return;
  await addTeamMember(email, role, v.email ?? "");
  revalidatePath("/admin/people");
}

export async function removeAdminAction(email: string) {
  await requireSuper();
  await removeTeamMember(email);
  revalidatePath("/admin/people");
}

export async function removeClientAction(email: string) {
  await requireSuper();
  await deleteAuthUserByEmail(email);
  revalidatePath("/admin/people");
}
