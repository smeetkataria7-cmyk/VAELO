"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function SiteNav() {
  const pathname = usePathname();
  const isWorkPage = pathname.startsWith("/work");

  return (
    <header className="sticky top-0 z-50 border-b border-line/40 bg-paper/80 backdrop-blur-xl">
      <nav className="container-vaelo grid h-[72px] grid-cols-3 items-center gap-2 sm:gap-4">

        {/* Left — social icons */}
        <div className="flex items-center gap-2 sm:gap-5">
          <a href="https://instagram.com/vaelocreative" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-ink-soft hover:text-ink transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px]">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a href="https://facebook.com/vaelocreative" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-ink-soft hover:text-ink transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px]">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          <a href="https://linkedin.com/company/vaelocreative" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-ink-soft hover:text-ink transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px]">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
        </div>

        {/* Center — logo, single line */}
        <a
          href="https://www.vaelocreative.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center text-center text-[11px] sm:text-[13px]"
          style={{ fontFamily: "var(--font-azeret-mono)", lineHeight: "1", fontWeight: 400, whiteSpace: "nowrap" }}
        >
          Vaelo Creative
        </a>

        {/* Right — pill nav buttons */}
        <div className="flex items-center justify-end gap-2 sm:gap-3">
          {isWorkPage ? (
            <a
              href="https://www.vaelocreative.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-ink px-3 py-1.5 sm:px-5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Return to Main page
            </a>
          ) : (
            <Link
              href="/work"
              className="rounded-full border border-ink px-3 py-1.5 sm:px-5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Portfolio
            </Link>
          )}
        </div>

      </nav>
    </header>
  );
}
