import { NextRequest, NextResponse } from "next/server";

/**
 * Protect /admin with HTTP Basic Auth.
 * Set ADMIN_PASSWORD in your env. Username can be anything; password must match.
 *
 * If ADMIN_PASSWORD is not set, access is allowed (convenient for local dev).
 * ALWAYS set ADMIN_PASSWORD in production.
 */
export function middleware(req: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return NextResponse.next();

  const auth = req.headers.get("authorization");
  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const pwd = decoded.slice(decoded.indexOf(":") + 1);
      if (pwd === password) return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="VAELO Admin"' },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
