import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase-middleware";
import { adminEmails, isAdminEmail } from "@/lib/admin";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Refresh the Supabase session and learn who the user is.
  const { response, user } = await updateSession(req);

  const isAdmin = isAdminEmail(user?.email);
  const hasAdmins = adminEmails().length > 0;

  // Admin area — must be signed in AS an admin.
  if (pathname.startsWith("/admin")) {
    if (!user) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    if (hasAdmins && !isAdmin) {
      const url = req.nextUrl.clone();
      url.pathname = "/portal";
      return NextResponse.redirect(url);
    }
  }

  // Client portal — must be signed in.
  if (pathname.startsWith("/portal") && !user) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Client documents (contracts/proposals/invoices) require login.
  // Ownership (must be the right client, or admin) is enforced in each page.
  const isDoc =
    pathname.startsWith("/c/") ||
    pathname.startsWith("/p/") ||
    pathname.startsWith("/i/");
  if (isDoc && !user) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
