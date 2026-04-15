import Image from 'next/image';
import { useState } from 'react';
import { Stars } from './Stars';

export type Review = {
  id?: string;
  name: string;
  quote?: string;
  body?: string;
  initials?: string;
  image?: string | null;
  rating?: number;
  date?: string;
};

function isExternal(src: string) {
  return src.startsWith('http://') || src.startsWith('https://');
}

export function ReviewCard({ review }: { review: Review }) {
  const text = review.body ?? review.quote ?? '';
  const rating = review.rating ?? 5;
  return (
    <article className="flex h-full flex-col justify-between rounded-lg bg-brand-cream px-4 py-6 transition-shadow duration-300 hover:shadow-[0_8px_24px_-12px_rgba(20,46,42,0.18)]">
      <div className="flex flex-col gap-4">
        <Stars count={rating} />
        <p className="text-[15px] leading-[24px] text-[#2a2929] line-clamp-6">{text}</p>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <Avatar image={review.image} initials={review.initials} name={review.name} />
        <div className="flex flex-col gap-1.5">
          <p className="text-[15px] font-semibold leading-tight text-brand-ink">{review.name}</p>
          <div className="flex items-center gap-2 text-xs text-brand-ink/80">
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

function Avatar({ image, initials, name }: { image?: string | null; initials?: string; name: string }) {
  const [errored, setErrored] = useState(false);
  if (image && !errored) {
    if (isExternal(image)) {
      return (
        // External avatars (e.g. Trustpilot CDN) — use plain <img> so we don't
        // need to enumerate every host in next.config.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={name}
          width={44}
          height={44}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setErrored(true)}
          className="h-11 w-11 rounded-full object-cover"
        />
      );
    }
    return (
      <Image
        src={image}
        alt={name}
        width={44}
        height={44}
        className="h-11 w-11 rounded-full object-cover"
      />
    );
  }
  return (
    <div
      className="grid h-11 w-11 place-items-center rounded-full bg-brand-mint text-base font-medium text-brand-ink"
      aria-hidden="true"
    >
      {initials || name.slice(0, 2).toUpperCase()}
    </div>
  );
}
