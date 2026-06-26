"use client";

import { usePathname } from "next/navigation";

/**
 * Internal app surfaces render their own chrome (the Agency OS shell or a
 * standalone auth screen), so the public marketing nav/footer must not appear
 * on them. Everything else is the marketing site and keeps its chrome.
 */
const INTERNAL_PREFIXES = [
  "/admin",
  "/portal",
  "/login",
  "/auth",
  "/set-password",
  "/c/",
  "/i/",
  "/p/",
];

export function isInternalRoute(pathname: string): boolean {
  return INTERNAL_PREFIXES.some(
    (p) => pathname === p || pathname === p.replace(/\/$/, "") || pathname.startsWith(p),
  );
}

/** Renders its children only on public marketing routes. */
export function MarketingOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isInternalRoute(pathname)) return null;
  return <>{children}</>;
}
