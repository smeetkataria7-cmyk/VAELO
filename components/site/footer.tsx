import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper-2">
      <div className="container-vaelo flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight">VAELO</span>
            <span className="text-xs uppercase tracking-[0.2em] text-muted">
              Creative
            </span>
          </div>
          <p className="mt-3 text-sm text-muted">
            Photoshoot-quality visuals without the photoshoot. AI-generated
            imagery, Instagram management, and paid ads for modern brands.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <p className="mb-3 font-medium">Explore</p>
            <ul className="space-y-2 text-muted">
              <li>
                <Link href="/work" className="hover:text-ink">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-ink">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-ink">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-medium">Get started</p>
            <ul className="space-y-2 text-muted">
              <li>
                <Link href="/contact" className="hover:text-ink">
                  Free AI sample
                </Link>
              </li>
              <li>
                <a href="mailto:hello@vaelocreative.com" className="hover:text-ink">
                  hello@vaelocreative.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-vaelo flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} VAELO Creative. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ink">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
