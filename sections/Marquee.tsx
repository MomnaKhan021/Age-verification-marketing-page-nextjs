import { USPIcon, type USPIconName } from '@/components/ui/USPIcon';

type Item = { icon: USPIconName; label: string };

const items: Item[] = [
  { icon: 'support', label: '24-Hour WhatsApp support' },
  { icon: 'delivery', label: 'Free next-day delivery' },
  { icon: 'time', label: 'Cancel anytime' },
  { icon: 'support', label: 'On going support' },
];

/**
 * Continuous horizontal marquee, Figma-spec (Component 139).
 * Two identical tracks slide left by exactly 100% of one track width —
 * seamless loop regardless of content length.
 */
export function Marquee() {
  return (
    <section
      aria-label="Service highlights"
      className="relative overflow-hidden border-b border-gray-200 bg-white py-4 md:py-5"
    >
      <div className="mask-fade-x">
        <div className="flex w-max animate-marquee items-center will-change-transform">
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
      className="flex shrink-0 items-center"
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
