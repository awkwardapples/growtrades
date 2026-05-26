'use client';

import { motion } from 'framer-motion';
import { fadeUp, slideInRight, staggerContainer, viewportConfig } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import { CONTACT } from '@/data/content';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-24 px-4"
      style={{ background: '#F7F6F4' }}
      aria-labelledby="contact-heading"
    >
      <div className="gt-divider max-w-6xl mx-auto mb-20" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
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
              Get in touch
            </motion.p>
            <motion.h2
              id="contact-heading"
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold text-[#111] leading-tight tracking-tight mb-4"
            >
              Let&apos;s talk growth.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-base text-[#666] leading-relaxed mb-10"
            >
              Tell us about your business. We&apos;ll come back within one working day with an honest assessment and a clear starting point.
            </motion.p>

            <motion.ul variants={staggerContainer} className="space-y-4" role="list">
              {[
                { Icon: Mail, label: CONTACT.email, href: `mailto:${CONTACT.email}` },
                { Icon: Phone, label: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, '')}` },
                { Icon: MapPin, label: CONTACT.location, href: undefined },
              ].map(({ Icon, label, href }) => (
                <motion.li key={label} variants={fadeUp} className="flex items-center gap-4">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(29,78,216,0.07)',
                      border: '1px solid rgba(29,78,216,0.12)',
                    }}
                  >
                    <Icon size={14} style={{ color: '#1D4ED8' }} aria-hidden="true" />
                  </div>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm text-[#555] hover:text-[#111] transition-colors cursor-pointer"
                    >
                      {label}
                    </a>
                  ) : (
                    <span className="text-sm text-[#888]">{label}</span>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right: form */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <form
              className="gt-card p-7 flex flex-col gap-4"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Contact form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'contact-name', label: 'Name', type: 'text', placeholder: 'Mike Thornton', autoComplete: 'name' },
                  { id: 'contact-trade', label: 'Trade', type: 'text', placeholder: 'Plumber, Electrician…', autoComplete: 'off' },
                ].map((f) => (
                  <div key={f.id} className="flex flex-col gap-1.5">
                    <label htmlFor={f.id} className="text-xs text-[#888] font-medium">
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      type={f.type}
                      name={f.id}
                      autoComplete={f.autoComplete}
                      placeholder={f.placeholder}
                      className="w-full px-3 py-2.5 rounded-xl text-sm text-[#111] placeholder-[#ccc] outline-none transition-colors duration-150"
                      style={{
                        background: '#F7F6F4',
                        border: '1px solid rgba(0,0,0,0.1)',
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(29,78,216,0.4)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'; }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-email" className="text-xs text-[#888] font-medium">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="mike@thorntonplumbing.co.uk"
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-[#111] placeholder-[#ccc] outline-none transition-colors duration-150"
                  style={{ background: '#F7F6F4', border: '1px solid rgba(0,0,0,0.1)' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(29,78,216,0.4)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'; }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="text-xs text-[#888] font-medium">
                  Tell us about your business
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="We&apos;re a 3-van plumbing company in Birmingham. Struggling with consistent leads…"
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-[#111] placeholder-[#ccc] outline-none resize-none transition-colors duration-150"
                  style={{ background: '#F7F6F4', border: '1px solid rgba(0,0,0,0.1)' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(29,78,216,0.4)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'; }}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#1D4ED8] hover:bg-[#1e40af] text-white py-3 rounded-xl font-medium text-sm cursor-pointer transition-colors duration-150 mt-1"
              >
                Send message
                <ArrowRight size={13} className="ml-2" aria-hidden="true" />
              </Button>

              <p className="text-[11px] text-[#bbb] text-center">
                We respond within one working day. No spam.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
