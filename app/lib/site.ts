// Resolve the canonical site URL once at module load.
// Priority:
//   1. SITE_URL  — explicit override
//   2. production deploys always use the real domain (never the noindexed *.vercel.app host)
//   3. VERCEL_URL — preview deploys get their unique subdomain
//   4. hardcoded production fallback
const SITE_URL = (() => {
  // .origin throws on a value without a scheme and drops any trailing slash or path.
  if (process.env.SITE_URL) return new URL(process.env.SITE_URL).origin;
  if (process.env.VERCEL_ENV === "production") return "https://www.umutk.me";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://www.umutk.me";
})();

// Client-safe (i18n.ts is server-only), so proxy and LangSwitch read it from here.
export const locales = ["en", "tr"] as const;
export type Locale = (typeof locales)[number];
// The path after /{lang}, for links to the same page in another locale.
export const stripLocale = (path: string) => path.replace(/^\/[^/]+/, "");

// shortcut: only tr vs en is decided, so a full negotiator is overkill; upgrade if a third locale lands.
export function pickLocale(acceptLanguage: string | null): Locale {
  let best = "";
  let bestQ = 0;
  for (const part of (acceptLanguage ?? "").split(",")) {
    const [tag, ...params] = part.trim().toLowerCase().split(";");
    const q = Number(params.find((p) => p.trim().startsWith("q="))?.split("=")[1] ?? 1);
    if (tag && q > bestQ) [best, bestQ] = [tag, q];
  }
  return best.startsWith("tr") ? "tr" : "en";
}

export const siteConfig = {
  name: "Umut Kızıloğlu",
  role: "Full-Stack Developer",
  location: "Osmangazi, Bursa — TR",
  url: SITE_URL,
  email: "umut.kiziloglu@umutk.me",
  description:
    "Full-stack developer building intuitive, scalable web applications across HR and product teams. React/Next.js, TypeScript, Node.js/NestJS, PostgreSQL, Docker.",
  handles: {
    github: "UmutKDev",
    linkedin: "umutkdev",
    x: "@umutkdev",
  },
  links: [
    { label: "GitHub", href: "https://github.com/UmutKDev", handle: "@UmutKDev" },
    { label: "LinkedIn", href: "https://linkedin.com/in/umutkdev", handle: "in/umutkdev" },
    { label: "X", href: "https://x.com/umutkdev", handle: "@umutkdev" },
  ],
} as const;
