'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Stars } from './Stars';

/**
 * Review is deliberately permissive about nulls because the scraper's
 * JSON payload mirrors Trustpilot's API which returns null for any
 * missing field. TypeScript infers those nulls when we import the
 * static `data/reviews.json`, so the type has to accept them.
 */
export type Review = {
  id?: string | null;
  name: string;
  quote?: string | null;
  body?: string | null;
  initials?: string | null;
  image?: string | null;
  rating?: number | null;
  title?: string | null;
  date?: string | null;
};

const TRUSTPILOT_URL = 'https://www.trustpilot.com/review/joodlife.com';

function isExternal(src: string) {
  return src.startsWith('http://') || src.startsWith('https://');
}

export function ReviewCard({ review }: { review: Review }) {
  const text = (review.body ?? review.quote ?? '') as string;
  const rating = review.rating ?? 5;
  const initials = review.initials ?? undefined;
  return (
    <a
      href={TRUSTPILOT_URL}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`Read ${review.name}'s review on Trustpilot`}
      className="group flex h-full flex-col justify-between rounded-lg bg-brand-cream px-3 py-6 outline-none transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(20,46,42,0.35)] focus-visible:ring-2 focus-visible:ring-brand-ink/40"
    >
      <div className="flex flex-col gap-4">
        <Stars count={rating} />
        <p className="line-clamp-6 text-[16.3px] leading-[22px] text-[#2a2929] transition-colors duration-300 group-hover:text-[#142e2a]">
          {text}
        </p>
        <span
          aria-hidden="true"
          style={{
            display: 'block',
            width: '123px',
            height: '1px',
            backgroundColor: '#142E2A',
          }}
        />
      </div>
      <div className="mt-6 flex items-center gap-4">
        <Avatar image={review.image} initials={initials} name={review.name} />
        <div className="flex flex-col gap-2">
          <p className="text-[16px] font-semibold leading-none text-brand-ink">{review.name}</p>
          <div className="flex items-center gap-2 text-[12px] leading-[14px] text-brand-ink/80">
            <svg viewBox="0 0 14 14" className="h-[13px] w-[13px] text-[#00b67a]" fill="currentColor" aria-hidden="true">
              <path d="M5.9 9.6L3.6 7.3l-.9.9 3.2 3.2L13 4.7l-.9-.9z" />
            </svg>
            <span>Verified</span>
          </div>
        </div>
      </div>
    </a>
  );
}

function Avatar({ image, initials, name }: { image?: string | null; initials?: string; name: string }) {
  const [errored, setErrored] = useState(false);
  if (image && !errored) {
    if (isExternal(image)) {
      return (
        // External avatars (e.g. Trustpilot CDN) — plain <img> avoids needing
        // to enumerate every host in next.config.
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
      className="grid h-11 w-11 place-items-center rounded-full bg-brand-mint text-[16px] font-medium text-brand-ink"
      aria-hidden="true"
    >
      {initials || name.slice(0, 2).toUpperCase()}
    </div>
  );
}
