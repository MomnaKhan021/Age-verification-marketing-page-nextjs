import { ReviewCard, type Review } from '@/components/ui/ReviewCard';
import { TrustpilotBadge } from '@/components/ui/TrustpilotBadge';

const reviews: Review[] = [
  {
    name: 'Hayley Churchyard',
    initials: 'HC',
    quote:
      'My medication always arrives well packaged and promptly and I don\u2019t have to answer hundreds of questions to receive it',
  },
  {
    name: 'Gillian Rhodes',
    image: '/images/gillian.jpg',
    quote:
      'Always helpful and understanding. I did find it difficult to order at first but soon got the hang of it I am a bit of a dianasor when it comes to technology!! Brilliant company ordered then collect fr...',
  },
  {
    name: 'Jacqueline Riley',
    initials: 'JR',
    quote:
      'I\u2019ve had a fantastic experience with Jood life, quick service, support on hand 24/7, reasonable prices and no pressure to constantly buy injections',
  },
  {
    name: 'Mike',
    initials: 'MI',
    quote:
      'For me personally it\u2019s perfect. I started at 161kg (25st plus) I\u2019m currently at 122kg (19.2st) I\u2019m 9 months in to a 2 year program. My life has changed completely, my health is loads better...',
  },
];

export function Reviews() {
  return (
    <section className="bg-white py-16 md:py-[100px]">
      <div className="mx-auto max-w-[1440px] px-4 md:px-[60px]">
        <div className="flex flex-col items-center gap-3 text-center">
          <TrustpilotBadge />
          <h2 className="font-display text-[32px] font-semibold leading-9 tracking-[-0.031em] text-brand-ink md:text-[40px] md:leading-[46px]">
            3000+ happy customers
          </h2>
          <p className="max-w-[780px] text-[15px] leading-6 text-brand-ink md:text-base">
            Thousands have trusted Jood for safe, clinically guided weight-loss care. Our patients
            value the expert support, clear communication, and lasting results that make every
            journey unique.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto md:mt-[60px]">
          <ul className="flex w-max gap-5 px-1 pb-2 md:w-full md:justify-between md:px-0">
            {reviews.map((review, i) => (
              <li key={i} className="flex">
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
