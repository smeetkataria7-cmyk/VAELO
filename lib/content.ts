// Central content for the public site.
// IMAGES: drop files in /public/images and set paths below. Until then,
// placeholders render. Case-study visuals/results are TODO (need real assets).

export const brand = {
  email: "hello@vaelocreative.com",
  phone: "+91 72080 46927",
  location: "Vile Parle East, Mumbai",
};

export const about =
  "Vaelo Creative is a Mumbai-based growth agency built for brands serious about scaling. We combine sharp creative strategy with data-driven performance marketing — so every piece of content has a job to do, and every rupee of ad spend works harder. We're not a vendor. We're your growth partner.";

export const services = [
  {
    slug: "performance",
    icon: "target",
    title: "Performance Marketing",
    desc: "Meta, Google & LinkedIn ads built to convert. We scale your budget profitably.",
  },
  {
    slug: "creative",
    icon: "spark",
    title: "Creative Strategy",
    desc: "Hooks, scripts and ad creatives that stop the scroll and drive action.",
  },
  {
    slug: "content",
    icon: "play",
    title: "Content Creation",
    desc: "Reels, UGC-style videos and short-form content built for performance.",
  },
  {
    slug: "web",
    icon: "code",
    title: "Website Development",
    desc: "Landing pages and brand sites on Wix Studio and Shopify, designed to convert.",
  },
  {
    slug: "social",
    icon: "chat",
    title: "Social Media Management",
    desc: "Consistent, on-brand presence built around your audience and goals.",
  },
  {
    slug: "ai",
    icon: "sparkles",
    title: "AI-Powered Creative Production",
    desc: "AI-generated visuals, ad creatives and avatar videos — faster output, higher volume, lower cost.",
  },
];

// Real AI creatives ("Culture Remix" carousel). Portrait 4:5.
export const gallery = [
  "/images/work/1.png",
  "/images/work/2.png",
  "/images/work/3.png",
  "/images/work/4.png",
  "/images/work/5.png",
  "/images/work/6.png",
];

// Real portfolio projects + images pulled from vaelocreative.com.
export const caseStudies = [
  { slug: "zerolys", brand: "Zerolys", category: "Brand build", image: "/images/work/zerolys.jpg" },
  { slug: "twenty2", brand: "Twenty2", category: "Eyewear", image: "/images/work/twenty2.jpg" },
  { slug: "simplicare", brand: "Simplicare", category: "Brand build", image: "/images/work/simplicare.jpg" },
];

export const steps = [
  {
    n: "01",
    title: "Strategy",
    body: "We learn your brand, audience, and goals — then build a plan where every asset has a job.",
  },
  {
    n: "02",
    title: "Create",
    body: "Creative, content, and AI-powered production — built to stop the scroll and convert.",
  },
  {
    n: "03",
    title: "Scale",
    body: "We run and optimise your paid media, then report on what's actually driving growth.",
  },
];
