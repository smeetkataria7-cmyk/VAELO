"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, LogOut, Menu, Search } from "lucide-react";

export function TopHeader({
  userName,
  userRole,
  signOutAction,
  onMenuClick,
}: {
  userName: string;
  userRole: string;
  signOutAction: () => void | Promise<void>;
  onMenuClick?: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const initial = (userName?.trim()?.[0] ?? "A").toUpperCase();

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-line-strong bg-paper px-4">
      {/* Mobile menu toggle */}
      <button
        onClick={onMenuClick}
        className="flex h-9 w-9 items-center justify-center rounded-[7px] text-muted hover:text-ink lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      {/* Logo lockup */}
      <div className="flex items-center gap-2.5">
        <div className="os-gold-grad flex h-[30px] w-[30px] items-center justify-center rounded-[8px]">
          <span className="font-display text-[16px] font-bold text-[#0a0a0a]">V</span>
        </div>
        <div className="leading-none">
          <div className="font-display text-[15px] text-ink">Vaelo</div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">Agency OS</div>
        </div>
      </div>

      {/* Search */}
      <div className="mx-auto hidden w-full max-w-[300px] items-center gap-2 rounded-[8px] border border-line-strong bg-input px-3 py-2 text-[13px] text-muted md:flex">
        <Search size={15} />
        <span className="flex-1">Search…</span>
        <kbd className="rounded border border-line-strong px-1.5 py-0.5 text-[10px] text-muted-2">⌘K</kbd>
      </div>

      {/* Right cluster */}
      <div className="ml-auto flex items-center gap-3 md:ml-0">
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-[7px] text-muted hover:text-ink"
          aria-label="Notifications"
        >
          <Bell size={17} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
        </button>

        <div className="h-6 w-px bg-line-strong" />

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-[8px] py-1 pl-1 pr-2 hover:bg-[#ffffff08]"
          >
            <div className="os-gold-grad flex h-8 w-8 items-center justify-center rounded-full">
              <span className="font-display text-[13px] font-semibold text-[#0a0a0a]">{initial}</span>
            </div>
            <div className="hidden text-left leading-tight sm:block">
              <div className="text-[12px] font-medium text-ink">{userName}</div>
              <div className="text-[10px] capitalize text-muted">{userRole}</div>
            </div>
            <ChevronDown size={14} className="text-muted" />
          </button>

          {menuOpen ? (
            <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-44 overflow-hidden rounded-[10px] border border-line-strong bg-card shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
              <div className="border-b border-line-strong px-3 py-2.5">
                <div className="text-[12px] font-medium text-ink">{userName}</div>
                <div className="text-[10px] capitalize text-muted">{userRole}</div>
              </div>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-[13px] text-muted hover:bg-[#ffffff08] hover:text-ink"
                >
                  <LogOut size={15} />
                  Sign out
                </button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
