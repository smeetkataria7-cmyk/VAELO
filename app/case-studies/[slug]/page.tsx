import { notFound } from "next/navigation";
import Link from "next/link";

const caseStudiesData = {
  dvoc: {
    brand: "DVOC Institute",
    category: "Ed-tech",
    accent: "#c8331f",
    challenge:
      "DVOC Institute, a leading ed-tech platform offering digital marketing certifications and courses, was struggling to reach their target audience effectively. They had limited brand awareness in a crowded ed-tech space, an outdated web presence that didn't convert, no structured social media strategy, high customer acquisition costs, and difficulty reaching both students and working professionals simultaneously.",
    solution:
      "We positioned Vaelo as their full-service growth partner, combining brand & web strategy, AI-native content production, performance marketing, and funnel optimization. Rather than relying on expensive video production, we leveraged AI-native creation tools to produce 10+ variations of course-focused ad creatives weekly.",
    whatWeDelivered: {
      title: "What We Delivered",
      sections: [
        {
          heading: "Website Redesign",
          items: [
            "Rebuilt on Wix Studio with conversion-focused layout",
            "Clear course pathways and CTAs",
            "Optimized landing pages for each course vertical",
            "Integrated lead capture forms with email automation",
          ],
        },
        {
          heading: "Content & Creative System",
          items: [
            "Social Media Strategy — 4-post weekly calendar",
            "AI Video Production — 50+ promotional videos",
            "Ad Creatives — 200+ variations of course ads",
            "Email Sequences — Automated nurture campaigns",
          ],
        },
        {
          heading: "Paid Media Campaigns",
          items: [
            "Meta Ads — Campaigns for students (18-35) and professionals (25-45)",
            "Google Search — High-intent keyword campaigns",
            "Audience Segmentation — By course level and learner type",
          ],
        },
        {
          heading: "Lead Management",
          items: [
            "Custom lead qualification workflow",
            "CRM integration for automatic follow-ups",
            "Weekly performance reports and optimization",
          ],
        },
      ],
    },
    results: [
      { metric: "Total Leads", value: "1,200+", highlight: true },
      { metric: "Lead Quality Score", value: "8.2/10" },
      { metric: "Cost Per Lead", value: "₹145" },
      { metric: "Email Open Rate", value: "42%" },
      { metric: "Course Enrollment Rate", value: "28%" },
      { metric: "Social Media Growth", value: "+250%" },
      { metric: "Website Traffic", value: "3x increase" },
      { metric: "Conversion Rate", value: "8.5%" },
    ],
    insight:
      "By automating video creation and graphic design, we freed up budget for paid media spend. Instead of paying ₹50K per video, we generated dozens weekly for ₹2K/month. This meant more creative testing, faster iteration, and ultimately lower CAC.",
  },
  zerolys: {
    brand: "Zerolys",
    category: "Sustainable Packaging",
    accent: "#0e2a47",
    challenge:
      "Zerolys had a groundbreaking sustainable packaging product but no digital presence to tell their story. In a market where brand narrative is everything, they were invisible online. They couldn't reach sustainability-conscious brands and consumers despite having a superior product.",
    solution:
      "We recognized that Zerolys needed more than a website — they needed a complete digital identity. We built their website from scratch, produced a cinematic intro video that communicated their mission powerfully, and launched their social media presence to start building an audience of sustainability-conscious brands and consumers.",
    whatWeDelivered: {
      title: "What We Delivered",
      sections: [
        {
          heading: "Website Design & Development",
          items: [
            "Built from scratch on modern, fast platform",
            "Clean, minimalist design reflecting their sustainability values",
            "Product showcase with clear benefits and differentiation",
            "Integrated contact forms and product inquiry system",
          ],
        },
        {
          heading: "Cinematic Brand Video",
          items: [
            "Professional intro video telling Zerolys' story",
            "Showcased product benefits and environmental impact",
            "Emotional, compelling narrative",
            "Optimized for website hero and social sharing",
          ],
        },
        {
          heading: "Social Media Presence",
          items: [
            "Content strategy focused on sustainability education",
            "Weekly posts across Instagram & LinkedIn",
            "Behind-the-scenes content showing product innovation",
            "Community engagement with sustainability-focused brands",
          ],
        },
        {
          heading: "Lead Generation Setup",
          items: [
            "Strategic CTAs throughout website",
            "Contact form optimization",
            "Email nurture sequences for inquiries",
            "Analytics setup to track performance",
          ],
        },
      ],
    },
    results: [
      { metric: "Website Traffic Growth", value: "3.5X", highlight: true },
      { metric: "Average Engagement Rate", value: "4.8%" },
      { metric: "Contact Form Submissions", value: "+62%" },
    ],
    insight:
      "Zerolys didn't need flashy marketing — they needed clarity. Their product is the hero. We built a digital presence that got out of the way and let the product and mission shine. Emotional connection converts better than feature lists.",
  },
  simplicare: {
    brand: "Simplicare",
    category: "Healthcare E-commerce",
    accent: "#2d5a3d",
    challenge:
      "Simplicare had a solid healthcare product and a clean website, but was struggling to acquire customers profitably online. Their ad spend wasn't converting and their website wasn't built to close sales. They had marketing budget ready to invest but no strategy converting it into revenue.",
    solution:
      "We approached this as a full-funnel conversion problem. It wasn't just about running ads — it was about building a complete system where website and ads worked together. Website optimization for healthcare e-commerce conversion combined with targeted Meta ad campaigns focused on the three pillars that sell healthcare products: trust, clarity, and urgency.",
    whatWeDelivered: {
      title: "What We Delivered",
      sections: [
        {
          heading: "Shopify Website Rebuild",
          items: [
            "Redesigned for healthcare e-commerce conversion",
            "Trust signals prominently featured",
            "Clear product benefits in accessible language",
            "Streamlined checkout to reduce abandonment",
            "Product comparison pages and FAQ section",
          ],
        },
        {
          heading: "Targeted Meta Ad Campaigns",
          items: [
            "Audience Segmentation: new parents, healthcare-conscious caregivers",
            "Ad Creative Strategy: educational content, real testimonials",
            "Campaign Structure: awareness → consideration → conversion",
            "Retargeting campaigns for abandoned carts",
          ],
        },
        {
          heading: "Messaging Framework",
          items: [
            "Trust — Doctor recommendations, parent reviews, certifications",
            "Clarity — 'Here's exactly what this does and why you need it'",
            "Urgency — Seasonal health needs, limited stock, bundle offers",
          ],
        },
        {
          heading: "Performance Analytics",
          items: [
            "Daily campaign monitoring and optimization",
            "A/B testing on all ad creatives",
            "Conversion rate optimization on website",
            "Customer acquisition cost tracking",
          ],
        },
      ],
    },
    results: [
      { metric: "Return on Ad Spend (ROAS)", value: "2.9X", highlight: true },
      { metric: "Revenue (90 days)", value: "$10,000" },
      { metric: "Cost Per Acquisition Reduction", value: "-38%" },
      { metric: "Website Conversion Rate", value: "3.2%" },
      { metric: "Average Order Value Increase", value: "+22%" },
      { metric: "Customer Repeat Rate", value: "18%" },
    ],
    insight:
      "Simplicare wasn't competing on price — they were competing on trust. Every element focused on answering one question: 'Can I trust this product with my child's health?' When everything aligns, you don't need to spend more — you just get smarter returns.",
  },
  "marigold-miraya": {
    brand: "Marigold Miraya",
    category: "Real Estate",
    accent: "#c9871a",
    challenge:
      "Marigold Miraya had quality properties but was struggling with modern real estate marketing. They had limited social media presence, inconsistent lead generation, expensive customer acquisition, no digital property showcase, and were competing in a crowded market without a clear digital strategy.",
    solution:
      "We built a full-stack real estate marketing system combining social proof, targeted advertising, and lead capture. The strategy combined social media authority building, Meta ads at every buyer journey stage, conversion-focused website development, AI-powered content production, and systematic lead management.",
    whatWeDelivered: {
      title: "What We Delivered",
      sections: [
        {
          heading: "Social Media Strategy & Management",
          items: [
            "Content Pillars: property showcases, testimonials, market insights, project updates",
            "Platform Strategy: Instagram for visuals, Facebook for reach, LinkedIn for B2B",
            "Posting Frequency: 4-5x weekly with consistent brand messaging",
          ],
        },
        {
          heading: "Meta Ads Campaigns",
          items: [
            "Campaign Structure: awareness → consideration → conversion → retargeting",
            "Audience Targeting: high-income individuals, real estate enthusiasts, location-based",
            "Ad Creative: property photos, 360° tours, animated walkthroughs, testimonials",
          ],
        },
        {
          heading: "Website Development",
          items: [
            "Built from scratch for real estate e-commerce",
            "Project showcase with detailed information and pricing",
            "Interactive property maps and location guides",
            "Virtual tour integration and investment calculator",
          ],
        },
        {
          heading: "AI-Powered Content Production",
          items: [
            "High-quality property videos",
            "360° virtual property tours",
            "Animated floor plan walkthroughs",
            "Market analysis infographics",
          ],
        },
      ],
    },
    results: [
      { metric: "Total Leads Generated", value: "170+", highlight: true },
      { metric: "Lead Quality Score", value: "8.1/10" },
      { metric: "Cost Per Lead", value: "₹250-300" },
      { metric: "Lead-to-Viewing Rate", value: "45%" },
      { metric: "Website Traffic", value: "12,000+/month" },
      { metric: "Social Media Growth", value: "8,500+" },
      { metric: "Average Engagement Rate", value: "5.2%" },
    ],
    insight:
      "Real estate buyers research extensively. We needed to be visible at every stage. By combining consistent social media content with targeted ads and a digital showroom website, we positioned Marigold Miraya as the knowledgeable, trustworthy choice.",
  },
  tribalzone: {
    brand: "Tribalzone",
    category: "Streetwear E-commerce",
    accent: "#1a1a2e",
    challenge:
      "Tribalzone had built a strong offline presence and loyal community through events and retail, but was missing out on massive online sales opportunities. They had no e-commerce platform, zero social media presence, limited digital reach, untapped online revenue potential, and no paid advertising system.",
    solution:
      "We built a complete e-commerce and social media system to bring Tribalzone online and enable scalable revenue. The approach focused on moving fast, testing creatives, and optimizing based on what sells. We combined Shopify e-commerce, social media strategy, Meta ads, content production, and performance optimization.",
    whatWeDelivered: {
      title: "What We Delivered",
      sections: [
        {
          heading: "Shopify E-Commerce Store",
          items: [
            "Built from scratch with tribal aesthetic",
            "Product showcase with lifestyle photography",
            "Mobile-optimized checkout (70% of traffic)",
            "Inventory management and email capture",
            "Product recommendations and customer reviews",
          ],
        },
        {
          heading: "Social Media Strategy",
          items: [
            "Instagram: product posts, lifestyle content, behind-the-scenes",
            "TikTok: trend-jacking with brand twist, customer testimonials",
            "Content Calendar: 5-6 posts weekly",
            "User-Generated Content: reposting customer content",
          ],
        },
        {
          heading: "Meta Ads Campaigns",
          items: [
            "Campaign Structure: awareness → consideration → conversion → retargeting",
            "Audience Targeting: streetwear enthusiasts, tribal culture interest, age 18-35",
            "Creative Testing: product videos, lifestyle photos, testimonials, limited drops",
          ],
        },
        {
          heading: "Shopify Optimization",
          items: [
            "Product page optimization for conversions",
            "Bundle offers and upsells",
            "Post-purchase email sequences",
            "Repeat customer incentives",
          ],
        },
      ],
    },
    results: [
      { metric: "Revenue Generated", value: "₹100,000", highlight: true },
      { metric: "Total Orders", value: "150+" },
      { metric: "Average Order Value", value: "₹650" },
      { metric: "Website Traffic", value: "8,000+ visitors" },
      { metric: "Conversion Rate", value: "1.9%" },
      { metric: "ROAS", value: "4X" },
    ],
    insight:
      "Tribalzone's strength was always community and tribe mentality. Online, we amplified that by showcasing customer content, building FOMO around limited drops, and creating an insider community feel. Every dollar spent on ads returned ₹4 because the model was fundamentally sound.",
  },
};

