'use client';

import ScrollExpansionHero from '@/components/ui/scroll-expansion-hero';
import { HERO_CONTENT } from '@/data/content';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/motion';

function HeroPostContent() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-4 py-32"
      style={{ background: '#F7F6F4' }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium tracking-[0.18em] uppercase"
            style={{ color: '#1D4ED8' }}
          >
            {HERO_CONTENT.eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl font-bold text-[#111] leading-[1.06] tracking-tight"
          >
            {HERO_CONTENT.headline}{' '}
            <span style={{ color: '#1D4ED8' }}>{HERO_CONTENT.headlineAccent}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg text-[#666] leading-relaxed max-w-xl"
          >
            {HERO_CONTENT.subheadline}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-3 mt-1"
          >
            <Button
              size="lg"
              className="bg-[#1D4ED8] hover:bg-[#1e40af] text-white px-7 py-3 rounded-xl font-medium text-sm cursor-pointer transition-colors duration-150"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {HERO_CONTENT.cta}
              <ArrowRight size={14} className="ml-2" aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-[#555] hover:text-[#111] hover:bg-black/[0.04] px-7 py-3 rounded-xl font-medium text-sm cursor-pointer transition-colors duration-150"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {HERO_CONTENT.ctaSecondary}
            </Button>
          </motion.div>

          {/* Trust line */}
          <motion.p
            variants={fadeUp}
            className="text-xs text-[#aaa] mt-2"
          >
            Plumbers · Electricians · Builders · Roofers · Landscapers · Welders · Handymen
          </motion.p>
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
      backgroundImageSrc={HERO_CONTENT.heroBackgroundImage || undefined}
      headline={HERO_CONTENT.headline}
      headlineAccent={HERO_CONTENT.headlineAccent}
      eyebrow={HERO_CONTENT.eyebrow}
      scrollPrompt={HERO_CONTENT.scrollPrompt}
    >
      <HeroPostContent />
    </ScrollExpansionHero>
  );
}
