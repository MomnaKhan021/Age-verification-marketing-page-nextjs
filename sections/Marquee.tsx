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
  const loop = [...items, ...items, ...items];
  return (
    <section className="overflow-hidden border-y border-[#ececec] bg-white py-4">
      <div className="mask-fade-x">
        <ul className="flex w-max animate-marquee items-center gap-16">
          {loop.map((item, i) => (
            <li
              key={i}
              className="flex shrink-0 items-center gap-3 whitespace-nowrap text-brand-ink"
            >
              <span className="text-brand-navy">
                <USPIcon name={item.icon} className="h-8 w-8" />
              </span>
              <span className="text-base font-medium leading-5 text-[#3d3838]">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
