import { USPIcon, type USPIconName } from '@/components/ui/USPIcon';

type Item = { icon: USPIconName; label: string };

const items: Item[] = [
  { icon: 'clinicians', label: 'UK Licensed medication' },
  { icon: 'support', label: '24-Hour WhatsApp support' },
  { icon: 'delivery', label: 'Free next-day delivery' },
  { icon: 'time', label: 'Cancel anytime subscription' },
  { icon: 'support', label: 'Ongoing medical support' },
];

/**
 * Continuous marquee. Never pauses. Seamless loop via 2× duplicated items.
 * - No top border (per design).
 * - Subtle bottom divider in design-system grey to separate from Reviews.
 */
export function Marquee() {
  return (
    <section
      aria-label="Service highlights"
      className="relative overflow-hidden border-b border-[#e5e7eb] bg-white py-4 md:py-5"
    >
      <div className="mask-fade-x">
        <ul className="flex w-max animate-marquee items-center gap-12 will-change-transform sm:gap-16">
          {[...items, ...items].map((item, i) => (
            <li
              key={i}
              className="flex shrink-0 items-center gap-3 whitespace-nowrap"
              aria-hidden={i >= items.length}
            >
              <span className="text-brand-navy">
                <USPIcon name={item.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
              </span>
              <span className="text-[15px] font-medium leading-[21px] text-[#142e2a] sm:text-[16px]">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
