'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { useAgeVerification } from '@/contexts/AgeVerificationContext';

export function Hero() {
  const { verify, deny, status } = useAgeVerification();

  return (
    <section className="px-3 pt-[10px] md:px-5 md:pt-5">
      <div className="relative overflow-hidden rounded-xl md:rounded-[24px]">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="(min-width: 1440px) 1400px, 100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/30 to-black/55"
          aria-hidden="true"
        />

        <div className="relative flex min-h-[480px] flex-col items-center justify-between gap-12 px-4 py-6 sm:min-h-[560px] md:min-h-[702px] md:gap-44 md:px-16 md:py-10">
          <div className="flex w-full justify-center">
            <Logo className="h-7 w-24 md:h-[30px] md:w-[95px]" variant="light" />
          </div>

          <div className="flex w-full max-w-[720px] flex-col items-center gap-8 text-center">
            <div className="flex flex-col items-center gap-4 md:gap-6">
              <h1 className="font-display text-[36px] font-semibold leading-[42px] tracking-[-0.027em] text-white sm:text-[48px] sm:leading-[54px] md:text-[60px] md:leading-[68px]">
                Age Verification
              </h1>
              <p className="max-w-[520px] text-[15px] leading-[24px] text-brand-sage sm:text-base">
                You must be 18 years old to access this website. Please verify your age.
              </p>
              {status !== 'unknown' && (
                <p
                  className="rounded-full bg-white/15 px-4 py-1.5 text-xs text-white backdrop-blur"
                  role="status"
                >
                  {status === 'verified' ? 'Thanks — age verified.' : 'Sorry, this site is for users 18+.'}
                </p>
              )}
            </div>

            <div className="flex w-full max-w-[305px] flex-col items-stretch gap-4 sm:gap-[26px]">
              <Button variant="primary" onClick={verify} aria-label="I am 18 or older">
                Yes, I&rsquo;m over 18
              </Button>
              <Button variant="ghost" onClick={deny} aria-label="I am under 18">
                No I&rsquo;m not
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
