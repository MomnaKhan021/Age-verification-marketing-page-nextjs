'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ReviewCard, type Review } from './ReviewCard';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type Props = {
  reviews: Review[];
};

export function ReviewsCarousel({ reviews }: Props) {
  const reduced = usePrefersReducedMotion();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(1);

  useEffect(() => {
    function compute() {
      const w = window.innerWidth;
      if (w >= 1280) setPageSize(4);
      else if (w >= 1024) setPageSize(3);
      else if (w >= 640) setPageSize(2);
      else setPageSize(1);
    }
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(reviews.length / pageSize)),
    [reviews.length, pageSize],
  );

  useEffect(() => {
    if (page >= totalPages) setPage(0);
  }, [page, totalPages]);

  const goTo = useCallback(
    (i: number) => setPage(((i % totalPages) + totalPages) % totalPages),
    [totalPages],
  );
  const next = useCallback(() => goTo(page + 1), [goTo, page]);
  const prev = useCallback(() => goTo(page - 1), [goTo, page]);

  return (
    <div className="relative" role="region" aria-roledescription="carousel" aria-label="Customer reviews">
      <div className="overflow-hidden">
        <motion.ul
          className="flex"
          animate={{ x: `-${page * 100}%` }}
          transition={{
            type: 'tween',
            ease: [0.22, 1, 0.36, 1],
            duration: reduced ? 0 : 0.55,
          }}
        >
          {Array.from({ length: totalPages }).map((_, p) => {
            const slice = reviews.slice(p * pageSize, p * pageSize + pageSize);
            return (
              <li key={p} className="w-full shrink-0">
                <div
                  className="grid gap-5"
                  style={{ gridTemplateColumns: `repeat(${pageSize}, minmax(0, 1fr))` }}
                  aria-hidden={p !== page}
                >
                  {slice.map((r) => (
                    <ReviewCard key={r.id ?? r.name} review={r} />
                  ))}
                </div>
              </li>
            );
          })}
        </motion.ul>
      </div>

      {totalPages > 1 && (
        <>
          <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Review pages">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                role="tab"
                type="button"
                aria-selected={i === page}
                aria-label={`Go to page ${i + 1}`}
                onClick={() => goTo(i)}
                className={
                  'h-2 rounded-full transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/40 ' +
                  (i === page
                    ? 'w-8 bg-brand-ink'
                    : 'w-2 bg-brand-ink/25 hover:bg-brand-ink/45')
                }
              />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between md:flex">
            <button
              type="button"
              aria-label="Previous reviews"
              onClick={prev}
              className="pointer-events-auto -ml-4 grid h-10 w-10 place-items-center rounded-full bg-white text-brand-ink shadow-md ring-1 ring-black/5 transition-all duration-300 ease-out hover:-translate-x-[1px] hover:scale-105 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/40"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13L5 8l5-5" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next reviews"
              onClick={next}
              className="pointer-events-auto -mr-4 grid h-10 w-10 place-items-center rounded-full bg-white text-brand-ink shadow-md ring-1 ring-black/5 transition-all duration-300 ease-out hover:translate-x-[1px] hover:scale-105 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/40"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3l5 5-5 5" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
