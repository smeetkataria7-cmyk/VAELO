"use server";

import { revalidatePath } from "next/cache";
import { getViewer } from "@/lib/client-access";
import { addWork, deleteWork, setWorkPublished } from "@/lib/works";

async function requireAdmin() {
  const v = await getViewer();
  if (!v.isAdmin) throw new Error("Not authorized");
}

export async function addWorkAction(formData: FormData) {
  await requireAdmin();
  await addWork(formData);
  revalidatePath("/admin/works");
  revalidatePath("/work");
}

export async function deleteWorkAction(id: string) {
  await requireAdmin();
  await deleteWork(id);
  revalidatePath("/admin/works");
  revalidatePath("/work");
}

export async function togglePublishedAction(id: string, published: boolean) {
  await requireAdmin();
  await setWorkPublished(id, published);
  revalidatePath("/admin/works");
  revalidatePath("/work");
}
