import type { Locale } from "@/app/lib/i18n";
import { contentUpdated, updatedOn } from "@/app/lib/content";

// "Updated {date}" under a read page's h1, the same date the footer signs with.
export function Updated({ lang, text }: { lang: Locale; text: string }) {
  const [before, after] = text.split("{date}");
  return (
    <p className="mt-6 text-ink-2">
      {before}
      <time dateTime={contentUpdated} className="m cool">
        {updatedOn(lang)}
      </time>
      {after}
    </p>
  );
}
