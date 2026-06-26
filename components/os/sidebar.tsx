"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart3,
  Brain,
  Building2,
  FileSignature,
  FileText,
  FolderKanban,
  FolderOpen,
  Images,
  LayoutDashboard,
  Receipt,
  Repeat,
  Settings,
  Users,
  UsersRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { viewerIsSuper } from "@/app/admin/client-options-action";
import { CountPill, type Tone } from "./ui";

type Item = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
  badgeTone?: Tone;
  exact?: boolean;
};

type Group = { label: string; items: Item[]; super?: boolean };

export type SidebarCounts = { leads?: number; projects?: number; clients?: number };

function buildGroups(counts: SidebarCounts): Group[] {
  return [
    {
      label: "Overview",
      items: [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
        { href: "/admin/crm", label: "CRM / Leads", icon: Users, badge: counts.leads, badgeTone: "gold" },
        { href: "/admin/projects", label: "Projects", icon: FolderKanban, badge: counts.projects, badgeTone: "info" },
      ],
    },
    {
      label: "Business",
      items: [
        { href: "/admin/proposals", label: "Proposals", icon: FileText },
        { href: "/admin/invoices", label: "Invoicing", icon: Receipt },
        { href: "/admin/retainers", label: "Retainers", icon: Repeat },
        { href: "/admin/contracts", label: "Contracts", icon: FileSignature },
      ],
    },
    {
      label: "Clients",
      items: [
        { href: "/admin/clients", label: "Clients", icon: Building2, badge: counts.clients, badgeTone: "gold" },
        { href: "/admin/brand-brain", label: "Brand Brain", icon: Brain },
      ],
    },
    {
      label: "Production",
      items: [
        { href: "/admin/works", label: "Creatives", icon: Images },
        { href: "/admin/files", label: "Files", icon: FolderOpen },
      ],
    },
    {
      label: "Workspace",
      super: true,
      items: [
        { href: "/admin/finance", label: "Finance", icon: Wallet },
        { href: "/admin/people", label: "Team", icon: UsersRound },
      ],
    },
  ];
}

const PINNED: Item[] = [
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function isActive(pathname: string, item: Item) {
  return item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(item.href + "/");
}

function NavLink({ item, pathname }: { item: Item; pathname: string }) {
  const active = isActive(pathname, item);
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={`flex h-9 items-center gap-2.5 rounded-[7px] px-2.5 text-[13px] transition-colors ${
        active
          ? "bg-[rgba(212,175,55,0.1)] font-medium text-[#d4af37]"
          : "text-muted hover:bg-[#ffffff08] hover:text-ink"
      }`}
    >
      <Icon size={15} strokeWidth={1.7} className={active ? "text-[#d4af37]" : ""} />
      <span className="truncate">{item.label}</span>
      {typeof item.badge === "number" && item.badge > 0 ? (
        <CountPill count={item.badge} tone={item.badgeTone} />
      ) : null}
    </Link>
  );
}

export function Sidebar({ counts = {} }: { counts?: SidebarCounts }) {
  const pathname = usePathname();
  const [isSuper, setIsSuper] = useState(false);

  useEffect(() => {
    viewerIsSuper()
      .then(setIsSuper)
      .catch(() => {});
  }, []);

  const groups = buildGroups(counts).filter((g) => !g.super || isSuper);

  return (
    <aside className="flex h-full w-[260px] shrink-0 flex-col border-r border-line-strong bg-paper">
      <nav className="os-scroll flex-1 overflow-y-auto px-2.5 py-4">
        {groups.map((group) => (
          <div key={group.label} className="mb-5">
            <p className="px-2.5 pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#374151]">
              {group.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <NavLink key={item.href} item={item} pathname={pathname} />
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="border-t border-line-strong px-2.5 py-3">
        <div className="flex flex-col gap-0.5">
          {PINNED.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </div>
      </div>
    </aside>
  );
}
