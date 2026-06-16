import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="container-vaelo py-20">
        {/* Big closing line */}
        <div className="max-w-3xl">
          <p className="eyebrow">Let&apos;s make something</p>
          <h2 className="font-display mt-4 text-4xl leading-tight sm:text-6xl">
            Visuals that move
            <br />
            your brand forward.
          </h2>
          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center gap-2 text-base font-medium"
          >
            <span className="link-underline">Get a free AI sample</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Meta row */}
        <div className="mt-20 flex flex-col gap-8 border-t border-line pt-10 text-sm text-muted sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-lg text-ink">Vaelo</span>
              <span className="eyebrow">Creative</span>
            </div>
            <p className="mt-2 max-w-xs">
              An AI-first creative studio. Photoshoot-quality visuals, without the
              photoshoot.
            </p>
          </div>

          <div className="flex gap-12">
            <div className="flex flex-col gap-2">
              <Link href="/work" className="hover:text-ink">Work</Link>
              <Link href="/services" className="hover:text-ink">Services</Link>
              <Link href="/about" className="hover:text-ink">About</Link>
            </div>
            <div className="flex flex-col gap-2">
              <a href="mailto:hello@vaelocreative.com" className="hover:text-ink">
                hello@vaelocreative.com
              </a>
              <Link href="/privacy" className="hover:text-ink">Privacy</Link>
              <Link href="/terms" className="hover:text-ink">Terms</Link>
            </div>
          </div>
        </div>

        <p className="mt-10 text-xs text-muted">
          © {new Date().getFullYear()} Vaelo Creative. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
