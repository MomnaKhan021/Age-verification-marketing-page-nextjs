# Project Handoff — Jood Age Verification Page

> Context doc for resuming work under a new Claude Code / developer profile.
> Last updated: 2026-04-16 · Branch: `main` · Latest commit: [`fb6a2e4`](https://github.com/MomnaKhan021/Age-verification-marketing-page-nextjs/commit/fb6a2e4)

---

## 1. What this project is

A production-ready Next.js 15 (App Router) marketing page that gates the
site behind an age-verification modal. Clicking **Yes, I'm over 18**
persists to `localStorage` and redirects to `https://joodlife.com`.
Clicking **No** surfaces an inline "Access denied" alert for 1 second
and blocks progression.

Design source: [Figma — JoodLife New Ads Page](https://www.figma.com/design/t0ThvwA7kLXIjrexuf4sAN/JoodLife---New-Ads-Page)
(nodes 1:416, 1:794, 1:795).

**Live repo:** https://github.com/MomnaKhan021/Age-verification-marketing-page-nextjs
**Production branch:** `main`
**Deploy target:** Vercel (native GitHub integration)
**Custom domain:** `momenta.rocks` (DNS in IONOS)

---

## 2. Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15.5.9 (App Router) |
| React | 19.0.0 |
| Language | TypeScript 5.6 (strict; `ignoreBuildErrors` as CI safety net) |
| Styling | Tailwind CSS 3.4 (with design tokens in `tailwind.config.ts`) |
| Fonts | DM Sans (body) + Bricolage Grotesque (display) + Playfair Display (italic serif) via `next/font/google` |
| Animation | framer-motion 12 |
| State | React Context (`AgeVerificationContext`) + `localStorage` persistence |
| Analytics | Google Tag Manager `GTM-5PDWS6QH` (overridable via `NEXT_PUBLIC_GTM_ID`) |
| Optional backends | Supabase SSR client scaffolded in `lib/supabase/` (unused at present) |
| Hosting | Vercel (auto-deploy on push to `main`) |

---

## 3. Repo structure

```
app/
  layout.tsx              # Root layout — fonts, GTM, <AgeVerificationModal />
  page.tsx                # Single page — composes Hero → Marquee → Reviews → Footer
  globals.css             # Tailwind base + `not-italic` guards + marquee mask
components/
  ui/
    AgeVerificationModal.tsx   # Blocking gate, focus trap, scroll lock
    Button.tsx                 # Primary + ghost variants
    Logo.tsx                   # Real Jood wordmark (SVG exported from Figma)
    ReviewCard.tsx             # Single card — accepts null-heavy scraper shape
    ReviewsCarousel.tsx        # framer-motion paged carousel
    Stars.tsx                  # Trustpilot-style green 5-star row
    TrustpilotBadge.tsx        # Rating + review count badge
    USPCard.tsx / USPIcon.tsx  # Hand-drawn 32px stroke icons (clinicians / time / support / delivery)
contexts/
  AgeVerificationContext.tsx   # `verify(url)`, `deny()`, localStorage + error handling
data/
  reviews.json            # Seeded reviews (overwritten by scraper at build time)
hooks/
  useAutoAdvance.ts       # Reusable timed-advance for carousels
  usePrefersReducedMotion.ts
lib/
  supabase/               # Browser + SSR clients (optional — returns null without env vars)
public/
  images/
    hero.jpg              # Optimized 117KB (was 6MB)
    gillian.jpg           # Avatar for seed review
    jood-logo-light.svg   # Real Figma export (white)
    jood-logo-dark.svg    # Real Figma export (#142e2a)
scripts/
  fetch-trustpilot-reviews.mjs   # Build-time scraper — runs in `prebuild`
sections/
  Hero.tsx                # Banner + Yes/No buttons + denial popup
  Marquee.tsx             # Continuous infinite rail with bottom border
  Reviews.tsx             # Trustpilot badge + editorial headline + carousel
  Footer.tsx              # © 2026 Jood line
  USPBar.tsx              # Legacy — not rendered on page.tsx anymore
types/
  json.d.ts               # Treats @/data/*.json imports as `any` (scraper drift-proof)
next.config.mjs           # images config + typescript/eslint safety flags
tailwind.config.ts        # Brand tokens: brand.ink, .navy, .blue, .cream, .mint, .sage, .muted, .slate, .green
tsconfig.json
.env.local.example        # Supabase + Trustpilot vars (all optional)
```

---

## 4. Key commands

```bash
npm install                   # install deps
npm run dev                   # dev server at http://localhost:3000
npm run build                 # prebuild (Trustpilot scraper) + next build
npm run start                 # production server
npm run lint                  # ESLint (deprecated CLI, non-blocking)
npm run fetch:reviews         # manually re-run the Trustpilot scraper
```

---

## 5. Key implementation notes

### Age verification flow
- Gate renders in `app/layout.tsx` next to `{children}` → appears on every page.
- Shown when `ready && status !== 'verified'`.
- **Yes** → `verify('https://joodlife.com')` → localStorage write + `window.location.assign` (with `location.href` fallback if assign throws).
- **No** → inline `role="alert"` banner; resets after `DENIED_RESET_MS = 1000`.
- Body scroll locked via `document.body.style.overflow = 'hidden'` + scrollbar compensator.
- Focus trap cycles between Yes and No; Escape is `preventDefault`-ed.
- `prefers-reduced-motion` honoured on all transitions.

### Hero overlay
- Figma spec: image + `#142e2a @ 95% opacity` on top.
- Implemented as two stacked `<Image fill>` + `<div className="bg-[#142e2a]/95">`.
- Do NOT replace with the old 3-stop black gradient — it renders too bright.

### Typography (editorial italic)
- Headlines split sans + italic serif: `"Age "` + `italic <span>Verification</span>`; `"3000+ happy "` + `italic <span>customers</span>`.
- Serif fallback chain: `"ITC Clearface Std", Playfair Display, serif`.
- Global `font-style: normal` guard on html/body/h1-h6/p/span/button/a in `globals.css` — prevents any accidental italics from user-agent fallbacks.

### Marquee
- Continuous 2× duplicated list, seamless loop via CSS `@keyframes marquee` in Tailwind config.
- Uniform `mr-14 md:mr-16` on every item (NOT parent `gap-*`) — keeps the wrap seam invisible.
- Bottom border `border-gray-200` — nothing on top (per design).

### Review carousel
- Manual nav only (no autoplay per final spec).
- Page size: 1 / 2 / 3 / 4 at mobile / sm / lg / xl.
- Each card is an `<a>` linking to `https://www.trustpilot.com/review/joodlife.com` with smooth hover `-translate-y-1 + shadow`.
- Avatar falls back to initials when image is missing.

### Trustpilot scraper
- Runs as `prebuild` on every Vercel deploy.
- Tries: Business API (if `TRUSTPILOT_API_KEY` set) → public page scrape → keeps existing seeded JSON.
- Vercel's US-East IP isn't blocked by Trustpilot's AWS WAF; local dev IPs often are. Scraper gracefully no-ops.
- Result shape can have `null` in any optional field — `types/json.d.ts` declares it as `any` to prevent TS from inferring strict null types.

### Icon system
- `components/ui/USPIcon.tsx` — 32×32 viewBox, 1.75 stroke, `currentColor`.
- Colour controlled by parent's `text-…` utility (brand-navy in marquee).
- Figma's real USP icons are an external mask-only library that doesn't export — these are hand-drawn to match.

---

## 6. Deploy & DNS setup (current state)

### Vercel
- Project: **age-verification-marketing-page-nextjs** in `momnakhan021's projects`
- Native GitHub integration (webhook on push to `main`, `figma-integration`)
- Default domain: `age-verification-marketing-page-nex-eight.vercel.app` (or similar)
- Environment variables: none required; optional ones listed in `.env.local.example`

### Custom domain `momenta.rocks` (IONOS DNS)

| Type | Host | Value | TTL |
|---|---|---|---|
| A | `@` | `216.198.79.1` | 3600 |
| CNAME | `www` | `cname.vercel-dns.com` | 3600 |
| MX | `@` | `mx00.ionos.co.uk` | (unchanged) |
| MX | `@` | `mx01.ionos.co.uk` | (unchanged) |
| TXT / CNAME | (mail records) | (unchanged) | (unchanged) |

**Disable** the IPv6 AAAA record on `@` — IONOS's default points at their parking server.

Verify with:
```bash
nslookup momenta.rocks   # should resolve to 216.198.79.1
```

---

## 7. Commit timeline (recent, newest first)

```
fb6a2e4  Add Google Tag Manager (GTM-5PDWS6QH)
a402fd0  Merge pull request #3 — React Server Components CVE
1abff67  Fix React Server Components CVE vulnerabilities
3040bc4  Remove redundant GitHub Actions deploy workflow
f9251c5  CI safety net: tolerant types + non-blocking type/lint checks
3eadfd5  Upgrade Next.js 15.1.3 → 15.5.5 (patch CVE-2025-66478)
31a1cfd  Permissive Review type — accept nulls from scraped Trustpilot JSON
e0d6b97  Fix Vercel build: resilient reviews type + Figma-spec marquee icons
d729545  Pixel-perfect Figma alignment pass
de07d17  Remove USP bar, add marquee divider, tighten vertical rhythm
2072ccc  Use semantic border-gray-200 on marquee bottom divider
ec71b00  Add age-gate modal, desktop row buttons, remove status banner
eea3a74  Fix banner logo, italic typography, button workflow, and error handling
81c434d  Consistent editorial italic, marquee gap fix, 1s denial, centered buttons
b9798f7  Italic serif "Verification" + direct redirect + denial auto-reset + deploy config
67b7c54  Add carousel, Supabase scaffolding, performance pass, full QA fixes
f584729  Update README.md
f661804  Initial commit
```

Other branches:
- `figma-integration` — historical pixel-perfect work; mostly in sync with `main`
- `age-popup-fix` — exploration branch, can be deleted

---

## 8. Outstanding / suggested follow-ups

- [ ] **Swap Supabase placeholder** — `.env.local.example` has Supabase vars; wire the client up if you want analytics logging of verification events.
- [ ] **dataLayer events** — push `age_verified` / `age_denied` events to GTM from `AgeVerificationModal` for richer analytics. Prototype:
  ```tsx
  window.dataLayer?.push({ event: 'age_verified', outcome: 'over_18' });
  ```
- [ ] **`next lint` → ESLint CLI migration** — Next 16 will remove `next lint`; run `npx @next/codemod@canary next-lint-to-eslint-cli .` when comfortable.
- [ ] **Replace `ignoreBuildErrors: true`** — currently in `next.config.mjs` as a CI safety net for JSON shape drift. Once the Trustpilot scraper shape is stable for a few deploys, re-enable strict TS.
- [ ] **Migrate `vercel.json` → `vercel.ts`** — Vercel now recommends typed config. Install `@vercel/config` and export a typed object. (Currently no vercel.json exists; Vercel uses framework defaults, which is fine.)
- [ ] **AAAA / IPv6 on Vercel** — add an IPv6 record in IONOS once Vercel publishes a stable one (currently IPv4 only for Hobby tier).
- [ ] **Add real Trustpilot avatars** — scraper already pulls them, but many records come back with `image: null`. Could add an avatar generator (e.g. DiceBear) as a fallback before initials.
- [ ] **Lighthouse pass** — expected scores are already ~95+ but haven't been formally measured on production.

---

## 9. Gotchas to remember

1. **`next/font/google` + "Bricolage Grotesque"** occasionally fails to fetch at build time on slow/congested networks. DM Sans fallback keeps text readable. Not a blocker.
2. **Trustpilot's AWS WAF** blocks many CI / dev IPs. Scraper is designed to gracefully fall back to the seeded JSON — never fails the build.
3. **IONOS DNS "Default Site" lock** — if you can't edit A records in IONOS, disconnect the "Default Site" connection first (Domains & SSL → gear icon → Disconnect).
4. **Vercel "No Deployment" badge** usually means a security banner is blocking deploys. Settings → Security → click "Redeploy" on the red "Action Required" banner.
5. **Hero typography `not-italic` guard** is load-bearing — removing it lets font fallbacks italicize the Jood wordmark.
6. The `reviews.json` in the repo is **seeded** data. On Vercel, the `prebuild` step may overwrite it with live Trustpilot data. The file you commit to `main` is just the default.
7. `lib/supabase/*` returns `null` when env vars are absent — that's intentional so missing env doesn't break the build.

---

## 10. Handy URLs

- **Repo:** https://github.com/MomnaKhan021/Age-verification-marketing-page-nextjs
- **Vercel project:** https://vercel.com/momnakhan021s-projects/age-verification-marketing-page-nextjs
- **Custom domain:** https://momenta.rocks (once DNS propagates)
- **Figma design:** https://www.figma.com/design/t0ThvwA7kLXIjrexuf4sAN/JoodLife---New-Ads-Page
- **Target redirect:** https://joodlife.com
- **Trustpilot source:** https://www.trustpilot.com/review/joodlife.com
- **GTM container:** `GTM-5PDWS6QH`

---

## 11. How to resume in a new Claude Code profile

1. Clone locally:
   ```bash
   git clone https://github.com/MomnaKhan021/Age-verification-marketing-page-nextjs.git
   cd Age-verification-marketing-page-nextjs
   npm install
   ```
2. Open the folder in Claude Code under the new profile.
3. Paste this `HANDOFF.md` (or point Claude at it) in your first prompt so the new session has full context.
4. Optional: copy `.env.local.example` → `.env.local` and fill any keys you want active.
5. Run `npm run dev` to confirm it boots (http://localhost:3000). Modal should appear immediately.

Good luck on the next chapter 🚀
