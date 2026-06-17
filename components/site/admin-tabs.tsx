"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/admin", label: "Leads" },
  { href: "/admin/proposals", label: "Proposals" },
  { href: "/admin/contracts", label: "Contracts" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/invoices", label: "Invoices" },
  { href: "/admin/files", label: "Files" },
  { href: "/admin/reports", label: "Reports" },
  { href: "/admin/brand-brain", label: "Brand Brain" },
];

export function AdminTabs() {
  const path = usePathname();
  return (
    <nav className="mb-8 flex flex-wrap gap-1 border-b border-accent/40">
      {tabs.map((t) => {
        const active = t.href === "/admin" ? path === "/admin" : path.startsWith(t.href);
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`-mb-px border-b-2 px-4 py-2.5 text-sm transition-colors ${
              active
                ? "border-accent text-ink"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
