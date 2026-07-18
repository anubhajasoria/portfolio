// ============================================================================
//  SITE CONTENT — edit everything here. All copy, links, and imagery for the
//  portfolio live in this one file. Placeholder values are marked TODO.
// ============================================================================

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function statusClass(status: string) {
  const s = status.toLowerCase();
  if (s.includes("progress") || s.includes("wip")) return "wip";
  if (s.includes("not live") || s.includes("soon")) return "soon";
  return "live";
}

export const SITE = {
  name: "Anubha Jasoria",
  wordmark: "Anubha Jasoria", // shown in the header / loader / footer
  role: "Full Stack Developer",
  // Canonical production URL — used for SEO (canonical, Open Graph, sitemap, JSON-LD).
  url: "https://anubhajasoria.in",
  email: "anubhajasoria@gmail.com",
  location: "India · Remote",
  linkedin: "https://www.linkedin.com/in/anubha-jasoria-b321a219a/",
  github: "https://github.com/anubhajasoria",
  resumeUrl: "/Anubha-Jasoria-Resume.pdf",

  // SEO copy — shown to search engines and link previews, not on the page.
  seoDescription:
    "Anubha Jasoria is a full stack developer with 4+ years of experience building production web and mobile apps with React, React Native, Next.js, TypeScript and Firebase. Open to freelance projects and full-time roles.",
  seoKeywords: [
    "Anubha Jasoria",
    "full stack developer",
    "freelance web developer India",
    "React developer",
    "React Native developer",
    "Next.js developer",
    "TypeScript",
    "Firebase",
    "frontend developer portfolio",
  ],

  // Big hero headline — revealed word by word.
  heroTitle: "Full Stack Developer",
  // Two stacked lines under the hero.
  taglineLines: ["Build and", "Deploy"],
};

// Placeholder imagery via picsum (deterministic seeds). Swap for your own.
export const IMG = {
  hero: "/images/hero.jpg",
  aboutIcon: "https://picsum.photos/seed/aj-mark/240/240?grayscale",
  portrait: "https://picsum.photos/seed/aj-me/400/520?grayscale",
};

// Hero "featured work" mini-carousel (3 highlights from PROJECTS below).
export const COLLECTIONS = [
  { img: "/images/qualixit.png", brand: "E-commerce · Web", title: "Qualix IT Solutions", cta: "In progress", href: "#work", alt: "Qualix IT Solutions custom PC builder website" },
  { img: "https://picsum.photos/seed/sequence/300/300", brand: "Game · Web", title: "Match & Set", cta: "In progress", href: "#work", alt: "Match & Set card-and-board game" },
  { img: "/images/bollywood-mehfil.svg", brand: "Game", title: "Bollywood Mehfil", cta: "View project", href: "#work", alt: "Bollywood Mehfil game" },
] as const;

// Hero glass stat card.
export const MEMBERSHIP = {
  value: "4+",
  caption: "Years shipping web & mobile",
  img: IMG.portrait,
  alt: "Portrait placeholder",
  dots: ["#5790e6", "#c2e029", "#0b6e97", "#ffffff"],
};

