/**
 * Admin emails come from env. Supports a comma-separated list:
 *   NEXT_PUBLIC_ADMIN_EMAILS="you@x.com, colleague@x.com"
 * (NEXT_PUBLIC_ADMIN_EMAIL is still honoured for backwards compatibility.)
 */
export function adminEmails(): string[] {
  const raw = `${process.env.NEXT_PUBLIC_ADMIN_EMAILS || ""},${process.env.NEXT_PUBLIC_ADMIN_EMAIL || ""}`;
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return adminEmails().includes(email.toLowerCase());
}
