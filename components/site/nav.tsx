import Link from "next/link";

const links = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/70 backdrop-blur-xl">
      <nav className="container-vaelo flex h-[72px] items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl tracking-tight">Vaelo</span>
          <span className="eyebrow hidden sm:inline">Creative</span>
        </Link>

        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 text-sm text-ink-soft sm:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline transition-colors hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 text-sm font-medium"
          >
            <span className="link-underline">Free AI sample</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
