import Link from "next/link";
import { services, caseStudies, contrast, steps } from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container-vaelo py-24 sm:py-32">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-paper-2 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            AI-powered creative studio
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Photoshoot-quality visuals.
            <br />
            <span className="text-accent">None of the photoshoot.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            VAELO Creative generates studio-grade brand imagery with AI, then runs
            your Instagram and ads with it — at a fraction of the cost and time of
            a traditional shoot.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-paper transition-colors hover:bg-ink-soft"
            >
              Get a free AI sample
            </Link>
            <Link
              href="/work"
              className="inline-flex h-12 items-center justify-center rounded-full border border-line bg-paper px-6 text-sm font-medium transition-colors hover:bg-paper-2"
            >
              See our work
            </Link>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-line bg-paper-2">
        <div className="container-vaelo flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-6 text-sm text-muted">
          <span className="uppercase tracking-wider">Trusted by brands across India</span>
          {/* TODO: replace with real client logos */}
          {caseStudies.map((c) => (
            <span key={c.slug} className="font-medium text-ink-soft">
              {c.brand}
            </span>
          ))}
        </div>
      </section>

      {/* Contrast */}
      <section className="container-vaelo py-20 sm:py-28">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          The same impact. A fraction of the cost.
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          Why pay for studios, models, and crews when AI can deliver the same
          scroll-stopping visuals — faster?
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-paper p-8">
            <p className="text-sm font-medium uppercase tracking-wider text-muted">
              {contrast.traditional.label}
            </p>
            <ul className="mt-5 space-y-3 text-ink-soft">
              {contrast.traditional.points.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <span className="text-muted">✕</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-accent/30 bg-ink p-8 text-paper">
            <p className="text-sm font-medium uppercase tracking-wider text-paper/60">
              {contrast.vaelo.label}
            </p>
            <ul className="mt-5 space-y-3">
              {contrast.vaelo.points.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <span className="text-accent">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-line bg-paper-2">
        <div className="container-vaelo py-20 sm:py-28">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            What we do
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.slug}
                className="flex flex-col rounded-2xl border border-line bg-paper p-7"
              >
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.tagline}</p>
                <ul className="mt-5 space-y-2 text-sm text-ink-soft">
                  {s.includes.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/services"
              className="text-sm font-medium text-accent hover:underline"
            >
              Explore services →
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-vaelo py-20 sm:py-28">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          How it works
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n}>
              <p className="font-mono text-sm text-accent">{s.n}</p>
              <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-vaelo pb-24">
        <div className="rounded-3xl bg-ink px-8 py-16 text-center text-paper sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Want to see what we&apos;d make for your brand?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-paper/70">
            Tell us about your brand and we&apos;ll send a free AI sample — no
            commitment.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90"
          >
            Get a free AI sample
          </Link>
        </div>
      </section>
    </>
  );
}
