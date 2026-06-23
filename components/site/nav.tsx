import Link from "next/link";

const links = [
  { href: "https://www.vaelocreative.com/", label: "Portfolio", external: true },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/70 backdrop-blur-xl">
      <nav className="container-vaelo flex h-[72px] items-center justify-between">
        <Link href="/" className="flex flex-col items-center text-center" style={{ fontFamily: "var(--font-azeret-mono)", fontSize: "12px", lineHeight: "1.6", fontWeight: 400 }}>
          <span>Vaelo</span>
          <span>Creative</span>
        </Link>

        <div className="flex items-center gap-6 sm:gap-8">
          <ul className="hidden items-center gap-8 text-sm text-ink-soft sm:flex">
            {links.map((l) =>
              l.external ? (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline transition-colors hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ) : (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              )
            )}
          </ul>
          <Link
            href="/login"
            className="link-underline text-sm text-ink-soft transition-colors hover:text-ink"
          >
            Login
          </Link>
          <Link
            href="/contact"
            className="group hidden items-center gap-2 text-sm font-medium sm:inline-flex"
          >
            <span className="link-underline">Let&apos;s talk growth</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
