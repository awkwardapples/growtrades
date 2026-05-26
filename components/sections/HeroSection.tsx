'use client';

import ScrollExpansionHero from '@/components/ui/scroll-expansion-hero';
import { HERO_CONTENT } from '@/data/content';

export default function HeroSection() {
  return (
    <ScrollExpansionHero
      videoSrc={HERO_CONTENT.videoSrc}
      posterSrc={HERO_CONTENT.videoPoster}
      backgroundImageSrc={HERO_CONTENT.heroBackgroundImage || undefined}
      headline={HERO_CONTENT.headline}
      headlineAccent={HERO_CONTENT.headlineAccent}
      eyebrow={HERO_CONTENT.eyebrow || undefined}
      scrollPrompt={HERO_CONTENT.scrollPrompt}
    />
  );
}
