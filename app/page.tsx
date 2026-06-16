import Link from "next/link";
import { Media } from "@/components/site/media";
import { hero, services, caseStudies, steps } from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="container-vaelo pt-20 pb-24 sm:pt-28">
        <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rise">
            <p className="eyebrow">AI-first creative studio</p>
            <h1 className="font-display mt-6 text-5xl leading-[1.02] sm:text-7xl">
              Photoshoot-quality
              <br />
              visuals, without the
              <br />
              <span className="text-accent">photoshoot.</span>
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft">
              We craft studio-grade brand imagery with AI, then run your Instagram
              and ads with it — at a fraction of the cost and time of a traditional
              shoot.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-all hover:gap-3"
              >
                Get a free AI sample
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </Link>
              <Link href="/work" className="link-underline text-sm font-medium">
                See our work
              </Link>
            </div>
          </div>

          <Media
            src={hero.image || undefined}
            alt="VAELO AI-generated brand visual"
            label="VAELO"
            priority
            className="aspect-[4/5] w-full rise"
          />
        </div>
      </section>

      {/* Trust line */}
      <section className="border-y border-line">
        <div className="container-vaelo flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
          <span className="eyebrow">Trusted by brands across India</span>
          <div className="flex flex-wrap gap-x-10 gap-y-2">
            {caseStudies.map((c) => (
              <span key={c.slug} className="font-display text-base text-ink-soft">
                {c.brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contrast — editorial, no boxes */}
      <section className="container-vaelo py-24 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Why VAELO</p>
            <h2 className="font-display mt-5 text-4xl leading-tight sm:text-5xl">
              The same impact.
              <br />A fraction of the cost.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            <div className="bg-paper-2 p-8">
              <p className="eyebrow">Traditional shoot</p>
              <ul className="mt-6 space-y-4 text-ink-soft">
                {["Thousands per shoot", "Weeks of planning", "Studio, models, crew", "Reshoots cost more"].map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-0.5 text-muted">—</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-ink p-8 text-paper">
              <p className="eyebrow text-paper/50">The VAELO way</p>
              <ul className="mt-6 space-y-4">
                {["A fraction of the cost", "Delivered in days", "No studio needed", "Unlimited concepts"].map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-0.5 text-accent">+</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services — editorial list */}
      <section className="border-t border-line">
        <div className="container-vaelo py-24 sm:py-32">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">
              What we do
            </h2>
            <Link href="/services" className="link-underline hidden text-sm font-medium sm:inline">
              All services →
            </Link>
          </div>

          <div className="mt-14">
            {services.map((s, i) => (
              <div
                key={s.slug}
                className="grid gap-6 border-t border-line py-10 sm:grid-cols-[auto_1fr_1.2fr] sm:gap-12"
              >
                <span className="font-display text-2xl text-muted">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-2xl">{s.title}</h3>
                  <p className="mt-2 max-w-xs text-ink-soft">{s.tagline}</p>
                </div>
                <p className="flex flex-wrap items-start gap-x-2 gap-y-1 text-sm text-muted sm:justify-end sm:text-right">
                  {s.includes.map((inc, idx) => (
                    <span key={inc}>
                      {inc}
                      {idx < s.includes.length - 1 && <span className="mx-1 text-line">·</span>}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work preview */}
      <section className="border-t border-line">
        <div className="container-vaelo py-24 sm:py-32">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">
              Selected work
            </h2>
            <Link href="/work" className="link-underline hidden text-sm font-medium sm:inline">
              View all →
            </Link>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2">
            {caseStudies.slice(0, 2).map((c) => (
              <Link key={c.slug} href="/work" className="group block">
                <Media
                  src={c.image || undefined}
                  alt={`${c.brand} — ${c.industry}`}
                  label={c.brand}
                  className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.01]"
                />
                <div className="mt-5 flex items-baseline justify-between">
                  <h3 className="font-display text-2xl">{c.brand}</h3>
                  <span className="eyebrow">{c.industry}</span>
                </div>
                <p className="mt-2 max-w-md text-ink-soft">{c.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-line">
        <div className="container-vaelo py-24 sm:py-32">
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">
            How it works
          </h2>
          <div className="mt-14 grid gap-12 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="border-t border-ink pt-6">
                <p className="font-display text-3xl">{s.n}</p>
                <h3 className="mt-4 text-lg font-medium">{s.title}</h3>
                <p className="mt-2 text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
