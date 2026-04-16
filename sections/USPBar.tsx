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
    <section className="bg-white pt-6 pb-6 md:pt-5 md:pb-0">
      <div className="mx-auto max-w-[1440px] px-5 md:px-5 lg:px-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4 lg:divide-x lg:divide-[#d9d9d9]">
          {items.map((item, i) => (
            <div
              key={item.title + i}
              className="lg:px-4 first:lg:pl-0 last:lg:pr-0"
            >
              <USPCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
