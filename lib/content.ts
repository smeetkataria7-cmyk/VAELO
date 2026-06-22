// Central content for the public site.
// IMAGES: drop files in /public/images and set paths below. Until then,
// placeholders render. Case-study visuals/results are TODO (need real assets).

export const brand = {
  email: "hello@vaelocreative.com",
  phone: "+91 72080 46927",
  location: "Vile Parle East, Mumbai",
};

export const about =
  "A Mumbai growth agency for brands serious about scaling. We pair sharp creative with data-driven media — we don't just run ads, we build brands.";

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

// Portfolio projects.
// images: drop the real file in /public/images/work/<slug>.jpg to replace the placeholder.
export const caseStudies: {
  slug: string;
  brand: string;
  categories: string[];
  accent: string;
  image: string;
}[] = [
  {
    slug: "simplicare",
    brand: "Simplicare",
    categories: ["Branding"],
    accent: "#2d5a3d",   // forest green — clean / wellness
    image: "/images/work/simplicare.jpg",
  },
  {
    slug: "tribalzone",
    brand: "Tribalzone",
    categories: ["Branding", "Social Media"],
    accent: "#1a1a2e",   // deep navy — streetwear / tribe energy
    image: "/images/work/tribalzone.jpg",
  },
  {
    slug: "dvoc",
    brand: "DVOC",
    categories: ["Branding", "Strategy"],
    accent: "#c8331f",   // bold red — strong identity
    image: "/images/work/dvoc.jpg",
  },
  {
    slug: "marigold-miraya",
    brand: "Marigold Miraya",
    categories: ["Branding", "AI Production"],
    accent: "#c9871a",   // warm marigold / gold
    image: "/images/work/marigold-miraya.jpg",
  },
  {
    slug: "zerolys",
    brand: "Zerolys",
    categories: ["Branding"],
    accent: "#0e2a47",   // midnight blue — tech / health
    image: "/images/work/zerolys.jpg",
  },
  {
    slug: "conceptual",
    brand: "Conceptual",
    categories: ["AI Production"],
    accent: "#2a0a3a",   // deep grape — experimental / creative
    image: "/images/work/conceptual.jpg",
  },
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
