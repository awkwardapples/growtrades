import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import TradesSliderSection from '@/components/sections/TradesSliderSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import WhatWeDoSection from '@/components/sections/WhatWeDoSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import GrowthAuditSection from '@/components/sections/GrowthAuditSection';
import WhyGrowTradesSection from '@/components/sections/WhyGrowTradesSection';
import FinalCTASection from '@/components/sections/FinalCTASection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="main-content">
        {/* 1. Cinematic scroll-synced video hero */}
        <HeroSection />

        {/* 2. Trades carousel — who we serve */}
        <TradesSliderSection />

        {/* 3. Testimonials + stats — social proof first */}
        <TestimonialsSection />

        {/* 4. Services overview */}
        <WhatWeDoSection />

        {/* 5. System walkthrough */}
        <HowItWorksSection />

        {/* 6. Growth audit — realistic metrics, replaces fake SaaS platform */}
        <GrowthAuditSection />

        {/* 7. Why GrowTrades */}
        <WhyGrowTradesSection />

        {/* 8. CTA */}
        <FinalCTASection />

        {/* 9. Contact */}
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
