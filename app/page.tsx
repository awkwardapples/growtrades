import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import WhatWeDoSection from '@/components/sections/WhatWeDoSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import PlatformSection from '@/components/sections/PlatformSection';
import ResultsSection from '@/components/sections/ResultsSection';
import WhyGrowTradesSection from '@/components/sections/WhyGrowTradesSection';
import FinalCTASection from '@/components/sections/FinalCTASection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="main-content">
        <HeroSection />
        <WhatWeDoSection />
        <HowItWorksSection />
        <PlatformSection />
        <ResultsSection />
        <WhyGrowTradesSection />
        <FinalCTASection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
