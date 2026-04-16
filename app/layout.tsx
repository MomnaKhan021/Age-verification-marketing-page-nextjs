import type { Metadata } from 'next';
import { Bricolage_Grotesque, DM_Sans, Playfair_Display } from 'next/font/google';
import { AgeVerificationModal } from '@/components/ui/AgeVerificationModal';
import { AgeVerificationProvider } from '@/contexts/AgeVerificationContext';
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

export const metadata: Metadata = {
  title: 'Age Verification — Jood',
  description: 'You must be 18 years old to access this website. Please verify your age.',
  metadataBase: new URL('https://joodlife.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${display.variable} ${serif.variable}`}>
      <head>
        <link rel="preload" as="image" href="/images/hero.jpg" fetchPriority="high" />
      </head>
      <body className="bg-white font-sans text-brand-ink antialiased">
        <AgeVerificationProvider>
          {children}
          <AgeVerificationModal />
        </AgeVerificationProvider>
      </body>
    </html>
  );
}
