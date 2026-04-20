import { USPIcon, type USPIconName } from '@/components/ui/USPIcon';

type Item = { icon: USPIconName; label: string };

const items: Item[] = [
  { icon: 'support', label: '24-Hour WhatsApp support' },
  { icon: 'delivery', label: 'Free next-day delivery' },
  { icon: 'time', label: 'Cancel anytime' },
  { icon: 'support', label: 'On going support' },
];

/**
 * Continuous horizontal marquee. Two identical tracks slide by exactly
 * one track width for a seamless loop. The @keyframes + class rules
 * live in a component-scoped <style> tag so the animation is guaranteed
 * to ship regardless of CSS cascade or Tailwind purge behaviour.
 */
export function Marquee() {
  return (
    <section
      aria-label="Service highlights"
      className="relative overflow-hidden border-b border-gray-200 bg-white py-4 md:py-5"
    >
      <style>{`
        @keyframes joodMarqueeScroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .jood-marquee {
          display: flex;
          width: max-content;
          align-items: center;
          will-change: transform;
          animation: joodMarqueeScroll 35s linear infinite;
        }
        .jood-marquee:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .jood-marquee { animation: none; }
        }
        .jood-marquee-track {
          display: flex;
          flex-shrink: 0;
          align-items: center;
        }
      `}</style>
      <div className="mask-fade-x">
        <div className="jood-marquee">
          <MarqueeTrack />
          <MarqueeTrack ariaHidden />
        </div>
      </div>
    </section>
  );
}

function MarqueeTrack({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      className="jood-marquee-track"
      aria-hidden={ariaHidden}
      role={ariaHidden ? 'presentation' : 'list'}
    >
      {items.map((item, i) => (
        <li
          key={i}
          className="mr-14 flex shrink-0 items-center gap-3 whitespace-nowrap md:mr-16"
        >
          <USPIcon name={item.icon} className="h-7 w-7 text-brand-ink md:h-8 md:w-8" />
          <span className="text-[15px] font-medium leading-[21px] text-brand-ink md:text-[16px]">
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
