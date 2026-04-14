type StarsProps = {
  count?: number;
  className?: string;
};

export function Stars({ count = 5, className = '' }: StarsProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="flex h-4 w-4 items-center justify-center bg-[#00b67a]"
          aria-hidden="true"
        >
          <svg viewBox="0 0 16 16" className="h-3 w-3 text-white" fill="currentColor">
            <path d="M8 1.5l1.9 4.1 4.5.5-3.3 3 .9 4.4L8 11.3 4 13.5l.9-4.4-3.3-3 4.5-.5L8 1.5z" />
          </svg>
        </span>
      ))}
    </div>
  );
}
