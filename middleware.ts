import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase-middleware";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Refresh the Supabase session (and learn who the user is) on every request.
  const { response, user } = await updateSession(req);

  // Protect /admin with HTTP Basic Auth (owner-only operational page).
  if (pathname.startsWith("/admin")) {
    const password = process.env.ADMIN_PASSWORD;
    if (password) {
      const auth = req.headers.get("authorization");
      let ok = false;
      if (auth) {
        const [scheme, encoded] = auth.split(" ");
        if (scheme === "Basic" && encoded) {
          const decoded = atob(encoded);
          ok = decoded.slice(decoded.indexOf(":") + 1) === password;
        }
      }
      if (!ok) {
        return new NextResponse("Authentication required.", {
          status: 401,
          headers: { "WWW-Authenticate": 'Basic realm="Vaelo Admin"' },
        });
      }
    }
  }

  // Protect the client portal — must be signed in.
  if (pathname.startsWith("/portal") && !user) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
