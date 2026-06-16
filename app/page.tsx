import Link from "next/link";
import Image from "next/image";
import { services, caseStudies, steps, gallery } from "@/lib/content";
import { ImageWall } from "@/components/site/image-wall";
import { Reveal } from "@/components/site/reveal";
import { Marquee } from "@/components/site/marquee";
import { ImageMarquee } from "@/components/site/image-marquee";
import { Stats } from "@/components/site/stats";
import { Faq } from "@/components/site/faq";
import { LeadForm } from "@/components/site/lead-form";

// TODO: replace with real client testimonials.
const testimonials = [
  {
    quote:
      "Our feed has never looked this good. Visuals in days that would've cost us a fortune to shoot.",
    name: "Founder",
    brand: "Marigold Miraaya",
  },
  {
    quote:
      "VAELO handles everything — the creatives, the posting, the ads. We just watch the numbers grow.",
    name: "Marketing Lead",
    brand: "Fashion brand",
  },
  {
    quote:
      "The quality genuinely looks like a real photoshoot. Our customers can't tell the difference.",
    name: "Owner",
    brand: "F&B brand",
  },
];

const serviceThumb = [gallery[1], gallery[3], gallery[5]];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="container-vaelo pt-16 pb-16 sm:pt-24">
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
                href="#get-started"
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

          <div className="relative rise">
            <div
              className="absolute -inset-8 -z-10 rounded-[2rem] bg-accent/20 blur-3xl"
              aria-hidden
            />
            <ImageWall images={gallery} />
          </div>
        </div>
      </section>

      {/* Keyword ticker */}
      <Marquee items={["AI Photoshoots", "Instagram", "Paid Ads", "Brand Visuals", "Culture Remix"]} />

      {/* Trust + stats */}
      <section className="container-vaelo py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="eyebrow">Trusted by brands across India</span>
          <div className="flex flex-wrap gap-x-10 gap-y-2">
            {caseStudies.map((c) => (
              <span key={c.slug} className="font-display text-base text-ink-soft">
                {c.brand}
              </span>
            ))}
          </div>
        </div>
        <Stats />
      </section>

      {/* Contrast */}
      <section className="border-t border-line">
        <div className="container-vaelo py-16 sm:py-24">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="eyebrow">Why Vaelo</p>
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
                  <p className="eyebrow text-paper/50">The Vaelo way</p>
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

      {/* Services — denser, with thumbnails */}
      <section className="border-t border-line">
        <div className="container-vaelo py-16 sm:py-24">
          <Reveal>
            <div className="flex items-end justify-between">
              <h2 className="font-display text-4xl leading-tight sm:text-5xl">What we do</h2>
              <Link href="/services" className="link-underline hidden text-sm font-medium sm:inline">
                All services →
              </Link>
            </div>
          </Reveal>
          <div className="mt-10">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 70}>
                <div className="grid items-center gap-6 border-t border-line py-8 sm:grid-cols-[110px_1.2fr_1fr] sm:gap-10">
                  <div className="relative aspect-[4/5] w-[110px] overflow-hidden rounded-lg bg-paper-2">
                    <Image src={serviceThumb[i]} alt={s.title} fill className="object-cover" sizes="110px" />
                  </div>
                  <div>
                    <span className="font-display text-sm text-accent">0{i + 1}</span>
                    <h3 className="font-display mt-1 text-2xl">{s.title}</h3>
                    <p className="mt-2 text-ink-soft">{s.tagline}</p>
                  </div>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {s.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-2 text-sm text-ink-soft">
                        <span className="text-accent">+</span>
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bento — why Vaelo */}
      <section className="border-t border-line">
        <div className="container-vaelo py-16 sm:py-24">
          <Reveal>
            <p className="eyebrow">Why brands choose us</p>
            <h2 className="font-display mt-4 text-4xl leading-tight sm:text-5xl">
              Everything in one studio.
            </h2>
          </Reveal>
          <Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[200px]">
              <div className="relative overflow-hidden rounded-xl bg-paper-2 sm:row-span-2">
                <Image src={gallery[0]} alt="Vaelo creative" fill className="object-cover" sizes="(max-width:1024px) 50vw, 33vw" />
              </div>
              <div className="flex flex-col justify-between rounded-xl bg-accent p-7 text-accent-ink">
                <span className="text-3xl">✦</span>
                <p className="font-display text-2xl leading-snug">A fraction of the cost of a real shoot.</p>
              </div>
              <div className="relative overflow-hidden rounded-xl bg-paper-2">
                <Image src={gallery[5]} alt="Vaelo creative" fill className="object-cover" sizes="33vw" />
              </div>
              <div className="glass flex flex-col justify-between rounded-xl p-7">
                <span className="eyebrow">End to end</span>
                <p className="font-display text-2xl leading-snug">We shoot, post, and run your ads.</p>
              </div>
              <div className="relative overflow-hidden rounded-xl bg-paper-2">
                <Image src={gallery[1]} alt="Vaelo creative" fill className="object-cover" sizes="33vw" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-line">
        <div className="container-vaelo py-16 sm:py-24">
          <Reveal>
            <p className="eyebrow">What clients say</p>
            <h2 className="font-display mt-4 text-4xl leading-tight sm:text-5xl">
              Brands that grew with us.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.brand} delay={i * 80}>
                <figure className="glass flex h-full flex-col justify-between rounded-xl p-7">
                  <span className="font-display text-4xl text-accent">&ldquo;</span>
                  <blockquote className="mt-2 text-lg leading-relaxed text-ink">{t.quote}</blockquote>
                  <figcaption className="mt-6 border-t border-line pt-4 text-sm">
                    <span className="font-medium">{t.name}</span>
                    <span className="text-muted"> · {t.brand}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Selected work — auto-scrolling wall */}
      <section className="border-t border-line py-16 sm:py-24">
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
        <div className="mt-10">
          <ImageMarquee images={gallery} />
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-line">
        <div className="container-vaelo py-16 sm:py-24">
          <Reveal>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">How it works</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <div className="glass h-full rounded-xl p-7">
                  <p className="font-display text-3xl text-accent">{s.n}</p>
                  <h3 className="mt-4 text-lg font-medium">{s.title}</h3>
                  <p className="mt-2 text-ink-soft">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line">
        <div className="container-vaelo py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <Reveal>
              <p className="eyebrow">FAQ</p>
              <h2 className="font-display mt-4 text-4xl leading-tight sm:text-5xl">
                Good questions,
                <br />
                answered.
              </h2>
            </Reveal>
            <Reveal>
              <Faq />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Get started — lead form */}
      <section id="get-started" className="scroll-mt-24 border-t border-line">
        <div className="container-vaelo py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <p className="eyebrow">Get started</p>
              <h2 className="font-display mt-4 text-4xl leading-tight sm:text-5xl">
                Let&apos;s see what
                <br />
                we&apos;d make for you.
              </h2>
              <p className="mt-6 max-w-md text-lg text-ink-soft">
                Tell us about your brand and we&apos;ll send a free AI sample — so
                you can see the quality before spending a rupee.
              </p>
              <ul className="mt-10 space-y-4">
                {[
                  "A real AI visual made for your brand",
                  "A quick read on how we'd grow your Instagram",
                  "No pressure, no obligation",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 border-t border-line pt-4 text-ink-soft">
                    <span className="text-accent">+</span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <div className="glass rounded-2xl p-6 sm:p-8">
                <LeadForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
