'use client';

import { motion } from 'framer-motion';
import { WHY_US_POINTS } from '@/data/content';
import { fadeUp, slideInLeft, slideInRight, staggerContainer, viewportConfig } from '@/lib/motion';

const TRADITIONAL = [
  'Generic campaigns with no trade-specific knowledge',
  'Inconsistent lead quality — no qualification layer',
  'You own nothing when the contract ends',
  'Vanity metrics: impressions, reach, "exposure"',
  'Long fixed-term contracts with slow results',
  'One-size-fits-all strategy',
];

export default function WhyGrowTradesSection() {
  return (
    <section
      id="why-growtrades"
      className="relative py-32 px-4"
      style={{ background: '#F7F6F4' }}
      aria-labelledby="why-heading"
    >
      <div className="gt-divider max-w-6xl mx-auto mb-20" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-14 max-w-lg"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium tracking-[0.18em] uppercase mb-4"
            style={{ color: '#1D4ED8' }}
          >
            Why GrowTrades
          </motion.p>
          <motion.h2
            id="why-heading"
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-[#111] leading-tight tracking-tight mb-4"
          >
            Not another marketing agency.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base text-[#666] leading-relaxed"
          >
            We build and manage operational growth systems. The distinction matters.
          </motion.p>
        </motion.div>

        {/* Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-16">
          {/* Traditional */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="rounded-2xl p-6"
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(0,0,0,0.07)',
            }}
          >
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[#bbb] mb-5">
              Typical marketing agencies
            </p>
            <ul className="space-y-3" role="list">
              {TRADITIONAL.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-0.5 text-[#ddd] text-sm leading-none" aria-hidden="true">
                    ✕
                  </span>
                  <span className="text-sm text-[#aaa] leading-snug">{item}</span>
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
              background: '#EEF2FF',
              border: '1px solid rgba(29,78,216,0.15)',
            }}
          >
            <p
              className="text-xs font-medium tracking-[0.15em] uppercase mb-5"
              style={{ color: '#1D4ED8' }}
            >
              GrowTrades
            </p>
            <ul className="space-y-3" role="list">
              {WHY_US_POINTS.slice(0, 6).map((point) => {
                const Icon = point.icon;
                return (
                  <li key={point.title} className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(29,78,216,0.15)' }}
                      aria-hidden="true"
                    >
                      <Icon size={9} style={{ color: '#1D4ED8' }} aria-hidden="true" />
                    </div>
                    <span className="text-sm text-[#333] leading-snug">{point.title}</span>
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
                className="gt-card flex gap-4 p-5 cursor-default"
              >
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                  style={{
                    background: 'rgba(29,78,216,0.07)',
                    border: '1px solid rgba(29,78,216,0.12)',
                  }}
                >
                  <Icon size={14} style={{ color: '#1D4ED8' }} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#111] mb-1 leading-snug">
                    {point.title}
                  </h3>
                  <p className="text-xs text-[#777] leading-relaxed">{point.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
