import { notFound } from "next/navigation";
import Link from "next/link";
import { caseStudies } from "@/lib/content";
import { readMedia } from "@/lib/works-media";

const caseStudiesData: Record<string, any> = {
  dvoc: {
    challenge: "DVOC Institute was struggling to reach their target audience effectively. They had limited brand awareness in a crowded ed-tech space, an outdated web presence that didn't convert, no structured social media strategy, high customer acquisition costs, and difficulty reaching both students and working professionals.",
    solution: "We positioned Vaelo as their full-service growth partner, combining brand & web strategy, AI-native content production, and performance marketing. Rather than relying on expensive video production, we leveraged AI-native creation tools to produce 10+ variations of course-focused ad creatives weekly.",
    results: [
      { metric: "Total Leads", value: "1,200+", highlight: true },
      { metric: "Cost Per Lead", value: "₹145" },
      { metric: "Conversion Rate", value: "8.5%" },
      { metric: "Social Media Growth", value: "+250%" },
      { metric: "Website Traffic", value: "3x increase" },
    ],
  },
  zerolys: {
    challenge: "Zerolys had a groundbreaking sustainable packaging product but no digital presence to tell their story. In a market where brand narrative is everything, they were invisible online. They couldn't reach sustainability-conscious brands and consumers despite having a superior product.",
    solution: "We built their website from scratch, produced a cinematic intro video that communicated their mission powerfully, and launched their social media presence to start building an audience of sustainability-conscious brands and consumers.",
    results: [
      { metric: "Traffic Growth", value: "3.5X", highlight: true },
      { metric: "Engagement Rate", value: "4.8%" },
      { metric: "Form Submissions", value: "+62%" },
    ],
  },
  simplicare: {
    challenge: "Simplicare had a solid healthcare product and a clean website, but was struggling to acquire customers profitably online. Their ad spend wasn't converting and their website wasn't built to close sales.",
    solution: "We approached this as a full-funnel conversion problem. Website optimization for healthcare e-commerce conversion combined with targeted Meta ad campaigns focused on trust, clarity, and urgency.",
    results: [
      { metric: "Return on Ad Spend", value: "2.9X", highlight: true },
      { metric: "Revenue (90 days)", value: "$10K" },
      { metric: "Cost Per Acquisition", value: "-38%" },
      { metric: "Website Conversion Rate", value: "3.2%" },
      { metric: "Average Order Value", value: "+22%" },
    ],
  },
  "marigold-miraya": {
    challenge: "Marigold Miraya had quality properties but was struggling with modern real estate marketing. They had limited social media presence, inconsistent lead generation, expensive customer acquisition, and no digital property showcase.",
    solution: "We built a full-stack real estate marketing system combining social media authority building, Meta ads at every buyer journey stage, conversion-focused website development, AI-powered content production, and systematic lead management.",
    results: [
      { metric: "Leads Generated", value: "170+", highlight: true },
      { metric: "Social Followers", value: "8,500+" },
      { metric: "Site Traffic", value: "12K/mo" },
      { metric: "Lead Quality Score", value: "8.1/10" },
      { metric: "Lead-to-Viewing Rate", value: "45%" },
    ],
  },
  tribalzone: {
    challenge: "Tribalzone had built a strong offline presence and loyal community, but was missing out on massive online sales opportunities. They had no e-commerce platform, zero social media presence, limited digital reach, and no paid advertising system.",
    solution: "We built a complete e-commerce and social media system to bring Tribalzone online and enable scalable revenue. Shopify e-commerce, social media strategy, Meta ads, content production, and performance optimization.",
    results: [
      { metric: "Revenue Generated", value: "₹100K", highlight: true },
      { metric: "Total Orders", value: "150+" },
      { metric: "ROAS", value: "4X" },
      { metric: "Website Traffic", value: "8,000+ visitors" },
      { metric: "Conversion Rate", value: "1.9%" },
    ],
  },
};

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = caseStudies.find((c) => c.slug === slug);
  if (!brand) notFound();

  const media = readMedia(slug);
  const caseStudy = caseStudiesData[slug];

  return (
    <>
      {/* Back button & Header */}
      <section className="container-vaelo pt-20 pb-10 sm:pt-28">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          ← Return to portfolio
        </Link>

        <div className="mt-10 mb-16">
          <p className="eyebrow">{brand.categories[0]}</p>
          <h1 className="font-display text-5xl sm:text-7xl mt-4">{brand.brand}</h1>
        </div>
      </section>

      {/* Case Study Section */}
      {caseStudy && (
        <>
          {/* Challenge + Solution — side by side cards */}
          <section className="container-vaelo border-t border-line py-20">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-line p-8 sm:p-10">
                <h2 className="font-display text-2xl sm:text-3xl mb-5">The Challenge</h2>
                <p className="leading-relaxed text-ink-soft">{caseStudy.challenge}</p>
              </div>
              <div
                className="rounded-2xl border p-8 sm:p-10"
                style={{ borderColor: `${brand.accent}30`, backgroundColor: `${brand.accent}08` }}
              >
                <h2 className="font-display text-2xl sm:text-3xl mb-5">Our Solution</h2>
                <p className="leading-relaxed text-ink-soft">{caseStudy.solution}</p>
              </div>
            </div>
          </section>

          {/* Results */}
          <section className="container-vaelo border-t border-line py-20">
            <h2 className="font-display text-4xl sm:text-5xl mb-16">The Results</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
              {caseStudy.results.map((result: any, i: number) => (
                <div
                  key={i}
                  className="rounded-xl border border-line p-8"
                  style={{
                    borderColor: `${brand.accent}30`,
                    backgroundColor: `${brand.accent}08`,
                  }}
                >
                  <p
                    className="font-display text-4xl sm:text-5xl"
                    style={{ color: brand.accent }}
                  >
                    {result.value}
                  </p>
                  <p className="text-sm font-medium mt-4">{result.metric}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Creatives Section */}
      <section className="container-vaelo pb-24 border-t border-line pt-20">
        <div className="mb-10">
          <p className="eyebrow">Creative Work</p>
          <h2 className="font-display text-4xl mt-4">Videos & Assets</h2>
        </div>

        {media.length === 0 ? (
          <p className="text-muted">No media yet — drop videos or images in <code>/public/images/work/{slug}/</code></p>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
            {media.map((m) => (
              <div key={m.src} className="overflow-hidden rounded-2xl bg-paper-2 mb-5 break-inside-avoid">
                {m.type === "video" ? (
                  <video
                    src={m.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    className="w-full object-cover"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.src} alt={brand.brand} loading="lazy" className="w-full object-cover" />
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
