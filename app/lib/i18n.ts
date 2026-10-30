import "server-only";
import type { Dict } from "./dictionaries/en";
import type { Locale } from "./site";

export { locales, type Locale } from "./site";

const dictionaries: Record<Locale, () => Promise<Dict>> = {
  en: () => import("./dictionaries/en").then((m) => m.default),
  tr: () => import("./dictionaries/tr").then((m) => m.default),
};

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale): Promise<Dict> =>
  dictionaries[locale]();
