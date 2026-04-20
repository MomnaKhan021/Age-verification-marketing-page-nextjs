import { ReviewCard, type Review } from './ReviewCard';

type Props = {
  reviews: Review[];
};

/**
 * Figma-spec review grid: 4 cards per row on desktop (≥1280), 3 on
 * lg, 2 on sm, 1 on mobile. Pure CSS grid — no JS pagination, no
 * hydration flash (SSR renders the full responsive grid).
 *
 * We render only the first 4 reviews to match Figma exactly.
 */
export function ReviewsCarousel({ reviews }: Props) {
  const visible = reviews.slice(0, 4);

  return (
    <div role="region" aria-label="Customer reviews">
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((r) => (
          <li key={(r.id ?? r.name) as string}>
            <ReviewCard review={r} />
          </li>
        ))}
      </ul>
    </div>
  );
}
