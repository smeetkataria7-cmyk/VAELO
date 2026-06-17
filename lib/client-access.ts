import { createClient } from "./supabase-server";

export type Viewer = { email: string | null; isAdmin: boolean };

/** The currently signed-in viewer (email + whether they're the admin). */
export async function getViewer(): Promise<Viewer> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const adminEmail = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "").toLowerCase();
  const email = user?.email?.toLowerCase() ?? null;
  return { email, isAdmin: !!email && email === adminEmail };
}

/** Admin can see everything; a client can only see records matching their email. */
export function canAccess(viewer: Viewer, clientEmail: string): boolean {
  if (viewer.isAdmin) return true;
  return !!viewer.email && !!clientEmail && viewer.email === clientEmail.toLowerCase();
}
