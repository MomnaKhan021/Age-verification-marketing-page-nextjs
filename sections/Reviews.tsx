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
    <section className="bg-white py-[60px] md:py-[100px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 md:gap-10 md:px-[60px]">
        <div className="flex flex-col items-center gap-3 text-center">
          <TrustpilotBadge rating={data.rating} totalReviews={data.totalReviews} />
          <h2 className="font-display text-[28px] font-semibold leading-9 tracking-[-0.031em] text-brand-ink sm:text-[32px] md:text-[40px] md:leading-[46px]">
            3000+ happy customers
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
