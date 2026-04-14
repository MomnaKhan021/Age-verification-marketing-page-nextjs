import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './sections/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: '#142e2a',
          navy: '#21346e',
          blue: '#477eff',
          cream: '#f7f9f2',
          mint: '#daffe0',
          sage: '#d3dabe',
          muted: '#3d3838',
          slate: '#2a2929',
          green: '#00b67a',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Gilroy', 'ui-sans-serif', 'system-ui'],
        sans: ['var(--font-sans)', 'DM Sans', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        'hero': ['60px', { lineHeight: '68px', letterSpacing: '-0.027em' }],
        'hero-m': ['40px', { lineHeight: '46px', letterSpacing: '-0.027em' }],
        'h2': ['32px', { lineHeight: '36px', letterSpacing: '-0.031em' }],
      },
      borderRadius: {
        '2xl': '24px',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
