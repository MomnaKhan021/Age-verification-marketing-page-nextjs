type LogoProps = {
  className?: string;
  variant?: 'light' | 'dark';
};

export function Logo({ className = '', variant = 'light' }: LogoProps) {
  const fill = variant === 'light' ? '#ffffff' : '#142e2a';
  return (
    <svg
      viewBox="0 0 95 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Jood"
    >
      <path
        d="M8.5 4h4v14.2c0 4-2.1 6.1-5.9 6.1-2.3 0-4.3-.8-5.6-2.3l2.4-2.6c.8.9 1.7 1.3 2.9 1.3 1.5 0 2.2-.7 2.2-2.7V4Z"
        fill={fill}
      />
      <path
        d="M27.1 24.3c-5.1 0-8.9-3.6-8.9-8.5s3.8-8.5 8.9-8.5 8.9 3.6 8.9 8.5-3.8 8.5-8.9 8.5Zm0-3.7c2.6 0 4.6-1.9 4.6-4.8s-2-4.8-4.6-4.8-4.6 1.9-4.6 4.8 2 4.8 4.6 4.8Z"
        fill={fill}
      />
      <path
        d="M47.6 24.3c-5.1 0-8.9-3.6-8.9-8.5s3.8-8.5 8.9-8.5 8.9 3.6 8.9 8.5-3.8 8.5-8.9 8.5Zm0-3.7c2.6 0 4.6-1.9 4.6-4.8s-2-4.8-4.6-4.8-4.6 1.9-4.6 4.8 2 4.8 4.6 4.8Z"
        fill={fill}
      />
      <path
        d="M68.3 3h4.2v21h-4V22c-1.1 1.5-3 2.3-5.2 2.3-4.5 0-8-3.4-8-8.5s3.5-8.5 8-8.5c2 0 3.8.7 5 2V3Zm-4.1 17.6c2.5 0 4.4-1.9 4.4-4.8s-1.9-4.8-4.4-4.8-4.4 1.9-4.4 4.8 1.9 4.8 4.4 4.8Z"
        fill={fill}
      />
    </svg>
  );
}
