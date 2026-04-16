import { Footer } from '@/sections/Footer';
import { Hero } from '@/sections/Hero';
import { Marquee } from '@/sections/Marquee';
import { Reviews } from '@/sections/Reviews';

export default function Page() {
  return (
    <main className="bg-white">
      <Hero />
      <Marquee />
      <Reviews />
      <Footer />
    </main>
  );
}
