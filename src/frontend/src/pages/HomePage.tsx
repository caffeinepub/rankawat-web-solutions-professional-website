import Hero from '@/components/Hero';
import About from '@/components/About';
import WhyChooseUs from '@/components/WhyChooseUs';
import SpecialOffers from '@/components/SpecialOffers';
import Contact from '@/components/Contact';
import { useLanguage } from '@/components/Layout';

export default function HomePage() {
  const { language } = useLanguage();

  return (
    <>
      <Hero language={language} />
      <SpecialOffers language={language} />
      <About language={language} />
      <WhyChooseUs language={language} />
      <Contact language={language} />
    </>
  );
}
