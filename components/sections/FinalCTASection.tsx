'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';

export default function FinalCTASection() {
  return (
    <section
      id="cta"
      className="relative py-32 px-4 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 50% 50%, rgba(59,130,246,0.14) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 20% 80%, rgba(59,130,246,0.06) 0%, transparent 60%),
            #080810
          `,
        }}
        aria-hidden="true"
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col items-center gap-6"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium tracking-[0.2em] uppercase text-blue-400"
          >
            Ready to grow?
          </motion.p>

          <motion.h2
            id="cta-heading"
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.02] tracking-tight"
          >
            Stop losing leads.{' '}
            <br className="hidden sm:block" />
            <span
              style={{
                background:
                  'linear-gradient(135deg, #3b82f6 0%, #60a5fa 60%, #93c5fd 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Start scaling.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg text-white/50 leading-relaxed max-w-xl"
          >
            Book a free 30-minute consultation. We&apos;ll audit your current online presence and show you exactly where growth is being left on the table.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-3 mt-2"
          >
            <Button
              size="lg"
              className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-xl font-medium text-base cursor-pointer transition-colors duration-150"
            >
              <Calendar size={16} className="mr-2" aria-hidden="true" />
              Book Free Consultation
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-white/50 hover:text-white hover:bg-white/5 px-8 py-4 rounded-xl font-medium text-base cursor-pointer transition-colors duration-150"
            >
              View case studies
              <ArrowRight size={15} className="ml-2" aria-hidden="true" />
            </Button>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-xs text-white/25 mt-2"
          >
            No commitment required. Results-focused. UK-based.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
