import type { Locale } from "./i18n";

// A user-facing string in both locales.
export type L = Record<Locale, string>;

// Bump when content changes; feeds sitemap lastModified.
export const contentUpdated = "2026-10-30";
export const updatedOn = (lang: Locale) =>
  new Intl.DateTimeFormat(lang, { dateStyle: "long", timeZone: "UTC" }).format(new Date(contentUpdated));

export type Experience = {
  company: string;
  role: L;
  location: L;
  start: string; // ISO month, for <time> and schema
  period: L;
  bullets: L[];
  stack?: string[];
  slug?: string; // case study, when one exists
  branch?: true; // ran beside the main line; later versions diff against the one it branched from
};

export const experiences: Experience[] = [
  {
    company: "ThinkCut",
    role: { en: "Full-Stack Developer", tr: "Full-Stack Developer" },
    location: { en: "Bursa, Türkiye", tr: "Bursa, Türkiye" },
    start: "2024-04",
    period: { en: "Apr 2024 to present", tr: "Nisan 2024'ten bugüne" },
    bullets: [
      {
        en: "Delivered HR-focused web features end-to-end: reusable UI components, API integrations, and SSR to improve perceived performance and SEO.",
        tr: "İK odaklı web özelliklerini uçtan uca geliştirdim: tekrar kullanılabilir arayüz bileşenleri, API entegrasyonları ve algılanan performansı ve SEO'yu iyileştiren SSR.",
      },
      {
        en: "Collaborated with designers in Figma; wrote maintainable, typed code (TypeScript) and clean API contracts via Swagger.",
        tr: "Figma'da tasarımcılarla birlikte çalıştım. TypeScript ile bakımı kolay, tipli kod ve Swagger ile temiz API sözleşmeleri yazdım.",
      },
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
    slug: "thinkcut-hr-suite",
  },
  {
    company: "Pick a Seat",
    role: { en: "Side project, Biletinial", tr: "Yan proje, Biletinial" },
    location: { en: "Remote", tr: "Uzaktan" },
    start: "2024-03",
    period: { en: "Mar 2024 to May 2024", tr: "Mart 2024 – Mayıs 2024" },
    bullets: [
      {
        en: "Contributed to Pick a Seat — a ticketing and seat-reservation product spun out of Biletinial.",
        tr: "Biletinial'dan çıkan bilet ve koltuk rezervasyon ürünü Pick a Seat'e katkıda bulundum.",
      },
      {
        en: "Built responsive interfaces, integrated APIs, and refined UX for scalable, reliable online booking.",
        tr: "Duyarlı arayüzler kurdum, API'leri entegre ettim ve ölçeklenebilir, güvenilir çevrim içi rezervasyon için kullanıcı deneyimini iyileştirdim.",
      },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    slug: "pick-a-seat",
    branch: true,
  },
  {
    company: "Dijital Sahne",
    role: { en: "Full-Stack Developer", tr: "Full-Stack Developer" },
    location: { en: "Bursa, Türkiye", tr: "Bursa, Türkiye" },
    start: "2023-05",
    period: { en: "May 2023 to Apr 2024", tr: "Mayıs 2023 – Nisan 2024" },
    bullets: [
      {
        en: "Shipped multiple full-stack projects with Node.js, TypeScript and PostgreSQL across diverse client domains.",
        tr: "Node.js, TypeScript ve PostgreSQL ile farklı müşteri alanlarında birden çok full-stack projeyi yayına aldım.",
      },
      {
        en: "Built responsive React UIs with Vite, optimized database queries and integrated APIs.",
        tr: "Vite ile duyarlı React arayüzleri kurdum, veritabanı sorgularını iyileştirdim ve API'leri entegre ettim.",
      },
      {
        en: "Deployed and maintained services with Docker and Git in a collaborative team environment.",
        tr: "Ekip içinde Docker ve Git ile servisleri yayına aldım ve bakımını yaptım.",
      },
    ],
    stack: ["Node.js", "TypeScript", "React", "Vite", "PostgreSQL", "Docker", "Git"],
  },
  {
    company: "Vanelli, Türkün Holding A.Ş.",
    role: { en: "Digital Marketing Intern", tr: "Dijital Pazarlama Stajyeri" },
    location: { en: "Bursa, Türkiye", tr: "Bursa, Türkiye" },
    start: "2021-09",
    period: { en: "Sep 2021 to Jun 2022", tr: "Eylül 2021 – Haziran 2022" },
    bullets: [
      {
        en: "Supported online sales campaigns and contributed to e-commerce strategy.",
        tr: "Çevrim içi satış kampanyalarını destekledim ve e-ticaret stratejisine katkıda bulundum.",
      },
      {
        en: "Optimized SEO and content, ran analytics on Google Analytics, assisted social media advertising.",
        tr: "SEO ve içeriği iyileştirdim, Google Analytics ile analiz yaptım ve sosyal medya reklamlarına destek verdim.",
      },
    ],
  },
];

export type Version = {
  n: number;
  exp: Experience;
  base?: { n: number; exp: Experience };
  kept: string[];
  dropped: string[];
  added: string[];
};

// Newest first, like the list. Each role diffs against the nearest older role on the main line,
// so a branch (Pick a Seat) never becomes the base of the role after it.
export function versions(list: Experience[] = experiences): Version[] {
  return list.map((exp, i) => {
    const j = list.findIndex((e, k) => k > i && !e.branch);
    const base = j < 0 ? undefined : { n: list.length - j, exp: list[j] };
    const cur = exp.stack ?? [];
    const prev = base?.exp.stack ?? [];
    return {
      n: list.length - i,
      exp,
      base,
      kept: cur.filter((s) => prev.includes(s)),
      dropped: prev.filter((s) => !cur.includes(s)),
      added: cur.filter((s) => !prev.includes(s)),
    };
  });
}

export type Project = {
  slug: string;
  name: string;
  blurb: L;
};

export const projects: Project[] = [
  {
    slug: "thinkcut-hr-suite",
    name: "ThinkCut HR Suite",
    blurb: {
      en: "HR product surfaces: a reusable UI system, API integrations and SSR pages tuned for SEO.",
      tr: "İK ürün ekranları: tekrar kullanılabilir arayüz sistemi, API entegrasyonları ve SEO için ayarlanmış SSR sayfaları.",
    },
  },
  {
    slug: "pick-a-seat",
    name: "Pick a Seat",
    blurb: {
      en: "Ticketing and seat reservation for Biletinial: responsive booking flow and API work.",
      tr: "Biletinial için bilet ve koltuk rezervasyonu: duyarlı rezervasyon akışı ve API çalışmaları.",
    },
  },
];

export type SkillGroup = {
  label: L;
  items: (string | L)[]; // proper nouns stay strings, phrases are translated
};

export const skillItems = (g: SkillGroup, lang: Locale) =>
  g.items.map((i) => (typeof i === "string" ? i : i[lang])).join(", ");

export const skillGroups: SkillGroup[] = [
  {
    label: { en: "Frontend", tr: "Frontend" },
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
    label: { en: "Backend & APIs", tr: "Backend ve API'ler" },
    items: ["Node.js", "NestJS", ".NET", "Express.js", "RESTful APIs", "GraphQL"],
  },
  {
    label: { en: "Data & Infra", tr: "Veri ve altyapı" },
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
    label: { en: "Cloud & CI/CD", tr: "Bulut ve CI/CD" },
    items: [
      "GitHub Actions",
      "Bitbucket Runners",
      "AWS (EC2, S3, RDS)",
      "Vercel",
      "Netlify",
      "DigitalOcean",
      { en: "Server automation", tr: "Sunucu otomasyonu" },
    ],
  },
  {
    label: { en: "Quality", tr: "Kalite" },
    items: [
      "Jest",
      "React Testing Library",
      "Cypress",
      { en: "Unit, integration and E2E tests", tr: "Birim, entegrasyon ve E2E testleri" },
    ],
  },
  {
    label: { en: "Process", tr: "Süreç" },
    items: ["Jira", "Trello", "Agile / Scrum", "Figma", "Miro", { en: "UI/UX collab", tr: "UI/UX iş birliği" }],
  },
  {
    label: { en: "Other", tr: "Diğer" },
    items: [
      { en: "SEO & Web Performance", tr: "SEO ve web performansı" },
      { en: "API design with Swagger and Postman", tr: "Swagger ve Postman ile API tasarımı" },
      { en: "i18n and localization", tr: "i18n ve yerelleştirme" },
    ],
  },
];
