import { USPCard, type USPItem } from '@/components/ui/USPCard';

const items: USPItem[] = [
  {
    icon: 'clinicians',
    title: 'Ongoing clinical support',
    description: 'Access expert clinicians and medical advice.',
  },
  {
    icon: 'time',
    title: 'Pause or cancel any time',
    description: "You're always in control of your treatment.",
  },
  {
    icon: 'support',
    title: 'Clinical support',
    description: 'Access expert clinicians and medical advice.',
  },
  {
    icon: 'delivery',
    title: 'Free, discreet delivery',
    description: 'No names, no logos, no delivery fee.',
  },
];

export function USPBar() {
  return (
    <section className="bg-white py-8 md:py-[30px]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-0 md:divide-x md:divide-[#d9d9d9]">
          {items.map((item, i) => (
            <div key={item.title + i} className="md:px-4 lg:px-6 first:md:pl-0 last:md:pr-0">
              <USPCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
