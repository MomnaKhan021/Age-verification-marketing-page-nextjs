import Link from 'next/link';
import { forwardRef } from 'react';

type Variant = 'primary' | 'ghost';

type ButtonProps = {
  variant?: Variant;
  href?: string;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-lg px-12 py-[15px] text-base font-medium leading-5 transition-colors';

const variants: Record<Variant, string> = {
  primary: 'bg-white text-brand-ink hover:bg-white/90',
  ghost: 'border border-white/80 text-white hover:bg-white/10',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', href, className = '', children, ...rest }, ref) => {
    const cls = `${baseClasses} ${variants[variant]} ${className}`;
    if (href) {
      return (
        <Link href={href} className={cls}>
          {children}
        </Link>
      );
    }
    return (
      <button ref={ref} className={cls} {...rest}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
