import { USPIcon, type USPIconName } from '@/components/ui/USPIcon';

type Item = { icon: USPIconName; label: string };

const items: Item[] = [
  { icon: 'clinicians', label: 'UK Licensed medication' },
  { icon: 'support', label: '24-Hour WhatsApp support' },
  { icon: 'delivery', label: 'Free next-day delivery' },
  { icon: 'time', label: 'Cancel anytime subscription' },
  { icon: 'support', label: 'Ongoing medical support' },
];

export function Marquee() {
  return (
    <section
      aria-label="Service highlights"
      className="relative overflow-hidden bg-white py-4"
    >
      <div className="mask-fade-x">
        <ul className="flex w-max animate-marquee items-center gap-16 will-change-transform">
          {[...items, ...items].map((item, i) => (
            <li
              key={i}
              className="flex shrink-0 items-center gap-3 whitespace-nowrap"
              aria-hidden={i >= items.length}
            >
              <span className="text-brand-navy">
                <USPIcon name={item.icon} className="h-7 w-7" />
              </span>
              <span className="text-[16px] font-medium leading-[21px] text-[#142e2a]">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
