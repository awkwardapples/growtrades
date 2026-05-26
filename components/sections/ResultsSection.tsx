'use client';

import { motion } from 'framer-motion';
import { RESULTS } from '@/data/content';
import { fadeUp, scaleIn, staggerContainer, viewportConfig } from '@/lib/motion';
import { Star, MapPin } from 'lucide-react';

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className="text-amber-400 fill-amber-400"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function ResultsSection() {
  return (
    <section
      id="results"
      className="relative py-32 px-4 overflow-hidden"
      aria-labelledby="results-heading"
      style={{
        background:
          'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(59,130,246,0.09) 0%, transparent 70%), #080810',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium tracking-[0.2em] uppercase text-blue-400 mb-4"
          >
            Results
          </motion.p>
          <motion.h2
            id="results-heading"
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-5"
          >
            Numbers that{' '}
            <span className="text-white/35">speak for themselves.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base text-white/50 leading-relaxed max-w-xl mx-auto"
          >
            Averaged across active GrowTrades clients in their first six months.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {RESULTS.stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={scaleIn}
              className="relative flex flex-col items-center text-center p-8 rounded-2xl group"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <p
                className="text-5xl md:text-6xl font-bold mb-2 leading-none"
                style={{
                  background:
                    'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.value}
                <span className="text-3xl text-white/30">{stat.suffix}</span>
              </p>
              <p className="text-xs text-white/40 leading-relaxed max-w-[160px]">
                {stat.label}
              </p>

              {/* Glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 60%)',
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {RESULTS.testimonials.map((t) => (
            <motion.blockquote
              key={t.author}
              variants={fadeUp}
              className="relative flex flex-col gap-4 p-6 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <StarRating count={t.stars} />

              <p className="text-sm text-white/65 leading-relaxed italic flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              <footer className="flex items-end justify-between mt-auto pt-4 border-t border-white/[0.06]">
                <div>
                  <cite className="not-italic text-sm font-semibold text-white block">
                    {t.author}
                  </cite>
                  <span className="text-xs text-white/40">{t.role}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-white/30">
                  <MapPin size={10} aria-hidden="true" />
                  {t.location}
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
