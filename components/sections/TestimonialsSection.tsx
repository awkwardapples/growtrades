'use client';

import { motion } from 'framer-motion';
import { RESULTS } from '@/data/content';
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/motion';
import { ParallaxItem } from '@/components/ui/parallax';
import { Star, MapPin } from 'lucide-react';

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} className="fill-amber-400 text-amber-400" aria-hidden="true" />
      ))}
    </div>
  );
}

function StatRow() {
  return (
    <div className="grid grid-cols-3 gap-6 mb-20 max-w-2xl mx-auto text-center">
      {RESULTS.stats.map((stat) => (
        <div key={stat.label}>
          <p className="text-4xl md:text-5xl font-bold text-[#111] tracking-tight leading-none mb-2">
            {stat.value}
            <span className="text-2xl text-[#999]">{stat.suffix}</span>
          </p>
          <p className="text-xs text-[#888] leading-snug max-w-[140px] mx-auto">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const parallaxOffsets: [number, number][] = [
    [30, -40],
    [60, -20],
    [20, -55],
  ];

  return (
    <section
      id="results"
      className="relative py-32 px-4 overflow-hidden"
      aria-labelledby="testimonials-heading"
      style={{ background: '#F7F6F4' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium tracking-[0.18em] uppercase mb-3"
            style={{ color: '#1D4ED8' }}
          >
            Client results
          </motion.p>
          <motion.h2
            id="testimonials-heading"
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-[#111] leading-tight tracking-tight"
          >
            Real results from real trades businesses.
          </motion.h2>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <StatRow />
        </motion.div>

        {/* Testimonials with subtle parallax */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {RESULTS.testimonials.map((t, i) => {
            const [start, end] = parallaxOffsets[i];
            return (
              <ParallaxItem key={t.author} start={start} end={end}>
                <blockquote
                  className="gt-card p-6 flex flex-col gap-4 h-full cursor-default"
                >
                  <StarRating count={t.stars} />

                  <p className="text-sm text-[#444] leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <footer className="flex items-end justify-between mt-auto pt-4 border-t border-black/[0.06]">
                    <div>
                      <cite className="not-italic text-sm font-semibold text-[#111] block">
                        {t.author}
                      </cite>
                      <span className="text-xs text-[#888]">{t.role}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-[#aaa]">
                      <MapPin size={10} aria-hidden="true" />
                      {t.location}
                    </div>
                  </footer>
                </blockquote>
              </ParallaxItem>
            );
          })}
        </div>
      </div>
    </section>
  );
}
