import { ReviewsCarousel } from '@/components/ui/ReviewsCarousel';
import { TrustpilotBadge } from '@/components/ui/TrustpilotBadge';
import reviewsData from '@/data/reviews.json';
import type { Review } from '@/components/ui/ReviewCard';

type ReviewsPayload = {
  source?: string;
  fetchedAt?: string | null;
  rating?: number | null;
  totalReviews?: number | null;
  reviews: Review[];
};

const DEFAULT_RATING = 4.4;
const DEFAULT_TOTAL = 50;

export function Reviews() {
  // Cast via `unknown` so TS doesn't try to narrow the (possibly null)
  // rating/totalReviews fields — the scraper may set them to null when
  // Trustpilot returns no score, and we fall back to sensible defaults.
  const data = reviewsData as unknown as ReviewsPayload;
  const rating = data.rating ?? DEFAULT_RATING;
  const totalReviews = data.totalReviews ?? DEFAULT_TOTAL;

  return (
    <section className="bg-white py-[60px] md:py-[100px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 md:gap-10 md:px-[60px]">
        <div className="flex flex-col items-center gap-3 text-center">
          <TrustpilotBadge rating={rating} totalReviews={totalReviews} />
          <h2 className="font-display text-[28px] font-semibold leading-9 tracking-[-0.031em] text-brand-ink sm:text-[32px] md:text-[40px] md:leading-[46px]">
            <span className="not-italic">3000+ happy </span>
            <span className="font-serif italic font-medium">customers</span>
          </h2>
          <p className="max-w-[780px] text-[15px] leading-[22px] text-brand-ink md:text-[16.3px] md:leading-[19.5px]">
            Thousands have trusted Jood for safe, clinically guided weight-loss care. Our patients
            value the expert support, clear communication, and lasting results that make every
            journey unique.
          </p>
        </div>

        <ReviewsCarousel reviews={data.reviews} />
      </div>
    </section>
  );
}
