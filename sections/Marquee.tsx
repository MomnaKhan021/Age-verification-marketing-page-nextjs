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
 * Continuous horizontal marquee, Figma-spec (Component 139):
 *  - 32×32 icons in brand navy
 *  - 16px / 21px DM Sans label at brand-ink
 *  - uniform 56px/64px margin between items; seamless 2× loop
 */
export function Marquee() {
  const track = [...items, ...items];

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
              className="mr-14 flex shrink-0 items-center gap-3 whitespace-nowrap md:mr-16"
              aria-hidden={i >= items.length}
            >
              <USPIcon name={item.icon} className="h-7 w-7 text-brand-navy md:h-8 md:w-8" />
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
