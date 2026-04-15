'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { useAgeVerification } from '@/contexts/AgeVerificationContext';

export function Hero() {
  const { verify, deny } = useAgeVerification();

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
              <h1 className="font-display text-[40px] font-semibold leading-[46px] tracking-[-0.027em] text-white md:text-[60px] md:leading-[68px]">
                Age Verification
              </h1>
              <p className="max-w-[496px] text-[15px] leading-[22px] text-brand-sage md:text-[16.3px] md:leading-[19.5px]">
                You must be 18 years old to access this website. Please verify your age.
              </p>
            </div>

            {/* Buttons: stacked on mobile (Figma mobile), row on md+ (Figma 1:795 desktop) */}
            <div className="flex w-full max-w-[305px] flex-col gap-3 md:w-auto md:max-w-none md:flex-row md:gap-3">
              <Button variant="primary" onClick={() => verify()} aria-label="I am 18 or older">
                Yes, I&rsquo;m over 18
              </Button>
              <Button variant="ghost" onClick={() => deny()} aria-label="I am under 18">
                No I&rsquo;m not
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
