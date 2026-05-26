'use client';

import { motion } from 'framer-motion';
import { GROWTH_AUDIT } from '@/data/content';
import { fadeUp, scaleIn, staggerContainer, viewportConfig } from '@/lib/motion';
import { TrendingUp, ArrowRight } from 'lucide-react';

function ImprovementBadge({ before, after }: { before: string; after: string }) {
  return (
    <div className="flex items-center gap-2 justify-end">
      <span className="text-sm text-[#999] line-through tabular-nums">{before}</span>
      <ArrowRight size={12} className="text-[#ccc]" aria-hidden="true" />
      <span className="text-sm font-semibold text-[#059669] tabular-nums">{after}</span>
    </div>
  );
}

export default function GrowthAuditSection() {
  return (
    <section
      id="platform"
      className="relative py-32 px-4 overflow-hidden"
      aria-labelledby="audit-heading"
      style={{ background: '#FFFFFF' }}
    >
      <div className="gt-divider max-w-6xl mx-auto mb-20" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-14"
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
            Growth tracking
          </motion.p>
          <motion.h2
            id="audit-heading"
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-[#111] leading-tight tracking-tight mb-5 max-w-xl"
          >
            We track what actually matters to your business.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base text-[#666] leading-relaxed max-w-lg"
          >
            Every GrowTrades client receives a monthly performance report covering the metrics that directly affect enquiries, revenue, and time.
          </motion.p>
        </motion.div>

        {/* Two-column: metrics table + context */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Metrics table */}
          <motion.div
            className="lg:col-span-3"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              {/* Table header */}
              <div
                className="grid grid-cols-3 px-5 py-3 text-xs font-medium tracking-wide uppercase"
                style={{
                  background: '#F5F4F2',
                  color: '#999',
                  borderBottom: '1px solid rgba(0,0,0,0.07)',
                }}
              >
                <span>Metric</span>
                <span className="text-center">Before</span>
                <span className="text-right">After 6 months</span>
              </div>

              {/* Rows */}
              {GROWTH_AUDIT.metrics.map((metric, i) => (
                <div
                  key={metric.label}
                  className="grid grid-cols-3 items-center px-5 py-4"
                  style={{
                    borderBottom:
                      i < GROWTH_AUDIT.metrics.length - 1
                        ? '1px solid rgba(0,0,0,0.05)'
                        : 'none',
                    background: i % 2 === 0 ? '#FFFFFF' : '#FAFAF9',
                  }}
                >
                  <span className="text-sm text-[#333] leading-snug pr-4">
                    {metric.label}
                  </span>
                  <span className="text-sm text-[#aaa] text-center tabular-nums">
                    {metric.before}
                  </span>
                  <ImprovementBadge before={metric.before} after={metric.after} />
                </div>
              ))}

              {/* Footer */}
              <div
                className="px-5 py-3 flex items-center gap-2"
                style={{
                  background: '#F5F4F2',
                  borderTop: '1px solid rgba(0,0,0,0.07)',
                }}
              >
                <span className="text-[11px] text-[#bbb]">
                  {GROWTH_AUDIT.clientLabel} · {GROWTH_AUDIT.period}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Context cards */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {[
              {
                icon: TrendingUp,
                title: 'Monthly reporting, every month.',
                body:
                  'You receive a clear written report covering all key metrics — no jargon, no spin. Just the numbers and what we\'re doing about them.',
              },
              {
                icon: TrendingUp,
                title: 'Your data. Your business.',
                body:
                  'We track performance in Google Search Console, Google Analytics 4, and your lead inbox. All of it in one place.',
              },
              {
                icon: TrendingUp,
                title: 'No SaaS dashboard to learn.',
                body:
                  'GrowTrades is a managed service, not software. You focus on the work. We focus on the growth.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="gt-card p-5 flex gap-4 items-start cursor-default"
                >
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5"
                    style={{
                      background: 'rgba(29,78,216,0.08)',
                      border: '1px solid rgba(29,78,216,0.12)',
                    }}
                  >
                    <Icon size={15} style={{ color: '#1D4ED8' }} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#111] mb-1 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#777] leading-relaxed">{item.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
