// Central content for the public site.
//
// IMAGES: drop files into /public/images and set the `image` paths below
// (e.g. image: "/images/hero.jpg"). Until then, elegant placeholders render.
// TODO: replace placeholder case studies with real client names + results.

export const hero = {
  image: "/images/work/1.png", // VAELO "Culture Remix" cover
};

// Real AI creatives (Instagram "Culture Remix" carousel). Portrait 4:5.
export const gallery = [
  "/images/work/1.png",
  "/images/work/2.png",
  "/images/work/3.png",
  "/images/work/4.png",
  "/images/work/5.png",
  "/images/work/6.png",
];

export const services = [
  {
    slug: "ai-photoshoots",
    title: "AI Photoshoots",
    tagline: "Studio-quality product & brand imagery — crafted, not shot.",
    includes: [
      "Product & lifestyle visuals",
      "On-brand styling",
      "Unlimited concepts",
      "Days, not weeks",
    ],
    image: "", // e.g. "/images/service-photoshoots.jpg"
  },
  {
    slug: "instagram",
    title: "Instagram Management",
    tagline: "We turn those visuals into a feed that grows.",
    includes: [
      "Content calendar & posting",
      "Reels, posts & stories",
      "Caption & hashtag strategy",
      "Monthly reporting",
    ],
    image: "",
  },
  {
    slug: "ads",
    title: "Paid Advertising",
    tagline: "The best creatives, behind spend that converts.",
    includes: [
      "Meta (Instagram & Facebook) ads",
      "Audience & creative testing",
      "Budget management",
      "Transparent results",
    ],
    image: "",
  },
];

export const caseStudies = [
  {
    slug: "sample-real-estate",
    brand: "Marigold Miraaya",
    industry: "Real Estate",
    summary:
      "A premium residential launch in Mulund West. AI-generated lifestyle visuals positioned the project for families across 2/3/4 BHK inventory.",
    result: "Replace with real metric",
    image: "", // e.g. "/images/work-marigold.jpg"
  },
  {
    slug: "sample-fashion",
    brand: "Brand B",
    industry: "Fashion",
    summary:
      "A seasonal lookbook produced entirely with AI photoshoots — no studio, no models, delivered in days.",
    result: "Replace with real metric",
    image: "",
  },
  {
    slug: "sample-fnb",
    brand: "Brand C",
    industry: "Food & Beverage",
    summary:
      "Mouth-watering product imagery and a consistent Instagram presence that lifted engagement.",
    result: "Replace with real metric",
    image: "",
  },
];

export const steps = [
  {
    n: "01",
    title: "Send your brand",
    body: "Share your product and goals. We learn your brand — its colours, audience, and voice.",
  },
  {
    n: "02",
    title: "We craft",
    body: "AI-generated visuals tailored to your brand, refined by hand until they're right.",
  },
  {
    n: "03",
    title: "We grow you",
    body: "Those visuals power your Instagram and ads — and we report on what works.",
  },
];
