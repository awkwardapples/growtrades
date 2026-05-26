'use client';

import { motion } from 'framer-motion';
import { SERVICES } from '@/data/content';
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/motion';
import { Badge } from '@/components/ui/badge';

export default function WhatWeDoSection() {
  return (
    <section
      id="what-we-do"
      className="relative py-32 px-4 overflow-hidden"
      style={{ background: '#080810' }}
      aria-labelledby="what-we-do-heading"
    >
      {/* Subtle separator line */}
      <div className="gt-accent-line max-w-6xl mx-auto mb-20 opacity-40" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-16 max-w-xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium tracking-[0.2em] uppercase text-blue-400 mb-4"
          >
            What We Do
          </motion.p>
          <motion.h2
            id="what-we-do-heading"
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-5"
          >
            Six systems. One{' '}
            <span className="text-white/40">growth engine.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base text-white/50 leading-relaxed"
          >
            Every GrowTrades engagement deploys a set of compounding systems — each one feeding the next, building sustainable growth momentum over time.
          </motion.p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const isLarge = i === 0 || i === 3;

            return (
              <motion.div
                key={service.title}
                variants={fadeUp}
                className={`relative group rounded-2xl p-6 gt-card-hover cursor-default ${
                  isLarge ? 'lg:col-span-1' : ''
                }`}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {/* Icon */}
                <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <Icon size={18} className="text-blue-400" aria-hidden="true" />
                </div>

                {/* Tag */}
                <Badge
                  variant="outline"
                  className="absolute top-5 right-5 text-[10px] font-medium tracking-wide text-white/30 border-white/10 bg-transparent px-2 py-0.5"
                >
                  {service.tag}
                </Badge>

                <h3 className="text-base font-semibold text-white mb-2 leading-snug">
                  {service.title}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed">
                  {service.description}
                </p>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                  style={{
                    background:
                      'radial-gradient(ellipse at 30% 30%, rgba(59,130,246,0.06) 0%, transparent 70%)',
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
