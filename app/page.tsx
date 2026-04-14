import { Footer } from '@/sections/Footer';
import { Hero } from '@/sections/Hero';
import { Marquee } from '@/sections/Marquee';
import { Reviews } from '@/sections/Reviews';
import { USPBar } from '@/sections/USPBar';

export default function Page() {
  return (
    <main className="bg-white">
      <Hero />
      <USPBar />
      <Marquee />
      <Reviews />
      <Footer />
    </main>
  );
}
