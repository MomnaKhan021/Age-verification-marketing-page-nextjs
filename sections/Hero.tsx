'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';

const STORAGE_KEY = 'jood:age-verification';
const REDIRECT_URL = 'https://joodlife.com';
const DENIED_RESET_MS = 1000;

export function Hero() {
  const [denied, setDenied] = useState(false);

  // Auto-reset the denial UI after 2s so the buttons fade back in.
  useEffect(() => {
    if (!denied) return;
    const t = window.setTimeout(() => setDenied(false), DENIED_RESET_MS);
    return () => window.clearTimeout(t);
  }, [denied]);

  const onYes = useCallback(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ status: 'verified', verifiedAt: new Date().toISOString() }),
      );
    } catch (err) {
      // Private mode / quota — fall through to redirect regardless.
      console.warn('[hero] localStorage write failed:', err);
    }
    try {
      window.location.assign(REDIRECT_URL);
    } catch {
      window.location.href = REDIRECT_URL;
    }
  }, []);

  const onNo = useCallback(() => setDenied(true), []);

  return (
    <section className="bg-white px-3 pt-[10px] pb-0 md:px-5 md:pt-5 md:pb-[23px]">
      <div className="relative isolate overflow-hidden rounded-xl md:rounded-[24px]">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="(min-width: 1440px) 1400px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#142e2a]/95" aria-hidden="true" />

        <div className="relative flex min-h-[500px] flex-col items-center justify-between gap-12 px-4 pt-6 pb-11 md:min-h-[702px] md:gap-56 md:px-[60px] md:pt-10 md:pb-20">
          <div className="flex w-full justify-center">
            <Logo className="h-[22px] w-[72px] md:h-[30px] md:w-[95px]" variant="light" />
          </div>

          <div className="flex w-full max-w-[720px] flex-col items-center gap-[26px] text-center md:gap-10">
            <div className="flex flex-col items-center gap-[18px] md:gap-6">
              <h1 className="font-display text-[40px] font-semibold leading-[46px] tracking-[-0.027em] text-white md:text-[60px] md:leading-[68px]">
                <span className="not-italic">Age </span>
                <span className="font-serif italic font-medium">Verification</span>
              </h1>
              <p className="max-w-[496px] text-[15px] not-italic leading-[22px] text-brand-sage md:text-[16.3px] md:leading-[19.5px]">
                You must be 18 years old to access this website. Please verify your age.
              </p>
            </div>

            {/* Cross-fade between button row and denial banner — always
                centered, regardless of child width, via flex wrapper. */}
            <div className="relative flex w-full justify-center">
              <div className="relative w-full max-w-[520px]">
                <div
                  style={{
                    transition:
                      'opacity 300ms cubic-bezier(0.22,1,0.36,1), transform 300ms cubic-bezier(0.22,1,0.36,1)',
                    opacity: denied ? 0 : 1,
                    transform: denied ? 'translateY(4px)' : 'translateY(0)',
                    pointerEvents: denied ? 'none' : 'auto',
                  }}
                  className="flex justify-center"
                >
                  <div className="flex w-full max-w-[305px] flex-col gap-3 md:w-auto md:max-w-none md:flex-row md:gap-3">
                    <Button
                      variant="primary"
                      onClick={onYes}
                      aria-label="I am 18 or older — continue to joodlife.com"
                    >
                      YES, I&rsquo;M OVER 18
                    </Button>
                    <Button variant="ghost" onClick={onNo} aria-label="I am under 18">
                      NO I&rsquo;M NOT
                    </Button>
                  </div>
                </div>

                <div
                  role="alert"
                  aria-live="assertive"
                  aria-hidden={!denied}
                  style={{
                    transition:
                      'opacity 300ms cubic-bezier(0.22,1,0.36,1), transform 300ms cubic-bezier(0.22,1,0.36,1)',
                    opacity: denied ? 1 : 0,
                    transform: denied ? 'translateY(0)' : 'translateY(-4px)',
                    pointerEvents: denied ? 'auto' : 'none',
                  }}
                  className="absolute inset-x-0 top-0 mx-auto w-full max-w-[520px] rounded-lg border border-white/25 bg-white/10 px-5 py-4 text-white backdrop-blur-sm"
                >
                  <p className="text-[15px] font-medium leading-[22px]">Access denied</p>
                  <p className="mt-1 text-[14px] leading-[20px] text-brand-sage">
                    This website is intended for adults aged 18 or over. You cannot continue.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
