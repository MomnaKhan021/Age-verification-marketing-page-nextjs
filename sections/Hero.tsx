import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';

export function Hero() {
  return (
    <section className="px-3 pt-[10px] md:px-5 md:pt-5">
      <div className="relative overflow-hidden rounded-xl md:rounded-[24px]">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 1400px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

        <div className="relative flex min-h-[480px] flex-col items-center justify-between gap-12 px-4 py-6 md:min-h-[702px] md:gap-56 md:px-16 md:py-10">
          <div className="flex w-full justify-center">
            <Logo className="h-6 w-20 md:h-[30px] md:w-[95px]" variant="light" />
          </div>

          <div className="flex w-full max-w-[720px] flex-col items-center gap-8 text-center">
            <div className="flex flex-col items-center gap-4 md:gap-6">
              <h1 className="font-display text-[40px] font-semibold leading-[46px] tracking-[-0.027em] text-white md:text-[60px] md:leading-[68px]">
                Age Verification
              </h1>
              <p className="max-w-[520px] text-[16px] leading-[24px] text-brand-sage">
                You must be 18 years old to access this website. Please verify your age.
              </p>
            </div>

            <div className="flex w-full max-w-[305px] flex-col items-stretch gap-[26px]">
              <Button variant="primary" href="#verified">
                Yes, I&rsquo;m over 18
              </Button>
              <Button variant="ghost" href="#not-verified">
                No I&rsquo;m not
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
