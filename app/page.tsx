import Link from "next/link";
import { hero, services, caseStudies, steps, gallery } from "@/lib/content";
import { Media } from "@/components/site/media";
import { Reveal } from "@/components/site/reveal";
import { Marquee } from "@/components/site/marquee";
import { ImageMarquee } from "@/components/site/image-marquee";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="container-vaelo pt-20 pb-20 sm:pt-28">
        <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rise">
            <p className="eyebrow">AI-first creative studio</p>
            <h1 className="font-display mt-6 text-5xl leading-[1.0] sm:text-[5.5rem]">
              Photoshoot-quality
              <br />
              visuals, without the
              <br />
              <span className="relative text-accent">
                photoshoot.
                <span className="absolute -bottom-2 left-0 h-px w-full bg-accent/40" />
              </span>
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

      {/* Keyword ticker */}
      <Marquee
        items={["AI Photoshoots", "Instagram", "Paid Ads", "Brand Visuals", "Culture Remix"]}
      />

      {/* Trust */}
      <section className="container-vaelo flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
        <span className="eyebrow">Trusted by brands across India</span>
        <div className="flex flex-wrap gap-x-10 gap-y-2">
          {caseStudies.map((c) => (
            <span key={c.slug} className="font-display text-base text-ink-soft">
              {c.brand}
            </span>
          ))}
        </div>
      </section>

      {/* Contrast */}
      <section className="border-t border-line">
        <div className="container-vaelo py-24 sm:py-32">
          <Reveal>
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
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-line">
        <div className="container-vaelo py-24 sm:py-32">
          <Reveal>
            <div className="flex items-end justify-between">
              <h2 className="font-display text-4xl leading-tight sm:text-5xl">What we do</h2>
              <Link href="/services" className="link-underline hidden text-sm font-medium sm:inline">
                All services →
              </Link>
            </div>
          </Reveal>
          <div className="mt-14">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 80}>
                <div className="grid gap-6 border-t border-line py-10 transition-colors hover:bg-paper-2/40 sm:grid-cols-[auto_1fr_1.2fr] sm:gap-12">
                  <span className="font-display text-2xl text-accent">0{i + 1}</span>
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="border-t border-line">
        <div className="container-vaelo py-28 sm:py-40">
          <Reveal>
            <p className="font-display text-4xl leading-[1.1] sm:text-6xl">
              We make brands
              <br />
              <span className="text-accent">impossible to scroll past.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Selected work — auto-scrolling wall */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className="container-vaelo">
          <Reveal>
            <div className="flex items-end justify-between">
              <div>
                <p className="eyebrow">Selected work</p>
                <h2 className="font-display mt-4 text-4xl leading-tight sm:text-5xl">
                  Made with AI. Built for the scroll.
                </h2>
              </div>
              <Link href="/work" className="link-underline hidden text-sm font-medium sm:inline">
                View all →
              </Link>
            </div>
          </Reveal>
        </div>
        <div className="mt-14">
          <ImageMarquee images={gallery} />
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-line">
        <div className="container-vaelo py-24 sm:py-32">
          <Reveal>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">How it works</h2>
          </Reveal>
          <div className="mt-14 grid gap-12 sm:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="border-t border-ink pt-6">
                  <p className="font-display text-3xl text-accent">{s.n}</p>
                  <h3 className="mt-4 text-lg font-medium">{s.title}</h3>
                  <p className="mt-2 text-ink-soft">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
