'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { useAgeVerification } from '@/contexts/AgeVerificationContext';

const REDIRECT_URL = 'https://joodlife.com';

export function Hero() {
  const { verify } = useAgeVerification();
  const [blocked, setBlocked] = useState(false);
  const [pending, setPending] = useState(false);

  const onYes = useCallback(() => {
    setPending(true);
    try {
      verify(REDIRECT_URL);
    } catch (err) {
      console.error('[hero] verify failed:', err);
      setPending(false);
    }
  }, [verify]);

  const onNo = useCallback(() => {
    // Under-18 → do NOT proceed. Surface a blocking banner in-place.
    setBlocked(true);
  }, []);

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
        {/* Figma overlay: solid #142e2a at 95% opacity layered on the image */}
        <div className="absolute inset-0 bg-[#142e2a]/95" aria-hidden="true" />

        <div className="relative flex min-h-[500px] flex-col items-center justify-between gap-12 px-4 pt-6 pb-11 md:min-h-[702px] md:gap-56 md:px-[60px] md:pt-10 md:pb-20">
          <div className="flex w-full justify-center">
            <Logo className="h-[22px] w-[72px] md:h-[30px] md:w-[95px]" variant="light" />
          </div>

          <div className="flex w-full max-w-[720px] flex-col items-center gap-[26px] text-center md:gap-10">
            <div className="flex flex-col items-center gap-[18px] md:gap-6">
              {/* Explicit `not-italic` guards against any italic fallback */}
              <h1 className="font-display text-[40px] font-semibold not-italic leading-[46px] tracking-[-0.027em] text-white md:text-[60px] md:leading-[68px]">
                Age Verification
              </h1>
              <p className="max-w-[496px] text-[15px] not-italic leading-[22px] text-brand-sage md:text-[16.3px] md:leading-[19.5px]">
                You must be 18 years old to access this website. Please verify your age.
              </p>
            </div>

            {blocked ? (
              <div
                role="alert"
                aria-live="assertive"
                className="w-full max-w-[520px] rounded-lg border border-white/25 bg-white/10 px-5 py-4 text-white backdrop-blur-sm"
              >
                <p className="text-[15px] font-medium leading-[22px]">Access denied</p>
                <p className="mt-1 text-[14px] leading-[20px] text-brand-sage">
                  This website is intended for adults aged 18 or over. You cannot continue.
                </p>
              </div>
            ) : (
              /* Buttons: stacked on mobile, row on md+ (Figma node 1:795) */
              <div className="flex w-full max-w-[305px] flex-col gap-3 md:w-auto md:max-w-none md:flex-row md:gap-3">
                <Button
                  variant="primary"
                  onClick={onYes}
                  disabled={pending}
                  aria-label="I am 18 or older — continue to joodlife.com"
                >
                  {pending ? 'Redirecting…' : 'Yes, I\u2019m over 18'}
                </Button>
                <Button
                  variant="ghost"
                  onClick={onNo}
                  disabled={pending}
                  aria-label="I am under 18"
                >
                  No I&rsquo;m not
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
