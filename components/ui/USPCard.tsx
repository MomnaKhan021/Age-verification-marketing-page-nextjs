import { USPIcon, type USPIconName } from './USPIcon';

export type USPItem = {
  icon: USPIconName;
  title: string;
  description: string;
};

export function USPCard({ item }: { item: USPItem }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-navy text-white">
        <USPIcon name={item.icon} className="h-[22px] w-[22px]" />
      </div>
      <div className="flex flex-col gap-1.5 text-brand-navy">
        <p className="text-[18px] font-medium leading-6">{item.title}</p>
        <p className="text-[15px] leading-[21px] text-brand-navy/90">{item.description}</p>
      </div>
    </div>
  );
}
