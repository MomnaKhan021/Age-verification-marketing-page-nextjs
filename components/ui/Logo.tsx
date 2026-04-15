type LogoProps = {
  className?: string;
  variant?: 'light' | 'dark';
};

/**
 * The actual Jood wordmark, exported from Figma (node 1:801).
 * Served as a static SVG so it's always upright and sharp at any size —
 * never hand-drawn approximations, never italic due to font fallbacks.
 */
export function Logo({ className = '', variant = 'light' }: LogoProps) {
  const src = variant === 'light' ? '/images/jood-logo-light.svg' : '/images/jood-logo-dark.svg';
  return (
    // Static SVG; no need for next/image optimization. eslint: plain <img> is intentional.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Jood"
      width={95}
      height={30}
      decoding="async"
      className={`inline-block select-none ${className}`}
      draggable={false}
    />
  );
}
