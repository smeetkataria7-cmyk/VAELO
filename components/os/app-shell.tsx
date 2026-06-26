"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Sidebar, type SidebarCounts } from "./sidebar";
import { TopHeader } from "./top-header";

export function AppShell({
  userName,
  userRole,
  signOutAction,
  counts,
  children,
}: {
  userName: string;
  userRole: string;
  signOutAction: () => void | Promise<void>;
  counts?: SidebarCounts;
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="os flex h-screen flex-col overflow-hidden bg-paper text-ink">
      <TopHeader
        userName={userName}
        userRole={userRole}
        signOutAction={signOutAction}
        onMenuClick={() => setDrawerOpen(true)}
      />

      <div className="flex min-h-0 flex-1">
        {/* Desktop sidebar */}
        <div className="hidden lg:flex">
          <Sidebar counts={counts} />
        </div>

        {/* Mobile drawer */}
        {drawerOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setDrawerOpen(false)}
              aria-hidden
            />
            <div className="absolute left-0 top-0 h-full">
              <div className="relative h-full">
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="absolute right-[-40px] top-3 flex h-9 w-9 items-center justify-center rounded-[7px] text-muted hover:text-ink"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
                <Sidebar counts={counts} />
              </div>
            </div>
          </div>
        ) : null}

        {/* Content */}
        <main className="os-scroll min-h-0 flex-1 overflow-y-auto bg-paper-2">
          <div className="mx-auto max-w-[1400px] px-6 py-7 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
