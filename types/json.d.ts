// Any JSON imported from /data/* is treated as `any`. The Trustpilot
// scraper replaces data/reviews.json at build time with an API-shaped
// payload whose exact types vary — we don't want the TS compiler to
// infer and pin those literal shapes at import time.
declare module '@/data/*.json' {
  const value: any;
  export default value;
}
