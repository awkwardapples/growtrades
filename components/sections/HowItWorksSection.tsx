'use client';

import { motion } from 'framer-motion';
import { HOW_IT_WORKS_STEPS } from '@/data/content';
import { fadeUp, slideInLeft, staggerContainer, viewportConfig } from '@/lib/motion';

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative py-32 px-4 overflow-hidden"
      aria-labelledby="how-it-works-heading"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(59,130,246,0.08) 0%, transparent 70%), #080810',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-20 max-w-xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium tracking-[0.2em] uppercase text-blue-400 mb-4"
          >
            How The System Works
          </motion.p>
          <motion.h2
            id="how-it-works-heading"
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-5"
          >
            A complete lead journey.{' '}
            <span className="text-white/35">Automated.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base text-white/50 leading-relaxed"
          >
            Every step from first search to completed job is handled, tracked, and optimised. No manual chasing. No missed leads.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connector line (desktop) */}
          <div
            className="absolute left-[39px] top-12 bottom-12 w-px hidden lg:block"
            style={{
              background:
                'linear-gradient(to bottom, transparent, rgba(59,130,246,0.3), rgba(59,130,246,0.3), transparent)',
            }}
            aria-hidden="true"
          />

          <motion.div
            className="flex flex-col gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {HOW_IT_WORKS_STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                variants={slideInLeft}
                className="relative flex gap-6 lg:gap-10 items-start"
              >
                {/* Step number */}
                <div
                  className="relative z-10 flex-shrink-0 w-20 h-20 rounded-2xl flex flex-col items-center justify-center"
                  style={{
                    background: 'rgba(59,130,246,0.1)',
                    border: '1px solid rgba(59,130,246,0.25)',
                  }}
                >
                  <span className="text-[10px] font-bold tracking-[0.15em] text-blue-400/60 uppercase">
                    Step
                  </span>
                  <span className="text-2xl font-bold text-blue-400 leading-none">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-semibold text-white mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-3 max-w-lg">
                    {step.description}
                  </p>
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/35 font-medium"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    {step.detail}
                  </div>
                </div>

                {/* Connecting line segment between steps (mobile) */}
                {i < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div
                    className="absolute left-[39px] top-20 h-12 w-px lg:hidden"
                    style={{
                      background:
                        'linear-gradient(to bottom, rgba(59,130,246,0.3), transparent)',
                    }}
                    aria-hidden="true"
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
