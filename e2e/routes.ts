import { locales } from "../app/lib/site";
import { projects } from "../app/lib/content";

// Every page, locale-less, × every locale.
export const paths = ["", "/now", "/uses", "/cv", ...projects.map((p) => `/work/${p.slug}`)];
export const pages = locales.flatMap((lang) => paths.map((path) => ({ lang, path, url: `/${lang}${path}` })));
