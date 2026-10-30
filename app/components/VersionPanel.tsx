import type { ReactNode } from "react";
import type { Dict } from "@/app/lib/dictionaries/en";
import type { Locale } from "@/app/lib/i18n";
import { siteConfig } from "@/app/lib/site";
import type { Version } from "@/app/lib/content";

export const short = (company: string) => company.split(",")[0];

type Row = { kind: "chg" | "del" | "add" | ""; field: string; was?: string; now?: string; m?: boolean };

// One version of the record: what changed against the version it was compared with.
// `head` replaces the version title where the page already names it (case study h1).
export function Panel({ v, lang, dict, head }: { v: Version; lang: Locale; dict: Dict["record"]; head?: ReactNode }) {
  const { exp, base } = v;
  const pair = (field: string, now: string, was?: string): Row => ({
    kind: was === undefined ? "add" : was === now ? "" : "chg",
    field,
    was,
    now,
  });
  const rows: Row[] = [
    pair(dict.company, exp.company, base?.exp.company),
    pair(dict.role, exp.role[lang], base?.exp.role[lang]),
    { ...pair(dict.period, exp.period[lang], base?.exp.period[lang]), m: true },
  ];
  const list = (s: string[]) => s.join(", ");
  if (v.kept.length) rows.push({ kind: "", field: dict.kept, was: list(v.kept), now: list(v.kept) });
  if (v.dropped.length) rows.push({ kind: "del", field: dict.dropped, was: list(v.dropped) });
  if (v.added.length) rows.push({ kind: "add", field: dict.added, now: list(v.added) });

  // red behind what went, green behind what came; an unchanged value is one cell
  const glyph = { chg: ["±", dict.changed], del: ["−", dict.removed], add: ["+", dict.new], "": null };
  const tag = (n: number) => <span className="m cool">v{n}</span>;
  const when = new Intl.DateTimeFormat(lang, { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(exp.start));
  let note: ReactNode = dict.first;
  if (base) note = <>{exp.branch ? dict.branchedFrom : dict.comparedWith} {tag(base.n)}</>;

  return (
    <article className="version">
      <header className="version__head">
        {head ?? (
          <h3>
            {tag(v.n)} {exp.company}
          </h3>
        )}
        <p>{note}</p>
      </header>
      <table className="diff">
        <thead>
          <tr>
            <th scope="col"><span className="sr-only">{dict.change}</span></th>
            <th scope="col"><span className="sr-only">{dict.field}</span></th>
            <th scope="col">{base ? <>{tag(base.n)} {short(base.exp.company)}</> : dict.before}</th>
            <th scope="col">{tag(v.n)} {short(exp.company)}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const g = glyph[r.kind];
            const cls = (c: string) => [c, r.m ? "m" : ""].join(" ").trim() || undefined;
            return (
              <tr key={r.field} className={r.kind || undefined}>
                <td className="g">
                  {g && (
                    <>
                      <span aria-hidden>{g[0]}</span>
                      <span className="sr-only">{g[1]}</span>
                    </>
                  )}
                </td>
                <th scope="row">{r.field}</th>
                {r.kind ? (
                  <>
                    <td className={cls(r.kind === "add" ? "" : "was")}>{r.was}</td>
                    <td className={cls(r.kind === "del" ? "" : "now")}>{r.now}</td>
                  </>
                ) : (
                  <td colSpan={2} className={cls("")}>{r.now}</td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <dl className="sig">
        <div>
          <dt>{dict.who}</dt>
          <dd className="person">{siteConfig.name.split(" ")[0]}</dd>
        </div>
        <div>
          <dt>{dict.when}</dt>
          <dd className="m cool">
            <time dateTime={exp.start}>{when}</time>
          </dd>
        </div>
        <div className="sig__why">
          <dt>{dict.why}</dt>
          <dd>
            <q>{exp.bullets[0][lang]}</q>
          </dd>
        </div>
      </dl>
    </article>
  );
}
