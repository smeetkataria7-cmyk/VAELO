import Link from "next/link";
import { services, caseStudies, steps, gallery, about, brand } from "@/lib/content";
import { Media } from "@/components/site/media";
import { ImageWall } from "@/components/site/image-wall";
import { ServiceIcon } from "@/components/site/icons";
import { Reveal } from "@/components/site/reveal";
import { Marquee } from "@/components/site/marquee";
import { ImageMarquee } from "@/components/site/image-marquee";
import { Stats } from "@/components/site/stats";
import { Faq } from "@/components/site/faq";
import { LeadForm } from "@/components/site/lead-form";

// TODO: replace with real client testimonials.
const testimonials = [
  { quote: "They don't just run ads — they actually built our brand. Every asset has a job.", name: "Founder", brand: "Zerolys" },
  { quote: "Sharp strategy, fast creative, and ad spend that finally works harder. A real growth partner.", name: "Marketing Lead", brand: "Twenty2" },
  { quote: "The AI-powered production gives us more creative, faster, at a fraction of the cost.", name: "Owner", brand: "D2C brand" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="container-vaelo pt-16 pb-16 sm:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rise">
            <p className="eyebrow">Mumbai growth agency</p>
            <h1 className="font-display mt-6 text-5xl leading-[1.0] sm:text-[5.25rem]">
              Where strategy
              <br />
              meets <span className="text-accent">story.</span>
            </h1>
            <p className="mt-7 max-w-md text-xl text-ink">
              We don&apos;t just run ads — we build brands.
            </p>
            <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
              Sharp creative strategy meets data-driven performance marketing, so
              every piece of content has a job and every rupee works harder.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-8">
              <Link
                href="#get-started"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-all hover:gap-3"
              >
                Let&apos;s talk growth
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </Link>
              <Link href="/work" className="link-underline text-sm font-medium">
                See our work
              </Link>
            </div>
          </div>

          <div className="relative rise">
            <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-accent/20 blur-3xl" aria-hidden />
            <ImageWall images={gallery} />
          </div>
        </div>
      </section>

      {/* Keyword ticker */}
      <Marquee items={["Performance Marketing", "Creative Strategy", "Content", "Web", "Social", "AI Production"]} />

      {/* Trust + stats */}
      <section className="container-vaelo py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="eyebrow">Brands we&apos;ve grown</span>
          <div className="flex flex-wrap gap-x-10 gap-y-2">
            {caseStudies.map((c) => (
              <span key={c.slug} className="font-display text-base text-ink-soft">{c.brand}</span>
            ))}
          </div>
        </div>
        <Stats />
      </section>

      {/* About */}
      <section className="border-t border-line">
        <div className="container-vaelo py-16 sm:py-24">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[0.4fr_1.6fr]">
              <p className="eyebrow pt-2">Who we are</p>
              <p className="font-display text-3xl leading-[1.25] sm:text-[2.6rem]">
                {about}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services — 6 icon cards */}
      <section className="border-t border-line">
        <div className="container-vaelo py-16 sm:py-24">
          <Reveal>
            <div className="flex items-end justify-between">
              <div>
                <p className="eyebrow">What we do</p>
                <h2 className="font-display mt-4 text-4xl leading-tight sm:text-5xl">Everything growth needs.</h2>
              </div>
              <Link href="/services" className="link-underline hidden text-sm font-medium sm:inline">All services →</Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 70}>
                <div className="glass group h-full rounded-xl p-7 transition-colors hover:border-accent/40">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line text-accent transition-colors group-hover:border-accent/50">
                    <ServiceIcon name={s.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="font-display mt-5 text-xl">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="border-t border-line">
        <div className="container-vaelo py-16 sm:py-24">
          <Reveal>
            <div className="flex items-end justify-between">
              <div>
                <p className="eyebrow">Selected work</p>
                <h2 className="font-display mt-4 text-4xl leading-tight sm:text-5xl">Brands we&apos;ve built.</h2>
              </div>
              <Link href="/work" className="link-underline hidden text-sm font-medium sm:inline">View all →</Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {caseStudies.map((c, i) => (
              <Reveal key={c.slug} delay={i * 90}>
                <Link href="/work" className="group block">
                  <Media src={c.image || undefined} alt={`${c.brand} — ${c.industry}`} label={c.brand} className="aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-[1.01]" />
                  <div className="mt-5 flex items-baseline justify-between">
                    <h3 className="font-display text-2xl">{c.brand}</h3>
                    <span className="eyebrow">{c.industry}</span>
                  </div>
                  <p className="mt-2 text-ink-soft">{c.summary}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Creative wall */}
      <section className="border-t border-line py-16 sm:py-24">
        <div className="container-vaelo">
          <Reveal>
            <p className="eyebrow">AI-powered production</p>
            <h2 className="font-display mt-4 text-4xl leading-tight sm:text-5xl">Made with AI. Built for the scroll.</h2>
          </Reveal>
        </div>
        <div className="mt-10">
          <ImageMarquee images={gallery} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-line">
        <div className="container-vaelo py-16 sm:py-24">
          <Reveal>
            <p className="eyebrow">What clients say</p>
            <h2 className="font-display mt-4 text-4xl leading-tight sm:text-5xl">Growth partners, not vendors.</h2>
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

      {/* How it works */}
      <section className="border-t border-line">
        <div className="container-vaelo py-16 sm:py-24">
          <Reveal>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">How we work</h2>
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
              <h2 className="font-display mt-4 text-4xl leading-tight sm:text-5xl">Good questions,<br />answered.</h2>
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
              <p className="eyebrow">Let&apos;s talk growth</p>
              <h2 className="font-display mt-4 text-4xl leading-tight sm:text-5xl">Tell us about<br />your brand.</h2>
              <p className="mt-6 max-w-md text-lg text-ink-soft">
                Share where you want to grow and we&apos;ll come back with how we&apos;d
                get you there — no pressure, no obligation.
              </p>
              <div className="mt-10 space-y-3 text-sm">
                <a href={`mailto:${brand.email}`} className="block text-ink-soft hover:text-ink">{brand.email}</a>
                <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="block text-ink-soft hover:text-ink">{brand.phone}</a>
                <p className="text-muted">{brand.location}</p>
              </div>
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
