'use client';

import ScrollExpansionHero from '@/components/ui/scroll-expansion-hero';
import { HERO_CONTENT } from '@/data/content';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/motion';

function HeroPostContent() {
  return (
    <section className="relative min-h-screen gt-glow-bg gt-grid-bg flex items-center justify-center px-4 py-32">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium tracking-[0.2em] uppercase text-blue-400"
          >
            {HERO_CONTENT.eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight"
          >
            {HERO_CONTENT.headline}{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #93c5fd 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {HERO_CONTENT.headlineAccent}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-white/55 leading-relaxed max-w-2xl"
          >
            {HERO_CONTENT.subheadline}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-3 mt-2"
          >
            <Button
              size="lg"
              className="bg-blue-500 hover:bg-blue-400 text-white px-7 py-3 rounded-xl font-medium text-sm cursor-pointer transition-colors duration-150"
            >
              {HERO_CONTENT.cta}
              <ArrowRight size={15} className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-white/60 hover:text-white hover:bg-white/5 px-7 py-3 rounded-xl font-medium text-sm cursor-pointer transition-colors duration-150"
            >
              {HERO_CONTENT.ctaSecondary}
              <ArrowDown size={15} className="ml-2" />
            </Button>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-6 mt-4 pt-8 border-t border-white/[0.07] w-full"
          >
            {['Plumbers', 'Electricians', 'Builders', 'Roofers', 'Landscapers', 'Welders'].map(
              (trade) => (
                <span key={trade} className="text-xs text-white/30 font-medium">
                  {trade}
                </span>
              )
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HeroSection() {
  return (
    <ScrollExpansionHero
      videoSrc={HERO_CONTENT.videoSrc}
      posterSrc={HERO_CONTENT.videoPoster}
      headline={HERO_CONTENT.headline}
      headlineAccent={HERO_CONTENT.headlineAccent}
      eyebrow={HERO_CONTENT.eyebrow}
      scrollPrompt={HERO_CONTENT.scrollPrompt}
    >
      <HeroPostContent />
    </ScrollExpansionHero>
  );
}
