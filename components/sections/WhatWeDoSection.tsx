'use client';

import { motion } from 'framer-motion';
import { SERVICES } from '@/data/content';
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/motion';

export default function WhatWeDoSection() {
  return (
    <section
      id="what-we-do"
      className="relative py-32 px-4"
      style={{ background: '#F7F6F4' }}
      aria-labelledby="what-we-do-heading"
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
            What we do
          </motion.p>
          <motion.h2
            id="what-we-do-heading"
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-[#111] leading-tight tracking-tight mb-4"
          >
            Six systems. One growth engine.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base text-[#666] leading-relaxed"
          >
            Each system is built to compound on the last. More visibility leads to more leads. Better leads lead to better jobs.
          </motion.p>
        </motion.div>

        {/* Service grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={fadeUp}
                className="gt-card p-6 group cursor-default"
              >
                {/* Icon + tag row */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'rgba(29,78,216,0.07)',
                      border: '1px solid rgba(29,78,216,0.12)',
                    }}
                  >
                    <Icon size={16} style={{ color: '#1D4ED8' }} aria-hidden="true" />
                  </div>
                  <span className="gt-tag">{service.tag}</span>
                </div>

                <h3 className="text-sm font-semibold text-[#111] mb-2 leading-snug">
                  {service.title}
                </h3>
                <p className="text-sm text-[#666] leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
