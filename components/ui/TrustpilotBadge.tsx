import { Stars } from './Stars';

type Props = {
  rating?: number;
  totalReviews?: number;
};

export function TrustpilotBadge({ rating = 4.4, totalReviews = 50 }: Props) {
  const display = rating.toFixed(1);
  return (
    <a
      href="https://www.trustpilot.com/review/joodlife.com"
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex items-center gap-2 rounded-md text-sm text-brand-ink transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/40"
    >
      <span className="flex items-center gap-1 font-semibold">
        <svg viewBox="0 0 16 16" className="h-5 w-5 text-[#00b67a]" fill="currentColor" aria-hidden="true">
          <path d="M8 1.5l1.9 4.1 4.5.5-3.3 3 .9 4.4L8 11.3 4 13.5l.9-4.4-3.3-3 4.5-.5L8 1.5z" />
        </svg>
        <span>Trustpilot</span>
      </span>
      <Stars />
      <span className="text-[13px] font-medium leading-[22px]">
        {display} ({totalReviews}+) Reviews
      </span>
    </a>
  );
}
