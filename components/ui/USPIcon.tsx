export type USPIconName = 'clinicians' | 'time' | 'support' | 'delivery';

type Props = {
  name: USPIconName;
  className?: string;
};

/**
 * Crisp line-icons at Figma's spec size (32×32 via h-8 w-8). The real Figma
 * sources are a mask-only external library that can't be exported, so these
 * are hand-drawn to match the same visual rhythm — round caps, 1.75-stroke
 * weight, 24px safe area inside a 32px frame. Color is `currentColor` so
 * callers set it via the wrapping `text-…` utility.
 */
export function USPIcon({ name, className = 'h-8 w-8' }: Props) {
  const common = {
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  switch (name) {
    case 'clinicians':
      // Person with medical cross
      return (
        <svg {...common} className={className}>
          <circle cx="14" cy="12" r="4.5" />
          <path d="M6 26a8 8 0 0 1 16 0" />
          <path d="M24 8v6M21 11h6" />
        </svg>
      );
    case 'time':
      // Clock
      return (
        <svg {...common} className={className}>
          <circle cx="16" cy="16" r="11" />
          <path d="M16 9v7l4.5 2.5" />
        </svg>
      );
    case 'support':
      // Headset / chat bubble
      return (
        <svg {...common} className={className}>
          <path d="M6 18v-2a10 10 0 0 1 20 0v2" />
          <path d="M6 18a2 2 0 0 1 2-2h2v6H8a2 2 0 0 1-2-2v-2Z" />
          <path d="M26 18a2 2 0 0 0-2-2h-2v6h2a2 2 0 0 0 2-2v-2Z" />
          <path d="M22 22v1a3 3 0 0 1-3 3h-2" />
        </svg>
      );
    case 'delivery':
      // Van
      return (
        <svg {...common} className={className}>
          <path d="M3 8h13v14H3z" />
          <path d="M16 12h5l4 4v6h-9" />
          <circle cx="9" cy="24" r="2.25" />
          <circle cx="22" cy="24" r="2.25" />
        </svg>
      );
  }
}