// About section — a personality-forward "about me" built to convert both
// freelance clients and employers. `statement` reveals line by line; `traits`
// animate in as spring cards; `marquee` scrolls as a keyword strip.
export const ABOUT = {
  eyebrow: "About me",
  statement: ["Obsessive about craft.", "Honest about the work."],
  lead:
    "I'm Anubha Jasoria — a full-stack developer with 4+ years shipping production web and mobile apps in React, React Native, Next.js and Firebase, for teams in the US, Europe and India. I take an idea from blank canvas to a live, polished product, sweat the details most people skip, and I'll always tell you the truth about what your project actually needs.",
  traits: [
    {
      idx: "01",
      title: "Relentless finisher",
      body:
        "I don't clock out on a half-done idea. I stay with a problem until it genuinely works — and if it ships, it ships polished.",
    },
    {
      idx: "02",
      title: "Creative mind",
      body:
        "Give me a blank canvas and real constraints, and I'll find the idea that makes the product feel effortless to use.",
    },
    {
      idx: "03",
      title: "A designer's eye",
      body:
        "I clock what works and what doesn't at a glance. Off spacing, a wrong palette, a janky transition — I catch it instantly, so it never reaches you.",
    },
    {
      idx: "04",
      title: "Always learning",
      body:
        "New stack, new domain, new tool — I ramp up fast and enjoy it. Whatever your project needs, I'll pick it up and run.",
    },
    {
      idx: "05",
      title: "Honest, always",
      body:
        "I'll tell you what I do well, where I'd bring in help, and what's realistic in your timeline. No overpromising, no surprises.",
    },
    {
      idx: "06",
      title: "End-to-end",
      body:
        "Design to production code — wireframe to a live, responsive, accessible product with no handoff gap in the middle.",
    },
  ],
  // Featured differentiator band — the "why hire a developer, not just a prompt".
  edge: {
    label: "The difference",
    title: "I build with AI — and I know why it works",
    body:
      "Anyone can prompt an app into existence. Keeping it fast, secure, and scalable is the hard part. I use AI to move quickly, then bring the engineering judgment that turns a slick demo into something built to hold up once real users show up.",
  },
  marquee: [
    "Ships fast",
    "Creative",
    "Detail-obsessed",
    "Fast learner",
    "Honest",
    "End-to-end",
    "Pixel-perfect",
    "AI + engineering",
    "Reliable",
  ],
  ctaText: "Open to freelance projects & full-time roles",
  ctaHref: "mailto:anubhajasoria@gmail.com",
  ctaLabel: "Let's talk",
} as const;

// Experience — numbered rows (résumé work history).
export const PROGRAMS = [
  { idx: "01", name: "Team Lead · Full Stack Developer", desc: "Vyral LLC (USA · Remote) · Aug 2024–Present · Promoted to team lead within a year; lead 6 engineers on a 14-person team building “Let’s Hang”, an events app in React, React Native & Firebase. Sped up event creation with request batching and caching — events grew from 2–3 a week to 1–2 a day.", href: "#experience" },
  { idx: "02", name: "Frontend Developer → Team Lead", desc: "Quantum Dynamics Corp (France · Remote) · Feb 2023–May 2024 · Promoted to team lead within 6 months; managed an 8–10 person team building Tirpost and Bansira (payments & banking, web + mobile) in React & React Native.", href: "#experience" },
  { idx: "03", name: "Frontend Developer", desc: "Innovana Thinklabs (Jaipur, Rajasthan, India) · Feb 2022–Feb 2023 · Sole frontend developer on a 6-person team; built the UI and API integrations for “Anytime Earn” and “Pixie Job” across web and mobile in React & React Native.", href: "#experience" },
  { idx: "04", name: "Coding Instructor", desc: "Cuemath (Global · Remote) · Feb 2021–Feb 2022 · The deliberate pivot from operations into engineering: taught JavaScript and Python to international students through COVID while retraining in frontend development; rated in the top 10% of teachers across Cuemath’s workforce.", href: "#experience" },
  { idx: "05", name: "Operations Executive", desc: "Infosys (Pune) · Jan 2018–Jun 2019 · Wrote Python automation scripts with the QA team for quality-assurance testing.", href: "#experience" },
] as const;

