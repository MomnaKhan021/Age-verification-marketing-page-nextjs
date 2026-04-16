// Build-time scraper for Trustpilot reviews of joodlife.com.
//
// Strategy:
//   1. If TRUSTPILOT_API_KEY + TRUSTPILOT_BUSINESS_UNIT_ID are set, use the
//      official Business API (reliable, requires paid plan).
//   2. Otherwise try the public Next.js page and parse __NEXT_DATA__.
//      Trustpilot fronts the site with AWS WAF — this often gets blocked
//      from CI/server IPs. On any failure we keep the existing seeded
//      data/reviews.json so the build never breaks.
//
// Run via: `node scripts/fetch-trustpilot-reviews.mjs`
//
import fs from 'node:fs/promises';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'data', 'reviews.json');
const SLUG = 'joodlife.com';
const RATING_FALLBACK = 4.4;
const TOTAL_FALLBACK = 50;
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36';

function initialsOf(name) {
  return (name || '?')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}

async function viaBusinessApi() {
  const key = process.env.TRUSTPILOT_API_KEY;
  const buid = process.env.TRUSTPILOT_BUSINESS_UNIT_ID;
  if (!key || !buid) return null;
  const url = `https://api.trustpilot.com/v1/business-units/${buid}/reviews?perPage=20&orderBy=createdat.desc&apikey=${key}`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`Trustpilot API HTTP ${res.status}`);
  const json = await res.json();
  const reviews = (json.reviews || []).map((r) => ({
    id: r.id,
    name: r.consumer?.displayName || 'Anonymous',
    initials: initialsOf(r.consumer?.displayName),
    image: r.consumer?.image?.image117x117?.url || r.consumer?.image?.url || null,
    rating: r.stars,
    title: r.title || null,
    body: r.text,
    date: (r.createdAt || '').slice(0, 10),
  }));
  return {
    source: 'trustpilot-api',
    fetchedAt: new Date().toISOString(),
    rating: json.businessUnit?.score?.trustScore ?? RATING_FALLBACK,
    totalReviews: json.businessUnit?.numberOfReviews?.total ?? reviews.length ?? TOTAL_FALLBACK,
    reviews,
  };
}

async function viaPublicPage() {
  const res = await fetch(`https://www.trustpilot.com/review/${SLUG}`, {
    headers: {
      'User-Agent': UA,
      'Accept':
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  const m = html.match(/<script id="__NEXT_DATA__"[^>]*>([^<]+)<\/script>/);
  if (!m) throw new Error('No __NEXT_DATA__ — likely WAF challenge');
  const data = JSON.parse(m[1]);
  const props =
    data?.props?.pageProps?.reviews ||
    data?.props?.pageProps?.businessUnit?.reviews ||
    [];
  if (!props.length) throw new Error('Empty reviews payload');
  const reviews = props.slice(0, 20).map((r) => ({
    id: r.id,
    name: r.consumer?.displayName || 'Anonymous',
    initials: initialsOf(r.consumer?.displayName),
    image: r.consumer?.imageUrl || null,
    rating: r.rating || r.stars,
    title: r.title || null,
    body: r.text,
    date: (r.dates?.publishedDate || r.createdAt || '').slice(0, 10),
  }));
  return {
    source: 'trustpilot-public',
    fetchedAt: new Date().toISOString(),
    rating: data?.props?.pageProps?.businessUnit?.trustScore?.score ?? RATING_FALLBACK,
    totalReviews:
      data?.props?.pageProps?.businessUnit?.numberOfReviews?.total ?? reviews.length ?? TOTAL_FALLBACK,
    reviews,
  };
}

async function main() {
  let payload = null;
  try {
    payload = await viaBusinessApi();
    if (payload) console.log('[trustpilot] fetched via Business API');
  } catch (err) {
    console.warn('[trustpilot] Business API failed:', err.message);
  }
  if (!payload) {
    try {
      payload = await viaPublicPage();
      console.log('[trustpilot] fetched via public page');
    } catch (err) {
      console.warn('[trustpilot] public page failed:', err.message);
    }
  }
  if (!payload) {
    console.log('[trustpilot] keeping seeded data/reviews.json');
    return;
  }
  await fs.writeFile(OUT, JSON.stringify(payload, null, 2) + '\n', 'utf8');
  console.log(`[trustpilot] wrote ${payload.reviews.length} reviews → ${OUT}`);
}

main().catch((err) => {
  console.error('[trustpilot] unexpected error:', err);
  process.exit(0); // never fail the build
});
