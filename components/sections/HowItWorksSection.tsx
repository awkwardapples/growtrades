'use client';

import { motion } from 'framer-motion';
import { HOW_IT_WORKS_STEPS } from '@/data/content';
import { fadeUp, slideInLeft, staggerContainer, viewportConfig } from '@/lib/motion';

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative py-32 px-4"
      style={{ background: '#FFFFFF' }}
      aria-labelledby="how-it-works-heading"
    >
      <div className="gt-divider max-w-6xl mx-auto mb-20" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16 max-w-lg"
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
            How it works
          </motion.p>
          <motion.h2
            id="how-it-works-heading"
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-[#111] leading-tight tracking-tight mb-4"
          >
            A complete lead journey. Automated.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base text-[#666] leading-relaxed"
          >
            From the moment a customer searches online to a completed and reviewed job — every step handled.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line connector (desktop) */}
          <div
            className="absolute left-[39px] top-14 bottom-14 w-px hidden lg:block"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(29,78,216,0.15), rgba(29,78,216,0.15), transparent)' }}
            aria-hidden="true"
          />

          <motion.div
            className="flex flex-col gap-10"
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
                {/* Step badge */}
                <div
                  className="relative z-10 flex-shrink-0 w-20 h-20 rounded-2xl flex flex-col items-center justify-center"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(29,78,216,0.15)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                  }}
                >
                  <span
                    className="text-[9px] font-bold tracking-[0.15em] uppercase mb-0.5"
                    style={{ color: 'rgba(29,78,216,0.4)' }}
                  >
                    Step
                  </span>
                  <span className="text-2xl font-bold leading-none" style={{ color: '#1D4ED8' }}>
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 pt-3">
                  <h3 className="text-lg font-semibold text-[#111] mb-1.5 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#666] leading-relaxed mb-3 max-w-lg">
                    {step.description}
                  </p>
                  <div
                    className="inline-flex text-xs text-[#888] px-3 py-1.5 rounded-lg"
                    style={{
                      background: '#F5F4F2',
                      border: '1px solid rgba(0,0,0,0.06)',
                    }}
                  >
                    {step.detail}
                  </div>
                </div>

                {/* Mobile connector */}
                {i < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div
                    className="absolute left-[39px] top-20 h-10 w-px lg:hidden"
                    style={{ background: 'linear-gradient(to bottom, rgba(29,78,216,0.15), transparent)' }}
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
