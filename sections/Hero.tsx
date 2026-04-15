import Image from 'next/image';
import { Logo } from '@/components/ui/Logo';

/**
 * Hero / Age Verification splash.
 *
 * This is the passive marketing visual seen AFTER the user confirms
 * their age in <AgeVerificationModal />. The modal owns the actual
 * verification action — this section contains no duplicate buttons,
 * state, or gate logic.
 */
export function Hero() {
  return (
    <section className="bg-white px-3 pt-[10px] pb-0 md:px-5 md:pt-5 md:pb-[23px]">
      <div className="group relative isolate overflow-hidden rounded-xl md:rounded-[24px]">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="(min-width: 1440px) 1400px, 100vw"
          className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
        />
        {/* Figma overlay: solid #142e2a at 95% opacity layered on the image */}
        <div className="absolute inset-0 bg-[#142e2a]/95" aria-hidden="true" />

        <div className="relative flex min-h-[500px] flex-col items-center justify-between gap-12 px-4 pt-6 pb-11 md:min-h-[702px] md:gap-56 md:px-[60px] md:pt-10 md:pb-20">
          <div className="flex w-full justify-center">
            <Logo className="h-[22px] w-[72px] md:h-[30px] md:w-[95px]" variant="light" />
          </div>

          <div className="flex w-full max-w-[720px] flex-col items-center gap-[18px] text-center md:gap-6">
            <h1 className="font-display text-[40px] font-semibold leading-[46px] tracking-[-0.027em] text-white md:text-[60px] md:leading-[68px]">
              Age Verification
            </h1>
            <p className="max-w-[496px] text-[15px] leading-[22px] text-brand-sage md:text-[16.3px] md:leading-[19.5px]">
              You must be 18 years old to access this website. Please verify your age.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
