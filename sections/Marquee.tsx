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
 * Continuous horizontal marquee.
 * - Never pauses.
 * - 2× duplicated with an explicit margin-right on every item (including
 *   the last of each cycle) so the seam between cycles has the same gap
 *   as between siblings — no visual jitter at the wrap point.
 * - Icon + label pairs are each a flex item with fixed inner gap for
 *   perfectly consistent rhythm.
 */
export function Marquee() {
  const track = [...items, ...items];
  const ITEM_GAP = 'mr-14 md:mr-16'; // 56px / 64px, applied uniformly

  return (
    <section
      aria-label="Service highlights"
      className="relative overflow-hidden border-b border-gray-200 bg-white py-4 md:py-5"
    >
      <div className="mask-fade-x">
        <ul className="flex w-max animate-marquee items-center will-change-transform">
          {track.map((item, i) => (
            <li
              key={i}
              className={`flex shrink-0 items-center gap-3 whitespace-nowrap ${ITEM_GAP}`}
              aria-hidden={i >= items.length}
            >
              <span className="text-brand-navy" aria-hidden="true">
                <USPIcon name={item.icon} className="h-6 w-6 md:h-7 md:w-7" />
              </span>
              <span className="text-[15px] font-medium leading-[21px] text-[#142e2a] md:text-[16px]">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
