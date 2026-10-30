import Link from "next/link";
import type { Dict } from "@/app/lib/dictionaries/en";
import type { Locale } from "@/app/lib/i18n";
import { siteConfig } from "@/app/lib/site";
import { LangSwitch } from "./LangSwitch";
import { NavLinks } from "./NavLinks";
import { SearchPill } from "./SearchPill";

export function Nav({ lang, dict }: { lang: Locale; dict: Dict }) {
  const links = [
    { href: `/${lang}#work`, label: dict.nav.work, section: `/${lang}/work/` },
    { href: `/${lang}/now`, label: dict.nav.now },
    { href: `/${lang}/uses`, label: dict.nav.uses },
    { href: `/${lang}/cv`, label: dict.nav.cv },
  ];
  return (
    <header className="sticky top-0 z-[300] border-b border-rule bg-paper">
      <div className="container flex min-h-[72px] flex-wrap items-center gap-x-6 gap-y-2 py-3 max-sm:gap-x-3">
        <Link href={`/${lang}`} className="whitespace-nowrap text-lg font-medium no-underline">
          {siteConfig.name}
        </Link>
        <SearchPill lang={lang} dict={{ nav: dict.nav, palette: dict.palette }} />
        <NavLinks label={dict.nav.primary} links={links} />
        <LangSwitch lang={lang} label={dict.nav.language} />
      </div>
    </header>
  );
}
