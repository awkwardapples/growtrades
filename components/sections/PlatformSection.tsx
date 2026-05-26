'use client';

import { motion } from 'framer-motion';
import { PLATFORM_FEATURES } from '@/data/content';
import { fadeUp, scaleIn, staggerContainer, viewportConfig } from '@/lib/motion';
import { TrendingUp, BarChart3 } from 'lucide-react';

function DashboardMockup() {
  const bars = [42, 65, 38, 80, 55, 72, 91, 68, 85, 74, 95, 83];
  const miniLine = [30, 45, 38, 60, 52, 75, 68, 82, 74, 90, 85, 100];

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      aria-label="GrowTrades platform dashboard preview"
      role="img"
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <span className="text-[11px] text-white/25 font-mono">
          growtrades.dashboard
        </span>
        <div className="w-16 h-2 rounded-full bg-white/5" />
      </div>

      <div className="p-5">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: 'New Leads', value: '47', delta: '+23%', color: '#10b981' },
            { label: 'Conversion', value: '68%', delta: '+11%', color: '#3b82f6' },
            { label: 'Revenue', value: '£24k', delta: '+34%', color: '#d97706' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-3"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <p className="text-[10px] text-white/30 mb-1">{stat.label}</p>
              <p className="text-lg font-bold text-white leading-none mb-1">{stat.value}</p>
              <span className="text-[10px] font-medium" style={{ color: stat.color }}>
                {stat.delta}
              </span>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div
          className="rounded-xl p-4 mb-3"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] text-white/30 font-medium">Lead Volume — 12 months</span>
            <div className="flex items-center gap-1 text-[10px] text-emerald-400">
              <TrendingUp size={10} aria-hidden="true" />
              +67% YoY
            </div>
          </div>
          <div className="flex items-end gap-1 h-16" aria-hidden="true">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${h}%`,
                  background:
                    i === bars.length - 1
                      ? 'rgba(59,130,246,0.8)'
                      : `rgba(59,130,246,${0.15 + (i / bars.length) * 0.3})`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Lead list */}
        <div className="space-y-2">
          {[
            { name: 'Boiler replacement — Birmingham', time: '2m ago', status: 'New' },
            { name: 'Rewire quote — Manchester', time: '14m ago', status: 'Reviewing' },
            { name: 'Flat roof — Leeds', time: '1h ago', status: 'Sent' },
          ].map((lead) => (
            <div
              key={lead.name}
              className="flex items-center justify-between rounded-lg px-3 py-2"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div>
                <p className="text-[11px] text-white/70 font-medium">{lead.name}</p>
                <p className="text-[10px] text-white/25">{lead.time}</p>
              </div>
              <span
                className="text-[10px] px-2 py-0.5 rounded-md font-medium"
                style={{
                  background:
                    lead.status === 'New'
                      ? 'rgba(16,185,129,0.15)'
                      : 'rgba(255,255,255,0.05)',
                  color:
                    lead.status === 'New' ? '#10b981' : 'rgba(255,255,255,0.35)',
                  border:
                    lead.status === 'New'
                      ? '1px solid rgba(16,185,129,0.25)'
                      : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {lead.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PlatformSection() {
  return (
    <section
      id="platform"
      className="relative py-32 px-4 overflow-hidden"
      aria-labelledby="platform-heading"
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
            Growth Operations Platform
          </motion.p>
          <motion.h2
            id="platform-heading"
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-5"
          >
            Your business.{' '}
            <span className="text-white/35">In one view.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base text-white/50 leading-relaxed"
          >
            A live operations dashboard gives you complete visibility over leads, rankings, reviews, and revenue — updated in real time.
          </motion.p>
        </motion.div>

        {/* Two-column layout: dashboard mockup + features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Dashboard mockup */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <DashboardMockup />
          </motion.div>

          {/* Feature list */}
          <motion.div
            className="flex flex-col gap-5 pt-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {PLATFORM_FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  className="flex gap-4 items-start group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mt-0.5">
                    <Icon size={16} className="text-blue-400" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-sm font-semibold text-white">
                        {feature.title}
                      </h3>
                      <span
                        className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded-md"
                        style={{
                          background: 'rgba(16,185,129,0.1)',
                          border: '1px solid rgba(16,185,129,0.2)',
                        }}
                      >
                        {feature.metric}
                      </span>
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              variants={fadeUp}
              className="mt-4 pt-6 border-t border-white/[0.06]"
            >
              <p className="text-xs text-white/30 leading-relaxed">
                All data is updated in real time. Monthly reporting included with every retainer.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