export async function generateStaticParams() {
  return Object.keys(caseStudiesData).map((slug) => ({ slug }));
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const study = caseStudiesData[params.slug as keyof typeof caseStudiesData];

  if (!study) {
    notFound();
  }

  return (
    <>
      {/* Back button & Header */}
      <section className="container-vaelo pt-20 pb-10 sm:pt-28">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          ← Back to portfolio
        </Link>

        <div className="mt-10 mb-16">
          <p className="eyebrow" style={{ color: study.accent }}>
            Case Study
          </p>
          <h1 className="font-display text-5xl sm:text-7xl mt-4">{study.brand}</h1>
          <p className="text-lg text-muted mt-4">{study.category}</p>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="container-vaelo pb-20 border-t border-line pt-20">
        <div className="max-w-4xl">
          <h2 className="font-display text-4xl sm:text-5xl mb-8" style={{ color: study.accent }}>
            The Challenge
          </h2>
          <p className="text-xl leading-relaxed text-ink-soft">
            {study.challenge}
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="container-vaelo pb-20 border-t border-line pt-20">
        <div className="max-w-4xl">
          <h2 className="font-display text-4xl sm:text-5xl mb-8" style={{ color: study.accent }}>
            Our Solution
          </h2>
          <p className="text-xl leading-relaxed text-ink-soft">
            {study.solution}
          </p>
        </div>
      </section>

      {/* What We Delivered */}
      <section className="container-vaelo pb-20 border-t border-line pt-20">
        <h2 className="font-display text-4xl sm:text-5xl mb-16" style={{ color: study.accent }}>
          {study.whatWeDelivered.title}
        </h2>

        <div className="grid gap-16 max-w-5xl">
          {study.whatWeDelivered.sections.map((section, i) => (
            <div key={i}>
              <h3 className="font-display text-2xl mb-6">{section.heading}</h3>
              <ul className="space-y-3">
                {section.items.map((item, j) => (
                  <li key={j} className="flex gap-4 text-lg text-ink-soft">
                    <span
                      className="mt-1 block w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: study.accent }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="container-vaelo pb-20 border-t border-line pt-20">
        <h2 className="font-display text-4xl sm:text-5xl mb-16" style={{ color: study.accent }}>
          The Results
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
          {study.results.map((result, i) => (
            <div
              key={i}
              className="rounded-xl border p-8"
              style={{
                borderColor: `${study.accent}30`,
                background: `${study.accent}08`,
              }}
            >
              <p
                className="font-display text-4xl sm:text-5xl"
                style={{ color: study.accent }}
              >
                {result.value}
              </p>
              <p className="text-sm font-medium mt-4">{result.metric}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Insight */}
      <section className="container-vaelo pb-24 border-t border-line pt-20">
        <div
          className="rounded-2xl border p-12 sm:p-16 max-w-4xl"
          style={{
            borderColor: `${study.accent}40`,
            background: `${study.accent}08`,
          }}
        >
          <p className="eyebrow" style={{ color: study.accent }}>
            Key Insight
          </p>
          <p className="font-display text-3xl sm:text-4xl mt-6 leading-relaxed">
            {study.insight}
          </p>
        </div>
      </section>
    </>
  );
}
