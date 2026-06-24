"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface CaseStudy {
  slug: string;
  brand: string;
  problem: string;
  solution: string;
  metric1: { label: string; value: string };
  metric2: { label: string; value: string };
  metric3: { label: string; value: string };
  industry: string;
  accent: string;
}

const caseStudiesData: CaseStudy[] = [
  {
    slug: "dvoc",
    brand: "DVOC Institute",
    problem: "Ed-tech platform invisible online with no lead generation system despite quality courses",
    solution: "Built digital presence with AI-powered content, targeted ads, and conversion funnel",
    metric1: { label: "Leads Generated", value: "1,200+" },
    metric2: { label: "Cost Per Lead", value: "₹145" },
    metric3: { label: "Conversion Rate", value: "8.5%" },
    industry: "Ed-tech",
    accent: "#c8331f",
  },
  {
    slug: "zerolys",
    brand: "Zerolys",
    problem: "Sustainable packaging innovation with zero digital presence to tell their story",
    solution: "Built website, cinematic brand video, and social media presence from scratch",
    metric1: { label: "Traffic Growth", value: "3.5X" },
    metric2: { label: "Engagement Rate", value: "4.8%" },
    metric3: { label: "Form Submissions", value: "+62%" },
    industry: "Sustainability",
    accent: "#0e2a47",
  },
  {
    slug: "simplicare",
    brand: "Simplicare",
    problem: "Healthcare product with beautiful website but zero profitable customer acquisition",
    solution: "Rebuilt for conversion + targeted Meta ads focused on trust, clarity, urgency",
    metric1: { label: "ROAS", value: "2.9X" },
    metric2: { label: "Revenue (90d)", value: "$10K" },
    metric3: { label: "CAC Reduction", value: "-38%" },
    industry: "Healthcare E-commerce",
    accent: "#2d5a3d",
  },
  {
    slug: "marigold-miraya",
    brand: "Marigold Miraya",
    problem: "Premium real estate with no social presence or systematic lead generation",
    solution: "Full-stack system: social strategy, Meta ads, conversion website, AI content",
    metric1: { label: "Leads Generated", value: "170+" },
    metric2: { label: "Social Followers", value: "8,500+" },
    metric3: { label: "Site Traffic", value: "12K/mo" },
    industry: "Real Estate",
    accent: "#c9871a",
  },
  {
    slug: "tribalzone",
    brand: "Tribalzone",
    problem: "Offline streetwear brand with loyal community but zero e-commerce and no online sales",
    solution: "Built Shopify store, social media, Meta ads, and e-commerce system to drive online revenue",
    metric1: { label: "Revenue Generated", value: "₹1L" },
    metric2: { label: "Orders", value: "150+" },
    metric3: { label: "ROAS", value: "4X" },
    industry: "Streetwear",
    accent: "#1a1a2e",
  },
];

function CaseStudyCard({ study }: { study: CaseStudy }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ metric1: 0, metric2: 0, metric3: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Animate metric 1
    const m1 = study.metric1.value.replace(/[^0-9.]/g, "");
    const m1Target = parseFloat(m1);
    let m1Current = 0;
    const m1Interval = setInterval(() => {
      m1Current += m1Target / 30;
      if (m1Current >= m1Target) {
        m1Current = m1Target;
        clearInterval(m1Interval);
      }
      setCounts((prev) => ({ ...prev, metric1: m1Current }));
    }, 30);

    return () => clearInterval(m1Interval);
  }, [isVisible, study]);

  const formatMetric = (index: number, value: number) => {
    if (index === 0) {
      if (study.metric1.value.includes("+")) return `+${Math.round(value)}`;
      if (study.metric1.value.includes("X")) return `${value.toFixed(1)}X`;
      return Math.round(value).toLocaleString();
    }
    return value;
  };

  return (
    <Link
      href={`/case-studies/${study.slug}`}
      ref={cardRef as any}
      className="block h-[500px] group perspective hover:opacity-90 transition-opacity"
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front - Problem */}
        <div
          className="absolute w-full h-full rounded-2xl border border-line p-8 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            background: `linear-gradient(135deg, ${study.accent}15 0%, ${study.accent}05 100%)`,
          }}
        >
          <div>
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="eyebrow text-accent">Problem</p>
                <h3 className="font-display text-2xl mt-2">{study.brand}</h3>
              </div>
              <span className="text-xs px-3 py-1 rounded-full border border-ink/20 text-muted">
                {study.industry}
              </span>
            </div>
            <p className="text-ink-soft leading-relaxed">{study.problem}</p>
          </div>
          <div className="text-xs text-muted">Click to see solution →</div>
        </div>

        {/* Back - Solution */}
        <div
          className="absolute w-full h-full rounded-2xl border border-line p-8 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(135deg, ${study.accent}20 0%, ${study.accent}10 100%)`,
          }}
        >
          <div>
            <p className="eyebrow text-accent">Solution</p>
            <p className="text-ink-soft leading-relaxed mt-4">{study.solution}</p>
          </div>
          <div className="text-xs text-muted">Click to see results →</div>
        </div>
      </div>
    </div>
  );
}

function MetricsCard({ study }: { study: CaseStudy }) {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ m1: "0", m2: "0", m3: "0" });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    // Animated counter logic
    setTimeout(() => {
      setCounts({
        m1: study.metric1.value,
        m2: study.metric2.value,
        m3: study.metric3.value,
      });
    }, 100);
  }, [isVisible, study]);

  return (
    <div ref={ref} className="grid grid-cols-3 gap-4">
      {[
        { label: study.metric1.label, value: counts.m1 },
        { label: study.metric2.label, value: counts.m2 },
        { label: study.metric3.label, value: counts.m3 },
      ].map((metric, i) => (
        <div
          key={i}
          className="rounded-xl border border-line p-6 text-center"
          style={{
            background: `${study.accent}08`,
            borderColor: `${study.accent}20`,
          }}
        >
          <p
            className="font-display text-3xl sm:text-4xl"
            style={{ color: study.accent }}
          >
            {metric.value}
          </p>
          <p className="text-xs text-muted mt-3 uppercase tracking-wide">
            {metric.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export function CaseStudies() {
  return (
    <section className="container-vaelo border-t border-line py-24">
      <div className="mb-20">
        <p className="eyebrow">Results That Speak</p>
        <h2 className="font-display mt-6 text-5xl sm:text-6xl max-w-3xl">
          Real brands.
          <br />
          Real growth.
        </h2>
        <p className="mt-6 text-lg text-ink-soft max-w-2xl">
          Click the cards to explore how we've transformed businesses across industries.
        </p>
      </div>

      <div className="space-y-16">
        {caseStudiesData.map((study) => (
          <div key={study.slug} className="space-y-6">
            <CaseStudyCard study={study} />
            <MetricsCard study={study} />
          </div>
        ))}
      </div>
    </section>
  );
}
