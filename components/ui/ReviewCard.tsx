import Image from 'next/image';
import { Stars } from './Stars';

export type Review = {
  name: string;
  quote: string;
  initials?: string;
  image?: string;
};

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex h-full w-[315px] shrink-0 flex-col justify-between rounded-lg bg-brand-cream px-3 py-6">
      <div className="flex flex-col gap-4">
        <Stars />
        <p className="text-[16px] leading-[24px] text-[#2a2929]">
          {review.quote}
        </p>
      </div>
      <div className="mt-6 flex items-center gap-4">
        {review.image ? (
          <Image
            src={review.image}
            alt={review.name}
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-mint text-base font-medium text-brand-ink">
            {review.initials}
          </div>
        )}
        <div className="flex flex-col gap-2">
          <p className="text-[15px] font-semibold leading-none text-brand-ink">{review.name}</p>
          <div className="flex items-center gap-2 text-xs text-brand-ink">
            <svg viewBox="0 0 14 14" className="h-3 w-3 text-[#00b67a]" fill="currentColor" aria-hidden="true">
              <path d="M5.9 9.6L3.6 7.3l-.9.9 3.2 3.2L13 4.7l-.9-.9z" />
            </svg>
            <span>Verified</span>
          </div>
        </div>
      </div>
    </article>
  );
}
