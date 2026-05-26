'use client';

import { motion } from 'framer-motion';
import { WHY_US_POINTS } from '@/data/content';
import { fadeUp, slideInLeft, slideInRight, staggerContainer, viewportConfig } from '@/lib/motion';

const TRADITIONAL = [
  'Generic marketing retainers',
  'Sporadic lead quality',
  'No system ownership',
  'Vanity metrics reporting',
  'Long fixed-term contracts',
  'One-size-fits-all campaigns',
];

export default function WhyGrowTradesSection() {
  return (
    <section
      id="why-growtrades"
      className="relative py-32 px-4 overflow-hidden"
      aria-labelledby="why-heading"
      style={{ background: '#080810' }}
    >
      <div className="gt-accent-line max-w-6xl mx-auto mb-20 opacity-30" />

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
            Why GrowTrades
          </motion.p>
          <motion.h2
            id="why-heading"
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-5"
          >
            Not another agency.{' '}
            <span className="text-white/35">A growth partner.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base text-white/50 leading-relaxed"
          >
            We&apos;re not here to sell you a campaign. We&apos;re here to build the systems that produce compounding growth — month after month.
          </motion.p>
        </motion.div>

        {/* Comparison table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
          {/* Traditional agencies */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="rounded-2xl p-6"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-white/25 mb-5">
              Traditional Agencies
            </p>
            <ul className="space-y-3" role="list">
              {TRADITIONAL.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                    aria-hidden="true"
                  >
                    <span className="text-white/20 text-[10px]">✕</span>
                  </div>
                  <span className="text-sm text-white/35 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* GrowTrades */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="rounded-2xl p-6"
            style={{
              background: 'rgba(59,130,246,0.05)',
              border: '1px solid rgba(59,130,246,0.2)',
            }}
          >
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-blue-400 mb-5">
              GrowTrades
            </p>
            <ul className="space-y-3" role="list">
              {WHY_US_POINTS.slice(0, 6).map((point) => {
                const Icon = point.icon;
                return (
                  <li key={point.title} className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(59,130,246,0.15)' }}
                      aria-hidden="true"
                    >
                      <Icon size={9} className="text-blue-400" aria-hidden="true" />
                    </div>
                    <span className="text-sm text-white/65 leading-snug">
                      {point.title}
                    </span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>

        {/* Feature grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {WHY_US_POINTS.map((point) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                variants={fadeUp}
                className="flex gap-4 p-5 rounded-xl group gt-card-hover"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Icon size={14} className="text-blue-400" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1 leading-snug">
                    {point.title}
                  </h3>
                  <p className="text-xs text-white/40 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
