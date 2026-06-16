// Central content for the public site.
// TODO: replace placeholder case studies with real client names, images, and
// results once approved. Brand names are allowed per the owner.

export const services = [
  {
    slug: "ai-photoshoots",
    title: "AI Photoshoots",
    tagline: "Studio-quality product & brand imagery — generated, not shot.",
    includes: [
      "Product & lifestyle visuals",
      "On-brand styling from your Brand Brain",
      "Unlimited concepts, fast turnaround",
      "A fraction of a traditional shoot's cost",
    ],
  },
  {
    slug: "instagram",
    title: "Instagram Management",
    tagline: "We turn those visuals into a feed that grows.",
    includes: [
      "Content calendar & posting",
      "Reels, posts & stories",
      "Caption & hashtag strategy",
      "Monthly performance reporting",
    ],
  },
  {
    slug: "ads",
    title: "Paid Advertising",
    tagline: "Put the best creatives behind spend that converts.",
    includes: [
      "Meta (Instagram & Facebook) ads",
      "Audience & creative testing",
      "Budget & bid management",
      "Transparent results reporting",
    ],
  },
];

// Placeholder results — replace with real numbers + images before launch.
export const caseStudies = [
  {
    slug: "sample-real-estate",
    brand: "Marigold Miraaya",
    industry: "Real Estate",
    summary:
      "Premium residential launch in Mulund West. AI-generated lifestyle visuals positioned the project for families across 2/3/4 BHK inventory.",
    result: "Replace with real metric",
  },
  {
    slug: "sample-fashion",
    brand: "Brand B",
    industry: "Fashion",
    summary:
      "Seasonal lookbook produced entirely with AI photoshoots — no studio, no models, delivered in days.",
    result: "Replace with real metric",
  },
  {
    slug: "sample-fnb",
    brand: "Brand C",
    industry: "Food & Beverage",
    summary:
      "Mouth-watering product imagery and a consistent Instagram presence that lifted engagement.",
    result: "Replace with real metric",
  },
];

export const contrast = {
  traditional: {
    label: "Traditional photoshoot",
    points: ["₹₹₹ per shoot", "Weeks of planning", "Studio, models, crew", "Reshoots cost more"],
  },
  vaelo: {
    label: "VAELO AI shoot",
    points: ["A fraction of the cost", "Delivered in days", "No studio needed", "Unlimited concepts"],
  },
};

export const steps = [
  {
    n: "01",
    title: "Send your brand",
    body: "Share your product and goals. We learn your brand — colours, audience, vibe.",
  },
  {
    n: "02",
    title: "We create",
    body: "AI-generated visuals tailored to your brand, refined until they're right.",
  },
  {
    n: "03",
    title: "We grow you",
    body: "Those visuals power your Instagram and ads — and we report on what works.",
  },
];
