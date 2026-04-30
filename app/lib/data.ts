export const siteConfig = {
  name: "Umut Kızıloğlu",
  handle: "umutk",
  role: "Full-Stack Developer",
  location: "Osmangazi, Bursa — TR",
  url: "https://umutk.me",
  email: "umut.kiziloglu@umutk.me",
  phone: "+90 543 738 1962",
  description:
    "Full-stack developer building intuitive, scalable web applications across HR and product teams. React/Next.js, TypeScript, Node.js/NestJS, PostgreSQL, Docker.",
  tagline:
    "Designs reusable UI systems, delivers API integrations, and squeezes performance from SSR, caching and query plans.",
  handles: {
    github: "UmutKDev",
    linkedin: "umutkdev",
    x: "@umutkdev",
  },
  links: [
    { label: "GitHub", href: "https://github.com/UmutKDev", handle: "@UmutKDev" },
    { label: "LinkedIn", href: "https://linkedin.com/in/umutkdev", handle: "in/umutkdev" },
    { label: "Email", href: "mailto:umut.kiziloglu@umutk.me", handle: "umut.kiziloglu@umutk.me" },
  ],
} as const;

export type Experience = {
  company: string;
  role: string;
  location?: string;
  start: string;
  end: string;
  bullets: string[];
  stack?: string[];
};

export const experiences: Experience[] = [
  {
    company: "ThinkCut",
    role: "Full-Stack Developer",
    location: "Bursa, Türkiye",
    start: "Apr 2024",
    end: "Present",
    bullets: [
      "Delivered HR-focused web features end-to-end: reusable UI components, API integrations, and SSR to improve perceived performance and SEO.",
      "Collaborated with designers in Figma; wrote maintainable, typed code (TypeScript) and clean API contracts via Swagger.",
    ],
    stack: [
      "NestJS",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Git",
      "Figma",
    ],
  },
  {
    company: "Pick a Seat",
    role: "Side Project · Biletinial",
    location: "Remote",
    start: "Mar 2024",
    end: "May 2024",
    bullets: [
      "Contributed to Pick a Seat — a ticketing and seat-reservation product spun out of Biletinial.",
      "Built responsive interfaces, integrated APIs, and refined UX for scalable, reliable online booking.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
  },
  {
    company: "Dijital Sahne",
    role: "Full-Stack Developer",
    location: "Bursa, Türkiye",
    start: "May 2023",
    end: "Apr 2024",
    bullets: [
      "Shipped multiple full-stack projects with Node.js, TypeScript and PostgreSQL across diverse client domains.",
      "Built responsive React UIs with Vite, optimized database queries and integrated APIs.",
      "Deployed and maintained services with Docker and Git in a collaborative team environment.",
    ],
    stack: ["Node.js", "TypeScript", "React", "Vite", "PostgreSQL", "Docker", "Git"],
  },
  {
    company: "Vanelli · Türkün Holding A.Ş.",
    role: "Digital Marketing Intern",
    location: "Bursa, Türkiye",
    start: "Sep 2021",
    end: "Jun 2022",
    bullets: [
      "Supported online sales campaigns and contributed to e-commerce strategy.",
      "Optimized SEO and content, ran analytics on Google Analytics, assisted social media advertising.",
    ],
  },
];

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "React Native",
      "TypeScript",
      "JavaScript ES6+",
      "Tailwind CSS",
      "Shadcn UI",
      "Material UI",
      "Vite",
      "HTML5",
      "CSS3",
    ],
  },
  {
    label: "Backend & APIs",
    items: ["Node.js", "NestJS", ".NET", "Express.js", "RESTful APIs", "GraphQL"],
  },
  {
    label: "Data & Infra",
    items: [
      "PostgreSQL",
      "MongoDB",
      "MSSQL",
      "Redis",
      "Docker",
      "Nginx",
      "IIS",
      "Git",
      "GitHub",
      "GitLab",
      "Bitbucket",
    ],
  },
  {
    label: "Cloud & CI/CD",
    items: [
      "GitHub Actions",
      "Bitbucket Runners",
      "AWS · EC2 · S3 · RDS",
      "Vercel",
      "Netlify",
      "DigitalOcean",
      "Server automation",
    ],
  },
  {
    label: "Quality",
    items: [
      "Jest",
      "React Testing Library",
      "Cypress",
      "Unit · Integration · E2E",
    ],
  },
  {
    label: "Process",
    items: ["Jira", "Trello", "Agile / Scrum", "Figma", "Miro", "UI/UX collab"],
  },
  {
    label: "Other",
    items: [
      "SEO & Web Performance",
      "API Design · Swagger · Postman",
      "i18n · Localization",
    ],
  },
];

export type Project = {
  name: string;
  blurb: string;
  start: string;
  end: string;
  tags: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    name: "Pick a Seat",
    blurb:
      "Ticketing & seat-reservation experience for Biletinial. Built responsive interfaces, integrated APIs and tuned UX for a seamless online booking flow.",
    start: "Mar 2024",
    end: "May 2024",
    tags: ["Next.js", "TypeScript", "Tailwind", "REST"],
  },
  {
    name: "ThinkCut · HR Suite",
    blurb:
      "HR-focused product surface area: reusable UI system, API integrations and SSR pages tuned for SEO and perceived performance.",
    start: "Apr 2024",
    end: "Present",
    tags: ["NestJS", "React", "PostgreSQL", "Redis", "Docker"],
  },
];

export const navItems = [
  { id: "intro", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;
