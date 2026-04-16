'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from './Button';
import { Logo } from './Logo';
import { useAgeVerification } from '@/contexts/AgeVerificationContext';

const REDIRECT_URL = 'https://joodlife.com';

/**
 * Strict age-verification gate shown on first visit.
 * - Mandatory: only "Yes, I'm over 18" closes it (then redirects).
 * - Dims + blurs the page. Body scroll locked. Background focus blocked.
 * - Keyboard: Tab cycles between Yes / No, Escape does nothing.
 * - Persistence: reads AgeVerificationContext, which is backed by localStorage.
 */
export function AgeVerificationModal() {
  const { ready, status, verify } = useAgeVerification();
  const [denied, setDenied] = useState(false);
  const yesRef = useRef<HTMLButtonElement>(null);
  const noRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = 'age-gate-title';
  const descId = 'age-gate-desc';

  const shouldShow = ready && status !== 'verified';

  // Body scroll lock while the modal is open.
  useEffect(() => {
    if (!shouldShow) return;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarW > 0) document.body.style.paddingRight = `${scrollbarW}px`;
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [shouldShow]);

  // Auto-focus on the Yes button when the modal mounts.
  useEffect(() => {
    if (!shouldShow) return;
    const t = window.setTimeout(() => yesRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [shouldShow]);

  // Focus trap + swallow Escape.
  useEffect(() => {
    if (!shouldShow) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        return;
      }
      if (e.key !== 'Tab') return;
      const active = document.activeElement;
      if (e.shiftKey) {
        if (active === yesRef.current || !dialogRef.current?.contains(active)) {
          e.preventDefault();
          noRef.current?.focus();
        }
      } else {
        if (active === noRef.current || !dialogRef.current?.contains(active)) {
          e.preventDefault();
          yesRef.current?.focus();
        }
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [shouldShow]);

  const onYes = useCallback(() => {
    verify(REDIRECT_URL);
  }, [verify]);

  const onNo = useCallback(() => {
    setDenied(true);
  }, []);

  const hint = useMemo(
    () =>
      denied
        ? 'This website is intended for adults aged 18 or over. We cannot allow access.'
        : 'You must be 18 years or older to enter this website.',
    [denied],
  );

  if (!shouldShow) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#142e2a]/60 p-4 backdrop-blur-md"
      aria-hidden={false}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="relative grid w-full max-w-[880px] overflow-hidden rounded-2xl bg-white shadow-[0_30px_80px_-30px_rgba(20,46,42,0.45)] md:grid-cols-2"
      >
        {/* Left column — content */}
        <div className="flex flex-col items-center justify-center gap-6 px-6 py-10 text-center md:px-10 md:py-12">
          <Logo className="h-8 w-[100px]" variant="dark" />
          <div className="flex flex-col items-center gap-2">
            <h2
              id={titleId}
              className="font-display text-[24px] font-semibold leading-[30px] tracking-[-0.02em] text-brand-ink md:text-[28px] md:leading-[34px]"
            >
              Please confirm your age
            </h2>
            <p id={descId} className="text-[15px] leading-[22px] text-brand-ink/70">
              Are you at least 18 years old?
            </p>
          </div>

          {denied && (
            <p
              role="alert"
              className="w-full rounded-md border border-[#e5e7eb] bg-[#fff6f6] px-4 py-2 text-[13px] leading-[18px] text-[#8b1d1d]"
            >
              {hint}
            </p>
          )}

          <div className="flex w-full flex-col gap-3 sm:max-w-[360px] sm:flex-row sm:gap-3">
            <button
              ref={yesRef}
              type="button"
              onClick={onYes}
              className="inline-flex h-[50px] flex-1 select-none items-center justify-center whitespace-nowrap rounded-lg border border-brand-ink bg-brand-ink px-6 text-[15px] font-medium tracking-[-0.02em] text-white shadow-sm transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[1px] hover:shadow-md active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/60 focus-visible:ring-offset-2"
            >
              Yes, I&rsquo;m over 18
            </button>
            <button
              ref={noRef}
              type="button"
              onClick={onNo}
              className="inline-flex h-[50px] flex-1 select-none items-center justify-center whitespace-nowrap rounded-lg border border-brand-ink/20 bg-white px-6 text-[15px] font-medium tracking-[-0.02em] text-brand-ink transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-brand-ink/5 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/60 focus-visible:ring-offset-2"
            >
              No
            </button>
          </div>

          <p className="max-w-[360px] text-[12px] leading-[18px] text-brand-ink/55">
            By entering this site you are agreeing to the{' '}
            <a
              href="https://joodlife.com/terms"
              target="_blank"
              rel="noreferrer noopener"
              className="underline underline-offset-2 hover:text-brand-ink"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href="https://joodlife.com/privacy"
              target="_blank"
              rel="noreferrer noopener"
              className="underline underline-offset-2 hover:text-brand-ink"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>

        {/* Right column — hero-style image panel */}
        <div className="relative hidden min-h-[380px] overflow-hidden bg-[#142e2a] md:block">
          <Image
            src="/images/hero.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 440px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#142e2a]/40" aria-hidden="true" />
          <div className="absolute inset-0 flex items-end justify-center p-8">
            <p className="text-center text-[13px] leading-[20px] text-white/85">
              Clinician-led, evidence-based weight-loss care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
