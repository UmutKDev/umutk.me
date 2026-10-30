import { NextResponse, type NextRequest } from "next/server";
import { locales, pickLocale } from "@/app/lib/site";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${pickLocale(request.headers.get("accept-language"))}${pathname === "/" ? "" : pathname}`;
  const res = NextResponse.redirect(url, 307);
  res.headers.set("Vary", "Accept-Language");
  return res;
}

export const config = {
  // Skips api, _next, metadata image routes and anything with a dot
  // (sitemap.xml, robots.txt, llms.txt, favicon.ico, manifest.webmanifest, public files).
  matcher: ["/((?!api/|api$|_next/|opengraph-image|icon$|apple-icon$|.*\\..*).*)"],
};
