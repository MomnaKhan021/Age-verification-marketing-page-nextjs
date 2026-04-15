import { ReviewsCarousel } from '@/components/ui/ReviewsCarousel';
import { TrustpilotBadge } from '@/components/ui/TrustpilotBadge';
import reviewsData from '@/data/reviews.json';
import type { Review } from '@/components/ui/ReviewCard';

export function Reviews() {
  const data = reviewsData as {
    rating: number;
    totalReviews: number;
    reviews: Review[];
  };

  return (
    <section className="bg-white py-16 md:py-[100px]">
      <div className="mx-auto max-w-[1440px] px-4 md:px-[60px]">
        <div className="flex flex-col items-center gap-3 text-center">
          <TrustpilotBadge rating={data.rating} totalReviews={data.totalReviews} />
          <h2 className="font-display text-[28px] font-semibold leading-9 tracking-[-0.031em] text-brand-ink sm:text-[32px] md:text-[40px] md:leading-[46px]">
            3000+ happy customers
          </h2>
          <p className="max-w-[780px] text-[15px] leading-6 text-brand-ink md:text-base">
            Thousands have trusted Jood for safe, clinically guided weight-loss care. Our patients
            value the expert support, clear communication, and lasting results that make every
            journey unique.
          </p>
        </div>

        <div className="mt-10 md:mt-[60px]">
          <ReviewsCarousel reviews={data.reviews} />
        </div>
      </div>
    </section>
  );
}
