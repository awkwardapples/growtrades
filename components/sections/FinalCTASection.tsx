'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function FinalCTASection() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="cta"
      className="relative py-32 px-4 overflow-hidden"
      aria-labelledby="cta-heading"
      style={{ background: '#FFFFFF' }}
    >
      <div className="gt-divider max-w-6xl mx-auto mb-20" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 gt-grid-bg pointer-events-none opacity-60"
        aria-hidden="true"
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col items-center gap-6"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium tracking-[0.18em] uppercase"
            style={{ color: '#1D4ED8' }}
          >
            Ready to grow?
          </motion.p>

          <motion.h2
            id="cta-heading"
            variants={fadeUp}
            className="text-5xl sm:text-6xl font-bold text-[#111] leading-[1.04] tracking-tight"
          >
            Stop losing leads.{' '}
            <span style={{ color: '#1D4ED8' }}>Start scaling.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg text-[#666] leading-relaxed max-w-lg"
          >
            Book a free 30-minute call. We&apos;ll review your current online presence and show you exactly where leads are being lost.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-3 mt-1"
          >
            <Button
              size="lg"
              className="bg-[#1D4ED8] hover:bg-[#1e40af] text-white px-8 py-3 rounded-xl font-medium text-sm cursor-pointer transition-colors duration-150"
              onClick={scrollToContact}
            >
              Book free consultation
              <ArrowRight size={14} className="ml-2" aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-[#555] hover:text-[#111] hover:bg-black/[0.04] px-8 py-3 rounded-xl font-medium text-sm cursor-pointer transition-colors duration-150"
              onClick={scrollToHowItWorks}
            >
              See how it works
            </Button>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-xs text-[#bbb] mt-1"
          >
            No commitment. UK-based. Responds within one working day.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
