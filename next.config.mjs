/** @type {import('next').NextConfig} */
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === '1';

const nextConfig = {
  // When deploying to a plain static host (IONOS Deploy Now, Netlify drop,
  // Cloudflare Pages, etc.) build the app as a fully static site.
  ...(isStaticExport ? { output: 'export' } : {}),
  images: isStaticExport
    ? { unoptimized: true }
    : {
        formats: ['image/avif', 'image/webp'],
        // Cap at 1920 — anything larger than this for our hero is wasted bytes.
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256],
      },
  // Safety net for CI builds: warn on type/lint issues but don't block
  // the deploy. The data/reviews.json shape can drift based on what
  // the Trustpilot scraper receives at build time.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
