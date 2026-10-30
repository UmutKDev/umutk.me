# Google Search Console baseline: umutk.me

Measured: 2026-10-30. Requested window: last 90 days (2026-08-01 to 2026-10-30).

## Result: no GSC data available

The connected Google Search Console account has **no property for umutk.me**, so no clicks, impressions, CTR, position, top queries, top pages, countries, URL-inspection or sitemap data could be pulled.

Evidence (`mcp__gsc__list_properties`, authenticated OK):

```json
{"count": 2, "properties": [
  {"site_url": "sc-domain:biletevo.com", "permission_level": "siteOwner"},
  {"site_url": "sc-domain:biletera.com", "permission_level": "siteOwner"}
]}
```

Not found: `sc-domain:umutk.me`, `https://umutk.me/`, `https://www.umutk.me/`. All per-property GSC calls (performance, search analytics, sitemaps, URL inspection) require one of these, so they were not run.

| Metric (90 d) | Value |
|---|---|
| Clicks | n/a (no property) |
| Impressions | n/a |
| CTR | n/a |
| Avg. position | n/a |
| Top queries / pages / countries | n/a |
| Indexing status (URL Inspection) | n/a |
| Submitted sitemaps | n/a |

## Verification signals

The domain appears to have been verified with Google at some point, possibly under a different Google account than the one connected to the MCP:

```
$ dig +short TXT umutk.me
"apple-domain=phBtO36WfRVGqg3a"
"google-site-verification=YPq-RochV3VeDj87KFjB6X75sS0Hrb9TJrRCS9DT2EU"
"v=spf1 include:icloud.com ~all"
```

No `google-site-verification` meta tag is in the homepage HTML. The DNS TXT record is enough for a Domain property (`sc-domain:umutk.me`).

## Live crawl-control findings that affect GSC (observed while checking)

```
$ curl -sI https://umutk.me/            -> HTTP/2 308, location: https://www.umutk.me/
$ curl -sL https://umutk.me/robots.txt   (served from https://www.umutk.me/robots.txt, 200)
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Host: https://umutk-i4p2le0c1-gs-projects-8f225d12.vercel.app
Sitemap: https://umutk-i4p2le0c1-gs-projects-8f225d12.vercel.app/sitemap.xml

$ curl -sL https://umutk.me/sitemap.xml  (served from https://www.umutk.me/sitemap.xml, 200)
<loc>https://umutk-i4p2le0c1-gs-projects-8f225d12.vercel.app</loc>  (only entry, lastmod 2026-04-30)
```

1. **Apex redirects to www** (308). The canonical host in production is `www.umutk.me`, not `umutk.me`.
2. **robots.txt `Host` and `Sitemap` point to a Vercel deployment URL**, not the production domain. In production the site URL resolves to the deployment URL instead of the custom domain.
3. **sitemap.xml lists a single URL on the Vercel deployment host.** If the sitemap were submitted to a umutk.me property, Google would reject that URL as out of property.

These should be fixed during the redesign. They are recorded here only and no source was changed.

## Actions needed before a GSC baseline is possible

1. Add (or share with the connected Google account) the Domain property `sc-domain:umutk.me`. The DNS TXT token already exists, so verification may be immediate.
2. After the site-URL fix ships, submit `https://www.umutk.me/sitemap.xml` (or the canonical host chosen in the plan).
3. GSC keeps about 16 months of history once a property exists, but data is only collected from when the property is added (a Domain property backfills nothing earlier). If the property already exists under another account, sharing it gives access to existing history. Re-run this baseline then.

## Commands / tools used

- `mcp__gsc__list_properties` (authenticated, returned 2 unrelated properties)
- `curl -sI https://umutk.me/`, `curl -sL https://umutk.me/robots.txt`, `curl -sL https://umutk.me/sitemap.xml`
- `curl -s https://umutk.me/ | grep google-site-verification` (no match, since the request does not follow the 308)
- `dig +short TXT umutk.me`
