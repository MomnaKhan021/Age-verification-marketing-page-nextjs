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
  'inline-flex h-[50px] w-full select-none items-center justify-center rounded-lg px-[50px] text-[16.3px] font-medium leading-[19.5px] tracking-[-0.02em] transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
    'border border-[#0c2421]/90 bg-white text-[#142f2b] shadow-[0_1px_2px_rgba(20,46,42,0.08)] hover:-translate-y-[1px] hover:shadow-[0_6px_18px_-6px_rgba(20,46,42,0.35)]',
  ghost:
    'border border-white text-white hover:bg-white/10 hover:-translate-y-[1px] hover:shadow-[0_6px_18px_-6px_rgba(255,255,255,0.2)]',
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
