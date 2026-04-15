'use client';

import Link from 'next/link';
import { forwardRef } from 'react';

type Variant = 'primary' | 'ghost';

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkProps = CommonProps & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

const baseClasses =
  'inline-flex select-none items-center justify-center gap-2 rounded-lg px-12 py-[15px] text-base font-medium leading-5 transition-all duration-200 ease-out active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary: 'bg-white text-brand-ink shadow-sm hover:bg-white/95 hover:shadow-md',
  ghost: 'border border-white/80 text-white hover:bg-white/15 hover:border-white',
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps | LinkProps>(
  (props, ref) => {
    const { variant = 'primary', className = '', children, ...rest } = props as CommonProps & {
      href?: string;
    } & Record<string, unknown>;
    const cls = `${baseClasses} ${variants[variant]} ${className}`;
    if ('href' in rest && rest.href) {
      const { href, ...anchorRest } = rest as { href: string };
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cls}
          {...(anchorRest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </Link>
      );
    }
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={cls}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
