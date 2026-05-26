'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, slideInRight, staggerContainer, viewportConfig } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import { CONTACT } from '@/data/content';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

function inputStyle(focused: boolean) {
  return {
    background: '#F7F6F4',
    border: `1px solid ${focused ? 'rgba(29,78,216,0.4)' : 'rgba(0,0,0,0.1)'}`,
  };
}

export default function ContactSection() {
  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [focused, setFocused] = useState<Record<string, boolean>>({});
  const lastSubmitRef = useRef<number>(0);
  const THROTTLE_MS = 60_000;

  const handleFocus = (id: string) => setFocused((p) => ({ ...p, [id]: true }));
  const handleBlur = (id: string) => setFocused((p) => ({ ...p, [id]: false }));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Client-side throttle (mirrors server rate limit)
    const now = Date.now();
    if (now - lastSubmitRef.current < THROTTLE_MS) {
      setErrorMessage('Please wait a moment before sending another message.');
      setState('error');
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);

    const name = (data.get('name') as string)?.trim();
    const trade = (data.get('trade') as string)?.trim();
    const email = (data.get('email') as string)?.trim();
    const message = (data.get('message') as string)?.trim();

    if (!name || !trade || !email || !message) {
      setErrorMessage('Please fill in all fields.');
      setState('error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      setState('error');
      return;
    }

    setState('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          trade,
          email,
          message,
          website: data.get('website'), // honeypot
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMessage(json.error ?? 'Something went wrong. Please try again.');
        setState('error');
        return;
      }

      lastSubmitRef.current = Date.now();
      setState('success');
      form.reset();
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setState('error');
    }
  }

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
            {state === 'success' ? (
              <div
                className="gt-card p-7 flex flex-col items-center gap-4 text-center"
                role="alert"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(22,163,74,0.1)' }}
                >
                  <CheckCircle size={22} style={{ color: '#16a34a' }} />
                </div>
                <h3 className="text-lg font-semibold text-[#111]">Message sent</h3>
                <p className="text-sm text-[#666] leading-relaxed max-w-xs">
                  Thanks for getting in touch. We&apos;ll review your message and get back to you within one working day.
                </p>
                <button
                  onClick={() => setState('idle')}
                  className="mt-2 text-xs text-[#1D4ED8] hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                className="gt-card p-7 flex flex-col gap-4"
                onSubmit={handleSubmit}
                aria-label="Contact form"
                noValidate
              >
                {/* Honeypot — hidden from real users, bots fill it */}
                <input
                  type="text"
                  name="website"
                  aria-hidden="true"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: 'none' }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'name', label: 'Name', type: 'text', placeholder: 'Mike Thornton', autoComplete: 'name' },
                    { id: 'trade', label: 'Trade', type: 'text', placeholder: 'Plumber, Electrician…', autoComplete: 'off' },
                  ].map((f) => (
                    <div key={f.id} className="flex flex-col gap-1.5">
                      <label htmlFor={`contact-${f.id}`} className="text-xs text-[#888] font-medium">
                        {f.label}
                      </label>
                      <input
                        id={`contact-${f.id}`}
                        type={f.type}
                        name={f.id}
                        autoComplete={f.autoComplete}
                        placeholder={f.placeholder}
                        required
                        disabled={state === 'loading'}
                        className="w-full px-3 py-2.5 rounded-xl text-sm text-[#111] placeholder-[#ccc] outline-none transition-colors duration-150 disabled:opacity-50"
                        style={inputStyle(!!focused[f.id])}
                        onFocus={() => handleFocus(f.id)}
                        onBlur={() => handleBlur(f.id)}
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
                    required
                    disabled={state === 'loading'}
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-[#111] placeholder-[#ccc] outline-none transition-colors duration-150 disabled:opacity-50"
                    style={inputStyle(!!focused.email)}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
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
                    placeholder="We're a 3-van plumbing company in Birmingham. Struggling with consistent leads…"
                    required
                    disabled={state === 'loading'}
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-[#111] placeholder-[#ccc] outline-none resize-none transition-colors duration-150 disabled:opacity-50"
                    style={inputStyle(!!focused.message)}
                    onFocus={() => handleFocus('message')}
                    onBlur={() => handleBlur('message')}
                  />
                </div>

                {state === 'error' && (
                  <div
                    className="flex items-start gap-2.5 rounded-xl px-3.5 py-2.5"
                    style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)' }}
                    role="alert"
                  >
                    <AlertCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: '#dc2626' }} />
                    <p className="text-xs text-[#dc2626] leading-relaxed">{errorMessage}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={state === 'loading'}
                  className="w-full bg-[#1D4ED8] hover:bg-[#1e40af] text-white py-3 rounded-xl font-medium text-sm cursor-pointer transition-colors duration-150 mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {state === 'loading' ? (
                    <>
                      <Loader2 size={13} className="mr-2 animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <ArrowRight size={13} className="ml-2" aria-hidden="true" />
                    </>
                  )}
                </Button>

                <p className="text-[11px] text-[#bbb] text-center">
                  We respond within one working day. No spam.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