// Selected Work — full project list.
// TODO: refine desc, fill `tags` (tech), and add `url` (live) / `repo` (code) links.
export const PROJECTS = [
  {
    name: "Qualix IT Solutions",
    category: "E-commerce · Web",
    status: "In progress",
    desc: "A custom PC builder and IT solutions storefront — gaming rigs, workstations, and enterprise systems, plus consultations and custom-quote booking.",
    tags: ["Next.js", "React", "TypeScript", "Firebase"],
    url: "https://qit-be--qualixit-website.asia-east1.hosted.app/",
    repo: "",
    img: "/images/qualixit.png",
    alt: "Qualix IT Solutions custom PC builder website",
  },
  {
    name: "Match & Set",
    category: "Game · Web",
    status: "In progress",
    desc: "An original five-in-a-row card-and-board game — play a card, drop a chip, race to build lines of five. Architected so accounts and online multiplayer can be added without a rewrite.",
    tags: ["React", "TypeScript", "Vite", "Vitest"],
    url: "",
    repo: "https://github.com/anubhajasoria/match-and-set",
    img: "https://picsum.photos/seed/sequence/900/560",
    alt: "Match & Set card-and-board game",
  },
  {
    name: "Bollywood Mehfil",
    category: "Game",
    status: "",
    desc: "A Bollywood music and trivia party game.",
    tags: [] as string[],
    url: "",
    repo: "",
    img: "/images/bollywood-mehfil.svg",
    alt: "Bollywood Mehfil game",
  },
  {
    name: "Cartographia",
    category: "Game",
    status: "In progress",
    desc: "A map-based geography exploration game with live multiplayer, rendered with D3 on real map data.",
    tags: ["React", "D3", "Firebase", "Tailwind"],
    url: "",
    repo: "https://github.com/anubhajasoria/cartographia",
    img: "/images/cartographia.svg",
    alt: "Cartographia game",
  },
  {
    name: "Silica Sand & Quartz Trading",
    category: "Business · Web",
    status: "",
    desc: "A business information website for a silica sand and quartz trading company.",
    tags: [] as string[],
    url: "",
    repo: "",
    img: "https://picsum.photos/seed/silica/900/560",
    alt: "Silica sand and quartz trading business website",
  },
 
];

// Stats band.
// Derived from the résumé (experience-weighted, not personal-project counts).
export const STATS = [
  { v: "4+", l: "Years building web & mobile" },
  { v: "2×", l: "Promoted to team lead" },
  { v: "10", l: "People led at peak" },
  { v: "3", l: "Countries worked with" },
] as const;

// Tech stack — grouped by discipline (from résumé).
export const SKILLS = [
  { idx: "01", group: "Frontend", items: ["React", "React Native", "Expo", "TypeScript", "JavaScript", "Redux", "MobX", "Zustand", "Tailwind", "Material UI", "HTML & CSS", "Sass"] },
  { idx: "02", group: "Backend & APIs", items: ["Firebase", "GraphQL", "REST", "Python"] },
  { idx: "03", group: "Tools", items: ["Git", "Jira", "Postman", "Android Studio", "Xcode", "Linux", "Vite"] },
] as const;

// Footer navigation columns.
export const FOOTER_COLS = [
  { heading: "Work", links: [["Projects", "#work"], ["All Work", "/work"], ["GitHub", "https://github.com/anubhajasoria"]] },
  { heading: "About", links: [["Bio", "#about"], ["Experience", "#experience"], ["Tech Stack", "#skills"], ["Resume", "/Anubha-Jasoria-Resume.pdf"]] },
  { heading: "Connect", links: [["LinkedIn", "https://www.linkedin.com/in/anubha-jasoria-b321a219a/"], ["GitHub", "https://github.com/anubhajasoria"], ["Email", "mailto:anubhajasoria@gmail.com"], ["Resume", "/Anubha-Jasoria-Resume.pdf"]] },
] as const;

export const SOCIALS = [["LinkedIn", "https://www.linkedin.com/in/anubha-jasoria-b321a219a/"], ["GitHub", "https://github.com/anubhajasoria"], ["Email", "mailto:anubhajasoria@gmail.com"]] as const;

// Header + fullscreen menu navigation.
export const NAV = [
  ["Work", "#work"],
  ["About", "#about"],
] as const;

export const MENU_LINKS = [
  ["Work", "#work"],
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Contact", "#contact"],
] as const;
