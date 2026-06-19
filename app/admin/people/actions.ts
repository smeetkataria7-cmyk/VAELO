"use server";

import { revalidatePath } from "next/cache";
import { getViewer } from "@/lib/client-access";
import { addTeamMember, removeTeamMember, deleteAuthUserByEmail, inviteUser } from "@/lib/team";

async function requireSuper() {
  const v = await getViewer();
  if (!v.isSuper) throw new Error("Not authorized");
  return v;
}

/**
 * Invites a new user/admin: emails them a link to set a password and log in.
 * If role is admin/super they're also granted that role.
 */
export async function inviteUserAction(formData: FormData) {
  const v = await requireSuper();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const role = String(formData.get("role") || "client"); // client | admin | super
  if (!email) return;

  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://vaelo-2fo7.vercel.app";
  await inviteUser(email, `${site}/auth/callback?next=/set-password`);

  if (role === "admin" || role === "super") {
    await addTeamMember(email, role, v.email ?? "");
  }
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
