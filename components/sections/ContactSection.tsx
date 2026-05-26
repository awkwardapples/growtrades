'use client';

import { motion } from 'framer-motion';
import { fadeUp, slideInLeft, slideInRight, staggerContainer, viewportConfig } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import { CONTACT } from '@/data/content';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-24 px-4 overflow-hidden"
      aria-labelledby="contact-heading"
      style={{ background: '#06060f' }}
    >
      <div className="gt-accent-line max-w-6xl mx-auto mb-20 opacity-25" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: contact info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-medium tracking-[0.2em] uppercase text-blue-400 mb-4"
            >
              Get In Touch
            </motion.p>
            <motion.h2
              id="contact-heading"
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-5"
            >
              Let&apos;s talk growth.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-base text-white/50 leading-relaxed mb-10"
            >
              Tell us about your trades business and what growth looks like for you. We&apos;ll come back within one working day.
            </motion.p>

            <motion.ul
              variants={staggerContainer}
              className="space-y-4"
              role="list"
            >
              <motion.li variants={fadeUp} className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-blue-400" aria-hidden="true" />
                </div>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  {CONTACT.email}
                </a>
              </motion.li>
              <motion.li variants={fadeUp} className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Phone size={14} className="text-blue-400" aria-hidden="true" />
                </div>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  {CONTACT.phone}
                </a>
              </motion.li>
              <motion.li variants={fadeUp} className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <MapPin size={14} className="text-blue-400" aria-hidden="true" />
                </div>
                <span className="text-sm text-white/60">{CONTACT.location}</span>
              </motion.li>
            </motion.ul>
          </motion.div>

          {/* Right: simple contact form */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <form
              className="flex flex-col gap-4 rounded-2xl p-7"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              onSubmit={(e) => e.preventDefault()}
              aria-label="Contact form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-name"
                    className="text-xs text-white/40 font-medium"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Mike Thornton"
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-colors duration-150"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-trade"
                    className="text-xs text-white/40 font-medium"
                  >
                    Trade
                  </label>
                  <input
                    id="contact-trade"
                    type="text"
                    name="trade"
                    placeholder="Plumber, Electrician…"
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-colors duration-150"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-email"
                  className="text-xs text-white/40 font-medium"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="mike@thorntonplumbing.co.uk"
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-colors duration-150"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-message"
                  className="text-xs text-white/40 font-medium"
                >
                  Tell us about your business
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="We're a 3-van plumbing company in Birmingham. Struggling with consistent leads and wasting time on manual quoting…"
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/20 outline-none resize-none transition-colors duration-150"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-400 text-white py-3 rounded-xl font-medium text-sm cursor-pointer transition-colors duration-150 mt-1"
              >
                Send message
                <ArrowRight size={14} className="ml-2" aria-hidden="true" />
              </Button>

              <p className="text-[11px] text-white/20 text-center">
                We respond within one working day. No spam, ever.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
