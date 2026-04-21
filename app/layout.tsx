import type { Metadata } from 'next';
import { Bricolage_Grotesque, DM_Sans, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
  display: 'swap',
});

// Fallback for "ITC Clearface Std" — Playfair Display is the closest free
// transitional serif with a strong italic cut.
const serif = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
  style: ['italic', 'normal'],
  display: 'swap',
});

// Google Tag Manager container ID. Overridable via env for staging / preview.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-5PDWS6QH';

export const metadata: Metadata = {
  title: 'Age Verification — Jood',
  description: 'You must be 18 years old to access this website. Please verify your age.',
  metadataBase: new URL('https://joodlife.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${display.variable} ${serif.variable}`}>
      <head>
        {/* Hero image is preloaded automatically by next/image `priority` on the
            Image component (generates a responsive preload with imageSrcSet).
            A manual <link rel="preload"> here would be a redundant duplicate. */}

        {/* Speed up the joodlife.com hop for every user who clicks "Yes, I'm
            over 18" — ALL redirects to joodlife.com are plain <a> tags with
            browser-native navigation (no script-based window.location). */}
        <link rel="dns-prefetch" href="https://joodlife.com" />
        <link rel="preconnect" href="https://joodlife.com" crossOrigin="anonymous" />
        <link rel="prefetch" href="https://joodlife.com" as="document" />

        {/* Google Tag Manager */}
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className="bg-white font-sans text-brand-ink antialiased">
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
