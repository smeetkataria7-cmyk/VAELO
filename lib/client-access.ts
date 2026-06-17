import { createClient } from "./supabase-server";
import { isAdminEmail } from "./admin";

export type Viewer = { email: string | null; isAdmin: boolean };

/** The currently signed-in viewer (email + whether they're an admin). */
export async function getViewer(): Promise<Viewer> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const email = user?.email?.toLowerCase() ?? null;
  return { email, isAdmin: isAdminEmail(email) };
}

/** Admin can see everything; a client can only see records matching their email. */
export function canAccess(viewer: Viewer, clientEmail: string): boolean {
  if (viewer.isAdmin) return true;
  return !!viewer.email && !!clientEmail && viewer.email === clientEmail.toLowerCase();
}
