import { Stars } from './Stars';

export function TrustpilotBadge() {
  return (
    <div className="flex items-center gap-2 text-sm text-brand-ink">
      <div className="flex items-center gap-1 font-semibold">
        <svg viewBox="0 0 16 16" className="h-5 w-5 text-[#00b67a]" fill="currentColor" aria-hidden="true">
          <path d="M8 1.5l1.9 4.1 4.5.5-3.3 3 .9 4.4L8 11.3 4 13.5l.9-4.4-3.3-3 4.5-.5L8 1.5z" />
        </svg>
        <span>Trustpilot</span>
      </div>
      <Stars />
      <span className="text-[13px] font-medium leading-[22px]">4.4 (50+) Reviews</span>
    </div>
  );
}
